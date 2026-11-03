import { useState } from 'react'
import {
  denyAnalyticsConsent,
  grantAnalyticsConsent,
  shouldShowConsentBanner,
} from '../lib/analytics'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(() => shouldShowConsentBanner())

  if (!visible) return null

  return (
    <div className="consent" role="dialog" aria-labelledby="consent-title">
      <div className="consent__inner">
        <p id="consent-title" className="consent__title">
          Analytics cookies
        </p>
        <p className="consent__text">
          We use privacy-conscious analytics (Google Analytics and Microsoft Clarity) to see visitor
          counts, where traffic comes from, and how long people browse. No payment data or accounts
          are collected on this site.
        </p>
        <div className="consent__actions">
          <button type="button" className="btn btn--primary consent__btn" onClick={() => {
            grantAnalyticsConsent()
            setVisible(false)
          }}>
            Accept
          </button>
          <button type="button" className="btn btn--ghost consent__btn" onClick={() => {
            denyAnalyticsConsent()
            setVisible(false)
          }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
