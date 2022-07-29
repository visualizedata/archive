/* eslint-env jest */
///<reference types="@types/jest"/>
///<reference types="@types/jest-axe"/>

import { defineComponent } from 'vue'
import { render } from '@testing-library/vue'
import { axe } from 'jest-axe'
import ProjectCard from './ProjectCard.vue'

const Component = defineComponent({
  name: 'ProjectCardTest',
  components: {
    ProjectCard,
  },
  template: `<div>
  <ProjectCard
            title="Example Title"
            :year="2022"
            author="Jane Doe"
            description="example description"
            slug="example-slug"
            imageUrl="foo.png"
            category="example"
            :tags="['tag1', 'tag2']"
        />
    </div>`,
})

describe('Project Card', () => {
  it('renders without a11y warnings', async () => {
    const screen = render(Component)

    const a11y = await axe(screen.container)

    expect(a11y).toHaveNoViolations()
  })
})
