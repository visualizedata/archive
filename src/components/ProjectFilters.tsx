import { useState } from 'react'
import { SearchIcon } from 'lucide-react'

type FilterProps = {
  categoryOptions: string[]
  yearOptions: number[]
  themeOptions: string[]
  category: string | null
  year: string | null
  theme: string | null
  searchQuery: string
  onCategoryChange: (value: string | null) => void
  onYearChange: (value: string | null) => void
  onThemeChange: (value: string | null) => void
  onSearchChange: (value: string) => void
}

type FilterType = 'themes' | 'courses' | 'years' | null

export const ProjectFilters = ({
  categoryOptions,
  yearOptions,
  themeOptions,
  category,
  year,
  theme,
  searchQuery,
  onCategoryChange,
  onYearChange,
  onThemeChange,
  onSearchChange,
}: FilterProps) => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null)

  const handleFilterClick = (filterType: FilterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType)
  }

  const handleOptionSelect = (filterType: FilterType, value: string) => {
    if (filterType === 'themes') {
      onThemeChange(value)
    } else if (filterType === 'courses') {
      onCategoryChange(value)
    } else if (filterType === 'years') {
      onYearChange(value)
    }
    setOpenFilter(null) // Close the filter row after selection
  }

  return (
    <div className="w-full space-y-4">
      {/* Search Bar and Filter Tags Row */}
      <div className="w-full flex items-center justify-between">
        {/* Search Bar - Left aligned */}
        <div className={'flex-1 flex items-center gap-2 px-2 py-1'}>
          <SearchIcon className={'size-6 opacity-20'} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full border-0 bg-transparent outline-none text-sm placeholder:text-neutral-500"
          />
        </div>

        {/* Filter Tags - Right aligned with 20px gaps */}
        <div className="flex items-center gap-5">
          {/* Themes Filter */}
          <button
            onClick={() => handleFilterClick('themes')}
            className={`px-4 py-2.5 text-sm rounded-lg bg-white/85 transition-colors ${
              theme || openFilter === 'themes'
                ? 'text-black'
                : 'text-black/50 hover:text-black'
            }`}
          >
            {theme ? theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'All Themes'}
          </button>

          {/* Categories Filter */}
          <button
            onClick={() => handleFilterClick('courses')}
            className={`px-4 py-2.5 text-sm rounded-lg bg-white/85 transition-colors ${
              category || openFilter === 'courses'
                ? 'text-black'
                : 'text-black/50 hover:text-black'
            }`}
          >
            {category || 'All Courses'}
          </button>

          {/* Years Filter */}
          <button
            onClick={() => handleFilterClick('years')}
            className={`px-4 py-2.5 text-sm rounded-lg bg-white/85 transition-colors ${
              year || openFilter === 'years'
                ? 'text-black'
                : 'text-black/50 hover:text-black'
            }`}
          >
            {year || 'All Years'}
          </button>
        </div>
      </div>

      {/* Expandable Options Row */}
      {openFilter && (
        <div className="flex flex-wrap justify-end gap-2 py-4 border-t border-gray-200">
          {openFilter === 'themes' && (
            <>
              <button
                onClick={() => handleOptionSelect('themes', '')}
                className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors"
              >
                All Themes
              </button>
              {themeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect('themes', option)}
                  className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors capitalize"
                >
                  {option.replace(/-/g, ' ')}
                </button>
              ))}
            </>
          )}

          {openFilter === 'courses' && (
            <>
              <button
                onClick={() => handleOptionSelect('courses', '')}
                className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors"
              >
                All Courses
              </button>
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect('courses', option)}
                  className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors"
                >
                  {option}
                </button>
              ))}
            </>
          )}

          {openFilter === 'years' && (
            <>
              <button
                onClick={() => handleOptionSelect('years', '')}
                className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors"
              >
                All Years
              </button>
              {yearOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect('years', option.toString())}
                  className="px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors"
                >
                  {option}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
