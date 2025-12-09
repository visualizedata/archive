import type { ProjectData } from '@/content.config'
import { motion } from 'motion/react'
import { useState } from 'react'

export function ProjectCard({ project }: { project: ProjectData }) {
  const [isInView, setIsInView] = useState(false)
  const base = import.meta.env.BASE_URL

  const imgUrl = project.image[0].includes('http') ? project.image[0] : `${base}/images/${project.image[0]}`;

  return (
    <div className="relative h-full flex flex-col">
      <a
        href={`${base}/projects/${project.id}`}
        className="aspect-video bg-gray-100 overflow-hidden border border-gray-100 block"
      >
        <motion.div
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          {isInView && (
            <img
              src={imgUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </a>

      <div className="pt-2">
        <h2 className="text-sm md:text-base text-balance">
          <a
            href={`${base}/projects/${project.id}`}
            className="font-bold uppercase hover:text-black/70 transition-colors"
          >
            {project.title}
          </a>{' '}
          <a
            href={`${base}/?q=${encodeURIComponent(project.author.join(', '))}`}
            className="font-bold uppercase text-black/30 hover:text-black transition-colors relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {project.author.join(', ')}
          </a>
        </h2>
      </div>
    </div>
  )
}
