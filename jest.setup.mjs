/* eslint-env jest */
///<reference types="@types/jest"/>
import { toHaveNoViolations } from 'jest-axe'

// extend expect
expect.extend(toHaveNoViolations)
