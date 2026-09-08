"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderOne from "@/layouts/headers/HeaderOne";
import { API_ROOT, BACKEND_ROOT } from "@/utils/publicEnv";

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  summary?: string;
  body?: string;
  imageUrl?: string;
  tags?: string;
  publishedAt?: string;
  createdAt?: string;
}

const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function PropertyNewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    axios
      .get(`${API_ROOT}/news/public`, { signal: controller.signal })
      .then((response) => setPosts(Array.isArray(response.data) ? response.data : []))
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setError("We could not load the latest newsletters right now.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [retryCount]);

  const categories = [
    "All",
    ...(Array.from(new Set(posts.map((post) => post.category).filter(Boolean))) as string[]),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      (post.summary || "").toLowerCase().includes(query) ||
      (post.tags || "").toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <HeaderOne style={true} />

      <main className="newsletter-page">
        <section className="newsletter-hero">
          <div className="container">
            <div className="newsletter-hero-grid">
              <div className="newsletter-hero-copy">
                <p className="newsletter-eyebrow">DG Property journal</p>
                <h1>News that moves property forward.</h1>
                <p className="newsletter-intro">
                  Clear market updates, investment thinking and commercial property insight from
                  the people working in the market every day.
                </p>
                <nav className="newsletter-breadcrumb" aria-label="Breadcrumb">
                  <Link href="/">Home</Link>
                  <span aria-hidden="true">/</span>
                  <span>Newsletter</span>
                </nav>
              </div>

              <div className="newsletter-hero-media">
                <Image
                  src="/assets/images/media/jk.jpg"
                  alt="DG Property market insights"
                  fill
                  priority
                  sizes="(max-width: 991px) 100vw, 42vw"
                  quality={76}
                />
                <div className="newsletter-topic-block">
                  <span>Inside every edition</span>
                  <strong>Market · Investment · Retail · Development</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter-content">
          <div className="container">
            <div className="newsletter-toolbar" aria-label="Filter newsletters">
              <div className="newsletter-categories" role="group" aria-label="Newsletter category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={activeCategory === category ? "is-active" : ""}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="newsletter-search">
                <label htmlFor="newsletter-search">Search newsletters</label>
                <i className="bi bi-search" aria-hidden="true" />
                <input
                  id="newsletter-search"
                  type="search"
                  placeholder="Search newsletters"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="newsletter-section-heading">
              <div>
                <p>Property intelligence</p>
                <h2>Latest editions</h2>
              </div>
              {!loading && !error && (
                <span>{filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}</span>
              )}
            </div>

            {loading && (
              <div className="newsletter-state" role="status">
                <i className="bi bi-newspaper" aria-hidden="true" />
                <h3>Loading the latest editions</h3>
                <p>Gathering current property news and insights.</p>
              </div>
            )}

            {!loading && error && (
              <div className="newsletter-state newsletter-state--error" role="alert">
                <i className="bi bi-cloud-slash" aria-hidden="true" />
                <h3>News is temporarily unavailable</h3>
                <p>{error}</p>
                <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredPosts.length === 0 && (
              <div className="newsletter-state">
                <i className="bi bi-search" aria-hidden="true" />
                <h3>No matching newsletters</h3>
                <p>Try another search term or select a different category.</p>
                {(search || activeCategory !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {!loading && !error && filteredPosts.length > 0 && (
              <div className="newsletter-grid">
                {filteredPosts.map((post, index) => {
                  const date = formatDate(post.publishedAt || post.createdAt);

                  return (
                    <Link
                      href={`/property-news/${post.slug}`}
                      className={`newsletter-card ${index === 0 ? "newsletter-card--featured" : ""}`}
                      key={post.id}
                    >
                      <article>
                        <div className="newsletter-card-media">
                          {post.imageUrl ? (
                            <img
                              src={`${BACKEND_ROOT}${post.imageUrl}`}
                              alt={post.title}
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                            />
                          ) : (
                            <div className="newsletter-card-placeholder" aria-hidden="true">
                              <i className="bi bi-newspaper" />
                            </div>
                          )}
                          {post.category && <span className="newsletter-card-category">{post.category}</span>}
                          <span className="newsletter-card-number" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="newsletter-card-copy">
                          <div className="newsletter-card-meta">
                            {date && <span>{date}</span>}
                            {post.author && <span>By {post.author}</span>}
                          </div>
                          <h3>{post.title}</h3>
                          {post.summary && <p>{post.summary}</p>}
                          <span className="newsletter-card-link">
                            Read the edition <i className="bi bi-arrow-up-right" aria-hidden="true" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <FooterFour />

      <style jsx>{`
        .newsletter-page { background: #f3f5f1; }
        .newsletter-hero { position: relative; overflow: hidden; padding: 158px 0 86px; background: #102536; }
        .newsletter-hero::before { content: ""; position: absolute; inset: 0; opacity: .16; background-image: linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(to right, black, transparent 58%); }
        .newsletter-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1.1fr) minmax(360px,.9fr); gap: 64px; align-items: stretch; }
        .newsletter-hero-copy { display: flex; flex-direction: column; justify-content: center; min-height: 390px; padding: 42px 0; }
        .newsletter-eyebrow, .newsletter-section-heading p { margin: 0 0 18px; color: #e8b86d; font-size: 12px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .newsletter-hero h1 { max-width: 760px; margin: 0; color: #fff; font-size: clamp(44px,5.7vw,78px); font-weight: 700; letter-spacing: -.045em; line-height: .98; }
        .newsletter-intro { max-width: 650px; margin: 28px 0 34px; color: rgba(255,255,255,.68); font-size: 17px; line-height: 1.75; }
        .newsletter-breadcrumb { display: flex; align-items: center; gap: 10px; color: #e8b86d; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
        .newsletter-breadcrumb a { color: rgba(255,255,255,.66); text-decoration: none; }
        .newsletter-hero-media { position: relative; min-height: 430px; overflow: hidden; border: 1px solid rgba(255,255,255,.24); box-shadow: 24px 24px 0 rgba(232,184,109,.12); }
        .newsletter-hero-media :global(img) { object-fit: cover; }
        .newsletter-hero-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top,rgba(9,24,35,.74),transparent 62%); }
        .newsletter-topic-block { position: absolute; z-index: 2; right: 0; bottom: 0; left: 0; padding: 24px 26px; border-top: 1px solid rgba(255,255,255,.2); color: #fff; backdrop-filter: blur(8px); }
        .newsletter-topic-block span, .newsletter-topic-block strong { display: block; }
        .newsletter-topic-block span { margin-bottom: 6px; color: #e8b86d; font-size: 10px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
        .newsletter-topic-block strong { font-size: 14px; line-height: 1.5; }
        .newsletter-content { padding: 0 0 100px; }
        .newsletter-toolbar { position: relative; z-index: 3; display: flex; align-items: center; justify-content: space-between; gap: 24px; margin: -34px 0 72px; padding: 20px; border: 1px solid #dce1d8; border-left: 6px solid #879078; background: #fff; box-shadow: 0 18px 45px rgba(21,42,55,.09); }
        .newsletter-categories { display: flex; flex-wrap: wrap; gap: 8px; }
        .newsletter-categories button { min-height: 44px; padding: 0 17px; border: 1px solid #dfe4dd; background: #f7f8f5; color: #506071; font-size: 12px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; transition: background .2s ease,border-color .2s ease,color .2s ease; }
        .newsletter-categories button:hover, .newsletter-categories button:focus-visible, .newsletter-categories button.is-active { border-color: #102536; background: #102536; color: #fff; }
        .newsletter-search { position: relative; flex: 0 1 310px; min-width: 240px; }
        .newsletter-search label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .newsletter-search i { position: absolute; top: 50%; left: 16px; color: #7f8b96; transform: translateY(-50%); }
        .newsletter-search input { width: 100%; min-height: 48px; padding: 0 16px 0 44px; border: 1px solid #dfe4dd; border-radius: 0; outline: none; background: #f7f8f5; color: #102536; font-size: 14px; }
        .newsletter-search input:focus { border-color: #879078; box-shadow: 0 0 0 3px rgba(135,144,120,.14); }
        .newsletter-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 34px; padding-bottom: 22px; border-bottom: 1px solid #ced5cb; }
        .newsletter-section-heading p { margin-bottom: 8px; color: #76551f; }
        .newsletter-section-heading h2 { margin: 0; color: #102536; font-size: clamp(34px,4vw,50px); font-weight: 700; letter-spacing: -.04em; }
        .newsletter-section-heading > span { color: #53616e; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
        .newsletter-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 24px; }
        .newsletter-card { min-width: 0; border: 1px solid #dce1d8; border-top: 4px solid #879078; background: #fff; color: inherit; text-decoration: none; transition: transform .2s ease,box-shadow .2s ease; }
        .newsletter-card:hover, .newsletter-card:focus-visible { transform: translateY(-5px); box-shadow: 0 22px 42px rgba(16,37,54,.12); }
        .newsletter-card article { display: grid; grid-template-rows: 255px 1fr; height: 100%; }
        .newsletter-card--featured { grid-column: 1/-1; border-top-color: #d3a95f; }
        .newsletter-card--featured article { grid-template-columns: minmax(0,1.25fr) minmax(340px,.75fr); grid-template-rows: minmax(390px,auto); }
        .newsletter-card-media { position: relative; min-width: 0; overflow: hidden; background: #dfe4dd; }
        .newsletter-card-media > img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
        .newsletter-card:hover .newsletter-card-media > img { transform: scale(1.035); }
        .newsletter-card-placeholder { display: grid; place-items: center; width: 100%; height: 100%; color: #8e9a89; background: linear-gradient(135deg,#e7ebe4,#d7ded4); font-size: 48px; }
        .newsletter-card-category, .newsletter-card-number { position: absolute; z-index: 1; top: 16px; display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 12px; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .newsletter-card-category { left: 16px; background: #76551f; }
        .newsletter-card-number { right: 16px; min-width: 38px; background: #102536; }
        .newsletter-card-copy { display: flex; flex-direction: column; padding: 30px; }
        .newsletter-card--featured .newsletter-card-copy { justify-content: center; padding: 46px; background: #102536; }
        .newsletter-card-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-bottom: 18px; color: #596675; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
        .newsletter-card h3 { margin: 0 0 16px; color: #102536; font-size: clamp(22px,2.2vw,31px); font-weight: 700; letter-spacing: -.025em; line-height: 1.18; }
        .newsletter-card--featured h3 { color: #fff; font-size: clamp(29px,3vw,42px); }
        .newsletter-card-copy p { display: -webkit-box; overflow: hidden; margin: 0 0 26px; color: #53616e; font-size: 14px; line-height: 1.75; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
        .newsletter-card--featured .newsletter-card-copy p { color: rgba(255,255,255,.62); -webkit-line-clamp: 4; }
        .newsletter-card-link { display: inline-flex; align-items: center; gap: 8px; margin-top: auto; color: #76551f; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .newsletter-card--featured .newsletter-card-link { color: #e8b86d; }
        .newsletter-state { display: flex; flex-direction: column; align-items: flex-start; min-height: 270px; justify-content: center; padding: 48px; border: 1px solid #dce1d8; border-left: 6px solid #879078; background: #fff; }
        .newsletter-state > i { margin-bottom: 18px; color: #879078; font-size: 36px; }
        .newsletter-state h3 { margin: 0 0 8px; color: #102536; font-size: 25px; }
        .newsletter-state p { margin: 0; color: #53616e; }
        .newsletter-state button { min-height: 44px; margin-top: 22px; padding: 0 20px; border: 0; background: #102536; color: #fff; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .newsletter-state--error { border-left-color: #b46a58; }

        @media (max-width: 991px) {
          .newsletter-hero { padding-top: 140px; }
          .newsletter-hero-grid { grid-template-columns: 1fr; gap: 28px; }
          .newsletter-hero-copy { min-height: 0; padding: 10px 0 24px; }
          .newsletter-hero-media { min-height: 360px; box-shadow: 16px 16px 0 rgba(232,184,109,.12); }
          .newsletter-toolbar { align-items: stretch; flex-direction: column; }
          .newsletter-search { flex-basis: auto; width: 100%; }
          .newsletter-card--featured article { grid-template-columns: 1fr; grid-template-rows: 340px auto; }
        }

        @media (max-width: 767px) {
          .newsletter-hero { padding: 126px 0 68px; }
          .newsletter-hero h1 { font-size: clamp(40px,13vw,58px); }
          .newsletter-intro { font-size: 15px; }
          .newsletter-hero-media { min-height: 300px; }
          .newsletter-toolbar { margin-bottom: 54px; padding: 15px; }
          .newsletter-categories { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); }
          .newsletter-categories button { padding: 0 10px; }
          .newsletter-section-heading { align-items: flex-start; flex-direction: column; }
          .newsletter-grid { grid-template-columns: 1fr; }
          .newsletter-card--featured { grid-column: auto; }
          .newsletter-card article, .newsletter-card--featured article { grid-template-columns: 1fr; grid-template-rows: 245px auto; }
          .newsletter-card-copy, .newsletter-card--featured .newsletter-card-copy { padding: 26px 24px; }
          .newsletter-state { padding: 34px 26px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .newsletter-card, .newsletter-card-media > img { transition: none; }
          .newsletter-card:hover, .newsletter-card:focus-visible, .newsletter-card:hover .newsletter-card-media > img { transform: none; }
        }
      `}</style>
    </>
  );
}
