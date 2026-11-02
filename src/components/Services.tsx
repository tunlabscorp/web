// Copyright (c) Tunlabs Corp. All rights reserved.

import { useTranslation } from 'react-i18next'
import {
  BrainCircuit,
  Cloud,
  Code2,
  PenTool,
  Smartphone,
  Globe,
} from 'lucide-react'

const items = [
  { key: 'custom', icon: Code2 },
  { key: 'web', icon: Globe },
  { key: 'mobile', icon: Smartphone },
  { key: 'cloud', icon: Cloud },
  { key: 'ai', icon: BrainCircuit },
  { key: 'design', icon: PenTool },
] as const

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="border-t border-slate-200 py-24 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {t('services.heading')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            {t('services.subheading')}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-500/50 hover:bg-brand-50/50 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-brand-500/[0.04]"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500/20 dark:text-brand-400">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-medium text-slate-900 dark:text-white">
                {t(`services.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {t(`services.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
