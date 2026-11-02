// Copyright (c) Tunlabs Corp. All rights reserved.

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

type ParticlesProps = {
  className?: string
  linkDistance?: number
  interactive?: boolean
}

export function Particles({
  className = '',
  linkDistance = 120,
  interactive = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = false
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let mouse: { x: number; y: number } | null = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        110,
        Math.max(35, Math.floor((width * height) / 12000)),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
      }))
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
          ? { x, y }
          : null
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const dark = document.documentElement.classList.contains('dark')
      const dot = dark ? 'rgba(196, 157, 255,' : 'rgba(124, 58, 237,'
      const line = dark ? 'rgba(168, 130, 255,' : 'rgba(124, 58, 237,'

      for (const p of particles) {
        if (interactive && mouse) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 0.01) {
            const force = (1 - dist / 140) * 0.8
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${dot} 0.75)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < linkDistance) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${line} ${(1 - dist / linkDistance) * 0.28})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        if (interactive && mouse) {
          const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          const reach = linkDistance * 1.4
          if (dist < reach) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `${line} ${(1 - dist / reach) * 0.5})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const tick = () => {
      draw()
      if (running) raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw()
    } else {
      const onVisibility = () => (document.hidden ? stop() : start())
      document.addEventListener('visibilitychange', onVisibility)
      if (interactive) {
        window.addEventListener('pointermove', onPointerMove, {
          passive: true,
        })
      }
      if (typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver(([e]) =>
          e.isIntersecting ? start() : stop(),
        ).observe(canvas)
      } else {
        start()
      }
    }

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(resize)
        : undefined
    ro?.observe(canvas)
    if (!ro) window.addEventListener('resize', resize)

    return () => {
      stop()
      ro?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', () => {})
    }
  }, [interactive, linkDistance])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
