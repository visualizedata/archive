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
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showAllThemes, setShowAllThemes] = useState(false)

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
        <div className="w-full flex items-center justify-between">
          {/* Search Bar - Always visible */}
          <div className={'flex-1 flex items-center gap-2 px-2 py-1 max-w-md'}>
            <SearchIcon className={'size-6 opacity-20'} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="w-full border-0 bg-transparent outline-none text-sm placeholder:text-neutral-500"
            />
          </div>

          {/* Desktop Filters - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-5">
            {/* Themes Filter */}
            <div className="flex items-center gap-0.5">
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
              {theme && (
                <button
                  onClick={() => onThemeChange(null)}
                  className="text-black/50 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div className="flex items-center gap-0.5">
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
              {category && (
                <button
                  onClick={() => onCategoryChange(null)}
                  className="text-black/50 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>

            {/* Years Filter */}
            <div className="flex items-center gap-0.5">
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
              {year && (
                <button
                  onClick={() => onYearChange(null)}
                  className="text-black/50 hover:text-black transition-colors p-1"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Button - Visible only on mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="relative px-4 py-2.5 text-sm rounded-lg bg-white/85 text-black/50 hover:text-black transition-colors flex items-center gap-2"
            >
              <Filter className="size-4" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Expandable Options Row */}
        {openFilter && (
          <div className="hidden md:flex flex-wrap justify-end gap-2 py-2 border-t border-gray-200 leading-tight">
            {openFilter === 'themes' && (
              <>
                <button
                  onClick={() => handleOptionSelect('themes', '')}
                  className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors capitalize"
                >
                  All Themes
                </button>
                {(showAllThemes ? themeOptions : themeOptions.slice(0, 10)).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('themes', option)}
                    className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors capitalize"
                  >
                    {option.replace(/-/g, ' ')}
                  </button>
                ))}
                {themeOptions.length > 10 && !showAllThemes && (
                  <button
                    onClick={() => setShowAllThemes(true)}
                    className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
                  >
                    +{themeOptions.length - 10} more
                  </button>
                )}
                {showAllThemes && themeOptions.length > 10 && (
                  <button
                    onClick={() => setShowAllThemes(false)}
                    className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
                  >
                    Show less
                  </button>
                )}
              </>
            )}

            {openFilter === 'courses' && (
              <>
                <button
                  onClick={() => handleOptionSelect('courses', '')}
                  className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
                >
                  All Courses
                </button>
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('courses', option)}
                    className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
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
                  className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
                >
                  All Years
                </button>
                {yearOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('years', option.toString())}
                    className="px-3 py-1.5 text-sm text-black/50 hover:text-black transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/20 md:hidden">
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Active Filters Summary */}
            {getActiveFiltersCount() > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {theme && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                      Theme: {theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <button onClick={() => onThemeChange('')} className="text-gray-500 hover:text-gray-700">
                        <X className="size-3" />
                      </button>
                    </span>
                  )}
                  {category && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                      Course: {category}
                      <button onClick={() => onCategoryChange('')} className="text-gray-500 hover:text-gray-700">
                        <X className="size-3" />
                      </button>
                    </span>
                  )}
                  {year && (
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                      Year: {year}
                      <button onClick={() => onYearChange('')} className="text-gray-500 hover:text-gray-700">
                        <X className="size-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Filter Sections */}
            <div className="space-y-6">
              {/* Themes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Themes</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onThemeChange('')
                      setShowMobileFilters(false)
                    }}
                    className={`px-2 py-2 text-xs rounded-lg border text-left transition-colors ${
                      !theme ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Themes
                  </button>
                  {(showAllThemes ? themeOptions : themeOptions.slice(0, 10)).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onThemeChange(option)
                        setShowMobileFilters(false)
                      }}
                      className={`px-2 py-2 text-xs rounded-lg border text-left transition-colors capitalize ${
                        theme === option ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.replace(/-/g, ' ')}
                    </button>
                  ))}
                  {themeOptions.length > 10 && !showAllThemes && (
                    <button
                      onClick={() => setShowAllThemes(true)}
                      className="px-2 py-2 text-xs rounded-lg border transition-colors bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      +{themeOptions.length - 10} more
                    </button>
                  )}
                  {showAllThemes && themeOptions.length > 10 && (
                    <button
                      onClick={() => setShowAllThemes(false)}
                      className="px-2 py-2 text-xs rounded-lg border transition-colors bg-gray-50 text-gray-600 hover:bg-gray-100"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>

              {/* Courses */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Courses</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onCategoryChange('')
                      setShowMobileFilters(false)
                    }}
                    className={`px-2 py-2 text-xs rounded-lg border text-left transition-colors ${
                      !category ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Courses
                  </button>
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onCategoryChange(option)
                        setShowMobileFilters(false)
                      }}
                      className={`px-2 py-2 text-xs rounded-lg border text-left transition-colors ${
                        category === option ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Years</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onYearChange('')
                      setShowMobileFilters(false)
                    }}
                    className={`px-2 py-2 text-xs rounded-lg border text-center transition-colors ${
                      !year ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Years
                  </button>
                  {yearOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onYearChange(option.toString())
                        setShowMobileFilters(false)
                      }}
                      className={`px-2 py-2 text-xs rounded-lg border text-center transition-colors ${
                        year === option.toString() ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
