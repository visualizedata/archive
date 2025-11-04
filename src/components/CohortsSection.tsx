interface CohortData {
  [year: number]: string[]
}

interface CohortsProps {
  cohortData: CohortData
}

export function CohortsSection({ cohortData }: CohortsProps) {
  const years = Object.keys(cohortData)
    .map(year => parseInt(year))
    .sort((a, b) => b - a) // Sort years descending (newest first)

  if (years.length === 0) {
    return <div>No cohort data available</div>
  }

  // Find the year with the most names to set container height
  const maxNames = Math.max(...Object.values(cohortData).map(names => names.length))

  return (
    <section className="mb-16">
      <div className="grid grid-cols-[100px_1fr] items-start gap-8 text-base">
        <div className="font-bold">Cohorts</div>
        
        {/* Horizontally Scrollable Container */}
        <div className="relative">
          <div 
            className="overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ 
              height: `${maxNames * 1.75 + 6}rem`, // Height based on most students + header + padding
              width: '100%'
            }}
          >
            {/* Content that holds ALL cohorts in a horizontal row */}
            <div 
              className="flex gap-10 h-full"
              style={{
                width: 'max-content',
                minWidth: '150%' // Force content to be wider than container
              }}
            >
              
              {years.map(year => {
                // Calculate width based on longest name in this year
                const longestName = cohortData[year].reduce((longest, current) => 
                  current.length > longest.length ? current : longest, ''
                )
                const estimatedWidth = Math.max(120, longestName.length * 9 + 30) // Slightly wider for safety
                
                return (
                  <div 
                    key={year} 
                    className="flex-none"
                    style={{ width: `${estimatedWidth}px` }}
                  >
                    <h3 className="font-bold mb-4 border-b-2 border-black pb-2 text-base whitespace-nowrap">
                      {year}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {cohortData[year].map((name, index) => (
                        <div key={`${year}-${index}`} className="whitespace-nowrap">{name}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
              
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F7F7F7] to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}