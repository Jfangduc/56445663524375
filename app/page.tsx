import { WaitlistForm } from "@/components/waitlist-form"
// Uncomment this line and comment out the line above if you want to use the fallback form
// import { WaitlistEmbed as WaitlistForm } from "@/components/waitlist-embed"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Add decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#A020F0]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header with logo and company name */}
      <div className="w-full max-w-4xl mx-auto mb-12 flex items-center justify-center md:justify-start">
        <Logo />
        <h2 className="text-xl md:text-2xl font-bold text-white ml-3">Your Company</h2>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">
        <div className="space-y-6 text-center mb-10">
          <div className="inline-block px-4 py-1.5 bg-[#00A3FF]/20 rounded-full text-[#00A3FF] font-medium text-sm mb-2">
            Join Our Exclusive Beta
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] to-[#A020F0]">
            Transform Your Video Content with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform helps content creators optimize and repurpose videos for multiple platforms,
            maximizing your reach and engagement.
          </p>
        </div>

        <WaitlistForm />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature cards remain the same */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:border-[#00A3FF]/30">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00A3FF]/20 to-[#00A3FF]/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00A3FF]"
              >
                <path d="M12 2v8"></path>
                <path d="m4.93 10.93 1.41 1.41"></path>
                <path d="M2 18h2"></path>
                <path d="M20 18h2"></path>
                <path d="m19.07 10.93-1.41 1.41"></path>
                <path d="M22 22H2"></path>
                <path d="m16 6-4 4-4-4"></path>
                <path d="M16 18a4 4 0 0 0-8 0"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Smart Optimization</h3>
            <p className="text-gray-400">
              Our AI analyzes your videos and optimizes them for each platform's algorithm.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:border-[#00A3FF]/30">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00A3FF]/20 to-[#00A3FF]/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00A3FF]"
              >
                <path d="M12 3v12"></path>
                <path d="m8 11 4 4 4-4"></path>
                <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Save Time</h3>
            <p className="text-gray-400">
              Automate your content distribution workflow and focus on creating great videos.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:border-[#00A3FF]/30">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00A3FF]/20 to-[#00A3FF]/10 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00A3FF]"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Maximize Reach</h3>
            <p className="text-gray-400">Get more views and engagement by optimizing your content for each platform.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

