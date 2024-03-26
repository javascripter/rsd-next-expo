import { css, html } from 'react-strict-dom'
import { Link } from '../../components/link'
import { platform } from './platform'

const styles = css.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: 'rgb(249 250 251 / 0.9)',

    width: '100%',
    boxSizing: 'border-box',
    padding: 12,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 4,
    alignItems: 'center',
    textAlign: 'center',
  },
  space: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'semibold',
    // tracking: 'tighter',
  },
  p: {
    color: 'rgb(107 114 128)',
    fontSize: 16,
  },
  link: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: 'rgb(229 231 235)',
    color: 'rgb(0 0 0)',
    paddingInline: 32,
    fontSize: 14,
    fontWeight: 'semibold',
    gap: 6,
  },
})

export function OnboardingScreen() {
  return (
    <html.div style={styles.root}>
      <html.div style={styles.container}>
        <html.div style={styles.space}>
          <html.h1 style={styles.h1}>RSD with Expo + Next.js 🚧</html.h1>
          <html.p style={styles.p}>
            An example {platform === 'native' ? 'Expo' : 'Next.js'} app with
            React Strict DOM, Next.js, Expo, Jest, TypeScript, ESLint, Prettier,
            and more.
          </html.p>
        </html.div>
        <Link style={styles.link} href={'/hello'}>
          Link is working! 🚀
        </Link>
      </html.div>
    </html.div>
  )
}
