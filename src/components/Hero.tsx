// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import bannerClear from '../assets/banner_clear_mode.jpg'
import bannerDark from '../assets/banner_dark_mode.jpg'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <img
        src={bannerClear}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right dark:hidden"
      />
      <img
        src={bannerDark}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover object-right dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent dark:from-slate-950 dark:via-slate-950/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-950"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col px-6 py-28 md:py-40">
        <div className="max-w-xl">
          <span className="animate-fade-up rounded-full border border-brand-500/30 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-700 uppercase backdrop-blur-sm dark:bg-slate-950/60 dark:text-brand-300">
            {t('hero.badge')}
          </span>

          <h1
            className="mt-6 animate-fade-up text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl dark:text-white"
            style={{ animationDelay: '100ms' }}
          >
            {t('hero.title')}
          </h1>

          <p
            className="mt-6 animate-fade-up text-lg text-slate-600 dark:text-slate-300"
            style={{ animationDelay: '200ms' }}
          >
            {t('hero.subtitle')}
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-500"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/70 px-6 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
