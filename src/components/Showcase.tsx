// Copyright (c) Tunlabs Corp. All rights reserved.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, Target, Zap } from 'lucide-react'
import { Tilt } from './Tilt'
import { PhoneForm } from './PhoneForm'
import { useScrollProgress } from '../hooks/useScrollProgress'

const tabs = ['contact', 'overview', 'analytics', 'team'] as const
type Tab = (typeof tabs)[number]

const stats = [
  { key: 'revenue', value: '$128K', delta: '+12%' },
  { key: 'users', value: '8,942', delta: '+8%' },
] as const

const bars = [42, 68, 35, 82, 55, 91, 61]
const members = ['AM', 'JR', 'SK', 'LP']
const features = [
  { key: 'fast', icon: Zap },
  { key: 'quality', icon: ShieldCheck },
  { key: 'impact', icon: Target },
] as const

function ScreenApp() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('contact')

  return (
    <div className="flex h-full flex-col bg-slate-50 text-left dark:bg-slate-950">
      {/* App top bar */}
      <div className="flex items-center justify-between px-4 pt-7 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-brand-500" />
          <span className="font-mono text-[10px] tracking-wide text-slate-700 dark:text-slate-300">
            tunlabs<span className="text-brand-400">.os</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[8px] text-slate-400 dark:text-slate-500">LIVE</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 px-3 py-2 [scrollbar-width:none] dark:border-white/10 [&::-webkit-scrollbar]:hidden">
        {tabs.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
              tab === key
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
            }`}
          >
            {t(`showcase.tabs.${key}`)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={tab === 'contact' ? 'flex-1 overflow-hidden' : 'flex-1 overflow-hidden p-3'}>
        {tab === 'overview' && (
          <div className="flex h-full flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              {stats.map((s) => (
                <div
                  key={s.key}
                  className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="text-[9px] text-slate-400 dark:text-slate-500">
                    {t(`showcase.stats.${s.key}`)}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                    {s.value}
                  </p>
                  <p className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                    {s.delta}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-1.5">
              {(['phoenix', 'atlas', 'nova'] as const).map((p, i) => (
                <div
                  key={p}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-2.5 py-2 dark:border-white/5 dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-brand-500/10 font-mono text-[9px] text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-slate-800 dark:text-slate-200">
                      {t(`showcase.projects.${p}`)}
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-medium text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                    {t('showcase.shipped')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="flex h-full flex-col justify-end gap-2">
            <p className="text-[9px] text-slate-400 dark:text-slate-500">
              {t('showcase.weeklyDeploys')}
            </p>
            <div className="flex h-[65%] items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-700 to-brand-400 transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {tab === 'contact' && <PhoneForm />}

        {tab === 'team' && (
          <div className="flex h-full flex-col gap-1.5">
            {members.map((m, i) => (
              <div
                key={m}
                className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[9px] font-semibold text-white">
                  {m}
                </span>
                <div>
                  <p className="text-[11px] font-medium text-slate-900 dark:text-white">
                    {t(`showcase.members.${i}.name`)}
                  </p>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500">
                    {t(`showcase.members.${i}.role`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Showcase() {
  const { t } = useTranslation()
  const { ref, progress, approach } = useScrollProgress<HTMLElement>()
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const enter = reduced
    ? 1
    : Math.min(1, approach * 0.3 + Math.min(1, progress / 0.4) * 0.7)
  const phoneEase = 1 - Math.pow(1 - enter, 3)

  const textEnter = reduced
    ? 1
    : Math.min(1, approach * 0.25 + Math.min(1, progress / 0.45) * 0.75)
  const textEase = 1 - Math.pow(1 - textEnter, 3)

  const riseVh = reduced ? 0 : -0.35 * Math.max(0, 1 - approach)

  const phoneStyle = {
    opacity: Math.min(1, enter * 1.8),
    transform: `perspective(1100px) rotateY(${(1 - phoneEase) * -50}deg) translateY(${(1 - phoneEase) * 100}px) scale(${0.6 + phoneEase * 0.4})`,
    willChange: 'transform, opacity',
  } as const

  const textStyle = {
    opacity: Math.min(1, textEnter * 1.8),
    transform: `translateX(${(1 - textEase) * 90}px)`,
    willChange: 'transform, opacity',
  } as const

  return (
    <section
      ref={ref}
      id="showcase"
      className={`relative scroll-mt-20 border-t border-slate-200 dark:border-white/5 ${reduced ? 'py-24' : 'h-[300vh]'}`}
    >
      <span
        id="contacto"
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ top: reduced ? '45%' : '110vh' }}
      />
      <div
        className={
          reduced
            ? 'mx-auto max-w-6xl px-6'
            : 'sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6'
        }
      >
        <div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 will-change-transform lg:flex-row lg:gap-20"
          style={{ transform: `translateY(${riseVh * 100}vh)` }}
        >
          {/* Phone */}
          <div className="relative shrink-0" style={reduced ? undefined : phoneStyle}>
            <div
              aria-hidden="true"
              className="absolute -inset-14 rounded-full bg-brand-600/20 blur-[90px] dark:bg-brand-600/25"
              style={{ opacity: phoneEase * 0.85 }}
            />
            <Tilt max={5} className="relative">
              <div className="w-[min(56vw,200px)] rounded-[2.6rem] border border-slate-300/70 bg-gradient-to-b from-slate-200 to-slate-300 p-2 shadow-2xl shadow-brand-950/30 lg:w-[min(74vw,280px)] dark:border-white/10 dark:from-slate-800 dark:to-slate-900 dark:shadow-black/50">
                <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.1rem] bg-slate-100 dark:bg-black">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900"
                  />
                  <ScreenApp />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 left-1/2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-slate-400/50 dark:bg-white/30"
                  />
                </div>
              </div>
            </Tilt>
          </div>

          {/* Text */}
          <div className="w-full max-w-xl text-center lg:text-left" style={reduced ? undefined : textStyle}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl dark:text-white">
              {t('showcase.heading')}
            </h2>
            <p className="mt-3 text-base text-slate-500 lg:mt-4 lg:text-lg dark:text-slate-400">
              {t('showcase.subheading')}
            </p>

            <div className="mt-6 flex justify-center gap-5 lg:mt-8 lg:block lg:space-y-5">
              {features.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex w-24 flex-col items-center gap-2 text-center lg:w-auto lg:flex-row lg:items-start lg:gap-4 lg:text-left"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 lg:size-10 dark:text-brand-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-[11px] leading-tight font-medium text-slate-900 lg:text-sm dark:text-white">
                      {t(`showcase.features.${key}.title`)}
                    </h3>
                    <p className="mt-1 hidden text-sm leading-relaxed text-slate-500 lg:block dark:text-slate-400">
                      {t(`showcase.features.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 hidden font-mono text-xs tracking-widest text-slate-400 uppercase lg:block dark:text-slate-500">
              {t('showcase.hint')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
