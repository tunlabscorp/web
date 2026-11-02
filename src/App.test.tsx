// Copyright (c) Tunlabs Corp. All rights reserved.

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import './i18n'
import App from './App'

describe('App', () => {
  it('renders the landing sections', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
