'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { ArrowRight, Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const imageWrapper = imageRef.current
    const content = contentRef.current
    const title = titleRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!section || !bg || !content || !title || !imageWrapper) return

    // Parallax background effect - moves slower than scroll
    gsap.to(imageWrapper, {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // Background zoom and blur on scroll
    gsap.to(imageWrapper, {
      scale: 1.3,
      filter: 'blur(15px)',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    // Overlay darkens on scroll
    gsap.to(bg.querySelector('.overlay'), {
      opacity: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Title animation - split into words
    const titleText = title.textContent || ''
    const words = titleText.split(' ')
    title.innerHTML = words
      .map((word, i) => 
        `<span class="inline-block overflow-hidden">
          <span class="inline-block word-span" style="transform: translateY(100%)">${word}</span>
        </span>`
      )
      .join(' ')

    const wordSpans = title.querySelectorAll('.word-span')
    
    gsap.to(wordSpans, {
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'transform',
    })

    // Content fade in - set initial state first
    const contentElements = content.querySelectorAll('.animate-in')
    gsap.set(contentElements, { opacity: 0, y: 30 })
    
    gsap.to(contentElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.5,
    })

    // Scroll indicator animation
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })

      // Fade out on scroll
      gsap.to(scrollIndicator, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: '10% top',
          end: '30% top',
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleScrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background with Hero Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
      >
        {/* Hero Image with Parallax */}
        <div 
          ref={imageRef}
          className="absolute inset-0 scale-110"
          style={{ willChange: 'transform, filter' }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Hero background"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="overlay absolute inset-0 bg-gradient-to-b from-deep/40 via-deep/50 to-deep/80 dark:from-dark-bg/60 dark:via-dark-bg/70 dark:to-dark-bg/90" />
        
        {/* Color Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        {/* Animated Circles - floating over image */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-200" style={{ animationDelay: '2s' }} />

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-soft/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <div className="animate-in mb-8">
          <span className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full',
            'bg-primary/10 border border-primary/20',
            'text-primary font-medium text-sm'
          )}>
            <Sparkles className="w-4 h-4" />
            IEEE LINK presents
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-soft mb-6 leading-tight tracking-tight drop-shadow-2xl"
        >
          LINK CAMP 2025
        </h1>

        {/* Subtitle */}
        <p className="animate-in text-xl md:text-2xl text-soft/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-lg">
          Connect. Learn. Innovate. <br className="hidden sm:block" />
          An immersive tech experience for future leaders.
        </p>

        {/* Event Details */}
        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-soft/80">
            <Calendar className="w-5 h-5 text-primary drop-shadow-glow" />
            <span className="font-medium drop-shadow-md">March 15-17, 2025</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
          <div className="flex items-center gap-2 text-soft/80">
            <MapPin className="w-5 h-5 text-primary drop-shadow-glow" />
            <span className="font-medium drop-shadow-md">Innovation Hub, Tech Campus</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-in">
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={cn(
              'inline-flex items-center gap-3 px-10 py-5',
              'rounded-full border-2 border-primary',
              'text-primary font-semibold text-lg',
              'transition-all duration-500',
              'hover:bg-primary hover:text-soft hover:shadow-glow',
              'hover:scale-105 active:scale-95',
              'group'
            )}
          >
            <span>Register Now</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollToAbout}
        className={cn(
          'absolute bottom-10 left-1/2 -translate-x-1/2',
          'flex flex-col items-center gap-2 cursor-pointer',
          'text-soft/60 hover:text-primary transition-colors'
        )}
      >
        <span className="text-sm font-medium drop-shadow-md">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 drop-shadow-md" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-32 left-8 w-20 h-20 border-l-2 border-t-2 border-soft/20 rounded-tl-3xl" />
      <div className="absolute bottom-32 right-8 w-20 h-20 border-r-2 border-b-2 border-soft/20 rounded-br-3xl" />
    </section>
  )
}
