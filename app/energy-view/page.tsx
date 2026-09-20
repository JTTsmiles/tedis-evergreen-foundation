"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DAILY_CARBON_PREVENTED_KG,
  DAILY_ENERGY_KWH,
  TOTAL_SYSTEMS,
  WASTE_RECOVERED_TONS,
  getCumulativeImpact,
} from "../../src/lib/impactMetrics";

/* =========================================================
   NETWORK MODEL
========================================================= */

/* =========================================================
   TYPES
========================================================= */

type CommunityStatus =
  | "Active"
  | "Monitoring"
  | "Attention";

type Fault = {
  systemId: string;
  fault: string;
  code: string;
  status: "Down";
};

type Community = {
  name: string;
  area: string;
  systems: number;
  status: CommunityStatus;
  load: number;
  x: number;
  y: number;
  faults?: Fault[];
};

/* =========================================================
   NETWORK DATA

   IMPORTANT:
   Community status and individual system status are separate.

   Example:
   Aondona = 93 deployed systems.
   90 are operating.
   3 individual systems require attention.
========================================================= */

const COMMUNITIES: Community[] = [
  {
    name: "Akodoo",
    area: "Benue State",
    systems: 146,
    status: "Active",
    load: 72,
    x: 21,
    y: 29,
  },
  {
    name: "Mbatiav",
    area: "Benue State",
    systems: 120,
    status: "Active",
    load: 61,
    x: 35,
    y: 18,
  },
  {
    name: "Ikparev",
    area: "Benue State",
    systems: 111,
    status: "Monitoring",
    load: 68,
    x: 48,
    y: 28,
  },
  {
    name: "Tse Kuchi",
    area: "Benue State",
    systems: 106,
    status: "Active",
    load: 57,
    x: 62,
    y: 18,
  },
  {
    name: "Shawa",
    area: "Benue State",
    systems: 124,
    status: "Active",
    load: 74,
    x: 76,
    y: 30,
  },

  /* =======================================================
     THIS COMMUNITY CONTAINS THE 3 SYSTEM FAULTS
  ======================================================= */

  {
    name: "Aondona",
    area: "Benue State",
    systems: 93,
    status: "Attention",
    load: 58,
    x: 85,
    y: 44,
    faults: [
      {
        systemId: "TE900-AON-041",
        fault:
          "Battery undervoltage detected",
        code: "BAT-UV-04",
        status: "Down",
      },
      {
        systemId: "TE900-AON-067",
        fault:
          "Inverter output fault",
        code: "INV-OUT-02",
        status: "Down",
      },
      {
        systemId: "TE900-AON-082",
        fault:
          "IoT communication loss",
        code: "COM-GW-01",
        status: "Down",
      },
    ],
  },

  {
    name: "Uturugh",
    area: "Benue State",
    systems: 121,
    status: "Active",
    load: 66,
    x: 73,
    y: 55,
  },
  {
    name: "Daula Jato",
    area: "Benue State",
    systems: 104,
    status: "Active",
    load: 63,
    x: 60,
    y: 44,
  },
  {
    name: "Mbadede",
    area: "Benue State",
    systems: 117,
    status: "Monitoring",
    load: 51,
    x: 46,
    y: 51,
  },
  {
    name: "Opaha",
    area: "Benue State",
    systems: 102,
    status: "Active",
    load: 77,
    x: 31,
    y: 48,
  },
  {
    name: "Ugbobi",
    area: "Benue State",
    systems: 115,
    status: "Active",
    load: 69,
    x: 18,
    y: 58,
  },
  {
    name: "Ikobi",
    area: "Benue State",
    systems: 89,
    status: "Monitoring",
    load: 47,
    x: 27,
    y: 68,
  },
  {
    name: "Amla",
    area: "Benue State",
    systems: 107,
    status: "Active",
    load: 64,
    x: 42,
    y: 69,
  },
  {
    name: "Emichi",
    area: "Benue State",
    systems: 96,
    status: "Active",
    load: 71,
    x: 55,
    y: 62,
  },
  {
    name: "Okpomaju",
    area: "Benue State",
    systems: 118,
    status: "Active",
    load: 62,
    x: 68,
    y: 70,
  },
  {
    name: "Odejo",
    area: "Benue State",
    systems: 109,
    status: "Monitoring",
    load: 55,
    x: 81,
    y: 69,
  },
  {
    name: "Inikiri",
    area: "Benue State",
    systems: 103,
    status: "Active",
    load: 73,
    x: 75,
    y: 82,
  },
  {
    name: "Okputu",
    area: "Benue State",
    systems: 114,
    status: "Active",
    load: 67,
    x: 60,
    y: 83,
  },
  {
    name: "Amaeke",
    area: "Benue State",
    systems: 94,
    status: "Active",
    load: 59,
    x: 47,
    y: 82,
  },
  {
    name: "Ojiegbe",
    area: "Benue State",
    systems: 108,
    status: "Active",
    load: 58,
    x: 34,
    y: 84,
  },
  {
    name: "Odun",
    area: "Benue State",
    systems: 91,
    status: "Active",
    load: 65,
    x: 20,
    y: 81,
  },
  {
    name: "Onyenu",
    area: "Benue State",
    systems: 98,
    status: "Monitoring",
    load: 49,
    x: 13,
    y: 69,
  },
  {
    name: "Obokata",
    area: "Benue State",
    systems: 104,
    status: "Active",
    load: 76,
    x: 12,
    y: 45,
  },
  {
    name: "Ekpuphu",
    area: "Benue State",
    systems: 110,
    status: "Active",
    load: 60,
    x: 14,
    y: 24,
  },
  {
    name: "Tse Torkula",
    area: "Benue State",
    systems: 100,
    status: "Active",
    load: 70,
    x: 27,
    y: 16,
  },
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

function statusClass(
  status: CommunityStatus
) {
  return status.toLowerCase();
}

/* =========================================================
   PAGE
========================================================= */

export default function EnergyViewPage() {
  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const [
    selectedCommunity,
    setSelectedCommunity,
  ] = useState<Community>(
    COMMUNITIES[0]
  );

  const [search, setSearch] =
    useState("");

  const [now, setNow] =
    useState(Date.now());

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setNow(Date.now());
      }, 60_000);

    return () =>
      window.clearInterval(timer);
  }, []);

  const impact = useMemo(() => {
    return getCumulativeImpact(now);
  }, [now]);

  const totalFaults =
    COMMUNITIES.reduce(
      (total, community) =>
        total +
        (community.faults?.length || 0),
      0
    );

  const activeSystems =
    TOTAL_SYSTEMS - totalFaults;

  const activeCommunityCount =
    COMMUNITIES.filter(
      (community) =>
        community.status === "Active"
    ).length;

  const monitoringCommunityCount =
    COMMUNITIES.filter(
      (community) =>
        community.status ===
        "Monitoring"
    ).length;

  const attentionCommunityCount =
    COMMUNITIES.filter(
      (community) =>
        community.status ===
        "Attention"
    ).length;

  const filteredCommunities =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return COMMUNITIES;
      }

      return COMMUNITIES.filter(
        (community) => {
          const faultMatch =
            community.faults?.some(
              (fault) =>
                fault.fault
                  .toLowerCase()
                  .includes(query) ||
                fault.systemId
                  .toLowerCase()
                  .includes(query) ||
                fault.code
                  .toLowerCase()
                  .includes(query)
            );

          return (
            community.name
              .toLowerCase()
              .includes(query) ||
            community.status
              .toLowerCase()
              .includes(query) ||
            faultMatch
          );
        }
      );
    }, [search]);

  const selectedFaultCount =
    selectedCommunity.faults?.length ||
    0;

  const selectedOperatingSystems =
    selectedCommunity.systems -
    selectedFaultCount;

  return (
    <main className="energy-page">

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <header className="energy-nav">

        <div className="energy-nav-inner">

          <Link
            href="/"
            className="energy-logo"
          >
            <Image
              src="/logo.jpeg"
              alt="TEDIS Evergreen Foundation"
              width={220}
              height={100}
              priority
            />
          </Link>

          <nav className="desktop-nav">

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

            <Link
              href="/energy-view"
              className="current-network-link"
            >
              <span className="nav-live-ring">
                <span />
              </span>

              <strong>
                LIVE
              </strong>

              Community Network
            </Link>

            <Link
              href="/donate"
              className="donate-button"
            >
              Donate
            </Link>

          </nav>

          <div className="mobile-actions">

            <span className="mobile-network-status">
              <i />
              LIVE
            </span>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMobileMenuOpen(
                  (open) => !open
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

              <Link href="/energy-view">
                Community Network
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

      <section className="network-hero">

        <div className="hero-grid-background" />

        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="energy-container network-hero-content">

          <div className="network-kicker">

            <span className="hero-live-icon">
              <span />
            </span>

            <strong>
              LIVE COMMUNITY ENERGY
              NETWORK
            </strong>

            <span className="network-online">
              NETWORK ONLINE
            </span>

          </div>

          <h1>
            See the network
            as it operates.
          </h1>

          <p>
            Monitor distributed TED
            Evergreen Smart Energy 900
            systems across participating
            communities, including system
            health, energy activity,
            detected faults and
            field-support needs.
          </p>

          <div className="hero-stats">

            <div>

              <span className="hero-stat-label live">
                <i />
                OPERATING
              </span>

              <strong>
                {formatNumber(
                  activeSystems
                )}
              </strong>

              <small>
                Systems Operating Normally
              </small>

            </div>

            <div>

              <span className="hero-stat-label">
                LIVE OUTPUT
              </span>

              <strong>
                {formatNumber(
                  DAILY_ENERGY_KWH,
                  1
                )}
              </strong>

              <small>
                kWh / Day
              </small>

            </div>

            <div>

              <span className="hero-stat-label fault">
                <i />
                ATTENTION
              </span>

              <strong>
                {totalFaults}
              </strong>

              <small>
                Systems Requiring Attention
              </small>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          METRICS
      ====================================================== */}

      <section className="metrics-section">

        <div className="energy-container">

          <div className="section-heading-row">

            <div>

              <span className="section-eyebrow">
                Network Overview
              </span>

              <h2>
                Community energy,
                continuously visible.
              </h2>

            </div>

            <div className="network-health-card">

              <span className="network-health-pulse">
                <i />
              </span>

              <div>

                <strong>
                  Network monitoring active
                </strong>

                <small>
                  AI + IoT telemetry enabled
                </small>

              </div>

            </div>

          </div>

          <div className="metric-grid">

            <div className="metric-card dark">

              <span className="metric-index">
                01
              </span>

              <strong className="metric-value">
                {formatNumber(
                  impact.cumulativeEnergyKwh /
                    1000,
                  1
                )}

                <small>
                  MWh
                </small>
              </strong>

              <h3>
                Cumulative Energy
              </h3>

              <div className="metric-footer">
                +
                {formatNumber(
                  DAILY_ENERGY_KWH,
                  1
                )}{" "}
                kWh/day
              </div>

            </div>

            <div className="metric-card">

              <span className="metric-index">
                02
              </span>

              <strong className="metric-value">
                {formatNumber(
                  impact.cumulativeCarbonKg /
                    1000,
                  1
                )}

                <small>
                  t
                </small>
              </strong>

              <h3>
                Cumulative CO₂ Prevented
              </h3>

              <div className="metric-footer">
                +
                {formatNumber(
                  DAILY_CARBON_PREVENTED_KG,
                  2
                )}{" "}
                kg/day
              </div>

            </div>

            <div className="metric-card">

              <span className="metric-index">
                03
              </span>

              <strong className="metric-value">
                {formatNumber(
                  WASTE_RECOVERED_TONS
                )}

                <small>
                  tons
                </small>
              </strong>

              <h3>
                Waste Recovered
              </h3>

              <div className="metric-footer">
                Circular recovery
              </div>

            </div>

            <div className="metric-card">

              <span className="metric-index">
                04
              </span>

              <strong className="metric-value">
                {COMMUNITIES.length}

              </strong>

              <h3>
                Communities
              </h3>

              <div className="metric-footer">
                Network expanding
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LIVE NETWORK
      ====================================================== */}

      <section className="live-map-section">

        <div className="energy-container">

          <div className="live-map-heading">

            <div>

              <span className="section-eyebrow light">
                Live Network
              </span>

              <h2>
                See system health
                across the network.
              </h2>

            </div>

          </div>

          {/* =================================================
              NETWORK STATUS
          ================================================= */}

          <div className="network-status-strip">

            <div className="status-chip">

              <span className="status-flash green" />

              <strong>
                {activeCommunityCount}
              </strong>

              <span>
                Communities Active
              </span>

            </div>

            <div className="status-chip">

              <span className="status-flash amber" />

              <strong>
                {monitoringCommunityCount}
              </strong>

              <span>
                Monitoring
              </span>

            </div>

            <div className="status-chip attention-chip">

              <span className="status-flash red" />

              <strong>
                {totalFaults}
              </strong>

              <span>
                Systems Require Attention
              </span>

            </div>

          </div>

          <div className="network-dashboard">

            {/* ===============================================
                MAP
            =============================================== */}

            <div className="community-map">

              <div className="map-header">

                <div>

                  <span className="map-live-pulse">
                    <i />
                  </span>

                  <strong>
                    Live System Telemetry
                  </strong>

                </div>

                <span>
                  Benue State · Nigeria
                </span>

              </div>

              <div className="map-canvas">

                <div className="map-grid" />

                {/* ===========================================
                    RADAR
                =========================================== */}

                <div className="radar-center">

                  <div className="radar-circle radar-circle-one" />

                  <div className="radar-circle radar-circle-two" />

                  <div className="radar-circle radar-circle-three" />

                  <div className="radar-sweep" />

                </div>

                {/* ===========================================
                    LIVE NETWORK LINES
                =========================================== */}

                <div className="network-line line-1" />
                <div className="network-line line-2" />
                <div className="network-line line-3" />
                <div className="network-line line-4" />
                <div className="network-line line-5" />
                <div className="network-line line-6" />

                <div className="map-river river-one" />
                <div className="map-river river-two" />

                <div className="region-outline">

                  <span>
                    COMMUNITY
                    <br />
                    ENERGY
                    <br />
                    NETWORK
                  </span>

                </div>

                {/* ===========================================
                    COMMUNITY NODES
                =========================================== */}

                {COMMUNITIES.map(
                  (community) => (
                    <button
                      type="button"
                      key={community.name}
                      className={`community-node ${statusClass(
                        community.status
                      )} ${
                        selectedCommunity.name ===
                        community.name
                          ? "selected"
                          : ""
                      }`}
                      style={{
                        left: `${community.x}%`,
                        top: `${community.y}%`,
                      }}
                      onClick={() =>
                        setSelectedCommunity(
                          community
                        )
                      }
                      aria-label={`View ${community.name}`}
                    >

                      <span className="node-outer-ring" />
                      <span className="node-inner-ring" />
                      <span className="node-core" />

                      {/* Red alert sits beside green node */}
                      {community.faults &&
                        community.faults.length >
                          0 && (
                          <span className="node-fault-alert">
                            {
                              community
                                .faults
                                .length
                            }
                          </span>
                        )}

                      <span className="node-label">

                        {community.name}

                        {community.faults &&
                          community.faults
                            .length > 0 && (
                            <strong>
                              {
                                community
                                  .faults
                                  .length
                              }{" "}
                              ALERTS
                            </strong>
                          )}

                      </span>

                    </button>
                  )
                )}

                <div className="map-legend">

                  <div>
                    <i className="green" />
                    Operating
                  </div>

                  <div>
                    <i className="amber" />
                    Monitoring
                  </div>

                  <div>
                    <i className="red flashing-red" />
                    System Fault
                  </div>

                </div>

              </div>

            </div>

            {/* ===============================================
                COMMUNITY PANEL
            =============================================== */}

            <aside
              className={`community-panel ${
                selectedFaultCount > 0
                  ? "community-panel-attention"
                  : ""
              }`}
            >

              <div className="panel-header">

                <div>

                  <span className="panel-eyebrow">
                    Selected Community
                  </span>

                  <h3>
                    {selectedCommunity.name}
                  </h3>

                  <p>
                    {selectedCommunity.area}
                  </p>

                </div>

                <span
                  className={`panel-status ${statusClass(
                    selectedCommunity.status
                  )}`}
                >
                  <i />

                  {
                    selectedCommunity.status
                  }
                </span>

              </div>

              {/* =============================================
                  COMMUNITY SYSTEM SUMMARY
              ============================================= */}

              <div className="community-health-summary">

                <div>

                  <span>
                    Total Systems
                  </span>

                  <strong>
                    {
                      selectedCommunity.systems
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    Operating
                  </span>

                  <strong className="operating-value">
                    {
                      selectedOperatingSystems
                    }
                  </strong>

                </div>

                <div>

                  <span>
                    Attention
                  </span>

                  <strong
                    className={
                      selectedFaultCount > 0
                        ? "attention-value"
                        : ""
                    }
                  >
                    {selectedFaultCount}
                  </strong>

                </div>

              </div>

              {/* =============================================
                  FAULTS
              ============================================= */}

              {selectedFaultCount > 0 && (
                <div className="fault-alert-panel">

                  <div className="fault-panel-title">

                    <div className="fault-warning-symbol">
                      !
                    </div>

                    <div>

                      <span>
                        SYSTEM ALERT
                      </span>

                      <strong>
                        {selectedFaultCount}{" "}
                        systems require
                        attention
                      </strong>

                    </div>

                  </div>

                  <div className="fault-list">

                    {selectedCommunity.faults?.map(
                      (fault) => (
                        <div
                          key={
                            fault.systemId
                          }
                          className="fault-item"
                        >

                          <div className="fault-item-top">

                            <div>

                              <span>
                                SYSTEM ID
                              </span>

                              <strong>
                                {
                                  fault.systemId
                                }
                              </strong>

                            </div>

                            <span className="system-down-badge">
                              <i />
                              DOWN
                            </span>

                          </div>

                          <p>
                            {fault.fault}
                          </p>

                          <div className="fault-code-row">

                            <span>
                              Fault Code
                            </span>

                            <strong>
                              {fault.code}
                            </strong>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                  <div className="field-response-alert">

                    <span className="response-pulse" />

                    <div>
                      <strong>
                        Field support required
                      </strong>

                      <small>
                        Alert visible to the
                        technical support team
                      </small>
                    </div>

                  </div>

                </div>
              )}

              {/* =============================================
                  SYSTEM
              ============================================= */}

              <div className="system-name-card">

                <span>
                  Energy System
                </span>

                <strong>
                  TED Evergreen Smart
                  Energy 900
                </strong>

              </div>

              <div className="load-section">

                <div className="load-label">

                  <span>
                    Community energy use
                  </span>

                  <strong>
                    {
                      selectedCommunity.load
                    }%
                  </strong>

                </div>

                <div className="load-bar">

                  <span
                    style={{
                      width: `${selectedCommunity.load}%`,
                    }}
                  />

                </div>

              </div>

              {/* =============================================
                  TELEMETRY
              ============================================= */}

              <div className="telemetry">

                <div>

                  <span className="telemetry-symbol">
                    ◉
                  </span>

                  <div>

                    <strong>
                      IoT connection
                    </strong>

                    <small>
                      Remote telemetry
                    </small>

                  </div>

                  <span className="telemetry-ok">
                    Online
                  </span>

                </div>

                <div>

                  <span className="telemetry-symbol">
                    ⚡
                  </span>

                  <div>

                    <strong>
                      Community energy
                    </strong>

                    <small>
                      Network output
                    </small>

                  </div>

                  <span className="telemetry-ok">
                    Active
                  </span>

                </div>

                <div>

                  <span className="telemetry-symbol">
                    ◎
                  </span>

                  <div>

                    <strong>
                      Field support
                    </strong>

                    <small>
                      Technical response
                    </small>

                  </div>

                  <span
                    className={
                      selectedFaultCount >
                      0
                        ? "telemetry-alert"
                        : "telemetry-ok"
                    }
                  >
                    {selectedFaultCount >
                    0
                      ? "Required"
                      : "Ready"}
                  </span>

                </div>

              </div>

              <div className="panel-ai-note">

                <span>
                  AI + IoT MONITORING
                </span>

                <p>
                  Individual system
                  telemetry helps identify
                  abnormal behaviour without
                  treating an entire
                  community as offline.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* =====================================================
          DIRECTORY
      ====================================================== */}

      <section className="directory-section">

        <div className="energy-container">

          <div className="directory-heading">

            <div>

              <span className="section-eyebrow">
                Network Directory
              </span>

              <h2>
                Community system
                status.
              </h2>

            </div>

            <div className="directory-summary">

              <div>
                <i className="green" />

                <strong>
                  {activeCommunityCount}
                </strong>

                <small>
                  Active
                </small>
              </div>

              <div>
                <i className="amber" />

                <strong>
                  {
                    monitoringCommunityCount
                  }
                </strong>

                <small>
                  Monitoring
                </small>
              </div>

              <div className="attention-summary">

                <i className="red flashing-red" />

                <strong>
                  {totalFaults}
                </strong>

                <small>
                  System Alerts
                </small>

              </div>

            </div>

          </div>

          <div className="directory-toolbar">

            <div className="search-box">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search community, system ID or fault..."
              />

            </div>

          </div>

          <div className="community-table">

            <div className="table-header">

              <span>
                Community
              </span>

              <span>
                Systems
              </span>

              <span>
                Status
              </span>

              <span>
                System Health
              </span>

              <span />

            </div>

            {filteredCommunities.map(
              (community) => {
                const faultCount =
                  community.faults
                    ?.length || 0;

                const operating =
                  community.systems -
                  faultCount;

                return (
                  <button
                    type="button"
                    key={community.name}
                    className={`community-row ${
                      faultCount > 0
                        ? "community-row-attention"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCommunity(
                        community
                      );

                      document
                        .querySelector(
                          ".live-map-section"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                        });
                    }}
                  >

                    <div className="community-name-cell">

                      <span
                        className={`row-node ${statusClass(
                          community.status
                        )}`}
                      >
                        <i />

                        {faultCount >
                          0 && (
                          <b>
                            {faultCount}
                          </b>
                        )}
                      </span>

                      <div>

                        <strong>
                          {community.name}
                        </strong>

                        <small>
                          {community.area}
                        </small>

                      </div>

                    </div>

                    <strong className="system-count">
                      {
                        community.systems
                      }
                    </strong>

                    <span
                      className={`table-status ${statusClass(
                        community.status
                      )}`}
                    >
                      <i />

                      {
                        community.status
                      }
                    </span>

                    <div className="system-health-cell">

                      {faultCount > 0 ? (
                        <>

                          <strong className="health-attention">

                            <span className="mini-red-pulse" />

                            {faultCount} system
                            {faultCount > 1
                              ? "s"
                              : ""}{" "}
                            require attention

                          </strong>

                          <small>
                            {operating} operating
                            normally
                          </small>

                        </>
                      ) : community.status ===
                        "Monitoring" ? (
                        <>

                          <strong className="health-monitoring">
                            Performance being
                            monitored
                          </strong>

                          <small>
                            No systems currently
                            down
                          </small>

                        </>
                      ) : (
                        <>

                          <strong className="health-normal">
                            All systems operating
                          </strong>

                          <small>
                            No active fault
                            detected
                          </small>

                        </>
                      )}

                    </div>

                    <span className="row-arrow">
                      →
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW MONITORING WORKS
      ====================================================== */}

      <section className="technology-section">

        <div className="energy-container technology-layout">

          <div>

            <span className="section-eyebrow light">
              Community Energy
              Intelligence
            </span>

            <h2>
              Detect early.
              Respond faster.
            </h2>

            <p>
              We use connected monitoring to
              maintain continuous visibility
              across distributed systems in
              hard-to-reach communities after
              deployment.
            </p>

            <p>
              Our IoT telemetry and
              AI-assisted analysis identify
              abnormal behaviour at individual
              system level and direct technical
              support to the systems that need
              attention.
            </p>

          </div>

          <div className="technology-flow">

            <div>

              <span>
                01
              </span>

              <div>

                <strong>
                  Energy System
                </strong>

                <p>
                  TED Evergreen Smart
                  Energy 900 delivers
                  decentralized
                  electricity.
                </p>

              </div>

            </div>

            <i />

            <div>

              <span>
                02
              </span>

              <div>

                <strong>
                  IoT Telemetry
                </strong>

                <p>
                  We collect system information
                  to maintain remote visibility
                  across deployments.
                </p>

              </div>

            </div>

            <i />

            <div>

              <span>
                03
              </span>

              <div>

                <strong>
                  Fault Detection
                </strong>

                <p>
                  We identify unusual behaviour
                  at individual system level
                  without declaring an entire
                  community offline.
                </p>

              </div>

            </div>

            <i />

            <div>

              <span>
                04
              </span>

              <div>

                <strong>
                  Field Response
                </strong>

                <p>
                  Our technical teams see which
                  system requires attention,
                  review the reported fault and
                  coordinate field response.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="network-cta">

        <div className="energy-container network-cta-inner">

          <div>

            <span>
              Help Expand The Network
            </span>

            <h2>
              Help clean energy reach
              the next community.
            </h2>

          </div>

          <div>

            <Link
              href="/donate"
              className="cta-primary"
            >
              Donate
            </Link>

            <Link
              href="/contact"
              className="cta-secondary"
            >
              Partner With Us
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="network-footer">

        <div className="energy-container">

          <div className="footer-grid">

            <div>

              <h3>
                TEDIS Evergreen
                Foundation
              </h3>

              <p>
                Expanding clean energy
                access, supporting circular
                recovery and creating
                opportunity in hard-to-reach
                communities.
              </p>

            </div>

            <div>

              <strong>
                Explore
              </strong>

              <Link href="/">
                Home
              </Link>

              <Link href="/impact">
                Impact
              </Link>

              <Link href="/energy-view">
                Community Network
              </Link>

            </div>

            <div>

              <strong>
                Take Action
              </strong>

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

              <strong>
                Contact
              </strong>

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

          <div className="footer-bottom">

            <span>
              ©{" "}
              {new Date().getFullYear()}{" "}
              TEDIS Evergreen Foundation
            </span>

            <span className="footer-live">
              <i />
              Community Network Online
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

        .energy-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #f5f7f3;
          color: #10281f;
        }

        .energy-page a {
          text-decoration: none;
        }

        .energy-container {
          width: min(
            1240px,
            calc(100% - 40px)
          );
          margin: 0 auto;
        }

        /* ===================================================
           NAVIGATION
        =================================================== */

        .energy-nav {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 1000;

          padding: 10px 16px;

          background:
            rgba(
              255,
              255,
              255,
              0.97
            );

          backdrop-filter:
            blur(14px);

          border-bottom:
            1px solid
            rgba(
              16,
              40,
              31,
              0.08
            );
        }

        .energy-nav-inner {
          position: relative;

          width:
            min(
              1240px,
              100%
            );

          height: 78px;

          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 22px;
        }

        .energy-logo {
          width: 185px;
          height: 64px;

          display: flex;
          align-items: center;

          flex-shrink: 0;
        }

        .energy-logo img {
          width: 100%;
          height: 100%;

          object-fit: contain;
        }

        .desktop-nav {
          display: flex;
          align-items: center;

          gap: 22px;
        }

        .desktop-nav > a {
          color: #10281f;

          font-size: 13px;
          font-weight: 700;
        }

        .current-network-link {
          min-height: 45px;

          padding: 0 14px;

          display: inline-flex;
          align-items: center;

          gap: 7px;

          border-radius: 999px;

          background:
            linear-gradient(
              135deg,
              #0b241b,
              #16462f
            );

          color:
            white !important;

          box-shadow:
            0 8px 22px
            rgba(
              7,
              44,
              29,
              0.18
            );
        }

        .current-network-link strong {
          color: #83eda6;

          font-size: 8px;

          letter-spacing:
            0.11em;
        }

        .nav-live-ring {
          position: relative;

          width: 15px;
          height: 15px;

          display: grid;
          place-items: center;
        }

        .nav-live-ring::before {
          content: "";

          position: absolute;
          inset: 0;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.55
            );

          border-radius: 50%;

          animation:
            normalPulse
            1.7s ease-out
            infinite;
        }

        .nav-live-ring span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 9px
            rgba(
              114,
              233,
              155,
              0.9
            );
        }

        .donate-button {
          padding:
            12px 20px !important;

          border-radius: 999px;

          background: #168147;

          color:
            white !important;
        }

        .mobile-actions,
        .mobile-menu {
          display: none;
        }

        /* ===================================================
           HERO
        =================================================== */

        .network-hero {
          position: relative;

          margin-top: 98px;

          min-height: 620px;

          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #061a13,
              #0c3123 55%,
              #164f35
            );

          color: white;
        }

        .hero-grid-background {
          position: absolute;
          inset: 0;

          opacity: 0.13;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.08
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.08
              )
              1px,
              transparent 1px
            );

          background-size:
            65px 65px;
        }

        .hero-orbit {
          position: absolute;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.11
            );

          border-radius: 50%;
        }

        .orbit-one {
          width: 620px;
          height: 620px;

          right: -180px;
          top: -270px;
        }

        .orbit-two {
          width: 390px;
          height: 390px;

          right: -60px;
          top: -150px;
        }

        .network-hero-content {
          position: relative;

          z-index: 3;

          padding-top: 105px;
          padding-bottom: 75px;
        }

        .network-kicker {
          display: flex;
          align-items: center;

          gap: 10px;

          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          font-size: 10px;

          letter-spacing:
            0.11em;
        }

        .hero-live-icon {
          position: relative;

          width: 18px;
          height: 18px;

          display: grid;
          place-items: center;
        }

        .hero-live-icon::before,
        .hero-live-icon::after {
          content: "";

          position: absolute;
          inset: 0;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.42
            );

          border-radius: 50%;

          animation:
            normalPulse
            2s ease-out
            infinite;
        }

        .hero-live-icon::after {
          animation-delay:
            0.65s;
        }

        .hero-live-icon span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 10px
            rgba(
              114,
              233,
              155,
              0.95
            );
        }

        .network-online {
          padding: 6px 9px;

          border:
            1px solid
            rgba(
              142,
              224,
              166,
              0.2
            );

          border-radius: 999px;

          background:
            rgba(
              142,
              224,
              166,
              0.09
            );

          color: #90e9aa;
        }

        .network-hero h1 {
          max-width: 850px;

          margin:
            28px 0 0;

          font-size:
            clamp(
              54px,
              7vw,
              94px
            );

          line-height: 0.93;

          letter-spacing:
            -0.055em;
        }

        .network-hero-content
        > p {
          max-width: 690px;

          margin:
            27px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          font-size: 17px;

          line-height: 1.72;
        }

        .hero-stats {
          max-width: 900px;

          margin-top: 55px;

          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );

          border-radius: 20px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );
        }

        .hero-stats > div {
          padding: 23px;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .hero-stats
        > div:last-child {
          border-right: 0;
        }

        .hero-stat-label {
          color: #8ee0a6;

          font-size: 8px;

          font-weight: 900;

          letter-spacing:
            0.12em;
        }

        .hero-stat-label.live,
        .hero-stat-label.fault {
          display: flex;
          align-items: center;

          gap: 6px;
        }

        .hero-stat-label i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #72e99b;
        }

        .hero-stat-label.fault {
          color: #ff8274;
        }

        .hero-stat-label.fault i {
          background: #ff4938;

          box-shadow:
            0 0 8px
            rgba(
              255,
              73,
              56,
              0.8
            );

          animation:
            faultBlink
            0.85s infinite;
        }

        .hero-stats strong {
          display: block;

          margin-top: 12px;

          font-size: 34px;

          letter-spacing:
            -0.04em;
        }

        .hero-stats small {
          display: block;

          margin-top: 3px;

          color:
            rgba(
              255,
              255,
              255,
              0.46
            );

          font-size: 10px;
        }

        /* ===================================================
           METRICS
        =================================================== */

        .metrics-section {
          padding: 90px 0;
        }

        .section-heading-row {
          display: flex;

          align-items: flex-end;

          justify-content:
            space-between;

          gap: 40px;
        }

        .section-eyebrow {
          display: block;

          color: #168147;

          font-size: 10px;

          font-weight: 900;

          letter-spacing:
            0.15em;

          text-transform:
            uppercase;
        }

        .section-eyebrow.light {
          color: #8ee0a6;
        }

        .section-heading-row h2,
        .live-map-heading h2,
        .directory-heading h2,
        .technology-layout h2 {
          max-width: 720px;

          margin:
            12px 0 0;

          font-size:
            clamp(
              38px,
              5vw,
              59px
            );

          line-height: 0.98;

          letter-spacing:
            -0.045em;
        }

        .network-health-card {
          display: flex;
          align-items: center;

          gap: 11px;

          padding: 13px 16px;

          border:
            1px solid
            rgba(
              16,
              40,
              31,
              0.1
            );

          border-radius: 14px;

          background: white;
        }

        .network-health-pulse {
          position: relative;

          width: 14px;
          height: 14px;

          display: grid;
          place-items: center;
        }

        .network-health-pulse::before {
          content: "";

          position: absolute;
          inset: 0;

          border:
            1px solid
            rgba(
              37,
              185,
              99,
              0.4
            );

          border-radius: 50%;

          animation:
            normalPulse
            1.8s infinite;
        }

        .network-health-pulse i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #25b963;
        }

        .network-health-card strong,
        .network-health-card small {
          display: block;
        }

        .network-health-card strong {
          font-size: 10px;
        }

        .network-health-card small {
          margin-top: 2px;

          color: #78847e;

          font-size: 8px;
        }

        .metric-grid {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              1fr
            );

          gap: 14px;

          margin-top: 45px;
        }

        .metric-card {
          min-height: 335px;

          padding: 25px;

          display: flex;

          flex-direction:
            column;

          border:
            1px solid
            rgba(
              16,
              40,
              31,
              0.08
            );

          border-radius: 20px;

          background: white;
        }

        .metric-card.dark {
          background: #10281f;

          color: white;
        }

        .metric-index {
          color: #89958f;

          font-size: 9px;

          font-weight: 850;
        }

        .metric-value {
          display: block;

          margin-top: 52px;

          font-size:
            clamp(
              31px,
              3.5vw,
              46px
            );

          line-height: 1;

          letter-spacing:
            -0.05em;
        }

        .metric-value small {
          margin-left: 5px;

          font-size: 13px;

          letter-spacing: 0;
        }

        .metric-card h3 {
          margin:
            18px 0 0;

          font-size: 15px;
        }

        .metric-card p {
          margin:
            9px 0 0;

          color: #74817b;

          font-size: 12px;

          line-height: 1.6;
        }

        .metric-card.dark p {
          color:
            rgba(
              255,
              255,
              255,
              0.52
            );
        }

        .metric-footer {
          margin-top: auto;

          padding-top: 20px;

          border-top:
            1px solid
            rgba(
              16,
              40,
              31,
              0.08
            );

          color: #168147;

          font-size: 10px;

          font-weight: 800;
        }

        .metric-card.dark
        .metric-footer {
          border-color:
            rgba(
              255,
              255,
              255,
              0.09
            );

          color: #8ee0a6;
        }

        /* ===================================================
           LIVE MAP
        =================================================== */

        .live-map-section {
          padding: 95px 0;

          background: #071d16;

          color: white;
        }

        .live-map-heading {
          display: grid;

          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(0, 0.55fr);

          gap: 70px;

          align-items: end;
        }

        .live-map-heading > p {
          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              0.55
            );

          line-height: 1.7;
        }

        .network-status-strip {
          display: flex;

          gap: 9px;

          margin-top: 35px;
        }

        .status-chip {
          min-height: 43px;

          padding: 0 14px;

          display: flex;
          align-items: center;

          gap: 7px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          font-size: 9px;
        }

        .status-chip strong {
          font-size: 13px;
        }

        .status-chip
        span:last-child {
          color:
            rgba(
              255,
              255,
              255,
              0.5
            );
        }

        .attention-chip {
          border-color:
            rgba(
              255,
              73,
              56,
              0.24
            );

          background:
            rgba(
              255,
              73,
              56,
              0.07
            );
        }

        .status-flash {
          width: 8px;
          height: 8px;

          border-radius: 50%;
        }

        .green {
          background: #72e99b;
        }

        .amber {
          background: #efc04b;
        }

        .red {
          background: #ff4938;
        }

        .status-flash.green {
          box-shadow:
            0 0 8px
            rgba(
              114,
              233,
              155,
              0.8
            );

          animation:
            statusGlow
            1.8s infinite;
        }

        .status-flash.amber {
          box-shadow:
            0 0 8px
            rgba(
              239,
              192,
              75,
              0.8
            );

          animation:
            statusGlow
            1.4s infinite;
        }

        .status-flash.red {
          box-shadow:
            0 0 10px
            rgba(
              255,
              73,
              56,
              0.95
            );

          animation:
            faultBlink
            0.75s infinite;
        }

        .network-dashboard {
          display: grid;

          grid-template-columns:
            minmax(0, 1.55fr)
            minmax(330px, 0.45fr);

          gap: 16px;

          margin-top: 24px;
        }

        /* ===================================================
           MAP
        =================================================== */

        .community-map {
          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 24px;

          background: #0a291e;
        }

        .map-header {
          height: 60px;

          padding: 0 20px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .map-header > div {
          display: flex;

          align-items: center;

          gap: 9px;
        }

        .map-header strong {
          font-size: 11px;
        }

        .map-header > span {
          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size: 9px;
        }

        .map-live-pulse {
          position: relative;

          width: 14px;
          height: 14px;

          display: grid;

          place-items: center;
        }

        .map-live-pulse::before {
          content: "";

          position: absolute;
          inset: 0;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.45
            );

          border-radius: 50%;

          animation:
            normalPulse
            1.5s infinite;
        }

        .map-live-pulse i {
          width: 6px;
          height: 6px;

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

        .map-canvas {
          position: relative;

          height: 620px;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(
                41,
                133,
                82,
                0.19
              ),
              transparent 45%
            ),
            #082219;
        }

        .map-grid {
          position: absolute;
          inset: 0;

          opacity: 0.18;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.07
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.07
              )
              1px,
              transparent 1px
            );

          background-size:
            45px 45px;
        }

        /* ===================================================
           RADAR
        =================================================== */

        .radar-center {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 430px;
          height: 430px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          opacity: 0.45;
        }

        .radar-circle {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.13
            );

          border-radius: 50%;
        }

        .radar-circle-one {
          width: 120px;
          height: 120px;
        }

        .radar-circle-two {
          width: 260px;
          height: 260px;
        }

        .radar-circle-three {
          width: 420px;
          height: 420px;
        }

        .radar-sweep {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 210px;
          height: 210px;

          transform-origin:
            0 0;

          background:
            conic-gradient(
              from 0deg,
              rgba(
                114,
                233,
                155,
                0.3
              ),
              transparent 25deg,
              transparent 360deg
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              100% 100%,
              0 0
            );

          animation:
            radarRotate
            5s linear
            infinite;
        }

        @keyframes radarRotate {

          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }

        }

        /* ===================================================
           NETWORK CONNECTIONS
        =================================================== */

        .network-line {
          position: absolute;

          height: 1px;

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                114,
                233,
                155,
                0.25
              ),
              transparent
            );

          animation:
            networkLineFlash
            3s ease-in-out
            infinite;
        }

        .line-1 {
          width: 38%;
          left: 23%;
          top: 30%;

          transform:
            rotate(12deg);
        }

        .line-2 {
          width: 36%;
          left: 32%;
          top: 50%;

          transform:
            rotate(-21deg);

          animation-delay:
            0.5s;
        }

        .line-3 {
          width: 42%;
          left: 17%;
          top: 61%;

          transform:
            rotate(6deg);

          animation-delay:
            1s;
        }

        .line-4 {
          width: 32%;
          left: 52%;
          top: 62%;

          transform:
            rotate(24deg);

          animation-delay:
            1.4s;
        }

        .line-5 {
          width: 30%;
          left: 20%;
          top: 74%;

          transform:
            rotate(-25deg);

          animation-delay:
            0.8s;
        }

        .line-6 {
          width: 31%;
          left: 52%;
          top: 36%;

          transform:
            rotate(-14deg);

          animation-delay:
            1.7s;
        }

        @keyframes networkLineFlash {

          0%,
          100% {
            opacity: 0.2;
          }

          50% {
            opacity: 0.9;
          }

        }

        .region-outline {
          position: absolute;

          inset:
            10% 8% 10% 8%;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.19
            );

          border-radius:
            44% 56% 60% 40% /
            48% 40% 60% 52%;

          transform:
            rotate(-3deg);

          background:
            rgba(
              78,
              160,
              103,
              0.025
            );
        }

        .region-outline > span {
          position: absolute;

          top: 47%;
          left: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          color:
            rgba(
              255,
              255,
              255,
              0.035
            );

          font-size: 46px;

          font-weight: 900;

          line-height: 0.9;

          text-align: center;
        }

        .map-river {
          position: absolute;

          width: 85%;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                70,
                161,
                188,
                0.34
              ),
              transparent
            );
        }

        .river-one {
          top: 48%;
          left: 6%;

          transform:
            rotate(-10deg);
        }

        .river-two {
          top: 59%;
          left: 12%;

          transform:
            rotate(8deg);
        }

        /* ===================================================
           COMMUNITY NODES
        =================================================== */

        .community-node {
          position: absolute;

          width: 27px;
          height: 27px;

          padding: 0;

          transform:
            translate(
              -50%,
              -50%
            );

          border: 0;

          background: transparent;

          cursor: pointer;

          z-index: 20;
        }

        .node-core {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 8px;
          height: 8px;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 10px
            rgba(
              114,
              233,
              155,
              0.9
            );

          z-index: 4;
        }

        .node-inner-ring,
        .node-outer-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;
        }

        .node-inner-ring {
          width: 16px;
          height: 16px;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.5
            );

          animation:
            nodeRing
            1.8s ease-out
            infinite;
        }

        .node-outer-ring {
          width: 25px;
          height: 25px;

          border:
            1px solid
            rgba(
              114,
              233,
              155,
              0.18
            );

          animation:
            nodeRing
            1.8s ease-out
            0.55s infinite;
        }

        .community-node.monitoring
        .node-core {
          background: #efc04b;

          box-shadow:
            0 0 11px
            rgba(
              239,
              192,
              75,
              0.9
            );
        }

        .community-node.monitoring
        .node-inner-ring,
        .community-node.monitoring
        .node-outer-ring {
          border-color:
            rgba(
              239,
              192,
              75,
              0.5
            );
        }

        /*
          ATTENTION COMMUNITY:
          The main node remains green because
          most systems are still operational.
        */

        .community-node.attention
        .node-core {
          background: #72e99b;

          box-shadow:
            0 0 12px
            rgba(
              114,
              233,
              155,
              1
            );
        }

        /* ===================================================
           SMALL RED SYSTEM ALERT
        =================================================== */

        .node-fault-alert {
          position: absolute;

          top: -8px;
          right: -9px;

          z-index: 10;

          width: 18px;
          height: 18px;

          display: grid;

          place-items: center;

          border:
            2px solid
            #082219;

          border-radius: 50%;

          background: #ff4938;

          color: white;

          font-size: 7px;
          font-weight: 950;

          box-shadow:
            0 0 9px
            rgba(
              255,
              73,
              56,
              0.95
            );

          animation:
            faultBadgePulse
            0.85s ease-in-out
            infinite;
        }

        .community-node.attention::after {
          content: "";

          position: absolute;

          top: -12px;
          right: -13px;

          width: 25px;
          height: 25px;

          border:
            1px solid
            rgba(
              255,
              73,
              56,
              0.75
            );

          border-radius: 50%;

          animation:
            alertRing
            1.25s ease-out
            infinite;
        }

        .community-node.selected
        .node-core {
          width: 12px;
          height: 12px;

          outline:
            3px solid
            rgba(
              255,
              255,
              255,
              0.22
            );
        }

        .node-label {
          position: absolute;

          top: 25px;
          left: 50%;

          transform:
            translateX(-50%);

          min-width:
            max-content;

          padding: 5px 7px;

          display: none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 6px;

          background:
            rgba(
              4,
              24,
              17,
              0.95
            );

          color:
            rgba(
              255,
              255,
              255,
              0.8
            );

          font-size: 8px;

          white-space: nowrap;
        }

        .node-label strong {
          margin-left: 6px;

          color: #ff695c;

          font-size: 7px;
        }

        .community-node:hover
        .node-label,
        .community-node.selected
        .node-label,
        .community-node.attention
        .node-label {
          display: block;
        }

        @keyframes nodeRing {

          0% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(0.5);

            opacity: 0.8;
          }

          100% {
            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.4);

            opacity: 0;
          }

        }

        @keyframes faultBadgePulse {

          0%,
          100% {
            transform:
              scale(1);
          }

          50% {
            transform:
              scale(1.22);
          }

        }

        @keyframes alertRing {

          0% {
            transform:
              scale(0.4);

            opacity: 1;
          }

          100% {
            transform:
              scale(1.6);

            opacity: 0;
          }

        }

        @keyframes faultBlink {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.25;
          }

        }

        @keyframes statusGlow {

          0%,
          100% {
            opacity: 0.7;
          }

          50% {
            opacity: 1;
          }

        }

        @keyframes normalPulse {

          0% {
            transform:
              scale(0.5);

            opacity: 0.9;
          }

          100% {
            transform:
              scale(1.8);

            opacity: 0;
          }

        }

        .map-legend {
          position: absolute;

          left: 18px;
          bottom: 18px;

          padding: 10px 13px;

          display: flex;

          gap: 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 10px;

          background:
            rgba(
              4,
              25,
              18,
              0.9
            );

          color:
            rgba(
              255,
              255,
              255,
              0.58
            );

          font-size: 8px;
        }

        .map-legend > div {
          display: flex;
          align-items: center;

          gap: 5px;
        }

        .map-legend i {
          width: 7px;
          height: 7px;

          border-radius: 50%;
        }

        .flashing-red {
          box-shadow:
            0 0 8px
            rgba(
              255,
              73,
              56,
              0.9
            );

          animation:
            faultBlink
            0.8s infinite;
        }

        /* ===================================================
           COMMUNITY PANEL
        =================================================== */

        .community-panel {
          padding: 23px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius: 24px;

          background: #0b291e;
        }

        .community-panel-attention {
          border-color:
            rgba(
              255,
              73,
              56,
              0.23
            );

          box-shadow:
            inset
            0 0 40px
            rgba(
              255,
              73,
              56,
              0.025
            );
        }

        .panel-header {
          display: flex;

          justify-content:
            space-between;

          gap: 20px;
        }

        .panel-eyebrow {
          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 8px;

          font-weight: 900;

          letter-spacing:
            0.12em;

          text-transform:
            uppercase;
        }

        .panel-header h3 {
          margin:
            7px 0 0;

          font-size: 27px;

          letter-spacing:
            -0.04em;
        }

        .panel-header p {
          margin:
            3px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.42
            );

          font-size: 9px;
        }

        .panel-status,
        .table-status {
          height: fit-content;

          padding: 7px 9px;

          display: inline-flex;
          align-items: center;

          gap: 5px;

          border-radius: 999px;

          font-size: 8px;

          font-weight: 850;
        }

        .panel-status i,
        .table-status i {
          width: 5px;
          height: 5px;

          border-radius: 50%;
        }

        .panel-status.active,
        .table-status.active {
          background:
            rgba(
              114,
              233,
              155,
              0.09
            );

          color: #8ee0a6;
        }

        .panel-status.active i,
        .table-status.active i {
          background: #72e99b;
        }

        .panel-status.monitoring,
        .table-status.monitoring {
          background:
            rgba(
              239,
              192,
              75,
              0.11
            );

          color: #efc04b;
        }

        .panel-status.monitoring i,
        .table-status.monitoring i {
          background: #efc04b;
        }

        .panel-status.attention,
        .table-status.attention {
          border:
            1px solid
            rgba(
              255,
              73,
              56,
              0.19
            );

          background:
            rgba(
              255,
              73,
              56,
              0.1
            );

          color: #ff776a;
        }

        .panel-status.attention i,
        .table-status.attention i {
          background: #ff4938;

          box-shadow:
            0 0 7px
            rgba(
              255,
              73,
              56,
              0.9
            );

          animation:
            faultBlink
            0.8s infinite;
        }

        /* ===================================================
           COMMUNITY HEALTH SUMMARY
        =================================================== */

        .community-health-summary {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              1fr
            );

          gap: 7px;

          margin-top: 22px;
        }

        .community-health-summary > div {
          padding: 12px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 11px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );
        }

        .community-health-summary span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 7px;
        }

        .community-health-summary strong {
          display: block;

          margin-top: 5px;

          font-size: 20px;
        }

        .operating-value {
          color: #8ee0a6;
        }

        .attention-value {
          color: #ff6558;
        }

        /* ===================================================
           SYSTEM FAULT PANEL
        =================================================== */

        .fault-alert-panel {
          margin-top: 14px;

          padding: 15px;

          border:
            1px solid
            rgba(
              255,
              73,
              56,
              0.3
            );

          border-radius: 15px;

          background:
            linear-gradient(
              135deg,
              rgba(
                255,
                73,
                56,
                0.1
              ),
              rgba(
                255,
                73,
                56,
                0.025
              )
            );
        }

        .fault-panel-title {
          display: grid;

          grid-template-columns:
            34px 1fr;

          gap: 10px;

          align-items: center;
        }

        .fault-warning-symbol {
          width: 32px;
          height: 32px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          background: #ff4938;

          color: white;

          font-size: 16px;

          font-weight: 900;

          box-shadow:
            0 0 15px
            rgba(
              255,
              73,
              56,
              0.36
            );

          animation:
            faultBadgePulse
            1s infinite;
        }

        .fault-panel-title span {
          display: block;

          color: #ff7669;

          font-size: 7px;

          font-weight: 950;

          letter-spacing:
            0.12em;
        }

        .fault-panel-title strong {
          display: block;

          margin-top: 4px;

          font-size: 11px;
        }

        .fault-list {
          display: grid;

          gap: 7px;

          margin-top: 14px;
        }

        .fault-item {
          padding: 11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 10px;

          background:
            rgba(
              0,
              0,
              0,
              0.11
            );
        }

        .fault-item-top {
          display: flex;

          justify-content:
            space-between;

          align-items: center;

          gap: 10px;
        }

        .fault-item-top
        > div
        > span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 6px;

          letter-spacing:
            0.11em;
        }

        .fault-item-top
        > div
        > strong {
          display: block;

          margin-top: 3px;

          color: white;

          font-size: 10px;
        }

        .system-down-badge {
          padding: 5px 7px;

          display: flex;

          align-items: center;

          gap: 4px;

          border-radius: 999px;

          background:
            rgba(
              255,
              73,
              56,
              0.12
            );

          color: #ff776a;

          font-size: 6px;

          font-weight: 900;

          letter-spacing:
            0.08em;
        }

        .system-down-badge i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #ff4938;

          box-shadow:
            0 0 6px
            rgba(
              255,
              73,
              56,
              0.9
            );

          animation:
            faultBlink
            0.75s infinite;
        }

        .fault-item > p {
          margin:
            9px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.72
            );

          font-size: 9px;

          line-height: 1.4;
        }

        .fault-code-row {
          margin-top: 8px;

          padding-top: 8px;

          display: flex;

          justify-content:
            space-between;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .fault-code-row span {
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 7px;
        }

        .fault-code-row strong {
          color: #ff8b80;

          font-size: 8px;
        }

        .field-response-alert {
          margin-top: 12px;

          padding-top: 11px;

          display: flex;

          align-items: center;

          gap: 8px;

          border-top:
            1px solid
            rgba(
              255,
              73,
              56,
              0.15
            );
        }

        .response-pulse {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #ff4938;

          box-shadow:
            0 0 8px
            rgba(
              255,
              73,
              56,
              0.9
            );

          animation:
            faultBlink
            0.75s infinite;
        }

        .field-response-alert
        strong,
        .field-response-alert
        small {
          display: block;
        }

        .field-response-alert
        strong {
          color: #ff8276;

          font-size: 8px;
        }

        .field-response-alert
        small {
          margin-top: 2px;

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 7px;
        }

        /* ===================================================
           PANEL DETAILS
        =================================================== */

        .system-name-card {
          margin-top: 17px;

          padding: 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 12px;

          background:
            rgba(
              255,
              255,
              255,
              0.03
            );
        }

        .system-name-card span {
          display: block;

          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 7px;

          text-transform:
            uppercase;
        }

        .system-name-card strong {
          display: block;

          margin-top: 5px;

          font-size: 11px;
        }

        .load-section {
          margin-top: 18px;
        }

        .load-label {
          display: flex;

          justify-content:
            space-between;

          color:
            rgba(
              255,
              255,
              255,
              0.45
            );

          font-size: 8px;
        }

        .load-label strong {
          color: white;
        }

        .load-bar {
          height: 5px;

          margin-top: 8px;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .load-bar > span {
          display: block;

          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #168147,
              #72e99b
            );
        }

        .telemetry {
          margin-top: 21px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 13px;
        }

        .telemetry > div {
          min-height: 59px;

          padding: 0 11px;

          display: grid;

          grid-template-columns:
            29px 1fr auto;

          align-items: center;

          gap: 8px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.06
            );
        }

        .telemetry
        > div:last-child {
          border-bottom: 0;
        }

        .telemetry-symbol {
          width: 27px;
          height: 27px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background:
            rgba(
              142,
              224,
              166,
              0.07
            );

          color: #8ee0a6;
        }

        .telemetry strong,
        .telemetry small {
          display: block;
        }

        .telemetry strong {
          font-size: 9px;
        }

        .telemetry small {
          margin-top: 2px;

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 7px;
        }

        .telemetry-ok {
          color: #8ee0a6;

          font-size: 7px;

          font-weight: 800;
        }

        .telemetry-alert {
          color: #ff695c;

          font-size: 7px;

          font-weight: 850;

          animation:
            faultBlink
            1.1s infinite;
        }

        .panel-ai-note {
          margin-top: 19px;

          padding: 13px;

          border-left:
            2px solid #168147;

          background:
            rgba(
              22,
              129,
              71,
              0.07
            );
        }

        .panel-ai-note span {
          color: #8ee0a6;

          font-size: 7px;

          font-weight: 900;

          letter-spacing:
            0.1em;
        }

        .panel-ai-note p {
          margin:
            5px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.4
            );

          font-size: 8px;

          line-height: 1.55;
        }

        /* ===================================================
           DIRECTORY
        =================================================== */

        .directory-section {
          padding: 95px 0;

          background: white;
        }

        .directory-heading {
          display: flex;

          align-items: flex-end;

          justify-content:
            space-between;

          gap: 40px;
        }

        .directory-heading h2 {
          max-width: 620px;
        }

        .directory-summary {
          display: flex;

          gap: 8px;
        }

        .directory-summary > div {
          min-width: 90px;

          padding: 11px;

          display: grid;

          grid-template-columns:
            8px auto;

          gap:
            2px 8px;

          align-items: center;

          border:
            1px solid
            rgba(
              16,
              40,
              31,
              0.08
            );

          border-radius: 11px;

          background: #f8faf7;
        }

        .directory-summary i {
          width: 7px;
          height: 7px;

          border-radius: 50%;
        }

        .directory-summary strong {
          font-size: 14px;
        }

        .directory-summary small {
          grid-column: 2;

          color: #7e8a84;

          font-size: 7px;
        }

        .attention-summary {
          border-color:
            rgba(
              255,
              73,
              56,
              0.15
            ) !important;

          background:
            rgba(
              255,
              73,
              56,
              0.04
            ) !important;
        }

        .directory-toolbar {
          margin-top: 37px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;
        }

        .directory-toolbar > span {
          color: #7d8983;

          font-size: 9px;
        }

        .search-box {
          width:
            min(
              440px,
              100%
            );

          min-height: 48px;

          padding: 0 15px;

          display: flex;

          align-items: center;

          gap: 8px;

          border:
            1px solid
            rgba(
              16,
              40,
              31,
              0.1
            );

          border-radius: 13px;

          background: #f7f9f6;
        }

        .search-box input {
          width: 100%;

          border: 0;

          outline: 0;

          background:
            transparent;

          color: #10281f;

          font-size: 11px;
        }

        .community-table {
          margin-top: 18px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              16,
              40,
              31,
              0.08
            );

          border-radius: 18px;
        }

        .table-header,
        .community-row {
          display: grid;

          grid-template-columns:
            1.4fr
            0.45fr
            0.65fr
            1.5fr
            30px;

          align-items: center;

          gap: 14px;
        }

        .table-header {
          min-height: 46px;

          padding: 0 18px;

          background: #f4f7f3;

          color: #7a8680;

          font-size: 7px;

          font-weight: 900;

          letter-spacing:
            0.1em;

          text-transform:
            uppercase;
        }

        .community-row {
          width: 100%;

          min-height: 75px;

          padding: 0 18px;

          border: 0;

          border-top:
            1px solid
            rgba(
              16,
              40,
              31,
              0.06
            );

          background: white;

          color: #10281f;

          text-align: left;

          cursor: pointer;
        }

        .community-row:hover {
          background: #f9fbf8;
        }

        .community-row-attention {
          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                73,
                56,
                0.04
              ),
              white 45%
            );
        }

        .community-name-cell {
          display: flex;

          align-items: center;

          gap: 10px;
        }

        .row-node {
          position: relative;

          width: 30px;
          height: 30px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background: #edf4ef;
        }

        .row-node > i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #72e99b;
        }

        .row-node.monitoring
        > i {
          background: #efc04b;
        }

        .row-node > b {
          position: absolute;

          top: -5px;
          right: -5px;

          width: 16px;
          height: 16px;

          display: grid;

          place-items: center;

          border:
            2px solid white;

          border-radius: 50%;

          background: #ff4938;

          color: white;

          font-size: 6px;

          box-shadow:
            0 0 7px
            rgba(
              255,
              73,
              56,
              0.7
            );

          animation:
            faultBadgePulse
            0.85s infinite;
        }

        .community-name-cell strong,
        .community-name-cell small {
          display: block;
        }

        .community-name-cell strong {
          font-size: 11px;
        }

        .community-name-cell small {
          margin-top: 3px;

          color: #89938e;

          font-size: 7px;
        }

        .system-count {
          font-size: 11px;
        }

        .system-health-cell strong,
        .system-health-cell small {
          display: block;
        }

        .health-normal {
          color: #47765a;

          font-size: 9px;
        }

        .health-monitoring {
          color: #ad8424;

          font-size: 9px;
        }

        .health-attention {
          display: flex !important;

          align-items: center;

          gap: 6px;

          color: #dc473b;

          font-size: 9px;
        }

        .mini-red-pulse {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #ff4938;

          box-shadow:
            0 0 7px
            rgba(
              255,
              73,
              56,
              0.75
            );

          animation:
            faultBlink
            0.8s infinite;
        }

        .system-health-cell small {
          margin-top: 3px;

          color: #8b9690;

          font-size: 7px;
        }

        .row-arrow {
          color: #168147;

          font-size: 16px;
        }

        /* ===================================================
           TECHNOLOGY
        =================================================== */

        .technology-section {
          padding: 100px 0;

          background: #10281f;

          color: white;
        }

        .technology-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 0.9fr)
            minmax(0, 1.1fr);

          gap: 90px;

          align-items: center;
        }

        .technology-layout p {
          max-width: 550px;

          margin:
            20px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.55
            );

          line-height: 1.74;
        }

        .technology-flow > div {
          padding: 20px;

          display: grid;

          grid-template-columns:
            45px 1fr;

          gap: 15px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 15px;

          background:
            rgba(
              255,
              255,
              255,
              0.03
            );
        }

        .technology-flow
        > div
        > span {
          width: 40px;
          height: 40px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background:
            rgba(
              142,
              224,
              166,
              0.1
            );

          color: #8ee0a6;

          font-size: 9px;

          font-weight: 900;
        }

        .technology-flow strong {
          font-size: 14px;
        }

        .technology-flow p {
          margin:
            6px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.44
            );

          font-size: 10px;

          line-height: 1.6;
        }

        .technology-flow > i {
          display: block;

          width: 1px;
          height: 15px;

          margin-left: 40px;

          background:
            rgba(
              142,
              224,
              166,
              0.3
            );
        }

        /* ===================================================
           CTA
        =================================================== */

        .network-cta {
          padding: 72px 0;

          background: #168147;

          color: white;
        }

        .network-cta-inner {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 45px;
        }

        .network-cta-inner
        > div:first-child
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          font-size: 9px;

          font-weight: 900;

          letter-spacing:
            0.13em;

          text-transform:
            uppercase;
        }

        .network-cta h2 {
          max-width: 650px;

          margin:
            10px 0 0;

          font-size:
            clamp(
              36px,
              5vw,
              57px
            );

          line-height: 0.98;

          letter-spacing:
            -0.045em;
        }

        .network-cta-inner
        > div:last-child {
          display: flex;

          gap: 9px;
        }

        .cta-primary,
        .cta-secondary {
          min-height: 48px;

          padding: 0 20px;

          display: inline-flex;

          align-items: center;

          justify-content:
            center;

          border-radius: 999px;

          font-size: 11px;

          font-weight: 850;
        }

        .cta-primary {
          background: white;

          color: #10281f;
        }

        .cta-secondary {
          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.33
            );

          color: white;
        }

        /* ===================================================
           FOOTER
        =================================================== */

        .network-footer {
          padding:
            62px 0 24px;

          background: #061b14;

          color: white;
        }

        .footer-grid {
          display: grid;

          grid-template-columns:
            1.6fr
            0.65fr
            0.65fr
            1fr;

          gap: 48px;
        }

        .footer-grid h3 {
          max-width: 320px;

          margin: 0;

          font-size: 27px;

          line-height: 1;

          letter-spacing:
            -0.035em;
        }

        .footer-grid p {
          max-width: 400px;

          margin:
            14px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.49
            );

          font-size: 11px;

          line-height: 1.7;
        }

        .footer-grid
        > div:not(:first-child) {
          display: flex;

          flex-direction:
            column;

          gap: 9px;
        }

        .footer-grid
        > div:not(:first-child)
        > strong {
          margin-bottom: 4px;

          color:
            rgba(
              255,
              255,
              255,
              0.35
            );

          font-size: 7px;

          letter-spacing:
            0.12em;

          text-transform:
            uppercase;
        }

        .footer-grid a {
          color:
            rgba(
              255,
              255,
              255,
              0.7
            );

          font-size: 10px;
        }

        .footer-bottom {
          margin-top: 50px;

          padding-top: 18px;

          display: flex;

          justify-content:
            space-between;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          color:
            rgba(
              255,
              255,
              255,
              0.32
            );

          font-size: 8px;
        }

        .footer-live {
          display: flex;

          align-items: center;

          gap: 6px;
        }

        .footer-live i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #72e99b;

          box-shadow:
            0 0 7px
            rgba(
              114,
              233,
              155,
              0.8
            );
        }

        /* ===================================================
           TABLET
        =================================================== */

        @media (
          max-width: 1080px
        ) {

          .desktop-nav {
            display: none;
          }

          .mobile-actions {
            display: flex;

            align-items: center;

            gap: 8px;
          }

          .mobile-network-status {
            min-height: 35px;

            padding: 0 10px;

            display: flex;

            align-items: center;

            gap: 6px;

            border-radius: 999px;

            background: #10281f;

            color: #8ee0a6;

            font-size: 7px;

            font-weight: 900;
          }

          .mobile-network-status i {
            width: 6px;
            height: 6px;

            border-radius: 50%;

            background: #72e99b;

            box-shadow:
              0 0 7px
              rgba(
                114,
                233,
                155,
                0.8
              );
          }

          .mobile-menu-button {
            width: 40px;
            height: 40px;

            display: grid;

            place-items: center;

            border: 0;

            border-radius: 50%;

            background: #10281f;

            color: white;
          }

          .mobile-menu {
            position: absolute;

            top:
              calc(
                100% + 10px
              );

            right: 0;
            left: 0;

            display: grid;

            padding: 14px;

            border-radius: 18px;

            background: white;

            box-shadow:
              0 18px 40px
              rgba(
                16,
                40,
                31,
                0.14
              );
          }

          .mobile-menu a {
            padding: 12px 14px;

            color: #10281f;

            font-size: 13px;

            font-weight: 700;
          }

          .metric-grid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .network-dashboard {
            grid-template-columns:
              1fr;
          }

          .technology-layout {
            grid-template-columns:
              1fr;

            gap: 45px;
          }

          .footer-grid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

        }

        /* ===================================================
           MOBILE
        =================================================== */

        @media (
          max-width: 720px
        ) {

          .energy-container {
            width:
              calc(
                100% - 28px
              );
          }

          .energy-nav {
            padding: 5px 9px;
          }

          .energy-nav-inner {
            height: 62px;
          }

          .energy-logo {
            width: 118px;
            height: 48px;
          }

          .network-hero {
            min-height: auto;

            margin-top: 72px;
          }

          .network-hero-content {
            padding-top: 65px;

            padding-bottom: 48px;
          }

          .network-kicker {
            flex-wrap: wrap;
          }

          .network-hero h1 {
            margin-top: 22px;

            font-size:
              clamp(
                45px,
                14vw,
                67px
              );
          }

          .network-hero-content
          > p {
            margin-top: 18px;

            font-size: 14px;
          }

          .hero-stats {
            grid-template-columns:
              1fr;

            margin-top: 34px;
          }

          .hero-stats > div {
            padding: 17px;

            border-right: 0;

            border-bottom:
              1px solid
              rgba(
                255,
                255,
                255,
                0.07
              );
          }

          .metrics-section {
            padding: 52px 0;
          }

          .section-heading-row {
            display: grid;

            gap: 22px;
          }

          .metric-grid {
            grid-template-columns:
              1fr;

            margin-top: 28px;
          }

          .metric-card {
            min-height: 260px;

            padding: 20px;
          }

          .metric-value {
            margin-top: 34px;
          }

          .live-map-section {
            padding: 52px 0;
          }

          .live-map-heading {
            grid-template-columns:
              1fr;

            gap: 18px;
          }

          .network-status-strip {
            overflow-x: auto;

            padding-bottom: 5px;
          }

          .status-chip {
            flex-shrink: 0;
          }

          .network-dashboard {
            margin-top: 18px;
          }

          .map-header {
            height: 53px;

            padding: 0 13px;
          }

          .map-header > span {
            display: none;
          }

          .map-canvas {
            height: 500px;
          }

          .radar-center {
            width: 310px;
            height: 310px;
          }

          .radar-circle-three {
            width: 300px;
            height: 300px;
          }

          .radar-circle-two {
            width: 190px;
            height: 190px;
          }

          .radar-sweep {
            width: 150px;
            height: 150px;
          }

          .region-outline > span {
            font-size: 27px;
          }

          .node-label {
            font-size: 7px;
          }

          .map-legend {
            right: 9px;
            left: 9px;
            bottom: 9px;

            justify-content: center;
          }

          .community-panel {
            padding: 19px;
          }

          .community-health-summary {
            gap: 5px;
          }

          .community-health-summary
          > div {
            padding: 10px;
          }

          .community-health-summary
          strong {
            font-size: 18px;
          }

          .directory-section {
            padding: 52px 0;
          }

          .directory-heading {
            display: grid;

            gap: 22px;
          }

          .directory-summary {
            overflow-x: auto;
          }

          .directory-summary
          > div {
            flex-shrink: 0;
          }

          .directory-toolbar {
            align-items:
              flex-start;

            flex-direction:
              column;
          }

          .search-box {
            width: 100%;
          }

          .table-header {
            display: none;
          }

          .community-row {
            min-height: auto;

            padding: 16px;

            grid-template-columns:
              1fr auto;

            gap:
              12px 10px;
          }

          .community-name-cell {
            grid-column: 1;
          }

          .system-count {
            grid-column: 2;

            grid-row: 1;
          }

          .table-status {
            grid-column: 1;
          }

          .system-health-cell {
            grid-column:
              1 / -1;
          }

          .row-arrow {
            grid-column: 2;

            grid-row: 2;

            align-self: center;
          }

          .technology-section {
            padding: 52px 0;
          }

          .technology-layout {
            gap: 30px;
          }

          .network-cta {
            padding: 48px 0;
          }

          .network-cta-inner {
            display: grid;

            gap: 25px;
          }

          .network-cta-inner
          > div:last-child {
            width: 100%;
          }

          .cta-primary,
          .cta-secondary {
            flex: 1;
          }

          .network-footer {
            padding-top: 46px;
          }

          .footer-grid {
            grid-template-columns:
              1fr;

            gap: 28px;
          }

          .footer-bottom {
            margin-top: 34px;

            flex-direction:
              column;

            gap: 10px;
          }

        }

      `}</style>

    </main>
  );
}
