import {
  MediaPlayer,
  MediaProvider,
  Poster,
  useMediaState,
} from '@vidstack/react'
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default'
import { useEffect, useState } from 'react'

type VideoPlayerProps = {
  src: string
  poster?: string
  title?: string
}

const VideoPoster = ({ src, title }: { src: string; title: string }) => {
  const isPlaying = useMediaState('playing')
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (isPlaying === true) {
      setHasPlayed(true)
    }
  }, [isPlaying])

  if (isPlaying || hasPlayed) {
    return null
  }

  return (
    <Poster
      src={src}
      alt={title}
      className="absolute inset-0 object-cover opacity-100"
    />
  )
}

export const VideoPlayer = ({ src, poster, title }: VideoPlayerProps) => {
  if (!src) return null

  return (
    <div className="w-full aspect-video relative isolate rounded-none">
      <MediaPlayer 
        title={title} 
        src={src} 
        className="absolute inset-0 rounded-none [&>*]:rounded-none [&_video]:rounded-none [&_*]:rounded-none"
      >
        <MediaProvider className="rounded-none">
          {poster && <VideoPoster src={poster} title={title} />}
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  )
}
