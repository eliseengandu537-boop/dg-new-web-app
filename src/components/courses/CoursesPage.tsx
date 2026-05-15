"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import HeaderFour from "@/layouts/headers/HeaderFour";

const courseHeroHighlights = [
  {
    icon: "bi-award",
    title: "Industry Expertise",
    desc: "Learn from a seasoned CEO who brings years of hands-on experience.",
  },
  {
    icon: "bi-book",
    title: "Relevant Curriculum",
    desc: "Knowledge that directly enhances your career prospects.",
  },
  {
    icon: "bi-tools",
    title: "Tools & Resources",
    desc: "Worksheets and quizzes to test your knowledge.",
  },
];

const CoursesPage = () => {
  const showCourseUnavailable = () => {
    toast.info("Course not available for now.", {
      position: "top-center",
    });
  };

  return (
    <>
      <HeaderFour />
      <main style={{ background: "#f7f8fb" }}>
        {/* ── PAGE HEAD ───────────────────────────────────────────────────── */}
        <section
          className="position-relative overflow-hidden"
          style={{
            backgroundImage: "url(/assets/images/media/ik.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(25,42,57,0.95) 0%, rgba(25,42,57,0.86) 46%, rgba(25,42,57,0.9) 100%)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(9,19,30,0.25) 0%, rgba(9,19,30,0.52) 100%)",
              zIndex: 0,
            }}
          />

          <div className="container position-relative" style={{ zIndex: 1, paddingTop: 150, paddingBottom: 78 }}>
            <nav style={{ marginBottom: 16 }}>
              <ol
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  flexWrap: "wrap",
                }}
              >
                <li>
                  <Link
                    href="/"
                    style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.85rem", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </li>
                <li style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.85rem" }}>/</li>
                <li style={{ color: "#ffffff", fontSize: "0.85rem" }}>Courses</li>
              </ol>
            </nav>

            <div style={{ maxWidth: 720 }}>
              <p
                className="text-uppercase fw-600 mb-15"
                style={{ color: "#e9bb77", fontSize: "0.76rem", letterSpacing: "0.18em" }}
              >
                DG Property Education
              </p>
              <h1
                className="font-garamond text-white mb-15"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.08 }}
              >
                Courses
              </h1>
              <div
                style={{
                  width: 72,
                  height: 3,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #c8973a, #e8b86d)",
                  marginBottom: 18,
                }}
              />
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", lineHeight: 1.8, margin: 0 }}>
                Practical commercial property training built for aspiring brokers who want clear
                guidance, real-world insight, and a faster start in the industry.
              </p>
            </div>
          </div>
        </section>

        {/* ── COURSE INTRO ────────────────────────────────────────────────── */}
        <section className="pb-90 lg-pb-60">
          <div className="container" style={{ marginTop: -48, position: "relative", zIndex: 2 }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 28,
                boxShadow: "0 22px 60px rgba(15,31,46,0.12)",
                border: "1px solid rgba(223,229,233,0.92)",
                padding: "36px 32px 34px",
              }}
            >
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <p
                  className="text-uppercase fw-600 mb-15"
                  style={{ color: "#e8773a", fontSize: "0.78rem", letterSpacing: "0.18em" }}
                >
                  Candidate Practitioner Online Course
                </p>
                <h2
                  className="font-garamond mb-25"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.3rem)", lineHeight: 1.12, color: "#0f1f2e" }}
                >
                  By CEO,
                  <br />
                  <span style={{ color: "#e8773a" }}>Michela De Gennaro</span>
                </h2>
                <p style={{ fontSize: "1.02rem", color: "#55606d", lineHeight: 1.85, maxWidth: 560, marginBottom: 30 }}>
                  Industry-leading property education designed to equip aspiring brokers with
                  the knowledge, confidence, and connections to succeed.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                  <a
                    href="#course-card"
                    className="btn-nine text-uppercase"
                    style={{ padding: "14px 34px", fontSize: "0.88rem" }}
                  >
                    <span>Enrol Now →</span>
                  </a>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 18px",
                      borderRadius: 999,
                      background: "#f7f8fb",
                      color: "#586574",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <i className="bi bi-play-circle" style={{ color: "#e8773a", fontSize: 18 }} />
                    Beginner friendly
                  </div>
                </div>
              </div>

              <div className="col-lg-5 text-center">
                <div
                  style={{
                    width: "min(100%, 400px)",
                    aspectRatio: "1 / 1",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                    border: "6px solid rgba(232,119,58,0.2)",
                    boxShadow: "0 20px 60px rgba(15,31,46,0.16)",
                    background: "#f5f6f8",
                  }}
                >
                  <Image
                    src="/assets/images/media/122.png"
                    alt="Michela De Gennaro"
                    width={460}
                    height={460}
                    style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>

            <div
              className="row g-4"
              style={{
                marginTop: 18,
                paddingTop: 26,
                borderTop: "1px solid #edf1f4",
              }}
            >
              {courseHeroHighlights.map((f, i) => (
                <div className="col-md-4" key={i}>
                  <div
                    style={{
                      background: "#f8f9fc",
                      border: "1px solid #edf1f4",
                      borderRadius: 18,
                      padding: "24px 22px",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "rgba(232,119,58,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <i className={`bi ${f.icon}`} style={{ fontSize: 24, color: "#e8773a" }} />
                    </div>
                    <h6 className="fw-600 mb-10" style={{ fontSize: "1rem", color: "#0f1f2e" }}>
                      {f.title}
                    </h6>
                    <p style={{ color: "#657282", fontSize: "0.9rem", margin: 0, lineHeight: 1.7 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT MICHELA ─────────────────────────────────────────────────── */}
        <section className="pt-20 pb-80" style={{ background: "#f8f9fc" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    borderRadius: 24, overflow: "hidden",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src="/assets/images/media/mics1.jpg"
                    alt="Michela De Gennaro"
                    width={520}
                    height={580}
                    style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                {/* floating badge */}
                <div
                  style={{
                    position: "absolute", bottom: 30, right: -20,
                    background: "#fff", borderRadius: 16,
                    padding: "16px 22px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    minWidth: 180,
                  }}
                >
                  <p style={{ fontSize: "0.75rem", color: "#888", margin: 0 }}>CEO &amp; Lead Instructor</p>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f1f2e", margin: 0 }}>Michela De Gennaro</p>
                  <div style={{ display: "flex", gap: 2, marginTop: 6 }}>
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className="bi bi-star-fill" style={{ color: "#e8773a", fontSize: 12 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <p className="text-uppercase fw-600 mb-12" style={{ color: "#e8773a", fontSize: "0.78rem", letterSpacing: "0.18em" }}>
                About the Instructor
              </p>
              <h2 className="font-garamond mb-30" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#0f1f2e" }}>
                About Michela De Gennaro
              </h2>
              <div style={{ fontSize: "1rem", color: "#555", lineHeight: 1.85 }}>
                <p>
                  With many years in the property industry, Michela has gained great knowledge as well as
                  invaluable relationships with clients across all sectors of the property market.
                </p>
                <p>
                  Dealing with both funds and private investors she has grown her network exponentially and
                  kept long lasting relationships.
                </p>
                <p>
                  Her strengths are understanding the market, negotiating and closing deals, dealing with
                  people and networking is what she loves doing.
                </p>
                <p>
                  Michela brings a unique, young and vibrant dynamic to this industry and is ready to show
                  you challenges can be overcome.
                </p>
              </div>
              <div className="row g-3 mt-20">
                {[
                  { num: "15+", label: "Years Experience" },
                  { num: "10+", label: "Students Enrolled" },
                  { num: "98%", label: "Satisfaction Rate" },
                ].map((s, i) => (
                  <div className="col-4" key={i}>
                    <div
                      style={{
                        textAlign: "center", padding: "20px 10px",
                        borderRadius: 12, background: "#fff",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      }}
                    >
                      <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#e8773a", margin: 0 }}>{s.num}</p>
                      <p style={{ fontSize: "0.8rem", color: "#888", margin: 0 }}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* ── MOTIVATIONAL BANNER ───────────────────────────────────────────── */}
        <section
          className="position-relative py-90"
          style={{
            background: `url(/assets/images/media/img_49.jpg) center/cover no-repeat`,
          }}
        >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "rgba(10,25,40,0.72)",
          }}
        />
        <div className="container position-relative text-center" style={{ zIndex: 1 }}>
          <p
            className="text-uppercase fw-600 mb-20"
            style={{ color: "#e8773a", fontSize: "0.78rem", letterSpacing: "0.2em" }}
          >
            Your Journey Starts Here
          </p>
          <h2
            className="font-garamond text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.2 }}
          >
            Know in your heart that financial freedom is
            <br />
            <em style={{ color: "#e8773a" }}>truly possible!</em>
          </h2>
        </div>
        </section>

        {/* ── COURSE CARD ───────────────────────────────────────────────────── */}
        <section id="course-card" className="pt-100 pb-100" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-60">
            <p className="text-uppercase fw-600 mb-12" style={{ color: "#e8773a", fontSize: "0.78rem", letterSpacing: "0.18em" }}>
              Available Now
            </p>
            <h2 className="font-garamond" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#0f1f2e" }}>
              Courses
            </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
                  border: "1px solid #eee",
                }}
              >
                <div className="row g-0">
                  {/* thumbnail */}
                  <div className="col-md-5">
                    <button
                      type="button"
                      onClick={showCourseUnavailable}
                      style={{
                        display: "block",
                        height: "100%",
                        width: "100%",
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                      aria-label="Course not available for now"
                    >
                    <div style={{ position: "relative", height: "100%", minHeight: 280 }}>
                      <Image
                        src="/assets/images/media/m3.jpg"
                        alt="Candidate Practitioner Course"
                        fill
                        style={{ objectFit: "cover", objectPosition: "center center" }}
                      />
                      <span
                        style={{
                          position: "absolute", top: 16, left: 16,
                          background: "#e8773a", color: "#fff",
                          fontSize: "0.72rem", fontWeight: 700,
                          padding: "5px 14px", borderRadius: 20,
                          textTransform: "uppercase", letterSpacing: "0.1em",
                        }}
                      >
                        Beginner
                      </span>
                    </div>
                    </button>
                  </div>

                  {/* details */}
                  <div className="col-md-7" style={{ background: "#fff" }}>
                    <div style={{ padding: "36px 32px" }}>
                      <button
                        type="button"
                        onClick={showCourseUnavailable}
                        style={{
                          padding: 0,
                          border: "none",
                          background: "transparent",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                        aria-label="Course not available for now"
                      >
                      <h4
                        style={{
                          fontSize: "1.25rem", fontWeight: 700,
                          color: "#0f1f2e", marginBottom: 16, lineHeight: 1.3,
                        }}
                      >
                        Candidate Practitioner Course: Beginner
                      </h4>
                      </button>

                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: "0.88rem" }}>
                          <i className="bi bi-collection-play" style={{ color: "#e8773a" }} />
                          1 Module
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: "0.88rem" }}>
                          <i className="bi bi-clock" style={{ color: "#e8773a" }} />
                          30 hours
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: "0.88rem" }}>
                          <i className="bi bi-person-circle" style={{ color: "#e8773a" }} />
                          By Michela De Gennaro
                        </span>
                      </div>

                      <p style={{ fontSize: "0.92rem", color: "#666", marginBottom: 24, lineHeight: 1.7 }}>
                        A comprehensive introduction to commercial property brokerage, covering
                        market fundamentals, legal frameworks, client relationships and deal-making
                        strategies used by industry professionals.
                      </p>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                        <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f2e" }}>
                          R4&nbsp;000
                        </span>
                        <button
                          type="button"
                          onClick={showCourseUnavailable}
                          className="btn-nine text-uppercase"
                          style={{ padding: "12px 28px", fontSize: "0.85rem", border: "none", cursor: "pointer" }}
                        >
                          <span>View Course →</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="pt-90 pb-110" style={{ background: "#f8f9fc" }}>
        <div className="container">
          <div className="text-center mb-60">
            <p className="text-uppercase fw-600 mb-12" style={{ color: "#e8773a", fontSize: "0.78rem", letterSpacing: "0.18em" }}>
              Student Reviews
            </p>
            <h2 className="font-garamond" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#0f1f2e" }}>
              What our students say
            </h2>
          </div>

          <div className="row g-4">
            {[
              {
                text: "Taking the property course has been a game-changer for me. It provided me with a solid understanding of the property market, investment strategies, and the legal aspects that come within the game. The course's practical approach made complex concepts easier to grasp, and the real-world examples helped me connect theory with practice. I've gained the confidence to make informed decisions, and I now feel more equipped to pursue property investments with a clear strategy. Overall, the knowledge and skills I've gained have already started to pay off in my personal and professional life.",
                name: "Khaya Nyamathe",
                role: "Commercial Property Broker",
                img: "/assets/images/agent/img_01.jpg",
              },
              {
                text: "This course has been an incredibly valuable experience, providing me with the essential knowledge and tools to excel as a broker. The insights gained have deepened my understanding of the industry, equipping me with strategies to navigate challenges and seize properties with confidence. I now feel empowered to elevate my career and approach brokering with a level of expertise I never thought possible.",
                name: "Cassidy O'Keefe",
                role: "Intern Broker",
                img: "/assets/images/agent/img_02.jpg",
              },
              {
                text: "This course has been a game-changer for me as a property broker! The knowledge and practical tips Michela shares are incredibly valuable and easy to apply. Since implementing what I've learned, I've closed more deals and grown so much in my career. Highly recommend to anyone serious about succeeding in property!",
                name: "Deylin Pillay",
                role: "Retail Property Broker",
                img: "/assets/images/agent/img_03.jpg",
              },
            ].map((t, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "36px 28px",
                    height: "100%",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                    {[1,2,3,4,5].map(s => (
                      <i key={s} className="bi bi-star-fill" style={{ color: "#e8773a", fontSize: 14 }} />
                    ))}
                  </div>

                  {/* quote mark */}
                  <span style={{ fontSize: "3.5rem", lineHeight: 0.8, color: "#e8773a", opacity: 0.2, marginBottom: 12, fontFamily: "var(--site-font-family)" }}>&ldquo;</span>

                  <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.8, flex: 1, marginBottom: 28 }}>
                    {t.text}
                  </p>

                  {/* author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: "50%",
                        overflow: "hidden", flexShrink: 0,
                        border: "2px solid rgba(232,119,58,0.3)",
                      }}
                    >
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={48}
                        height={48}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "#0f1f2e", margin: 0, fontSize: "0.95rem" }}>{t.name}</p>
                      <p style={{ color: "#e8773a", margin: 0, fontSize: "0.82rem" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* ── CTA FOOTER ────────────────────────────────────────────────────── */}
        <section
          className="py-80 text-center"
          style={{ background: "linear-gradient(135deg, #0f1f2e 0%, #1a3a4c 100%)" }}
        >
        <div className="container">
          <h3 className="font-garamond text-white mb-20" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Ready to start your property career?
          </h3>
          <p className="mb-35" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
            Join Michela&apos;s programme and transform your future in commercial property.
          </p>
          <Link href="/contact" className="btn-nine text-uppercase">
            <span>Get in touch →</span>
          </Link>
        </div>
        </section>
      </main>
    </>
  );
};

export default CoursesPage;
