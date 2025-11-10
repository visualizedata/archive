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

  // Calculate exact width needed - sum of all column widths + gaps
  const exactWidth = years.reduce((totalWidth, year) => {
    const longestName = cohortData[year].reduce((longest, current) => 
      current.length > longest.length ? current : longest, ''
    )
    const columnWidth = Math.max(150, longestName.length * 8 + 20) // Base width calculation
    return totalWidth + columnWidth
  }, 0) + (years.length - 1) * 40 // Add gaps (2.5rem = 40px between columns)

  return (
    <section className="mb-16">
      <div className="grid grid-cols-[100px_1fr] items-start gap-8 text-base">
        <div className="font-bold">Cohorts</div>
        
        {/* Horizontally Scrollable Container */}
        <div 
          style={{ 
            height: `${maxNames * 1.75 + 6}rem`,
            overflowX: 'auto',
            overflowY: 'hidden'
          }}
        >
          <div 
            style={{ 
              display: 'flex',
              gap: '2.5rem',
              width: `${exactWidth}px` // Exact width - no extra space
            }}
          >
            {years.map(year => {
              // Calculate this column's width
              const longestName = cohortData[year].reduce((longest, current) => 
                current.length > longest.length ? current : longest, ''
              )
              const columnWidth = Math.max(150, longestName.length * 8 + 20)
              
              return (
                <div key={year} style={{ minWidth: `${columnWidth}px`, flexShrink: 0 }}>
                  <h3 style={{ 
                    marginBottom: '1rem', 
                    borderBottom: '1px solid black', 
                    paddingBottom: '0.5rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {year}
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    {cohortData[year].map((name, index) => (
                      <div key={`${year}-${index}`} style={{ 
                        whiteSpace: 'nowrap', 
                        marginBottom: '0.25rem' 
                      }}>
                        <a 
                          href={`/archive/?q=${encodeURIComponent(name)}`}
                          className="text-black/50 hover:text-black transition-colors duration-200"
                        >
                          {name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}