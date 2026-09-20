"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer/Footer";

/* =========================================================
   PARTNERS & SUPPORTERS
========================================================= */

const SUPPORTERS = [
  {
    name: "Moonshot",
    category: "Supporter",
    logo: "/moonshotlogo.jpeg",
  },
  {
    name: "ITU",
    category: "Supporter",
    logo: "/itulogo.jpeg",
  },
  {
    name: "NCDMB",
    category: "Supporter",
    logo: "/ncdmblogo.jpeg",
  },
  {
    name: "Huawei",
    category: "Supporter",
    logo: "/huawei.jpeg",
  },
];

const TECHNOLOGY_PARTNER = {
  name: "Technology Partner",
  category: "Technology Partner",
  logo: "/image5.jpeg",
};

/* =========================================================
   PAGE
========================================================= */

export default function SupportersPage() {
  return (
    <main className="supportersPage">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="supportersHero">
        <div className="supportersHeroGlow glowOne" />
        <div className="supportersHeroGlow glowTwo" />

        <div className="supportersContainer supportersHeroInner">
          <span className="supportersLabel light">
            PARTNERS & SUPPORTERS
          </span>

          <h1>
            The work goes
            <br />
            further when we
            <br />
            do it together.
          </h1>

          <p className="supportersHeroIntro">
            Expanding clean energy access in hard-to-reach
            communities takes more than technology. It takes
            organisations, institutions and people willing to
            help remove the barriers standing between
            communities and reliable electricity.
          </p>

          <div className="supportersHeroActions">
            <Link
              href="/contact"
              className="supportersPrimaryButton"
            >
              Partner With Us
              <span>↗</span>
            </Link>

            <a
              href="#our-supporters"
              className="supportersSecondaryButton"
            >
              Meet Our Supporters
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="supportersIntro">
        <div className="supportersContainer supportersIntroGrid">

          <div>
            <span className="supportersLabel">
              WHY PARTNERSHIP MATTERS
            </span>

            <h2>
              Energy poverty is too
              complex to solve alone.
            </h2>
          </div>

          <div className="supportersIntroCopy">
            <p className="supportersLead">
              A solar system can provide electricity. But
              reaching people who have historically been
              excluded from reliable energy requires an
              ecosystem around that system.
            </p>

            <p>
              Equipment has to reach communities. Systems
              have to be maintained. Field teams need to
              respond when something goes wrong. Technology
              must help us understand distributed systems,
              and recovered materials need responsible
              pathways at the end of their useful life.
            </p>

            <p>
              Our partners and supporters help us build that
              wider infrastructure and take practical
              solutions closer to the people and communities
              that need them.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          PARTNERS & SUPPORTERS
      ====================================================== */}

      <section
        className="supportersRecognition"
        id="our-supporters"
      >
        <div className="supportersContainer">

          <div className="supportersRecognitionTop">
            <div>
              <span className="supportersLabel">
                OUR PARTNERS & SUPPORTERS
              </span>

              <h2>
                The organisations helping
                us take clean energy further.
              </h2>
            </div>

            <p>
              Our work is strengthened by organisations and
              institutions that support innovation, technology,
              capacity development and our wider mission to
              expand access to opportunity.
            </p>
          </div>

          <div className="supportersLogoGrid">

            {SUPPORTERS.map((supporter) => (
              <article
                className="supporterCard"
                key={supporter.name}
              >
                <div className="supporterLogoArea">
                  <Image
                    src={supporter.logo}
                    alt={`${supporter.name} logo`}
                    width={260}
                    height={130}
                    className="supporterLogo"
                  />
                </div>

                <div className="supporterInformation">
                  <span>
                    {supporter.category}
                  </span>

                  <strong>
                    {supporter.name}
                  </strong>
                </div>
              </article>
            ))}

          </div>

          {/* TECHNOLOGY PARTNER */}

          <div className="technologyPartner">

            <div className="technologyPartnerLogo">
              <span className="technologyPartnerTag">
                TECHNOLOGY PARTNER
              </span>

              <div className="technologyLogoBox">
                <Image
                  src={TECHNOLOGY_PARTNER.logo}
                  alt="Technology Partner"
                  width={500}
                  height={260}
                  className="technologyLogo"
                />
              </div>
            </div>

            <div className="technologyPartnerCopy">
              <span className="supportersLabel light">
                TECHNOLOGY PARTNERSHIP
              </span>

              <h3>
                Technology helps us
                support energy access
                beyond installation.
              </h3>

              <p>
                Reaching dispersed communities creates a
                different challenge from operating energy
                infrastructure in one location. Systems can
                be separated by long distances, while
                technical teams cannot be everywhere at the
                same time.
              </p>

              <p>
                Technology partnerships help strengthen the
                digital infrastructure behind our work,
                including connected systems, IoT, data,
                automation and intelligent monitoring that
                can improve visibility across distributed
                clean-energy deployments.
              </p>

              <div className="technologyCapabilities">

                <div>
                  <span>01</span>
                  <strong>Connected systems</strong>
                </div>

                <div>
                  <span>02</span>
                  <strong>IoT & monitoring</strong>
                </div>

                <div>
                  <span>03</span>
                  <strong>Data & intelligence</strong>
                </div>

                <div>
                  <span>04</span>
                  <strong>Remote support</strong>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHAT SUPPORT ENABLES
      ====================================================== */}

      <section className="supportersEnables">
        <div className="supportersContainer">

          <div className="supportersSectionHeading">
            <span className="supportersLabel light">
              WHAT SUPPORT ENABLES
            </span>

            <h2>
              Partnership becomes
              something people
              can actually use.
            </h2>

            <p>
              We connect support to the practical barriers
              that determine whether clean energy reaches a
              community and continues working after it gets
              there.
            </p>
          </div>

          <div className="supportersEnableList">

            <article>
              <span className="supportersNumber">
                01
              </span>

              <div>
                <h3>
                  Energy access
                </h3>

                <p>
                  Supporting decentralized clean-energy
                  access for eligible low-income households,
                  microbusinesses and community facilities.
                </p>
              </div>

              <strong>
                ACCESS
              </strong>
            </article>

            <article>
              <span className="supportersNumber">
                02
              </span>

              <div>
                <h3>
                  Last-mile delivery
                </h3>

                <p>
                  Helping equipment and technical support
                  reach communities where distance, poor
                  infrastructure and logistics make
                  conventional delivery difficult.
                </p>
              </div>

              <strong>
                REACH
              </strong>
            </article>

            <article>
              <span className="supportersNumber">
                03
              </span>

              <div>
                <h3>
                  Maintenance & field support
                </h3>

                <p>
                  Keeping systems useful beyond installation
                  through technicians, replacement
                  components, maintenance and continued
                  community support.
                </p>
              </div>

              <strong>
                RELIABILITY
              </strong>
            </article>

            <article>
              <span className="supportersNumber">
                04
              </span>

              <div>
                <h3>
                  Technology
                </h3>

                <p>
                  Strengthening the AI, IoT, digital and data
                  infrastructure that helps us understand
                  distributed systems and coordinate
                  technical support.
                </p>
              </div>

              <strong>
                INTELLIGENCE
              </strong>
            </article>

            <article>
              <span className="supportersNumber">
                05
              </span>

              <div>
                <h3>
                  Circular recovery
                </h3>

                <p>
                  Supporting recovery, reuse and responsible
                  recycling pathways for solar and electronic
                  materials as energy access expands.
                </p>
              </div>

              <strong>
                CIRCULARITY
              </strong>
            </article>

          </div>

        </div>
      </section>

      {/* =====================================================
          PARTNERSHIP TYPES
      ====================================================== */}

      <section className="supportersPartnerships">
        <div className="supportersContainer">

          <div className="supportersPartnershipHeading">
            <span className="supportersLabel">
              WORK WITH US
            </span>

            <h2>
              There is more than
              one way to move
              energy access forward.
            </h2>

            <p>
              Financial support matters, but meaningful
              partnerships can also bring technology,
              equipment, expertise, logistics, community
              access and circular-economy capabilities.
            </p>
          </div>

          <div className="supportersPartnershipGrid">

            <article>
              <span className="supportersPartnershipNo">
                01
              </span>

              <h3>
                Fund energy access
              </h3>

              <p>
                Support clean-energy access for households,
                microbusinesses or community facilities in
                places where affordability remains a major
                barrier.
              </p>

              <Link href="/contact">
                Talk to us
                <span>↗</span>
              </Link>
            </article>

            <article>
              <span className="supportersPartnershipNo">
                02
              </span>

              <h3>
                Build with technology
              </h3>

              <p>
                Contribute digital infrastructure, technical
                expertise, AI, IoT, data capabilities or
                tools that can strengthen how distributed
                energy systems are supported.
              </p>

              <Link href="/contact">
                Talk to us
                <span>↗</span>
              </Link>
            </article>

            <article>
              <span className="supportersPartnershipNo">
                03
              </span>

              <h3>
                Contribute equipment
              </h3>

              <p>
                Support our work with appropriate solar,
                electrical, digital or field equipment that
                can help extend or maintain clean-energy
                access.
              </p>

              <Link href="/contact">
                Talk to us
                <span>↗</span>
              </Link>
            </article>

            <article>
              <span className="supportersPartnershipNo">
                04
              </span>

              <h3>
                Support circular recovery
              </h3>

              <p>
                Work with us on responsible recovery,
                recycling and circular pathways for solar
                and electronic materials.
              </p>

              <Link href="/contact">
                Talk to us
                <span>↗</span>
              </Link>
            </article>

            <article>
              <span className="supportersPartnershipNo">
                05
              </span>

              <h3>
                Reach communities with us
              </h3>

              <p>
                Community organisations, public institutions
                and development partners can help identify
                needs, strengthen local engagement and
                support responsible deployment.
              </p>

              <Link href="/contact">
                Talk to us
                <span>↗</span>
              </Link>
            </article>

            <article>
              <span className="supportersPartnershipNo">
                06
              </span>

              <h3>
                Support the mission
              </h3>

              <p>
                Individuals and organisations can contribute
                to the wider mission and help us take
                reliable clean electricity to more people
                and communities.
              </p>

              <Link href="/donate">
                Make a contribution
                <span>↗</span>
              </Link>
            </article>

          </div>

        </div>
      </section>

      {/* =====================================================
          PARTNERSHIP PRINCIPLE
      ====================================================== */}

      <section className="supportersPrinciple">
        <div className="supportersContainer supportersPrincipleGrid">

          <div className="supportersPrincipleNumber">
            <span>
              OUR APPROACH TO PARTNERSHIP
            </span>

            <strong>
              01
            </strong>
          </div>

          <div className="supportersPrincipleCopy">
            <h2>
              The partnership should
              serve the community,
              not the partnership.
            </h2>

            <p>
              We believe collaboration is most useful when
              it begins with the needs of the people being
              served. That means focusing on access,
              reliability and long-term usefulness rather
              than simply counting equipment deployed.
            </p>

            <p>
              We want every partnership to help create
              energy infrastructure that people can depend
              on and that communities can continue to
              benefit from after deployment.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          ACCOUNTABILITY
      ====================================================== */}

      <section className="supportersAccountability">
        <div className="supportersContainer">

          <div className="supportersAccountabilityHeading">
            <span className="supportersLabel light">
              ACCOUNTABILITY
            </span>

            <h2>
              Support should be
              connected to impact.
            </h2>

            <p>
              We are building our energy-access model around
              visibility beyond installation, helping us
              understand what support is making possible
              across communities.
            </p>
          </div>

          <div className="supportersAccountabilityGrid">

            <article>
              <strong>
                01
              </strong>

              <h3>
                Deployment
              </h3>

              <p>
                Understand where supported systems and
                interventions are represented.
              </p>
            </article>

            <article>
              <strong>
                02
              </strong>

              <h3>
                Energy indicators
              </h3>

              <p>
                Follow represented energy-access indicators
                across our Community Energy Network.
              </p>
            </article>

            <article>
              <strong>
                03
              </strong>

              <h3>
                Community impact
              </h3>

              <p>
                Connect infrastructure to the people,
                businesses and facilities it is intended
                to support.
              </p>
            </article>

            <article>
              <strong>
                04
              </strong>

              <h3>
                Long-term support
              </h3>

              <p>
                Keep attention on maintenance, technical
                support and continued access after
                deployment.
              </p>
            </article>

          </div>

          <Link
            href="/energy-view"
            className="supportersNetworkLink"
          >
            <span className="supportersLiveDot">
              <i />
            </span>

            Explore our Community Energy Network

            <span>↗</span>
          </Link>

        </div>
      </section>

      {/* =====================================================
          THANK YOU
      ====================================================== */}

      <section className="supportersThanks">
        <div className="supportersContainer supportersThanksInner">

          <span className="supportersLabel">
            TO THOSE WHO SUPPORT THE WORK
          </span>

          <h2>
            Thank you for helping
            possibility travel further.
          </h2>

          <p>
            Every organisation, institution and individual
            that supports this mission becomes part of
            something larger than an energy deployment.
            Together, we are helping make electricity less
            dependent on income, geography and the reach of
            conventional infrastructure.
          </p>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="supportersCta">
        <div className="supportersContainer supportersCtaInner">

          <div>
            <span>
              PARTNER WITH TEDIS
            </span>

            <h2>
              Help us reach
              the next community.
            </h2>
          </div>

          <div className="supportersCtaActions">

            <Link
              href="/contact"
              className="supportersCtaPrimary"
            >
              Partner With Us
            </Link>

            <Link
              href="/donate"
              className="supportersCtaSecondary"
            >
              Donate
            </Link>

          </div>

        </div>
      </section>

      <Footer />

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style jsx>{`

        .supportersPage {
          min-height: 100vh;
          overflow-x: hidden;
          background: #ffffff;
          color: #14382d;
        }

        .supportersContainer {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }

        .supportersLabel {
          display: block;
          color: #13824a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .supportersLabel.light {
          color: #8be5a9;
        }

        /* =====================================================
           HERO
        ====================================================== */

        .supportersHero {
          position: relative;
          min-height: 700px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #061d15 0%,
              #0a2b20 50%,
              #123c2d 100%
            );
          color: white;
        }

        .supportersHero::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
        }

        .supportersHeroGlow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .glowOne {
          width: 650px;
          height: 650px;
          right: -190px;
          top: -280px;
          background:
            radial-gradient(
              circle,
              rgba(68,180,108,0.24),
              transparent 68%
            );
        }

        .glowTwo {
          width: 470px;
          height: 470px;
          left: 35%;
          bottom: -300px;
          background:
            radial-gradient(
              circle,
              rgba(139,229,169,0.12),
              transparent 70%
            );
        }

        .supportersHeroInner {
          position: relative;
          z-index: 2;
          padding-top: 150px;
          padding-bottom: 85px;
        }

        .supportersHero h1 {
          max-width: 1000px;
          margin: 18px 0 0;
          font-size: clamp(58px,7.7vw,100px);
          line-height: 0.91;
          letter-spacing: -0.065em;
        }

        .supportersHeroIntro {
          max-width: 680px;
          margin: 30px 0 0;
          color: rgba(255,255,255,0.67);
          font-size: 17px;
          line-height: 1.75;
        }

        .supportersHeroActions {
          margin-top: 32px;
          display: flex;
          gap: 11px;
        }

        .supportersPrimaryButton,
        .supportersSecondaryButton {
          min-height: 50px;
          padding: 0 21px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
        }

        .supportersPrimaryButton {
          background: #8be5a9;
          color: #08251b;
        }

        .supportersSecondaryButton {
          border: 1px solid rgba(255,255,255,0.27);
          color: white;
        }

        /* =====================================================
           INTRO
        ====================================================== */

        .supportersIntro {
          padding: 125px 0;
          background: white;
        }

        .supportersIntroGrid {
          display: grid;
          grid-template-columns: 1fr 0.75fr;
          gap: 100px;
        }

        .supportersIntro h2,
        .supportersSectionHeading h2,
        .supportersRecognitionTop h2,
        .supportersPartnershipHeading h2,
        .supportersPrinciple h2,
        .supportersAccountability h2,
        .supportersThanks h2 {
          margin: 15px 0 0;
          font-size: clamp(44px,5.6vw,72px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .supportersIntroCopy p {
          color: #68776f;
          font-size: 14px;
          line-height: 1.85;
        }

        .supportersIntroCopy .supportersLead {
          margin-top: 0;
          color: #14382d;
          font-size: 20px;
          line-height: 1.65;
        }

        /* =====================================================
           RECOGNITION
        ====================================================== */

        .supportersRecognition {
          padding: 125px 0;
          background: #f5f6f1;
        }

        .supportersRecognitionTop {
          display: grid;
          grid-template-columns: 1fr 0.55fr;
          gap: 80px;
          align-items: end;
        }

        .supportersRecognitionTop p {
          margin: 0;
          color: #68776f;
          font-size: 14px;
          line-height: 1.8;
        }

        .supportersLogoGrid {
          margin-top: 65px;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(20,56,45,0.12);
          border-left: 1px solid rgba(20,56,45,0.12);
        }

        .supporterCard {
          min-height: 280px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: white;
          border-right: 1px solid rgba(20,56,45,0.12);
          border-bottom: 1px solid rgba(20,56,45,0.12);
        }

        .supporterLogoArea {
          min-height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .supporterLogoArea :global(.supporterLogo) {
          width: auto;
          height: auto;
          max-width: 82%;
          max-height: 105px;
          object-fit: contain;
        }

        .supporterInformation {
          padding-top: 20px;
          border-top: 1px solid rgba(20,56,45,0.1);
        }

        .supporterInformation span {
          display: block;
          color: #13824a;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .supporterInformation strong {
          display: block;
          margin-top: 7px;
          font-size: 15px;
        }

        /* TECHNOLOGY PARTNER */

        .technologyPartner {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          min-height: 540px;
          overflow: hidden;
          border-radius: 28px;
          background: #09271d;
          color: white;
        }

        .technologyPartnerLogo {
          position: relative;
          padding: 55px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            radial-gradient(
              circle at 25% 20%,
              rgba(139,229,169,0.18),
              transparent 42%
            ),
            #0d3326;
        }

        .technologyPartnerTag {
          color: #8be5a9;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .technologyLogoBox {
          min-height: 300px;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: white;
        }

        .technologyLogoBox :global(.technologyLogo) {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 220px;
          object-fit: contain;
        }

        .technologyPartnerCopy {
          padding: 65px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .technologyPartnerCopy h3 {
          max-width: 600px;
          margin: 15px 0 0;
          font-size: clamp(38px,4.5vw,58px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .technologyPartnerCopy > p {
          max-width: 620px;
          margin: 20px 0 0;
          color: rgba(255,255,255,0.56);
          font-size: 13px;
          line-height: 1.8;
        }

        .technologyCapabilities {
          margin-top: 35px;
          border-top: 1px solid rgba(255,255,255,0.13);
        }

        .technologyCapabilities > div {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 15px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.13);
        }

        .technologyCapabilities span {
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
        }

        .technologyCapabilities strong {
          font-size: 11px;
        }

        /* =====================================================
           ENABLES
        ====================================================== */

        .supportersEnables {
          padding: 125px 0;
          background: #0b2b20;
          color: white;
        }

        .supportersSectionHeading {
          max-width: 950px;
        }

        .supportersSectionHeading > p {
          max-width: 650px;
          margin: 23px 0 0;
          color: rgba(255,255,255,0.56);
          font-size: 14px;
          line-height: 1.8;
        }

        .supportersEnableList {
          margin-top: 70px;
          border-top: 1px solid rgba(255,255,255,0.13);
        }

        .supportersEnableList article {
          display: grid;
          grid-template-columns: 70px 1fr 180px;
          gap: 35px;
          align-items: center;
          padding: 37px 0;
          border-bottom: 1px solid rgba(255,255,255,0.13);
        }

        .supportersNumber {
          color: #8be5a9;
          font-size: 9px;
          font-weight: 900;
        }

        .supportersEnableList h3 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .supportersEnableList p {
          max-width: 630px;
          margin: 9px 0 0;
          color: rgba(255,255,255,0.53);
          font-size: 13px;
          line-height: 1.7;
        }

        .supportersEnableList article > strong {
          justify-self: end;
          color: rgba(255,255,255,0.2);
          font-size: 9px;
          letter-spacing: 0.16em;
        }

        /* =====================================================
           PARTNERSHIPS
        ====================================================== */

        .supportersPartnerships {
          padding: 125px 0;
          background: white;
        }

        .supportersPartnershipHeading {
          max-width: 950px;
        }

        .supportersPartnershipHeading > p {
          max-width: 650px;
          margin: 24px 0 0;
          color: #68776f;
          font-size: 14px;
          line-height: 1.8;
        }

        .supportersPartnershipGrid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          border-top: 1px solid rgba(20,56,45,0.13);
          border-left: 1px solid rgba(20,56,45,0.13);
        }

        .supportersPartnershipGrid article {
          min-height: 390px;
          padding: 35px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(20,56,45,0.13);
          border-bottom: 1px solid rgba(20,56,45,0.13);
        }

        .supportersPartnershipNo {
          color: #13824a;
          font-size: 9px;
          font-weight: 900;
        }

        .supportersPartnershipGrid h3 {
          margin: 50px 0 0;
          max-width: 290px;
          font-size: 30px;
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .supportersPartnershipGrid p {
          margin: 18px 0 0;
          color: #68776f;
          font-size: 12px;
          line-height: 1.75;
        }

        .supportersPartnershipGrid a {
          display: inline-flex;
          gap: 8px;
          margin-top: auto;
          padding-top: 30px;
          color: #13824a;
          font-size: 10px;
          font-weight: 900;
          text-decoration: none;
        }

        /* =====================================================
           PRINCIPLE
        ====================================================== */

        .supportersPrinciple {
          padding: 130px 0;
          background: #f4efe3;
        }

        .supportersPrincipleGrid {
          display: grid;
          grid-template-columns: 0.45fr 1fr;
          gap: 100px;
        }

        .supportersPrincipleNumber > span {
          display: block;
          color: #13824a;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .supportersPrincipleNumber > strong {
          display: block;
          margin-top: 25px;
          color: rgba(19,130,74,0.18);
          font-size: 130px;
          line-height: 0.8;
          letter-spacing: -0.08em;
        }

        .supportersPrincipleCopy {
          max-width: 760px;
        }

        .supportersPrincipleCopy p {
          max-width: 650px;
          color: #68776f;
          font-size: 14px;
          line-height: 1.85;
        }

        /* =====================================================
           ACCOUNTABILITY
        ====================================================== */

        .supportersAccountability {
          padding: 125px 0;
          background: #09271d;
          color: white;
        }

        .supportersAccountabilityHeading {
          max-width: 930px;
        }

        .supportersAccountabilityHeading > p {
          max-width: 650px;
          margin: 23px 0 0;
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.8;
        }

        .supportersAccountabilityGrid {
          margin-top: 65px;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(255,255,255,0.12);
          border-left: 1px solid rgba(255,255,255,0.12);
        }

        .supportersAccountabilityGrid article {
          min-height: 270px;
          padding: 28px;
          border-right: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }

        .supportersAccountabilityGrid strong {
          color: #8be5a9;
          font-size: 9px;
        }

        .supportersAccountabilityGrid h3 {
          margin: 65px 0 0;
          font-size: 22px;
        }

        .supportersAccountabilityGrid p {
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          line-height: 1.7;
        }

        .supportersNetworkLink {
          margin-top: 35px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #8be5a9;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
        }

        .supportersLiveDot {
          width: 19px;
          height: 19px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(139,229,169,0.45);
          border-radius: 50%;
        }

        .supportersLiveDot i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8be5a9;
          animation: supporterBlink 1.2s infinite;
        }

        @keyframes supporterBlink {
          50% {
            opacity: 0.25;
          }
        }

        /* =====================================================
           THANK YOU
        ====================================================== */

        .supportersThanks {
          padding: 130px 0;
          background: white;
        }

        .supportersThanksInner {
          max-width: 1000px;
        }

        .supportersThanks p {
          max-width: 670px;
          margin: 28px 0 0;
          color: #68776f;
          font-size: 15px;
          line-height: 1.85;
        }

        /* =====================================================
           CTA
        ====================================================== */

        .supportersCta {
          padding: 85px 0;
          background: #13824a;
          color: white;
        }

        .supportersCtaInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
        }

        .supportersCtaInner
          > div:first-child > span {
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .supportersCta h2 {
          max-width: 680px;
          margin: 10px 0 0;
          font-size: clamp(42px,5.3vw,66px);
          line-height: 0.96;
          letter-spacing: -0.05em;
        }

        .supportersCtaActions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .supportersCtaPrimary,
        .supportersCtaSecondary {
          min-height: 50px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
        }

        .supportersCtaPrimary {
          background: white;
          color: #14382d;
        }

        .supportersCtaSecondary {
          border: 1px solid rgba(255,255,255,0.4);
          color: white;
        }

        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 1000px) {

          .supportersIntroGrid,
          .supportersRecognitionTop,
          .supportersPrincipleGrid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .supportersLogoGrid {
            grid-template-columns: repeat(2,1fr);
          }

          .technologyPartner {
            grid-template-columns: 1fr;
          }

          .technologyPartnerLogo {
            min-height: 480px;
          }

          .supportersPartnershipGrid {
            grid-template-columns: repeat(2,1fr);
          }

          .supportersAccountabilityGrid {
            grid-template-columns: repeat(2,1fr);
          }
        }

        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 760px) {

          .supportersContainer {
            width: min(100% - 28px,1200px);
          }

          .supportersHero {
            min-height: 650px;
          }

          .supportersHeroInner {
            padding-top: 115px;
            padding-bottom: 60px;
          }

          .supportersHero h1 {
            font-size: clamp(46px,13vw,64px);
          }

          .supportersHeroIntro {
            font-size: 14px;
          }

          .supportersHeroActions {
            align-items: stretch;
            flex-direction: column;
          }

          .supportersPrimaryButton,
          .supportersSecondaryButton {
            width: 100%;
          }

          .supportersIntro,
          .supportersRecognition,
          .supportersEnables,
          .supportersPartnerships,
          .supportersPrinciple,
          .supportersAccountability,
          .supportersThanks {
            padding: 80px 0;
          }

          .supportersIntro h2,
          .supportersSectionHeading h2,
          .supportersRecognitionTop h2,
          .supportersPartnershipHeading h2,
          .supportersPrinciple h2,
          .supportersAccountability h2,
          .supportersThanks h2 {
            font-size: clamp(38px,11vw,52px);
          }

          /* SUPPORTERS */

          .supportersLogoGrid {
            grid-template-columns: 1fr;
          }

          .supporterCard {
            min-height: 240px;
          }

          /* TECHNOLOGY PARTNER */

          .technologyPartner {
            min-height: 0;
          }

          .technologyPartnerLogo {
            min-height: 0;
            padding: 28px 22px;
          }

          .technologyLogoBox {
            min-height: 230px;
            margin-top: 30px;
            padding: 25px;
          }

          .technologyPartnerCopy {
            padding: 38px 22px;
          }

          .technologyPartnerCopy h3 {
            font-size: 38px;
          }

          /* ENABLES */

          .supportersEnableList article {
            grid-template-columns: 35px 1fr;
            gap: 15px;
          }

          .supportersEnableList
            article > strong {
            display: none;
          }

          .supportersEnableList h3 {
            font-size: 24px;
          }

          /* PARTNERSHIPS */

          .supportersPartnershipGrid {
            grid-template-columns: 1fr;
          }

          .supportersPartnershipGrid article {
            min-height: 330px;
            padding: 28px 22px;
          }

          .supportersPartnershipGrid h3 {
            margin-top: 40px;
            font-size: 28px;
          }

          /* PRINCIPLE */

          .supportersPrincipleNumber
            > strong {
            font-size: 95px;
          }

          /* ACCOUNTABILITY */

          .supportersAccountabilityGrid {
            grid-template-columns: 1fr;
          }

          .supportersAccountabilityGrid
            article {
            min-height: 220px;
          }

          .supportersAccountabilityGrid
            h3 {
            margin-top: 45px;
          }

          /* CTA */

          .supportersCta {
            padding: 70px 0;
          }

          .supportersCtaInner {
            align-items: flex-start;
            flex-direction: column;
          }

          .supportersCtaActions {
            width: 100%;
            flex-direction: column;
          }

          .supportersCtaPrimary,
          .supportersCtaSecondary {
            width: 100%;
          }
        }

      `}</style>

    </main>
  );
}