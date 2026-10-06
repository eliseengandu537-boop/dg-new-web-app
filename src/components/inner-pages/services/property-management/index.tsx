import Image from "next/image";
import Link from "next/link";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderOne from "@/layouts/headers/HeaderOne";
import styles from "./property-management.module.scss";

const focusAreas = [
  {
    icon: "bi-person-check",
    title: "Owner Focus",
    description:
      "We act in the owner's interests within the agreed mandate, keeping decisions, tenant matters and operational issues organised and visible.",
  },
  {
    icon: "bi-people",
    title: "Tenant Focus",
    description:
      "We provide tenants with a professional point of contact for communication, issue resolution, onboarding and ongoing administration.",
  },
  {
    icon: "bi-building-check",
    title: "Asset Focus",
    description:
      "We monitor the property's operational position, identify issues early and report the information owners need to make informed decisions.",
  },
];

const managementServices = [
  {
    icon: "bi-people",
    title: "Tenant Management",
    description: "Onboarding, communication, tenant records, requests and issue coordination.",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Lease Administration",
    description: "Lease information, key dates, documentation, renewals and administrative follow-up.",
  },
  {
    icon: "bi-cash-stack",
    title: "Rental & Arrears",
    description: "Rental monitoring, collections oversight, arrears follow-up and owner reporting.",
  },
  {
    icon: "bi-tools",
    title: "Maintenance",
    description: "Logging, coordinating and following up maintenance and service requirements.",
  },
  {
    icon: "bi-gear-wide-connected",
    title: "Property Operations",
    description: "Inspections, contractor coordination, operational records and site issues.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Financial Reporting",
    description: "Regular reporting on income, arrears, expenses, recoveries and key property matters.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Utilities & Recoveries",
    description: "Administration and monitoring of recoverable property costs where included in the mandate.",
  },
  {
    icon: "bi-shield-check",
    title: "Compliance & Records",
    description: "Maintaining core property records and coordinating required documents and information.",
  },
];

const tenantLifecycle = [
  ["01", "Onboard", "Collect tenant information, documents and contacts; capture lease and billing details."],
  ["02", "Induct", "Provide property information, contacts, procedures and operational requirements."],
  ["03", "Manage", "Handle communication, requests, queries, maintenance coordination and follow-up."],
  ["04", "Monitor", "Track rental status, outstanding actions, lease dates and property issues."],
  ["05", "Renew / Exit", "Manage timelines and coordinate renewals, notices and handovers."],
];

const financialServices = [
  ["Rental Monitoring", "Track billed and received rental amounts and identify outstanding balances."],
  ["Arrears Follow-Up", "Escalate and follow up overdue amounts in line with the owner's instructions."],
  ["Recoveries", "Monitor recoverable operating expenses and utility-related charges where applicable."],
  ["Owner Reporting", "Provide recurring information on collections, arrears, expenses and key exceptions."],
];

const maintenanceSteps = [
  ["Report", "Log the tenant or owner issue with the relevant detail."],
  ["Assess", "Determine urgency, responsibility and the appropriate next action."],
  ["Coordinate", "Engage the relevant contractor, subject to mandate and approvals."],
  ["Follow Up", "Track progress, communicate updates and escalate delays."],
  ["Close", "Confirm completion, update records and report exceptions."],
];

const reportingAreas = [
  ["bi-buildings", "Occupancy", "Current occupancy and vacancy position."],
  ["bi-wallet2", "Rental Position", "Collections, arrears and material outstanding items."],
  ["bi-people", "Tenant Matters", "Key tenant issues, notices, renewals and risks."],
  ["bi-wrench-adjustable", "Maintenance", "Open, completed and escalated maintenance items."],
  ["bi-pie-chart", "Financial Snapshot", "Income, recoveries and relevant property costs."],
  ["bi-list-check", "Action Tracker", "Outstanding decisions, approvals and next actions."],
];

