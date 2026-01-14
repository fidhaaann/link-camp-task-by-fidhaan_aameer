'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ArrowRight,
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  Building2,
  Users,
  CheckCircle,
  Sparkles,
  Ticket,
  AlertCircle,
  Loader2
} from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  institution: string
  studentId: string
  yearOfStudy: string
  department: string
  isIEEEMember: boolean
  ieeeNumber: string
  ticketType: 'early-bird' | 'regular' | 'ieee-member'
  dietaryRestrictions: string
  tshirtSize: string
  emergencyContact: string
  emergencyPhone: string
  agreeToTerms: boolean
  agreeToPhotography: boolean
}

interface FormErrors {
  [key: string]: string
}

const ticketOptions = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: '$29',
    originalPrice: '$49',
    description: 'Limited spots available',
    deadline: 'Until Feb 15',
  },
  {
    id: 'regular',
    name: 'Regular',
    price: '$49',
    originalPrice: '$69',
    description: 'Standard registration',
    deadline: 'Until Mar 10',
  },
  {
    id: 'ieee-member',
    name: 'IEEE Member',
    price: '$39',
    originalPrice: '$49',
    description: 'Verified members only',
    deadline: 'Valid membership required',
  },
]

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other']
const tshirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function RegisterPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    studentId: '',
    yearOfStudy: '',
    department: '',
    isIEEEMember: false,
    ieeeNumber: '',
    ticketType: 'regular',
    dietaryRestrictions: '',
    tshirtSize: 'M',
    emergencyContact: '',
    emergencyPhone: '',
    agreeToTerms: false,
    agreeToPhotography: false,
  })

  useEffect(() => {
    // Animate header on mount
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      )
    }
  }, [])

  useEffect(() => {
    // Animate form on step change
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.4,
          ease: 'power2.out'
        }
      )
    }
  }, [currentStep])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    }

    if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = 'Institution is required'
      if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required'
      if (!formData.department.trim()) newErrors.department = 'Department is required'
      if (formData.isIEEEMember && !formData.ieeeNumber.trim()) {
        newErrors.ieeeNumber = 'IEEE membership number is required'
      }
    }

    if (step === 3) {
      if (!formData.ticketType) newErrors.ticketType = 'Please select a ticket type'
      if (!formData.tshirtSize) newErrors.tshirtSize = 'Please select a T-shirt size'
    }

    if (step === 4) {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact name is required'
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency contact phone is required'
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(4)) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Success animation
    gsap.fromTo(
      '.success-content',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' }
    )
  }

  const InputField = ({ 
    name, 
    label, 
    type = 'text', 
    icon: Icon, 
    placeholder,
    required = false 
  }: {
    name: keyof FormData
    label: string
    type?: string
    icon?: typeof User
    placeholder?: string
    required?: boolean
  }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-deep dark:text-soft">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name] as string}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl border-2 bg-soft/50 dark:bg-dark-surface/50',
            'py-3 transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
            'placeholder:text-deep/40 dark:placeholder:text-soft/40',
            Icon ? 'pl-12 pr-4' : 'px-4',
            errors[name] 
              ? 'border-red-400 dark:border-red-500' 
              : 'border-primary/20 dark:border-primary/30'
          )}
        />
      </div>
      {errors[name] && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[name]}
        </p>
      )}
    </div>
  )

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-soft dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="success-content text-center max-w-lg">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-deep dark:text-soft mb-4">
            Registration Successful!
          </h1>
          <p className="text-deep/70 dark:text-soft/70 mb-8">
            Thank you for registering for LINK CAMP 2025! A confirmation email has been sent to{' '}
            <span className="font-semibold text-primary">{formData.email}</span>.
          </p>
          <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-deep/70 dark:text-soft/70">Ticket Type</span>
              <span className="font-semibold text-deep dark:text-soft">
                {ticketOptions.find(t => t.id === formData.ticketType)?.name}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-deep/70 dark:text-soft/70">Attendee</span>
              <span className="font-semibold text-deep dark:text-soft">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-deep/70 dark:text-soft/70">Amount Paid</span>
              <span className="font-bold text-2xl text-primary">
                {ticketOptions.find(t => t.id === formData.ticketType)?.price}
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-soft rounded-full font-semibold hover:bg-accent transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soft dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-deep/70 dark:text-soft/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <div ref={headerRef} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 dark:bg-primary/30 rounded-full text-primary font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Limited Spots Available
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-deep dark:text-soft mb-4">
              Register for LINK CAMP 2025
            </h1>
            <p className="text-lg text-deep/70 dark:text-soft/70 max-w-2xl mx-auto">
              Join 500+ students for three days of learning, networking, and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Personal Info', icon: User },
              { step: 2, label: 'Academic Info', icon: GraduationCap },
              { step: 3, label: 'Ticket Selection', icon: Ticket },
              { step: 4, label: 'Confirmation', icon: CheckCircle },
            ].map(({ step, label, icon: Icon }, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300',
                      currentStep >= step
                        ? 'bg-primary text-soft'
                        : 'bg-gray-200 dark:bg-dark-bg text-gray-400'
                    )}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                  <span className={cn(
                    'text-xs md:text-sm mt-2 font-medium hidden sm:block',
                    currentStep >= step ? 'text-primary' : 'text-gray-400'
                  )}>
                    {label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={cn(
                      'w-8 md:w-16 lg:w-24 h-1 mx-2 rounded-full transition-all duration-300',
                      currentStep > step ? 'bg-primary' : 'bg-gray-200 dark:bg-dark-bg'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-dark-surface rounded-2xl shadow-lg p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-deep dark:text-soft mb-6">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="firstName"
                  label="First Name"
                  icon={User}
                  placeholder="John"
                  required
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                  icon={User}
                  placeholder="Doe"
                  required
                />
              </div>

              <InputField
                name="email"
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="john@example.com"
                required
              />

              <InputField
                name="phone"
                label="Phone Number"
                type="tel"
                icon={Phone}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-deep dark:text-soft mb-6">
                Academic Information
              </h2>

              <InputField
                name="institution"
                label="Institution/University"
                icon={Building2}
                placeholder="University of Technology"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-deep dark:text-soft">
                    Year of Study <span className="text-accent">*</span>
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className={cn(
                      'w-full rounded-xl border-2 bg-soft/50 dark:bg-dark-surface/50',
                      'px-4 py-3 transition-all duration-300',
                      'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                      errors.yearOfStudy 
                        ? 'border-red-400 dark:border-red-500' 
                        : 'border-primary/20 dark:border-primary/30'
                    )}
                  >
                    <option value="">Select year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.yearOfStudy && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.yearOfStudy}
                    </p>
                  )}
                </div>

                <InputField
                  name="department"
                  label="Department/Major"
                  icon={GraduationCap}
                  placeholder="Computer Science"
                  required
                />
              </div>

              <InputField
                name="studentId"
                label="Student ID (Optional)"
                placeholder="STU123456"
              />

              <div className="space-y-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isIEEEMember"
                    checked={formData.isIEEEMember}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-primary/30 text-primary focus:ring-primary/30"
                  />
                  <span className="flex items-center gap-2 text-deep dark:text-soft font-medium">
                    <Users className="w-5 h-5 text-primary" />
                    I am an IEEE Member
                  </span>
                </label>
                
                {formData.isIEEEMember && (
                  <InputField
                    name="ieeeNumber"
                    label="IEEE Membership Number"
                    placeholder="12345678"
                    required
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 3: Ticket Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-deep dark:text-soft mb-6">
                Select Your Ticket
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ticketOptions.map((ticket) => (
                  <label
                    key={ticket.id}
                    className={cn(
                      'relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300',
                      formData.ticketType === ticket.id
                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg'
                        : 'border-primary/20 hover:border-primary/40'
                    )}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      value={ticket.id}
                      checked={formData.ticketType === ticket.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    {formData.ticketType === ticket.id && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-display font-bold text-lg text-deep dark:text-soft mb-2">
                        {ticket.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-primary">{ticket.price}</span>
                        <span className="text-sm text-deep/50 dark:text-soft/50 line-through">
                          {ticket.originalPrice}
                        </span>
                      </div>
                      <p className="text-sm text-deep/60 dark:text-soft/60 mb-2">
                        {ticket.description}
                      </p>
                      <span className="text-xs text-accent font-medium">
                        {ticket.deadline}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-deep dark:text-soft">
                    T-Shirt Size <span className="text-accent">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tshirtSizes.map(size => (
                      <label
                        key={size}
                        className={cn(
                          'px-4 py-2 rounded-lg border-2 cursor-pointer transition-all duration-300',
                          formData.tshirtSize === size
                            ? 'border-primary bg-primary text-soft'
                            : 'border-primary/20 hover:border-primary/40'
                        )}
                      >
                        <input
                          type="radio"
                          name="tshirtSize"
                          value={size}
                          checked={formData.tshirtSize === size}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-deep dark:text-soft">
                    Dietary Restrictions (Optional)
                  </label>
                  <textarea
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    placeholder="Vegetarian, allergies, etc."
                    rows={3}
                    className="w-full rounded-xl border-2 border-primary/20 bg-soft/50 dark:bg-dark-surface/50 px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-deep dark:text-soft mb-6">
                Review & Confirm
              </h2>

              {/* Summary */}
              <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-deep dark:text-soft mb-4">Registration Summary</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-deep/60 dark:text-soft/60">Name</span>
                    <p className="font-medium text-deep dark:text-soft">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-deep/60 dark:text-soft/60">Email</span>
                    <p className="font-medium text-deep dark:text-soft">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-deep/60 dark:text-soft/60">Institution</span>
                    <p className="font-medium text-deep dark:text-soft">{formData.institution}</p>
                  </div>
                  <div>
                    <span className="text-deep/60 dark:text-soft/60">Ticket Type</span>
                    <p className="font-medium text-primary">
                      {ticketOptions.find(t => t.id === formData.ticketType)?.name} - 
                      {ticketOptions.find(t => t.id === formData.ticketType)?.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="emergencyContact"
                  label="Emergency Contact Name"
                  placeholder="Parent/Guardian name"
                  required
                />
                <InputField
                  name="emergencyPhone"
                  label="Emergency Contact Phone"
                  type="tel"
                  icon={Phone}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-0.5 rounded border-primary/30 text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm text-deep/80 dark:text-soft/80">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    {' '}<span className="text-accent">*</span>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500 flex items-center gap-1 ml-8">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agreeToTerms}
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToPhotography"
                    checked={formData.agreeToPhotography}
                    onChange={handleInputChange}
                    className="w-5 h-5 mt-0.5 rounded border-primary/30 text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm text-deep/80 dark:text-soft/80">
                    I consent to being photographed/recorded during the event for promotional purposes (Optional)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/30 text-deep dark:text-soft font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-soft rounded-full font-semibold hover:bg-accent transition-colors duration-300"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-soft rounded-full font-semibold hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
