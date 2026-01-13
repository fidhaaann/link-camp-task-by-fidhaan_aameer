'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { Clock, User, MapPin, ChevronRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const scheduleData = [
  {
    day: 'Day 1',
    date: 'March 15, 2025',
    theme: 'Foundation',
    events: [
      {
        time: '09:00 AM',
        title: 'Opening Ceremony',
        speaker: 'IEEE LINK Executive Board',
        location: 'Main Auditorium',
        type: 'ceremony',
      },
      {
        time: '10:30 AM',
        title: 'Keynote: Future of Technology',
        speaker: 'Dr. Sarah Chen',
        location: 'Main Auditorium',
        type: 'keynote',
      },
      {
        time: '02:00 PM',
        title: 'Workshop: Web Development Fundamentals',
        speaker: 'Alex Rivera',
        location: 'Lab A',
        type: 'workshop',
      },
      {
        time: '05:00 PM',
        title: 'Networking Session',
        speaker: 'All Participants',
        location: 'Innovation Hub',
        type: 'networking',
      },
    ],
  },
  {
    day: 'Day 2',
    date: 'March 16, 2025',
    theme: 'Innovation',
    events: [
      {
        time: '09:00 AM',
        title: 'AI & Machine Learning Workshop',
        speaker: 'Prof. Michael Zhang',
        location: 'Lab B',
        type: 'workshop',
      },
      {
        time: '12:00 PM',
        title: 'Industry Panel Discussion',
        speaker: 'Tech Leaders Panel',
        location: 'Main Auditorium',
        type: 'panel',
      },
      {
        time: '03:00 PM',
        title: 'Hackathon Kickoff',
        speaker: 'Project Mentors',
        location: 'Innovation Hub',
        type: 'hackathon',
      },
      {
        time: '08:00 PM',
        title: 'Hackathon (Continues Overnight)',
        speaker: 'All Teams',
        location: 'Innovation Hub',
        type: 'hackathon',
      },
    ],
  },
  {
    day: 'Day 3',
    date: 'March 17, 2025',
    theme: 'Showcase',
    events: [
      {
        time: '10:00 AM',
        title: 'Hackathon Submissions',
        speaker: 'All Teams',
        location: 'Innovation Hub',
        type: 'hackathon',
      },
      {
        time: '01:00 PM',
        title: 'Project Presentations',
        speaker: 'Hackathon Teams',
        location: 'Main Auditorium',
        type: 'presentation',
      },
      {
        time: '04:00 PM',
        title: 'Awards Ceremony',
        speaker: 'Judges & Sponsors',
        location: 'Main Auditorium',
        type: 'ceremony',
      },
      {
        time: '05:30 PM',
        title: 'Closing Ceremony & Farewell',
        speaker: 'IEEE LINK Executive Board',
        location: 'Main Auditorium',
        type: 'ceremony',
      },
    ],
  },
]

const typeColors: Record<string, string> = {
  ceremony: 'bg-deep/10 text-deep dark:bg-soft/10 dark:text-soft',
  keynote: 'bg-primary/10 text-primary',
  workshop: 'bg-accent/10 text-accent',
  networking: 'bg-green-500/10 text-green-600 dark:text-green-400',
  panel: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  hackathon: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  presentation: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
}

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cardsContainer = cardsContainerRef.current

    if (!section || !header || !cardsContainer) return

    // Header animation
    gsap.fromTo(
      header,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
      }
    )

    // Stacked cards animation with GSAP
    const cards = cardsContainer.querySelectorAll('.schedule-card')
    
    cards.forEach((card, index) => {
      gsap.set(card, {
        position: 'sticky',
        top: `${100 + index * 20}px`,
        zIndex: index,
      })

      // Scale and opacity animation based on scroll
      ScrollTrigger.create({
        trigger: card,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          if (progress > 0.5) {
            gsap.to(card, {
              scale: 1 - (progress - 0.5) * 0.1,
              opacity: 1 - (progress - 0.5) * 0.5,
              duration: 0.1,
            })
          } else {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              duration: 0.1,
            })
          }
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-24 px-4 md:px-8 bg-white/50 dark:bg-dark-surface/30 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-soft via-transparent to-soft dark:from-dark-bg dark:via-transparent dark:to-dark-bg" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Event Schedule
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-deep dark:text-soft mb-6">
            Three Days of Innovation
          </h2>
          <p className="text-lg text-deep/60 dark:text-soft/60 max-w-2xl mx-auto">
            Experience an action-packed program designed to inspire, educate, and connect.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm rounded-full p-1.5 border border-primary/10">
            {scheduleData.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all duration-300',
                  activeDay === index
                    ? 'bg-primary text-soft shadow-lg'
                    : 'text-deep/60 dark:text-soft/60 hover:text-primary'
                )}
              >
                <span className="hidden sm:inline">{day.day} - </span>
                {day.theme}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Cards - Only show active day */}
        <div ref={cardsContainerRef} className="space-y-6">
          {scheduleData.filter((_, dayIndex) => dayIndex === activeDay).map((day, dayIndex) => (
            <div
              key={day.day}
              className="schedule-card transition-all duration-500 animate-fade-up"
            >
              <div className={cn(
                'bg-white dark:bg-dark-surface rounded-3xl p-6 md:p-8',
                'border border-primary/10 shadow-card',
                'transition-all duration-500'
              )}>
                {/* Day Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary/10">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-deep dark:text-soft">
                      {day.day}: {day.theme}
                    </h3>
                    <p className="text-deep/60 dark:text-soft/60 mt-1">{day.date}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-primary">
                    <span className="text-sm font-medium">{day.events.length} Sessions</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={cn(
                        'group relative flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl',
                        'bg-soft/50 dark:bg-dark-bg/50',
                        'border border-transparent hover:border-primary/20',
                        'transition-all duration-300 hover:shadow-md'
                      )}
                    >
                      {/* Time */}
                      <div className="flex items-center gap-2 md:w-32 flex-shrink-0">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-deep dark:text-soft">
                          {event.time}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-deep dark:text-soft group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-deep/60 dark:text-soft/60">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {event.speaker}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {event.location}
                              </span>
                            </div>
                          </div>

                          {/* Type Badge */}
                          <span className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0',
                            typeColors[event.type]
                          )}>
                            {event.type}
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-primary/0 transition-all duration-300 group-hover:bg-primary/5 -z-10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
