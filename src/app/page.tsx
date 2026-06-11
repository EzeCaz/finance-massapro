'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Brain, Zap, Users, TrendingUp, Shield, MessageSquare,
  ChevronRight, ArrowRight, Phone, Mail, Globe, Check,
  Sparkles, Bot, BarChart3, Clock, Headphones, Target,
  Menu, X, Play, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ──────────── Animated Counter ──────────── */
function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ──────────── Section Wrapper with InView ──────────── */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ──────────── Hero Brain Overlay Component ──────────── */
function HeroBrainOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  // Palpitate effect: scale pulses based on scroll position
  const brainScale = useTransform(scrollY, [0, 300, 600, 900, 1200], [1, 1.08, 1, 1.06, 1])
  const brainOpacity = useTransform(scrollY, [0, 400], [0.9, 0.3])
  const brainY = useTransform(scrollY, [0, 600], [0, -40])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div ref={heroRef} className="relative rounded-2xl overflow-hidden glow-purple">
        <img
          src="/images/hero.png"
          alt="MassaPro AI Finance Platform"
          className="w-full h-auto object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />

        {/* Brain Floating Metric Overlay - centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            style={{ scale: brainScale, opacity: brainOpacity, y: brainY }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="/images/brain-hero.png"
                alt="MassaPro AI Brain"
                className="w-48 sm:w-56 lg:w-72 h-auto drop-shadow-[0_0_40px_rgba(147,51,234,0.5)]"
                style={{ mixBlendMode: 'screen' }}
              />
              {/* Glow pulse behind brain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[60%] h-[60%] rounded-full bg-purple-500/30 blur-[60px]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating card - Conversion Rate */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 glass-card rounded-xl p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Conversion Rate</div>
            <div className="text-xs text-green-400">+340% vs human teams</div>
          </div>
        </div>
      </motion.div>

      {/* Floating card - AI Active */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-2 -right-2 sm:top-6 sm:-right-6 glass-card rounded-xl p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Active</div>
            <div className="text-xs text-purple-400">1,247 conversations</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ──────────── Journey Step Component ──────────── */
function JourneyStep({ step, title, desc, icon, isActive, onClick, index }: {
  step: string; title: string; desc: string; icon: React.ReactNode; isActive: boolean; onClick: () => void; index: number
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`w-full text-left p-5 rounded-2xl transition-all duration-500 cursor-pointer group ${
        isActive
          ? 'glass-card glow-purple-sm border-purple-500/30'
          : 'hover:bg-white/[0.02] border border-transparent hover:border-purple-500/10'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
          isActive ? 'bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-white/5 group-hover:bg-white/10'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-purple-400 tracking-wider">{step}</span>
          </div>
          <h3 className={`font-semibold text-lg mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'}`}>
            {desc}
          </p>
        </div>
        <ChevronRight className={`w-5 h-5 shrink-0 mt-3 transition-all duration-300 ${isActive ? 'text-purple-400 translate-x-0' : 'text-slate-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
      </div>
    </motion.button>
  )
}

/* ──────────── Pricing Comparison Row ──────────── */
function PricingRow({ feature, traditional, massapro }: { feature: string; traditional: React.ReactNode; massapro: React.ReactNode }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-4 pr-4 text-sm text-slate-400">{feature}</td>
      <td className="py-4 px-4 text-sm text-slate-500 text-center">{traditional}</td>
      <td className="py-4 pl-4 text-sm text-purple-300 text-center font-medium">{massapro}</td>
    </tr>
  )
}

/* ──────────── Main Page ──────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeJourney, setActiveJourney] = useState(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')

  const journeySteps = [
    {
      step: '01',
      title: 'Lead Generation',
      desc: 'AI agents prospect 24/7 across social, search, and referral networks. Context-aware outreach identifies high-intent traders before competitors, triggering personalized first-touch sequences that convert cold traffic into qualified pipeline.',
      icon: <Target className="w-5 h-5 text-white" />,
      image: '/images/lead-generation.png'
    },
    {
      step: '02',
      title: 'Conversion & Closing',
      desc: 'Our proprietary LLM handles real-time objections with financial-fluent precision. AI voice agents close deposits via natural phone conversations — no scripts, no hold times. Conversion rates that human-only teams simply cannot sustain.',
      icon: <Zap className="w-5 h-5 text-white" />,
      image: '/images/conversion.png'
    },
    {
      step: '03',
      title: 'AI Guru Support',
      desc: 'The AI Guru resolves 85%+ of support tickets instantly — account issues, deposit queries, platform navigation — without a human agent. Complex cases escalate seamlessly with full context preserved across every channel.',
      icon: <Headphones className="w-5 h-5 text-white" />,
      image: '/images/satisfaction.png'
    },
    {
      step: '04',
      title: 'Retention & Growth',
      desc: 'Every interaction feeds the agentic brain. Personalized re-engagement, proactive outreach, and intelligent upsell recommendations drive lifetime value higher while your overhead stays flat.',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      image: '/images/efficiency.png'
    }
  ]

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Journey', href: '#journey' },
    { label: 'Efficiency', href: '#efficiency' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
  ]

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setFormStatus('loading')
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setFormStatus('success')
        setEmail('')
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 3000)
      }
    } catch {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img src="/images/massapro-logo.png" alt="MassaPro Logo" className="w-9 h-9 rounded-lg shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow object-contain" />
              <span className="text-xl font-bold tracking-tight">
                Massa<span className="gradient-text">Pro</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#cta" className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]">
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-purple-500/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#cta" className="block px-4 py-3 mt-2 text-center font-semibold rounded-xl bg-purple-600 text-white">
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <header className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-glow pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
                  AGENTIC AI REVOLUTION
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              >
                One Brain.<br />
                Every Channel.<br />
                <span className="gradient-text">Financial Guru.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg"
              >
                Full Journey Automation. MassaPro deploys a single intelligent agentic solution that manages the entire trader lifecycle — from first click to funded account — across every channel, priced by full conversations, not minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#cta" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#platform" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-white/5 transition-all">
                  <Play className="w-5 h-5" />
                  See How It Works
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex items-center gap-8 sm:gap-12"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    <AnimatedCounter end={85} suffix="%" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Auto-Resolved</div>
                </div>
                <div className="w-px h-10 bg-purple-500/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    24/7
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Always On</div>
                </div>
                <div className="w-px h-10 bg-purple-500/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    &lt;5s
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Response Time</div>
                </div>
              </motion.div>
            </div>

            {/* Hero Image with Brain Overlay */}
            <HeroBrainOverlay />
          </div>
        </div>
      </header>

      {/* ═══════════ LOGOS / TRUST BAR ═══════════ */}
      <Section className="py-12 border-y border-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-slate-600">
            <span className="text-xs tracking-widest uppercase">Trusted by leading platforms</span>
            <div className="flex items-center gap-10 sm:gap-16 text-slate-500">
              {['BROKERAGE', 'DEFI EXCHANGE', 'HEDGE FUND', 'PAYMENT GATEWAY'].map(name => (
                <span key={name} className="text-xs font-semibold tracking-wider opacity-50 hover:opacity-100 transition-opacity">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ PLATFORM OVERVIEW ═══════════ */}
      <Section id="platform" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              THE PLATFORM
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Agentic Native.<br /><span className="gradient-text">Omni-Channel Platform.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              A single Agentic AI orchestrates the entire trader journey. Instead of fragmented tools, one intelligent agent learns, adapts, and evolves with every interaction — delivering continuity that traditional CRM stacks cannot match.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: '"One Brain" Philosophy',
                desc: 'A single Agentic AI learns, adapts, and evolves with every interaction — delivering continuity that traditional CRM stacks cannot match.',
                color: 'from-purple-600 to-purple-400'
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: 'Omni-Channel Reach',
                desc: 'Every channel. One conversation. Traders start on WhatsApp, continue on email, close on a voice call — the agent remembers every word. Zero context loss.',
                color: 'from-purple-500 to-violet-400'
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: 'Pay for Conversations',
                desc: 'Traditional platforms charge per call minute. MassaPro charges per entire flow conversation — whether it spans one email or ten touchpoints across channels.',
                color: 'from-violet-500 to-fuchsia-400'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Proprietary LLM & Voice',
                desc: 'Our proprietary LLM handles real-time objections with financial-fluent precision. AI voice agents close deposits via natural phone conversations — no scripts, no hold times.',
                color: 'from-fuchsia-500 to-pink-400'
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'AI Guru Support',
                desc: 'Resolves 85%+ of support tickets instantly — account issues, deposit queries, platform navigation — without a human agent. Complex cases escalate seamlessly.',
                color: 'from-pink-500 to-rose-400'
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: 'Scale Without Overhead',
                desc: "MassaPro's Agentic AI handles thousands of concurrent trader conversations without adding headcount. Every workflow is automated, measured, and optimized.",
                color: 'from-rose-500 to-orange-400'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full glass-card hover:border-purple-500/25 transition-all duration-500 group hover:shadow-lg hover:shadow-purple-500/5">
                  <CardContent className="p-6 sm:p-7">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ AGENTIC JOURNEY ═══════════ */}
      <Section id="journey" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              THE AGENTIC JOURNEY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              From First Click to<br /><span className="gradient-text">Funded Account</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Follow the complete trader lifecycle powered by a single intelligent agent that never forgets, never sleeps, and never lets a lead go cold.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Steps list */}
            <div className="space-y-3">
              {journeySteps.map((step, i) => (
                <JourneyStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  desc={step.desc}
                  icon={step.icon}
                  isActive={activeJourney === i}
                  onClick={() => setActiveJourney(i)}
                  index={i}
                />
              ))}
            </div>

            {/* Image display */}
            <div className="relative lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJourney}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl overflow-hidden glow-purple-sm"
                >
                  <img
                    src={journeySteps[activeJourney].image}
                    alt={journeySteps[activeJourney].title}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span className="text-xs text-purple-300 font-medium tracking-wider">STEP {journeySteps[activeJourney].step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{journeySteps[activeJourney].title}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Connection lines */}
              <div className="hidden lg:block absolute -left-6 top-1/2 w-6 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ INCREASE EFFICIENCY ═══════════ */}
      <Section id="efficiency" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden glow-purple-sm"
              >
                <img
                  src="/images/efficiency.png"
                  alt="Increase Efficiency with MassaPro"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-transparent opacity-40" />
              </motion.div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
                INCREASE EFFICIENCY
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Satisfaction on Demand.<br /><span className="gradient-text">Without Headcount Increase.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                MassaPro handles thousands of concurrent trader conversations without adding headcount. From onboarding to retention, every workflow is automated, measured, and optimized. Deploy once, scale infinitely — your margins grow as your volume does.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: '85%+', label: 'Tickets Auto-Resolved', icon: <Sparkles className="w-4 h-4" /> },
                  { value: '24/7', label: 'Always Available', icon: <Clock className="w-4 h-4" /> },
                  { value: '<5s', label: 'First Response', icon: <Zap className="w-4 h-4" /> },
                  { value: '0', label: 'Extra Headcount Needed', icon: <Users className="w-4 h-4" /> }
                ].map(stat => (
                  <div key={stat.label} className="glass-card rounded-xl p-4 group hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-purple-400">{stat.icon}</div>
                      <span className="text-2xl font-bold gradient-text">{stat.value}</span>
                    </div>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>

              <a href="#cta" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group">
                See how efficiency scales
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ OMNI-CHANNEL ═══════════ */}
      <Section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
                OMNI-CHANNEL
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Every Channel.<br /><span className="gradient-text">One Conversation.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Traders start on WhatsApp, continue on email, close on a voice call — the agent remembers every word. Zero context loss across any touchpoint. Seamless conversation continuity that traditional platforms simply cannot deliver.
              </p>

              <div className="space-y-4">
                {[
                  { channel: 'Email', desc: 'Automated sequences with smart follow-ups', icon: <Mail className="w-5 h-5" /> },
                  { channel: 'Live Chat', desc: 'Real-time webchat on your platform', icon: <MessageSquare className="w-5 h-5" /> },
                  { channel: 'WhatsApp', desc: 'Personal messaging with rich media', icon: <Phone className="w-5 h-5" /> },
                  { channel: 'SMS', desc: 'Instant outreach and notifications', icon: <Globe className="w-5 h-5" /> },
                  { channel: 'Voice Call', desc: 'AI-powered natural phone conversations', icon: <Phone className="w-5 h-5" /> },
                  { channel: 'Voice Messages', desc: 'Async voice notes with AI understanding', icon: <Bot className="w-5 h-5" /> }
                ].map(ch => (
                  <div key={ch.channel} className="flex items-center gap-4 glass-card rounded-xl p-3.5 hover:border-purple-500/20 transition-all group cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      {ch.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{ch.channel}</div>
                      <div className="text-xs text-slate-500">{ch.desc}</div>
                    </div>
                    <Check className="w-4 h-4 text-green-400 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden glow-purple-sm"
              >
                <img
                  src="/images/omnichannel.png"
                  alt="Omni-Channel Communication"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ INCREASE CONVERSION ═══════════ */}
      <Section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              INCREASE CONVERSION
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Optimize Every Step.<br /><span className="gradient-text">Maximize Every Conversion.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Proprietary AI that handles objections in real-time, closes deposits through natural voice conversations, and converts cold traffic into qualified pipeline — at rates human teams simply cannot sustain.
            </p>
          </div>

          {/* Conversion stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                metric: '3.4x',
                label: 'Higher Conversion',
                desc: 'Compared to human-only sales teams',
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                metric: '68%',
                label: 'Faster Close Rate',
                desc: 'From first touch to funded account',
                icon: <Zap className="w-6 h-6" />
              },
              {
                metric: '92%',
                label: 'Trader Satisfaction',
                desc: 'Instant resolution, zero wait times',
                icon: <Star className="w-6 h-6" />
              }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <Card className="glass-card hover:border-purple-500/20 transition-all text-center group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                      {stat.icon}
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.metric}</div>
                    <div className="text-base font-semibold text-white mb-1">{stat.label}</div>
                    <div className="text-sm text-slate-500">{stat.desc}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Conversion image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden glow-purple"
          >
            <img
              src="/images/conversion.png"
              alt="Increase Conversion with MassaPro"
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-[#030712]/30 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 sm:p-12">
              <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Immediate Action. Immediate Results.</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Our proprietary LLM handles real-time objections with financial-fluent precision. AI voice agents close deposits via natural phone conversations — no scripts, no hold times.
                </p>
                <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
                  Start Converting
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ PRICING COMPARISON ═══════════ */}
      <Section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              PRICING MODEL
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Pay for Conversations,<br /><span className="gradient-text">Not Minutes</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Traditional platforms charge per call minute — longer calls cost more. MassaPro charges per entire flow conversation, one price, any length, across all channels.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                {/* Table header */}
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-5 border-b border-white/5" />
                  <div className="p-5 border-b border-white/5 text-center">
                    <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Traditional</span>
                  </div>
                  <div className="p-5 border-b border-purple-500/20 text-center bg-purple-500/5">
                    <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">MassaPro</span>
                  </div>
                </div>

                {/* Table body */}
                <table className="w-full">
                  <tbody>
                    <PricingRow
                      feature="Pricing Model"
                      traditional={<span>Per call minute</span>}
                      massapro={<span className="text-purple-300">Per entire flow</span>}
                    />
                    <PricingRow
                      feature="Cost Predictability"
                      traditional={<span className="text-red-400">Variable — spikes during peak</span>}
                      massapro={<span className="text-green-400">Fixed — know what you pay</span>}
                    />
                    <PricingRow
                      feature="Multi-Channel"
                      traditional={<span className="text-red-400">Each channel billed separately</span>}
                      massapro={<span className="text-green-400">All channels in one flow</span>}
                    />
                    <PricingRow
                      feature="Conversation Continuity"
                      traditional={<span className="text-red-400">Lost when switching channels</span>}
                      massapro={<span className="text-green-400">Seamless across all channels</span>}
                    />
                    <PricingRow
                      feature="Scaling Cost"
                      traditional={<span className="text-red-400">Rises linearly with volume</span>}
                      massapro={<span className="text-green-400">Decreases per flow at scale</span>}
                    />
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <p className="text-sm text-slate-500">
                COST-PER-FLOW = 1 Interaction = Entire Flow Conversation (Multichannel)
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ SECURITY ═══════════ */}
      <Section id="security" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              INFRASTRUCTURE & SECURITY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Enterprise-Grade.<br /><span className="gradient-text">By Design.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              SOC2 compliant infrastructure with end-to-end encryption, GDPR-ready data handling, and 99.99% uptime SLA. Your traders&apos; data never leaves your control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-8 h-8" />, title: 'SOC2 Type II', desc: 'Compliant infrastructure audited and certified for the highest security standards.' },
              { icon: <Shield className="w-8 h-8" />, title: 'GDPR Ready', desc: 'Full compliance with European data protection regulations. Your data stays protected.' },
              { icon: <Shield className="w-8 h-8" />, title: 'E2E Encrypted', desc: 'End-to-end encryption ensures every conversation and data point stays private.' },
              { icon: <Clock className="w-8 h-8" />, title: '99.99% Uptime', desc: 'Enterprise-grade reliability with guaranteed uptime SLA for uninterrupted service.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Multi-Region', desc: 'Global infrastructure deployment for low-latency conversations worldwide.' },
              { icon: <Shield className="w-8 h-8" />, title: 'ISO 27001', desc: 'Information security management system certified to international standards.' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 text-center hover:border-purple-500/20 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ SCALE REVENUE ═══════════ */}
      <Section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              SCALE REVENUE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Scale Revenue Without<br /><span className="gradient-text">Scaling Overhead</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              Deploy once, scale infinitely. MassaPro&apos;s Agentic AI handles thousands of concurrent trader conversations without adding headcount. Your margins grow as your volume does.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="glass-card rounded-2xl p-8 animate-pulse-glow">
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={10} suffix="x" />
                </div>
                <div className="text-sm text-slate-400">Concurrent Capacity vs Manual</div>
              </div>
              <div className="glass-card rounded-2xl p-8 animate-pulse-glow" style={{ animationDelay: '1s' }}>
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={0} prefix="$" suffix="" />
                </div>
                <div className="text-sm text-slate-400">Additional Hiring Needed</div>
              </div>
              <div className="glass-card rounded-2xl p-8 animate-pulse-glow" style={{ animationDelay: '2s' }}>
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={73} suffix="%" />
                </div>
                <div className="text-sm text-slate-400">Lower Cost Per Acquisition</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ═══════════ CTA ═══════════ */}
      <Section id="cta" className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs font-medium tracking-widest text-purple-300 border-purple-500/30 bg-purple-500/10">
              GET STARTED
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to Transform Your<br /><span className="gradient-text">Financial Platform?</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Book a personalized demo and see how MassaPro&apos;s Agentic AI can automate your entire trader lifecycle — from first click to funded account.
            </p>

            {/* Demo form */}
            <Card className="glass-card max-w-lg mx-auto glow-purple">
              <CardContent className="p-6 sm:p-8">
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Demo Requested!</h3>
                    <p className="text-slate-400 text-sm">Our team will reach out within 24 hours to schedule your personalized demo.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your work email"
                        required
                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-purple-500/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full py-3.5 text-base font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'loading' ? 'Sending...' : 'Book Your Demo'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-xs text-slate-600 text-center">
                      No credit card required. Free consultation included.
                    </p>
                    {formStatus === 'error' && (
                      <p className="text-xs text-red-400 text-center mt-2">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact info */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-slate-500">
              <a href="mailto:hello@massapro.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <Mail className="w-4 h-4" />
                hello@massapro.com
              </a>
              <a href="https://massapro.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <Globe className="w-4 h-4" />
                massapro.com
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-purple-500/10 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/massapro-logo.png" alt="MassaPro Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-purple-500/20 object-contain" />
              <span className="text-lg font-bold tracking-tight">
                Massa<span className="gradient-text">Pro</span>
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span>Agentic AI for Finance</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span>&copy; 2026 MassaPro</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span>All Rights Reserved</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="mailto:hello@massapro.com" className="text-slate-600 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://massapro.com" className="text-slate-600 hover:text-purple-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
