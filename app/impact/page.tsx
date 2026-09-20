"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Footer from "../components/Footer/Footer";
import {
  DAILY_CARBON_PREVENTED_KG,
  DAILY_ENERGY_KWH,
  PEOPLE_REACHED,
  WASTE_RECOVERED_TONS,
  getCumulativeImpact,
} from "../../src/lib/impactMetrics";

/* =========================================================
   IMPACT MODEL
========================================================= */

const FEATURED_COMMUNITIES = [
  "Akodoo",
  "Mbatiav",
  "Ikparev",
  "Tse Kuchi",
  "Shawa",
  "Aondona",
  "Uturugh",
  "Daula Jato",
];

/* =========================================================
   HELPERS
========================================================= */

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

export default function ImpactPage() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const cumulativeImpact = useMemo(() => {
    return getCumulativeImpact(now);
  }, [now]);

  return (
    <main className="impactPage">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="impactHero">
        <div className="impactHeroGlow impactHeroGlowOne" />
        <div className="impactHeroGlow impactHeroGlowTwo" />

        <div className="impactContainer impactHeroInner">
          <span className="impactLabel light">
            OUR IMPACT
          </span>

          <h1>
            Changing what is
            <br />
            possible with access
            <br />
            to clean energy.
          </h1>

          <p className="impactHeroIntro">

          </p>
        </div>
      </section>

      {/* =====================================================
          HERO IMPACT STRIP
      ====================================================== */}

      <section className="impactHeroStats">
        <div className="impactContainer">
          <div className="impactHeroStatsGrid">

            <div className="impactHeroStat">
              <strong>
                {formatNumber(PEOPLE_REACHED)}
              </strong>

              <div>
                <span>People reached</span>
              </div>
            </div>

            <div className="impactHeroStat">
              <strong>
                {formatNumber(
                  DAILY_ENERGY_KWH,
                  1
                )}
              </strong>

              <div>
                <span>kWh / day</span>
              </div>
            </div>

            <div className="impactHeroStat">
              <strong>
                {formatNumber(
                  DAILY_CARBON_PREVENTED_KG / 1000,
                  3
                )}
              </strong>

              <div>
                <span>Tonnes CO₂ / day</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PEOPLE FIRST
      ====================================================== */}

      <section className="impactPeople">
        <div className="impactContainer">

          <div className="impactEditorialHeading">
            <span className="impactLabel">
              PEOPLE FIRST
            </span>

            <h2>
              Behind every number is
              something electricity
              made possible.
            </h2>

            <p>
              Our iot telemetry tell us how much energy
              is represented. But its the stories of the
              people who use it that tell us why it
              matters. In the communities we serve,
              electricity can affect whether a clinic
              can respond at night, whether a business
              can remain open, and whether a family
              can continue its day after sunset.
            </p>
          </div>

          {/* =================================================
              CLINIC STORY
          ================================================== */}

          <article className="impactFeatureStory">

            <div className="impactFeatureImage">
              <Image
                src="/frame0.jpeg"
                alt="A community facility supported with decentralized clean energy"
                fill
                priority
                className="impactCover"
              />

              <div className="impactImageShade" />

              <span className="impactImageTag">
                HEALTHCARE
              </span>
            </div>

            <div className="impactFeatureCopy">

              <div className="impactFeatureEyebrow">
                <span className="impactLabel">
                  SHITELLE HEALTH FACILITY · UGBA
                </span>

                <span className="impactStoryNumber">
                  01
                </span>
              </div>

              <h3>
                For 18 months, a failed
                generator changed what
                happened when emergencies
                arrived at night.
              </h3>

              <div className="impactFeatureText">

                <p>
                  Shitelle Health Facility in Ugba
                  serves its community with limited
                  resources. When its fuel generator
                  failed, the underfunded facility
                  could not afford the dependable
                  electricity needed to sustain care
                  after dark.
                </p>

                <p>
                  For about 18 months, health workers
                  referred patients who arrived with
                  night-time emergencies to distant
                  communities where electricity was
                  available. Women in labour and other
                  patients needing urgent attention
                  faced another journey before they
                  could receive care.
                </p>

                <p>
                  The electricity shortage also meant
                  the facility could not preserve
                  vaccines reliably or provide the
                  level of healthcare its workers
                  wanted to deliver. The failure of
                  one generator affected the quality,
                  timing and location of essential
                  care across the community.
                </p>

              </div>

              <div className="impactFeatureStatement">
                <span>
                  WHAT WAS NEEDED
                </span>

                <strong>
                  Dependable electricity for urgent
                  care after dark, vaccine storage
                  and the daily work of local health
                  workers.
                </strong>
              </div>

              <div className="impactFeatureOutcome">
                <span className="impactOutcomeLine" />

                <div>
                  <span>
                    WHAT CHANGED
                  </span>

                  <p>
                    TEDIS Evergreen Foundation
                    provided Shitelle Health Facility
                    with TED Evergreen Smart Energy
                    900. The system now supports
                    lighting for night-time care,
                    vaccine preservation and more
                    dependable service within the
                    facility.
                  </p>

                  <strong>
                    For a health facility,
                    electricity is part of the
                    infrastructure of care.
                  </strong>
                </div>
              </div>

            </div>

          </article>

          {/* =================================================
              OTHER HUMAN STORIES
          ================================================== */}

          <div className="impactStoriesHeading">
            <span className="impactLabel">
            </span>

            <h3>

            </h3>
          </div>

          <div className="impactHorizontalStories">

            {/* SMALL BUSINESS */}

            <article className="impactHorizontalStory">

              <div className="impactHorizontalImage">
                <Image
                  src="/salon1.jpeg"
                  alt="Dooter using clean electricity in his salon"
                  fill
                  className="impactCover"
                />

                <div className="impactImageShade" />

                <span className="impactImageTag">
                  LIVELIHOODS
                </span>
              </div>

              <div className="impactHorizontalCopy">
                <div>
                  <span className="impactLabel">
                
                  </span>

                  <h3>
                    Fuel can keep a small business open,
                    but the daily cost will reduce
                    what the business earned.
                  </h3>
                </div>

                <div className="impactHorizontalText">
                  <p>
                    Dooter's salon depended on a fuel
                    generator for lighting, charging
                    clippers and powering other
                    equipment. He spent about ₦2,000
                    on fuel on an average working day,
                    an expense that repeatedly ate
                    into his income.
                  </p>

                  <p>
                    TED Evergreen Smart Energy 900 now
                    powers the equipment he needs to
                    work. The intervention has reduced
                    his daily energy cost, removed the
                    generator noise around his business
                    and reduced the air pollution caused
                    by burning fuel beside the salon,
                    while providing aditional work hours.
                  </p>

                  <div className="impactMiniOutcome">
                    <span>THE IMPACT</span>
                    <strong>
                      Lower operating costs, a quieter
                      business environment and cleaner
                      air while Dooter serves customers.
                    </strong>
                  </div>
                </div>
              </div>

            </article>

            {/* HOUSEHOLD */}

            <article className="impactHorizontalStory">

              <div className="impactHorizontalImage">
                <Image
                  src="/frame3.jpeg"
                  alt="The Serwue family using clean electricity for evening study"
                  fill
                  className="impactCover"
                />

                <div className="impactImageShade" />

                <span className="impactImageTag">
                  HOUSEHOLDS
                </span>
              </div>

              <div className="impactHorizontalCopy">
                <div>
                  <span className="impactLabel">
                  </span>

                  <h3>
                    We often hear about children who make it
                    but never hear about those who do not!
                  </h3>
                </div>

                <div className="impactHorizontalText">
                  <p>
                    In the Ahula family, the children
                    could not study properly at night. 
                    Darkness limited their reading time and
                    access to digital learning tools.
                  </p>

                  <p>
                    Our intervention brought reliable
                    lighting into their home. The
                    children can now study after
                    sunset, charge devices and use
                    digital tools that support their
                    learning.
                  </p>

                  <p>
                    For a child in a
                    low-income household in a village
                    without electricity, a little
                    light can change the direction of
                    their entire story.
                  </p>

                  <div className="impactMiniOutcome">
                    <span>THE IMPACT</span>
                    <strong>
                      Light to study at night and
                      electricity to participate in
                      digital learning.
                    </strong>
                  </div>
                </div>
              </div>

            </article>

            {/* COMMUNITY */}

            <article className="impactHorizontalStory">

              <div className="impactHorizontalImage">
                <Image
                  src="/frame6.jpeg"
                  alt="Ruth using portable clean electricity for her digital-services business"
                  fill
                  className="impactCover"
                />

                <div className="impactImageShade" />

                <span className="impactImageTag">
                  LAST-MILE ACCESS
                </span>
              </div>

              <div className="impactHorizontalCopy">
                <div>
                  <span className="impactLabel">
                    ALICE · DIGITAL SERVICES PROVIDER
                  </span>

                  <h3>
                    One portable system
                    powers her work by day
                    and her family at night.
                  </h3>
                </div>

                <div className="impactHorizontalText">
                  <p>
                    Alice runs a SIM-card and online
                    registration business. She relied
                    on a fuel generator to keep phones,
                    computers and other devices working
                    for customers, making fuel a daily
                    cost of earning an income.
                  </p>

                  <p>
                    TED Evergreen Smart Energy 900 now
                    powers her business during working
                    hours. When she closes for the day,
                    she carries the portable system
                    home, where it provides light and
                    electricity for her family.
                  </p>

                  <div className="impactMiniOutcome">
                    <span>THE IMPACT</span>
                    <strong>
                      Reliable energy for her business
                      and the same system supporting
                      her household after work.
                    </strong>
                  </div>
                </div>
              </div>

            </article>

          </div>

          <div className="impactStoriesHeading">
            <span className="impactLabel">
              WHY ELECTRICITY MATTERS
            </span>

            <h3>
              Electricity can change the direction
              of a person's story.
            </h3>

            <p>
              It can determine whether a health worker
              treats an emergency locally, whether a
              business owner keeps more of what they
              earn, whether a child studies after
              sunset and whether a family remains
              connected. Energy access is not only
              about powering equipment. It gives
              people more control over what happens
              next in their lives.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-WIDTH IMPACT IMAGE
      ====================================================== */}

      <section className="impactFullBleedImage">
        <div className="impactFullBleedMedia">
          <Image
            src="/frame.jpeg"
            alt="TEDIS Evergreen Foundation clean energy impact in a community"
            fill
            sizes="100vw"
            className="impactCover"
          />
          <div className="impactFullBleedShade" />
        </div>
      </section>

      {/* =====================================================
          THE PROBLEM
      ====================================================== */}

      <section className="impactProblem">
        <div className="impactContainer impactProblemGrid">

          <div className="impactProblemHeadline">
            <span className="impactLabel light">
              THE ENERGY ACCESS GAP
            </span>

            <h2>
              The consequences
              of energy poverty
              reach far beyond
              darkness.
            </h2>
          </div>

          <div className="impactProblemCopy">

            <p className="impactProblemLead">
              A lack of reliable electricity can
              affect healthcare, livelihoods,
              education, digital access and the
              ability of essential facilities to
              serve the people around them.
            </p>

            <p>
              The challenge is not simply that clean
              energy technology does not exist.
              For many people, the solutions already
              available remain financially or
              physically out of reach.
            </p>

            <p>
              A small business may lose productive
              hours because running a generator is
              too expensive. A household may be
              unable to afford the upfront cost of a
              solar system. A school may struggle to
              use digital learning tools. A clinic
              without reliable electricity can face
              serious limitations when patients need
              care after dark.
            </p>

            <p>
              In hard-to-reach communities, poor
              roads, weak infrastructure, difficult
              last-mile delivery, limited access to
              technicians and the cost of maintaining
              equipment can create additional
              barriers even when energy technology
              itself is available.
            </p>

            <p>
              These are not separate problems.
              They are different ways that inadequate
              energy infrastructure can restrict
              opportunity.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHO WE SERVE
      ====================================================== */}

      <section className="impactServe">
        <div className="impactContainer">

          <div className="impactServeHeading">
            <span className="impactLabel">
              WHO WE SERVE
            </span>

            <h2>
              We focus on people and
              facilities conventional
              energy solutions struggle
              to reach.
            </h2>
          </div>

          <div className="impactServeGrid">

            <article>
              <span>01</span>

              <h3>
                Low-income households
              </h3>

              <p>
                Families for whom the upfront cost
                of conventional solar can put
                reliable electricity beyond reach.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>
                Microbusinesses
              </h3>

              <p>
                Small businesses whose productive
                hours and income opportunities can
                be constrained by unreliable power
                and recurring fuel costs.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>
                Hard-to-reach communities
              </h3>

              <p>
                Communities where geography,
                infrastructure and last-mile
                delivery make conventional solutions
                difficult to deploy and support.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>
                Community facilities
              </h3>

              <p>
                Clinics, schools and other essential
                facilities where dependable
                electricity can directly strengthen
                the services available to the
                surrounding community.
              </p>
            </article>

          </div>

          {/* SMALL VERTICAL EDITORIAL IMAGE */}
          <div className="impactVerticalEditorial">
            <div className="impactVerticalEditorialImage">
              <Image
                src="/frame4.jpeg"
                alt="A person reached through TEDIS Evergreen Foundation clean energy work"
                fill
                sizes="(max-width: 760px) 68vw, 360px"
                className="impactCover"
              />
              <div className="impactVerticalEditorialShade" />
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          OUR APPROACH
      ====================================================== */}

      <section className="impactApproach">
        <div className="impactContainer">

          <div className="impactApproachIntro">
            <span className="impactLabel light">
              OUR APPROACH
            </span>

            <h2>
              Removing the barriers
              between people and
              clean energy.
            </h2>

            <p>
              Our model is built around a simple
              question: if clean-energy technology
              already exists, what still prevents
              people from accessing it?
            </p>
          </div>

          <div className="impactApproachRows">

            <article>
              <span className="impactApproachNumber">
                01
              </span>

              <h3>
                No prohibitive
                upfront cost.
              </h3>

              <p>
                TED Evergreen Smart Energy 900
                systems are deployed to eligible
                beneficiaries without requiring the
                conventional purchase cost that can
                keep low-income households,
                microbusinesses and underserved
                facilities out of the solar market.
              </p>
            </article>

            <article>
              <span className="impactApproachNumber">
                02
              </span>

              <h3>
                A $1 monthly
                contribution.
              </h3>

              <p>
                Beneficiaries make a small monthly
                contribution that supports the wider
                system around the hardware, including
                maintenance, replacement components,
                field support and long-term access.
              </p>
            </article>

            <article>
              <span className="impactApproachNumber">
                03
              </span>

              <h3>
                Technology keeps
                us connected.
              </h3>

              <p>
                AI, IoT and digital tools support
                visibility across distributed
                systems, helping identify technical
                issues and coordinate support beyond
                the point of installation.
              </p>
            </article>

            <article>
              <span className="impactApproachNumber">
                04
              </span>

              <h3>
                Circular
                by design.
              </h3>

              <p>
                Our approach connects energy access
                with recovery and responsible
                pathways for solar and electronic
                materials so that expanding access
                does not simply create another waste
                problem.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          FULL-WIDTH COMMUNITY IMAGE
      ====================================================== */}

      <section className="impactFullBleedImage">
        <div className="impactFullBleedMedia impactFullBleedMediaTall">
          <Image
            src="/image.jpeg"
            alt="People and communities reached through TEDIS Evergreen Foundation"
            fill
            sizes="100vw"
            className="impactCover"
          />
          <div className="impactFullBleedShade impactFullBleedShadeSoft" />
        </div>
      </section>

      {/* =====================================================
          IMPACT NUMBERS
      ====================================================== */}

      <section
        className="impactNumbers"
        id="impact-numbers"
      >
        <div className="impactContainer">

          <div className="impactNumbersHeading">
            <span className="impactLabel">
              OUR IMPACT IN NUMBERS
            </span>

            <h2>
              Progress you can measure.
            </h2>

            <p>
              We measure the scale of energy access
              alongside environmental and operational
              indicators that help us understand the
              network behind it.
            </p>
          </div>

          <div className="impactNumbersList">

            <article>
              <strong>
                {formatNumber(PEOPLE_REACHED)}
              </strong>

              <div>
                <h3>People reached</h3>

                <p>
                  People represented with access to
                  clean electricity through our work.
                </p>
              </div>
            </article>

            <article>
              <strong>
                {formatNumber(
                  DAILY_ENERGY_KWH,
                  1
                )}
                <small> kWh</small>
              </strong>

              <div>
                <h3>
                  Clean electricity represented daily
                </h3>

                <p>
                  Estimated daily electricity across
                  represented active systems.
                </p>
              </div>
            </article>

            <article>
              <strong>
                {formatNumber(
                  DAILY_CARBON_PREVENTED_KG / 1000,
                  3
                )}
                <small> t</small>
              </strong>

              <div>
                <h3>
                  Estimated CO₂ prevented daily
                </h3>

                <p>
                  Modelled emissions avoided through
                  decentralized clean electricity.
                </p>
              </div>
            </article>

            <article>
              <strong>
                {formatNumber(WASTE_RECOVERED_TONS)}
                <small> tons</small>
              </strong>

              <div>
                <h3>Waste recovered</h3>

                <p>
                  Solar and electronic waste
                  represented through recovery and
                  recycling interventions.
                </p>
              </div>
            </article>

          </div>

          <div className="impactLiveEstimates">

            <div className="impactLiveEstimateIntro">
              <span className="impactLabel">
                NETWORK IMPACT INDICATORS
              </span>

              <h3>
                The represented impact
                continues to grow.
              </h3>

              <p>
                These cumulative indicators are
                estimates calculated from the
                represented active network and the
                operating assumptions used in our
                impact model.
              </p>
            </div>

            <div className="impactLiveEstimateNumbers">

              <div>
                <strong>
                  {formatNumber(
                    cumulativeImpact.cumulativeEnergyKwh / 1000,
                    1
                  )}
                </strong>

                <span>
                  MWh estimated cumulative
                  electricity
                </span>
              </div>

              <div>
                <strong>
                  {formatNumber(
                    cumulativeImpact.cumulativeCarbonKg / 1000,
                    1
                  )}
                </strong>

                <span>
                  tonnes estimated cumulative
                  CO₂ prevented
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFICIARY VOICE
      ====================================================== */}

      <section className="impactVoice">
        <div className="impactContainer">

          <div className="impactVoiceHeading">
            <span className="impactLabel light">
              BENEFICIARY VOICE
            </span>

            <h2>
              What electricity changes
              is easier to understand
              when you hear it from
              the people using it.
            </h2>
          </div>

          <div className="impactVoiceVideo">
            <video
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
            >
              <source
                src="/testimony1.mp4"
                type="video/mp4"
              />

              Your browser does not support video.
            </video>
          </div>

          <div className="impactVoiceCaption">
            <span>
              FROM A BENEFICIARY
            </span>

            <p>
              Reliable electricity is experienced
              in ordinary moments: being able to
              work, charge a device, use equipment,
              stay productive and continue daily
              life without waiting for power to
              return.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          CIRCULAR ECONOMY
      ====================================================== */}

      <section className="impactCircular">
        <div className="impactContainer impactCircularGrid">

          <div className="impactCircularCopy">
            <span className="impactLabel">
              CIRCULAR BY DESIGN
            </span>

            <h2>
              Expanding energy access
              should not create
              tomorrow&apos;s waste problem.
            </h2>

            <p>
              Our work connects clean-energy access
              with circular recovery. Solar and
              electronic materials that still have
              value should not simply become
              unmanaged waste.
            </p>

            <div className="impactCircularSteps">

              <div>
                <span>01</span>
                <strong>Recover</strong>

                <p>
                  Keep useful materials from becoming
                  unmanaged waste.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Recycle</strong>

                <p>
                  Direct recoverable materials toward
                  responsible pathways.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Reinvest</strong>

                <p>
                  Use circular value to support wider
                  clean-energy access.
                </p>
              </div>

            </div>
          </div>

          <div className="impactCircularMedia">
            <video
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
            >
              <source
                src="/ted_evergreen_circular_battery_story.mp4"
                type="video/mp4"
              />

              Your browser does not support video.
            </video>

            <div className="impactCircularMediaCaption">
              <span>
                CIRCULAR ENERGY
              </span>

              <strong>
                Waste should not be the end
                of the story.
              </strong>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          WHERE WE WORK
      ====================================================== */}

      <section className="impactWhere">
        <div className="impactContainer">

          <div className="impactWhereTop">

            <div>
              <span className="impactLabel light">
                WHERE WE WORK
              </span>

              <h2>
                Taking energy where
                conventional solutions
                struggle to reach.
              </h2>
            </div>

            <div className="impactWhereDescription">
              <p>
                Our community energy work focuses on
                places where affordability,
                infrastructure and last-mile access
                create barriers to reliable
                electricity.
              </p>

              <Link
                href="/energy-view"
                className="impactWhereLink"
              >
                Explore Community Network
                <span>↗</span>
              </Link>
            </div>

          </div>

          <div className="impactWherePanel">

            <div className="impactWhereVisual">

              <div className="impactRadar radarOne" />
              <div className="impactRadar radarTwo" />
              <div className="impactRadar radarThree" />

              <div className="impactMapCenter">
                <span className="impactMapPulse">
                  <i />
                </span>

                <strong>
                  COMMUNITY
                  <br />
                  ENERGY
                  <br />
                  NETWORK
                </strong>
              </div>

              <span className="impactLocationDot dotOne" />
              <span className="impactLocationDot dotTwo" />
              <span className="impactLocationDot dotThree" />
              <span className="impactLocationDot dotFour" />
              <span className="impactLocationDot dotFive" />
              <span className="impactLocationDot dotSix" />

            </div>

            <div className="impactCommunityList">

              <span className="impactCommunityTitle">
                FEATURED COMMUNITIES
              </span>

              {FEATURED_COMMUNITIES.map(
                (community, index) => (
                  <div
                    className="impactCommunity"
                    key={community}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {community}
                    </strong>

                    <i />
                  </div>
                )
              )}

              <Link
                href="/energy-view"
                className="impactCommunityButton"
              >
                View Live Network
                <span>↗</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OPPORTUNITY
      ====================================================== */}

      <section className="impactOpportunity">
        <div className="impactContainer">

          <div className="impactOpportunityHeading">
            <span className="impactLabel">
              ENERGY IS AN INVESTMENT IN OPPORTUNITY
            </span>

            <h2>
              One energy system can
              affect much more than
              electricity.
            </h2>
          </div>

          <div className="impactOpportunityList">

            <article>
              <span>01</span>

              <div>
                <h3>Healthcare</h3>

                <p>
                  Reliable electricity can help
                  community health facilities keep
                  essential lighting and equipment
                  available when patients need care
                  after dark.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>Income</h3>

                <p>
                  Reliable electricity can give
                  microbusinesses more productive
                  hours and reduce dependence on
                  expensive fuel-powered
                  alternatives.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>

              <div>
                <h3>Education</h3>

                <p>
                  Lighting and charged digital
                  devices can create more
                  opportunities for reading,
                  learning and accessing educational
                  tools after sunset.
                </p>
              </div>
            </article>

            <article>
              <span>04</span>

              <div>
                <h3>Digital inclusion</h3>

                <p>
                  Electricity enables phones,
                  computers, connectivity and the
                  digital services increasingly
                  important to modern economic and
                  social participation.
                </p>
              </div>
            </article>

            <article>
              <span>05</span>

              <div>
                <h3>Climate</h3>

                <p>
                  Decentralized renewable electricity
                  can reduce dependence on polluting
                  alternatives while expanding
                  energy access.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          LIVE NETWORK CTA
      ====================================================== */}

      <section className="impactNetwork">
        <div className="impactContainer">
          <div className="impactNetworkInner">

            <div className="impactNetworkLive">
              <span className="impactPulse">
                <i />
              </span>

              LIVE COMMUNITY NETWORK
            </div>

            <h2>
              Installation should not
              be where visibility ends.
            </h2>

            <p>
              Our Community Energy Network provides
              visibility into represented systems,
              energy indicators and technical
              information so that energy access can
              be supported beyond deployment.
            </p>

            <Link
              href="/energy-view"
              className="impactNetworkButton"
            >
              Explore the Network
              <span>↗</span>
            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          MORE TO DO
      ====================================================== */}

      <section className="impactMore">
        <div className="impactContainer">

          <div className="impactMoreNumber">
            <strong>
              {formatNumber(PEOPLE_REACHED)}
            </strong>

            <span>
              PEOPLE REACHED
            </span>
          </div>

          <div className="impactMoreStory">
            <span className="impactLabel">
              THERE IS MORE TO DO
            </span>

            <h2>
              Progress matters.
              <br />
              But millions more
              should not have
              to wait.
            </h2>

            <p>
              Every number on this page represents
              progress. But it also reminds us how
              much further clean energy still needs
              to travel.
            </p>

            <p>
              We are working toward a future where
              geography or income does not determine
              whether a clinic can care for someone
              after dark, a family can turn on a
              light, a child can use a digital
              learning tool, or a small business can
              remain productive.
            </p>

            <strong className="impactMoreStatement">
              Energy changes everything when people
              can actually access it.
            </strong>
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="impactCta">
        <div className="impactContainer impactCtaInner">

          <div>
            <span>
              HELP CREATE THE NEXT STORY
            </span>

            <h2>
              Help us take clean
              energy further.
            </h2>
          </div>

          <div className="impactCtaActions">

            <Link
              href="/donate"
              className="impactCtaPrimary"
            >
              Donate
            </Link>

            <Link
              href="/contact"
              className="impactCtaSecondary"
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

      <style jsx>{`
        .impactPage {
          min-height: 100vh;
          overflow-x: hidden;
          background: #ffffff;
          color: #14382d;
        }

        .impactContainer {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }

        .impactLabel {
          display: block;
          color: #13824a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .impactLabel.light {
          color: #8be5a9;
        }

        .impactCover {
          object-fit: cover;
        }

        /* HERO */

        .impactHero {
          position: relative;
          min-height: 650px;
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

        .impactHero::before {
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

        .impactHeroGlow {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          pointer-events: none;
        }

        .impactHeroGlowOne {
          width: 620px;
          height: 620px;
          right: -180px;
          top: -250px;
          background:
            radial-gradient(
              circle,
              rgba(66,175,105,0.22),
              transparent 67%
            );
        }

        .impactHeroGlowTwo {
          width: 430px;
          height: 430px;
          left: 38%;
          bottom: -280px;
          background:
            radial-gradient(
              circle,
              rgba(139,229,169,0.1),
              transparent 70%
            );
        }

        .impactHeroInner {
          position: relative;
          z-index: 2;
          padding-top: 150px;
          padding-bottom: 82px;
        }

        .impactHero h1 {
          max-width: 1000px;
          margin: 18px 0 0;
          font-size: clamp(58px, 7.5vw, 98px);
          line-height: 0.92;
          letter-spacing: -0.065em;
        }

        .impactHeroIntro {
          max-width: 680px;
          margin: 30px 0 0;
          color: rgba(255,255,255,0.68);
          font-size: 17px;
          line-height: 1.75;
        }

        /* HERO STATS */

        .impactHeroStats {
          background: #13824a;
          color: white;
        }

        .impactHeroStatsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .impactHeroStat {
          min-height: 180px;
          padding: 34px 34px 32px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid
            rgba(255,255,255,0.2);
        }

        .impactHeroStat:not(:first-child) {
          padding-left: 34px;
        }

        .impactHeroStat:last-child {
          border-right: 0;
        }

        .impactHeroStat > strong {
          font-size: clamp(42px, 5vw, 64px);
          line-height: 1;
          letter-spacing: -0.055em;
        }

        .impactHeroStat span {
          display: block;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .impactHeroStat p {
          max-width: 280px;
          margin: 7px 0 0;
          color: rgba(255,255,255,0.66);
          font-size: 11px;
          line-height: 1.55;
        }

        /* SHARED HEADINGS */

        .impactEditorialHeading {
          max-width: 950px;
        }

        .impactEditorialHeading h2,
        .impactProblem h2,
        .impactServeHeading h2,
        .impactApproachIntro h2,
        .impactNumbersHeading h2,
        .impactVoiceHeading h2,
        .impactCircularCopy h2,
        .impactWhereTop h2,
        .impactOpportunityHeading h2,
        .impactNetwork h2,
        .impactMore h2 {
          margin: 15px 0 0;
          font-size: clamp(44px, 5.6vw, 72px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .impactEditorialHeading > p {
          max-width: 680px;
          margin: 23px 0 0;
          color: #68776f;
          font-size: 15px;
          line-height: 1.8;
        }

        /* PEOPLE */

        .impactPeople {
          padding: 120px 0;
          background: #f4f7f3;
        }

        /* CLINIC FEATURE */

        .impactFeatureStory {
          margin-top: 65px;
          overflow: hidden;
          border-radius: 28px;
          background: white;
          box-shadow:
            0 25px 80px rgba(20,56,45,0.07);
        }

        .impactFeatureImage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          min-height: 430px;
          overflow: hidden;
        }

        .impactImageShade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(4,29,20,0.58),
              transparent 55%
            );
        }

        .impactImageTag {
          position: absolute;
          left: 25px;
          bottom: 24px;
          padding: 8px 11px;
          border-radius: 999px;
          background: #13824a;
          color: white;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactFeatureCopy {
          padding: 60px;
        }

        .impactFeatureEyebrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .impactStoryNumber {
          color: #9ba9a2;
          font-size: 10px;
          font-weight: 800;
        }

        .impactFeatureCopy > h3 {
          max-width: 950px;
          margin: 18px 0 0;
          font-size: clamp(44px, 5.6vw, 70px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .impactFeatureText {
          max-width: 790px;
          margin-top: 35px;
        }

        .impactFeatureText p {
          margin: 0 0 20px;
          color: #65736c;
          font-size: 15px;
          line-height: 1.85;
        }

        .impactFeatureStatement {
          max-width: 850px;
          margin-top: 38px;
          padding: 30px 0;
          border-top: 1px solid
            rgba(20,56,45,0.13);
          border-bottom: 1px solid
            rgba(20,56,45,0.13);
        }

        .impactFeatureStatement span,
        .impactFeatureOutcome
          > div > span,
        .impactMiniOutcome span {
          display: block;
          color: #13824a;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .impactFeatureStatement strong {
          display: block;
          max-width: 760px;
          margin-top: 11px;
          font-size: 23px;
          line-height: 1.45;
          letter-spacing: -0.02em;
        }

        .impactFeatureOutcome {
          max-width: 850px;
          margin-top: 35px;
          display: grid;
          grid-template-columns: 4px 1fr;
          gap: 25px;
        }

        .impactOutcomeLine {
          display: block;
          width: 4px;
          height: 100%;
          min-height: 150px;
          border-radius: 999px;
          background: #13824a;
        }

        .impactFeatureOutcome p {
          max-width: 720px;
          margin: 11px 0 0;
          color: #65736c;
          font-size: 14px;
          line-height: 1.8;
        }

        .impactFeatureOutcome strong {
          display: block;
          max-width: 720px;
          margin-top: 20px;
          font-size: 20px;
          line-height: 1.45;
        }

        /* OTHER STORIES */

        .impactStoriesHeading {
          max-width: 800px;
          margin-top: 105px;
        }

        .impactStoriesHeading h3 {
          margin: 14px 0 0;
          font-size: clamp(38px, 4.8vw, 58px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .impactHorizontalStories {
          margin-top: 48px;
          display: grid;
          gap: 28px;
        }

        .impactHorizontalStory {
          overflow: hidden;
          border-radius: 25px;
          background: white;
        }

        .impactHorizontalImage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 7;
          min-height: 380px;
          overflow: hidden;
        }

        .impactHorizontalCopy {
          padding: 40px;
          display: grid;
          grid-template-columns: 0.85fr 1fr;
          gap: 70px;
        }

        .impactHorizontalCopy h3 {
          max-width: 450px;
          margin: 13px 0 0;
          font-size: 39px;
          line-height: 1.02;
          letter-spacing: -0.045em;
        }

        .impactHorizontalText > p {
          margin: 0 0 18px;
          color: #68766f;
          font-size: 13px;
          line-height: 1.8;
        }

        .impactMiniOutcome {
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid
            rgba(20,56,45,0.12);
        }

        .impactMiniOutcome strong {
          display: block;
          margin-top: 8px;
          font-size: 17px;
          line-height: 1.5;
        }

        /* FULL-BLEED IMPACT IMAGES */

        .impactFullBleedImage {
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #071d16;
        }

        .impactFullBleedMedia {
          position: relative;
          width: 100%;
          height: clamp(560px, 72vw, 900px);
          overflow: hidden;
        }

        .impactFullBleedMediaTall {
          height: clamp(600px, 78vw, 980px);
        }

        .impactFullBleedShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              to bottom,
              rgba(4, 29, 20, 0.03) 45%,
              rgba(4, 29, 20, 0.28) 100%
            );
        }

        .impactFullBleedShadeSoft {
          background:
            linear-gradient(
              to bottom,
              rgba(4, 29, 20, 0.02) 55%,
              rgba(4, 29, 20, 0.18) 100%
            );
        }

        /* PROBLEM */

        .impactProblem {
          padding: 125px 0;
          background: #0b2b20;
          color: white;
        }

        .impactProblemGrid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 100px;
        }

        .impactProblemCopy {
          padding-top: 28px;
        }

        .impactProblemCopy p {
          margin: 0 0 22px;
          color: rgba(255,255,255,0.58);
          font-size: 15px;
          line-height: 1.8;
        }

        .impactProblemCopy
          .impactProblemLead {
          color: white;
          font-size: 21px;
          line-height: 1.65;
        }

        /* SERVE */

        .impactServe {
          padding: 120px 0;
          background: white;
        }

        .impactServeHeading {
          max-width: 930px;
        }

        .impactServeGrid {
          margin-top: 65px;
          border-top: 1px solid
            rgba(20,56,45,0.14);
        }

        .impactServeGrid article {
          display: grid;
          grid-template-columns: 70px 0.75fr 1fr;
          gap: 35px;
          align-items: center;
          padding: 34px 0;
          border-bottom: 1px solid
            rgba(20,56,45,0.14);
        }

        .impactServeGrid article > span {
          color: #13824a;
          font-size: 10px;
          font-weight: 900;
        }

        .impactServeGrid h3 {
          margin: 0;
          font-size: 24px;
          letter-spacing: -0.03em;
        }

        .impactServeGrid p {
          max-width: 550px;
          margin: 0;
          color: #69776f;
          font-size: 13px;
          line-height: 1.7;
        }

        /* SMALL VERTICAL EDITORIAL IMAGE */

        .impactVerticalEditorial {
          margin-top: 58px;
          display: flex;
          justify-content: flex-end;
        }

        .impactVerticalEditorialImage {
          position: relative;
          width: min(31vw, 360px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 22px;
          background: #dfe8e1;
          box-shadow: 0 20px 55px rgba(20, 56, 45, 0.09);
        }

        .impactVerticalEditorialShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              to top,
              rgba(4, 29, 20, 0.18),
              transparent 42%
            );
        }

        /* APPROACH */

        .impactApproach {
          padding: 120px 0;
          background: #153b2e;
          color: white;
        }

        .impactApproachIntro {
          max-width: 880px;
        }

        .impactApproachIntro > p {
          max-width: 620px;
          margin: 22px 0 0;
          color: rgba(255,255,255,0.57);
          font-size: 15px;
          line-height: 1.75;
        }

        .impactApproachRows {
          margin-top: 65px;
          border-top: 1px solid
            rgba(255,255,255,0.13);
        }

        .impactApproachRows article {
          display: grid;
          grid-template-columns: 80px 0.8fr 1fr;
          gap: 40px;
          padding: 40px 0;
          border-bottom: 1px solid
            rgba(255,255,255,0.13);
        }

        .impactApproachNumber {
          color: #8be5a9;
          font-size: 9px;
          font-weight: 900;
        }

        .impactApproachRows h3 {
          margin: 0;
          max-width: 330px;
          font-size: 30px;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .impactApproachRows p {
          max-width: 560px;
          margin: 0;
          color: rgba(255,255,255,0.53);
          font-size: 13px;
          line-height: 1.75;
        }

        /* NUMBERS */

        .impactNumbers {
          padding: 125px 0;
          background: #f6f4ed;
        }

        .impactNumbersHeading {
          max-width: 900px;
        }

        .impactNumbersHeading > p {
          max-width: 620px;
          margin: 22px 0 0;
          color: #68766f;
          line-height: 1.75;
        }

        .impactNumbersList {
          margin-top: 70px;
          border-top: 1px solid
            rgba(20,56,45,0.15);
        }

        .impactNumbersList article {
          display: grid;
          grid-template-columns: 1fr 0.7fr;
          gap: 50px;
          align-items: center;
          padding: 38px 0;
          border-bottom: 1px solid
            rgba(20,56,45,0.15);
        }

        .impactNumbersList strong {
          font-size: clamp(48px, 7vw, 86px);
          line-height: 0.9;
          letter-spacing: -0.06em;
        }

        .impactNumbersList strong small {
          font-size: 18px;
          letter-spacing: 0;
        }

        .impactNumbersList h3 {
          margin: 0;
          font-size: 18px;
        }

        .impactNumbersList p {
          max-width: 420px;
          margin: 8px 0 0;
          color: #68766f;
          font-size: 12px;
          line-height: 1.7;
        }

        .impactLiveEstimates {
          margin-top: 70px;
          padding: 45px;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          border-radius: 24px;
          background: white;
        }

        .impactLiveEstimateIntro h3 {
          margin: 12px 0 0;
          font-size: 32px;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .impactLiveEstimateIntro p {
          color: #68766f;
          font-size: 12px;
          line-height: 1.7;
        }

        .impactLiveEstimateNumbers {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 15px;
        }

        .impactLiveEstimateNumbers > div {
          padding: 28px;
          border-radius: 17px;
          background: #eff5ef;
        }

        .impactLiveEstimateNumbers strong {
          display: block;
          font-size: 38px;
          letter-spacing: -0.05em;
        }

        .impactLiveEstimateNumbers span {
          display: block;
          margin-top: 8px;
          color: #68766f;
          font-size: 10px;
          line-height: 1.5;
        }

        /* VOICE */

        .impactVoice {
          padding: 125px 0;
          background: #071d16;
          color: white;
        }

        .impactVoiceHeading {
          max-width: 1000px;
        }

        .impactVoiceVideo {
          margin-top: 55px;
          overflow: hidden;
          border-radius: 26px;
          background: black;
        }

        .impactVoiceVideo video {
          display: block;
          width: 100%;
          max-height: 720px;
          object-fit: contain;
          background: black;
        }

        .impactVoiceCaption {
          padding: 28px 0 0;
          display: grid;
          grid-template-columns: 0.35fr 1fr;
          gap: 40px;
        }

        .impactVoiceCaption span {
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactVoiceCaption p {
          max-width: 650px;
          margin: 0;
          color: rgba(255,255,255,0.57);
          font-size: 13px;
          line-height: 1.75;
        }

        /* CIRCULAR */

        .impactCircular {
          padding: 125px 0;
          background: white;
        }

        .impactCircularGrid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .impactCircularCopy > p {
          margin: 22px 0 0;
          color: #68766f;
          font-size: 14px;
          line-height: 1.8;
        }

        .impactCircularSteps {
          margin-top: 32px;
          border-top: 1px solid
            rgba(20,56,45,0.12);
        }

        .impactCircularSteps > div {
          display: grid;
          grid-template-columns: 40px 90px 1fr;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid
            rgba(20,56,45,0.12);
        }

        .impactCircularSteps span {
          color: #13824a;
          font-size: 8px;
          font-weight: 900;
        }

        .impactCircularSteps strong {
          font-size: 12px;
        }

        .impactCircularSteps p {
          margin: 0;
          color: #68766f;
          font-size: 10px;
          line-height: 1.55;
        }

        .impactCircularMedia {
          overflow: hidden;
          border-radius: 26px;
          background: #09231a;
        }

        .impactCircularMedia video {
          display: block;
          width: 100%;
          background: black;
        }

        .impactCircularMediaCaption {
          padding: 25px 28px;
          color: white;
        }

        .impactCircularMediaCaption span {
          display: block;
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactCircularMediaCaption strong {
          display: block;
          margin-top: 7px;
          font-size: 20px;
        }

        /* WHERE */

        .impactWhere {
          padding: 125px 0;
          background: #0a281e;
          color: white;
        }

        .impactWhereTop {
          display: grid;
          grid-template-columns: 1fr 0.55fr;
          gap: 80px;
          align-items: end;
        }

        .impactWhereDescription p {
          margin: 0;
          color: rgba(255,255,255,0.55);
          font-size: 13px;
          line-height: 1.75;
        }

        .impactWhereLink {
          display: inline-flex;
          gap: 9px;
          margin-top: 20px;
          color: #8be5a9;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
        }

        .impactWherePanel {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          min-height: 560px;
          overflow: hidden;
          border: 1px solid
            rgba(255,255,255,0.1);
          border-radius: 26px;
        }

        .impactWhereVisual {
          position: relative;
          overflow: hidden;
          min-height: 560px;
          background:
            radial-gradient(
              circle at center,
              rgba(37,146,82,0.19),
              transparent 50%
            ),
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );
          background-size:
            auto,
            50px 50px,
            50px 50px;
        }

        .impactRadar {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid
            rgba(139,229,169,0.14);
          border-radius: 50%;
          transform: translate(-50%,-50%);
        }

        .radarOne {
          width: 220px;
          height: 220px;
        }

        .radarTwo {
          width: 380px;
          height: 380px;
        }

        .radarThree {
          width: 540px;
          height: 540px;
        }

        .impactMapCenter {
          position: absolute;
          top: 50%;
          left: 50%;
          text-align: center;
          transform: translate(-50%,-50%);
        }

        .impactMapCenter strong {
          display: block;
          margin-top: 14px;
          color: rgba(255,255,255,0.82);
          font-size: 13px;
          line-height: 1.4;
          letter-spacing: 0.12em;
        }

        .impactMapPulse {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          margin: auto;
          border: 1px solid #8be5a9;
          border-radius: 50%;
          box-shadow:
            0 0 0 12px rgba(139,229,169,0.06);
        }

        .impactMapPulse i {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #8be5a9;
          box-shadow:
            0 0 14px #8be5a9;
        }

        .impactLocationDot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8be5a9;
          box-shadow:
            0 0 10px rgba(139,229,169,0.9);
        }

        .dotOne { top: 22%; left: 25%; }
        .dotTwo { top: 32%; right: 19%; }
        .dotThree { bottom: 24%; left: 20%; }
        .dotFour { bottom: 17%; right: 30%; }
        .dotFive { top: 19%; left: 61%; }
        .dotSix { bottom: 39%; left: 34%; }

        .impactCommunityList {
          padding: 32px;
          background: rgba(0,0,0,0.12);
        }

        .impactCommunityTitle {
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactCommunity {
          display: grid;
          grid-template-columns: 35px 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid
            rgba(255,255,255,0.08);
        }

        .impactCommunity span {
          color: rgba(255,255,255,0.3);
          font-size: 8px;
        }

        .impactCommunity strong {
          font-size: 12px;
        }

        .impactCommunity i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8be5a9;
        }

        .impactCommunityButton {
          min-height: 46px;
          margin-top: 25px;
          padding: 0 17px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border-radius: 999px;
          background: white;
          color: #14382d;
          font-size: 10px;
          font-weight: 900;
          text-decoration: none;
        }

        /* OPPORTUNITY */

        .impactOpportunity {
          padding: 125px 0;
          background: #f5f6f1;
        }

        .impactOpportunityHeading {
          max-width: 930px;
        }

        .impactOpportunityList {
          margin-top: 70px;
          border-top: 1px solid
            rgba(20,56,45,0.14);
        }

        .impactOpportunityList article {
          display: grid;
          grid-template-columns: 100px 1fr;
          padding: 38px 0;
          border-bottom: 1px solid
            rgba(20,56,45,0.14);
        }

        .impactOpportunityList
          article > span {
          color: #13824a;
          font-size: 9px;
          font-weight: 900;
        }

        .impactOpportunityList
          article > div {
          display: grid;
          grid-template-columns: 0.55fr 1fr;
          gap: 60px;
        }

        .impactOpportunityList h3 {
          margin: 0;
          font-size: 31px;
          letter-spacing: -0.04em;
        }

        .impactOpportunityList p {
          max-width: 550px;
          margin: 0;
          color: #68766f;
          font-size: 13px;
          line-height: 1.75;
        }

        /* NETWORK */

        .impactNetwork {
          padding: 110px 0;
          background: white;
        }

        .impactNetworkInner {
          padding: 65px;
          overflow: hidden;
          border-radius: 30px;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(46,151,86,0.34),
              transparent 35%
            ),
            #08251b;
          color: white;
        }

        .impactNetworkLive {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #8be5a9;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactPulse {
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          border: 1px solid
            rgba(139,229,169,0.5);
          border-radius: 50%;
        }

        .impactPulse i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8be5a9;
          animation: impactBlink 1.2s infinite;
        }

        @keyframes impactBlink {
          50% {
            opacity: 0.25;
          }
        }

        .impactNetwork h2 {
          max-width: 900px;
        }

        .impactNetworkInner > p {
          max-width: 650px;
          margin: 23px 0 0;
          color: rgba(255,255,255,0.56);
          line-height: 1.75;
        }

        .impactNetworkButton {
          min-height: 50px;
          margin-top: 30px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border-radius: 999px;
          background: white;
          color: #14382d;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
        }

        /* MORE */

        .impactMore {
          padding: 130px 0;
          background: #f4efe3;
        }

        .impactMore > .impactContainer {
          display: grid;
          grid-template-columns: 0.6fr 1.4fr;
          gap: 90px;
        }

        .impactMoreNumber {
          padding-top: 10px;
        }

        .impactMoreNumber strong {
          display: block;
          color: #13824a;
          font-size: clamp(65px,9vw,115px);
          line-height: 0.85;
          letter-spacing: -0.07em;
        }

        .impactMoreNumber span {
          display: block;
          margin-top: 18px;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .impactMoreStory p {
          max-width: 650px;
          color: #68766f;
          font-size: 14px;
          line-height: 1.8;
        }

        .impactMoreStatement {
          display: block;
          max-width: 650px;
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid
            rgba(20,56,45,0.14);
          font-size: 20px;
          line-height: 1.5;
        }

        /* CTA */

        .impactCta {
          padding: 85px 0;
          background: #13824a;
          color: white;
        }

        .impactCtaInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
        }

        .impactCtaInner
          > div:first-child > span {
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .impactCta h2 {
          max-width: 680px;
          margin: 10px 0 0;
          font-size: clamp(42px,5.3vw,66px);
          line-height: 0.96;
          letter-spacing: -0.05em;
        }

        .impactCtaActions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .impactCtaPrimary,
        .impactCtaSecondary {
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

        .impactCtaPrimary {
          background: white;
          color: #14382d;
        }

        .impactCtaSecondary {
          border: 1px solid
            rgba(255,255,255,0.4);
          color: white;
        }

        /* TABLET */

        @media (max-width: 1000px) {

          .impactProblemGrid,
          .impactCircularGrid,
          .impactWhereTop,
          .impactMore > .impactContainer {
            grid-template-columns: 1fr;
          }

          .impactProblemGrid,
          .impactCircularGrid,
          .impactWhereTop,
          .impactMore > .impactContainer {
            gap: 50px;
          }

          .impactHorizontalCopy {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .impactWherePanel {
            grid-template-columns: 1fr;
          }

          .impactHeroStatsGrid {
            grid-template-columns: 1fr;
          }

          .impactHeroStat {
            min-height: 140px;
            padding: 25px 0;
            border-right: 0;
            border-bottom: 1px solid
              rgba(255,255,255,0.2);
          }

          .impactHeroStat:not(:first-child) {
            padding-left: 0;
          }

          .impactHeroStat:last-child {
            border-bottom: 0;
          }

          .impactLiveEstimates {
            grid-template-columns: 1fr;
          }
        }

        /* MOBILE */

        @media (max-width: 760px) {
          .impactVerticalEditorial {
            margin-top: 42px;
            justify-content: center;
          }

          .impactVerticalEditorialImage {
            width: min(68vw, 300px);
            border-radius: 18px;
          }

          .impactFullBleedMedia,
          .impactFullBleedMediaTall {
            height: 72vh;
            min-height: 520px;
            max-height: 760px;
          }



          .impactContainer {
            width: min(
              100% - 28px,
              1200px
            );
          }

          .impactHero {
            min-height: 600px;
          }

          .impactHeroInner {
            padding-top: 110px;
            padding-bottom: 55px;
          }

          .impactHero h1 {
            font-size: clamp(
              45px,
              13vw,
              64px
            );
          }

          .impactHeroIntro {
            font-size: 14px;
          }

          .impactPeople,
          .impactProblem,
          .impactServe,
          .impactApproach,
          .impactNumbers,
          .impactVoice,
          .impactCircular,
          .impactWhere,
          .impactOpportunity,
          .impactNetwork,
          .impactMore {
            padding: 80px 0;
          }

          .impactEditorialHeading h2,
          .impactProblem h2,
          .impactServeHeading h2,
          .impactApproachIntro h2,
          .impactNumbersHeading h2,
          .impactVoiceHeading h2,
          .impactCircularCopy h2,
          .impactWhereTop h2,
          .impactOpportunityHeading h2,
          .impactNetwork h2,
          .impactMore h2 {
            font-size: clamp(
              38px,
              11vw,
              52px
            );
          }

          /* CLINIC */

          .impactFeatureImage {
            min-height: 0;
            aspect-ratio: 16 / 10;
          }

          .impactFeatureCopy {
            padding: 32px 22px;
          }

          .impactFeatureCopy > h3 {
            font-size: 39px;
          }

          .impactFeatureStatement strong {
            font-size: 19px;
          }

          .impactFeatureOutcome {
            gap: 17px;
          }

          /* STORIES */

          .impactStoriesHeading {
            margin-top: 75px;
          }

          .impactStoriesHeading h3 {
            font-size: 38px;
          }

          .impactHorizontalImage {
            min-height: 0;
            aspect-ratio: 16 / 10;
          }

          .impactHorizontalCopy {
            padding: 28px 21px;
          }

          .impactHorizontalCopy h3 {
            font-size: 32px;
          }

          /* SERVE */

          .impactServeGrid article,
          .impactApproachRows article {
            grid-template-columns: 35px 1fr;
            gap: 15px;
          }

          .impactServeGrid article p,
          .impactApproachRows article p {
            grid-column: 2;
          }

          .impactApproachRows h3 {
            font-size: 25px;
          }

          /* NUMBERS */

          .impactNumbersList article {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .impactNumbersList strong {
            font-size: 57px;
          }

          .impactLiveEstimates {
            padding: 26px 20px;
          }

          .impactLiveEstimateNumbers {
            grid-template-columns: 1fr;
          }

          /* VOICE */

          .impactVoiceCaption {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          /* CIRCULAR */

          .impactCircularSteps > div {
            grid-template-columns:
              30px 70px 1fr;
          }

          /* WHERE */

          .impactWhereVisual {
            min-height: 430px;
          }

          .radarOne {
            width: 150px;
            height: 150px;
          }

          .radarTwo {
            width: 270px;
            height: 270px;
          }

          .radarThree {
            width: 390px;
            height: 390px;
          }

          .impactCommunityList {
            padding: 24px 20px;
          }

          /* OPPORTUNITY */

          .impactOpportunityList article {
            grid-template-columns: 35px 1fr;
            gap: 15px;
          }

          .impactOpportunityList
            article > div {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .impactOpportunityList h3 {
            font-size: 26px;
          }

          /* NETWORK */

          .impactNetworkInner {
            padding: 35px 22px;
          }

          /* MORE */

          .impactMoreNumber strong {
            font-size: 75px;
          }

          /* CTA */

          .impactCta {
            padding: 70px 0;
          }

          .impactCtaInner {
            align-items: flex-start;
            flex-direction: column;
          }

          .impactCtaActions {
            width: 100%;
            flex-direction: column;
          }

          .impactCtaPrimary,
          .impactCtaSecondary {
            width: 100%;
          }
        }
      `}</style>

    </main>
  );
}
