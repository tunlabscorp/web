// Copyright (c) Tunlabs Corp. All rights reserved.

import { useRef, type MouseEvent, type ReactNode } from 'react'

type TiltProps = {
  children: ReactNode
  className?: string
  max?: number
}

export function Tilt({ children, className = '', max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${
      px * max
    }deg)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`h-full transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
