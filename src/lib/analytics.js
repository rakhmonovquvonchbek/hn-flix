const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || ''
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || ''
const CONSENT_KEY = 'hnflix-analytics-consent'

let engagementStartedAt = null
let engagementInterval = null
let initialized = false

export function isAnalyticsConfigured() {
  return Boolean(GA_ID || CLARITY_ID)
}

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* ignore */
  }
}

export function shouldShowConsentBanner() {
  return isAnalyticsConfigured() && getConsent() === null
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.async = true
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

function initGa() {
  if (!GA_ID || window.gtag) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: true,
  })

  const params = new URLSearchParams(window.location.search)
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
    const value = params.get(key)
    if (value) {
      window.gtag('event', 'campaign_visit', { [key]: value })
    }
  })
}

function initClarity() {
  if (!CLARITY_ID || window.clarity) return

  window.clarity =
    window.clarity ||
    function clarityStub() {
      ;(window.clarity.q = window.clarity.q || []).push(arguments)
    }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
}

function trackEngagementSeconds(seconds) {
  if (!GA_ID || !window.gtag || seconds <= 0) return
  window.gtag('event', 'user_engagement', {
    engagement_time_msec: Math.round(seconds * 1000),
    page_path: window.location.pathname,
  })
}

function startEngagementTracking() {
  engagementStartedAt = Date.now()
  if (engagementInterval) clearInterval(engagementInterval)
  engagementInterval = window.setInterval(() => {
    if (document.visibilityState !== 'visible' || !engagementStartedAt) return
    const elapsed = (Date.now() - engagementStartedAt) / 1000
    trackEngagementSeconds(elapsed)
    engagementStartedAt = Date.now()
  }, 30000)

  const flush = () => {
    if (!engagementStartedAt) return
    const elapsed = (Date.now() - engagementStartedAt) / 1000
    trackEngagementSeconds(elapsed)
    engagementStartedAt = null
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
    else engagementStartedAt = Date.now()
  })
  window.addEventListener('pagehide', flush)
}

export async function initAnalytics() {
  if (initialized || getConsent() !== 'granted' || !isAnalyticsConfigured()) return
  initialized = true

  try {
    if (GA_ID) {
      await loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
      initGa()
    }
    initClarity()
    startEngagementTracking()
  } catch {
    initialized = false
  }
}

export function grantAnalyticsConsent() {
  setConsent('granted')
  initAnalytics()
}

export function denyAnalyticsConsent() {
  setConsent('denied')
}
