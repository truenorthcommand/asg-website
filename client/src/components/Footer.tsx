import { Link } from "wouter";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const ASG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393258417/gVGt3GVaioQVft9gFJLtBK/asg-logo-transparent_a5b0f8c9.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-gray-700"
      style={{ backgroundColor: "#FFFFFF" }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Adapt Services Group — Home">
              <img
                src={ASG_LOGO}
                alt="Adapt Services Group"
                className="h-14 w-auto object-contain mb-4"
                width={140}
                height={56}
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The new industry standard in property maintenance and emergency response. 100% in-house team. Available 24/7.
            </p>
            <a
              href="/emergency"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold text-white text-sm transition-all duration-200"
              style={{ backgroundColor: "var(--asg-red)", minHeight: "44px" }}
              aria-label="Emergency 24/7 response"
            >
              Emergency 24/7
            </a>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-asg-navy font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2" role="list">
              {[
                "Plumbing & Heating",
                "Electrical Works",
                "Carpentry & Joinery",
                "Painting & Decorating",
                "Roofing & Guttering",
                "Groundworks",
                "Refurbishment",
                "Emergency Response",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-600 hover:text-asg-navy transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-asg-navy font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2" role="list">
              {[
                { href: "/about", label: "About ASG" },
                { href: "/sectors", label: "Sectors We Serve" },
                { href: "/how-we-work", label: "How We Work" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/blog", label: "Blog" },
                { href: "/resources", label: "Resources & FAQ" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-asg-navy transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-asg-navy font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href="tel:01233564666"
                  className="flex items-start gap-3 text-sm text-gray-600 hover:text-asg-navy transition-colors duration-200"
                  aria-label="Call us on 01233 564666"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <span>01233 564666</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@adaptservicesgroup.co.uk"
                  className="flex items-start gap-3 text-sm text-gray-600 hover:text-asg-navy transition-colors duration-200"
                  aria-label="Email info@adaptservicesgroup.co.uk"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <span>info@adaptservicesgroup.co.uk</span>
                </a>
              </li>
              <li>
                <address className="flex items-start gap-3 text-sm text-gray-600 not-italic">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <span>
                    Unit 2 Meadow View Industrial Estate,<br />
                    Ruckinge, Ashford,<br />
                    Kent, TN26 2NR
                  </span>
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>
                © {currentYear} Adapt Services Group Ltd. Company No. 17042975. All rights reserved.
              </span>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
                <span>·</span>
                <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
              </div>
            </div>

            {/* Mandatory attribution — hard requirement */}
            <div className="flex items-center gap-1.5 font-medium text-gray-600">
              <span>Powered By</span>
              <a
                href="https://truenorthos.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-asg-navy hover:text-asg-green transition-colors flex items-center gap-1"
                aria-label="TrueNorth Operations Group (opens in new tab)"
              >
                TrueNorth Operations Group
                <ExternalLink size={10} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
