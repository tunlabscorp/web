// Copyright (c) Tunlabs Corp. All rights reserved.

import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

type Origin = { x: number; y: number }

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
  }
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = useCallback(
    (origin?: Origin) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const doc = document as ViewTransitionDocument
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (!doc.startViewTransition || reduced) {
        setTheme(next)
        return
      }

      const root = document.documentElement
      const mobile =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768
      const x = (origin?.x ?? window.innerWidth / 2) + (mobile ? window.scrollX : 0)
      const y = (origin?.y ?? window.innerHeight / 2) + (mobile ? window.scrollY : 0)
      const maxR = Math.hypot(
        Math.max(x - window.scrollX, window.scrollX + window.innerWidth - x),
        Math.max(y - window.scrollY, window.scrollY + window.innerHeight - y),
      )
      const recede = next === 'dark'
      if (recede) root.classList.add('vt-recede')

      const vt = doc.startViewTransition(() => {
        flushSync(() => setTheme(next))
        root.classList.toggle('dark', next === 'dark')
      })

      let anim: Animation | undefined
      void vt.ready
        .then(() => {
          const frames = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxR}px at ${x}px ${y}px)`,
          ]
          anim = root.animate(
            { clipPath: recede ? [frames[1], frames[0]] : frames },
            {
              duration: 750,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: recede
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
              fill: 'forwards',
            },
          )
        })
        .catch(() => {})

      void vt.finished.finally(() => {
        anim?.cancel()
        root.classList.remove('vt-recede')
      })
    },
    [theme],
  )

  return { theme, toggle }
}
