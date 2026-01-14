'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '#home', label: 'Home', isPage: false },
  { href: '#about', label: 'About', isPage: false },
  { href: '#schedule', label: 'Schedule', isPage: false },
  { href: '/register', label: 'Register', isPage: true },
]

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (systemPrefersDark) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Show/hide navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }

    // Add background when scrolled
    setIsScrolled(currentScrollY > 50)
    setLastScrollY(currentScrollY)

    // Update active section
    const sections = navLinks.map(link => link.href.substring(1))
    for (const section of sections.reverse()) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 150) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass shadow-lg' : 'bg-transparent',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <Image
                src="/logo/white.png"
                alt="LINK Logo"
                width={56}
                height={56}
                className="object-contain transition-transform duration-300 group-hover:scale-110 dark:invert-0"
              />
            </div>
            <span className="font-display font-bold text-2xl text-primary">
              LINK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link py-2 px-4 bg-primary text-soft rounded-full hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'nav-link py-2',
                    activeSection === link.href.substring(1) && 'active'
                  )}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'relative w-12 h-12 rounded-full flex items-center justify-center',
                'bg-primary/10 hover:bg-primary/20 transition-all duration-300',
                'group overflow-hidden'
              )}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <Sun 
                className={cn(
                  'w-5 h-5 text-primary absolute transition-all duration-500',
                  theme === 'light' 
                    ? 'rotate-0 opacity-100' 
                    : 'rotate-90 opacity-0'
                )}
              />
              <Moon 
                className={cn(
                  'w-5 h-5 text-primary absolute transition-all duration-500',
                  theme === 'dark' 
                    ? 'rotate-0 opacity-100' 
                    : '-rotate-90 opacity-0'
                )}
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu 
                className={cn(
                  'w-5 h-5 text-primary absolute transition-all duration-300',
                  isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                )}
              />
              <X 
                className={cn(
                  'w-5 h-5 text-primary absolute transition-all duration-300',
                  isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-20 glass border-t border-primary/10',
          'transition-all duration-500 ease-out',
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link, index) => (
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-3 px-4 rounded-xl text-lg font-medium',
                  'transition-all duration-300',
                  'bg-primary text-soft'
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isMobileMenuOpen ? 'menuSlide 0.4s ease-out forwards' : 'none'
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'block py-3 px-4 rounded-xl text-lg font-medium',
                  'transition-all duration-300',
                  activeSection === link.href.substring(1)
                    ? 'bg-primary text-soft'
                    : 'text-deep dark:text-soft hover:bg-primary/10'
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isMobileMenuOpen ? 'menuSlide 0.4s ease-out forwards' : 'none'
                }}
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  )
}
