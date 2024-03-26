'use client'

import { html } from 'react-strict-dom'
import React from 'react'
import { LinkProps } from './types'
import { StrictElement } from 'react-strict-dom/dist/types/StrictElement'
import { StrictClickEvent } from 'react-strict-dom/dist/types/StrictReactDOMProps'
import { useRouter } from '../../lib/router'
import { Link as ExpoRouterLink } from 'expo-router'

export const Link = React.forwardRef<StrictElement, LinkProps>(
  ({ href, replace, onClick, ...rest }, hostRef) => {
    const router = useRouter()

    const handleClick = React.useCallback(
      (event: StrictClickEvent) => {
        onClick?.(event)
        if (
          (event as React.MouseEvent<HTMLAnchorElement, MouseEvent>)
            .defaultPrevented
        ) {
          return
        }

        if (
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.button !== 0 ||
          ![undefined, null, '', 'self'].includes(
            (event as React.MouseEvent<HTMLAnchorElement, MouseEvent>)
              .currentTarget?.target,
          )
        ) {
          return
        }

        const mouseEvent = event as React.MouseEvent<
          HTMLAnchorElement,
          MouseEvent
        >

        mouseEvent.preventDefault?.()

        if (href === undefined || href === '#') {
          return
        }

        if (replace) {
          router.replace(ExpoRouterLink.resolveHref(href))
        } else {
          router.push(ExpoRouterLink.resolveHref(href))
        }
      },
      [href, onClick, replace, router],
    )

    function setRef(node: StrictElement | null) {
      if (hostRef) {
        if (typeof hostRef === 'function') {
          hostRef(node)
        } else {
          hostRef.current = node
        }
      }
    }

    return (
      <html.a
        ref={setRef}
        {...rest}
        {...(href !== undefined && { href })}
        onClick={handleClick}
      />
    )
  },
)

Link.displayName = 'Link'
