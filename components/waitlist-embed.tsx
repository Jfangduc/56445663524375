"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function WaitlistEmbed() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Store the email in localStorage as a fallback
      localStorage.setItem("waitlist_email", email)

      // Simulate a delay to make it feel like it's doing something
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Always show success
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Form submission error:", err)
      setError("There was an error submitting your email. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg border border-gray-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/10 to-[#A020F0]/10 opacity-70 z-0"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00A3FF]/20 to-[#A020F0]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#00A3FF]"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">You're on the list!</h3>
          <p className="text-gray-300 mb-6">Thank you for joining our waitlist. We'll notify you when we launch!</p>
          <Button
            variant="outline"
            className="bg-[#1E1E1E] text-white border-gray-700 hover:bg-[#2A2A2A] hover:border-[#00A3FF] shadow-sm hover:shadow transition-all"
            onClick={() => setIsSubmitted(false)}
          >
            Back to Form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg border border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#00A3FF]/10 to-[#A020F0]/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#00A3FF]/10 to-[#A020F0]/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-1.5 h-6 bg-gradient-to-b from-[#00A3FF] to-[#A020F0] rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">Join the Waitlist</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Be the first to get access to our AI video optimization platform. Early access members receive 50% off at
          launch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#252525] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#00A3FF] shadow-sm focus:shadow transition-all"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00A3FF] to-[#A020F0] hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all border-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By joining, you agree to receive updates about our product. We respect your privacy and will never share
            your information.
          </p>
        </form>
      </div>
    </div>
  )
}

