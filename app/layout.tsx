import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Disaster Management & Emergency Response Portal",
  description: "Real-time disaster coordination, emergency helpline, shelter locator, incident reporting, and citizen safety portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen selection:bg-red-500 selection:text-white">
        {/* Top Emergency Broadcast Alert Bar */}
        <div className="bg-red-600/90 backdrop-blur text-white text-xs md:text-sm font-semibold px-4 py-2 text-center flex items-center justify-center gap-2 sticky top-0 z-50 border-b border-red-500">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <span>EMERGENCY HELPLINE 24/7: <strong>112</strong> | DISASTER CRISIS: <strong>1078</strong> | AMBULANCE: <strong>108</strong></span>
        </div>

        {/* Global Navigation Header */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-8 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  CrisisResponse <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Live</span>
                </h1>
                <p className="text-xs text-slate-400">Integrated Disaster Management Portal</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#alerts" className="hover:text-white transition">Alerts</a>
              <a href="#report" className="hover:text-white transition">Report Incident</a>
              <a href="#shelters" className="hover:text-white transition">Shelters & Camps</a>
              <a href="#checkin" className="hover:text-white transition">I am Safe</a>
              <a href="#preparedness" className="hover:text-white transition">Survival Guide</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-md shadow-red-600/30 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>SOS CALL</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Application Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-white font-bold tracking-tight">CrisisResponse Portal</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Providing rapid information dissemination, shelter locations, safety check-ins, and emergency response coordination during floods, cyclones, earthquakes, and other natural calamities.
              </p>
              <div className="mt-4 text-xs text-slate-500">
                Hosted statically on GitHub Pages &bull; Open-source disaster management system.
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Emergency Hotlines</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="tel:112" className="hover:text-red-400 transition">National Emergency: <strong>112</strong></a></li>
                <li><a href="tel:1078" className="hover:text-red-400 transition">NDMA Disaster Control: <strong>1078</strong></a></li>
                <li><a href="tel:108" className="hover:text-red-400 transition">Medical & Ambulance: <strong>108</strong></a></li>
                <li><a href="tel:101" className="hover:text-red-400 transition">Fire Services: <strong>101</strong></a></li>
                <li><a href="tel:1091" className="hover:text-red-400 transition">Women Helpline: <strong>1091</strong></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Quick Navigation</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#alerts" className="hover:text-white transition">Active Alerts & Warnings</a></li>
                <li><a href="#report" className="hover:text-white transition">Submit Rescue Request</a></li>
                <li><a href="#shelters" className="hover:text-white transition">Find Relief Camps</a></li>
                <li><a href="#checkin" className="hover:text-white transition">Mark Myself Safe</a></li>
                <li><a href="#preparedness" className="hover:text-white transition">Emergency Kit Checklist</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
