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
  CheckSquare,
  Square,
  Send,
  UserCheck,
  Droplets,
  Radio,
  Navigation,
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
    timestamp: "12m ago",
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
    timestamp: "35m ago",
    details: "Fallen banyan trees blocking ambulance access. Power cables severed across roadway.",
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
    timestamp: "1h ago",
    details: "Mudslide covering 200m of road, 3 transport buses trapped safely on high ground.",
  },
];

const SHELTERS: Shelter[] = [
  {
    id: "SH-101",
    name: "St. Jude Central Community Hall",
    location: "Sector 12, Main Market District",
    capacity: 500,
    occupied: 320,
    status: "Open",
    amenities: ["Clean Water", "Medical Unit", "Beds", "Hot Meals", "Generator"],
    contact: "+91 91234 56780",
    officer: "Insp. R. Verma",
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
    amenities: ["Food & Water", "Basic Medical", "Power Supply"],
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
    message: "Evacuated safely to St. Jude shelter. We have food, dry clothes, and clean water.",
    timestamp: "18m ago",
  },
  {
    id: "S-2",
    name: "Karthik Narayanan",
    location: "Highland Heights Apt 4B",
    status: "Safe",
    message: "Building is elevated and structurally safe. Power is out but 20L water is stored.",
    timestamp: "45m ago",
  },
  {
    id: "S-3",
    name: "Sunil & Deepa Mehta",
    location: "Coastline Enclave",
    status: "Relocated",
    message: "Moved to relative's residence in Central district before storm made landfall.",
    timestamp: "2h ago",
  },
];

const EMERGENCY_CONTACTS = [
  { name: "National Emergency", number: "112", role: "Police & Unified Rescue", badge: "24/7 Priority" },
  { name: "NDMA Disaster Control", number: "1078", role: "Disaster Headquarters", badge: "Direct Line" },
  { name: "Ambulance & Medical", number: "108", role: "Trauma & Life Support", badge: "Paramedic" },
  { name: "Fire & Rescue Service", number: "101", role: "Flood & Fire Rescue", badge: "Rescue Squad" },
  { name: "State Relief Cell", number: "1070", role: "Regional Operations", badge: "Command" },
  { name: "Women & Child Helpline", number: "1091", role: "Vulnerable Protection", badge: "Support" },
];

