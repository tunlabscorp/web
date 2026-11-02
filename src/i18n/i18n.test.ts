// Copyright (c) Tunlabs Corp. All rights reserved.

import { describe, expect, it } from 'vitest'
import i18n from './index'

describe('i18n', () => {
  it('detects a supported language', () => {
    expect(i18n.language.split('-')[0]).toMatch(/^(en|es)$/)
  })

  it('translates to spanish', async () => {
    await i18n.changeLanguage('es')
    expect(i18n.t('nav.services')).toBe('Servicios')
  })

  it('translates to english', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('nav.services')).toBe('Services')
  })
})
