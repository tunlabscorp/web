// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px] dark:bg-brand-600/20"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center md:py-40">
        <span className="animate-fade-up rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-700 uppercase dark:text-brand-300">
          {t('hero.badge')}
        </span>

        <h1
          className="mt-6 max-w-3xl animate-fade-up text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl dark:text-white"
          style={{ animationDelay: '100ms' }}
        >
          {t('hero.title')}
        </h1>

        <p
          className="mt-6 max-w-2xl animate-fade-up text-lg text-slate-500 dark:text-slate-400"
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
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
