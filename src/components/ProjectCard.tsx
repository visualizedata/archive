import type { ProjectData } from '@/content.config'
import { motion } from 'motion/react'
import { useState } from 'react'

export function ProjectCard({ project }: { project: ProjectData }) {
  const [isInView, setIsInView] = useState(false)
  const base = import.meta.env.BASE_URL

  return (
    <div className="relative h-full flex flex-col">
      <div className="aspect-video bg-gray-100 rounded-[10px] overflow-hidden border border-gray-100">
        <motion.div
          onViewportEnter={() => setIsInView(true)}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          {isInView && (
            <img
              src={`${base}/images/${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>

      <div className="pt-3">
        <h2 className="text-sm text-balance">
          <span className="font-bold">{project.title}</span> by {project.author.join(', ')}
        </h2>
      </div>

      <a
        href={`${base}/projects/${project.id}`}
        className="block p-4 text-sm absolute inset-0"
      >
        <span className="sr-only">View Project</span>
      </a>
    </div>
  )
}
