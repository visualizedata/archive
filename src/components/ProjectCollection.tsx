import type { ProjectData, projectSchema } from '@/content.config'
import { useState, useEffect } from 'react'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters } from './ProjectFilters'
import FeaturedCarousel from './FeaturedCarousel'

type Props = {
  projects: ProjectData[]
  highlightedIds?: string[]
}

export default function FilterableProjects({ projects, highlightedIds = [] }: Props) {
  const categoryOptions = projects.reduce<string[]>((acc, p) => {
    p.category.forEach((c) => {
      if (!acc.includes(c)) {
        acc.push(c)
      }
    })
    return acc
  }, [])

  const yearOptions = [...new Set(projects.map((p) => p.year))].sort(
    (a, b) => b - a
  )
  const tagOptions = [...new Set(projects.flatMap((p) => p.tags))].sort()

  const [category, setCategory] = useState<string | null>(null)
  const [year, setYear] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const resetFilters = () => {
    setCategory(null)
    setYear(null)
    setSelectedTags([])
    setSearchQuery('')
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    const yr = params.get('year')
    const tags = params.get('tags')?.split(',') ?? []
    const query = params.get('q') ?? ''
    setCategory(cat)
    setYear(yr)
    setSelectedTags(tags)
    setSearchQuery(query)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    if (year) {
      params.set('year', year)
    } else {
      params.delete('year')
    }
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','))
    } else {
      params.delete('tags')
    }
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, '', newUrl)
  }, [category, year, selectedTags, searchQuery])

  const filtered = projects.filter((project) => {
    if (category && !project.category?.includes(category)) return false
    if (year && project.year.toString() !== year) return false
    if (
      selectedTags.length > 0 &&
      !selectedTags.every((tag) => project.tags.includes(tag))
    )
      return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const searchableText = [
        project.title,
        project.description,
        ...project.tags,
        ...project.author,
      ]
        .join(' ')
        .toLowerCase()
      if (!searchableText.includes(query)) return false
    }

    return true
  })

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // Check if any filters are active
  const hasActiveFilters = category !== null || year !== null ||
                          selectedTags.length > 0 || searchQuery.trim() !== '';

  return (
    <div className="max-w-[2000px] mx-auto">
      {/* Featured carousel - always shown when highlighted projects exist */}
      {highlightedIds.length > 0 && (
        <div className="mb-8">
          <FeaturedCarousel highlightedIds={highlightedIds} allProjects={projects} />
        </div>
      )}

      <div className={'pb-6'}>
        <ProjectFilters
          categoryOptions={categoryOptions}
          yearOptions={yearOptions}
          tagOptions={tagOptions}
          category={category}
          year={year}
          selectedTags={selectedTags}
          searchQuery={searchQuery}
          onCategoryChange={setCategory}
          onYearChange={setYear}
          onTagChange={handleTagChange}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? `No projects match "${searchQuery}"`
                : 'Try adjusting your filters to see more results'}
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            {filtered.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
