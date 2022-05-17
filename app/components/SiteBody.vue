<template>
  <div class="body">
    <el-row>
      <Filters
        :filters="filters"
        :params="params"
        :nProjects="{
          filtered: filteredProjects.length,
          all: projects.length,
        }"
        :yearData="yearData"
      />
    </el-row>
    <el-row>
      <Projects
        :height="height"
        :width="width"
        :projects="filteredProjects"
      />
    </el-row>
    <SidePanel />
  </div>
</template>

<script>
import { rollup, ascending, descending } from 'd3-array'
import projects from '@/projects.json'
import { FILTERS, PARAMS } from '../constants'

import Projects from '@/components/Projects.vue'
import SidePanel from '@/components/SidePanel.vue'
import Filters from '@/components/Filters.vue'

export default {
  name: 'SiteBody',
  components: {
    Filters,
    Projects,
    SidePanel,
  },
  props: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      filters: FILTERS,
      params: PARAMS,
      projects: [],
    }
  },
  computed: {
    filteredProjects() {
      if (!this.projects.length) {
        return []
      }
      const { TAG, YEAR, SEARCH } = this.filters
      const { SORT } = this.params
      const sortParam = SORT.selected
      const isSortAsc = SORT.asc
      const searchTerm = SEARCH.selected.toLowerCase()

      return this.projects
        .filter(
          (d) =>
            d.year >= YEAR.selected[0] &&
            d.year <= YEAR.selected[1] &&
            (!TAG.selected.length ||
              TAG.selected.some((tag) => d.tags.includes(tag))) &&
            (!searchTerm || d.searchTarget.indexOf(searchTerm) !== -1)
        )
        .sort((a, b) =>
          isSortAsc
            ? ascending(a[sortParam], b[sortParam])
            : descending(a[sortParam], b[sortParam])
        )
    },
    yearData() {
      if (!this.projects.length) {
        return {
          filtered: [],
          all: [],
        }
      }
      const unfilteredYearData = [
        ...rollup(
          this.projects,
          (values) => values.length,
          (d) => d.year
        ),
      ].sort((a, b) => a[0] - b[0])
      const filteredYearMap = rollup(
        this.filteredProjects,
        (values) => values.length,
        (d) => d.year
      )
      // left join on unfiltered so every year has an entry, even if count is 0
      const filteredYearData = unfilteredYearData.map(([year]) => [
        year,
        filteredYearMap.get(year) || 0,
      ])
      return {
        filtered: filteredYearData,
        all: unfilteredYearData,
      }
    },
  },
  mounted() {
    this.projects = projects.students.map((d) => ({
      ...d,
      searchTarget: [d.name, d.title, d.description]
        .join(' ')
        .toLowerCase(),
    }))
    this.populateFilters()
  },
  methods: {
    onFilterChange(id, selected) {
      if (id === 'TAG') {
        this.filters = {
          ...this.filters,
          TAG: {
            ...this.filters.TAG,
            selected,
          },
        }
      }
      if (id === 'TAG_TOGGLE') {
        this.filters = {
          ...this.filters,
          TAG: {
            ...this.filters.TAG,
            selected: [
              ...new Set([...this.filters.TAG.selected, selected]),
            ],
          },
        }
      }
      if (id === 'YEAR') {
        this.filters = {
          ...this.filters,
          YEAR: {
            ...this.filters.YEAR,
            selected,
          },
        }
      }
      if (id === 'SEARCH') {
        this.filters = {
          ...this.filters,
          SEARCH: {
            ...this.filters.SEARCH,
            selected,
          },
        }
      }
      if (id === 'SORT') {
        this.params = {
          ...this.params,
          SORT: {
            ...this.params.SORT,
            selected,
            asc: true,
          },
        }
      }
      if (id === 'SORT_DIRECTION') {
        this.params = {
          ...this.params,
          SORT: {
            ...this.params.SORT,
            asc: !this.params.SORT.asc,
          },
        }
      }
    },
    populateFilters() {
      if (!this.projects) {
        return
      }
      let allTags = []
      let yearRange = [Infinity, -Infinity]
      for (let i = 0; i < this.projects.length; i++) {
        const { tags, year } = this.projects[i]
        allTags = [...allTags, ...tags]
        yearRange = [
          Math.min(year, yearRange[0]),
          Math.max(year, yearRange[1]),
        ]
      }
      this.filters = {
        ...this.filters,
        TAG: {
          ...this.filters.TAG,
          options: [...new Set(allTags)].sort(),
        },
        YEAR: {
          ...this.filters.YEAR,
          options: yearRange,
          selected: yearRange,
        },
      }
    },
  },
}
</script>
