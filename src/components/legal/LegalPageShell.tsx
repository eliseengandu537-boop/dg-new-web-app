import type { ReactNode } from "react";
import LegalHero from "@/components/common/breadcrumb/LegalHero";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ marginTop: 38 }}>
    <h2 style={{ color: "#0d1f2d", fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)", fontWeight: 700, marginBottom: 14 }}>
      {title}
    </h2>
    <div style={{ color: "#425160", lineHeight: 1.85 }}>{children}</div>
  </section>
);

const LegalPageShell = ({ title, description, children }: { title: string; description: string; children: ReactNode }) => (
  <Wrapper>
    <HeaderOne style={true} />
    <main>
      <LegalHero title={title} description={description} />
      <section className="pt-130 xl-pt-100 md-pt-80 pb-130 xl-pb-100 md-pb-80" style={{ background: "#f7f3ed" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <article style={{ background: "#fff", border: "1px solid rgba(13,31,45,.1)", borderRadius: 28, boxShadow: "0 20px 60px rgba(13,31,45,.08)", padding: "clamp(24px,4vw,48px)" }}>
                {children}
              </article>
            </div>
          </div>
        </div>
      </section>
      <FancyBanner style={false} />
    </main>
    <FooterFour />
  </Wrapper>
);

export default LegalPageShell;
