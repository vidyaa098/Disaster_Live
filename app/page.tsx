"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Flame,
  Waves,
  Wind,
  Building2,
  Search,
  Clock,
  CheckSquare,
  Square,
  Send,
  UserCheck,
} from "lucide-react";

interface Incident {
  id: string;
  type: string;
  severity: "Critical" | "High" | "Moderate";
  location: string;
  peopleCount: number;
  needs: string[];
  status: "Reported" | "Team Dispatched" | "In Progress" | "Resolved";
  contact: string;
  timestamp: string;
  details: string;
}

interface Shelter {
  id: string;
  name: string;
  location: string;
  capacity: number;
  occupied: number;
  status: "Open" | "Near Capacity" | "Full";
  amenities: string[];
  contact: string;
  officer: string;
}

interface SafetyCheckIn {
  id: string;
  name: string;
  location: string;
  status: "Safe" | "At Shelter" | "Relocated";
  message: string;
  timestamp: string;
}

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: "INC-8091",
    type: "Flash Flood",
    severity: "Critical",
    location: "Sector 4, Riverside Lowlands",
    peopleCount: 14,
    needs: ["Boat Rescue", "Medical Aid", "Drinking Water"],
    status: "Team Dispatched",
    contact: "+91 98451 22310",
    timestamp: "12 mins ago",
    details: "Water level rose above 5ft. Family with elderly individuals stranded on terrace.",
  },
  {
    id: "INC-8089",
    type: "Cyclone Damage",
    severity: "High",
    location: "Coastal Highway KM 42",
    peopleCount: 6,
    needs: ["Road Clearance", "Power Supply"],
    status: "In Progress",
    contact: "+91 94432 10982",
    timestamp: "35 mins ago",
    details: "Fallen banyan trees blocking ambulance access. Power cables severed.",
  },
  {
    id: "INC-8084",
    type: "Landslide",
    severity: "Critical",
    location: "Hill Pass Road, North Ghats",
    peopleCount: 22,
    needs: ["Earth Movers", "Evacuation"],
    status: "In Progress",
    contact: "+91 98765 43210",
    timestamp: "1 hour ago",
    details: "Mudslide covering 200m of road, 3 transport buses trapped safely on high ground.",
  },
];

const SHELTERS: Shelter[] = [
  {
    id: "SH-101",
    name: "St. Jude Central Community Hall",
    location: "Main Market Road, Sector 12",
    capacity: 500,
    occupied: 320,
    status: "Open",
    amenities: ["Clean Water", "Medical Unit", "Beds", "Hot Meals", "Generator"],
    contact: "+91 91234 56780",
    officer: "Inspector R. Verma",
  },
  {
    id: "SH-102",
    name: "Government Higher Secondary School",
    location: "Highland Avenue, North Block",
    capacity: 350,
    occupied: 335,
    status: "Near Capacity",
    amenities: ["Clean Water", "First Aid", "Sleeping Mats", "Dry Rations"],
    contact: "+91 92345 67891",
    officer: "Dr. Ananya Sen",
  },
  {
    id: "SH-103",
    name: "District Indoor Sports Stadium",
    location: "Civic Center, South Zone",
    capacity: 1200,
    occupied: 650,
    status: "Open",
    amenities: ["Clean Water", "Doctor On-Duty", "Beds", "Children Care", "Charging Hub"],
    contact: "+91 93456 78902",
    officer: "Capt. K. Raman",
  },
  {
    id: "SH-104",
    name: "Township Multipurpose Center",
    location: "East Bypass, Old Airport Rd",
    capacity: 400,
    occupied: 400,
    status: "Full",
    amenities: ["Food & Water", "Basic Medical"],
    contact: "+91 94567 89013",
    officer: "Officer M. Patil",
  },
];

