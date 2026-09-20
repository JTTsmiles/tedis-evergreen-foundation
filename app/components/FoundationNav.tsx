"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FoundationNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="foundation-navigation-area">
        <header className="foundation-nav">
          <div className="foundation-nav-shell">
            {/* LOGO */}
            <Link
              href="/"
              className="foundation-logo"
              onClick={closeMenu}
              aria-label="TEDIS Evergreen Foundation home"
            >
              <Image
                src="/logo.jpeg"
                alt="TEDIS Evergreen Foundation"
                width={220}
                height={100}
                priority
                className="foundation-logo-image"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              className="foundation-desktop-menu"
              aria-label="Main navigation"
            >
              <Link
                href="/about"
                className="foundation-nav-link"
              >
                About
              </Link>

              <Link
                href="/impact"
                className="foundation-nav-link"
              >
                Impact
              </Link>

              <Link
                href="/supporters"
                className="foundation-nav-link"
              >
                Sponsors &amp; Supporters
              </Link>

              <Link
                href="/contact"
                className="foundation-nav-link"
              >
                Contact
              </Link>

              <Link
                href="/energy-view"
                className="foundation-network-button"
              >
                <span className="nav-live-signal">
                  <span className="nav-live-dot" />
                </span>

                <span className="nav-live-badge">
                  LIVE
                </span>

                <span className="nav-live-text">
                  Community Network
                </span>

                <span className="nav-live-arrow">
                  ↗
                </span>
              </Link>

              <Link
                href="/donate"
                className="foundation-donate-button"
              >
                Donate
              </Link>
            </nav>

            {/* MOBILE RIGHT-SIDE ACTIONS */}
            <div className="foundation-mobile-actions">
              <Link
                href="/energy-view"
                className="foundation-mobile-network"
                onClick={closeMenu}
                aria-label="View live community energy network"
              >
                <span className="mobile-network-signal">
                  <span className="mobile-live-dot" />
                </span>

                <span className="mobile-live-copy">
                  <strong>LIVE</strong>
                  <span>Community Network</span>
                </span>

                <span className="mobile-network-arrow">
                  ↗
                </span>
              </Link>

              <button
                type="button"
                className="foundation-menu-button"
                onClick={() =>
                  setMobileMenuOpen((open) => !open)
                }
                aria-label={
                  mobileMenuOpen
                    ? "Close menu"
                    : "Open menu"
                }
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? "×" : "☰"}
              </button>
            </div>

            {/* MOBILE DROPDOWN */}
            {mobileMenuOpen && (
              <nav
                className="foundation-mobile-menu"
                aria-label="Mobile navigation"
              >
                <Link
                  href="/"
                  onClick={closeMenu}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={closeMenu}
                >
                  About
                </Link>

                <Link
                  href="/impact"
                  onClick={closeMenu}
                >
                  Impact
                </Link>

                <Link
                  href="/supporters"
                  onClick={closeMenu}
                >
                  Sponsors &amp; Supporters
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMenu}
                >
                  Partner With Us
                </Link>

                <Link
                  href="/donate"
                  onClick={closeMenu}
                  className="mobile-donate-link"
                >
                  Donate
                </Link>
              </nav>
            )}
          </div>
        </header>
      </div>

      <style jsx global>{`
        /* =====================================================
           MAIN NAVBAR
        ===================================================== */

        .foundation-navigation-area {
          position: sticky;
          top: 0;
          z-index: 2000;

          width: 100%;

          background: #ffffff;
        }

        .foundation-nav {
          position: relative;

          width: 100%;

          margin: 0;

          padding: 8px 18px;

          background: #ffffff;

          border-bottom:
            1px solid rgba(16, 40, 31, 0.1);

          box-shadow:
            0 3px 12px rgba(16, 40, 31, 0.05);

          box-sizing: border-box;
        }

        .foundation-nav-shell {
          position: relative;

          width: min(1240px, 100%);
          min-height: 76px;

          margin: 0 auto;

          padding: 0 8px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        /* =====================================================
           LOGO
        ===================================================== */

        .foundation-logo {
          width: 185px;
          height: 62px;

          display: flex;
          align-items: center;

          flex-shrink: 0;

          text-decoration: none;
        }

        .foundation-logo-image {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: contain;
        }

        /* =====================================================
           DESKTOP NAVIGATION
        ===================================================== */

        .foundation-desktop-menu {
          display: flex;
          align-items: center;

          gap: 15px;
        }

        .foundation-nav-link,
        .foundation-nav-link:link,
        .foundation-nav-link:visited {
          position: relative;

          padding: 12px 0;

          color: #151515 !important;

          font-size: 13px;
          font-weight: 700;

          line-height: 1;

          white-space: nowrap;

          text-decoration: none !important;

          transition:
            color 180ms ease;
        }

        .foundation-nav-link:hover {
          color: #168147 !important;
        }

        .foundation-nav-link::after {
          content: "";

          position: absolute;

          left: 0;
          right: 0;
          bottom: 5px;

          height: 2px;

          border-radius: 999px;

          background: #168147;

          transform: scaleX(0);

          transform-origin: center;

          transition:
            transform 180ms ease;
        }

        .foundation-nav-link:hover::after {
          transform: scaleX(1);
        }

        /* =====================================================
           DESKTOP COMMUNITY NETWORK BUTTON
        ===================================================== */

        .foundation-network-button,
        .foundation-network-button:link,
        .foundation-network-button:visited {
          min-height: 44px;

          padding: 0 14px 0 11px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border:
            1px solid rgba(22, 129, 71, 0.22);

          border-radius: 999px;

          background: #f4faf6;

          color: #10281f !important;

          text-decoration: none !important;

          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .foundation-network-button:hover {
          transform: translateY(-2px);

          background: #eaf6ed;
        }

        .nav-live-signal {
          position: relative;

          width: 16px;
          height: 16px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .nav-live-signal::before {
          content: "";

          position: absolute;

          inset: 1px;

          border:
            1px solid rgba(22, 129, 71, 0.45);

          border-radius: 50%;

          animation:
            foundation-live-pulse
            1.5s ease-out infinite;
        }

        .nav-live-dot {
          position: relative;

          z-index: 2;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #168147;

          box-shadow:
            0 0 7px rgba(22, 129, 71, 0.6);

          animation:
            foundation-live-blink
            1s ease-in-out infinite;
        }

        .nav-live-badge {
          padding: 5px 7px;

          border-radius: 999px;

          background:
            rgba(22, 129, 71, 0.09);

          color: #168147 !important;

          font-size: 7px;
          font-weight: 950;

          letter-spacing: 0.12em;

          animation:
            foundation-live-text-blink
            1s ease-in-out infinite;
        }

        .nav-live-text {
          color: #10281f !important;

          font-size: 10px;
          font-weight: 800;

          white-space: nowrap;
        }

        .nav-live-arrow {
          color: #168147 !important;

          font-size: 14px;
        }

        /* =====================================================
           DONATE
        ===================================================== */

        .foundation-donate-button,
        .foundation-donate-button:link,
        .foundation-donate-button:visited {
          min-height: 43px;

          padding: 0 22px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 999px;

          background: #168147;

          color: #ffffff !important;

          font-size: 13px;
          font-weight: 800;

          white-space: nowrap;

          text-decoration: none !important;

          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .foundation-donate-button:hover {
          transform: translateY(-2px);

          background: #126f3d;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes foundation-live-pulse {
          0% {
            transform: scale(0.55);
            opacity: 0.9;
          }

          75% {
            transform: scale(1.7);
            opacity: 0;
          }

          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }

        @keyframes foundation-live-blink {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.25;
            transform: scale(0.85);
          }
        }

        @keyframes foundation-live-text-blink {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.45;
          }
        }

        /* =====================================================
           MOBILE DEFAULT
        ===================================================== */

        .foundation-mobile-actions {
          display: none;
        }

        .foundation-mobile-menu {
          display: none;
        }

        /* =====================================================
           TABLET / MOBILE NAVIGATION
        ===================================================== */

        @media (max-width: 1080px) {
          .foundation-desktop-menu {
            display: none;
          }

          .foundation-mobile-actions {
            display: flex;
            align-items: center;

            gap: 8px;

            margin-left: auto;
          }

          /*
            IMPORTANT:
            This button is always visible on mobile.
            It is separate from the hamburger menu.
          */

          .foundation-mobile-network,
          .foundation-mobile-network:link,
          .foundation-mobile-network:visited {
            min-height: 40px;

            padding: 0 12px;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            gap: 7px;

            border:
              1px solid rgba(22, 129, 71, 0.22);

            border-radius: 999px;

            background: #f4faf6;

            color: #10281f !important;

            text-decoration: none !important;

            flex-shrink: 0;
          }

          .mobile-network-signal {
            position: relative;

            width: 15px;
            height: 15px;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;
          }

          .mobile-network-signal::before {
            content: "";

            position: absolute;

            inset: 1px;

            border:
              1px solid rgba(22, 129, 71, 0.48);

            border-radius: 50%;

            animation:
              foundation-live-pulse
              1.5s ease-out infinite;
          }

          .mobile-live-dot {
            position: relative;

            z-index: 2;

            width: 7px;
            height: 7px;

            border-radius: 50%;

            background: #168147;

            box-shadow:
              0 0 7px rgba(22, 129, 71, 0.6);

            animation:
              foundation-live-blink
              1s ease-in-out infinite;
          }

          .mobile-live-copy {
            display: flex;
            flex-direction: column;

            gap: 1px;

            line-height: 1.05;
          }

          .mobile-live-copy strong {
            color: #168147 !important;

            font-size: 7px;
            font-weight: 950;

            letter-spacing: 0.12em;

            animation:
              foundation-live-text-blink
              1s ease-in-out infinite;
          }

          .mobile-live-copy span {
            color: #10281f !important;

            font-size: 9px;
            font-weight: 800;

            white-space: nowrap;
          }

          .mobile-network-arrow {
            color: #168147 !important;

            font-size: 13px;
          }

          .foundation-menu-button {
            width: 42px;
            height: 42px;

            padding: 0;

            display: grid;
            place-items: center;

            flex-shrink: 0;

            border:
              1px solid rgba(16, 40, 31, 0.12);

            border-radius: 50%;

            background: #f5f5f5;

            color: #151515 !important;

            font-size: 19px;

            cursor: pointer;
          }

          /* =================================================
             MOBILE DROPDOWN
          ================================================= */

          .foundation-mobile-menu {
            position: absolute;

            top: calc(100% + 8px);

            left: 0;
            right: 0;

            z-index: 2100;

            padding: 12px;

            display: grid;

            gap: 3px;

            border:
              1px solid rgba(16, 40, 31, 0.08);

            border-radius: 18px;

            background: #ffffff;

            box-shadow:
              0 22px 50px rgba(16, 40, 31, 0.16);
          }

          .foundation-mobile-menu a,
          .foundation-mobile-menu a:link,
          .foundation-mobile-menu a:visited {
            padding: 13px 15px;

            border-radius: 10px;

            color: #151515 !important;

            font-size: 14px;
            font-weight: 700;

            text-decoration: none !important;
          }

          .foundation-mobile-menu a:hover {
            background: #edf6ef;

            color: #168147 !important;
          }

          .foundation-mobile-menu
            .mobile-donate-link,
          .foundation-mobile-menu
            .mobile-donate-link:link,
          .foundation-mobile-menu
            .mobile-donate-link:visited {
            margin-top: 5px;

            background: #168147;

            color: #ffffff !important;

            text-align: center;
          }
        }

        /* =====================================================
           MOBILE PHONE SIZE
        ===================================================== */

        @media (max-width: 760px) {
          .foundation-nav {
            padding: 5px 10px;
          }

          .foundation-nav-shell {
            min-height: 62px;

            padding: 0;

            gap: 8px;
          }

          .foundation-logo {
            width: 112px;
            height: 48px;
          }

          .foundation-mobile-actions {
            gap: 6px;
          }

          .foundation-mobile-network {
            min-height: 38px;

            padding: 0 9px;

            gap: 5px;
          }

          .mobile-live-copy span {
            font-size: 8px;
          }

          .foundation-menu-button {
            width: 38px;
            height: 38px;

            font-size: 18px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 480px) {
          .foundation-logo {
            width: 104px;
          }

          .foundation-mobile-network {
            padding: 0 8px;
          }

          .mobile-live-copy span {
            font-size: 7.5px;
          }

          .mobile-network-arrow {
            display: none;
          }
        }

        @media (max-width: 390px) {
          .foundation-logo {
            width: 96px;
          }

          .foundation-mobile-network {
            padding: 0 7px;
          }

          .mobile-live-copy span {
            font-size: 7px;
          }

          .mobile-live-copy strong {
            font-size: 6px;
          }
        }
      `}</style>
    </>
  );
}