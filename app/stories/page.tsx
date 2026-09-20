"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FOUNDATION_PHONE_DISPLAY = "+234 906 244 2470";
const FOUNDATION_PHONE = "+2349062442470";
const FOUNDATION_WHATSAPP = "2349062442470";
const FOUNDATION_EMAIL =
  "info@tedisevergreenfoundation.org.ng";

const FOUNDATION_ADDRESS =
  "20 Lumper Alam Avenue, Makurdi, Benue State, Nigeria";

const WHATSAPP_MESSAGE =
  "Hello TEDIS Evergreen Foundation, I would like to learn more about your work.";

export default function StoriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const handleTestimonyTimeUpdate = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;

    if (video.currentTime >= 25) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <main className="stories-page">
      {/* NAVIGATION */}
      <header className="foundation-nav">
        <div className="nav-inner">
          <Link
            href="/"
            className="nav-logo"
            aria-label="TEDIS Evergreen Foundation home"
          >
            <Image
              src="/logo.jpeg"
              alt="TEDIS Evergreen Foundation"
              width={180}
              height={70}
              priority
            />
          </Link>

          <nav className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/our-work">Our Work</Link>
            <Link href="/impact">Impact</Link>
            <Link
              href="/stories"
              className="active-link"
            >
              Stories
            </Link>
          </nav>

          <div className="nav-actions">
            <Link
              href="/energy-view"
              className="network-button"
            >
              <span className="live-dot" />
              Community Network
            </Link>

            <Link
              href="/donate"
              className="donate-nav"
            >
              Donate
            </Link>

            <button
              type="button"
              className="menu-button"
              aria-label="Open menu"
              onClick={() =>
                setMobileMenuOpen(
                  (current) => !current
                )
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/our-work">Our Work</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/stories">Stories</Link>
            <Link href="/energy-view">
              Community Energy Network
            </Link>
            <Link href="/contact">
              Partner With Us
            </Link>
            <Link href="/donate">Donate</Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-image">
          <Image
            src="/frame0.jpeg"
            alt="Community clinic reached through clean energy"
            fill
            priority
            sizes="100vw"
            className="cover"
          />
        </div>

        <div className="hero-overlay" />

        <div className="hero-inner">
          <p className="eyebrow light">
            STORIES FROM THE PEOPLE WE SERVE
          </p>

          <h1>
            Energy changes
            <br />
            people&apos;s lives.
          </h1>

          <p>
            Behind every system is a person,
            a family, a livelihood or a
            community facility trying to move
            forward.
          </p>

          <a
            href="#clinic"
            className="hero-button"
          >
            Read their stories
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="story-introduction">
        <div className="container intro-inner">
          <p className="eyebrow">
            BEYOND THE NUMBERS
          </p>

          <h2>
            Energy poverty looks different
            when you meet the people living
            through it.
          </h2>

          <p className="intro-text">
            It can look like a clinic facing
            darkness when a patient arrives at
            night. A business owner watching
            part of each day&apos;s earnings
            disappear into petrol. A tailor
            stopping work before she is ready.
            Or a barber surrounded by the noise
            and fumes of the generator he needs
            to earn a living.
          </p>
        </div>
      </section>

      {/* CLINIC */}
      <article
        className="story-block"
        id="clinic"
      >
        <div className="container story-grid">
          <div className="story-image-card">
            <div className="story-image">
              <Image
                src="/frame0.jpeg"
                alt="Community clinic supported with clean energy"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="cover"
              />
            </div>

            <div className="image-caption">
              <span>HEALTH &amp; ENERGY</span>
              A community clinic
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow">
              A CLINIC&apos;S STORY
            </p>

            <h2>
              The patients did not stop
              coming when the lights went out.
            </h2>

            <p>
              By day, the clinic could receive
              people, attend to patients and
              provide basic healthcare to the
              community around it.
            </p>

            <p>
              Night was different.
            </p>

            <p>
              Emergencies do not wait for
              morning. A child can become sick
              after dark. Someone can fall
              seriously ill in the middle of
              the night. But for a poorly
              funded community clinic,
              electricity had become one more
              resource it could not always
              count on.
            </p>

            <p>
              Its previous energy source was
              damaged. Replacing and maintaining
              it was difficult for a facility
              already operating with limited
              funding.
            </p>

            <p>
              When darkness came, so did a
              painful limitation: the clinic
              could not reliably attend to
              emergencies at night.
            </p>

            <div className="quote-box">
              Illness did not wait for
              electricity to return. Neither
              could the people who depended
              on the clinic.
            </div>

            <p>
              TEDIS Evergreen Foundation
              provided a clean energy solution
              that restored dependable
              electricity to the facility.
            </p>

            <p>
              What returned was more than
              lighting. The clinic regained the
              ability to remain useful after
              sunset and respond better when
              people arrived needing care.
            </p>

            <p className="story-ending">
              In a clinic, reliable electricity
              can mean being ready when someone
              needs help, not only when the sun
              is shining.
            </p>
          </div>
        </div>
      </article>

      {/* ALICE */}
      <article className="story-block soft-background">
        <div className="container story-grid reverse">
          <div className="story-image-card">
            <div className="story-image">
              <Image
                src="/frame6.jpeg"
                alt="Alice at her registration centre"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="cover"
              />
            </div>

            <div className="image-caption">
              <span>LIVELIHOODS</span>
              Alice
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow">
              MEET ALICE
            </p>

            <h2>
              Her generator is still beside
              her. Six months later, it remains
              silent.
            </h2>

            <p>
              Alice runs a registration centre.
              Her work depends on electricity.
              Customers come to her for online
              registrations and other digital
              services, and when there is no
              power, her business cannot simply
              continue as normal.
            </p>

            <p>
              Before reliable clean energy,
              Alice had the same choice faced
              by many small business owners:
              stop working or start the
              generator.
            </p>

            <p>
              Starting the generator meant
              buying petrol. Again and again,
              part of what she earned had to
              return to fuel just to keep her
              business open.
            </p>

            <div className="quote-box dark">
              She needed electricity to earn
              money, but she also had to keep
              spending money just to create
              that electricity.
            </div>

            <p>
              Through our clean energy
              programme, Alice gained access to
              reliable electricity without the
              burden of purchasing an expensive
              solar system upfront.
            </p>

            <p>
              Today, her generator is still
              sitting beside her business.
            </p>

            <p>
              But for more than{" "}
              <strong>six months</strong>, she
              has not needed to use it.
            </p>

            <p>
              She can focus more on serving
              customers and less on searching
              for petrol to keep the day going.
            </p>

            <p className="story-ending">
              Sometimes progress is quiet.
              Alice&apos;s is a generator sitting
              beside her business that no
              longer needs to start.
            </p>
          </div>
        </div>
      </article>

      {/* MRS ERDO */}
      <article className="story-block">
        <div className="container story-grid">
          <div className="story-image-card">
            <div className="story-image">
              <Image
                src="/frame8.jpeg"
                alt="Mrs. Erdo, a tailor supported with clean energy"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                className="cover"
              />
            </div>

            <div className="image-caption">
              <span>WOMEN &amp; LIVELIHOODS</span>
              Mrs. Erdo
            </div>
          </div>

          <div className="story-copy">
            <p className="eyebrow">
              MEET MRS. ERDO
            </p>

            <h2>
              More hours to sew.
              More light for her children
              to read.
            </h2>

            <p>
              Mrs. Erdo is a tailor. Her
              livelihood depends on the hours
              she can work and the customers
              she can serve.
            </p>

            <p>
              But as daylight faded, unreliable
              electricity often shortened her
              working day.
            </p>

            <p>
              A generator could keep the shop
              running, but Mrs. Erdo had become
              tired of the cycle: buying fuel,
              enduring the noise and spending
              part of what she earned simply to
              continue sewing.
            </p>

            <p>
              Sometimes she closed earlier than
              she wanted, not because the work
              was finished, but because the
              electricity needed to continue
              had become too expensive or
              inconvenient.
            </p>

            <div className="quote-box">
              For Mrs. Erdo, darkness was not
              only the end of the day. It could
              also mean the end of earning for
              that day.
            </div>

            <p>
              TED Evergreen Smart Energy 700
              changed that rhythm.
            </p>

            <p>
              Through the community energy
              model, she gained access to clean
              electricity without carrying the
              full upfront cost of a solar
              system.
            </p>

            <p>
              Her subscription costs far less
              than continually relying on fuel,
              and she can now keep working
              later.
            </p>

            <p>
              But the impact follows her beyond
              the shop.
            </p>

            <p>
              At the end of the day, Mrs. Erdo
              can take the system home, where
              the same electricity that helped
              her earn during the day gives her
              children light to read and study
              at night.
            </p>

            <div className="day-night">
              <div>
                <span>AT WORK</span>
                <strong>
                  More productive hours for
                  her tailoring business.
                </strong>
              </div>

              <div>
                <span>AT HOME</span>
                <strong>
                  More time for her children
                  to read after dark.
                </strong>
              </div>
            </div>

            <p className="story-ending">
              One source of energy is helping
              Mrs. Erdo create more time to
              earn and more time for her
              children to learn.
            </p>
          </div>
        </div>
      </article>

      {/* BARBER STORY */}
      <section className="barber-section">
        <div className="container">
          <div className="barber-heading">
            <p className="eyebrow light">
              IN HIS OWN WORDS
            </p>

            <h2>
              He was spending ₦4,500
              on fuel to keep his
              business running.
            </h2>

            <p>
              For a barber, electricity is part
              of the tools of the trade. But
              relying on petrol meant the cost,
              noise and emissions of a generator
              were part of the working day too.
            </p>
          </div>

          <div className="barber-grid">
            <div className="video-shell">
              <video
                className="testimony-video"
                autoPlay
                muted
                controls
                playsInline
                preload="auto"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onTimeUpdate={
                  handleTestimonyTimeUpdate
                }
                onContextMenu={(event) =>
                  event.preventDefault()
                }
              >
                <source
                  src="/testimony1.mp4"
                  type="video/mp4"
                />
                Your browser does not support
                the video tag.
              </video>
            </div>

            <div className="barber-story">
              <p>
                He was spending about{" "}
                <strong>₦4,500</strong>,
                approximately{" "}
                <strong>$3.50</strong>, on fuel
                to keep his business operating.
              </p>

              <p>
                That expense came from the same
                business that was supposed to
                provide his income.
              </p>

              <p>
                The cost was not only financial.
                The generator produced noise
                beside the place where he
                worked and exhaust emissions
                around the environment where
                customers came for service.
              </p>

              <p>
                Access to clean electricity has
                helped reduce his dependence on
                fuel, reduce the noise around
                his business and reduce the
                emissions associated with
                generator use.
              </p>

              <p className="story-ending light-ending">
                His business still needs
                electricity. What has changed
                is what he has to sacrifice to
                get it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL MESSAGE */}
      <section className="meaning-section">
        <div className="container meaning-grid">
          <div>
            <p className="eyebrow">
              WHAT ENERGY CAN CHANGE
            </p>

            <h2>
              These are not stories
              about solar systems.
            </h2>
          </div>

          <div>
            <p>
              They are stories about a clinic
              being useful after dark, Alice
              keeping more of what she earns,
              Mrs. Erdo having more productive
              hours and a barber moving away
              from the cost, noise and emissions
              of petrol-generated electricity.
            </p>

            <p className="meaning-strong">
              We measure our work by what
              energy makes possible in
              people&apos;s lives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-image">
          <Image
            src="/frame3.jpeg"
            alt="Community reached through clean energy"
            fill
            sizes="100vw"
            className="cover"
          />
        </div>

        <div className="cta-overlay" />

        <div className="container cta-inner">
          <p className="eyebrow light">
            HELP CREATE THE NEXT STORY
          </p>

          <h2>
            More people are still
            waiting for energy
            that works for them.
          </h2>

          <p>
            Your support helps us bring
            affordable clean energy to
            households, livelihoods and
            community facilities that
            conventional solutions continue
            to leave behind.
          </p>

          <div className="cta-buttons">
            <Link
              href="/donate"
              className="white-button"
            >
              Donate
            </Link>

            <Link
              href="/contact"
              className="transparent-button"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foundation-footer">
        <div className="container footer-grid">
          <div className="footer-brand-text">
            <h3>
              TEDIS Evergreen Foundation
            </h3>

            <p>
              Bringing clean energy, circular
              recovery and technology to
              hard-to-reach communities.
            </p>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <Link href="/about">About</Link>
            <Link href="/our-work">
              Our Work
            </Link>
            <Link href="/impact">Impact</Link>
            <Link href="/stories">
              Stories
            </Link>
            <Link href="/energy-view">
              Community Network
            </Link>
            <Link href="/donate">
              Donate
            </Link>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>

            <a
              href={`tel:${FOUNDATION_PHONE}`}
            >
              {FOUNDATION_PHONE_DISPLAY}
            </a>

            <a
              href={`https://wa.me/${FOUNDATION_WHATSAPP}?text=${encodeURIComponent(
                WHATSAPP_MESSAGE
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>

            <a
              href={`mailto:${FOUNDATION_EMAIL}`}
            >
              {FOUNDATION_EMAIL}
            </a>

            <p>{FOUNDATION_ADDRESS}</p>
          </div>

          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps?q=20%20Lumper%20Alam%20Avenue%2C%20Makurdi%2C%20Benue%20State%2C%20Nigeria&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TEDIS Evergreen Foundation location"
            />

            <a
              href="https://maps.app.goo.gl/ziXt7R9AjzUAwV928?g_st=ipc"
              target="_blank"
              rel="noreferrer"
              className="map-link"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          © {new Date().getFullYear()} TEDIS
          Evergreen Foundation. All rights
          reserved.
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --cream: #fbfaf6;
          --white: #ffffff;
          --evergreen: #153229;
          --evergreen-dark: #0c251d;
          --green: #168147;
          --soft-green: #edf5ee;
          --text: #153229;
          --muted: #627069;
          --border: rgba(21, 50, 41, 0.14);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--cream);
          color: var(--text);
        }

        .stories-page {
          overflow: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .container {
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
        }

        .cover {
          object-fit: cover;
        }

        .eyebrow {
          margin: 0 0 16px;
          color: var(--green);
          font-size: 11px;
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: 0.16em;
        }

        .eyebrow.light {
          color: #abe2b9;
        }

        /* NAV */

        .foundation-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.97);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(16px);
        }

        .nav-inner {
          width: min(1240px, calc(100% - 40px));
          min-height: 76px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
        }

        .nav-logo img {
          width: 145px;
          height: 54px;
          object-fit: contain;
        }

        .desktop-nav {
          margin-left: auto;
          display: flex;
          gap: 28px;
          align-items: center;
        }

        .desktop-nav a {
          font-size: 14px;
          font-weight: 700;
        }

        .desktop-nav .active-link,
        .desktop-nav a:hover {
          color: var(--green);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .network-button {
          min-height: 42px;
          padding: 0 15px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #edf6ef;
          font-size: 11px;
          font-weight: 850;
          white-space: nowrap;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #20a759;
        }

        .donate-nav {
          min-height: 42px;
          padding: 0 19px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          background: var(--evergreen);
          color: white;
          font-size: 13px;
          font-weight: 850;
        }

        .menu-button {
          display: none;
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: #edf3ef;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
        }

        .menu-button span {
          width: 16px;
          height: 2px;
          background: var(--evergreen);
        }

        .mobile-menu {
          display: none;
        }

        /* HERO */

        .hero {
          position: relative;
          min-height: 600px;
          margin-top: 76px;
          display: flex;
          align-items: center;
          color: white;
        }

        .hero-image,
        .hero-overlay {
          position: absolute;
          inset: 0;
        }

        .hero-overlay {
          background: linear-gradient(
            90deg,
            rgba(7, 28, 20, 0.86),
            rgba(7, 28, 20, 0.58) 50%,
            rgba(7, 28, 20, 0.12)
          );
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
        }

        .hero h1 {
          max-width: 760px;
          margin: 0;
          font-size: clamp(52px, 6.5vw, 82px);
          line-height: 0.97;
          letter-spacing: -0.05em;
          font-weight: 620;
        }

        .hero-inner > p:not(.eyebrow) {
          max-width: 520px;
          margin: 26px 0 0;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.84);
        }

        .hero-button {
          min-height: 50px;
          margin-top: 30px;
          padding: 0 22px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          background: white;
          color: var(--evergreen);
          font-size: 14px;
          font-weight: 850;
        }

        /* INTRO */

        .story-introduction {
          padding: 90px 0;
        }

        .intro-inner {
          max-width: 850px;
          text-align: center;
        }

        .intro-inner h2 {
          margin: 0;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 620;
        }

        .intro-text {
          max-width: 700px;
          margin: 28px auto 0;
          font-size: 17px;
          line-height: 1.8;
          color: var(--muted);
        }

        /* STORY BLOCKS */

        .story-block {
          padding: 85px 0;
          background: white;
        }

        .story-block.soft-background {
          background: #f1f6f1;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 70px;
          align-items: start;
        }

        .story-grid.reverse {
          grid-template-columns: 1.08fr 0.92fr;
        }

        .story-grid.reverse .story-image-card {
          order: 2;
        }

        .story-grid.reverse .story-copy {
          order: 1;
        }

        .story-image-card {
          position: sticky;
          top: 110px;
        }

        .story-image {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
          border-radius: 22px;
          background: #dde6df;
        }

        .image-caption {
          padding: 16px 4px 0;
          font-size: 19px;
          font-weight: 700;
        }

        .image-caption span {
          display: block;
          margin-bottom: 5px;
          color: var(--green);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .story-copy {
          max-width: 610px;
        }

        .story-copy h2 {
          margin: 0 0 30px;
          font-size: clamp(38px, 4.1vw, 57px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 620;
        }

        .story-copy > p {
          margin: 0 0 19px;
          font-size: 16.5px;
          line-height: 1.8;
          color: #57665f;
        }

        .story-copy strong {
          color: var(--evergreen);
        }

        .quote-box {
          margin: 30px 0;
          padding: 24px 26px;
          border-left: 4px solid var(--green);
          background: var(--soft-green);
          color: var(--evergreen);
          font-size: 20px;
          line-height: 1.5;
          font-weight: 700;
        }

        .quote-box.dark {
          background: var(--evergreen);
          color: white;
        }

        .story-copy .story-ending {
          margin-top: 30px;
          padding-top: 26px;
          border-top: 1px solid var(--border);
          color: var(--evergreen);
          font-size: 19px;
          line-height: 1.6;
          font-weight: 750;
        }

        .day-night {
          margin: 30px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .day-night > div {
          padding: 22px;
          border-radius: 14px;
          background: var(--soft-green);
        }

        .day-night span {
          display: block;
          margin-bottom: 8px;
          color: var(--green);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .day-night strong {
          display: block;
          font-size: 15px;
          line-height: 1.5;
        }

        /* BARBER */

        .barber-section {
          padding: 95px 0;
          background: var(--evergreen-dark);
          color: white;
        }

        .barber-heading {
          max-width: 830px;
          margin-bottom: 44px;
        }

        .barber-heading h2 {
          margin: 0;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1;
          letter-spacing: -0.045em;
          font-weight: 620;
        }

        .barber-heading > p:not(.eyebrow) {
          max-width: 620px;
          margin: 23px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.68);
        }

        .barber-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }

        .video-shell {
          width: 100%;
          max-width: 520px;
          overflow: hidden;
          border-radius: 18px;
          background: black;
        }

        .testimony-video {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          background: black;
        }

        .barber-story p {
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.78;
          color: rgba(255, 255, 255, 0.7);
        }

        .barber-story strong {
          color: white;
        }

        .light-ending {
          color: white !important;
          border-top-color: rgba(
            255,
            255,
            255,
            0.15
          ) !important;
        }

        /* MEANING */

        .meaning-section {
          padding: 90px 0;
          background: #eef5ef;
        }

        .meaning-grid {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 75px;
          align-items: center;
        }

        .meaning-grid h2 {
          margin: 0;
          font-size: clamp(42px, 5vw, 62px);
          line-height: 1.02;
          letter-spacing: -0.045em;
          font-weight: 620;
        }

        .meaning-grid > div:last-child p {
          margin: 0 0 20px;
          font-size: 17px;
          line-height: 1.8;
          color: #5c6c65;
        }

        .meaning-strong {
          color: var(--evergreen) !important;
          font-size: 20px !important;
          font-weight: 750;
        }

        /* CTA */

        .cta-section {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          color: white;
        }

        .cta-image,
        .cta-overlay {
          position: absolute;
          inset: 0;
        }

        .cta-overlay {
          background: linear-gradient(
            90deg,
            rgba(7, 28, 20, 0.9),
            rgba(7, 28, 20, 0.55) 60%,
            rgba(7, 28, 20, 0.16)
          );
        }

        .cta-inner {
          position: relative;
          z-index: 2;
        }

        .cta-inner h2 {
          max-width: 730px;
          margin: 0;
          font-size: clamp(44px, 5.5vw, 67px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 620;
        }

        .cta-inner > p:not(.eyebrow) {
          max-width: 540px;
          margin: 24px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-buttons {
          margin-top: 30px;
          display: flex;
          gap: 12px;
        }

        .white-button,
        .transparent-button {
          min-height: 50px;
          padding: 0 22px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 850;
        }

        .white-button {
          background: white;
          color: var(--evergreen);
        }

        .transparent-button {
          border: 1px solid
            rgba(255, 255, 255, 0.65);
        }

        /* FOOTER */

        .foundation-footer {
          padding: 76px 0 24px;
          background: #0b211a;
          color: white;
        }

        .footer-grid {
          display: grid;
          grid-template-columns:
            1.15fr 0.65fr 1fr 1.25fr;
          gap: 48px;
        }

        .footer-brand-text h3 {
          max-width: 270px;
          margin: 0 0 18px;
          font-size: 27px;
        }

        .footer-brand-text p {
          max-width: 270px;
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-column h4 {
          margin: 0 0 8px;
          color: #a7dfb5;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .footer-column a,
        .footer-column p {
          margin: 0;
          color: rgba(255, 255, 255, 0.66);
          font-size: 13px;
          line-height: 1.65;
        }

        .footer-map {
          position: relative;
          min-height: 210px;
          overflow: hidden;
          border-radius: 16px;
        }

        .footer-map iframe {
          display: block;
          min-height: 210px;
        }

        .map-link {
          position: absolute;
          left: 12px;
          bottom: 12px;
          padding: 9px 12px;
          border-radius: 999px;
          background: white;
          color: var(--evergreen);
          font-size: 10px;
          font-weight: 800;
        }

        .footer-bottom {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid
            rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
        }

        /* TABLET */

        @media (max-width: 1000px) {
          .desktop-nav {
            display: none;
          }

          .menu-button {
            display: flex;
          }

          .mobile-menu {
            display: flex;
            padding: 12px 22px 22px;
            flex-direction: column;
            background: white;
          }

          .mobile-menu a {
            padding: 13px 8px;
            border-bottom: 1px solid #edf1ee;
            font-size: 14px;
            font-weight: 700;
          }

          .story-grid,
          .story-grid.reverse,
          .barber-grid,
          .meaning-grid {
            grid-template-columns: 1fr;
            gap: 38px;
          }

          .story-grid.reverse
            .story-image-card,
          .story-grid.reverse .story-copy {
            order: initial;
          }

          .story-image-card {
            position: static;
            max-width: 650px;
          }

          .story-image {
            height: 430px;
          }

          .barber-grid {
            align-items: start;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* MOBILE */

        @media (max-width: 760px) {
          .container {
            width: calc(100% - 30px);
          }

          .nav-inner {
            width: calc(100% - 18px);
            min-height: 62px;
            gap: 7px;
          }

          .nav-logo img {
            width: 112px;
            height: 45px;
          }

          .donate-nav {
            display: none;
          }

          .network-button {
            min-height: 36px;
            padding: 0 9px;
            font-size: 9px;
          }

          .menu-button {
            width: 36px;
            height: 36px;
          }

          .hero {
            min-height: 520px;
            margin-top: 62px;
            align-items: flex-end;
          }

          .hero-overlay {
            background: linear-gradient(
              0deg,
              rgba(7, 28, 20, 0.92),
              rgba(7, 28, 20, 0.52) 65%,
              rgba(7, 28, 20, 0.1)
            );
          }

          .hero-inner {
            width: calc(100% - 30px);
            padding-bottom: 45px;
          }

          .hero h1 {
            font-size: 43px;
          }

          .hero-inner > p:not(.eyebrow) {
            font-size: 15px;
          }

          .story-introduction {
            padding: 62px 0;
          }

          .intro-inner {
            text-align: left;
          }

          .intro-inner h2 {
            font-size: 36px;
          }

          .intro-text {
            font-size: 15.5px;
          }

          .story-block {
            padding: 58px 0;
          }

          .story-grid,
          .story-grid.reverse {
            gap: 28px;
          }

          .story-image-card {
            max-width: 100%;
          }

          .story-image {
            height: 310px;
            border-radius: 16px;
          }

          .image-caption {
            padding-top: 12px;
            font-size: 17px;
          }

          .story-copy h2 {
            font-size: 34px;
            margin-bottom: 24px;
          }

          .story-copy > p {
            font-size: 15.5px;
            line-height: 1.72;
          }

          .quote-box {
            margin: 25px 0;
            padding: 21px;
            font-size: 18px;
          }

          .story-copy .story-ending {
            margin-top: 25px;
            padding-top: 22px;
            font-size: 17px;
          }

          .day-night {
            grid-template-columns: 1fr;
          }

          .barber-section {
            padding: 65px 0;
          }

          .barber-heading {
            margin-bottom: 30px;
          }

          .barber-heading h2 {
            font-size: 36px;
          }

          .video-shell {
            max-width: 100%;
            border-radius: 12px;
          }

          .barber-story p {
            font-size: 15px;
          }

          .meaning-section {
            padding: 65px 0;
          }

          .meaning-grid {
            gap: 25px;
          }

          .meaning-grid h2 {
            font-size: 36px;
          }

          .meaning-grid > div:last-child p {
            font-size: 15.5px;
          }

          .cta-section {
            min-height: 480px;
          }

          .cta-inner h2 {
            font-size: 39px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .foundation-footer {
            padding-top: 55px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 420px) {
          .network-button {
            max-width: 126px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hero h1 {
            font-size: 40px;
          }

          .story-image {
            height: 280px;
          }

          .story-copy h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </main>
  );
}