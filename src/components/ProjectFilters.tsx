import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { SearchIcon } from 'lucide-react'

type FilterProps = {
  categoryOptions: string[]
  yearOptions: number[]
  tagOptions: string[]
  category: string | null
  year: string | null
  selectedTags: string[]
  searchQuery: string
  onCategoryChange: (value: string | null) => void
  onYearChange: (value: string | null) => void
  onTagChange: (tag: string) => void
  onSearchChange: (value: string) => void
}

export const ProjectFilters = ({
  categoryOptions,
  yearOptions,
  tagOptions,
  category,
  year,
  selectedTags,
  searchQuery,
  onCategoryChange,
  onYearChange,
  onTagChange,
  onSearchChange,
}: FilterProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-6">
      <div className={'flex-1 flex items-center gap-2 px-2 py-1'}>
        <SearchIcon className={'size-6 opacity-20'} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full border-0 bg-transparent outline-none text-base placeholder:text-neutral-500"
        />
      </div>

      <div className={'shrink-0 h-14 flex items-center'}>
        <Select.Root
          value={category ?? 'all'}
          onValueChange={(value) =>
            onCategoryChange(value === 'all' ? null : value)
          }
        >
          <Select.Trigger className="text-base w-full flex gap-1 items-center justify-between focus:outline-none">
            <Select.Value placeholder="All Courses" />
            <Select.Icon>
              <ChevronDownIcon className="text-black dark:text-white shrink-0 size-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              align={'center'}
              side={'bottom'}
              position={'popper'}
              className="bg-white dark:bg-black border border-black/10 rounded shadow-lg"
            >
              <Select.Viewport className="p-1">
                <Select.Item
                  value="all"
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer text-black dark:text-white focus:outline-none focus:bg-black/5 dark:focus:bg-white/5"
                >
                  <Select.ItemText>All Courses</Select.ItemText>
                </Select.Item>
                {categoryOptions.map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer text-black dark:text-white focus:outline-none focus:bg-black/5 dark:focus:bg-white/5"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className={'shrink-0 h-14 flex items-center'}>
        <Select.Root
          value={year ?? 'all'}
          onValueChange={(value) =>
            onYearChange(value === 'all' ? null : value)
          }
        >
          <Select.Trigger className="text-base w-full flex items-center justify-between focus:outline-none">
            <Select.Value placeholder="All years" />
            <Select.Icon>
              <ChevronDownIcon className="text-black dark:text-white" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position={'popper'}
              align={'center'}
              side={'bottom'}
              className="bg-white dark:bg-black border border-black/10 rounded shadow-lg"
            >
              <Select.Viewport className="p-1">
                <Select.Item
                  value="all"
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer text-black dark:text-white focus:outline-none focus:bg-black/5 dark:focus:bg-white/5"
                >
                  <Select.ItemText>All Years</Select.ItemText>
                </Select.Item>
                {yearOptions.map((option) => (
                  <Select.Item
                    key={option}
                    value={option.toString()}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded cursor-pointer text-black dark:text-white focus:outline-none focus:bg-black/5 dark:focus:bg-white/5"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className={'hidden'}>
        <Label.Root className="block mb-2 text-sm font-medium text-black dark:text-white">
          Tags
        </Label.Root>
        <div className="space-y-2">
          {tagOptions.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox.Root
                id={`tag-${tag}`}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => onTagChange(tag)}
                className="w-4 h-4 border border-black/10 rounded flex items-center justify-center bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="w-3 h-3" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Label.Root
                htmlFor={`tag-${tag}`}
                className="text-sm text-black dark:text-white"
              >
                {tag}
              </Label.Root>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
