/* eslint-disable no-undef */
export default function fbTrack(a, b, c) {
  if (process.env.NODE_ENV === `production` && typeof fbq === `function`) {
    fbq(a, b, c)
  }
}
