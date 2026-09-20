"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* =========================================================
   PAYMENT SETTINGS

   REPLACE THESE LATER WITH YOUR REAL DETAILS.
========================================================= */

const NGN_PAYMENT_LINK = "#";
const USD_PAYMENT_LINK = "#";

const BANK_NAME = "Your Bank Name";
const ACCOUNT_NAME = "TEDIS Evergreen Foundation";
const ACCOUNT_NUMBER = "0000000000";

/* =========================================================
   DONATION AMOUNTS
========================================================= */

const NGN_AMOUNTS = [
  "₦5,000",
  "₦10,000",
  "₦25,000",
  "₦50,000",
  "₦100,000",
];

const USD_AMOUNTS = [
  "$10",
  "$25",
  "$50",
  "$100",
  "$250",
];

type Currency = "NGN" | "USD";
type Frequency = "once" | "monthly";

export default function DonatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [currency, setCurrency] =
    useState<Currency>("NGN");

  const [frequency, setFrequency] =
    useState<Frequency>("once");

  const [selectedAmount, setSelectedAmount] =
    useState("₦10,000");

  const [customAmount, setCustomAmount] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const amounts =
    currency === "NGN"
      ? NGN_AMOUNTS
      : USD_AMOUNTS;

  const paymentLink =
    currency === "NGN"
      ? NGN_PAYMENT_LINK
      : USD_PAYMENT_LINK;

  function changeCurrency(
    selectedCurrency: Currency
  ) {
    setCurrency(selectedCurrency);

    setCustomAmount("");

    if (selectedCurrency === "NGN") {
      setSelectedAmount("₦10,000");
    } else {
      setSelectedAmount("$25");
    }
  }

  function handleDonate() {
    if (paymentLink === "#") {
      alert(
        "Payment link will be connected here once the Foundation payment account is ready."
      );

      return;
    }

    window.open(
      paymentLink,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(
        ACCOUNT_NUMBER
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="donate-page">

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <header className="donate-nav">

        <div className="nav-inner">

          <Link
            href="/"
            className="foundation-logo"
          >
            <Image
              src="/logo.jpeg"
              alt="TEDIS Evergreen Foundation"
              width={220}
              height={100}
              priority
            />
          </Link>

          <nav className="desktop-navigation">

            <Link href="/">
              Home
            </Link>

            <Link href="/#about">
              About
            </Link>

            <Link href="/#our-work">
              Our Work
            </Link>

            <Link href="/impact">
              Impact
            </Link>

            <Link href="/#stories">
              Stories
            </Link>

            <Link
              href="/energy-view"
              className="network-button"
            >
              <span className="live-dot" />

              <strong>
                LIVE
              </strong>

              Community Network
            </Link>

            <Link
              href="/donate"
              className="nav-donate-button"
            >
              Donate
            </Link>

          </nav>

          <div className="mobile-actions">

            <Link
              href="/energy-view"
              className="mobile-live"
            >
              <span />

              LIVE
            </Link>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              aria-label="Open menu"
            >
              {mobileMenuOpen
                ? "×"
                : "☰"}
            </button>

          </div>

          {mobileMenuOpen && (
            <div className="mobile-menu">

              <Link href="/">
                Home
              </Link>

              <Link href="/#about">
                About
              </Link>

              <Link href="/#our-work">
                Our Work
              </Link>

              <Link href="/impact">
                Impact
              </Link>

              <Link href="/#stories">
                Stories
              </Link>

              <Link href="/energy-view">
                Community Energy Network
              </Link>

              <Link href="/donate">
                Donate
              </Link>

            </div>
          )}

        </div>

      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="donate-hero">

        <Image
          src="/salon1.jpeg"
          alt="Clean energy creating opportunities in communities"
          fill
          priority
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="page-container hero-content">

          <span className="eyebrow light">
            SUPPORT THE MISSION
          </span>

          <h1>
            Help power what
            becomes possible.
          </h1>

          <p>
            Your support helps bring
            reliable clean electricity,
            circular recovery and
            long-term energy support to
            people and essential services
            in hard-to-reach communities.
          </p>

          <a
            href="#donate-now"
            className="hero-button"
          >
            Make a Donation

            <span>
              ↓
            </span>
          </a>

        </div>

      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="intro-section">

        <div className="page-container intro-layout">

          <div>

            <span className="eyebrow">
              YOUR SUPPORT MATTERS
            </span>

            <h2>
              Energy can unlock
              an entire day of
              opportunity.
            </h2>

          </div>

          <div className="intro-copy">

            <p>
              Reliable electricity can
              help a small business stay
              productive, keep essential
              community services running
              and give families greater
              access to information,
              communication and economic
              opportunity.
            </p>

            <p>
              Your contribution supports
              our work across community
              energy deployment,
              maintenance, technology,
              field support and circular
              recovery.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          DONATION
      ====================================================== */}

      <section
        className="donation-section"
        id="donate-now"
      >

        <div className="page-container">

          <div className="section-heading">

            <span className="eyebrow">
              MAKE A DONATION
            </span>

            <h2>
              Choose how you
              would like to give.
            </h2>

            <p>
              Donate in Nigerian Naira or
              US Dollars.
            </p>

          </div>

          <div className="donation-layout">

            {/* =================================================
                DONATION BUILDER
            ================================================= */}

            <div className="donation-builder">

              {/* CURRENCY */}

              <div className="donation-step">

                <div className="step-header">

                  <span className="step-number">
                    01
                  </span>

                  <div>

                    <h3>
                      Choose your currency
                    </h3>

                    <p>
                      Select how you want
                      to make your donation.
                    </p>

                  </div>

                </div>

                <div className="currency-selector">

                  <button
                    type="button"
                    className={
                      currency === "NGN"
                        ? "currency-card active"
                        : "currency-card"
                    }
                    onClick={() =>
                      changeCurrency("NGN")
                    }
                  >

                    <span className="currency-symbol">
                      ₦
                    </span>

                    <div>

                      <strong>
                        Nigerian Naira
                      </strong>

                      <span>
                        NGN
                      </span>

                    </div>

                    <span className="selection-circle">
                      {currency === "NGN"
                        ? "✓"
                        : ""}
                    </span>

                  </button>

                  <button
                    type="button"
                    className={
                      currency === "USD"
                        ? "currency-card active"
                        : "currency-card"
                    }
                    onClick={() =>
                      changeCurrency("USD")
                    }
                  >

                    <span className="currency-symbol">
                      $
                    </span>

                    <div>

                      <strong>
                        US Dollar
                      </strong>

                      <span>
                        USD
                      </span>

                    </div>

                    <span className="selection-circle">
                      {currency === "USD"
                        ? "✓"
                        : ""}
                    </span>

                  </button>

                </div>

              </div>

              {/* FREQUENCY */}

              <div className="donation-step">

                <div className="step-header">

                  <span className="step-number">
                    02
                  </span>

                  <div>

                    <h3>
                      Choose frequency
                    </h3>

                    <p>
                      Give once or support
                      the work every month.
                    </p>

                  </div>

                </div>

                <div className="frequency-selector">

                  <button
                    type="button"
                    className={
                      frequency === "once"
                        ? "frequency-button active"
                        : "frequency-button"
                    }
                    onClick={() =>
                      setFrequency("once")
                    }
                  >
                    Give Once
                  </button>

                  <button
                    type="button"
                    className={
                      frequency ===
                      "monthly"
                        ? "frequency-button active"
                        : "frequency-button"
                    }
                    onClick={() =>
                      setFrequency(
                        "monthly"
                      )
                    }
                  >
                    Give Monthly
                  </button>

                </div>

              </div>

              {/* AMOUNT */}

              <div className="donation-step">

                <div className="step-header">

                  <span className="step-number">
                    03
                  </span>

                  <div>

                    <h3>
                      Select an amount
                    </h3>

                    <p>
                      Every contribution
                      helps move community
                      energy forward.
                    </p>

                  </div>

                </div>

                <div className="amount-grid">

                  {amounts.map(
                    (amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={
                          selectedAmount ===
                            amount &&
                          !customAmount
                            ? "amount-button active"
                            : "amount-button"
                        }
                        onClick={() => {
                          setSelectedAmount(
                            amount
                          );

                          setCustomAmount("");
                        }}
                      >
                        {amount}
                      </button>
                    )
                  )}

                </div>

                <div className="custom-amount">

                  <label
                    htmlFor="customAmount"
                  >
                    Or enter another amount
                  </label>

                  <div className="custom-input-wrapper">

                    <span>
                      {currency === "NGN"
                        ? "₦"
                        : "$"}
                    </span>

                    <input
                      id="customAmount"
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(event) =>
                        setCustomAmount(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SUMMARY / CHECKOUT
            ================================================= */}

            <aside className="checkout-card">

              <div className="checkout-label">
                YOUR DONATION
              </div>

              <div className="checkout-amount">

                {customAmount
                  ? `${
                      currency === "NGN"
                        ? "₦"
                        : "$"
                    }${Number(
                      customAmount
                    ).toLocaleString()}`
                  : selectedAmount}

              </div>

              <div className="checkout-frequency">

                {frequency === "monthly"
                  ? "Monthly donation"
                  : "One-time donation"}

              </div>

              <div className="checkout-divider" />

              <h3>
                Help sustain
                community energy.
              </h3>

              <p>
                Your contribution supports
                clean energy access,
                maintenance, field
                response, monitoring and
                circular recovery.
              </p>

              <div className="support-list">

                <div>
                  <span>
                    ✓
                  </span>

                  Clean energy access
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Maintenance & support
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Circular recovery
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Technology & monitoring
                </div>

              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={handleDonate}
              >
                Donate Securely

                <span>
                  →
                </span>
              </button>

              <div className="secure-note">

                <span>
                  🔒
                </span>

                Secure payment checkout

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* =====================================================
          PAYMENT OPTIONS
      ====================================================== */}

      <section className="payment-options-section">

        <div className="page-container">

          <div className="payment-options-heading">

            <span className="eyebrow light">
              WAYS TO GIVE
            </span>

            <h2>
              Donate online or
              make a direct transfer.
            </h2>

          </div>

          <div className="payment-method-grid">

            {/* ONLINE */}

            <article className="payment-method-card">

              <div className="method-icon">
                ↗
              </div>

              <span className="method-label">
                ONLINE DONATION
              </span>

              <h3>
                Pay securely online
              </h3>

              <p>
                Make a donation using the
                available payment methods
                on our secure payment
                checkout.
              </p>

              <div className="payment-tags">

                <span>
                  Card
                </span>

                <span>
                  Bank
                </span>

                <span>
                  Transfer
                </span>

              </div>

              <button
                type="button"
                onClick={handleDonate}
                className="method-button"
              >
                Donate Online

                <span>
                  →
                </span>
              </button>

            </article>

            {/* BANK TRANSFER */}

            <article className="payment-method-card bank-card">

              <div className="method-icon">
                ₦
              </div>

              <span className="method-label">
                NIGERIAN BANK TRANSFER
              </span>

              <h3>
                Donate directly
                by bank transfer.
              </h3>

              <p>
                You can support the
                Foundation directly from
                your Nigerian bank account.
              </p>

              <div className="bank-details">

                <div>

                  <span>
                    BANK
                  </span>

                  <strong>
                    {BANK_NAME}
                  </strong>

                </div>

                <div>

                  <span>
                    ACCOUNT NAME
                  </span>

                  <strong>
                    {ACCOUNT_NAME}
                  </strong>

                </div>

                <div>

                  <span>
                    ACCOUNT NUMBER
                  </span>

                  <div className="account-number-row">

                    <strong>
                      {ACCOUNT_NUMBER}
                    </strong>

                    <button
                      type="button"
                      onClick={
                        copyAccountNumber
                      }
                    >
                      {copied
                        ? "Copied"
                        : "Copy"}
                    </button>

                  </div>

                </div>

              </div>

              <div className="bank-note">
                Please replace these
                placeholder bank details
                with the Foundation's
                official account before
                launching donations.
              </div>

            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHERE YOUR SUPPORT GOES
      ====================================================== */}

      <section className="support-section">

        <div className="page-container">

          <div className="support-heading">

            <span className="eyebrow light">
              WHERE SUPPORT GOES
            </span>

            <h2>
              One contribution.
              Connected impact.
            </h2>

          </div>

          <div className="support-grid">

            <article>

              <span className="support-number">
                01
              </span>

              <h3>
                Energy Access
              </h3>

              <p>
                Support deployment of
                TED Evergreen Smart Energy
                700 systems to eligible
                households, microbusinesses,
                schools, clinics and other
                community facilities.
              </p>

            </article>

            <article>

              <span className="support-number">
                02
              </span>

              <h3>
                Maintenance
              </h3>

              <p>
                Help fund replacement
                components, field
                technicians and ongoing
                maintenance that keeps
                community energy systems
                working.
              </p>

            </article>

            <article>

              <span className="support-number">
                03
              </span>

              <h3>
                Circular Recovery
              </h3>

              <p>
                Support recovery, reuse
                and responsible recycling
                of solar and electronic
                materials.
              </p>

            </article>

            <article>

              <span className="support-number">
                04
              </span>

              <h3>
                Technology
              </h3>

              <p>
                Strengthen AI and IoT
                monitoring that helps
                understand energy use,
                detect faults and support
                field response.
              </p>

            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          MODEL
      ====================================================== */}

      <section className="community-model-section">

        <div className="page-container model-layout">

          <div className="model-image-wrapper">

            <Image
              src="/frame3.jpeg"
              alt="Community clean energy access"
              fill
              className="model-image"
            />

            <div className="model-image-overlay" />

            <div className="model-image-text">

              <span>
                COMMUNITY ENERGY
              </span>

              <strong>
                Built for access.
                Designed to last.
              </strong>

            </div>

          </div>

          <div className="model-copy">

            <span className="eyebrow">
              OUR APPROACH
            </span>

            <h2>
              Access first.
              Sustainability built in.
            </h2>

            <p>
              Eligible households,
              microbusinesses, schools,
              clinics and other community
              facilities receive access to
              TED Evergreen Smart Energy
              700 without an upfront
              system cost.
            </p>

            <p>
              A small community energy
              contribution helps support
              maintenance, replacement
              components, field support,
              recovery and long-term
              operation of the network.
            </p>

            <Link
              href="/energy-view"
              className="text-link"
            >
              View Community Energy Network

              <span>
                ↗
              </span>
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRANSPARENCY
      ====================================================== */}

      <section className="transparency-section">

        <div className="page-container">

          <div className="transparency-card">

            <div>

              <span className="eyebrow">
                ACCOUNTABILITY
              </span>

              <h2>
                Support should
                come with transparency.
              </h2>

            </div>

            <div>

              <p>
                We track deployment,
                energy access,
                environmental impact,
                system performance and
                circular recovery to help
                understand what community
                energy is achieving.
              </p>

              <Link
                href="/impact"
                className="text-link"
              >
                Explore Our Impact

                <span>
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="final-cta">

        <div className="page-container final-cta-inner">

          <div>

            <span>
              ENERGY CHANGES WHAT
              IS POSSIBLE
            </span>

            <h2>
              Help power the
              next opportunity.
            </h2>

          </div>

          <a
            href="#donate-now"
            className="final-cta-button"
          >
            Make a Donation
          </a>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="foundation-footer">

        <div className="page-container">

          <div className="footer-main">

            <div className="footer-left">

              <div className="footer-brand-text">

                <h3>
                  TEDIS Evergreen Foundation
                </h3>

                <p>
                  Bringing clean energy,
                  circular recovery and
                  technology to
                  hard-to-reach
                  communities.
                </p>

              </div>

              <div className="footer-links-grid">

                <div>

                  <h4>
                    Explore
                  </h4>

                  <Link href="/">
                    Home
                  </Link>

                  <Link href="/#about">
                    About
                  </Link>

                  <Link href="/#our-work">
                    Our Work
                  </Link>

                  <Link href="/impact">
                    Impact
                  </Link>

                  <Link href="/energy-view">
                    Community Network
                  </Link>

                </div>

                <div>

                  <h4>
                    Take Action
                  </h4>

                  <Link href="/donate">
                    Donate
                  </Link>

                  <Link href="/contact">
                    Partner With Us
                  </Link>

                  <Link href="/contact">
                    Contact
                  </Link>

                </div>

                <div>

                  <h4>
                    Contact
                  </h4>

                  <p>
                    20 Lumper Alam Avenue,
                    Makurdi, Benue State,
                    Nigeria
                  </p>

                  <a href="tel:+2349062442470">
                    +234 906 244 2470
                  </a>

                </div>

              </div>

            </div>

            <div className="footer-map-card">

              <div className="map-card-header">

                <div>

                  <span>
                    OUR LOCATION
                  </span>

                  <h3>
                    Find us in Makurdi
                  </h3>

                </div>

                <a
                  href="https://maps.app.goo.gl/ziXt7R9AjzUAwV928?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Maps ↗
                </a>

              </div>

              <div className="map-frame">

                <iframe
                  src="https://www.google.com/maps?q=20%20Lumper%20Alam%20Avenue%2C%20Makurdi%2C%20Benue%20State%2C%20Nigeria&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TEDIS Evergreen Foundation location"
                />

              </div>

            </div>

          </div>

          <div className="footer-bottom">

            <span>
              ©{" "}
              {new Date().getFullYear()}{" "}
              TEDIS Evergreen Foundation
            </span>

            <span>
              Brighter communities.
              Stronger tomorrows.
            </span>

          </div>

        </div>

      </footer>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .donate-page {
          min-height: 100vh;
          overflow-x: hidden;

          background: #fbfaf6;

          color: #153229;
        }

        .donate-page a {
          text-decoration: none;
        }

        .page-container {
          width: min(
            1240px,
            calc(100% - 40px)
          );

          margin: 0 auto;
        }

        .eyebrow {
          display: block;

          color: #168147;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 0.16em;

          text-transform: uppercase;
        }

        .eyebrow.light {
          color: #8ee0a6;
        }

        /* ===================================================
           NAVIGATION
        =================================================== */

        .donate-nav {
          position: fixed;

          top: 0;
          left: 0;
          right: 0;

          z-index: 1000;

          padding: 10px 16px;

          background:
            rgba(
              255,
              255,
              255,
              0.97
            );

          backdrop-filter: blur(14px);

          border-bottom:
            1px solid
            rgba(
              21,
              50,
              41,
              0.08
            );
        }

        .nav-inner {
          position: relative;

          width: min(
            1240px,
            100%
          );

          height: 78px;

          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 22px;
        }

        .foundation-logo {
          width: 185px;
          height: 64px;

          display: flex;
          align-items: center;

          flex-shrink: 0;
        }

        .foundation-logo img {
          width: 100%;
          height: 100%;

          object-fit: contain;
        }

        .desktop-navigation {
          display: flex;
          align-items: center;

          gap: 21px;
        }

        .desktop-navigation > a {
          color: #153229;

          font-size: 13px;

          font-weight: 700;
        }

        .network-button {
          min-height: 44px;

          padding: 0 14px;

          display: inline-flex;
          align-items: center;

          gap: 7px;

          border-radius: 999px;

          background:
            linear-gradient(
              135deg,
              #0d241c,
              #16412e
            );

          color: #ffffff !important;
        }

        .network-button strong {
          color: #8ee0a6;

          font-size: 8px;

          letter-spacing: 0.12em;
        }

        .live-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 0 5px
            rgba(
              114,
              233,
              155,
              0.12
            );

          animation:
            livePulse
            1.6s infinite;
        }

        @keyframes livePulse {

          0% {
            box-shadow:
              0 0 0 0
              rgba(
                114,
                233,
                155,
                0.45
              );
          }

          70% {
            box-shadow:
              0 0 0 8px
              rgba(
                114,
                233,
                155,
                0
              );
          }

          100% {
            box-shadow:
              0 0 0 0
              rgba(
                114,
                233,
                155,
                0
              );
          }

        }

        .nav-donate-button {
          padding: 12px 20px;

          border-radius: 999px;

          background: #168147;

          color: #ffffff !important;
        }

        .mobile-actions,
        .mobile-menu {
          display: none;
        }

        /* ===================================================
           HERO
        =================================================== */

        .donate-hero {
          position: relative;

          min-height: 680px;

          margin-top: 98px;

          display: flex;
          align-items: flex-end;

          overflow: hidden;

          background: #0b281f;
        }

        .hero-image {
          object-fit: cover;

          object-position: center;
        }

        .hero-overlay {
          position: absolute;

          inset: 0;

          z-index: 1;

          background:
            linear-gradient(
              90deg,
              rgba(
                5,
                28,
                20,
                0.94
              )
              0%,
              rgba(
                5,
                28,
                20,
                0.7
              )
              47%,
              rgba(
                5,
                28,
                20,
                0.12
              )
              100%
            );
        }

        .hero-content {
          position: relative;

          z-index: 2;

          padding-bottom: 76px;

          color: #ffffff;
        }

        .donate-hero h1 {
          max-width: 900px;

          margin: 18px 0 0;

          font-size:
            clamp(
              56px,
              7vw,
              92px
            );

          line-height: 0.94;

          letter-spacing:
            -0.055em;
        }

        .donate-hero p {
          max-width: 650px;

          margin: 25px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 17px;

          line-height: 1.7;
        }

        .hero-button {
          min-height: 50px;

          margin-top: 30px;

          padding: 0 21px;

          display: inline-flex;
          align-items: center;

          gap: 14px;

          border-radius: 999px;

          background: #ffffff;

          color: #153229;

          font-size: 12px;

          font-weight: 900;
        }

        /* ===================================================
           INTRO
        =================================================== */

        .intro-section {
          padding: 95px 0;

          background: #fbfaf6;
        }

        .intro-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.9fr);

          gap: 90px;
        }

        .intro-layout h2,
        .section-heading h2,
        .payment-options-heading h2,
        .support-heading h2,
        .model-copy h2,
        .transparency-card h2,
        .final-cta h2 {
          margin: 12px 0 0;

          font-size:
            clamp(
              39px,
              5vw,
              61px
            );

          line-height: 0.98;

          letter-spacing:
            -0.045em;
        }

        .intro-copy {
          display: grid;

          gap: 17px;
        }

        .intro-copy p {
          margin: 0;

          color: #65736c;

          font-size: 15px;

          line-height: 1.78;
        }

        /* ===================================================
           DONATION SECTION
        =================================================== */

        .donation-section {
          padding: 100px 0;

          background: #ffffff;
        }

        .section-heading {
          max-width: 760px;
        }

        .section-heading > p {
          margin: 17px 0 0;

          color: #68756f;
        }

        .donation-layout {
          margin-top: 48px;

          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(340px, 0.65fr);

          gap: 25px;

          align-items: start;
        }

        .donation-builder {
          overflow: hidden;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.1
            );

          border-radius: 25px;

          background: #fbfcfa;
        }

        .donation-step {
          padding: 30px;

          border-bottom:
            1px solid
            rgba(
              21,
              50,
              41,
              0.08
            );
        }

        .donation-step:last-child {
          border-bottom: 0;
        }

        .step-header {
          display: flex;

          gap: 14px;

          align-items: flex-start;
        }

        .step-number {
          width: 31px;
          height: 31px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          border-radius: 50%;

          background: #dceedd;

          color: #168147;

          font-size: 9px;

          font-weight: 900;
        }

        .step-header h3 {
          margin: 0;

          font-size: 18px;
        }

        .step-header p {
          margin: 5px 0 0;

          color: #7b8782;

          font-size: 11px;

          line-height: 1.5;
        }

        /* CURRENCY */

        .currency-selector {
          margin-top: 22px;

          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 11px;
        }

        .currency-card {
          min-height: 98px;

          padding: 16px;

          display: grid;

          grid-template-columns:
            42px 1fr 25px;

          gap: 12px;

          align-items: center;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.1
            );

          border-radius: 15px;

          background: #ffffff;

          color: #153229;

          text-align: left;

          cursor: pointer;
        }

        .currency-card.active {
          border-color: #168147;

          background: #edf7ef;
        }

        .currency-symbol {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          background: #153229;

          color: #ffffff;

          font-size: 19px;

          font-weight: 900;
        }

        .currency-card strong {
          display: block;

          font-size: 13px;
        }

        .currency-card
        > div
        > span {
          display: block;

          margin-top: 3px;

          color: #819089;

          font-size: 9px;

          font-weight: 800;
        }

        .selection-circle {
          width: 23px;
          height: 23px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.16
            );

          border-radius: 50%;

          color: #ffffff;

          font-size: 9px;
        }

        .currency-card.active
        .selection-circle {
          border-color: #168147;

          background: #168147;
        }

        /* FREQUENCY */

        .frequency-selector {
          margin-top: 21px;

          padding: 4px;

          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 4px;

          border-radius: 999px;

          background: #edf1ee;
        }

        .frequency-button {
          min-height: 45px;

          border: 0;

          border-radius: 999px;

          background: transparent;

          color: #66756e;

          font-size: 11px;

          font-weight: 900;

          cursor: pointer;
        }

        .frequency-button.active {
          background: #153229;

          color: #ffffff;

          box-shadow:
            0 7px 20px
            rgba(
              21,
              50,
              41,
              0.15
            );
        }

        /* AMOUNTS */

        .amount-grid {
          margin-top: 22px;

          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            );

          gap: 8px;
        }

        .amount-button {
          min-height: 55px;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.11
            );

          border-radius: 12px;

          background: #ffffff;

          color: #153229;

          font-size: 13px;

          font-weight: 900;

          cursor: pointer;
        }

        .amount-button.active {
          border-color: #168147;

          background: #168147;

          color: #ffffff;
        }

        .custom-amount {
          margin-top: 19px;
        }

        .custom-amount label {
          display: block;

          margin-bottom: 8px;

          color: #64716b;

          font-size: 10px;

          font-weight: 800;
        }

        .custom-input-wrapper {
          height: 55px;

          display: flex;
          align-items: center;

          overflow: hidden;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.11
            );

          border-radius: 12px;

          background: #ffffff;
        }

        .custom-input-wrapper span {
          padding-left: 17px;

          color: #168147;

          font-size: 18px;

          font-weight: 900;
        }

        .custom-input-wrapper input {
          width: 100%;
          height: 100%;

          padding: 0 13px;

          border: 0;

          outline: none;

          background: transparent;

          color: #153229;

          font-size: 15px;

          font-weight: 700;
        }

        /* CHECKOUT */

        .checkout-card {
          position: sticky;

          top: 120px;

          padding: 27px;

          border-radius: 25px;

          background: #153229;

          color: #ffffff;

          box-shadow:
            0 25px 55px
            rgba(
              18,
              49,
              39,
              0.16
            );
        }

        .checkout-label {
          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 0.14em;
        }

        .checkout-amount {
          margin-top: 10px;

          color: #8ee0a6;

          font-size: 46px;

          font-weight: 800;

          letter-spacing:
            -0.045em;
        }

        .checkout-frequency {
          margin-top: 2px;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 10px;
        }

        .checkout-divider {
          height: 1px;

          margin: 23px 0;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .checkout-card h3 {
          margin: 0;

          font-size: 28px;

          line-height: 1.04;

          letter-spacing:
            -0.04em;
        }

        .checkout-card > p {
          margin: 13px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.5
            );

          font-size: 11px;

          line-height: 1.68;
        }

        .support-list {
          margin-top: 22px;

          display: grid;

          gap: 10px;
        }

        .support-list div {
          display: flex;
          align-items: center;

          gap: 9px;

          color:
            rgba(
              255,
              255,
              255,
              0.75
            );

          font-size: 11px;
        }

        .support-list span {
          width: 21px;
          height: 21px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          border-radius: 50%;

          background:
            rgba(
              142,
              224,
              166,
              0.12
            );

          color: #8ee0a6;

          font-size: 8px;
        }

        .checkout-button {
          width: 100%;
          min-height: 52px;

          margin-top: 26px;

          padding: 0 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border: 0;

          border-radius: 999px;

          background: #8ee0a6;

          color: #10281f;

          font-size: 11px;

          font-weight: 900;

          cursor: pointer;
        }

        .secure-note {
          margin-top: 12px;

          display: flex;
          justify-content: center;

          gap: 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 8px;
        }

        /* ===================================================
           PAYMENT OPTIONS
        =================================================== */

        .payment-options-section {
          padding: 100px 0;

          background: #10281f;

          color: #ffffff;
        }

        .payment-options-heading {
          max-width: 800px;
        }

        .payment-method-grid {
          margin-top: 45px;

          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 15px;
        }

        .payment-method-card {
          min-height: 440px;

          padding: 30px;

          display: flex;
          flex-direction: column;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 23px;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );
        }

        .method-icon {
          width: 49px;
          height: 49px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          background:
            rgba(
              142,
              224,
              166,
              0.12
            );

          color: #8ee0a6;

          font-size: 18px;

          font-weight: 900;
        }

        .method-label {
          margin-top: 30px;

          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 0.13em;
        }

        .payment-method-card h3 {
          margin: 9px 0 0;

          font-size: 30px;

          letter-spacing:
            -0.04em;
        }

        .payment-method-card > p {
          max-width: 500px;

          margin: 13px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 12px;

          line-height: 1.7;
        }

        .payment-tags {
          margin-top: 24px;

          display: flex;
          flex-wrap: wrap;

          gap: 7px;
        }

        .payment-tags span {
          padding: 7px 10px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 999px;

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size: 8px;

          font-weight: 800;
        }

        .method-button {
          min-height: 47px;

          margin-top: auto;

          padding: 0 17px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border: 0;

          border-radius: 999px;

          background: #8ee0a6;

          color: #10281f;

          font-size: 10px;

          font-weight: 900;

          cursor: pointer;
        }

        .bank-details {
          margin-top: 22px;

          display: grid;

          gap: 10px;
        }

        .bank-details > div {
          padding: 13px 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 12px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );
        }

        .bank-details span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 7px;

          font-weight: 900;

          letter-spacing: 0.12em;
        }

        .bank-details strong {
          display: block;

          margin-top: 5px;

          color: #ffffff;

          font-size: 13px;
        }

        .account-number-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 15px;
        }

        .account-number-row button {
          padding: 6px 11px;

          border: 0;

          border-radius: 999px;

          background:
            rgba(
              142,
              224,
              166,
              0.13
            );

          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;

          cursor: pointer;
        }

        .bank-note {
          margin-top: 12px;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 8px;

          line-height: 1.55;
        }

        /* ===================================================
           SUPPORT
        =================================================== */

        .support-section {
          padding: 100px 0;

          background: #153229;

          color: #ffffff;
        }

        .support-heading {
          max-width: 760px;
        }

        .support-grid {
          margin-top: 45px;

          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0, 1fr)
            );

          gap: 12px;
        }

        .support-grid article {
          min-height: 300px;

          padding: 23px;

          display: flex;
          flex-direction: column;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 18px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );
        }

        .support-number {
          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;
        }

        .support-grid h3 {
          margin-top: auto;
          margin-bottom: 0;

          font-size: 20px;
        }

        .support-grid p {
          margin: 10px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.48
            );

          font-size: 11px;

          line-height: 1.65;
        }

        /* ===================================================
           MODEL
        =================================================== */

        .community-model-section {
          padding: 100px 0;

          background: #fbfaf6;
        }

        .model-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.08fr)
            minmax(0, 0.92fr);

          gap: 70px;

          align-items: center;
        }

        .model-image-wrapper {
          position: relative;

          min-height: 570px;

          overflow: hidden;

          border-radius: 25px;
        }

        .model-image {
          object-fit: cover;
        }

        .model-image-overlay {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(
                6,
                29,
                21,
                0.8
              ),
              transparent 55%
            );
        }

        .model-image-text {
          position: absolute;

          left: 27px;
          right: 27px;
          bottom: 27px;

          color: #ffffff;
        }

        .model-image-text span {
          display: block;

          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 0.13em;
        }

        .model-image-text strong {
          display: block;

          max-width: 470px;

          margin-top: 9px;

          font-size: 35px;

          line-height: 1.04;

          letter-spacing:
            -0.04em;
        }

        .model-copy p {
          margin: 18px 0 0;

          color: #68756f;

          line-height: 1.72;
        }

        .text-link {
          margin-top: 23px;

          display: inline-flex;
          align-items: center;

          gap: 8px;

          color: #168147;

          font-size: 11px;

          font-weight: 900;
        }

        /* ===================================================
           TRANSPARENCY
        =================================================== */

        .transparency-section {
          padding: 0 0 100px;

          background: #fbfaf6;
        }

        .transparency-card {
          padding: 48px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.55fr);

          gap: 70px;

          align-items: end;

          border-radius: 25px;

          background: #dceedd;
        }

        .transparency-card p {
          margin: 0;

          color: #53655c;

          line-height: 1.72;
        }

        /* ===================================================
           FINAL CTA
        =================================================== */

        .final-cta {
          padding: 74px 0;

          background: #168147;

          color: #ffffff;
        }

        .final-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 40px;
        }

        .final-cta-inner
        > div
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.6
            );

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 0.13em;
        }

        .final-cta h2 {
          max-width: 690px;
        }

        .final-cta-button {
          min-height: 50px;

          padding: 0 22px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 999px;

          background: #ffffff;

          color: #153229;

          font-size: 11px;

          font-weight: 900;
        }

        /* ===================================================
           FOOTER
        =================================================== */

        .foundation-footer {
          padding:
            65px 0 25px;

          background: #071c15;

          color: #ffffff;
        }

        .footer-main {
          display: grid;

          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(380px, 0.95fr);

          gap: 65px;
        }

        .footer-brand-text h3 {
          margin: 0;

          font-size: 34px;

          letter-spacing:
            -0.035em;
        }

        .footer-brand-text p {
          max-width: 440px;

          margin: 15px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          line-height: 1.7;
        }

        .footer-links-grid {
          margin-top: 40px;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(0, 1fr)
            );

          gap: 30px;
        }

        .footer-links-grid
        > div {
          display: flex;
          flex-direction: column;

          gap: 10px;
        }

        .footer-links-grid h4 {
          margin: 0 0 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.38
            );

          font-size: 8px;

          letter-spacing: 0.13em;
        }

        .footer-links-grid a,
        .footer-links-grid p {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 12px;

          line-height: 1.65;
        }

        .footer-map-card {
          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 23px;
        }

        .map-card-header {
          padding: 20px 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 16px;
        }

        .map-card-header span {
          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 0.13em;
        }

        .map-card-header h3 {
          margin: 6px 0 0;

          font-size: 20px;
        }

        .map-card-header a {
          color: #8ee0a6;

          font-size: 10px;

          font-weight: 800;
        }

        .map-frame {
          height: 300px;
        }

        .map-frame iframe {
          display: block;

          width: 100%;
          height: 100%;
        }

        .footer-bottom {
          margin-top: 48px;

          padding-top: 20px;

          display: flex;
          justify-content: space-between;

          gap: 20px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 9px;
        }

        /* ===================================================
           TABLET
        =================================================== */

        @media (
          max-width: 1080px
        ) {

          .desktop-navigation {
            display: none;
          }

          .mobile-actions {
            display: flex;

            align-items: center;

            gap: 8px;
          }

          .mobile-live {
            min-height: 36px;

            padding: 0 10px;

            display: flex;
            align-items: center;

            gap: 6px;

            border-radius: 999px;

            background: #153229;

            color: #8ee0a6;

            font-size: 8px;

            font-weight: 900;
          }

          .mobile-live span {
            width: 6px;
            height: 6px;

            border-radius: 50%;

            background: #72e99b;
          }

          .mobile-menu-button {
            width: 40px;
            height: 40px;

            border: 0;

            border-radius: 50%;

            background: #153229;

            color: #ffffff;

            font-size: 17px;
          }

          .mobile-menu {
            position: absolute;

            top:
              calc(
                100% + 10px
              );

            left: 0;
            right: 0;

            display: grid;

            padding: 14px;

            border-radius: 18px;

            background: #ffffff;

            box-shadow:
              0 18px 45px
              rgba(
                21,
                50,
                41,
                0.15
              );
          }

          .mobile-menu a {
            padding: 12px 14px;

            color: #153229;

            font-size: 13px;

            font-weight: 700;
          }

          .intro-layout,
          .model-layout {
            grid-template-columns: 1fr;

            gap: 45px;
          }

          .donation-layout {
            grid-template-columns: 1fr;
          }

          .checkout-card {
            position: static;
          }

          .amount-grid {
            grid-template-columns:
              repeat(
                3,
                1fr
              );
          }

          .support-grid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .transparency-card {
            grid-template-columns: 1fr;

            gap: 25px;
          }

          .footer-main {
            grid-template-columns: 1fr;
          }

        }

        /* ===================================================
           MOBILE
        =================================================== */

        @media (
          max-width: 720px
        ) {

          .page-container {
            width:
              calc(
                100% - 28px
              );
          }

          .donate-nav {
            padding: 5px 9px;
          }

          .nav-inner {
            height: 62px;
          }

          .foundation-logo {
            width: 118px;
            height: 48px;
          }

          .donate-hero {
            min-height: 610px;

            margin-top: 72px;
          }

          .hero-overlay {
            background:
              linear-gradient(
                to top,
                rgba(
                  5,
                  28,
                  20,
                  0.96
                ),
                rgba(
                  5,
                  28,
                  20,
                  0.63
                )
                70%,
                rgba(
                  5,
                  28,
                  20,
                  0.2
                )
              );
          }

          .hero-content {
            padding-bottom: 44px;
          }

          .donate-hero h1 {
            font-size:
              clamp(
                45px,
                13vw,
                62px
              );
          }

          .donate-hero p {
            font-size: 14px;
          }

          .hero-button {
            width: 100%;

            justify-content:
              space-between;
          }

          .intro-section,
          .donation-section,
          .payment-options-section,
          .support-section,
          .community-model-section {
            padding: 52px 0;
          }

          .intro-layout h2,
          .section-heading h2,
          .payment-options-heading h2,
          .support-heading h2,
          .model-copy h2,
          .transparency-card h2,
          .final-cta h2 {
            font-size:
              clamp(
                35px,
                10vw,
                47px
              );
          }

          .intro-layout {
            gap: 24px;
          }

          .donation-layout {
            margin-top: 30px;
          }

          .donation-step {
            padding: 22px 17px;
          }

          .currency-selector {
            grid-template-columns: 1fr;
          }

          .currency-card {
            min-height: 88px;
          }

          .amount-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
          }

          .checkout-card {
            padding: 22px 19px;

            border-radius: 19px;
          }

          .checkout-amount {
            font-size: 40px;
          }

          .payment-method-grid {
            grid-template-columns: 1fr;

            margin-top: 30px;
          }

          .payment-method-card {
            min-height: 400px;

            padding: 22px;

            border-radius: 18px;
          }

          .support-grid {
            grid-template-columns: 1fr;

            margin-top: 30px;
          }

          .support-grid article {
            min-height: 230px;
          }

          .model-image-wrapper {
            min-height: 420px;

            border-radius: 20px;
          }

          .model-image-text {
            left: 20px;
            right: 20px;
            bottom: 20px;
          }

          .model-image-text strong {
            font-size: 28px;
          }

          .transparency-section {
            padding-bottom: 52px;
          }

          .transparency-card {
            padding: 25px 20px;

            border-radius: 19px;
          }

          .final-cta {
            padding: 50px 0;
          }

          .final-cta-inner {
            flex-direction: column;

            align-items: flex-start;
          }

          .final-cta-button {
            width: 100%;
          }

          .foundation-footer {
            padding-top: 48px;
          }

          .footer-main {
            gap: 30px;
          }

          .footer-brand-text h3 {
            font-size: 27px;
          }

          .footer-links-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 26px 18px;
          }

          .footer-links-grid
          > div:last-child {
            grid-column: 1 / -1;
          }

          .footer-map-card {
            border-radius: 18px;
          }

          .map-card-header {
            flex-direction: column;

            align-items: flex-start;
          }

          .map-frame {
            height: 225px;
          }

          .footer-bottom {
            flex-direction: column;

            margin-top: 34px;
          }

        }

      `}</style>

    </main>
  );
}