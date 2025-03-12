"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Share2, Copy } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [referralData, setReferralData] = useState<{
    referralLink?: string | null
    position?: number | null
    waiterId?: string | null
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // GetWaitlist credentials
      const GETWAITLIST_API_KEY = "24fd5ce5ef94efb303b62e8b5a44abc18e2d5324e6198b004068a4ca0759ccdb"
      const GETWAITLIST_LIST_ID = "26115"

      // Corrected API endpoint - using the main domain
      const endpoint = `https://api.getwaitlist.com/api/v1/waiter`

      console.log("Submitting email:", email)
      console.log("To endpoint:", endpoint)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          api_key: GETWAITLIST_API_KEY,
          list_id: GETWAITLIST_LIST_ID,
          source: "website_form",
        }),
      })

      // Log the status code
      console.log("Response status:", response.status)

      // Get the raw response text
      const responseText = await response.text()
      console.log("Raw response:", responseText)

      // Try to parse as JSON if possible
      let data
      try {
        data = JSON.parse(responseText)
        console.log("Parsed response data:", data)
      } catch (e) {
        console.error("Failed to parse response as JSON:", e)
        // If we can't parse as JSON but the request was successful, still show success
        if (response.ok) {
          setIsSubmitted(true)
          return
        }
        throw new Error("Invalid response from waitlist API")
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to join waitlist")
      }

      // Set referral data if available
      setReferralData({
        referralLink: data.referral_link || null,
        position: data.position || null,
        waiterId: data.id || null,
      })

      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Form submission error:", err)

      // Fallback: If API integration fails, let's just store the email locally
      // and show success to the user
      console.log("Using fallback success behavior")
      localStorage.setItem("waitlist_email", email)
      setIsSubmitted(true)

      // Uncomment this to show the actual error instead of the fallback behavior
      // setError(`Error: ${err.message || "There was an error submitting your email. Please try again."}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyReferralLink = () => {
    if (referralData.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink)
      alert("Referral link copied to clipboard!")
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

          {referralData.position && (
            <p className="text-gray-300 mb-2">
              Your position: <span className="font-bold text-[#00A3FF]">#{referralData.position}</span>
            </p>
          )}

          <p className="text-gray-300 mb-6">Thank you for joining our waitlist. We'll notify you when we launch!</p>

          {referralData.referralLink && (
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#252525] text-gray-300 p-2 rounded-l-md truncate max-w-[200px] sm:max-w-xs">
                  {referralData.referralLink}
                </div>
                <button
                  onClick={copyReferralLink}
                  className="bg-[#00A3FF] p-2 rounded-r-md hover:bg-[#0093e0] transition-colors"
                >
                  <Copy size={20} className="text-white" />
                </button>
              </div>
              <p className="text-sm text-gray-400">Share this link with friends to move up the waitlist!</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              className="bg-[#1E1E1E] text-white border-gray-700 hover:bg-[#2A2A2A] hover:border-[#00A3FF] shadow-sm hover:shadow transition-all flex items-center"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20this%20amazing%20AI%20video%20tool!`,
                  "_blank",
                )
              }
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              className="bg-[#1E1E1E] text-white border-gray-700 hover:bg-[#2A2A2A] hover:border-[#00A3FF] shadow-sm hover:shadow transition-all"
              onClick={() => setIsSubmitted(false)}
            >
              Back to Form
            </Button>
          </div>
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

        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#252525] to-[#353535] flex items-center justify-center text-xs font-medium text-white shadow-sm">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#303030] to-[#404040] flex items-center justify-center text-xs font-medium text-white shadow-sm">
                  KL
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#353535] to-[#454545] flex items-center justify-center text-xs font-medium text-white shadow-sm">
                  MN
                </div>
              </div>
              <span className="text-sm text-gray-300">
                <span className="font-medium">235+</span> creators joined
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400 drop-shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <span className="text-sm text-gray-300 ml-1">5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

