// Copyright (c) Tunlabs Corp. All rights reserved.

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const progress = max > 0 ? el.scrollTop / max : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-brand-400 to-brand-300"
      />
    </div>
  )
}
