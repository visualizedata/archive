import { ProjectCard } from './ProjectCard'
import { useEffect, useState } from 'react'

type Project = {
  id: string
  title?: string
  year?: number
  category?: string[]
  tags?: string[]
  author?: string[]
  description?: string
  image?: string[]
  video?: string[]
  project_url?: string
  repo_url?: string
  student_url?: string
  subtitle?: string
}

type RelatedProjectsProps = {
  currentProject: Project
  filteredProjects: Project[]
  title: string
  count: number
}

export const RelatedProjects = ({
  currentProject,
  filteredProjects,
  title,
  count=2,
}: RelatedProjectsProps) => {
  const [randomizedProjects, setRandomizedProjects] = useState<Project[]>(
    []
  )

  useEffect(() => {
    const shuffled = [...filteredProjects]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
    setRandomizedProjects(shuffled)
  }, [filteredProjects])

  if (randomizedProjects.length === 0) return null

  return (
    <div className="border-t pt-4 pb-12 border-neutral-300">
      <h2 className="capitalize text-sm md:text-base font-semibold mb-4">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {randomizedProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}
