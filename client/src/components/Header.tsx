import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const ASG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/asg-logo-transparent_a5b0f8c9.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/about", label: "About" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-md"
      style={{ backgroundColor: "#FFFFFF" }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" aria-label="Adapt Services Group — Home">
            <img
              src={ASG_LOGO}
              alt="Adapt Services Group"
              className="h-10 lg:h-14 w-auto object-contain"
              width={160}
              height={56}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location === link.href
                    ? "text-asg-navy bg-gray-100"
                    : "text-gray-600 hover:text-asg-navy hover:bg-gray-100"
                }`}
                aria-current={location === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: phone + Emergency CTA */}
          <div className="flex items-center gap-3">
            {/* Phone number — desktop only */}
            <a
              href="tel:01233564666"
              className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-asg-navy text-sm font-medium transition-colors"
              aria-label="Call us on 01233 564666"
            >
              <Phone size={16} aria-hidden="true" />
              01233 564666
            </a>

            {/* Emergency 24/7 CTA — always visible */}
            <Link
              href="/emergency"
              className="flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--asg-red)",
                minHeight: "44px",
              }}
              aria-label="Emergency 24/7 — Report an emergency"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Emergency 24/7
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-asg-navy hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gray-200"
          style={{ backgroundColor: "#FFFFFF" }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  location === link.href
                    ? "text-asg-navy bg-gray-100"
                    : "text-gray-600 hover:text-asg-navy hover:bg-gray-100"
                }`}
                onClick={() => setMobileOpen(false)}
                aria-current={location === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:01233564666"
              className="flex items-center gap-2 px-3 py-3 text-gray-600 hover:text-asg-navy text-base font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Phone size={18} aria-hidden="true" />
              01233 564666
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
