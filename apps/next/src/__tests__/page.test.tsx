import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Onboarding', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toMatchInlineSnapshot(`
<h1
  class="runtime__styles.block runtime__styles.heading screen__styles.h1"
>
  RSD with Expo + Next.js 🚧
</h1>
`)
  })
})
