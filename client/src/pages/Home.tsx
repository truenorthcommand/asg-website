import { Link } from "wouter";
import {
  Wrench, Zap, Hammer, Paintbrush, Home as HomeIcon,
  Building2, Hotel, ShoppingBag, CheckCircle2, ArrowRight,
  Clock, Shield, Users, Star
} from "lucide-react";

const services = [
  { icon: Wrench, title: "Plumbing & Heating", desc: "Burst pipes, boiler breakdowns, full system installs." },
  { icon: Zap, title: "Electrical Works", desc: "EICR testing, rewires, consumer units, fault finding." },
  { icon: Hammer, title: "Carpentry & Joinery", desc: "Door repairs, fitted furniture, structural carpentry." },
  { icon: Paintbrush, title: "Painting & Decorating", desc: "Interior and exterior, commercial and residential." },
  { icon: HomeIcon, title: "Roofing & Guttering", desc: "Leak repairs, full re-roofs, gutter clearance." },
  { icon: Building2, title: "Refurbishment", desc: "Full property refurbs, fit-outs, and renovations." },
];

const sectors = [
  { icon: Building2, title: "Letting Agents", desc: "Rapid response to tenant issues. Compliance-ready reports. Trusted by agents across Kent and the South East." },
  { icon: HomeIcon, title: "Block Managers", desc: "Planned maintenance programmes and reactive works for residential blocks and estates." },
  { icon: Hotel, title: "Hospitality", desc: "Minimal disruption, out-of-hours scheduling, and fast turnaround for hotels and venues." },
  { icon: ShoppingBag, title: "Commercial", desc: "Office fit-outs, retail maintenance, and multi-site contracts for commercial property owners." },
];

const stats = [
  { value: "24/7", label: "Emergency Response" },
  { value: "100%", label: "In-House Team" },
  { value: "10+", label: "Trades Covered" },
  { value: "Kent", label: "& South East" },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero Image Section — Full Width, No Overlay */}
      <section className="relative overflow-hidden h-96 lg:h-[500px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/asg-hero-aerial-kent-ivGFeyhw49mx3GUo93ZNHw.webp"
          alt="Aerial view of residential properties in Kent"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </section>

      {/* Hero Content Section — Below the Image */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#FFFFFF" }}
        aria-labelledby="hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              style={{ backgroundColor: "rgba(46,139,87,0.2)", color: "var(--asg-green-light)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              Available 24/7 — Emergency Response
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-asg-navy leading-tight mb-6"
            >
              The New Industry Standard in{" "}
              <span style={{ color: "var(--asg-green-light)" }}>
                Property Maintenance
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl">
              Adapt Services Group delivers professional property maintenance and emergency response across Kent and the South East. 100% in-house team. No subcontractors. No excuses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/emergency"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
                style={{ backgroundColor: "var(--asg-red)", minHeight: "52px" }}
                aria-label="Report an emergency — 24/7 response"
              >
                Report an Emergency
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-200"
                style={{ minHeight: "52px" }}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section
        className="py-8"
        style={{ backgroundColor: "#22303b" }}
        aria-label="Key statistics"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-black text-white">{stat.value}</div>
                <div className="text-sm font-medium text-green-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ASG Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="why-asg-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="why-asg-heading" className="text-3xl lg:text-4xl font-black mb-4" style={{ color: "var(--asg-navy)" }}>
              Why Choose Adapt Services Group?
            </h2>
            <p className="text-gray-600 text-lg">
              We built ASG to solve the problems that plague the property maintenance industry — slow response, unreliable contractors, and poor communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "24/7 Emergency Response", desc: "Round-the-clock availability for genuine emergencies. We answer when others don't." },
              { icon: Shield, title: "100% In-House Team", desc: "Every operative is directly employed. No subcontractors. Full accountability." },
              { icon: Users, title: "Dedicated Account Management", desc: "One point of contact for every job. Clear communication from instruction to completion." },
              { icon: Star, title: "Compliance-Ready Reporting", desc: "Detailed job reports, photos, and certificates delivered automatically." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                  aria-hidden="true"
                >
                  <item.icon size={24} style={{ color: "var(--asg-green)" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--asg-navy)" }}>{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "var(--asg-grey)" }}
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
            <div>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-black" style={{ color: "var(--asg-navy)" }}>
                Our Services
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Ten trades. One team. Complete property coverage.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-sm transition-colors"
              style={{ color: "var(--asg-green)" }}
            >
              View all services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                  aria-hidden="true"
                >
                  <service.icon size={24} style={{ color: "var(--asg-green)" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--asg-navy)" }}>{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="sectors-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="sectors-heading" className="text-3xl lg:text-4xl font-black mb-4" style={{ color: "var(--asg-navy)" }}>
              Sectors We Serve
            </h2>
            <p className="text-gray-600 text-lg">
              Specialist knowledge for every property type and management structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <div
                key={sector.title}
                className="rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: "var(--asg-grey)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--asg-green)" }}
                    aria-hidden="true"
                  >
                    <sector.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "var(--asg-navy)" }}>{sector.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{sector.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/sectors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
              style={{ backgroundColor: "var(--asg-green)", minHeight: "52px" }}
            >
              Explore Our Sectors <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#22303b" }}
        aria-labelledby="cta-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Work with a Team You Can Trust?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Whether it's a planned maintenance programme or an emergency call-out, ASG delivers. Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
              style={{ backgroundColor: "var(--asg-green)", minHeight: "52px" }}
            >
              Get a Quote
            </Link>
            <Link
              href="/emergency"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
              style={{ backgroundColor: "var(--asg-red)", minHeight: "52px" }}
            >
              Emergency 24/7
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Or call us directly:{" "}
            <a href="tel:01233564666" className="text-white font-semibold hover:text-gray-200 transition-colors">
              01233 564666
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
