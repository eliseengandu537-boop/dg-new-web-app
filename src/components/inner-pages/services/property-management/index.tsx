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
    description: "Act in the owner's interests at all times. Maintain visibility and organisation across the asset.",
  },
  {
    icon: "bi-people",
    title: "Tenant Focus",
    description: "Professional communication and prompt issue resolution to sustain tenant confidence.",
  },
  {
    icon: "bi-building-check",
    title: "Asset Focus",
    description: "Monitor operations and provide informed, timely reporting on asset performance.",
  },
];

const managementServices = [
  {
    icon: "bi-people",
    title: "Tenant Management",
    description: "Onboarding, communication, issue coordination.",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Lease Administration",
    description: "Lease records, key dates, renewal tracking.",
  },
  {
    icon: "bi-cash-stack",
    title: "Rental & Arrears",
    description: "Monitoring, collections oversight, follow-ups.",
  },
  {
    icon: "bi-tools",
    title: "Maintenance",
    description: "Logging, coordinating and following through.",
  },
  {
    icon: "bi-gear-wide-connected",
    title: "Property Operations",
    description: "Inspections and contractor coordination.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Financial Reporting",
    description: "Income, expenses, arrears and recoveries.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Utilities & Recoveries",
    description: "Administration of recoverable costs.",
  },
  {
    icon: "bi-shield-check",
    title: "Compliance & Records",
    description: "Documentation and regulatory coordination.",
  },
];

const tenantLifecycle = [
  ["01", "Onboard", "Collect tenant details, documents and contacts."],
  ["02", "Induct", "Provide property info, contacts and procedures."],
  ["03", "Manage", "Handle communications, requests and maintenance."],
  ["04", "Monitor", "Track rental status, lease dates and open issues."],
  ["05", "Renew / Exit", "Manage timelines, renewals and clean handovers."],
];

const financialServices = [
  ["Rental Monitoring", "Track billed vs received rents and outstanding balances."],
  ["Arrears Follow-Up", "Prompt escalation per the owner's instructions."],
  ["Recoveries", "Monitor operating expenses and utilities recoveries."],
  ["Owner Reporting", "Clear, regular updates on income, arrears and expenses."],
];

const maintenanceSteps = [
  ["Report", "Tenant or owner issue logged with full details."],
  ["Assess", "Urgency, responsibility and next steps determined."],
  ["Coordinate", "Contractors engaged per the agreed mandate."],
  ["Follow Up", "Progress tracked, delays escalated promptly."],
  ["Close", "Confirm completion, update records, report."],
];

const reportingAreas = [
  ["bi-buildings", "Occupancy", "Current occupancy and vacancy status."],
  ["bi-wallet2", "Rental Position", "Collections, arrears, outstanding issues."],
  ["bi-people", "Tenant Matters", "Key issues, notices, renewals, risks."],
  ["bi-wrench-adjustable", "Maintenance", "Open, completed and escalated items."],
  ["bi-pie-chart", "Financial Snapshot", "Income, recoveries and property costs."],
  ["bi-list-check", "Action Tracker", "Outstanding decisions, approvals, next steps."],
];

const ownerPrinciples = [
  ["01", "One Point of Accountability", "A single, clear management contact."],
  ["02", "Agreed Mandate", "Authority, budgets and approvals defined with the owner."],
  ["03", "Early Escalation", "Issues surfaced before they become problems."],
  ["04", "Transparent Communication", "Timely updates and clear decision requests."],
  ["05", "Asset Protection", "Operations, tenant support and commercial value preserved."],
];

const leasingResponsibilities = [
  "Tenant sourcing and lease negotiations",
  "Rental proposals and LOI's",
  "Lease transactions and vacancy strategy",
  "Leasing fees and commercial terms",
];

const managementResponsibilities = [
  "Tenant onboarding and day-to-day management",
  "Rental monitoring and arrears follow-up",
  "Maintenance coordination and inspections",
  "Operational and financial reporting",
];

const whyChoose = [
  ["01", "Commercial Experience", "Deep understanding of tenant and asset realities."],
  ["02", "Hands-On Execution", "Focused on follow-through, not just documentation."],
  ["03", "Owner Visibility", "Clear reporting and escalation without chasing."],
  ["04", "Tenant Experience", "Professional communication and issue handling."],
  ["05", "Integrated Knowledge", "Leasing, market and asset context in one team."],
  ["06", "Scalable Service", "Tailored to asset, tenant profile and owner needs."],
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
              <h1>Professional Management That Protects And Enhances Assets.</h1>
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
                <p>Introducing DE GENNARO PROPERTY your integrated commercial property partner.</p>
                <Link href="/inquiry" className={styles.goldButton}>Get Started</Link>
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
                <p className={styles.sectionLabel}>Our service focus</p>
                <h2>One Accountable Partner For Commercial Property Owners.</h2>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <p className={styles.introCopy}>
                  DG Property Management gives owners one accountable partner to manage the commercial requirements of their property. We support tenants, maintain operational discipline and give owners clear visibility over the matters affecting their asset.
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
              <h2>Eight Service Areas, One Coordinated Partner.</h2>
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
                <h2>From Onboarding To Exit Managed, Not Chased.</h2>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <p className={styles.lightCopy}>Owners gain confidence in smooth tenant management without needing to chase.</p>
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
                  <h2>Clear Visibility. Disciplined Follow-Through.</h2>
                  <div className={styles.detailList}>
                    {financialServices.map(([title, description]) => (
                      <div key={title}>
                        <i className="bi bi-check2" aria-hidden="true" />
                        <span><strong>{title}</strong>{description}</span>
                      </div>
                    ))}
                  </div>
                  <p className={styles.panelNote}>Role: Financial transparency while preserving owner approval control.</p>
                </article>
              </div>
              <div className="col-lg-6">
                <article className={`${styles.operationsPanel} ${styles.operationsPanelDark}`}>
                  <p className={styles.sectionLabelLight}>Maintenance & operations</p>
                  <h2>A Disciplined Workflow For Every Property Issue.</h2>
                  <div className={styles.maintenanceList}>
                    {maintenanceSteps.map(([title, description], index) => (
                      <div key={title}>
                        <span>{index + 1}</span>
                        <p><strong>{title}</strong>{description}</p>
                      </div>
                    ))}
                  </div>
                  <p className={styles.panelNoteDark}>Note: Capital expenditure remains subject to owner approval.</p>
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
                <h2>Owners Informed Without The Extra Work.</h2>
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
              <p className={styles.sectionLabel}>Scope & separation</p>
              <h2>Leasing And Management Distinct, By Design.</h2>
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
                  <h2>Five Principles For An Effective Partnership.</h2>
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

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.centerHeading}>
              <p className={styles.sectionLabel}>Why choose DG property</p>
              <h2>What Sets DG Property Management Apart.</h2>
            </div>
            <div className="row g-4">
              {whyChoose.map(([number, title, description]) => (
                <div className="col-md-6 col-lg-4" key={number}>
                  <article className={styles.serviceCard}>
                    <span><strong>{number}</strong></span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                </div>
              ))}
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