export default function DisasterManagementPage() {
  // State
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [safetyList, setSafetyList] = useState<SafetyCheckIn[]>(INITIAL_SAFETY);
  const [shelterSearch, setShelterSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"incidents" | "shelters" | "checkin">("incidents");
  const [incidentFilter, setIncidentFilter] = useState("all");
  const [protocolTab, setProtocolTab] = useState<"flood" | "cyclone" | "earthquake">("flood");

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("Flash Flood");
  const [reportSeverity, setReportSeverity] = useState<"Critical" | "High" | "Moderate">("Critical");
  const [reportLocation, setReportLocation] = useState("");
  const [reportPeople, setReportPeople] = useState("1");
  const [reportContact, setReportContact] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["Medical Aid", "Boat Rescue"]);

  // Safety Check-In State
  const [safeName, setSafeName] = useState("");
  const [safeLocation, setSafeLocation] = useState("");
  const [safeStatus, setSafeStatus] = useState<"Safe" | "At Shelter" | "Relocated">("Safe");
  const [safeMessage, setSafeMessage] = useState("");

  // Preparedness Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    water: true,
    food: true,
    firstaid: true,
    flashlight: true,
    powerbank: false,
    documents: false,
    medicines: false,
    whistle: false,
  });

  // Load from localStorage asynchronously
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
      // Fallback
    }
  }, []);

  // Handlers
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportLocation.trim() || !reportContact.trim()) return;

    const newInc: Incident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      type: reportType,
      severity: reportSeverity,
      location: reportLocation.trim(),
      peopleCount: parseInt(reportPeople) || 1,
      needs: selectedNeeds.length > 0 ? selectedNeeds : ["Immediate Rescue"],
      status: "Reported",
      contact: reportContact.trim(),
      timestamp: "Just now",
      details: reportDetails.trim() || "Immediate emergency dispatch required.",
    };

    const updated = [newInc, ...incidents];
    setIncidents(updated);
    try {
      localStorage.setItem("dm_incidents", JSON.stringify(updated));
    } catch {}

    setReportLocation("");
    setReportContact("");
    setReportDetails("");
    setShowReportModal(false);
  };

  const toggleNeed = (need: string) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

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

  const filteredIncidents = incidents.filter((i) => {
    if (incidentFilter === "critical") return i.severity === "Critical";
    if (incidentFilter === "in_progress") return i.status === "In Progress" || i.status === "Team Dispatched";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. IMMERSIVE LIGHT HERO & RADAR SECTION */}
      <section id="alerts" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        {/* Left Side: Headline & Mission Brief (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e6f7f5] border border-[#8eccc4]/50 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#8eccc4] animate-ping"></span>
            <span className="text-[#165b52] tracking-wide font-mono text-[11px] uppercase font-bold">
              Live Threat Advisory &bull; Level 3 Active
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2c3e50] tracking-tight leading-[1.15]">
              Integrated Disaster Response &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2c3e50] via-[#1b7f74] to-[#8eccc4]">Crisis Command</span>
            </h1>
            <p className="text-sm md:text-base text-[#566573] leading-relaxed font-normal max-w-2xl">
              Real-time threat telemetry, citizen distress dispatch, and verified shelter allocations. Coordinating emergency rescue teams across flood, cyclone, and landslide affected sectors.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8eccc4] to-[#7ac2b9] text-[#0f2d29] font-black text-sm transition shadow-lg shadow-[#8eccc4]/25 hover:brightness-105 active:scale-95 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Report Distress / Request Rescue
            </button>
            <a
              href="#shelters"
              onClick={() => setActiveTab("shelters")}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#ebebfa] text-[#2c3e50] font-bold text-sm transition border border-[#2c3e50]/20 shadow-xs flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Locate Safe Shelters
            </a>
          </div>

          {/* Borderless Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#2c3e50]/15">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#2c3e50] font-mono tracking-tight">4</p>
              <p className="text-[11px] font-bold text-[#6c7a89] uppercase tracking-wider mt-0.5">Open Shelters</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#178275] font-mono tracking-tight">1,705</p>
              <p className="text-[11px] font-bold text-[#6c7a89] uppercase tracking-wider mt-0.5">Citizens Safe</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#2c3e50] font-mono tracking-tight">18</p>
              <p className="text-[11px] font-bold text-[#6c7a89] uppercase tracking-wider mt-0.5">NDRF Units</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#2c3e50] font-mono tracking-tight">{incidents.length}</p>
              <p className="text-[11px] font-bold text-[#6c7a89] uppercase tracking-wider mt-0.5">Live Dispatches</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Live Radar & Telemetry Display (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl border border-[#2c3e50]/10 bg-white p-6 shadow-xl shadow-slate-900/5 tactical-grid overflow-hidden">
            {/* Radar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2c3e50]/10">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#8eccc4] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-[#2c3e50]">Live Meteorological Radar</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ebebfa] text-[#2c3e50] border border-[#8eccc4]/40">
                SWEEP 04-B
              </span>
            </div>

            {/* Radar Screen (Clean High-Tech Tactical Display) */}
            <div className="relative h-56 w-full flex items-center justify-center my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#ebebfa] via-[#e2e7f7] to-[#d9e1f5] border border-[#8eccc4]/40 shadow-inner">
              {/* Concentric Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-[#2c3e50]/20"></div>
              <div className="absolute w-32 h-32 rounded-full border border-[#2c3e50]/30"></div>
              <div className="absolute w-20 h-20 rounded-full border border-[#2c3e50]/40"></div>
              <div className="absolute w-full h-[1px] bg-[#2c3e50]/15"></div>
              <div className="absolute h-full w-[1px] bg-[#2c3e50]/15"></div>

              {/* Sweep Line */}
              <div className="absolute w-44 h-44 rounded-full origin-center animate-radar pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-[#8eccc4]/40"></div>

              {/* Pulsating Incident Markers on Radar */}
              <div className="absolute top-12 left-16 flex items-center gap-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span className="text-[9px] font-mono font-bold text-amber-900 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-amber-300">
                  Sector 4: Flood
                </span>
              </div>

              <div className="absolute bottom-12 right-14 flex items-center gap-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8eccc4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#178275]"></span>
                </span>
                <span className="text-[9px] font-mono font-bold text-[#2c3e50] bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-[#8eccc4]">
                  KM 42: Gale
                </span>
              </div>

              <div className="absolute top-20 right-20 flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] font-mono font-bold text-emerald-800 bg-white/95 px-1.5 py-0.5 rounded shadow-xs border border-emerald-400">
                  St. Jude: Shelter Open
                </span>
              </div>
            </div>

            {/* Radar Sensor Strip */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#2c3e50]/10 text-center font-mono">
              <div className="p-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/10">
                <span className="text-[9px] text-[#566573] font-bold flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-[#178275]" /> Winds
                </span>
                <p className="text-xs font-black text-[#2c3e50] mt-0.5">124 km/h</p>
              </div>
              <div className="p-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/10">
                <span className="text-[9px] text-[#566573] font-bold flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3 text-[#2c3e50]" /> Rain
                </span>
                <p className="text-xs font-black text-[#2c3e50] mt-0.5">225 mm</p>
              </div>
              <div className="p-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/10">
                <span className="text-[9px] text-[#566573] font-bold flex items-center justify-center gap-1">
                  <Waves className="w-3 h-3 text-amber-600" /> Inflow
                </span>
                <p className="text-xs font-black text-amber-800 mt-0.5">5.2m Breach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMERGENCY SPEED-DIAL HOTLINES */}
      <section id="hotlines" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#8eccc4]" />
            <h2 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider">
              Emergency Direct-Dial Dispatch Network
            </h2>
          </div>
          <span className="text-xs text-[#6c7a89] font-mono">Toll-free 24/7 dedicated lines</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number}`}
              className="group relative p-4 rounded-2xl bg-white hover:bg-[#f8faff] border border-[#2c3e50]/10 hover:border-[#8eccc4] transition-all shadow-xs hover:shadow-md hover:shadow-[#8eccc4]/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ebebfa] text-[#2c3e50] border border-[#8eccc4]/30">
                    {c.badge}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#e6f7f5] flex items-center justify-center text-[#165b52] group-hover:rotate-12 transition-transform">
                    <PhoneCall className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-2xl font-black text-[#2c3e50] group-hover:text-[#178275] font-mono tracking-tight mt-2 transition">
                  {c.number}
                </p>
                <p className="text-[11px] font-bold text-[#2c3e50] transition mt-0.5 truncate">
                  {c.name}
                </p>
              </div>
              <p className="text-[9px] text-[#6c7a89] mt-2 truncate">
                {c.role}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. MAIN DASHBOARD: 2-COLUMN WORKSPACE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Operations Center (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Segmented Module Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-[#ebebfa] border border-[#2c3e50]/10">
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab("incidents")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "incidents"
                    ? "bg-white text-[#2c3e50] shadow-xs font-black"
                    : "text-[#566573] hover:text-[#2c3e50] hover:bg-white/60"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#8eccc4]" />
                Distress Rescue Feed ({incidents.length})
              </button>
              <button
                onClick={() => setActiveTab("shelters")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "shelters"
                    ? "bg-white text-[#2c3e50] shadow-xs font-black"
                    : "text-[#566573] hover:text-[#2c3e50] hover:bg-white/60"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#2c3e50]" />
                Relief Camps ({SHELTERS.length})
              </button>
              <button
                onClick={() => setActiveTab("checkin")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "checkin"
                    ? "bg-white text-[#2c3e50] shadow-xs font-black"
                    : "text-[#566573] hover:text-[#2c3e50] hover:bg-white/60"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#178275]" />
                &quot;I am Safe&quot; Registry ({safetyList.length})
              </button>
            </div>

            <button
              onClick={() => setShowReportModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#8eccc4] hover:bg-[#7ac2b9] text-[#0f2d29] text-xs font-bold border border-[#8eccc4]/50 flex items-center gap-1.5 transition ml-auto shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#0f2d29]" />
              + Report Incident
            </button>
          </div>

          {/* VIEW 1: INCIDENTS FEED */}
          {activeTab === "incidents" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider">Live Distress Calls</h3>
                  <p className="text-xs text-[#566573]">Transmitted from ground field teams &amp; stranded citizens</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <button
                    onClick={() => setIncidentFilter("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      incidentFilter === "all" ? "bg-[#2c3e50] text-white" : "text-[#566573] hover:text-[#2c3e50]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setIncidentFilter("critical")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      incidentFilter === "critical" ? "bg-rose-50 text-rose-800 border border-rose-200" : "text-[#566573] hover:text-[#2c3e50]"
                    }`}
                  >
                    Critical
                  </button>
                  <button
                    onClick={() => setIncidentFilter("in_progress")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      incidentFilter === "in_progress" ? "bg-[#e6f7f5] text-[#165b52] border border-[#8eccc4]/50" : "text-[#566573] hover:text-[#2c3e50]"
                    }`}
                  >
                    In Action
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-5 rounded-2xl bg-white border border-[#2c3e50]/10 hover:border-[#8eccc4]/60 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#6c7a89] font-bold">{inc.id} &bull; {inc.timestamp}</span>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            inc.severity === "Critical"
                              ? "bg-rose-50 text-rose-800 border border-rose-200"
                              : inc.severity === "High"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-[#ebebfa] text-[#2c3e50] border border-[#8eccc4]/30"
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-[#2c3e50] flex items-center gap-2">
                          {inc.type === "Flash Flood" ? <Waves className="w-4 h-4 text-blue-600" /> : null}
                          {inc.type === "Cyclone Damage" ? <Wind className="w-4 h-4 text-amber-600" /> : null}
                          {inc.type === "Landslide" ? <Flame className="w-4 h-4 text-[#2c3e50]" /> : null}
                          {inc.type}
                        </h4>
                        <p className="text-xs text-[#566573] font-medium flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-[#8eccc4] shrink-0" />
                          {inc.location}
                        </p>
                      </div>

                      <p className="text-xs text-[#2c3e50] leading-relaxed bg-[#f4f6fc] p-3 rounded-xl border border-[#2c3e50]/10">
                        {inc.details}
                      </p>

                      <div>
                        <p className="text-[9px] uppercase font-bold text-[#6c7a89] tracking-wider mb-1.5">Required Aid</p>
                        <div className="flex flex-wrap gap-1">
                          {inc.needs.map((n) => (
                            <span key={n} className="text-[10px] px-2 py-0.5 rounded-md bg-[#ebebfa] text-[#2c3e50] border border-[#8eccc4]/30 font-semibold">
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#2c3e50]/10 flex items-center justify-between text-xs">
                      <span className="text-[#566573] text-[11px]">
                        Stranded: <strong className="text-[#2c3e50] font-mono">{inc.peopleCount} individuals</strong>
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide ${
                          inc.status === "Team Dispatched"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : inc.status === "In Progress"
                            ? "bg-[#e6f7f5] text-[#165b52] border border-[#8eccc4]/50"
                            : "bg-[#ebebfa] text-[#566573]"
                        }`}
                      >
                        {inc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 2: SHELTERS */}
          {activeTab === "shelters" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider">Evacuation Camps &amp; Safe Shelters</h3>
                  <p className="text-xs text-[#566573]">Food rations, purified water, medical triage &amp; sleeping beds</p>
                </div>
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-[#566573] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={shelterSearch}
                    onChange={(e) => setShelterSearch(e.target.value)}
                    placeholder="Search shelter..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#2c3e50]/15 text-xs text-[#2c3e50] placeholder-[#6c7a89] focus:outline-none focus:border-[#8eccc4] shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredShelters.map((sh) => {
                  const occupancyPct = Math.round((sh.occupied / sh.capacity) * 100);
                  return (
                    <div
                      key={sh.id}
                      className="p-5 rounded-2xl bg-white border border-[#2c3e50]/10 hover:border-[#8eccc4]/60 transition-all shadow-xs hover:shadow-md space-y-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-[#6c7a89]">{sh.id}</span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                sh.status === "Open"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : sh.status === "Near Capacity"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-rose-50 text-rose-800 border border-rose-200"
                              }`}
                            >
                              {sh.status}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-[#2c3e50] mt-1">{sh.name}</h4>
                          <p className="text-xs text-[#566573] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#8eccc4]" />
                            {sh.location}
                          </p>
                        </div>
                        <a
                          href={`tel:${sh.contact}`}
                          className="p-2.5 rounded-xl bg-[#ebebfa] hover:bg-[#2c3e50] text-[#2c3e50] hover:text-[#8eccc4] transition shrink-0 border border-[#2c3e50]/10"
                          title="Call Officer"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Occupancy Indicator */}
                      <div>
                        <div className="flex justify-between text-[11px] text-[#566573] mb-1">
                          <span>Occupancy: <strong className="text-[#2c3e50] font-mono">{sh.occupied}</strong> / {sh.capacity} beds</span>
                          <span className="font-mono font-bold text-[#178275]">{occupancyPct}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#ebebfa] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#8eccc4] via-[#178275] to-[#2c3e50]"
                            style={{ width: `${occupancyPct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Available Amenities */}
                      <div className="flex flex-wrap gap-1">
                        {sh.amenities.map((a) => (
                          <span key={a} className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4f6fc] text-[#2c3e50] border border-[#2c3e50]/10 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            {a}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2.5 border-t border-[#2c3e50]/10 flex items-center justify-between text-[11px] text-[#6c7a89]">
                        <span>Supervisor: <strong className="text-[#2c3e50]">{sh.officer}</strong></span>
                        <a href={`tel:${sh.contact}`} className="text-[#178275] font-mono font-bold hover:underline">
                          {sh.contact}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: "I AM SAFE" REGISTRY */}
          {activeTab === "checkin" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left: Check-In Form (5 Cols) */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-[#2c3e50]/10 space-y-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider">Citizen Safety Check-In</h3>
                  <p className="text-xs text-[#566573] mt-0.5">Let loved ones and responders know you are safe.</p>
                </div>

                <form onSubmit={handleSafetySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Your Name / Group</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram &amp; family (4)"
                      value={safeName}
                      onChange={(e) => setSafeName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Current Sector / Landmark</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sector 14, Riverside"
                      value={safeLocation}
                      onChange={(e) => setSafeLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Current Status</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["Safe", "At Shelter", "Relocated"] as const).map((st) => (
                        <button
                          type="button"
                          key={st}
                          onClick={() => setSafeStatus(st)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                            safeStatus === st
                              ? "bg-[#2c3e50] text-white shadow-xs"
                              : "bg-[#ebebfa] text-[#566573] hover:bg-[#dfe0f5] border border-[#2c3e50]/10"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Message / Condition</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. We have dry clothes and phone battery is at 40%."
                      value={safeMessage}
                      onChange={(e) => setSafeMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8eccc4] to-[#7ac2b9] text-[#0f2d29] text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-[#8eccc4]/20 hover:brightness-105 active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Register My Status
                  </button>
                </form>
              </div>

              {/* Right: Live Safety Registry Feed (7 Cols) */}
              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider">Live Citizen Safety Stream</h3>
                  <span className="text-xs text-[#6c7a89] font-mono">{safetyList.length} Verified Check-Ins</span>
                </div>

                <div className="space-y-2.5">
                  {safetyList.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#2c3e50]/10 shadow-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2c3e50] text-xs">{s.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {s.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#566573] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8eccc4]" /> {s.location} &bull; <span className="text-[#6c7a89] font-mono">{s.timestamp}</span>
                      </p>
                      <p className="text-xs text-[#2c3e50] bg-[#f4f6fc] p-2.5 rounded-xl border border-[#2c3e50]/10">
                        &ldquo;{s.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Tactical Sidebar & Readiness (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 72-Hour Survival Kit Widget */}
          <div className="p-6 rounded-3xl bg-white border border-[#2c3e50]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#8eccc4]" />
                  72-Hour Survival Go-Bag
                </h3>
                <p className="text-xs text-[#566573]">Check off packed supplies</p>
              </div>
              <span className="text-lg font-black text-[#2c3e50] font-mono">{checklistPercentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#ebebfa] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8eccc4] to-[#2c3e50] transition-all duration-300"
                style={{ width: `${checklistPercentage}%` }}
              ></div>
            </div>

            <div className="space-y-1.5 pt-1">
              {[
                { key: "water", label: "Clean Water (3L per person per day)" },
                { key: "food", label: "Ready-to-eat non-perishable rations" },
                { key: "firstaid", label: "First Aid Kit & Bandages" },
                { key: "flashlight", label: "Waterproof Torch with extra cells" },
                { key: "powerbank", label: "Charged Power Bank & cables" },
                { key: "documents", label: "ID cards, insurance & deeds in plastic" },
                { key: "medicines", label: "Essential prescription meds (7 days)" },
                { key: "whistle", label: "Signaling whistle & mirror" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => toggleChecklist(item.key)}
                  className={`w-full p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 text-xs ${
                    checkedItems[item.key]
                      ? "bg-[#e6f7f5] border-[#8eccc4]/50 text-[#165b52] font-medium"
                      : "bg-[#f4f6fc] border-[#2c3e50]/10 text-[#566573] hover:bg-[#ebebfa]"
                  }`}
                >
                  {checkedItems[item.key] ? (
                    <CheckSquare className="w-3.5 h-3.5 text-[#178275] shrink-0" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-[#6c7a89] shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calamity Protocols Card */}
          <div id="preparedness" className="p-6 rounded-3xl bg-white border border-[#2c3e50]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2c3e50] uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#8eccc4]" />
                Emergency Action Protocols
              </h3>
            </div>

            {/* Protocol Switcher */}
            <div className="flex rounded-xl bg-[#ebebfa] p-1 border border-[#2c3e50]/10 text-[11px] font-bold">
              <button
                onClick={() => setProtocolTab("flood")}
                className={`flex-1 py-1 rounded-lg transition ${
                  protocolTab === "flood" ? "bg-white text-[#2c3e50] shadow-xs" : "text-[#566573]"
                }`}
              >
                Flood
              </button>
              <button
                onClick={() => setProtocolTab("cyclone")}
                className={`flex-1 py-1 rounded-lg transition ${
                  protocolTab === "cyclone" ? "bg-white text-[#2c3e50] shadow-xs" : "text-[#566573]"
                }`}
              >
                Cyclone
              </button>
              <button
                onClick={() => setProtocolTab("earthquake")}
                className={`flex-1 py-1 rounded-lg transition ${
                  protocolTab === "earthquake" ? "bg-white text-[#2c3e50] shadow-xs" : "text-[#566573]"
                }`}
              >
                Earthquake
              </button>
            </div>

            {/* Protocol Content */}
            <div className="space-y-2 text-xs">
              {protocolTab === "flood" && (
                <ul className="space-y-2 text-[#2c3e50]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Switch off primary electrical circuit breaker and gas cylinder valves before evacuating.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Retreat to highest floor or designated relief campsite if ground level rises.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Never walk or drive through moving water — 6 inches can knock an adult down.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Never consume tap or floodwater without boiling or chlorine purification.
                  </li>
                </ul>
              )}

              {protocolTab === "cyclone" && (
                <ul className="space-y-2 text-[#2c3e50]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Fasten loose tin roofing sheets and secure outdoor equipment that can become airborne.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Shelter inside an interior windowless room or hallway during maximum eye-wall winds.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Do not step outside when winds subside — the eye is brief and the reverse wall follows.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Avoid trees, metal poles, and downed power infrastructure due to live backfeed risk.
                  </li>
                </ul>
              )}

              {protocolTab === "earthquake" && (
                <ul className="space-y-2 text-[#2c3e50]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Drop, Cover, and Hold on under sturdy furniture until shaking stops.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-black text-[10px] uppercase">DO:</span> Use stairs instead of elevators if evacuating a multi-story building.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Do not run outside while shaking is actively occurring due to falling glass.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-black text-[10px] uppercase">DON&apos;T:</span> Do not light matches or candles in case of undetected gas leaks.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODAL: REPORT DISTRESS INCIDENT */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-[#2c3e50]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#8eccc4]/40 rounded-3xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c3e50]/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#e6f7f5] text-[#165b52] border border-[#8eccc4]/30">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2c3e50]">Transmit Emergency Rescue Request</h3>
                  <p className="text-[11px] text-[#566573]">Relayed immediately to NDRF Command and District Control</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-[#566573] hover:text-[#2c3e50] text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Calamity / Incident Category</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                >
                  <option value="Flash Flood">Flash Flood / Rising Water Level</option>
                  <option value="Cyclone Damage">Cyclone Damage / Destructive Winds</option>
                  <option value="Landslide">Landslide / Mudflow Road Blockage</option>
                  <option value="Building Collapse">Building Structural Damage / Collapse</option>
                  <option value="Fire Outbreak">Fire Outbreak</option>
                  <option value="Earthquake Tremors">Earthquake Structural Tremors</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Severity Priority</label>
                  <select
                    value={reportSeverity}
                    onChange={(e) => setReportSeverity(e.target.value as "Critical" | "High" | "Moderate")}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                  >
                    <option value="Critical">Critical (Immediate Life Danger)</option>
                    <option value="High">High (Medical / Supply Needed)</option>
                    <option value="Moderate">Moderate (Assistance Needed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Trapped Citizens Count</label>
                  <input
                    type="number"
                    min="1"
                    value={reportPeople}
                    onChange={(e) => setReportPeople(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Precise Location &amp; Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 4, Riverside Lowlands near St. Jude Church"
                  value={reportLocation}
                  onChange={(e) => setReportLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Immediate Required Aid</label>
                <div className="flex flex-wrap gap-1.5">
                  {["Boat Rescue", "Medical Aid", "Drinking Water", "Dry Food", "Shelter Evac", "Power Generator"].map(
                    (need) => (
                      <button
                        type="button"
                        key={need}
                        onClick={() => toggleNeed(need)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition border ${
                          selectedNeeds.includes(need)
                            ? "bg-[#2c3e50] text-white border-transparent"
                            : "bg-[#f4f6fc] border-[#2c3e50]/15 text-[#566573] hover:bg-[#ebebfa]"
                        }`}
                      >
                        {need}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98451 22310"
                  value={reportContact}
                  onChange={(e) => setReportContact(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2c3e50] mb-1">Situation Brief &amp; Condition</label>
                <textarea
                  rows={2}
                  placeholder="Water level height, injured people, accessible entry points..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f4f6fc] border border-[#2c3e50]/15 text-[#2c3e50] focus:outline-none focus:border-[#8eccc4]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#2c3e50]/10">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#ebebfa] hover:bg-[#dfe0f5] text-[#2c3e50] font-bold border border-[#2c3e50]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8eccc4] to-[#7ac2b9] text-[#0f2d29] font-black flex items-center gap-1.5 shadow-md shadow-[#8eccc4]/20 hover:brightness-105"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Rescue Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
