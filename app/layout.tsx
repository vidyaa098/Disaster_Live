import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrisisResponse — Integrated Disaster Management Portal",
  description: "Real-time emergency response platform, crisis hotlines, evacuation shelter locator, distress incident reporting, and citizen safety registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-[#f4f6fb] text-[#2c3e50] selection:bg-[#8eccc4] selection:text-[#0f2d29]">
        {/* Top Emergency Status Bar */}
        <div className="bg-[#ebebfa] border-b border-[#8eccc4]/40 text-[#2c3e50] py-1.5 px-4 text-xs font-medium shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8eccc4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8eccc4]"></span>
              </span>
              <span className="text-[#2c3e50] font-bold tracking-wide text-[11px] uppercase">
                National Disaster Alert System &bull; Live Telemetry Active
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#2c3e50]/90 font-mono">
              <span>National: <strong className="text-[#2c3e50] font-bold">112</strong></span>
              <span>Disaster: <strong className="text-[#2c3e50] font-bold">1078</strong></span>
              <span>Ambulance: <strong className="text-[#2c3e50] font-bold">108</strong></span>
              <span>Fire: <strong className="text-[#2c3e50] font-bold">101</strong></span>
            </div>
          </div>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#2c3e50]/10 shadow-xs transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2c3e50] to-[#3d566e] border border-[#8eccc4]/40 flex items-center justify-center shadow-md shadow-[#2c3e50]/20">
                <svg className="w-5 h-5 text-[#8eccc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black tracking-tight text-[#2c3e50]">CrisisResponse</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-[#e6f7f5] text-[#165b52] border border-[#8eccc4]/50">
                    Command Active
                  </span>
                </div>
                <p className="text-[10px] text-[#566573] tracking-wider font-medium">Integrated Emergency Coordination</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#ebebfa]/80 p-1 rounded-xl border border-[#2c3e50]/10 text-xs font-semibold">
              <a href="#alerts" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                Overview &amp; Alerts
              </a>
              <a href="#hotlines" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                Hotlines
              </a>
              <a href="#report" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                Distress Feed
              </a>
              <a href="#shelters" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                Relief Camps
              </a>
              <a href="#checkin" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                I am Safe
              </a>
              <a href="#preparedness" className="px-3.5 py-1.5 rounded-lg text-[#566573] hover:text-[#2c3e50] hover:bg-white transition">
                Survival Guide
              </a>
            </nav>

            {/* Emergency SOS Button */}
            <div className="flex items-center gap-3">
              <a
                href="tel:112"
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8eccc4] to-[#7ac2b9] text-[#0f2d29] text-xs font-black transition-all shadow-md shadow-[#8eccc4]/25 hover:shadow-lg hover:shadow-[#8eccc4]/35 hover:brightness-105 active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-[#0f2d29] animate-pulse"></span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>SOS DISPATCH</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1">
          {children}
        </main>

        {/* Clean Light Anchored Footer */}
        <footer className="border-t border-[#2c3e50]/10 bg-white text-[#566573] py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2c3e50] to-[#3d566e] border border-[#8eccc4]/40 flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4 text-[#8eccc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-[#2c3e50] font-black tracking-tight text-sm">CrisisResponse &bull; Disaster Command</span>
              </div>
              <p className="text-xs text-[#566573] leading-relaxed max-w-md">
                A unified emergency response coordination framework designed to optimize information flow, relief operations, evacuation camp management, and citizen safety status during natural calamities.
              </p>
              <div className="mt-4 text-[11px] text-[#8eccc4] font-semibold">
                Hosted on GitHub Pages &bull; Open-Source Emergency Infrastructure.
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2c3e50] mb-3">Priority Helplines</h3>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="tel:112" className="text-[#566573] hover:text-[#2c3e50] transition">National Emergency: <strong className="text-[#2c3e50] font-mono">112</strong></a></li>
                <li><a href="tel:1078" className="text-[#566573] hover:text-[#2c3e50] transition">NDMA Disaster Control: <strong className="text-[#2c3e50] font-mono">1078</strong></a></li>
                <li><a href="tel:108" className="text-[#566573] hover:text-[#2c3e50] transition">Medical &amp; Paramedic: <strong className="text-[#2c3e50] font-mono">108</strong></a></li>
                <li><a href="tel:101" className="text-[#566573] hover:text-[#2c3e50] transition">Fire &amp; Rescue Services: <strong className="text-[#2c3e50] font-mono">101</strong></a></li>
                <li><a href="tel:1091" className="text-[#566573] hover:text-[#2c3e50] transition">Women Helpline: <strong className="text-[#2c3e50] font-mono">1091</strong></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2c3e50] mb-3">Portal Modules</h3>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#alerts" className="text-[#566573] hover:text-[#2c3e50] transition">Active Weather Threat Intel</a></li>
                <li><a href="#report" className="text-[#566573] hover:text-[#2c3e50] transition">Incident Rescue Log</a></li>
                <li><a href="#shelters" className="text-[#566573] hover:text-[#2c3e50] transition">Safe Shelters &amp; Camp Locator</a></li>
                <li><a href="#checkin" className="text-[#566573] hover:text-[#2c3e50] transition">Citizen Safety Check-In</a></li>
                <li><a href="#preparedness" className="text-[#566573] hover:text-[#2c3e50] transition">72-Hour Survival Go-Bag</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
