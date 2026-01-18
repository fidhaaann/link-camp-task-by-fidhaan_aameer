'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { 
  ArrowRight, 
  Ticket, 
  Users, 
  Calendar, 
  Gift, 
  Star,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const pricingTiers = [
  {
    name: 'Early Bird',
    price: '₹399',
    originalPrice: '₹499',
    description: 'Limited spots available',
    deadline: 'Until Feb 15',
    features: [
      'Full 3-day access',
      'Workshop materials',
      'Meals & refreshments',
      'Certificate of participation',
      'Networking events',
    ],
    highlighted: false,
    available: true,
  },
  {
    name: 'Regular',
    price: '₹499',
    originalPrice: '₹599',
    description: 'Standard registration',
    deadline: 'Until Mar 10',
    features: [
      'Full 3-day access',
      'Workshop materials',
      'Meals & refreshments',
      'Certificate of participation',
      'Networking events',
      'Exclusive swag bag',
    ],
    highlighted: true,
    available: true,
  },
  {
    name: 'IEEE Member',
    price: '₹349',
    originalPrice: '₹449',
    description: 'For verified members',
    deadline: 'Valid membership required',
    features: [
      'Full 3-day access',
      'Workshop materials',
      'Meals & refreshments',
      'Certificate of participation',
      'Networking events',
      'Priority seating',
    ],
    highlighted: false,
    available: true,
  },
]

const benefits = [
  { icon: Users, text: '500+ Attendees' },
  { icon: Calendar, text: '3 Days of Learning' },
  { icon: Gift, text: 'Exclusive Swag' },
  { icon: Star, text: 'Industry Experts' },
]

export default function Registration() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    const cta = ctaRef.current

    if (!section || !header || !cards || !cta) return

    // Header animation
    gsap.fromTo(
      header.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
      }
    )

    // Cards animation with 3D effect
    const cardElements = cards.children
    gsap.set(cardElements, { 
      opacity: 0, 
      y: 80,
      rotationX: -15,
      transformPerspective: 1000,
    })

    ScrollTrigger.create({
      trigger: cards,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cardElements, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    // CTA animation
    gsap.fromTo(
      cta,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cta,
          start: 'top 90%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-soft to-white dark:from-dark-bg dark:to-dark-surface overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Ticket className="w-4 h-4" />
            Registration Open
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-deep dark:text-soft mb-6">
            Secure Your Spot
          </h2>
          <p className="text-lg text-deep/60 dark:text-soft/60 max-w-2xl mx-auto">
            Choose the registration option that suits you best. Limited seats available!
          </p>

          {/* Benefits Row */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-deep/60 dark:text-soft/60"
              >
                <benefit.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={cn(
                'relative group rounded-3xl p-6 md:p-8',
                'bg-white dark:bg-dark-surface',
                'border-2 transition-all duration-500',
                tier.highlighted
                  ? 'border-primary shadow-glow scale-105 z-10'
                  : 'border-primary/10 hover:border-primary/30',
                hoveredCard === index && !tier.highlighted && 'shadow-card-hover -translate-y-2'
              )}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-soft text-sm font-medium shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="text-center mb-6 pb-6 border-b border-primary/10">
                <h3 className="font-display text-xl font-semibold text-deep dark:text-soft mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-display text-4xl md:text-5xl font-bold text-primary">
                    {tier.price}
                  </span>
                  {tier.originalPrice && (
                    <span className="text-deep/40 dark:text-soft/40 line-through">
                      {tier.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-deep/50 dark:text-soft/50 mt-2">
                  {tier.description}
                </p>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 rounded-lg bg-primary/5">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-deep/70 dark:text-soft/70">
                  {tier.deadline}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-deep/70 dark:text-soft/70"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/register"
                className={cn(
                  'w-full py-4 rounded-full font-semibold',
                  'flex items-center justify-center gap-2',
                  'transition-all duration-300',
                  tier.highlighted
                    ? 'bg-primary text-soft hover:bg-accent hover:shadow-glow'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-soft',
                  'group/btn'
                )}
              >
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>

              {/* Card Glow Effect */}
              {tier.highlighted && (
                <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-xl opacity-50" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State / Coming Soon Card */}
        <div
          ref={ctaRef}
          className={cn(
            'relative overflow-hidden rounded-3xl p-8 md:p-12',
            'bg-gradient-to-br from-deep via-deep to-accent',
            'text-center'
          )}
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft/10 mb-6">
              <Gift className="w-8 h-8 text-soft" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-soft mb-4">
              Group Registration Available
            </h3>
            <p className="text-soft/70 max-w-xl mx-auto mb-8">
              Registering with your team or institution? Contact us for special group 
              discounts and customized packages for 10+ participants.
            </p>
            <a
              href="mailto:contact@ieeelink.org"
              className={cn(
                'inline-flex items-center gap-2 px-8 py-4',
                'rounded-full border-2 border-soft text-soft',
                'font-semibold transition-all duration-300',
                'hover:bg-soft hover:text-deep'
              )}
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  )
}
