// Copyright (c) Tunlabs Corp. All rights reserved.

import { useEffect, useRef } from 'react'

export function useParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`
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
  }, [speed])

  return ref
}
