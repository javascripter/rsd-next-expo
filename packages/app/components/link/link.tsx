'use client'
import NextLink from 'next/link'

import { html } from 'react-strict-dom'
import React from 'react'
import { LinkProps } from './types'
import { StrictElement } from 'react-strict-dom/dist/types/StrictElement'

export const Link = React.forwardRef<StrictElement, LinkProps>(
  ({ href, replace, ...rest }, hostRef) => {
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
      <NextLink
        href={href ?? {}}
        {...(replace !== undefined && {
          replace,
        })}
        passHref
        legacyBehavior
      >
        <html.a ref={setRef} {...rest} />
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
