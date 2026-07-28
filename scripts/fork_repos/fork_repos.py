import time
from collections.abc import Callable

import requests


GITHUB_API_BASE = "https://api.github.com"


def parse_repo_url(url: str) -> tuple[str, str]:
  """Extract owner and repo name from a GitHub HTTPS URL.
  Expected format: https://github.com/owner/repo
               or: owner/repo
  """
  path = url.strip().rstrip("/").removeprefix("https://github.com/")
  parts = path.split("/")
  if len(parts) < 2 or not parts[0] or not parts[1]:
    raise ValueError(f"Could not parse owner/repo from URL: {url!r}")
  return parts[0], parts[1]


def _build_session(token: str) -> requests.Session:
  """Create a requests Session pre-configured with GitHub API headers."""
  session = requests.Session()
  scheme = "Bearer"
  session.headers.update({
    "Authorization": f"{scheme} {token}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  })
  return session


def _fork_repository(
  session: requests.Session,
  owner: str,
  repo: str,
  org: str,
  fork_name: str | None = None,
) -> tuple[bool, str]:
  """Fork *owner/repo* into *org* via the GitHub API.

  Args:
    session:   Authenticated requests Session.
    owner:     Source repository owner.
    repo:      Source repository name.
    org:       Destination organization slug.
    fork_name: Optional name for the forked repository.
               Original repository name is kept when ``None``.

  Returns:
    (success, detail) where ``detail`` is the fork URL on success
    or an error message on failure.
  """
  payload: dict = { "organization": org }
  if fork_name:
    payload["name"] = fork_name

  response = session.post(
    f"{GITHUB_API_BASE}/repos/{owner}/{repo}/forks",
    json=payload,
  )

  if response.status_code == 202:
    default_name = fork_name or repo
    fork_url = response.json().get("html_url", f"https://github.com/{org}/{default_name}")
    return True, fork_url

  try:
    message = response.json().get("message", "Unknown error")
  except ValueError:
    message = response.text or "Unknown error"

  return False, f"HTTP {response.status_code}: {message}"


def _handle_rate_limit(session: requests.Session) -> None:
  """Sleep until the GitHub rate-limit window resets."""
  r = session.get(f"{GITHUB_API_BASE}/rate_limit")
  reset_ts = r.headers.get("x-ratelimit-reset")
  wait = max(0, int(reset_ts) - int(time.time())) + 1 if reset_ts else 60
  print(f"  [rate-limited] Sleeping {wait}s before retrying...", flush=True)
  time.sleep(wait)


def fork_all(
  repo_urls: list[str],
  org: str,
  token: str,
  name_fn: Callable[[str, str], str] | None = None,
  delay: float = 1.0,
) -> tuple[list[str], list[tuple[str, str]]]:
  """Fork every repository in *repo_urls* into the GitHub organization *org*.

  Args:
    repo_urls: List of GitHub repository URLs
                (format: ``https://github.com/owner/repo``,
                     or: ``owner/repo``).
    org:       Destination organization slug.
    token:     GitHub personal access token.
    name_fn:   Optional callable ``(url) -> str`` that returns the
                desired name for the forked repository.
    delay:     Seconds to wait between API calls (default: 1).

  Returns:
    ``(succeeded, failed)``: lists of successfully forked URLs and
     ``(source_url, error_message)`` tuples.
  """
  session = _build_session(token)
  succeeded: list[str] = []
  failed: list[tuple[str, str]] = []
  total = len(repo_urls)

  for idx, url in enumerate(repo_urls, start=1):
    prefix = f"[{idx}/{total}]"
    try:
      owner, repo = parse_repo_url(url)
    except ValueError as exc:
      print(f"{prefix} SKIP  {url}\n       {exc}")
      failed.append((url, str(exc)))
      continue

    fork_name = name_fn(url) if name_fn else None
    dest = f"{org}/{fork_name}" if fork_name else f"{org}/{repo}"
    print(f"{prefix} Forking {owner}/{repo} -> {dest} ...", end=" ", flush=True)

    # Retry once on rate-limit
    for attempt in range(2):
      success, detail = _fork_repository(session, owner, repo, org, fork_name)
      if success:
        print(f"OK  {detail}")
        succeeded.append(detail)
        break
      if "rate limit" in detail.lower() and attempt == 0:
        _handle_rate_limit(session)
        continue
      print(f"FAILED\n       {detail}")
      failed.append((url, detail))
      break

    if idx < total:
      time.sleep(delay)

  return succeeded, failed
