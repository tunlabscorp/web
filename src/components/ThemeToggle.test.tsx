// Copyright (c) Tunlabs Corp. All rights reserved.

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('defaults to dark mode', () => {
    render(<ThemeToggle />)
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles theme and persists to localStorage', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button'))
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')

    await user.click(screen.getByRole('button'))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
