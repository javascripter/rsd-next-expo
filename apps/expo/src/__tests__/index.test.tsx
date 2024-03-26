import path from 'path'
import { renderRouter, screen } from 'expo-router/testing-library'

const appDir = path.resolve(__dirname, '../../src/app')

let consoleError: jest.SpyInstance

beforeEach(() => {
  const originalConsoleError = console.error
  consoleError = jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      args.some((arg) =>
        /Invalid prop `position` of value `static` supplied to `Text`/.test(
          arg,
        ),
      )
    ) {
      return
    }
    return originalConsoleError.apply(this, args)
  })
})

afterEach(() => {
  consoleError.mockRestore()
})

it('Onboarding', async () => {
  renderRouter(appDir)
  expect(screen).toHavePathname('/')

  expect(
    screen.getByRole('link', { name: /view on github/i }),
  ).toBeOnTheScreen()
})
