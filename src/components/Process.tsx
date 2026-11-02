// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'

const steps = ['discovery', 'design', 'build', 'scale'] as const

export function Process() {
  const { t } = useTranslation()

  return (
    <section id="process" className="border-t border-slate-200 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {t('process.heading')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            {t('process.subheading')}
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((key, i) => (
            <li key={key} className="relative">
              <span className="font-mono text-sm text-brand-600 dark:text-brand-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent" />
              <h3 className="mt-4 text-base font-medium text-slate-900 dark:text-white">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {t(`process.steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
