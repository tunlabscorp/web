// Copyright (c) Tunlabs Corp. All rights reserved.

import { useEffect, useRef, useState } from 'react'

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  const [approach, setApproach] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      setApproach(
        Math.min(1, Math.max(0, (vh - rect.top) / vh)),
      )
      const total = rect.height - vh
      if (total > 0) {
        setProgress(Math.min(1, Math.max(0, -rect.top / total)))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { ref, progress, approach }
}
