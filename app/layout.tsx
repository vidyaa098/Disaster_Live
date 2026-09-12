import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrisisResponse — Disaster Management & Emergency Portal",
  description: "Real-time disaster coordination, emergency helpline, shelter locator, incident reporting, and citizen safety portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-[#140321] text-[#fdf6ec] selection:bg-[#F59E51] selection:text-[#140321]">
        {/* Top Emergency Broadcast Alert Bar */}
        <div className="bg-gradient-to-r from-[#3A0353] via-[#804A8A] to-[#3A0353] text-[#F8D299] text-xs md:text-sm font-semibold px-4 py-2 text-center flex items-center justify-center gap-2 sticky top-0 z-50 border-b border-[#804A8A]/40 shadow-sm">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F59E51] animate-ping"></span>
          <span>EMERGENCY HELPLINE 24/7: <strong className="text-white">112</strong> &bull; DISASTER CRISIS: <strong className="text-white">1078</strong> &bull; AMBULANCE: <strong className="text-white">108</strong></span>
        </div>

        {/* Global Navigation Header */}
        <header className="border-b border-[#804A8A]/30 bg-[#160424]/90 backdrop-blur sticky top-8 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3A0353] to-[#804A8A] border border-[#804A8A]/50 flex items-center justify-center shadow-lg shadow-[#3A0353]/60">
                <svg className="w-6 h-6 text-[#F8D299]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  CrisisResponse <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F59E51]/20 text-[#F8D299] border border-[#F59E51]/40">Live</span>
                </h1>
                <p className="text-xs text-[#F8D299]/70">Integrated Disaster Management Portal</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-[#F8D299]/80 font-medium">
              <a href="#alerts" className="hover:text-white transition">Alerts</a>
              <a href="#report" className="hover:text-white transition">Report Incident</a>
              <a href="#shelters" className="hover:text-white transition">Shelters & Camps</a>
              <a href="#checkin" className="hover:text-white transition">I am Safe</a>
              <a href="#preparedness" className="hover:text-white transition">Survival Guide</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F59E51] to-[#F8D299] text-[#140321] text-xs font-black transition shadow-lg shadow-[#F59E51]/25 hover:brightness-110 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
        <footer className="border-t border-[#804A8A]/30 bg-[#10021b] text-slate-300 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3A0353] to-[#804A8A] border border-[#804A8A]/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#F8D299]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-white font-bold tracking-tight text-base">CrisisResponse Portal</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                Providing rapid information dissemination, shelter locations, safety check-ins, and emergency response coordination during floods, cyclones, earthquakes, and other natural calamities.
              </p>
              <div className="mt-4 text-xs text-[#804A8A]">
                Hosted statically on GitHub Pages &bull; Open-source disaster management system.
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#F8D299] mb-3">Emergency Hotlines</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="tel:112" className="hover:text-[#F59E51] transition">National Emergency: <strong className="text-white">112</strong></a></li>
                <li><a href="tel:1078" className="hover:text-[#F59E51] transition">NDMA Disaster Control: <strong className="text-white">1078</strong></a></li>
                <li><a href="tel:108" className="hover:text-[#F59E51] transition">Medical & Ambulance: <strong className="text-white">108</strong></a></li>
                <li><a href="tel:101" className="hover:text-[#F59E51] transition">Fire Services: <strong className="text-white">101</strong></a></li>
                <li><a href="tel:1091" className="hover:text-[#F59E51] transition">Women Helpline: <strong className="text-white">1091</strong></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#F8D299] mb-3">Quick Navigation</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#alerts" className="hover:text-[#F59E51] transition">Active Alerts & Warnings</a></li>
                <li><a href="#report" className="hover:text-[#F59E51] transition">Submit Rescue Request</a></li>
                <li><a href="#shelters" className="hover:text-[#F59E51] transition">Find Relief Camps</a></li>
                <li><a href="#checkin" className="hover:text-[#F59E51] transition">Mark Myself Safe</a></li>
                <li><a href="#preparedness" className="hover:text-[#F59E51] transition">Emergency Kit Checklist</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
