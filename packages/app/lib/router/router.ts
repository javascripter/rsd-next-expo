import * as ExpoRouter from 'expo-router'

import type * as NextNavigation from 'next/navigation'
import React from 'react'

function useLocalSegments() {
  // Unlike useLocalSearchParams, useSegments is global and updates when another screen is navigated to.
  // We need to delay the update of the local segments until the screen is focused for consistency.
  const globalSegments = ExpoRouter.useSegments()
  const [localSegments, setLocalSegments] = React.useState(globalSegments)

  ExpoRouter.useFocusEffect(
    React.useCallback(() => {
      setLocalSegments(globalSegments)
    }, [globalSegments]),
  )

  return localSegments
}

export const useRouter: typeof NextNavigation.useRouter = () => {
  const expoRouter = ExpoRouter.useRouter()

  const router: ReturnType<typeof NextNavigation.useRouter> =
    React.useMemo(() => {
      return {
        back() {
          expoRouter.back()
        },
        forward() {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('forward is not supported in Expo Router')
          }
        },
        refresh() {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('refresh is not supported in Expo Router')
          }
        },
        push(href, options) {
          if (process.env.NODE_ENV !== 'production') {
            if (options?.scroll === false) {
              console.warn('scroll: false is not supported in Expo Router')
            }
          }
          expoRouter.push(href)
        },
        replace(href) {
          expoRouter.replace(href)
        },
        prefetch(_href, _options) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('prefetch is not supported in Expo Router')
          }
        },
      }
    }, [expoRouter])
  return router
}

export const usePathname: typeof NextNavigation.usePathname = () => {
  return ExpoRouter.usePathname()
}

export const useSearchParams: typeof NextNavigation.useSearchParams = () => {
  const localSearchParams = ExpoRouter.useLocalSearchParams()
  // Expo Router merges the segments into the search params, so we need to filter them out.
  const segments = useLocalSegments()

  const searchParams = React.useMemo(() => {
    const searchParams = new URLSearchParams()
    // We need to iterate over the entries and append them to the URLSearchParams
    // because some keys can have multiple values (e.g. /?a=1&a=2).
    for (const [key, value] of Object.entries(localSearchParams)) {
      if (segments.includes(`[${key}]`)) {
        continue
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, item)
        }
      } else if (value !== undefined) {
        searchParams.append(key, value)
      }
    }

    return searchParams
  }, [localSearchParams, segments])

  return searchParams as NextNavigation.ReadonlyURLSearchParams
}

export const useParams: typeof NextNavigation.useParams = (() => {
  const localSearchParams = ExpoRouter.useLocalSearchParams()
  const segments = useLocalSegments()
  const params = React.useMemo(() => {
    const params: Record<string, string | string[]> = {}
    for (const segment of segments) {
      const match = segment.match(/^\[(.+)\]$/)
      if (match) {
        const key = match[1]!
        params[key] = localSearchParams[key]!
      }
    }
    return params
  }, [localSearchParams, segments])

  return params
}) as typeof NextNavigation.useParams
