"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer/Footer";

export default function AboutPage() {
  return (
    <>
      <main className="tedis-about-page">
        {/* HERO */}
        <section className="tedis-about-hero">
          <div className="tedis-about-container">
            <span className="tedis-about-eyebrow">About Us</span>

            <div className="tedis-about-hero-grid">
              <div className="tedis-about-hero-main">
                <h1>
                  Energy should open doors, not determine who gets left
                  behind.
                </h1>

                <p className="tedis-about-hero-intro">
                  TEDIS Evergreen Foundation is a nonprofit working to
                  expand access to clean, reliable electricity for
                  low-income people and communities that conventional
                  energy solutions struggle to reach.
                </p>
              </div>

              <aside className="tedis-about-purpose">
                <span>Our Purpose</span>

                <p>
                  We use clean energy, technology and circular solutions
                  to remove the barriers between underserved communities
                  and the electricity they need to learn, work, earn and
                  thrive.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* FEATURE IMAGE */}
        <section className="tedis-about-visual-section">
          <div className="tedis-about-visual">
            <Image
              src="/frame6.jpeg"
              alt="Clean energy supporting livelihoods in a community"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1400px"
              className="tedis-about-visual-image"
            />

            <div className="tedis-about-visual-shade" />

            <div className="tedis-about-visual-copy">
              <span>Why We Exist</span>

              <h2>
                Where infrastructure stops,
                <br />
                opportunity should not.
              </h2>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="tedis-about-who">
          <div className="tedis-about-container">
            <div className="tedis-about-section-grid">
              <div className="tedis-about-side-label">
                <span>Who We Are</span>
              </div>

              <div className="tedis-about-section-content">
                <h2>
                  We believe access to electricity can change the
                  direction of a life.
                </h2>

                <div className="tedis-about-copy-columns">
                  <p>
                    Across Nigeria, millions of people still live and
                    work without reliable electricity. For families and
                    small businesses in hard-to-reach communities, the
                    challenge is not simply that electricity solutions do
                    not exist. Too often, the solutions available remain
                    financially or physically out of reach.
                  </p>

                  <p>
                    TEDIS Evergreen Foundation exists to close that gap.
                    We focus on people who are often excluded by high
                    upfront costs, weak infrastructure and the difficulty
                    of delivering and maintaining energy systems in
                    underserved communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="tedis-about-challenge">
          <div className="tedis-about-container">
            <span className="tedis-about-eyebrow tedis-about-eyebrow-light">
              The Challenge
            </span>

            <div className="tedis-about-challenge-heading">
              <h2>
                Energy poverty is about
                <br />
                more than darkness.
              </h2>

              <p>
                When electricity is unreliable or unaffordable, its
                effects reach into education, livelihoods, healthcare,
                digital access and household income.
              </p>
            </div>

            <div className="tedis-about-challenge-grid">
              <article>
                <span className="tedis-about-number">01</span>
                <h3>Infrastructure</h3>
                <p>
                  Many hard-to-reach communities remain beyond the
                  practical reach of conventional electricity
                  infrastructure.
                </p>
              </article>

              <article>
                <span className="tedis-about-number">02</span>
                <h3>Affordability</h3>
                <p>
                  Clean-energy solutions may exist, but high upfront
                  costs prevent many low-income households and
                  microbusinesses from accessing them.
                </p>
              </article>

              <article>
                <span className="tedis-about-number">03</span>
                <h3>Last-mile support</h3>
                <p>
                  Installation alone is not enough. Maintenance,
                  replacement components and technical support must remain
                  accessible after a system reaches a community.
                </p>
              </article>

              <article>
                <span className="tedis-about-number">04</span>
                <h3>Opportunity</h3>
                <p>
                  Without reliable electricity, productive hours shrink,
                  digital tools become harder to use and families and
                  businesses remain dependent on expensive alternatives.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* OUR RESPONSE */}
        <section className="tedis-about-response">
          <div className="tedis-about-container">
            <div className="tedis-about-response-grid">
              <div>
                <span className="tedis-about-eyebrow">Our Response</span>

                <h2>
                  Built around the realities of the communities we serve.
                </h2>
              </div>

              <div className="tedis-about-response-copy">
                <p className="tedis-about-response-lead">
                  We are building an approach where access comes first
                  and long-term sustainability is designed into the
                  solution from the beginning.
                </p>

                <p>
                  Our work combines decentralized clean-energy systems
                  with digital technology, AI and IoT-enabled monitoring
                  to help us understand system performance, identify
                  problems and coordinate support across distributed
                  community energy networks.
                </p>

                <p>
                  Rather than allowing upfront cost to remain the barrier,
                  eligible beneficiaries can access energy systems
                  without paying the full cost of the equipment before
                  receiving electricity. A simple community contribution
                  model helps support maintenance, technical assistance
                  and the infrastructure required to keep systems
                  working.
                </p>

                <Link
                  href="/our-work"
                  className="tedis-about-text-link"
                >
                  Explore How We Work <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="tedis-about-principles">
          <div className="tedis-about-container">
            <div className="tedis-about-principles-heading">
              <span className="tedis-about-eyebrow">
                What Guides Us
              </span>

              <h2>The principles behind the work.</h2>
            </div>

            <div className="tedis-about-principles-list">
              <article>
                <span className="tedis-about-principle-number">
                  01
                </span>

                <h3>Access before ownership</h3>

                <p>
                  A person should not have to afford an entire energy
                  system upfront before they can benefit from clean
                  electricity.
                </p>
              </article>

              <article>
                <span className="tedis-about-principle-number">
                  02
                </span>

                <h3>Design for the last mile</h3>

                <p>
                  We build around the realities of hard-to-reach
                  communities, where infrastructure, income and
                  technical support can all be limited.
                </p>
              </article>

              <article>
                <span className="tedis-about-principle-number">
                  03
                </span>

                <h3>Technology should solve real problems</h3>

                <p>
                  AI, IoT and digital tools matter when they make
                  distributed energy systems easier to understand,
                  maintain and support.
                </p>
              </article>

              <article>
                <span className="tedis-about-principle-number">
                  04
                </span>

                <h3>Keep resources in use</h3>

                <p>
                  The transition to clean energy should also consider
                  what happens to solar and electronic equipment at the
                  end of its useful life.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CIRCULAR */}
        <section className="tedis-about-circular">
          <div className="tedis-about-container">
            <div className="tedis-about-circular-card">
              <div className="tedis-about-circular-copy">
                <span className="tedis-about-eyebrow tedis-about-eyebrow-light">
                  Circular By Design
                </span>

                <h2>
                  Waste should not be the end of the story.
                </h2>

                <p className="tedis-about-circular-intro">
                  Expanding clean energy should not create another
                  environmental problem. Our circular approach considers
                  recovery, responsible recycling and the reinvestment of
                  usable value into expanding sustainable energy access.
                </p>

                <div className="tedis-about-circular-list">
                  <div>
                    <strong>Recover</strong>
                    <p>
                      Identify solar and electronic equipment that should
                      enter responsible recovery pathways.
                    </p>
                  </div>

                  <div>
                    <strong>Recycle</strong>
                    <p>
                      Direct recoverable materials and components toward
                      responsible recycling and reuse pathways.
                    </p>
                  </div>

                  <div>
                    <strong>Reinvest</strong>
                    <p>
                      Use circular thinking to support a cleaner and more
                      sustainable model for expanding energy access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tedis-about-circular-media">
                <video
                  src="/ted_evergreen_circular_battery_story.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="tedis-about-technology">
          <div className="tedis-about-container">
            <div className="tedis-about-technology-grid">
              <div>
                <span className="tedis-about-eyebrow">
                  Technology With Purpose
                </span>

                <h2>
                  Distributed energy needs distributed intelligence.
                </h2>
              </div>

              <div className="tedis-about-technology-copy">
                <p>
                  Reaching communities is only the beginning. Energy
                  systems also need to remain visible, maintainable and
                  responsive after deployment.
                </p>

                <p>
                  We integrate digital technology, AI and IoT into our
                  approach to help understand distributed system
                  performance, identify faults and support better
                  decisions across the network.
                </p>

                <Link
                  href="/energy-view"
                  className="tedis-about-network-link"
                >
                  <span className="tedis-about-live-dot" />
                  <strong>LIVE</strong>
                  Community Network
                  <b>↗</b>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION + VISION */}
        <section className="tedis-about-mission">
          <div className="tedis-about-container">
            <div className="tedis-about-mission-grid">
              <article>
                <span className="tedis-about-eyebrow">
                  Our Mission
                </span>

                <h2>
                  Expand access to clean, reliable energy where it can
                  unlock opportunity.
                </h2>

                <p>
                  We work to remove financial, infrastructure and
                  last-mile barriers that prevent underserved people from
                  accessing electricity.
                </p>
              </article>

              <article>
                <span className="tedis-about-eyebrow">
                  Our Vision
                </span>

                <h2>
                  A future where geography or income does not determine
                  access to energy.
                </h2>

                <p>
                  We envision communities where reliable clean
                  electricity supports learning, livelihoods, digital
                  participation and stronger local economies.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="tedis-about-cta-section">
          <div className="tedis-about-cta">
            <span>Be Part Of What Comes Next</span>

            <h2>
              Help us take reliable clean energy further.
            </h2>

            <div className="tedis-about-cta-buttons">
              <Link
                href="/donate"
                className="tedis-about-cta-primary"
              >
                Support Our Work
              </Link>

              <Link
                href="/contact"
                className="tedis-about-cta-secondary"
              >
                Partner With Us <span>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .tedis-about-page {
          --green: #168147;
          --dark-green: #10281f;
          --deep-green: #10251d;
          --light-green: #edf6ef;
          --text: #151515;
          --muted: #686d69;
          --border: rgba(16, 40, 31, 0.12);
          --off-white: #f7f8f5;

          width: 100%;
          overflow: hidden;
          background: #ffffff;
          color: var(--text);
        }

        .tedis-about-container {
          width: min(calc(100% - 80px), 1360px);
          margin: 0 auto;
        }

        .tedis-about-eyebrow,
        .tedis-about-side-label span {
          display: inline-block;
          margin: 0 0 20px;
          color: var(--green);
          font-size: 11px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .tedis-about-eyebrow-light {
          color: #9ed7b2;
        }

        /* HERO */

        .tedis-about-hero {
          padding: 92px 0 88px;
          background: #ffffff;
        }

        .tedis-about-hero-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.45fr)
            minmax(290px, 0.55fr);
          gap: 90px;
          align-items: end;
        }

        .tedis-about-hero-main h1 {
          max-width: 900px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(54px, 6vw, 88px);
          line-height: 0.96;
          font-weight: 600;
          letter-spacing: -0.055em;
        }

        .tedis-about-hero-intro {
          max-width: 680px;
          margin: 34px 0 0;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.65;
        }

        .tedis-about-purpose {
          padding: 26px 0 4px;
          border-top: 1px solid var(--border);
        }

        .tedis-about-purpose span {
          display: block;
          margin-bottom: 16px;
          color: var(--green);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tedis-about-purpose p {
          margin: 0;
          color: var(--dark-green);
          font-size: 17px;
          line-height: 1.65;
        }

        /* IMAGE */

        .tedis-about-visual-section {
          padding: 0 20px;
          background: #ffffff;
        }

        .tedis-about-visual {
          position: relative;
          width: min(100%, 1440px);
          height: 650px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 22px;
          background: #e8eee9;
        }

        .tedis-about-visual-image {
          object-fit: cover;
          object-position: center;
        }

        .tedis-about-visual-shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(6, 28, 19, 0.65) 0%,
            rgba(6, 28, 19, 0.25) 48%,
            rgba(6, 28, 19, 0.03) 100%
          );
        }

        .tedis-about-visual-copy {
          position: absolute;
          z-index: 2;
          left: 60px;
          bottom: 55px;
          color: #ffffff;
        }

        .tedis-about-visual-copy span {
          display: block;
          margin-bottom: 15px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          opacity: 0.75;
        }

        .tedis-about-visual-copy h2 {
          max-width: 800px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(42px, 5vw, 68px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        /* WHO WE ARE */

        .tedis-about-who {
          padding: 110px 0;
        }

        .tedis-about-section-grid {
          display: grid;
          grid-template-columns: 0.35fr 1.65fr;
          gap: 70px;
        }

        .tedis-about-section-content h2 {
          max-width: 950px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(42px, 4.8vw, 66px);
          line-height: 1;
          font-weight: 600;
          letter-spacing: -0.045em;
        }

        .tedis-about-copy-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          max-width: 950px;
          margin-top: 48px;
        }

        .tedis-about-copy-columns p {
          margin: 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.75;
        }

        /* CHALLENGE */

        .tedis-about-challenge {
          padding: 100px 0;
          background: var(--deep-green);
          color: #ffffff;
        }

        .tedis-about-challenge-heading {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: end;
        }

        .tedis-about-challenge-heading h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(46px, 5vw, 72px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-challenge-heading > p {
          max-width: 500px;
          margin: 0 0 5px;
          color: rgba(255, 255, 255, 0.67);
          font-size: 16px;
          line-height: 1.7;
        }

        .tedis-about-challenge-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 65px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .tedis-about-challenge-grid article {
          min-height: 285px;
          padding: 28px 25px;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
        }

        .tedis-about-challenge-grid article:first-child {
          padding-left: 0;
        }

        .tedis-about-challenge-grid article:last-child {
          border-right: 0;
        }

        .tedis-about-number {
          display: block;
          margin-bottom: 58px;
          color: #8bcfa3;
          font-size: 11px;
          font-weight: 800;
        }

        .tedis-about-challenge-grid h3 {
          margin: 0 0 16px;
          color: #ffffff;
          font-size: 23px;
          font-weight: 600;
        }

        .tedis-about-challenge-grid p {
          margin: 0;
          color: rgba(255, 255, 255, 0.62);
          font-size: 14px;
          line-height: 1.7;
        }

        /* RESPONSE */

        .tedis-about-response {
          padding: 110px 0;
          background: var(--off-white);
        }

        .tedis-about-response-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 100px;
        }

        .tedis-about-response-grid h2 {
          max-width: 730px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(44px, 5vw, 70px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-response-copy {
          padding-top: 30px;
        }

        .tedis-about-response-copy p {
          margin: 0 0 22px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.75;
        }

        .tedis-about-response-copy
          .tedis-about-response-lead {
          color: var(--dark-green);
          font-size: 20px;
          line-height: 1.55;
        }

        .tedis-about-text-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 12px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--green);
          color: var(--green);
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }

        /* PRINCIPLES */

        .tedis-about-principles {
          padding: 105px 0;
          background: #ffffff;
        }

        .tedis-about-principles-heading {
          display: grid;
          grid-template-columns: 0.5fr 1.5fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .tedis-about-principles-heading h2 {
          max-width: 800px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(44px, 5vw, 70px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-principles-list {
          border-top: 1px solid var(--border);
        }

        .tedis-about-principles-list article {
          display: grid;
          grid-template-columns: 90px 0.8fr 1.2fr;
          gap: 30px;
          align-items: start;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
        }

        .tedis-about-principle-number {
          color: var(--green);
          font-size: 11px;
          font-weight: 800;
        }

        .tedis-about-principles-list h3 {
          margin: 0;
          color: var(--dark-green);
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .tedis-about-principles-list p {
          max-width: 600px;
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.7;
        }

        /* CIRCULAR */

        .tedis-about-circular {
          padding: 30px 0 110px;
          background: #ffffff;
        }

        .tedis-about-circular-card {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          overflow: hidden;
          min-height: 620px;
          border-radius: 22px;
          background: var(--deep-green);
        }

        .tedis-about-circular-copy {
          padding: 65px 58px;
        }

        .tedis-about-circular-copy h2 {
          max-width: 620px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(42px, 4.7vw, 66px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-circular-intro {
          max-width: 600px;
          margin: 27px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 15px;
          line-height: 1.75;
        }

        .tedis-about-circular-list {
          margin-top: 42px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .tedis-about-circular-list > div {
          display: grid;
          grid-template-columns: 105px 1fr;
          gap: 20px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .tedis-about-circular-list strong {
          color: #ffffff;
          font-size: 14px;
        }

        .tedis-about-circular-list p {
          margin: 0;
          color: rgba(255, 255, 255, 0.58);
          font-size: 13px;
          line-height: 1.6;
        }

        .tedis-about-circular-media {
          min-height: 620px;
          background: #ffffff;
        }

        .tedis-about-circular-media video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          background: #ffffff;
        }

        /* TECHNOLOGY */

        .tedis-about-technology {
          padding: 105px 0;
          background: var(--light-green);
        }

        .tedis-about-technology-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 100px;
        }

        .tedis-about-technology-grid h2 {
          max-width: 750px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(44px, 5vw, 70px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-technology-copy {
          padding-top: 30px;
        }

        .tedis-about-technology-copy p {
          margin: 0 0 22px;
          color: #4f6258;
          font-size: 16px;
          line-height: 1.75;
        }

        .tedis-about-network-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          padding: 13px 17px;
          border: 1px solid rgba(22, 129, 71, 0.2);
          border-radius: 999px;
          background: #ffffff;
          color: var(--dark-green);
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        .tedis-about-network-link strong {
          color: var(--green);
          font-size: 8px;
          letter-spacing: 0.08em;
        }

        .tedis-about-network-link b {
          color: var(--green);
        }

        .tedis-about-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          animation: tedisAboutPulse 1.4s ease-in-out infinite;
        }

        @keyframes tedisAboutPulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }

        /* MISSION */

        .tedis-about-mission {
          padding: 105px 0;
          background: #ffffff;
        }

        .tedis-about-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .tedis-about-mission-grid article {
          padding: 52px 60px 52px 0;
        }

        .tedis-about-mission-grid article + article {
          padding-left: 60px;
          border-left: 1px solid var(--border);
        }

        .tedis-about-mission-grid h2 {
          max-width: 580px;
          margin: 0;
          color: var(--dark-green);
          font-size: clamp(32px, 3.4vw, 48px);
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -0.04em;
        }

        .tedis-about-mission-grid p {
          max-width: 520px;
          margin: 25px 0 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.75;
        }

        /* CTA */

        .tedis-about-cta-section {
          padding: 20px;
          background: #ffffff;
        }

        .tedis-about-cta {
          width: min(100%, 1440px);
          margin: 0 auto;
          padding: 85px 60px;
          border-radius: 22px;
          background: var(--green);
          text-align: center;
        }

        .tedis-about-cta > span {
          display: block;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.76);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tedis-about-cta h2 {
          max-width: 850px;
          margin: 0 auto;
          color: #ffffff;
          font-size: clamp(44px, 5.2vw, 72px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .tedis-about-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 36px;
        }

        .tedis-about-cta-primary,
        .tedis-about-cta-secondary {
          min-height: 49px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        .tedis-about-cta-primary {
          background: #ffffff;
          color: var(--green);
        }

        .tedis-about-cta-secondary {
          border: 1px solid rgba(255, 255, 255, 0.45);
          color: #ffffff;
        }

        /* TABLET */

        @media (max-width: 1000px) {
          .tedis-about-container {
            width: min(calc(100% - 48px), 1360px);
          }

          .tedis-about-hero-grid,
          .tedis-about-response-grid,
          .tedis-about-technology-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .tedis-about-purpose {
            max-width: 650px;
          }

          .tedis-about-challenge-grid {
            grid-template-columns: 1fr 1fr;
          }

          .tedis-about-challenge-grid article:nth-child(2) {
            border-right: 0;
          }

          .tedis-about-challenge-grid article:nth-child(3),
          .tedis-about-challenge-grid article:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.15);
          }

          .tedis-about-circular-card {
            grid-template-columns: 1fr;
          }

          .tedis-about-circular-media {
            min-height: 500px;
          }
        }

        /* MOBILE */

        @media (max-width: 720px) {
          .tedis-about-container {
            width: calc(100% - 36px);
          }

          .tedis-about-hero {
            padding: 60px 0 52px;
          }

          .tedis-about-hero-main h1 {
            font-size: 48px;
            line-height: 0.97;
          }

          .tedis-about-hero-intro {
            margin-top: 25px;
            font-size: 16px;
          }

          .tedis-about-visual-section {
            padding: 0 10px;
          }

          .tedis-about-visual {
            height: 480px;
            border-radius: 16px;
          }

          .tedis-about-visual-copy {
            left: 23px;
            right: 23px;
            bottom: 26px;
          }

          .tedis-about-visual-copy h2 {
            font-size: 38px;
          }

          .tedis-about-who,
          .tedis-about-response,
          .tedis-about-principles,
          .tedis-about-technology,
          .tedis-about-mission {
            padding: 70px 0;
          }

          .tedis-about-section-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .tedis-about-section-content h2,
          .tedis-about-response-grid h2,
          .tedis-about-principles-heading h2,
          .tedis-about-technology-grid h2 {
            font-size: 40px;
          }

          .tedis-about-copy-columns {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 32px;
          }

          .tedis-about-copy-columns p {
            font-size: 15px;
          }

          .tedis-about-challenge {
            padding: 70px 0;
          }

          .tedis-about-challenge-heading {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .tedis-about-challenge-heading h2 {
            font-size: 42px;
          }

          .tedis-about-challenge-heading > p {
            font-size: 15px;
          }

          .tedis-about-challenge-grid {
            grid-template-columns: 1fr;
            margin-top: 45px;
          }

          .tedis-about-challenge-grid article,
          .tedis-about-challenge-grid article:first-child {
            min-height: auto;
            padding: 27px 0;
            border-right: 0;
            border-top: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          }

          .tedis-about-number {
            margin-bottom: 28px;
          }

          .tedis-about-response-grid {
            gap: 22px;
          }

          .tedis-about-response-copy {
            padding-top: 0;
          }

          .tedis-about-response-copy
            .tedis-about-response-lead {
            font-size: 18px;
          }

          .tedis-about-principles-heading {
            grid-template-columns: 1fr;
            gap: 5px;
            margin-bottom: 38px;
          }

          .tedis-about-principles-list article {
            grid-template-columns: 40px 1fr;
            gap: 12px;
            padding: 26px 0;
          }

          .tedis-about-principles-list h3 {
            font-size: 22px;
          }

          .tedis-about-principles-list p {
            grid-column: 2;
            font-size: 14px;
          }

          .tedis-about-circular {
            padding: 10px 0 70px;
          }

          .tedis-about-circular-card {
            min-height: auto;
            border-radius: 17px;
          }

          .tedis-about-circular-copy {
            padding: 42px 23px;
          }

          .tedis-about-circular-copy h2 {
            font-size: 40px;
          }

          .tedis-about-circular-list {
            margin-top: 32px;
          }

          .tedis-about-circular-list > div {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .tedis-about-circular-media {
            min-height: 380px;
          }

          .tedis-about-technology-grid {
            gap: 22px;
          }

          .tedis-about-technology-copy {
            padding-top: 0;
          }

          .tedis-about-mission-grid {
            grid-template-columns: 1fr;
          }

          .tedis-about-mission-grid article,
          .tedis-about-mission-grid article + article {
            padding: 38px 0;
            border-left: 0;
          }

          .tedis-about-mission-grid article + article {
            border-top: 1px solid var(--border);
          }

          .tedis-about-mission-grid h2 {
            font-size: 34px;
          }

          .tedis-about-cta-section {
            padding: 10px;
          }

          .tedis-about-cta {
            padding: 62px 23px;
            border-radius: 17px;
          }

          .tedis-about-cta h2 {
            font-size: 40px;
          }

          .tedis-about-cta-buttons {
            flex-direction: column;
            margin-top: 30px;
          }

          .tedis-about-cta-primary,
          .tedis-about-cta-secondary {
            width: 100%;
          }
        }

        @media (max-width: 420px) {
          .tedis-about-hero-main h1 {
            font-size: 42px;
          }

          .tedis-about-visual {
            height: 430px;
          }

          .tedis-about-visual-copy h2 {
            font-size: 34px;
          }

          .tedis-about-section-content h2,
          .tedis-about-response-grid h2,
          .tedis-about-principles-heading h2,
          .tedis-about-technology-grid h2,
          .tedis-about-circular-copy h2,
          .tedis-about-cta h2 {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
}