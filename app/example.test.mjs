/* eslint-env jest */
///<reference types="@types/jest"/>
import { defineComponent } from 'vue'
import { render, fireEvent } from '@testing-library/vue'

/*------------------------------------------------
  This file demonstrates how to create a test 
  script with @testing-library/vue and jest.
/-----------------------------------------------*/

// 1. define a component
const Component = defineComponent({
  name: 'HelloWorld',
  expose: [],
  data: () => ({
    count: 0,
  }),
  methods: {
    inc() {
      this.count++
    },
  },
  template: `<div>
    <h1>Hello, World</h1>
    <p>Count {{count}}</p>
    <button @click="inc">+</button>
  </div>`,
})

// 2. create a test suite
describe('example test', () => {
  // 3. create a single test
  it('always passes', async () => {
    // 4. render component to screen
    const screen = render(Component)

    // 5. look up button element
    const button = screen.getByText('+')

    // 6. dispatch a click event on the button
    await fireEvent.click(button)

    // 7. expect the component to have an element
    // with the innerText of `Count 1`
    expect(screen.getByText('Count 1')).toBeTruthy()
  })
})
