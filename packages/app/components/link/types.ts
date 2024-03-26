import { type html } from 'react-strict-dom'

export type LinkProps = React.ComponentProps<typeof html.a> & {
  replace?: boolean
}
