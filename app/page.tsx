"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer/Footer";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   IMPACT MODEL
========================================================= */

const ACTIVE_SYSTEMS = 2700;
const SYSTEM_CAPACITY_KW = 0.9;
const EQUIVALENT_HOURS_PER_DAY = 5;
const CARBON_FACTOR_KG_PER_KWH = 0.5;

const WASTE_RECOVERED_TONS = 13_500;

/*
  Internal calculation baseline.
  It is intentionally not displayed publicly.
*/
const IMPACT_START_DATE = new Date(
  "2025-09-09T00:00:00+01:00"
).getTime();

const DAILY_ENERGY_KWH =
  ACTIVE_SYSTEMS *
  SYSTEM_CAPACITY_KW *
  EQUIVALENT_HOURS_PER_DAY;

const DAILY_CARBON_PREVENTED_KG =
  DAILY_ENERGY_KWH *
  CARBON_FACTOR_KG_PER_KWH;

/* =========================================================
   HERO
========================================================= */

type HeroSlide =
  | {
      type: "video";
      src: string;
      alt: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

const HERO_SLIDES: HeroSlide[] = [
  {
    type: "image",
    src: "/salon1.jpeg",
    alt: "Clean energy supporting a local microbusiness",
  },
  {
    type: "video",
    src: "/hero-video.mp4",
    alt: "Community clean energy intervention",
  },
  {
    type: "image",
    src: "/frame3.jpeg",
    alt: "Clean energy in a hard-to-reach community",
  },
];

function formatNumber(
  value: number,
  maximumFractionDigits = 0
) {
  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits,
  }).format(value);
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const [
    heroSlide,
    setHeroSlide,
  ] = useState(0);

  const [now, setNow] = useState(
    Date.now()
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        setHeroSlide(
          (current) =>
            (current + 1) %
            HERO_SLIDES.length
        );
      },
      7000
    );

    return () =>
      window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        setNow(Date.now());
      },
      60_000
    );

    return () =>
      window.clearInterval(timer);
  }, []);

  const impact = useMemo(() => {
    const elapsedMs = Math.max(
      0,
      now - IMPACT_START_DATE
    );

    const elapsedDays =
      elapsedMs /
      (1000 * 60 * 60 * 24);

    return {
      cumulativeEnergyKwh:
        DAILY_ENERGY_KWH *
        elapsedDays,

      cumulativeCarbonKg:
        DAILY_CARBON_PREVENTED_KG *
        elapsedDays,
    };
  }, [now]);

  const currentHero =
    HERO_SLIDES[heroSlide];

  return (
    <main className="foundation-home">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero">
        <div className="hero-media">
          {currentHero.type ===
          "video" ? (
            <video
              key={currentHero.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src={currentHero.src}
                type="video/mp4"
              />
            </video>
          ) : (
            <Image
              key={currentHero.src}
              src={currentHero.src}
              alt={currentHero.alt}
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
          )}
        </div>

        <div className="hero-overlay" />

        <div className="home-container hero-content hero-content-desktop">
          <span className="eyebrow hero-eyebrow">
            A Technology NGO
          </span>

          <h1>
            We often hear and celebrate the people who make it, but rarely ask who didn&apos;t, or what held them back.
          </h1>

          <p>
            Not everyone who fails to achieve something extraordinary lacks extraordinary potential. Sometimes, they simply grew up without reliable electricity and the opportunities it makes possible.
          </p>

          <div className="hero-dots">
            {HERO_SLIDES.map(
              (slide, index) => (
                <button
                  key={`${slide.src}-${index}`}
                  type="button"
                  aria-label={`Show hero slide ${
                    index + 1
                  }`}
                  onClick={() =>
                    setHeroSlide(index)
                  }
                  className={
                    index ===
                    heroSlide
                      ? "hero-dot active"
                      : "hero-dot"
                  }
                />
              )
            )}
          </div>
        </div>
      </section>

      <section className="mobile-hero-copy">
        <div className="home-container">
          <span className="eyebrow">
            A Technology NGO
          </span>

          <h1>
            We often hear and celebrate the people who make it, but rarely ask who didn&apos;t, or what held them back.
          </h1>

          <p>
            Not everyone who fails to achieve something extraordinary lacks extraordinary potential. Sometimes, they simply grew up without reliable electricity and the opportunities it makes possible.
          </p>
        </div>
      </section>

      {/* =====================================================
          WHY WE EXIST
      ====================================================== */}

      <section className="why-section">
        <div className="home-container why-simple">
          <span className="eyebrow">
            Why We Exist
          </span>

          <div className="why-copy-block">
            <p className="section-copy why-lead">
              For millions of people across Nigeria and Africa, low incomes
              and poor infrastructure stand between them and safe electricity
              for children to study, parents to improve their business income,
              and clinics to preserve medicines and provide healthcare when
              night falls, saving lives.
            </p>

            <p className="section-copy">
              This is why we built an energy infrastructure for communities
              that existing solutions have failed to reach. Using hardware,
              IoT and AI, we provide clean electricity systems at no cost and
              use technology to remotely monitor, manage and maintain them,
              keeping the systems working long after installation.
            </p>

            <p className="why-impact-line">
              We are powering over 2,500 people across 25 communities, powering extraordinary dreams.
            </p>

            <div className="why-actions">
              <Link
                href="/energy-view"
                className="button button-dark"
              >
                View the Live Network
              </Link>

              <Link
                href="/about"
                className="button button-outline-dark"
              >
                See Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CIRCULAR ECONOMY
      ====================================================== */}

      <section className="circular-section">
        <div className="home-container">
          <div className="model-circular">
            <div className="circular-heading">
              <span className="eyebrow">
                Circular Economy
              </span>

              <h2 className="section-title">
                Waste should not be the
                end of the story.
              </h2>

              <p className="section-copy">
              </p>
            </div>

            <div className="circular-video">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={(event) =>
                  event.preventDefault()
                }
              >
                <source
                  src="/ted_evergreen_circular_battery_story.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="circular-points">
              <article>
                <span>01</span>
                <h3>Recover</h3>
                <p>
                  Collect retired solar,
                  battery and electronic
                  components before they
                  become unmanaged waste.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Recycle</h3>
                <p>
                  Direct recoverable
                  materials into
                  responsible recycling
                  and recovery pathways.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Reinvest</h3>
                <p>
                  Support system
                  longevity, local
                  opportunities and
                  responsible end-of-life
                  management.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED STORY
      ====================================================== */}

      <section className="stories-section featured-story-section">
        <div className="home-container">
          <div className="featured-story">
            <div className="featured-story-image">
              <Image
                src="/frame6.jpeg"
                alt="Alice at her registration centre"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
            </div>

            <div className="featured-story-copy">
              <h2>Meet Alice</h2>
              <p>
                Alice runs a small registration business in her community.
                Keeping the business open meant depending on a petrol
                generator, and a significant part of what she earned went back
                into fuel and other energy expenses. When fuel became too
                expensive, working hours reduced and so did the income she
                depended on.
              </p>
              <p>
                With reliable clean electricity, Alice can keep her equipment
                running without constantly paying for petrol. Lower energy
                expenses mean more of what she earns can stay with her business
                and household, while reliable power gives her more time to
                serve customers and build a more secure livelihood.
              </p>
              <p className="story-note">
                <em>
                  Alice is one of the people our clean-energy interventions are
                  helping move away from expensive, polluting energy sources
                  and toward more reliable electricity.
                </em>
              </p>
            </div>
          </div>

          <div className="story-impact-link-row">
            <Link href="/impact" className="text-link story-impact-link">
              See More Impact <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT
      ====================================================== */}

      <section className="impact-section">
        <div className="home-container">
          <div className="impact-heading">
            <span className="eyebrow">
              Our Reach in Numbers
            </span>

            <p className="section-copy">
              See how clean energy access, environmental recovery and our growing
              community energy network translate into measurable impact.
            </p>
          </div>

          <Link
            href="/impact"
            className="impact-grid"
          >
            <article>
              <strong>
                {formatNumber(
                  WASTE_RECOVERED_TONS
                )}{" "}
                tons
              </strong>

              <h3>
                Waste Recovered
              </h3>

              <p>
                Solar and electronic
                waste recovered and
                directed into
                responsible pathways.
              </p>
            </article>

            <article>
              <strong>
                {formatNumber(
                  impact.cumulativeEnergyKwh /
                    1000,
                  1
                )}{" "}
                MWh
              </strong>

              <h3>
                Electricity Provided
              </h3>

              <p>
                Cumulative clean
                electricity
                represented across the
                active community
                network.
              </p>
            </article>

            <article>
              <strong>
                {formatNumber(
                  impact.cumulativeCarbonKg /
                    1000,
                  1
                )}{" "}
                t
              </strong>

              <h3>
                CO₂ Prevented
              </h3>

              <p>
                Cumulative estimated
                carbon emissions
                prevented across the
                represented network.
              </p>
            </article>

            <article>
              <strong>
                {formatNumber(
                  ACTIVE_SYSTEMS
                )}
              </strong>

              <h3>
                People Represented
              </h3>

              <p>
                Distributed clean energy
                systems represented to
                low income earners.
              </p>
            </article>
          </Link>

          <div className="impact-link-row">
            <Link href="/impact" className="text-link impact-link">
              Explore Our Impact <span>→</span>
            </Link>
          </div>

          <div className="network-panel">
            <div>
              <span className="eyebrow eyebrow-light">
                Community Energy Network
              </span>

              <h3>
                See how systems are
                represented across
                hard-to-reach
                communities.
              </h3>
            </div>

            <Link
              href="/energy-view"
              className="live-network-button"
            >
              <span className="live-pulse">
                <span />
              </span>

              <strong>LIVE</strong>

              View Community Network

              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR MODEL
      ====================================================== */}

      <section className="work-section">
        <div className="home-container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">
              </span>

              <h2 className="section-title">
                Access first.
                Sustainability built in.
              </h2>
            </div>

            <div>
              <p className="section-copy">
                TED Evergreen Smart
                Energy 900 is deployed
                to eligible
                beneficiaries at no
                upfront cost. A simple
                monthly contribution
                helps keep each
                community energy
                network maintained,
                monitored and working.
              </p>


            </div>
          </div>

          <div className="work-list">
            <article>
              <span>01</span>

              <h3>Deploy</h3>

              <p>
                Low income households,
                microbusinesses, schools,
                clinics and community
                facilities receive TED
                Evergreen Smart Energy
                900 free.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Sustain</h3>

              <p>
                Beneficiaries subscribe
                $1 each month to support
                maintenance, replacement
                components and digital infrastructure
                that enables their system
                technical support.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Monitor</h3>

              <p>
                The digital integrated,
                AI and IoT help us
                understand system
                performance, identify
                faults and send support.

              </p>
            </article>
          </div>

        </div>
      </section>

      {/* =====================================================
          $1 COMMUNITY MODEL
      ====================================================== */}

      <section className="subscription-section">
        <div className="home-container">
          <div className="subscription-card">
            <div>
              <span className="eyebrow eyebrow-light">
                $1 Community Energy
                Subscription
              </span>

              <h2>
                A small contribution
                that helps keep the
                system working.
              </h2>

              <p>
                Beneficiaries are not
                buying the equipment.
                Their monthly
                contribution is
                reinvested into the
                community energy
                network to keep systems
                working after
                deployment.
              </p>
            </div>

            <div className="fund-grid">
              <article>
                <strong>
                  Maintenance
                </strong>

                <span>
                  Routine servicing,
                  diagnostics and
                  repairs.
                </span>
              </article>

              <article>
                <strong>
                  Components
                </strong>

                <span>
                  Replacement of worn
                  or failed system
                  parts.
                </span>
              </article>

              <article>
                <strong>
                  Field Support
                </strong>

                <span>
                  Technical support for
                  hard-to-reach
                  communities.
                </span>
              </article>

              <article>
                <strong>
                  Circular Recovery
                </strong>

                <span>
                  Recovery and
                  recycling of retired
                  equipment.
                </span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ====================================================== */}

      <section className="technology-section">
        <div className="home-container">
          <div className="technology-layout">
            <div>
              <span className="eyebrow">
                Technology for
                Hard-to-Reach
                Communities
              </span>

              <h2 className="section-title">
                Deployment is only the
                beginning.
              </h2>

              <p className="section-copy">
                Distance can make even
                a small technical
                problem expensive and
                slow to resolve. AI,
                IoT and remote
                monitoring give us
                better visibility
                across the community
                network.
              </p>

              <p className="section-copy">
                The goal is simple:
                identify problems
                earlier, understand
                system performance and
                direct field support
                where it is needed.
              </p>
            </div>

            <div className="technology-cards">
              <article>
                <span>01</span>

                <h3>
                  See the network
                </h3>

                <p>
                  IoT-connected systems
                  provide remote
                  visibility across
                  dispersed community
                  deployments.
                </p>
              </article>

              <article>
                <span>02</span>

                <h3>
                  Detect earlier
                </h3>

                <p>
                  System data can help
                  identify unusual
                  behaviour before a
                  smaller issue becomes
                  a longer outage.
                </p>
              </article>

              <article>
                <span>03</span>

                <h3>
                  Support smarter
                </h3>

                <p>
                  AI-assisted insights
                  can help field teams
                  prioritize technical
                  response and better
                  understand network
                  performance.
                </p>
              </article>
            </div>
          </div>

          <div className="technology-bottom">
            <div>
              <span>
                Community Energy
                Intelligence
              </span>

              <h3>
                Technology extends
                support beyond the day
                of installation.
              </h3>

              <p>
                Digital visibility helps
                us manage distributed
                energy systems across
                communities where
                conventional technical
                infrastructure is
                limited.
              </p>
            </div>

            <Link
              href="/energy-view"
              className="button button-white"
            >
              Explore Community Network
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORTERS
      ====================================================== */}

      <section className="supporters-section">
        <div className="home-container">
          <div className="supporters-heading">
            <span className="eyebrow">
              Our Sponsors &amp;
              Supporters
            </span>

            <h2 className="section-title">
              Working with
              organizations that
              believe underserved
              communities should not
              be left behind.
            </h2>

            <Link
              href="/supporters"
              className="text-link"
            >
              View Sponsors &amp;
              Supporters
              <span>→</span>
            </Link>
          </div>

          <div className="supporters-grid">
            {[
              "/moonshotlogo.jpeg",
              "/itulogo.jpeg",
              "/ncdmblogo.jpeg",
              "/huawei.jpeg",
            ].map((logo) => (
              <div
                key={logo}
                className="supporter-card"
              >
                <Image
                  src={logo}
                  alt="TEDIS Evergreen Foundation sponsor or supporter"
                  fill
                  sizes="(max-width: 700px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="final-cta">
        <div className="home-container final-cta-layout">
          <div>
            <span className="eyebrow eyebrow-light">
              Help Us Reach The Next
              Community
            </span>

            <h2>
              Help more communities
              access energy that keeps
              working.
            </h2>

            <p>
              Your support helps deploy
              TED Evergreen Smart Energy
              700, maintain community
              systems, strengthen field
              support and recover
              end-of-life components
              responsibly.
            </p>
          </div>

          <div className="final-actions">
            <Link
              href="/donate"
              className="button button-white"
            >
              Donate
            </Link>

            <Link
              href="/contact"
              className="button button-outline"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx global>{`
        :root {
          --foundation-green: #168147;
          --foundation-dark: #10281f;
          --foundation-cream: #fbfaf6;
          --foundation-muted: #66756f;
          --foundation-border: rgba(
            21,
            50,
            41,
            0.12
          );
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .foundation-home {
          overflow: hidden;

          background: var(
            --foundation-cream
          );

          color: var(
            --foundation-dark
          );
        }

        .foundation-home a {
          color: inherit;
          text-decoration: none;
        }

        .home-container {
          width: min(
            1240px,
            calc(100% - 40px)
          );

          margin: 0 auto;
        }

        .eyebrow {
          display: block;

          margin-bottom: 16px;

          color: var(
            --foundation-green
          );

          font-size: 10px;
          font-weight: 900;

          letter-spacing: 0.16em;

          line-height: 1.4;

          text-transform: uppercase;
        }

        .eyebrow-light {
          color: #8ee0a6;
        }

        .section-title {
          max-width: 720px;

          margin: 0;

          color: var(
            --foundation-dark
          );

          font-size: clamp(
            38px,
            5vw,
            66px
          );

          font-weight: 600;

          letter-spacing: -0.05em;

          line-height: 1.02;
        }

        .section-copy {
          max-width: 620px;

          margin: 20px 0 0;

          color: var(
            --foundation-muted
          );

          font-size: 16px;

          line-height: 1.75;
        }

        .text-link {
          display: inline-flex;
          align-items: center;

          gap: 9px;

          margin-top: 24px;

          color: var(
            --foundation-green
          ) !important;

          font-size: 14px;
          font-weight: 800;
        }

        .text-link span {
          transition: transform 180ms ease;
        }

        .text-link:hover span {
          transform: translateX(4px);
        }

        .button {
          min-height: 50px;

          padding: 0 23px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border-radius: 999px;

          font-size: 13px;
          font-weight: 850;

          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .button-green {
          background: var(
            --foundation-green
          );

          color: white !important;
        }

        .button-white {
          background: white;

          color: var(
            --foundation-dark
          ) !important;
        }

        .button-outline {
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.55
            );

          color: white !important;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );
        }

        /* =============================
           HERO
        ============================= */

        .hero {
          position: relative;

          width: calc(100% - 40px);
          max-width: 1440px;
          min-height: 690px;

          margin: 8px auto 0;

          overflow: hidden;
          border-radius: 22px;
          background: #ffffff;

          display: flex;
          align-items: center;
        }

        .hero-media,
        .hero-overlay {
          position: absolute;
          inset: 0;
        }

        .hero-media {
          background: #ffffff;
        }

        .hero-media video,
        .hero-image {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: contain;
          object-position: center;
          background: #ffffff;
        }

        .hero-overlay {
          background:
            linear-gradient(
              90deg,
              rgba(
                4,
                34,
                25,
                0.86
              )
                0%,
              rgba(
                4,
                34,
                25,
                0.6
              )
                43%,
              rgba(
                4,
                34,
                25,
                0.14
              )
                78%
            );
        }

        .hero-content {
          position: relative;

          z-index: 2;

          padding: 80px 0;

          color: white;
        }

        .hero-eyebrow {
          color: #9ee4b1;
        }

        .hero h1 {
          max-width: 760px;

          margin: 0;

          font-size: clamp(
            54px,
            7vw,
            90px
          );

          font-weight: 600;

          letter-spacing: -0.06em;

          line-height: 0.95;
        }

        .hero-content > p {
          max-width: 620px;

          margin: 27px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );

          font-size: 17px;

          line-height: 1.7;
        }

        .hero-actions {
          margin-top: 30px;

          display: flex;

          gap: 12px;

          flex-wrap: wrap;
        }

        .hero-dots {
          margin-top: 30px;

          display: flex;

          gap: 7px;
        }

        .hero-dot {
          width: 9px;
          height: 9px;

          padding: 0;

          border: 0;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.45
            );

          cursor: pointer;

          transition: 200ms ease;
        }

        .hero-dot.active {
          width: 34px;

          background: white;
        }

        .mobile-hero-copy {
          display: none;
        }

        /* =============================
           WHY
        ============================= */

        .why-section {
          padding: 72px 0 38px;
        }

        .why-simple {
          display: grid;
          grid-template-columns: minmax(180px, 0.32fr) minmax(0, 1fr);
          gap: 70px;
          align-items: start;
        }

        .why-copy-block {
          max-width: 900px;
        }

        .why-lead {
          margin-top: 0;
        }

        .why-impact-line {
          max-width: 760px;
          margin: 24px 0 0;
          color: var(--foundation-dark);
          font-size: 18px;
          font-weight: 700;
          line-height: 1.55;
        }

        .button-outline-dark {
          border: 1px solid var(--foundation-dark);
          background: transparent;
          color: var(--foundation-dark) !important;
        }

        .why-actions {
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .impact-pill {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          padding: 13px 18px;
          border-radius: 999px;
          background: var(--foundation-dark);
          color: white;
          text-decoration: none;
        }

        .impact-pill strong {
          font-size: 20px;
          letter-spacing: -0.03em;
        }

        .impact-pill span {
          font-size: 13px;
          opacity: 0.82;
        }

        .why-mission-link {
          margin-top: 0;
        }

        .why-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(0, 0.95fr);

          gap: 75px;

          align-items: center;
        }

        .why-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;
        }

        .why-card {
          padding: 26px 18px;

          border-top:
            1px solid
            var(
              --foundation-border
            );
        }

        .why-card > span,
        .work-list article > span,
        .circular-points
          article
          > span {
          color: var(
            --foundation-green
          );

          font-size: 10px;
          font-weight: 900;
        }

        .why-card h3 {
          margin: 13px 0 8px;

          font-size: 20px;
        }

        .why-card p {
          margin: 0;

          color: var(
            --foundation-muted
          );

          font-size: 13px;

          line-height: 1.65;
        }

        /* =============================
           WORK
        ============================= */

        .work-section {
          padding: 24px 0 28px;

          background: white;
        }

        .split-heading {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.8fr);

          gap: 80px;

          align-items: start;
        }

        .work-list {
          margin-top: 28px;

          border-top:
            1px solid
            var(
              --foundation-border
            );
        }

        .work-list article {
          padding: 28px 0;

          display: grid;

          grid-template-columns:
            80px
            0.55fr
            1fr;

          gap: 28px;

          align-items: start;

          border-bottom:
            1px solid
            var(
              --foundation-border
            );
        }

        .work-list h3 {
          margin: 0;

          font-size: 25px;
        }

        .work-list p {
          margin: 0;

          color: var(
            --foundation-muted
          );

          font-size: 14px;

          line-height: 1.7;
        }

        /* =============================
           SUBSCRIPTION
        ============================= */

        .subscription-section {
          padding: 35px 0 95px;

          background: white;
        }

        .subscription-card {
          padding: 50px;

          display: grid;

          grid-template-columns:
            minmax(0, 0.95fr)
            minmax(0, 1.05fr);

          gap: 60px;

          border-radius: 28px;

          background: var(
            --foundation-dark
          );

          color: white;
        }

        .subscription-card h2 {
          max-width: 570px;

          margin: 0;

          font-size: clamp(
            34px,
            5vw,
            53px
          );

          line-height: 1.02;

          letter-spacing: -0.045em;
        }

        .subscription-card
          > div:first-child
          > p {
          max-width: 600px;

          margin: 20px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.66
            );

          line-height: 1.7;
        }

        .fund-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 12px;
        }

        .fund-grid article {
          padding: 23px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.12
            );

          border-radius: 18px;

          background:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }

        .fund-grid strong {
          display: block;

          color: #8ee0a6;

          font-size: 16px;
        }

        .fund-grid span {
          display: block;

          margin-top: 8px;

          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          font-size: 13px;

          line-height: 1.55;
        }

        /* =============================
           TECHNOLOGY
        ============================= */

        .technology-section {
          padding: 100px 0;

          background:
            linear-gradient(
              135deg,
              #edf6ef,
              #fafbf7 55%,
              #e7f2e9
            );
        }

        .technology-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(0, 0.95fr);

          gap: 65px;
        }

        .technology-cards {
          display: grid;

          gap: 15px;
        }

        .technology-cards article {
          padding: 26px;

          border:
            1px solid
            rgba(
              21,
              50,
              41,
              0.1
            );

          border-radius: 18px;

          background: white;
        }

        .technology-cards
          article
          > span {
          width: 38px;
          height: 38px;

          display: grid;

          place-items: center;

          margin-bottom: 16px;

          border-radius: 50%;

          background: #dceedd;

          color: var(
            --foundation-green
          );

          font-size: 11px;
          font-weight: 900;
        }

        .technology-cards h3 {
          margin: 0;

          font-size: 22px;
        }

        .technology-cards p {
          margin: 9px 0 0;

          color: var(
            --foundation-muted
          );

          font-size: 14px;

          line-height: 1.65;
        }

        .technology-bottom {
          margin-top: 55px;

          padding: 30px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            auto;

          gap: 30px;

          align-items: center;

          border-radius: 22px;

          background: var(
            --foundation-dark
          );

          color: white;
        }

        .technology-bottom
          > div
          > span {
          color: #8ee0a6;

          font-size: 10px;
          font-weight: 900;

          letter-spacing: 0.15em;

          text-transform: uppercase;
        }

        .technology-bottom h3 {
          max-width: 700px;

          margin: 10px 0 0;

          font-size: clamp(
            28px,
            4vw,
            42px
          );

          line-height: 1.05;

          letter-spacing: -0.04em;
        }

        .technology-bottom p {
          max-width: 720px;

          margin: 14px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.64
            );

          line-height: 1.7;
        }

        /* =============================
           IMPACT
        ============================= */

        .impact-section {
          padding: 48px 0 24px;

          background: white;
        }

        .impact-grid {
          margin-top: 28px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          border-top:
            1px solid
            var(
              --foundation-border
            );

          border-bottom:
            1px solid
            var(
              --foundation-border
            );
        }

        .impact-grid article {
          padding: 34px 25px;

          border-right:
            1px solid
            var(
              --foundation-border
            );
        }

        .impact-grid article:last-child {
          border-right: 0;
        }

        .impact-grid strong {
          display: block;

          color: var(
            --foundation-dark
          );

          font-size: clamp(
            28px,
            3.6vw,
            47px
          );

          letter-spacing: -0.05em;
        }

        .impact-grid h3 {
          margin: 13px 0 0;

          font-size: 15px;
        }

        .impact-grid p {
          margin: 10px 0 0;

          color: var(
            --foundation-muted
          );

          font-size: 13px;

          line-height: 1.6;
        }

        .impact-link-row {
          margin-top: 16px;
        }

        .impact-link {
          margin-top: 0;
        }

        .network-panel {
          margin-top: 18px;

          padding: 30px;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 30px;

          border-radius: 22px;

          background: var(
            --foundation-dark
          );

          color: white;
        }

        .network-panel h3 {
          max-width: 680px;

          margin: 0;

          font-size: clamp(
            26px,
            4vw,
            40px
          );

          line-height: 1.06;

          letter-spacing: -0.04em;
        }

        .live-network-button {
          min-height: 48px;

          padding: 0 17px;

          display: inline-flex;
          align-items: center;

          gap: 8px;

          flex-shrink: 0;

          border:
            1px solid
            rgba(
              142,
              224,
              166,
              0.25
            );

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.07
            );

          color: white !important;

          font-size: 11px;
          font-weight: 800;
        }

        .live-network-button strong {
          color: #8ee0a6;

          font-size: 8px;

          letter-spacing: 0.12em;
        }

        .live-pulse {
          position: relative;

          width: 16px;
          height: 16px;

          display: grid;

          place-items: center;
        }

        .live-pulse::before {
          content: "";

          position: absolute;

          inset: 1px;

          border:
            1px solid
            rgba(
              142,
              224,
              166,
              0.5
            );

          border-radius: 50%;

          animation:
            livePulse
            2s ease-out
            infinite;
        }

        .live-pulse span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 8px
            rgba(
              114,
              233,
              155,
              0.9
            );
        }

        @keyframes livePulse {
          0% {
            transform: scale(0.5);

            opacity: 0.9;
          }

          80%,
          100% {
            transform: scale(1.6);

            opacity: 0;
          }
        }

        /* =============================
           FEATURED STORY
        ============================= */

        .stories-section {
          padding: 28px 0 72px;
          background: var(--foundation-cream);
        }

        .featured-story {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: center;
        }

        .featured-story-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 24px;
          background: white;
        }

        .featured-story-image img {
          object-fit: cover;
          object-position: center;
        }

        .featured-story-copy {
          max-width: 620px;
        }

        .story-impact-link-row {
          margin-top: 8px;
        }

        .story-impact-link {
          margin-top: 0;
        }

        .featured-story-copy h2 {
          margin: 0;
          font-size: clamp(42px, 6vw, 70px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .featured-story-copy p {
          max-width: 620px;
          margin: 18px 0 0;
          color: var(--foundation-muted);
          font-size: 16px;
          line-height: 1.75;
        }

        .featured-story-copy .story-note {
          padding-top: 18px;
          border-top: 1px solid var(--foundation-border);
          color: var(--foundation-dark);
        }


        .work-explore {
          display: flex;
          justify-content: flex-end;
        }

        .work-explore .text-link {
          margin-top: 22px;
        }

        /* =============================
           CIRCULAR
        ============================= */

        .circular-section {
          padding: 0 0 72px;
        }

        .model-circular {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }

        .circular-heading {
          max-width: 820px;
        }

        .circular-video {
          position: relative;

          width: 100%;

          aspect-ratio: 16 / 9;

          margin-top: 28px;

          overflow: hidden;

          border-radius: 24px;

          background: #071a13;
        }

        .circular-video video {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .circular-points {
          margin-top: 35px;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 30px;
        }

        .circular-points article {
          padding-top: 20px;

          border-top:
            1px solid
            var(
              --foundation-border
            );
        }

        .circular-points h3 {
          margin: 13px 0 0;

          font-size: 21px;
        }

        .circular-points p {
          margin: 10px 0 0;

          color: var(
            --foundation-muted
          );

          font-size: 13px;

          line-height: 1.65;
        }

        /* =============================
           SUPPORTERS
        ============================= */

        .supporters-section {
          padding: 100px 0;

          background: #f1f6f1;
        }

        .supporters-heading {
          max-width: 850px;
        }

        .supporters-grid {
          margin-top: 50px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 14px;
        }

        .supporter-card {
          position: relative;

          height: 140px;

          border:
            1px solid
            var(
              --foundation-border
            );

          border-radius: 16px;

          background: white;

          overflow: hidden;
        }

        .supporter-card img {
          padding: 25px;

          object-fit: contain;
        }

        /* =============================
           FINAL CTA
        ============================= */

        .final-cta {
          padding: 90px 0;

          background: #168147;

          color: white;
        }

        .final-cta-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            auto;

          gap: 50px;

          align-items: center;
        }

        .final-cta h2 {
          max-width: 760px;

          margin: 0;

          font-size: clamp(
            40px,
            6vw,
            68px
          );

          font-weight: 600;

          letter-spacing: -0.055em;

          line-height: 0.98;
        }

        .final-cta p {
          max-width: 680px;

          margin: 22px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 15px;

          line-height: 1.7;
        }

        .final-actions {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        /* =============================
           FOOTER
        ============================= */

        .site-footer {
          background: #10281f;
          color: white;
          padding: 64px 0 24px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: minmax(280px, 1.7fr) repeat(3, minmax(140px, 1fr));
          gap: 48px;
          align-items: start;
        }

        .footer-intro h2 {
          margin: 0;
          max-width: 360px;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.05;
        }

        .footer-intro p {
          max-width: 420px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
        }

        .footer-column h3 {
          margin: 0 0 5px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .footer-column a,
        .footer-column p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 13px;
          line-height: 1.55;
          text-decoration: none;
          transition: color 160ms ease;
        }

        .footer-column a:hover {
          color: white;
        }

        .footer-contact p {
          max-width: 230px;
        }

        .footer-contact a:last-child {
          overflow-wrap: anywhere;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-top: 54px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .footer-bottom p {
          margin: 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          line-height: 1.5;
        }

        /* =============================
           TABLET
        ============================= */

        @media (
          max-width: 1080px
        ) {
          .why-layout,
          .split-heading,
          .technology-layout,
          .subscription-card {
            grid-template-columns: 1fr;

            gap: 40px;
          }

          .why-grid {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .impact-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .impact-grid article:nth-child(2) {
            border-right: 0;
          }

          .impact-grid article:nth-child(-n + 2) {
            border-bottom:
              1px solid
              var(
                --foundation-border
              );
          }

          .stories-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .story-card:last-child {
            grid-column: 1 / -1;
          }

          .supporters-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .final-cta-layout {
            grid-template-columns: 1fr;
          }

          .final-actions {
            flex-direction: row;
          }

        }

        /* =============================
           MOBILE
        ============================= */

        @media (
          max-width: 760px
        ) {
          .home-container {
            width: calc(
              100% - 30px
            );
          }

          .why-simple {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .why-actions {
            margin-top: 24px;
            gap: 18px;
          }

          .hero {
            width: calc(100% - 20px);
            min-height: 0;
            height: auto;
            aspect-ratio: 4 / 3;

            margin: 8px auto 0;
            border-radius: 16px;

            display: block;
          }

          .hero-content-desktop {
            display: none;
          }

          .hero-overlay {
            display: none;
          }

          .hero-media video,
          .hero-image {
            object-fit: cover;
            object-position: center;
          }

          .mobile-hero-copy {
            display: block;
            padding: 26px 0 34px;
            background: var(--foundation-cream);
          }

          .mobile-hero-copy .eyebrow {
            margin-bottom: 12px;
          }

          .mobile-hero-copy h1 {
            max-width: 680px;
            margin: 0;
            color: var(--foundation-dark);
            font-size: 36px;
            font-weight: 600;
            letter-spacing: -0.045em;
            line-height: 1.02;
          }

          .mobile-hero-copy p {
            max-width: 620px;
            margin: 18px 0 0;
            color: var(--foundation-muted);
            font-size: 15px;
            line-height: 1.65;
          }

          .mobile-hero-actions {
            margin-top: 22px;
          }

          .mobile-outline-button {
            border: 1px solid var(--foundation-border);
            color: var(--foundation-dark) !important;
            background: transparent;
          }

          .mobile-hero-dots {
            margin-top: 20px;
          }

          .mobile-hero-dots .hero-dot {
            background: rgba(16, 40, 31, 0.25);
          }

          .mobile-hero-dots .hero-dot.active {
            background: var(--foundation-green);
          }

          .hero-overlay {
            background:
              linear-gradient(
                0deg,
                rgba(
                  4,
                  34,
                  25,
                  0.94
                )
                  0%,
                rgba(
                  4,
                  34,
                  25,
                  0.7
                )
                  58%,
                rgba(
                  4,
                  34,
                  25,
                  0.2
                )
                  100%
              );
          }

          .hero-content {
            padding: 42px 0;
          }

          .hero h1 {
            max-width: 100%;

            font-size: 52px;
          }

          .hero-content > p {
            font-size: 15px;
          }

          .hero-actions {
            flex-direction: column;

            align-items: stretch;
          }

          .hero-actions .button {
            width: 100%;
          }

          .why-section,
          .technology-section,
          .supporters-section {
            padding: 54px 0;
          }

          .impact-section {
            padding: 32px 0 16px;
          }

          .impact-grid {
            margin-top: 22px;
          }

          .impact-link-row {
            margin-top: 12px;
          }

          .network-panel {
            margin-top: 14px;
          }

          .work-section {
            padding: 18px 0 18px;
          }

          .stories-section {
            padding: 18px 0 46px;
          }

          .section-title {
            font-size: 40px;
          }

          .section-copy {
            font-size: 15px;
          }

          .why-grid {
            margin-top: 8px;

            grid-template-columns: 1fr;
          }

          .why-card {
            padding:
              20px 0;
          }

          .work-list {
            margin-top: 18px;
          }

          .work-list article {
            grid-template-columns:
              45px
              1fr;

            gap: 15px;
          }

          .work-list article p {
            grid-column: 2;
          }

          .subscription-section {
            padding: 0 0 48px;
          }

          .subscription-card {
            padding: 24px 20px;

            border-radius: 20px;
          }

          .subscription-card h2 {
            font-size: 38px;
          }

          .fund-grid {
            grid-template-columns: 1fr;
          }

          .technology-bottom {
            grid-template-columns: 1fr;
            padding: 20px;
          }

          .impact-grid {
            grid-template-columns: 1fr;
          }

          .impact-grid article {
            border-right: 0;

            border-bottom:
              1px solid
              var(
                --foundation-border
              );
          }

          .impact-grid article:last-child {
            border-bottom: 0;
          }

          .network-panel {
            flex-direction: column;

            align-items: flex-start;
          }

          .live-network-button {
            width: 100%;

            justify-content: center;
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .story-card:last-child {
            grid-column: auto;
          }

          .story-image {
            height: 250px;
          }

          .why-section {
            padding: 28px 0 28px;
          }

          .circular-section {
            padding: 0 0 48px;
          }

          .model-circular {
            margin-top: 0;
            padding-top: 0;
          }

          .circular-video {
            margin-top: 20px;
            border-radius: 18px;
          }

          .circular-points {
            margin-top: 24px;
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .supporters-grid {
            grid-template-columns:
              repeat(2, 1fr);

            gap: 10px;
          }

          .supporter-card {
            height: 110px;
          }

          .supporter-card img {
            padding: 18px;
          }

          .final-cta {
            padding: 52px 0;
          }

          .final-cta h2 {
            font-size: 44px;
          }

          .final-actions {
            flex-direction: column;

            align-items: stretch;
          }

          .final-actions .button {
            width: 100%;
          }

          .featured-story {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .featured-story-image {
            width: 100%;
            min-height: 0;
            aspect-ratio: 4 / 3;
            border-radius: 18px;
          }

          .featured-story-copy h2 {
            font-size: 44px;
          }

          .featured-story-copy p {
            font-size: 15px;
            line-height: 1.65;
          }

          .access-message {
            margin-top: 48px;
            padding-top: 38px;
          }

          .work-explore {
            justify-content: flex-start;
          }

        }

        @media (max-width: 800px) {
          .site-footer {
            padding: 44px 0 20px;
          }

          .footer-main {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 34px 24px;
          }

          .footer-intro {
            grid-column: 1 / -1;
          }

          .footer-intro h2 {
            font-size: 25px;
          }

          .footer-intro p {
            margin-top: 14px;
          }

          .footer-contact {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 6px;
            margin-top: 34px;
            padding-top: 17px;
          }
        }

        @media (
          max-width: 410px
        ) {
          .hero h1 {
            font-size: 42px;
          }

          .mobile-hero-copy h1 {
            font-size: 32px;
          }

          .section-title {
            font-size: 35px;
          }
        }
      `}</style>
    </main>
  );
}