const INITIAL_SAFETY: SafetyCheckIn[] = [
  {
    id: "S-1",
    name: "Priya Sundaram & Family (4)",
    location: "Sector 14, Riverside",
    status: "At Shelter",
    message: "Evacuated safely to St. Jude shelter. We have food and dry clothes.",
    timestamp: "18 mins ago",
  },
  {
    id: "S-2",
    name: "Karthik Narayanan",
    location: "Highland Heights Apt 4B",
    status: "Safe",
    message: "Building is high and safe. Power is out but we have stored 20L water.",
    timestamp: "45 mins ago",
  },
  {
    id: "S-3",
    name: "Sunil & Deepa Mehta",
    location: "Coastline Enclave",
    status: "Relocated",
    message: "Moved to relative's house in Central district before the storm made landfall.",
    timestamp: "2 hours ago",
  },
];

const EMERGENCY_CONTACTS = [
  { name: "National Emergency", number: "112", desc: "All-in-one Police, Fire & Medical" },
  { name: "NDMA Disaster Control", number: "1078", desc: "National Disaster Response" },
  { name: "Ambulance Emergency", number: "108", desc: "Critical Medical & Paramedic" },
  { name: "Fire & Rescue Service", number: "101", desc: "Fire Incidents & Flood Rescue" },
  { name: "State Disaster Authority", number: "1070", desc: "State Level Relief Command" },
  { name: "Women & Child Helpline", number: "1091", desc: "Vulnerable Protection & Aid" },
];

