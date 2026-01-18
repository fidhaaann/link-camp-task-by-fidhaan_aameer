'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import { Zap, Mail, MapPin, Phone, ExternalLink, Heart } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'GitHub', href: '#' },
]

const quickLinks = [
  { label: 'About IEEE', href: '#' },
  { label: 'Membership', href: '#' },
  { label: 'Events', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current
    if (!footer || !content) return

    const elements = content.children

    gsap.set(elements, { opacity: 0, y: 30 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative bg-deep dark:bg-dark-bg overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div 
        ref={contentRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Image
                  src="/logo/white.png"
                  alt="LINK Logo"
                  width={64}
                  height={64}
                  className="object-contain transition-transform duration-300 group-hover:scale-110 dark:invert-0"
                />
              </div>
              <span className="font-display font-bold text-2xl text-soft">
                LINK
              </span>
            </Link>
            <p className="text-soft/70 max-w-md mb-6 leading-relaxed">
              IEEE LINK is dedicated to fostering innovation, technical excellence, 
              and professional development among engineering students and young professionals.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'w-10 h-10 rounded-full border border-soft/20',
                    'flex items-center justify-center',
                    'text-soft/60 hover:text-primary hover:border-primary',
                    'transition-all duration-300 hover:scale-110'
                  )}
                  aria-label={link.label}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg text-soft mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      'text-soft/60 hover:text-primary transition-colors duration-300',
                      'flex items-center gap-2 group'
                    )}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg text-soft mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@ieeelink.org"
                  className="flex items-center gap-3 text-soft/60 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  contact@ieeelink.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-soft/60 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-soft/60">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Innovation Hub, Tech Campus<br />
                    Silicon Valley, CA 94025
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-soft/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-soft/50 text-sm">
              © {new Date().getFullYear()} IEEE LINK. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </footer>
  )
}
