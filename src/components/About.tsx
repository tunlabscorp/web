// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'

const points = ['senior', 'comms', 'timezone', 'quality'] as const

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="border-t border-slate-200 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {t('about.heading')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">{t('about.subheading')}</p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {points.map((key) => (
            <div key={key} className="flex gap-4">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400"
              />
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  {t(`about.points.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(`about.points.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