export default function DisasterManagementPage() {
  // State
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [safetyList, setSafetyList] = useState<SafetyCheckIn[]>(INITIAL_SAFETY);
  const [shelterSearch, setShelterSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"incidents" | "shelters" | "checkin" | "guide">("incidents");

  // Report Form State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("Flash Flood");
  const [reportSeverity, setReportSeverity] = useState<"Critical" | "High" | "Moderate">("Critical");
  const [reportLocation, setReportLocation] = useState("");
  const [reportPeople, setReportPeople] = useState("1");
  const [reportContact, setReportContact] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["Medical Aid"]);

  // Safety Check-In Form State
  const [safeName, setSafeName] = useState("");
  const [safeLocation, setSafeLocation] = useState("");
  const [safeStatus, setSafeStatus] = useState<"Safe" | "At Shelter" | "Relocated">("Safe");
  const [safeMessage, setSafeMessage] = useState("");

  // Preparedness Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    water: true,
    food: true,
    firstaid: false,
    flashlight: true,
    powerbank: false,
    documents: false,
    medicines: false,
    whistle: false,
  });

  // Load saved data from localStorage on mount (works client-side in static export)
  useEffect(() => {
    try {
      const savedIncidents = localStorage.getItem("dm_incidents");
      const savedSafety = localStorage.getItem("dm_safety");
      const savedChecklist = localStorage.getItem("dm_checklist");

      if (savedIncidents || savedSafety || savedChecklist) {
        setTimeout(() => {
          if (savedIncidents) setIncidents(JSON.parse(savedIncidents));
          if (savedSafety) setSafetyList(JSON.parse(savedSafety));
          if (savedChecklist) setCheckedItems(JSON.parse(savedChecklist));
        }, 0);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save incidents
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportLocation.trim() || !reportContact.trim()) return;

    const newInc: Incident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      type: reportType,
      severity: reportSeverity,
      location: reportLocation.trim(),
      peopleCount: parseInt(reportPeople) || 1,
      needs: selectedNeeds.length > 0 ? selectedNeeds : ["General Rescue"],
      status: "Reported",
      contact: reportContact.trim(),
      timestamp: "Just now",
      details: reportDetails.trim() || "Urgent assistance requested.",
    };

    const updated = [newInc, ...incidents];
    setIncidents(updated);
    try {
      localStorage.setItem("dm_incidents", JSON.stringify(updated));
    } catch {}

    // Reset Form
    setReportLocation("");
    setReportContact("");
    setReportDetails("");
    setShowReportModal(false);
  };

  // Toggle Need Chip
  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  // Submit Safety Check-in
  const handleSafetySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safeName.trim() || !safeLocation.trim()) return;

    const newSafe: SafetyCheckIn = {
      id: `S-${Date.now()}`,
      name: safeName.trim(),
      location: safeLocation.trim(),
      status: safeStatus,
      message: safeMessage.trim() || "Marked safe in the registry.",
      timestamp: "Just now",
    };

    const updated = [newSafe, ...safetyList];
    setSafetyList(updated);
    try {
      localStorage.setItem("dm_safety", JSON.stringify(updated));
    } catch {}

    setSafeName("");
    setSafeLocation("");
    setSafeMessage("");
  };

  // Toggle Checklist
  const toggleChecklist = (key: string) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);
    try {
      localStorage.setItem("dm_checklist", JSON.stringify(updated));
    } catch {}
  };

  const checklistTotal = Object.keys(checkedItems).length;
  const checklistCompleted = Object.values(checkedItems).filter(Boolean).length;
  const checklistPercentage = Math.round((checklistCompleted / checklistTotal) * 100);

  const filteredShelters = SHELTERS.filter((s) =>
    s.name.toLowerCase().includes(shelterSearch.toLowerCase()) ||
    s.location.toLowerCase().includes(shelterSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Alert Banner / Active Weather Warnings */}
      <section id="alerts" className="relative overflow-hidden rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/60 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white tracking-wide uppercase">
                  Level 3 Severe Warning
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Updated 5m ago
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                Severe Cyclone & Flash Flood Inundation Warning
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                Heavy rainfall predicted (200mm+) over the coastal and riverine sectors within next 12 hours.
                Low-lying areas advised to evacuate immediately to designated relief shelters. Keep emergency kits ready.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition shadow-lg shadow-red-600/30 flex items-center gap-2 active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              Request Urgent Rescue
            </button>
            <a
              href="#shelters"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition border border-slate-700 text-center"
            >
              Locate Safe Shelters
            </a>
          </div>
        </div>

        {/* Live Metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">Active Relief Camps</p>
            <p className="text-2xl font-bold text-white">4 Open</p>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">Citizens Sheltered</p>
            <p className="text-2xl font-bold text-emerald-400">1,705 Safe</p>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">NDRF Rescue Teams</p>
            <p className="text-2xl font-bold text-amber-400">18 Deployed</p>
          </div>
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-400">Active Distress Calls</p>
            <p className="text-2xl font-bold text-red-400">{incidents.length} Logged</p>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Hotline Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-red-500" />
              Emergency Quick Dial Hotlines
            </h2>
            <p className="text-xs text-slate-400">Toll-free 24/7 dedicated lines for immediate disaster intervention</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="group p-3.5 rounded-xl bg-slate-900/80 hover:bg-red-950/30 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-red-400 transition">
                  {c.name}
                </span>
                <p className="text-2xl font-black text-white mt-1 group-hover:text-red-300 tracking-tight">
                  {c.number}
                </p>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 block line-clamp-1">{c.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Navigation Tabs for Primary Functions */}
      <div className="border-b border-slate-800">
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto pb-px text-sm font-medium">
          <button
            onClick={() => setActiveTab("incidents")}
            className={`py-3 px-3 border-b-2 font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === "incidents"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Distress & Incident Feed ({incidents.length})
          </button>
          <button
            onClick={() => setActiveTab("shelters")}
            className={`py-3 px-3 border-b-2 font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === "shelters"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Relief Camps & Shelters ({SHELTERS.length})
          </button>
          <button
            onClick={() => setActiveTab("checkin")}
            className={`py-3 px-3 border-b-2 font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === "checkin"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            &quot;I am Safe&quot; Registry ({safetyList.length})
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`py-3 px-3 border-b-2 font-semibold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === "guide"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Survival Kit & Guides ({checklistPercentage}%)
          </button>
        </nav>
      </div>

      {/* TAB 1: INCIDENT & RESCUE FEED */}
      {activeTab === "incidents" && (
        <section id="report" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Live Incident & Distress Rescue Log</h3>
              <p className="text-xs text-slate-400">Reports filed by affected citizens, responders, and local authorities</p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition shadow-md shadow-red-600/30 flex items-center gap-2 shrink-0"
            >
              <AlertTriangle className="w-4 h-4" />
              Report New Emergency Incident
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-400">{inc.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        inc.severity === "Critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : inc.severity === "High"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                    {inc.type === "Flash Flood" ? <Waves className="w-4 h-4 text-blue-400" /> : null}
                    {inc.type === "Cyclone Damage" ? <Wind className="w-4 h-4 text-cyan-400" /> : null}
                    {inc.type === "Landslide" ? <Flame className="w-4 h-4 text-amber-400" /> : null}
                    {inc.type}
                  </h4>

                  <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    {inc.location}
                  </p>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {inc.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {inc.needs.map((n) => (
                      <span key={n} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Trapped: <strong className="text-white">{inc.peopleCount}</strong>
                  </span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      inc.status === "Team Dispatched"
                        ? "bg-amber-400/10 text-amber-400"
                        : inc.status === "In Progress"
                        ? "bg-blue-400/10 text-blue-400"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: RELIEF CAMPS & SHELTERS */}
      {activeTab === "shelters" && (
        <section id="shelters" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Designated Relief Camps & Safe Shelters</h3>
              <p className="text-xs text-slate-400">Equipped with food, drinking water, first aid, and sleeping provisions</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={shelterSearch}
                onChange={(e) => setShelterSearch(e.target.value)}
                placeholder="Search camp or location..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredShelters.map((sh) => {
              const occupancyPct = Math.round((sh.occupied / sh.capacity) * 100);
              return (
                <div
                  key={sh.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">{sh.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sh.status === "Open"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : sh.status === "Near Capacity"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {sh.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">{sh.name}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {sh.location}
                      </p>
                    </div>
                    <a
                      href={`tel:${sh.contact}`}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition shrink-0"
                      title="Call Shelter Manager"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Occupancy Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Occupancy: {sh.occupied} / {sh.capacity} people</span>
                      <span className="font-semibold text-white">{occupancyPct}% full</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          occupancyPct > 90 ? "bg-red-500" : occupancyPct > 65 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${occupancyPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Amenities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sh.amenities.map((a) => (
                        <span key={a} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700/60 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Officer: <strong className="text-slate-200">{sh.officer}</strong></span>
                    <a href={`tel:${sh.contact}`} className="text-red-400 hover:underline font-semibold">
                      {sh.contact}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 3: "I AM SAFE" REGISTRY */}
      {activeTab === "checkin" && (
        <section id="checkin" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Check-In Form */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 lg:col-span-1 h-fit">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Citizen Safety Check-In</h3>
            </div>
            <p className="text-xs text-slate-400">
              Let family, rescue authorities, and volunteers know that you and your group are safe.
            </p>

            <form onSubmit={handleSafetySubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name / Family</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar & family (3)"
                  value={safeName}
                  onChange={(e) => setSafeName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Current Location / Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Community Center or Sector 8"
                  value={safeLocation}
                  onChange={(e) => setSafeLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Safety Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Safe", "At Shelter", "Relocated"] as const).map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setSafeStatus(st)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                        safeStatus === st
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Note / Message</label>
                <textarea
                  rows={3}
                  placeholder="e.g. We are safe on 2nd floor, no water entered, battery is low."
                  value={safeMessage}
                  onChange={(e) => setSafeMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                Publish My Safety Status
              </button>
            </form>
          </div>

          {/* Safety Registry Feed */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Recent Citizen Safety Updates</h3>
              <span className="text-xs text-slate-400">{safetyList.length} Citizens Marked Safe</span>
            </div>

            <div className="space-y-3">
              {safetyList.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{s.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {s.location}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      &ldquo;{s.message}&rdquo;
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{s.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: PREPAREDNESS & SURVIVAL GUIDE */}
      {activeTab === "guide" && (
        <section id="preparedness" className="space-y-8">
          {/* Interactive Go-Bag Checklist */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-red-500" />
                  72-Hour Emergency Survival Kit Checklist
                </h3>
                <p className="text-xs text-slate-400">
                  Ensure you and your family have these critical survival items packed in a waterproof bag.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400">Kit Readiness</span>
                <p className="text-xl font-black text-emerald-400">{checklistPercentage}% Ready</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${checklistPercentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: "water", label: "Clean Water (3L per person per day)" },
                { key: "food", label: "Non-perishable ready-to-eat dry food" },
                { key: "firstaid", label: "First Aid Kit & Bandages" },
                { key: "flashlight", label: "Waterproof Flashlight & extra batteries" },
                { key: "powerbank", label: "Charged Mobile Power Bank & cables" },
                { key: "documents", label: "Copies of ID, Aadhaar, Insurance in plastic" },
                { key: "medicines", label: "Essential prescription medicines (7 days)" },
                { key: "whistle", label: "Whistle to signal rescue teams" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className={`p-3 rounded-xl border text-left transition flex items-start gap-3 ${
                    checkedItems[item.key]
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
                      : "bg-slate-800/50 border-slate-700/60 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {checkedItems[item.key] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calamity Dos and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 rounded-2xl border border-blue-500/20 p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-400" />
                Floods &amp; Water Inundation: Dos &amp; Don&apos;ts
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">DO:</span> Turn off main electrical circuit breaker and gas cylinder valves before evacuating.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">DO:</span> Move to upper floors or designated relief centers if floodwater rises.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">DON&apos;T:</span> Never walk or drive through moving flood water — 6 inches of water can knock you down.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">DON&apos;T:</span> Do not consume tap or floodwater without boiling or purification tablets.
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/90 rounded-2xl border border-amber-500/20 p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Wind className="w-5 h-5 text-amber-400" />
                Cyclones &amp; Severe Gales: Dos &amp; Don&apos;ts
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">DO:</span> Secure loose tiles, tin sheets, and outdoor fixtures that can become flying debris.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">DO:</span> Stay in the strongest, windowless room inside the house during the eye of the storm.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">DON&apos;T:</span> Do not go outside when wind calms — the back half of the cyclone is equally violent.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">DON&apos;T:</span> Never stand near metal poles, trees, or downed electrical transformers.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Incident Reporting Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Emergency Incident Report</h3>
                  <p className="text-xs text-slate-400">Directly alerts rescue coordinators & dispatch teams</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Disaster / Calamity Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Flash Flood">Flash Flood / Waterlogging</option>
                  <option value="Cyclone Damage">Severe Cyclone / Gale Winds</option>
                  <option value="Landslide">Landslide / Mudflow</option>
                  <option value="Building Collapse">Building Collapse / Structural Failure</option>
                  <option value="Fire Outbreak">Fire Outbreak</option>
                  <option value="Earthquake Tremors">Earthquake Damage</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Severity Level</label>
                  <select
                    value={reportSeverity}
                    onChange={(e) => setReportSeverity(e.target.value as "Critical" | "High" | "Moderate")}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Critical">Critical (Life Threatened)</option>
                    <option value="High">High (Immediate Aid Needed)</option>
                    <option value="Moderate">Moderate (Assistance Needed)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Stranded People Count</label>
                  <input
                    type="number"
                    min="1"
                    value={reportPeople}
                    onChange={(e) => setReportPeople(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Exact Location & Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near St. Mary Church, Main Market 3rd Cross"
                  value={reportLocation}
                  onChange={(e) => setReportLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Immediate Needs Required</label>
                <div className="flex flex-wrap gap-2">
                  {["Boat Rescue", "Medical Aid", "Drinking Water", "Dry Food", "Shelter Evac", "Power/Generator"].map(
                    (need) => (
                      <button
                        type="button"
                        key={need}
                        onClick={() => toggleNeed(need)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition border ${
                          selectedNeeds.includes(need)
                            ? "bg-red-600 border-red-500 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {need}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={reportContact}
                  onChange={(e) => setReportContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Situation Details</label>
                <textarea
                  rows={3}
                  placeholder="Provide any critical info: trapped children, water level height, road blockage..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Rescue Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