const ownerPrinciples = [
  ["01", "One Point of Accountability", "A clear management contact coordinates day-to-day property matters."],
  ["02", "Agreed Mandate", "We act within the authority, budgets, approval limits and responsibilities agreed with the owner."],
  ["03", "Early Escalation", "Problems are highlighted early before they become larger operational or financial issues."],
  ["04", "Transparent Communication", "Owners receive relevant updates, reports and requests for decisions."],
  ["05", "Asset Protection", "Our focus is orderly operations, strong tenant relationships and protecting commercial value."],
];

const leasingResponsibilities = [
  "New tenant sourcing and leasing negotiations",
  "Rental proposals and commercial negotiations",
  "Letters of intent and lease transactions",
  "Vacancy strategy and market engagement",
  "Leasing fees and transaction progression",
];

const managementResponsibilities = [
  "Tenant onboarding and administration",
  "Day-to-day tenant management",
  "Rental and arrears monitoring",
  "Maintenance and operational coordination",
  "Ongoing property reporting",
];

const PropertyManagement = () => {
  return (
    <div className={styles.page}>
      <HeaderOne style={true} />

      <section className={styles.hero}>
        <div className={styles.heroTopLine} />
        <div className="container position-relative">
          <div className={`row align-items-center ${styles.heroRow}`}>
            <div className="col-lg-7">
              <p className={styles.eyebrow}>Commercial Property Management</p>
              <h1>Professional Management.<br />Clear Accountability.</h1>
              <div className={styles.goldRule} />
              <nav aria-label="Breadcrumb">
                <ol className={styles.breadcrumbs}>
                  <li><Link href="/">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/our-services">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Property Management</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className={styles.heroAside}>
                <p>A Dedicated Management Service For Commercial Property Owners.</p>
                <Link href="/inquiry" className={styles.goldButton}>Discuss Your Property</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroCurve} />
      </section>

      <main>
        <section className={styles.introSection}>
          <div className="container">
            <div className="row align-items-end g-4">
              <div className="col-lg-5">
                <p className={styles.sectionLabel}>Your accountable partner</p>
                <h2>Day-To-Day Management That Protects The Bigger Picture.</h2>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <p className={styles.introCopy}>
                  DG Property Management gives owners one accountable partner to manage the commercial
                  requirements of their property. We support tenants, maintain operational discipline and
                  give owners clear visibility over the matters affecting their asset.
                </p>
              </div>
            </div>

            <div className={`row g-4 ${styles.focusGrid}`}>
              {focusAreas.map((item) => (
                <div className="col-md-4" key={item.title}>
                  <article className={styles.focusCard}>
                    <span className={styles.focusIcon}><i className={`bi ${item.icon}`} aria-hidden="true" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.centerHeading}>
              <p className={styles.sectionLabel}>What we manage</p>
              <h2>A Structured Commercial Property Management Service.</h2>
              <p>Core responsibilities are tailored to the asset, tenant profile and agreed owner mandate.</p>
            </div>
            <div className="row g-4">
              {managementServices.map((item) => (
                <div className="col-md-6 col-lg-3" key={item.title}>
                  <article className={styles.serviceCard}>
                    <span><i className={`bi ${item.icon}`} aria-hidden="true" /></span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.lifecycleSection}>
          <div className="container">
            <div className="row align-items-end g-4">
              <div className="col-lg-6">
                <p className={styles.sectionLabelLight}>Tenant lifecycle management</p>
                <h2>A Consistent Process Throughout Every Tenancy.</h2>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <p className={styles.lightCopy}>From onboarding through occupation, renewal or exit, every action is tracked and followed through.</p>
              </div>
            </div>
            <div className={styles.lifecycleGrid}>
              {tenantLifecycle.map(([number, title, description]) => (
                <article className={styles.lifecycleCard} key={number}>
                  <span className={styles.stepNumber}>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className={styles.goalPanel}>
              <i className="bi bi-bullseye" aria-hidden="true" />
              <p><strong>The goal:</strong> tenant matters are followed through, outstanding issues remain visible, and owners do not have to personally chase every item.</p>
            </div>
          </div>
        </section>

        <section className={styles.operationsSection}>
          <div className="container">
            <div className="row g-4 g-xl-5">
              <div className="col-lg-6">
                <article className={styles.operationsPanel}>
                  <p className={styles.sectionLabel}>Financial & rental management</p>
                  <h2>Better Visibility Over Property Income.</h2>
                  <div className={styles.detailList}>
                    {financialServices.map(([title, description]) => (
                      <div key={title}>
                        <i className="bi bi-check2" aria-hidden="true" />
                        <span><strong>{title}</strong>{description}</span>
                      </div>
                    ))}
                  </div>
                  <p className={styles.panelNote}>Approvals and Owner Decisions Remain With the Client Where Required By The Agreed Mandate.</p>
                </article>
              </div>
              <div className="col-lg-6">
                <article className={`${styles.operationsPanel} ${styles.operationsPanelDark}`}>
                  <p className={styles.sectionLabelLight}>Maintenance & operations</p>
                  <h2>Moving issues from notification to resolution.</h2>
                  <div className={styles.maintenanceList}>
                    {maintenanceSteps.map(([title, description], index) => (
                      <div key={title}>
                        <span>{index + 1}</span>
                        <p><strong>{title}</strong>{description}</p>
                      </div>
                    ))}
                  </div>
                  <p className={styles.panelNoteDark}>Capital Expenditure And Material Works Remain Subject To Owner Approval Requirements.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.reportingSection}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <div className={styles.reportingImage}>
                  <Image src="/assets/images/media/qw.jpeg" alt="Commercial Property Managed By DG Property" fill sizes="(max-width: 991px) 100vw, 42vw" />
                  <div className={styles.imageBadge}>
                    <span>Clear reporting</span>
                    <strong>Less chasing.<br />Better decisions.</strong>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <p className={styles.sectionLabel}>Reporting & accountability</p>
                <h2>Management Should Give Owners Visibility Not More Work.</h2>
                <div className={styles.reportingGrid}>
                  {reportingAreas.map(([icon, title, description]) => (
                    <article key={title}>
                      <i className={`bi ${icon}`} aria-hidden="true" />
                      <div><h3>{title}</h3><p>{description}</p></div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.separationSection}>
          <div className="container">
            <div className={styles.centerHeading}>
              <p className={styles.sectionLabel}>Clear responsibilities</p>
              <h2>Leasing Secures The Transaction. Management Looks After The Property.</h2>
              <p>Separate responsibilities reduce grey areas and create clearer accountability for owners.</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-6">
                <article className={styles.responsibilityCard}>
                  <span className={styles.responsibilityIcon}><i className="bi bi-key" aria-hidden="true" /></span>
                  <p className={styles.cardKicker}>Transaction function</p>
                  <h3>DG Leasing</h3>
                  <ul>{leasingResponsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              </div>
              <div className="col-lg-6">
                <article className={`${styles.responsibilityCard} ${styles.responsibilityCardFeatured}`}>
                  <span className={styles.responsibilityIcon}><i className="bi bi-building-gear" aria-hidden="true" /></span>
                  <p className={styles.cardKicker}>Ongoing function</p>
                  <h3>DG Property Management</h3>
                  <ul>{managementResponsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ownerSection}>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-4">
                <div className={styles.ownerHeading}>
                  <p className={styles.sectionLabelLight}>Our relationship with the owner</p>
                  <h2>Built Around Communication, Accountability and Agreed Authority.</h2>
                  <Link href="/inquiry" className={styles.goldButton}>Let Us Manage Your Property</Link>
                </div>
              </div>
              <div className="col-lg-7 offset-lg-1">
                <div className={styles.ownerList}>
                  {ownerPrinciples.map(([number, title, description]) => (
                    <article key={number}>
                      <span>{number}</span>
                      <div><h3>{title}</h3><p>{description}</p></div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FancyBanner />
      <FooterFour />
    </div>
  );
};

export default PropertyManagement;
