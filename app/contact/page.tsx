"use client";

import { FormEvent, useState } from "react";
import Footer from "../components/Footer/Footer";

export default function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();

    setSubmissionStatus("sending");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          organisation,
          subject,
          message,
          website,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Your message could not be sent. Please try again."
        );
      }

      form.reset();
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Thank you. Your message has been sent successfully. Our team will respond as soon as possible."
      );
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again."
      );
    }
  };

  return (
    <main className="contactPage">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="contactHero">
        <div className="contactHeroGlow contactGlowOne" />
        <div className="contactHeroGlow contactGlowTwo" />

        <div className="contactContainer contactHeroInner">
          <span className="contactLabel light">CONTACT US</span>

          <h1>
            Start a conversation
            <br />
            that can move
            <br />
            something forward.
          </h1>

          <p className="contactHeroIntro">
            Whether you want to partner with us, support a community,
            contribute technology or equipment, learn more about our work,
            or simply reach our team, we would like to hear from you.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT DETAILS
      ====================================================== */}

      <section className="contactDetails">
        <div className="contactContainer">
          <div className="contactDetailsGrid">
            <div className="contactDetailsIntro">
              <span className="contactLabel">GET IN TOUCH</span>

              <h2>
                The right conversation
                can become practical
                action.
              </h2>

              <p>
                Our work brings together communities, clean energy,
                technology, circular solutions and partners who believe
                geography or income should not determine access to
                opportunity.
              </p>
            </div>

            <div className="contactChannels">
              <a
                href="mailto:info@tedisevergreenfoundation.org.ng"
                className="contactChannel"
              >
                <span className="contactChannelNumber">01</span>

                <div>
                  <span className="contactChannelLabel">EMAIL</span>
                  <strong>info@tedisevergreenfoundation.org.ng</strong>
                  <p>
                    General enquiries, partnerships, programmes and
                    organisational correspondence.
                  </p>
                </div>

                <span className="contactChannelArrow">↗</span>
              </a>

              <a
                href="tel:+2349062442470"
                className="contactChannel"
              >
                <span className="contactChannelNumber">02</span>

                <div>
                  <span className="contactChannelLabel">PHONE</span>
                  <strong>+234 906 244 2470</strong>
                  <p>
                    Speak with our team about enquiries relating to our
                    programmes and community work.
                  </p>
                </div>

                <span className="contactChannelArrow">↗</span>
              </a>

              <a
                href="https://maps.app.goo.gl/ziXt7R9AjzUAwV928?g_st=ipc"
                target="_blank"
                rel="noreferrer"
                className="contactChannel"
              >
                <span className="contactChannelNumber">03</span>

                <div>
                  <span className="contactChannelLabel">HEAD OFFICE</span>
                  <strong>Makurdi, Benue State</strong>
                  <p>
                    20 Lumper Alam Avenue, Makurdi, Benue State, Nigeria.
                  </p>
                </div>

                <span className="contactChannelArrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}

      <section className="contactFormSection">
        <div className="contactContainer contactFormGrid">
          <div className="contactFormIntro">
            <span className="contactLabel light">SEND A MESSAGE</span>

            <h2>
              Tell us what you
              would like to
              work on.
            </h2>

            <p>
              Give us a little context about your enquiry and the most
              appropriate member of our team can continue the conversation
              with you.
            </p>

            <div className="contactFormNote">
              <span>PARTNERSHIPS</span>
              <p>
                If you are reaching out on behalf of an organisation,
                institution, company or community, include the organisation
                name and what kind of collaboration you have in mind.
              </p>
            </div>
          </div>

          <form className="contactForm" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="contactHoneypot"
            />
            <div className="contactFieldRow">
              <label className="contactField">
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                />
              </label>

              <label className="contactField">
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label className="contactField">
              <span>Organisation</span>
              <input
                type="text"
                name="organisation"
                placeholder="Organisation or company, if applicable"
              />
            </label>

            <label className="contactField">
              <span>What are you contacting us about?</span>
              <select name="subject" defaultValue="" required>
                <option value="" disabled>
                  Select an enquiry
                </option>
                <option value="Partnership enquiry">
                  Partnership
                </option>
                <option value="Community energy enquiry">
                  Community energy
                </option>
                <option value="Technology partnership enquiry">
                  Technology partnership
                </option>
                <option value="Equipment or circular recovery enquiry">
                  Equipment or circular recovery
                </option>
                <option value="Donation enquiry">
                  Donation
                </option>
                <option value="Media enquiry">
                  Media
                </option>
                <option value="General enquiry">
                  General enquiry
                </option>
              </select>
            </label>

            <label className="contactField">
              <span>Your message</span>
              <textarea
                name="message"
                rows={7}
                placeholder="Tell us how we can help or what you would like to explore with us."
                required
              />
            </label>

            <div className="contactSubmitRow">
              <button
                type="submit"
                className="contactSubmit"
                disabled={submissionStatus === "sending"}
              >
                {submissionStatus === "sending"
                  ? "Sending..."
                  : "Send Message"}
                <span>↗</span>
              </button>

            </div>

            {submissionStatus === "success" && (
              <div className="contactSuccess">
                {submissionMessage}
              </div>
            )}

            {submissionStatus === "error" && (
              <div className="contactError" role="alert">
                {submissionMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* =====================================================
          REASONS TO CONTACT
      ====================================================== */}

      <section className="contactReasons">
        <div className="contactContainer">
          <div className="contactReasonsHeading">
            <span className="contactLabel">WORK WITH US</span>

            <h2>
              Different conversations.
              <br />
              One shared direction.
            </h2>
          </div>

          <div className="contactReasonsGrid">
            <article>
              <span>01</span>
              <h3>Partner with us</h3>
              <p>
                Explore institutional, development, corporate or community
                partnerships that can strengthen clean-energy access.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Support a community</h3>
              <p>
                Talk to us about supporting energy access for households,
                microbusinesses or essential community facilities.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Bring technology</h3>
              <p>
                Work with us on digital infrastructure, connected systems,
                monitoring, data and technology that can strengthen our work.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Support circular recovery</h3>
              <p>
                Explore responsible recovery and circular pathways for solar,
                electronic and related materials.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION
      ====================================================== */}

      <section className="contactLocation">
        <div className="contactContainer contactLocationGrid">
          <div>
            <span className="contactLabel light">OUR LOCATION</span>

            <h2>
              Our work travels.
              <br />
              Our office is in
              Makurdi.
            </h2>
          </div>

          <div className="contactLocationCard">
            <span>HEAD OFFICE</span>

            <h3>
              20 Lumper Alam Avenue,
              <br />
              Makurdi, Benue State,
              <br />
              Nigeria.
            </h3>

            <div className="contactLocationActions">
              <a
                href="https://maps.app.goo.gl/ziXt7R9AjzUAwV928?g_st=ipc"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
                <span>↗</span>
              </a>

              <a href="tel:+2349062442470">
                Call our office
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT
      ====================================================== */}

      <section className="contactClosing">
        <div className="contactContainer">
          <span className="contactLabel">TEDIS EVERGREEN FOUNDATION</span>

          <h2>
            Clean energy should
            reach people wherever
            opportunity needs it.
          </h2>

          <a
            href="mailto:info@tedisevergreenfoundation.org.ng"
            className="contactClosingLink"
          >
            info@tedisevergreenfoundation.org.ng
            <span>↗</span>
          </a>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .contactPage {
          min-height: 100vh;
          overflow-x: hidden;
          background: #ffffff;
          color: #14382d;
        }

        .contactContainer {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }

        .contactLabel {
          display: block;
          color: #13824a;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .contactLabel.light {
          color: #8be5a9;
        }

        /* HERO */

        .contactHero {
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

        .contactHero::before {
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

        .contactHeroGlow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .contactGlowOne {
          width: 650px;
          height: 650px;
          right: -180px;
          top: -270px;
          background:
            radial-gradient(
              circle,
              rgba(67, 181, 107, 0.24),
              transparent 68%
            );
        }

        .contactGlowTwo {
          width: 480px;
          height: 480px;
          left: 32%;
          bottom: -310px;
          background:
            radial-gradient(
              circle,
              rgba(139,229,169,0.11),
              transparent 70%
            );
        }

        .contactHeroInner {
          position: relative;
          z-index: 2;
          padding-top: 150px;
          padding-bottom: 82px;
        }

        .contactHero h1 {
          max-width: 1050px;
          margin: 18px 0 0;
          font-size: clamp(58px, 7.5vw, 98px);
          line-height: 0.92;
          letter-spacing: -0.065em;
        }

        .contactHeroIntro {
          max-width: 700px;
          margin: 30px 0 0;
          color: rgba(255,255,255,0.68);
          font-size: 17px;
          line-height: 1.75;
        }

        /* DETAILS */

        .contactDetails {
          padding: 125px 0;
          background: #f4f7f3;
        }

        .contactDetailsGrid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 100px;
        }

        .contactDetailsIntro h2,
        .contactFormIntro h2,
        .contactReasonsHeading h2,
        .contactLocation h2,
        .contactClosing h2 {
          margin: 15px 0 0;
          font-size: clamp(44px, 5.6vw, 72px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .contactDetailsIntro > p {
          max-width: 520px;
          margin: 26px 0 0;
          color: #68776f;
          font-size: 14px;
          line-height: 1.85;
        }

        .contactChannels {
          border-top: 1px solid rgba(20,56,45,0.14);
        }

        .contactChannel {
          display: grid;
          grid-template-columns: 50px 1fr 30px;
          gap: 20px;
          padding: 31px 0;
          align-items: start;
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid rgba(20,56,45,0.14);
          transition: padding 180ms ease;
        }

        .contactChannel:hover {
          padding-left: 10px;
        }

        .contactChannelNumber {
          color: #13824a;
          font-size: 9px;
          font-weight: 900;
        }

        .contactChannelLabel {
          display: block;
          color: #13824a;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.14em;
        }

        .contactChannel strong {
          display: block;
          margin-top: 9px;
          font-size: clamp(18px, 2vw, 25px);
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .contactChannel p {
          max-width: 550px;
          margin: 10px 0 0;
          color: #68776f;
          font-size: 12px;
          line-height: 1.7;
        }

        .contactChannelArrow {
          justify-self: end;
          color: #13824a;
          font-size: 18px;
        }

        /* FORM */

        .contactFormSection {
          padding: 125px 0;
          background: #0b2b20;
          color: white;
        }

        .contactFormGrid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 100px;
        }

        .contactFormIntro > p {
          max-width: 530px;
          margin: 25px 0 0;
          color: rgba(255,255,255,0.57);
          font-size: 14px;
          line-height: 1.8;
        }

        .contactFormNote {
          max-width: 500px;
          margin-top: 55px;
          padding-top: 25px;
          border-top: 1px solid rgba(255,255,255,0.15);
        }

        .contactFormNote span {
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .contactFormNote p {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.47);
          font-size: 12px;
          line-height: 1.7;
        }

        .contactForm {
          padding: 42px;
          border-radius: 28px;
          background: white;
          color: #14382d;
        }

        .contactFieldRow {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .contactField {
          display: block;
          margin-bottom: 22px;
        }

        .contactField > span {
          display: block;
          margin-bottom: 9px;
          color: #40534b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .contactField input,
        .contactField select,
        .contactField textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(20,56,45,0.14);
          border-radius: 14px;
          outline: none;
          background: #f7f8f5;
          color: #14382d;
          font: inherit;
          font-size: 13px;
          transition:
            border 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
        }

        .contactField input,
        .contactField select {
          min-height: 52px;
          padding: 0 15px;
        }

        .contactField textarea {
          min-height: 175px;
          padding: 15px;
          resize: vertical;
          line-height: 1.7;
        }

        .contactField input:focus,
        .contactField select:focus,
        .contactField textarea:focus {
          border-color: #13824a;
          background: white;
          box-shadow: 0 0 0 3px rgba(19,130,74,0.08);
        }

        .contactSubmitRow {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 6px;
        }

        .contactSubmit {
          min-height: 52px;
          padding: 0 23px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-shrink: 0;
          border: 0;
          border-radius: 999px;
          background: #13824a;
          color: white;
          font-size: 11px;
          font-weight: 900;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .contactSubmit:hover {
          transform: translateY(-2px);
          background: #106f3f;
        }

        .contactSubmit:disabled {
          cursor: not-allowed;
          opacity: 0.65;
          transform: none;
        }

        .contactSubmitRow p {
          max-width: 330px;
          margin: 0;
          color: #7a8881;
          font-size: 10px;
          line-height: 1.55;
        }

        .contactSuccess {
          margin-top: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          background: #edf7ef;
          color: #126f3d;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.6;
        }

        .contactError {
          margin-top: 20px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.6;
        }

        .contactHoneypot {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* REASONS */

        .contactReasons {
          padding: 125px 0;
          background: white;
        }

        .contactReasonsHeading {
          max-width: 900px;
        }

        .contactReasonsGrid {
          margin-top: 70px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(20,56,45,0.13);
          border-left: 1px solid rgba(20,56,45,0.13);
        }

        .contactReasonsGrid article {
          min-height: 330px;
          padding: 30px;
          border-right: 1px solid rgba(20,56,45,0.13);
          border-bottom: 1px solid rgba(20,56,45,0.13);
        }

        .contactReasonsGrid article > span {
          color: #13824a;
          font-size: 9px;
          font-weight: 900;
        }

        .contactReasonsGrid h3 {
          margin: 75px 0 0;
          font-size: 26px;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .contactReasonsGrid p {
          margin: 17px 0 0;
          color: #68776f;
          font-size: 12px;
          line-height: 1.75;
        }

        /* LOCATION */

        .contactLocation {
          padding: 125px 0;
          background: #f4efe3;
        }

        .contactLocationGrid {
          display: grid;
          grid-template-columns: 1fr 0.75fr;
          gap: 100px;
          align-items: end;
        }

        .contactLocationCard {
          padding: 42px;
          border-radius: 25px;
          background: #14382d;
          color: white;
        }

        .contactLocationCard > span {
          color: #8be5a9;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .contactLocationCard h3 {
          margin: 18px 0 0;
          font-size: clamp(28px, 3.3vw, 42px);
          line-height: 1.12;
          letter-spacing: -0.045em;
        }

        .contactLocationActions {
          margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.14);
        }

        .contactLocationActions a {
          padding: 17px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          color: white;
          font-size: 11px;
          font-weight: 800;
          text-decoration: none;
        }

        .contactLocationActions a span {
          color: #8be5a9;
        }

        /* CLOSING */

        .contactClosing {
          padding: 135px 0;
          background: white;
        }

        .contactClosing h2 {
          max-width: 900px;
        }

        .contactClosingLink {
          margin-top: 35px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #13824a;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        /* TABLET */

        @media (max-width: 1000px) {
          .contactDetailsGrid,
          .contactFormGrid,
          .contactLocationGrid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .contactReasonsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* MOBILE */

        @media (max-width: 760px) {
          .contactContainer {
            width: min(100% - 28px, 1200px);
          }

          .contactHero {
            min-height: 620px;
          }

          .contactHeroInner {
            padding-top: 110px;
            padding-bottom: 58px;
          }

          .contactHero h1 {
            font-size: clamp(45px, 13vw, 62px);
          }

          .contactHeroIntro {
            font-size: 14px;
          }

          .contactDetails,
          .contactFormSection,
          .contactReasons,
          .contactLocation,
          .contactClosing {
            padding: 80px 0;
          }

          .contactDetailsIntro h2,
          .contactFormIntro h2,
          .contactReasonsHeading h2,
          .contactLocation h2,
          .contactClosing h2 {
            font-size: clamp(38px, 11vw, 52px);
          }

          .contactChannel {
            grid-template-columns: 35px 1fr 20px;
            gap: 12px;
          }

          .contactChannel strong {
            font-size: 17px;
          }

          .contactForm {
            padding: 28px 20px;
            border-radius: 22px;
          }

          .contactFieldRow {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .contactSubmitRow {
            align-items: flex-start;
            flex-direction: column;
          }

          .contactSubmit {
            width: 100%;
          }

          .contactReasonsGrid {
            grid-template-columns: 1fr;
          }

          .contactReasonsGrid article {
            min-height: 280px;
            padding: 26px 22px;
          }

          .contactReasonsGrid h3 {
            margin-top: 55px;
          }

          .contactLocationCard {
            padding: 30px 22px;
          }

          .contactClosingLink {
            font-size: 11px;
          }
        }
      `}</style>
    </main>
  );
}
