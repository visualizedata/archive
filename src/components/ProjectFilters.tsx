import { useState } from 'react'
import { SearchIcon, Filter, X } from 'lucide-react'

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

  // Sort themes alphabetically
  const sortedThemeOptions = [...themeOptions].sort((a, b) => a.localeCompare(b))

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

  const getActiveFiltersCount = () => {
    let count = 0
    if (theme) count++
    if (category) count++
    if (year) count++
    return count
  }

  return (
    <>
      <div className="w-full space-y-4">
        {/* Desktop and Mobile Layout */}
        <div className="w-full flex items-center">
          {/* Desktop Filters - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {/* Themes Filter */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => handleFilterClick('themes')}
                className={`text-2xl font-bold uppercase transition-colors ${
                  theme || openFilter === 'themes'
                    ? 'text-black'
                    : 'text-black/30 hover:text-black'
                }`}
              >
                {theme ? theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'THEMES'}
              </button>
              {theme && (
                <button
                  onClick={() => onThemeChange(null)}
                  className="text-black/30 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => handleFilterClick('courses')}
                className={`text-2xl font-bold uppercase transition-colors ${
                  category || openFilter === 'courses'
                    ? 'text-black'
                    : 'text-black/30 hover:text-black'
                }`}
              >
                {category || 'COURSES'}
              </button>
              {category && (
                <button
                  onClick={() => onCategoryChange(null)}
                  className="text-black/30 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Years Filter */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => handleFilterClick('years')}
                className={`text-2xl font-bold uppercase transition-colors ${
                  year || openFilter === 'years'
                    ? 'text-black'
                    : 'text-black/30 hover:text-black'
                }`}
              >
                {year || 'YEARS'}
              </button>
              {year && (
                <button
                  onClick={() => onYearChange(null)}
                  className="text-black/30 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Search Input - Grouped with filters */}
            <div className="flex items-center gap-2">
              <SearchIcon 
                size={24} 
                className={`transition-colors fill-none stroke-[3]`}
                style={{ color: searchQuery ? 'black' : '#B2B2B2' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="SEARCH"
                className={`border-0 bg-transparent outline-none text-2xl font-bold uppercase transition-colors ${
                  searchQuery 
                    ? 'text-black placeholder:text-black/30' 
                    : 'text-black/30 placeholder:text-black/30 hover:text-black focus:!text-black'
                }`}
              />
            </div>
          </div>

          {/* Mobile Layout - Visible only on mobile */}
          <div className="md:hidden flex items-center gap-2 w-full">
            <button
              onClick={() => handleFilterClick('themes')}
              className={`text-base font-bold uppercase transition-colors ${
                theme || openFilter === 'themes'
                  ? 'text-black'
                  : 'text-black/30 hover:text-black'
              }`}
            >
              {theme ? theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'THEMES'}
            </button>
            
            <button
              onClick={() => handleFilterClick('courses')}
              className={`text-base font-bold uppercase transition-colors ${
                category || openFilter === 'courses'
                  ? 'text-black'
                  : 'text-black/30 hover:text-black'
              }`}
            >
              {category || 'COURSES'}
            </button>
            
            <button
              onClick={() => handleFilterClick('years')}
              className={`text-base font-bold uppercase transition-colors ${
                year || openFilter === 'years'
                  ? 'text-black'
                  : 'text-black/30 hover:text-black'
              }`}
            >
              {year || 'YEARS'}
            </button>

            <div className="flex items-center gap-1 flex-1">
              <SearchIcon 
                size={16} 
                className={`transition-colors fill-none stroke-[3]`}
                style={{ color: searchQuery ? 'black' : '#B2B2B2' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="SEARCH"
                className={`flex-1 border-0 bg-transparent outline-none text-base font-bold uppercase transition-colors ${
                  searchQuery 
                    ? 'text-black placeholder:text-black/30' 
                    : 'text-black/30 placeholder:text-black/30 hover:!text-black focus:!text-black'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Expandable Options Row - Shows on all devices */}
        {openFilter && (
          <div className="py-4 border-t border-gray-200">
            {openFilter === 'themes' && (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-x-8 gap-y-2 items-start leading-tight">
                {sortedThemeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('themes', option)}
                    className="text-left text-base capitalize text-black hover:text-black/30 transition-colors font-bold hyphens-auto break-words leading-tight"
                    style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {option.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            )}

            {openFilter === 'courses' && (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-8 gap-y-2 items-start leading-tight">
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('courses', option)}
                    className="text-left text-base text-black hover:text-black/30 transition-colors font-bold hyphens-auto break-words leading-tight"
                    style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {openFilter === 'years' && (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-8 gap-y-2 items-start leading-tight">
                {yearOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('years', option.toString())}
                    className="text-left text-base text-black hover:text-black/30 transition-colors font-bold hyphens-auto break-words leading-tight"
                    style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
