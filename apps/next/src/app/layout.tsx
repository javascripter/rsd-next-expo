import './stylex.css'

import { css } from 'react-strict-dom'

export const metadata = {
  title: 'RSD with Expo + Next.js',
  description: 'An application built with React Strict DOM with code-sharing between Expo and Next.js without using React Native for Web.',
}

const styles = css.create({
  html: {
    height: '100%',
    margin: 0,
    padding: 0,
  },
  body: {
    display: 'flex',
    height: '100%',
    margin: 0,
    padding: 0,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html {...css.props(styles.html)}>
      <body {...css.props(styles.body)}>{children}</body>
    </html>
  )
}
