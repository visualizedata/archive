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
  project_repo?: string
  student_url?: string
  subtitle?: string
}

type RelatedProjectsProps = {
  currentProject: Project
  filteredProjects: Project[]
  title: string
}

export const RelatedProjects = ({
  currentProject,
  filteredProjects,
  title,
}: RelatedProjectsProps) => {
  const [randomizedProjects, setRandomizedProjects] = useState<Project[]>(
    []
  )

  useEffect(() => {
    const shuffled = [...filteredProjects]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
    setRandomizedProjects(shuffled)
  }, [filteredProjects])

  if (randomizedProjects.length === 0) return null

  return (
    <div className="border-t pt-6 pb-8 border-neutral-300">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {randomizedProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  )
}
