import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <p className={styles.name}>
              TEDIS Evergreen Foundation
            </p>

            <h2>
              Energy access should create
              <br />
              opportunity, not barriers.
            </h2>

            <p className={styles.mission}>
              We use clean energy, technology and circular solutions to
              expand access to reliable electricity in hard-to-reach
              communities.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <p className={styles.label}>Explore</p>

              <Link href="/about">About</Link>
              <Link href="/impact">Impact</Link>
              <Link href="/energy-view">
                Community Network
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <p className={styles.label}>Take Action</p>

              <Link href="/donate">Donate</Link>
              <Link href="/supporters">
                Partner With Us
              </Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className={styles.locationSection}>
          <div className={styles.locationIntro}>
            <p className={styles.label}>
              Our Location
            </p>

            <h3>Find us in Makurdi.</h3>

            <p className={styles.address}>
              20 Lumper Alam Avenue
              <br />
              Makurdi, Benue State
              <br />
              Nigeria
            </p>

            <a
              href="https://maps.app.goo.gl/ziXt7R9AjzUAwV928?g_st=ipc"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Open in Google Maps ↗
            </a>

            <div className={styles.contact}>
              <p className={styles.label}>
                Contact
              </p>

              <a href="tel:+2349062442470">
                +234 906 244 2470
              </a>

              <a href="mailto:info@tedisevergreenfoundation.org.ng">
                info@tedisevergreenfoundation.org.ng
              </a>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps?q=20%20Lumper%20Alam%20Avenue%2C%20Makurdi%2C%20Benue%20State%2C%20Nigeria&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TEDIS Evergreen Foundation office location"
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} TEDIS Evergreen Foundation
          </p>

          <p>Energy changes everything.</p>
        </div>
      </div>
    </footer>
  );
}