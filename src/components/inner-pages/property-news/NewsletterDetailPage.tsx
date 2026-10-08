"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  pdfUrl?: string;
  tags?: string;
  publishedAt?: string;
  createdAt?: string;
  featuredStories?: string;
  deals?: string;
  gallery?: string;
  breakingNewsTitle?: string;
  breakingNewsDesc?: string;
  breakingNewsUrl?: string;
}

interface FeaturedStory {
  type: string;
  title: string;
  description: string;
  imageUrl?: string;
  readMoreUrl?: string;
  icon?: string;
}

interface Deal {
  dealType: string;
  property: string;
  location?: string;
  icon?: string;
}

interface GalleryItem {
  url: string;
  placement?: "article" | "gallery";
}

interface ContentSection {
  type: "heading" | "subheading" | "paragraph" | "quote" | "list" | "image" | "highlight" | "breaking";
  text: string;
  items?: string[];
}

const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatMonth = (date?: string) => {
  if (!date) return "Current edition";

  return new Date(date).toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });
};

const mediaUrl = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${BACKEND_ROOT}${url}`;
};

const parseJson = <T,>(value?: string): T[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const parseBody = (body?: string): ContentSection[] => {
  if (!body) return [];

  const sections: ContentSection[] = [];

  for (const block of body.split(/\n{2,}/)) {
    const text = block.trim();
    if (!text) continue;

    if (text.startsWith("## ")) sections.push({ type: "heading", text: text.slice(3) });
    else if (text.startsWith("### ")) sections.push({ type: "subheading", text: text.slice(4) });
    else if (text.startsWith("> ")) sections.push({ type: "quote", text: text.slice(2) });
    else if (text.startsWith("!BREAK ") || text.startsWith("[BREAK]")) {
      sections.push({ type: "breaking", text: text.replace(/^!BREAK |^\[BREAK\]\s*/, "").trim() });
    } else if (text.startsWith("!HL ") || text.startsWith("[HL]")) {
      sections.push({ type: "highlight", text: text.replace(/^!HL |^\[HL\]\s*/, "").trim() });
    } else if (/^https?:\/\/\S+\.(jpg|jpeg|png|webp|gif)/i.test(text)) {
      sections.push({ type: "image", text });
    } else if (text.split("\n").every((line) => /^[-•]\s/.test(line))) {
      sections.push({
        type: "list",
        text,
        items: text.split("\n").map((line) => line.replace(/^[-•]\s/, "")),
      });
    } else {
      sections.push({ type: "paragraph", text });
    }
  }

  return sections;
};

export default function NewsletterDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<NewsPost | null>(null);
  const [allPosts, setAllPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    setLoading(true);
    setError("");

    Promise.all([
      axios.get(`${API_ROOT}/news/public/${slug}`, { signal: controller.signal }),
      axios.get(`${API_ROOT}/news/public`, { signal: controller.signal }),
    ])
      .then(([postResponse, allResponse]) => {
        setPost(postResponse.data);
        setAllPosts(Array.isArray(allResponse.data) ? allResponse.data : []);
      })
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          const status = requestError?.response?.status;
          setError(status === 404 ? "This newsletter could not be found." : "This newsletter is temporarily unavailable.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [retryCount, slug]);

  const copyLink = async () => {
    if (!shareUrl || !navigator.clipboard) return;

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (loading) {
    return (
      <>
        <HeaderOne style={true} />
        <main className="newsletter-status-page">
          <div className="newsletter-loader" role="status">
            <span aria-hidden="true" />
            <h1>Preparing today&apos;s edition</h1>
            <p>Loading the latest DG Property story.</p>
          </div>
        </main>
        <FooterFour />
        <style jsx>{statusStyles}</style>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <HeaderOne style={true} />
        <main className="newsletter-status-page">
          <div className="newsletter-loader newsletter-loader--error" role="alert">
            <i className="bi bi-newspaper" aria-hidden="true" />
            <h1>Edition unavailable</h1>
            <p>{error || "This newsletter could not be found."}</p>
            <div>
              <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
              <Link href="/property-news">Browse all editions</Link>
            </div>
          </div>
        </main>
        <FooterFour />
        <style jsx>{statusStyles}</style>
      </>
    );
  }

  const publishedDate = post.publishedAt || post.createdAt;
  const date = formatDate(publishedDate);
  const month = formatMonth(publishedDate);
  const sections = parseBody(post.body);
  const featuredStories = parseJson<FeaturedStory>(post.featuredStories).filter(
    (story) => story.title || story.description || story.imageUrl,
  );
  const deals = parseJson<Deal>(post.deals).filter(
    (deal) => deal.dealType || deal.property || deal.location,
  );
  const galleryItems = parseJson<GalleryItem>(post.gallery).filter((item) => item.url);
  const articleImage = galleryItems.find((item) => item.placement === "article");
  const gallery = galleryItems.filter((item) => item.placement !== "article");
  const postIndex = allPosts.findIndex((item) => item.slug === slug);
  const previousPost = postIndex >= 0 && postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const issueMatch = post.tags?.match(/issue\s*(\d+)/i);
  const issueLabel = issueMatch ? `Issue ${issueMatch[1].padStart(2, "0")}` : "Digital edition";
  const legacyPdfUrl = post.tags?.match(/https?:\/\/\S+\.pdf/i)?.[0];
  const pdfUrl = mediaUrl(post.pdfUrl || legacyPdfUrl);
  const pdfDownloadUrl = post.pdfUrl
    ? `${API_ROOT}/news/public/${encodeURIComponent(post.slug)}/pdf`
    : pdfUrl;
  const displayTags = (post.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag && !/^issue\s*\d+/i.test(tag) && !/^https?:\/\//i.test(tag));
  const authorName = post.author || "DG Property editorial team";
  const authorInitials = authorName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const shareLinks = [
    {
      icon: "bi-linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: "bi-whatsapp",
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`,
    },
    {
      icon: "bi-envelope",
      label: "Share by email",
      href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
      <HeaderOne style={true} />

      <main className="editorial-page">
        <article>
          <header className="publication-masthead">
            <div className="container">
              <div className="publication-topline">
                <Link href="/property-news"><i className="bi bi-arrow-left" aria-hidden="true" /> Back to insights</Link>
                <span>{issueLabel} · {month}</span>
              </div>
            </div>
          </header>

          <section className={`story-lead ${post.imageUrl ? "" : "story-lead--without-image"}`}>
            <div className="container story-lead-grid">
              <div className="story-copy-block">
                <p className="story-kicker">{post.category || "Property news"}</p>
                <h1>{post.title}</h1>
                <div className="story-standfirst">
                  {post.summary && <p>{post.summary}</p>}
                </div>
                <div className="story-byline">
                  <span>{post.author ? `By ${post.author}` : "DG Property editorial team"}</span>
                  {date && <time dateTime={publishedDate}>{date}</time>}
                </div>
              </div>
              {post.imageUrl && (
                <figure className="lead-image">
                  <img src={mediaUrl(post.imageUrl)} alt={post.title} decoding="async" />
                  <figcaption>
                    <span>DG Property Journal</span>
                    <span>{post.category || "Commercial property insight"}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          </section>

          {pdfUrl && (
            <section className="pdf-edition-section">
              <div className="container">
                <div className="pdf-edition-heading">
                  <div>
                    <p>Designed digital edition</p>
                    <h2>Read the original newsletter</h2>
                    <span>The complete publication is shown below exactly as designed.</span>
                  </div>
                  <div className="pdf-edition-actions">
                    <a href={pdfUrl} target="_blank" rel="noreferrer">
                      <i className="bi bi-arrows-fullscreen" aria-hidden="true" /> Open full screen
                    </a>
                    <a href={pdfDownloadUrl}>
                      <i className="bi bi-download" aria-hidden="true" /> Download PDF
                    </a>
                  </div>
                </div>
                <div className="pdf-edition-viewer">
                  <iframe src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} title={`${post.title} PDF newsletter`} />
                  <div className="pdf-edition-fallback">
                    <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
                    <p>If the newsletter does not appear in your browser, open or download the PDF.</p>
                    <a href={pdfUrl} target="_blank" rel="noreferrer">Open PDF</a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!pdfUrl && (sections.length > 0 || articleImage || displayTags.length > 0) && (
            <section className="article-section">
              <div className="container article-layout">
                <aside className="article-aside" aria-label="Article information">
                  <div className="aside-rule" />
                  <p className="aside-label">In this edition</p>
                  <dl>
                    <div><dt>Published</dt><dd>{date || "Current"}</dd></div>
                    <div><dt>Desk</dt><dd>{post.category || "News"}</dd></div>
                    <div><dt>Reading time</dt><dd>{Math.max(2, Math.ceil((post.body?.split(/\s+/).length || 0) / 200))} min</dd></div>
                  </dl>
                  <p className="aside-label aside-label--share">Share story</p>
                  <div className="aside-share">
                    {shareLinks.map((link) => (
                      <a
                        key={link.icon}
                        href={link.href}
                        target={link.icon === "bi-envelope" ? undefined : "_blank"}
                        rel={link.icon === "bi-envelope" ? undefined : "noreferrer"}
                        aria-label={link.label}
                      >
                        <i className={`bi ${link.icon}`} aria-hidden="true" />
                      </a>
                    ))}
                    <button type="button" onClick={copyLink} aria-label="Copy article link">
                      <i className={`bi ${copied ? "bi-check2" : "bi-link-45deg"}`} aria-hidden="true" />
                    </button>
                  </div>
                  {copied && <span className="copy-confirmation" role="status">Link copied</span>}

                  {featuredStories.length > 0 && (
                    <div className="aside-featured">
                      <h2>Featured posts</h2>
                      {featuredStories.slice(0, 2).map((story, index) => (
                        <article className="aside-feature-card" key={`${story.title}-aside-${index}`}>
                          <div>
                            {story.imageUrl ? (
                              <img src={mediaUrl(story.imageUrl)} alt={story.title || "Featured story"} loading="lazy" decoding="async" />
                            ) : (
                              <i className={`bi ${story.icon || "bi-newspaper"}`} aria-hidden="true" />
                            )}
                          </div>
                          <section>
                            <span>{story.type || post.category || "Insights"}</span>
                            <h3>{story.title || "More from this edition"}</h3>
                          </section>
                        </article>
                      ))}
                    </div>
                  )}

                  <div className="aside-cta">
                    <span>DG Property insights</span>
                    <h2>Stay close to the market.</h2>
                    <p>Explore more commercial property thinking and opportunities from our team.</p>
                    <Link href="/property-news">Browse all editions</Link>
                  </div>
                </aside>

                <div className="article-copy">
                  {sections.map((section, index) => {
                    if (section.type === "heading") return <h2 key={index}>{section.text}</h2>;
                    if (section.type === "subheading") return <h3 key={index}>{section.text}</h3>;
                    if (section.type === "quote") {
                      return <blockquote key={index}><p>{section.text}</p></blockquote>;
                    }
                    if (section.type === "highlight") {
                      return (
                        <aside className="article-highlight" key={index}>
                          <span>Editor&apos;s note</span>
                          <p>{section.text}</p>
                        </aside>
                      );
                    }
                    if (section.type === "breaking") {
                      return (
                        <aside className="article-alert" key={index}>
                          <span>Developing story</span>
                          <p>{section.text}</p>
                        </aside>
                      );
                    }
                    if (section.type === "image") {
                      return <figure className="body-image" key={index}><img src={section.text} alt={`Article image for ${post.title}`} loading="lazy" decoding="async" /></figure>;
                    }
                    if (section.type === "list") {
                      return (
                        <ul key={index}>
                          {(section.items || []).map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                        </ul>
                      );
                    }
                    return <p className={index === 0 ? "article-opening" : ""} key={index}>{section.text}</p>;
                  })}

                  {articleImage && (
                    <figure className="body-image body-image--uploaded">
                      <img src={mediaUrl(articleImage.url)} alt={`Supporting image for ${post.title}`} loading="lazy" decoding="async" />
                    </figure>
                  )}

                  {displayTags.length > 0 && (
                    <div className="article-tags" aria-label="Article topics">
                      {displayTags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}

                  <div className="author-card">
                    <span aria-hidden="true">{authorInitials || "DG"}</span>
                    <div><strong>{authorName}</strong><small>DG Property contributor</small></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="newsletter-cta">
            <div className="container newsletter-cta__inner">
              <div>
                <span>DG Property insights</span>
                <h2>Property intelligence, delivered clearly.</h2>
              </div>
              <p>Keep up with market thinking, new opportunities and the people shaping commercial property.</p>
              <Link href="/contact">Join our mailing list <i className="bi bi-arrow-right" aria-hidden="true" /></Link>
            </div>
          </section>

          {!pdfUrl && featuredStories.length > 0 && (
            <section className="editorial-section featured-section">
              <div className="container">
                <header className="section-heading">
                  <div><p>Continue exploring</p><h2>Read more</h2></div>
                  <span>{featuredStories.length} articles</span>
                </header>
                <div className="featured-grid">
                  {featuredStories.map((story, index) => (
                    <article className="feature-card" key={`${story.title}-${index}`}>
                      <div className="feature-media">
                        {story.imageUrl ? (
                          <img src={mediaUrl(story.imageUrl)} alt={story.title || story.type || "Featured story"} loading="lazy" decoding="async" />
                        ) : (
                          <div className="feature-placeholder"><i className={`bi ${story.icon || "bi-newspaper"}`} aria-hidden="true" /></div>
                        )}
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="feature-copy">
                        {story.type && <p>{story.type}</p>}
                        {story.title && <h3>{story.title}</h3>}
                        {story.description && <div>{story.description}</div>}
                        {story.readMoreUrl && (
                          <a href={story.readMoreUrl} target="_blank" rel="noreferrer">Read report <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {!pdfUrl && deals.length > 0 && (
            <section className="deals-section">
              <div className="container">
                <header className="deals-heading">
                  <p>Transaction desk</p>
                  <h2>Deals on the move</h2>
                </header>
                <div className="deals-grid">
                  {deals.map((deal, index) => (
                    <article key={`${deal.dealType}-${index}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <i className={`bi ${deal.icon || "bi-building"}`} aria-hidden="true" />
                      <p>{deal.dealType || "Deal update"}</p>
                      {deal.property && <h3>{deal.property}</h3>}
                      {deal.location && <small>{deal.location}</small>}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {!pdfUrl && gallery.length > 0 && (
            <section className="editorial-section gallery-section">
              <div className="container">
                <header className="section-heading">
                  <div><p>Photo desk</p><h2>Moments that matter</h2></div>
                  <span>{gallery.length} photographs</span>
                </header>
                <div className="editorial-gallery">
                  {gallery.map((item, index) => (
                    <figure key={`${item.url}-${index}`}>
                      <img src={mediaUrl(item.url)} alt={`DG Property gallery image ${index + 1}`} loading="lazy" decoding="async" />
                      <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {!pdfUrl && post.breakingNewsTitle && (
            <section className="breaking-section">
              <div className="container breaking-grid">
                <div className="breaking-label"><span>Breaking</span><span>News</span></div>
                <div className="breaking-copy">
                  <p>Latest update</p>
                  <h2>{post.breakingNewsTitle}</h2>
                  {post.breakingNewsDesc && <div>{post.breakingNewsDesc}</div>}
                  {post.breakingNewsUrl && (
                    <a href={post.breakingNewsUrl} target="_blank" rel="noreferrer">Read the update <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="story-footer">
            <div className="container">
              <div className="story-share-row">
                <div><p>Enjoyed this edition?</p><h2>Share the story.</h2></div>
                <div>
                  {shareLinks.map((link) => (
                    <a key={link.icon} href={link.href} target={link.icon === "bi-envelope" ? undefined : "_blank"} rel={link.icon === "bi-envelope" ? undefined : "noreferrer"} aria-label={link.label}>
                      <i className={`bi ${link.icon}`} aria-hidden="true" />
                    </a>
                  ))}
                  <button type="button" onClick={copyLink} aria-label="Copy article link"><i className={`bi ${copied ? "bi-check2" : "bi-link-45deg"}`} aria-hidden="true" /></button>
                </div>
              </div>

              {(previousPost || nextPost) && (
                <nav className="edition-navigation" aria-label="Newsletter editions">
                  <div>
                    {previousPost && <Link href={`/property-news/${previousPost.slug}`}><span>Previous edition</span><strong>{previousPost.title}</strong></Link>}
                  </div>
                  <div>
                    {nextPost && <Link href={`/property-news/${nextPost.slug}`}><span>Next edition</span><strong>{nextPost.title}</strong></Link>}
                  </div>
                </nav>
              )}

              <Link className="all-editions-link" href="/property-news"><i className="bi bi-grid" aria-hidden="true" /> Browse all editions</Link>
            </div>
          </section>
        </article>
      </main>

      <FooterFour />

      <style jsx>{`
        .editorial-page { --navy:#102536; --ink:#17232d; --gold:#b8893f; --paper:#f5f2e9; --sage:#879078; overflow:hidden; background:var(--paper); color:var(--ink); }
        .publication-masthead { padding:135px 0 28px; background:var(--navy); color:#fff; }
        .publication-topline, .publication-bottomline { display:flex; justify-content:space-between; gap:20px; padding:11px 0; border-top:1px solid rgba(255,255,255,.34); border-bottom:1px solid rgba(255,255,255,.34); color:rgba(255,255,255,.66); font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
        .publication-name { padding:20px 0 17px; font-family:Georgia,'Times New Roman',serif; font-size:clamp(46px,8vw,104px); font-weight:700; letter-spacing:-.065em; line-height:.9; text-align:center; }
        .publication-bottomline a { display:inline-flex; gap:8px; color:#e9bd73; text-decoration:none; }
        .story-lead { padding:70px 0 76px; }
        .story-heading-grid { display:grid; grid-template-columns:minmax(0,1.3fr) minmax(330px,.7fr); gap:70px; align-items:end; padding-bottom:42px; }
        .story-kicker, .section-heading p, .deals-heading p, .breaking-copy>p, .story-share-row p { margin:0 0 15px; color:var(--gold); font-size:11px; font-weight:800; letter-spacing:.19em; text-transform:uppercase; }
        .story-heading-grid h1 { max-width:850px; margin:0; font-family:Georgia,'Times New Roman',serif; font-size:clamp(48px,6.7vw,90px); font-weight:700; letter-spacing:-.055em; line-height:.98; overflow-wrap:anywhere; }
        .story-standfirst>p { margin:0 0 28px; color:#46535d; font-family:Georgia,'Times New Roman',serif; font-size:19px; font-style:italic; line-height:1.65; white-space:pre-line; }
        .story-byline { display:flex; flex-wrap:wrap; gap:10px 22px; padding-top:18px; border-top:2px solid var(--ink); color:#61707a; font-size:11px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
        .lead-image { margin:0; border-top:7px solid var(--ink); }
        .lead-image img { display:block; width:100%; max-height:650px; object-fit:cover; }
        .lead-image figcaption { display:flex; justify-content:space-between; gap:20px; padding:11px 0; border-bottom:1px solid #c9c6bb; color:#68737b; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
        .article-section { padding:0 0 95px; }
        .article-layout { display:grid; grid-template-columns:230px minmax(0,760px); justify-content:center; gap:72px; align-items:start; }
        .article-aside { position:sticky; top:120px; }
        .aside-rule { width:46px; height:5px; margin-bottom:22px; background:var(--gold); }
        .aside-label { margin:0 0 14px; color:var(--ink); font-size:11px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; }
        .article-aside dl { margin:0; }
        .article-aside dl>div { padding:12px 0; border-top:1px solid #cecbc0; }
        .article-aside dt { margin-bottom:3px; color:#7b858c; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
        .article-aside dd { margin:0; color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:14px; }
        .aside-label--share { margin-top:28px; }
        .aside-share { display:flex; flex-wrap:wrap; gap:7px; }
        .aside-share a, .aside-share button, .story-share-row a, .story-share-row button { display:inline-grid; place-items:center; width:40px; height:40px; border:0; border-radius:0; background:var(--ink); color:#fff; text-decoration:none; }
        .copy-confirmation { display:block; margin-top:9px; color:var(--sage); font-size:11px; font-weight:800; text-transform:uppercase; }
        .article-copy { min-width:0; }
        .article-copy>p { margin:0 0 25px; color:#313c44; font-family:Georgia,'Times New Roman',serif; font-size:18px; line-height:1.9; white-space:pre-line; }
        .article-copy>.article-opening::first-letter { float:left; margin:8px 10px 0 0; color:var(--navy); font-family:Georgia,'Times New Roman',serif; font-size:76px; font-weight:700; line-height:.68; }
        .article-copy h2 { margin:52px 0 19px; padding-top:20px; border-top:4px solid var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:37px; letter-spacing:-.035em; line-height:1.12; }
        .article-copy h3 { margin:37px 0 15px; font-size:21px; line-height:1.3; }
        .article-copy blockquote { margin:42px 0; padding:30px 34px; border-top:5px solid var(--gold); border-bottom:1px solid #c8c5b9; }
        .article-copy blockquote p { margin:0; color:var(--navy); font-family:Georgia,'Times New Roman',serif; font-size:clamp(25px,3vw,36px); font-style:italic; line-height:1.35; }
        .article-highlight, .article-alert { margin:34px 0; padding:26px 30px; border-left:6px solid var(--sage); background:#e4e8df; }
        .article-alert { border-left-color:var(--gold); background:var(--navy); color:#fff; }
        .article-highlight span, .article-alert span { display:block; margin-bottom:8px; color:var(--gold); font-size:10px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
        .article-highlight p, .article-alert p { margin:0; font-family:Georgia,'Times New Roman',serif; font-size:17px; line-height:1.7; }
        .article-copy ul { margin:20px 0 30px; padding:0; list-style:none; }
        .article-copy li { position:relative; margin-bottom:13px; padding-left:25px; font-family:Georgia,'Times New Roman',serif; font-size:18px; line-height:1.7; }
        .article-copy li::before { content:'■'; position:absolute; left:0; top:2px; color:var(--gold); font-size:10px; }
        .body-image { margin:38px 0; }
        .body-image img { display:block; width:100%; }
        .download-edition { display:inline-flex; align-items:center; gap:10px; min-height:50px; margin-top:12px; padding:0 22px; background:var(--navy); color:#fff; font-size:11px; font-weight:800; letter-spacing:.1em; text-decoration:none; text-transform:uppercase; }
        .editorial-section { padding:94px 0; border-top:1px solid #cbc8bd; background:#efede4; }
        .section-heading { display:flex; align-items:end; justify-content:space-between; gap:25px; margin-bottom:38px; padding-bottom:22px; border-bottom:4px solid var(--ink); }
        .section-heading p { margin-bottom:8px; }
        .section-heading h2, .deals-heading h2, .breaking-copy h2, .story-share-row h2 { margin:0; font-family:Georgia,'Times New Roman',serif; font-size:clamp(38px,4.8vw,62px); font-weight:700; letter-spacing:-.045em; line-height:1; }
        .section-heading>span { color:#6b767e; font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
        .featured-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
        .feature-card { display:grid; grid-template-columns:minmax(180px,.8fr) minmax(0,1.2fr); min-height:290px; border-top:5px solid var(--sage); background:#fff; }
        .feature-card--lead { grid-column:1/-1; grid-template-columns:minmax(0,1.2fr) minmax(360px,.8fr); min-height:430px; border-top-color:var(--gold); }
        .feature-media { position:relative; min-height:240px; overflow:hidden; background:#dfe3da; }
        .feature-media img { width:100%; height:100%; object-fit:cover; }
        .feature-media>span { position:absolute; top:14px; right:14px; display:grid; place-items:center; width:38px; height:38px; background:var(--navy); color:#fff; font-size:11px; font-weight:800; }
        .feature-placeholder { display:grid; place-items:center; width:100%; height:100%; color:var(--sage); font-size:42px; }
        .feature-copy { display:flex; flex-direction:column; justify-content:center; padding:28px; }
        .feature-card--lead .feature-copy { padding:46px; background:var(--navy); }
        .feature-copy>p { margin:0 0 10px; color:var(--gold); font-size:10px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
        .feature-copy h3 { margin:0 0 14px; font-family:Georgia,'Times New Roman',serif; font-size:28px; letter-spacing:-.025em; line-height:1.15; }
        .feature-card--lead .feature-copy h3 { color:#fff; font-size:clamp(32px,3.5vw,48px); }
        .feature-copy>div { color:#69757d; font-family:Georgia,'Times New Roman',serif; font-size:14px; line-height:1.7; white-space:pre-line; }
        .feature-card--lead .feature-copy>div { color:rgba(255,255,255,.65); }
        .feature-copy a { display:inline-flex; align-items:center; gap:8px; margin-top:24px; color:var(--gold); font-size:11px; font-weight:800; letter-spacing:.1em; text-decoration:none; text-transform:uppercase; }
        .deals-section { padding:88px 0; background:var(--navy); color:#fff; }
        .deals-heading { display:flex; justify-content:space-between; align-items:end; gap:30px; margin-bottom:36px; padding-bottom:22px; border-bottom:1px solid rgba(255,255,255,.3); }
        .deals-heading p { margin:0; }
        .deals-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); border-top:1px solid rgba(255,255,255,.25); border-left:1px solid rgba(255,255,255,.25); }
        .deals-grid article { position:relative; min-height:220px; padding:28px 24px; border-right:1px solid rgba(255,255,255,.25); border-bottom:1px solid rgba(255,255,255,.25); }
        .deals-grid article>span { position:absolute; top:18px; right:18px; color:rgba(255,255,255,.32); font-size:11px; font-weight:800; }
        .deals-grid i { display:block; margin-bottom:42px; color:#e8b86d; font-size:27px; }
        .deals-grid p { margin:0 0 8px; color:#e8b86d; font-size:10px; font-weight:800; letter-spacing:.13em; text-transform:uppercase; }
        .deals-grid h3 { margin:0 0 8px; color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:21px; line-height:1.2; }
        .deals-grid small { color:rgba(255,255,255,.55); }
        .gallery-section { background:var(--paper); }
        .editorial-gallery { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); grid-auto-rows:240px; gap:14px; }
        .editorial-gallery figure { position:relative; grid-column:span 4; margin:0; overflow:hidden; background:#d9ddd5; }
        .editorial-gallery figure:first-child { grid-column:span 7; grid-row:span 2; }
        .editorial-gallery figure:nth-child(2) { grid-column:span 5; }
        .editorial-gallery figure:nth-child(3) { grid-column:span 5; }
        .editorial-gallery img { width:100%; height:100%; object-fit:cover; transition:transform .4s ease; }
        .editorial-gallery figure:hover img { transform:scale(1.025); }
        .editorial-gallery figcaption { position:absolute; right:12px; bottom:12px; display:grid; place-items:center; width:36px; height:36px; background:#fff; color:var(--ink); font-size:10px; font-weight:800; }
        .breaking-section { padding:100px 0; background:#fff; }
        .breaking-grid { display:grid; grid-template-columns:280px minmax(0,760px); justify-content:center; gap:70px; }
        .breaking-label { align-self:start; padding:28px; background:#a44637; color:#fff; font-size:45px; font-weight:900; letter-spacing:-.055em; line-height:.82; text-transform:uppercase; }
        .breaking-label span { display:block; }
        .breaking-copy>div { margin-top:25px; color:#47545e; font-family:Georgia,'Times New Roman',serif; font-size:18px; line-height:1.8; white-space:pre-line; }
        .breaking-copy a { display:inline-flex; align-items:center; gap:8px; min-height:48px; margin-top:28px; padding:0 20px; background:var(--ink); color:#fff; font-size:11px; font-weight:800; letter-spacing:.1em; text-decoration:none; text-transform:uppercase; }
        .story-footer { padding:80px 0 95px; border-top:1px solid #cbc8bd; background:var(--paper); }
        .story-share-row { display:flex; align-items:center; justify-content:space-between; gap:30px; padding-bottom:42px; border-bottom:4px solid var(--ink); }
        .story-share-row>div:last-child { display:flex; gap:8px; }
        .story-share-row a, .story-share-row button { width:46px; height:46px; }
        .edition-navigation { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); margin-top:32px; border-top:1px solid #cbc8bd; border-left:1px solid #cbc8bd; }
        .edition-navigation>div { min-height:125px; border-right:1px solid #cbc8bd; border-bottom:1px solid #cbc8bd; }
        .edition-navigation a { display:flex; flex-direction:column; justify-content:center; height:100%; padding:25px; color:var(--ink); text-decoration:none; }
        .edition-navigation>div:last-child a { text-align:right; }
        .edition-navigation span { margin-bottom:8px; color:var(--gold); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
        .edition-navigation strong { font-family:Georgia,'Times New Roman',serif; font-size:19px; }
        .all-editions-link { display:inline-flex; align-items:center; gap:9px; margin-top:27px; color:var(--navy); font-size:11px; font-weight:800; letter-spacing:.1em; text-decoration:none; text-transform:uppercase; }

        @media (max-width:1199px) {
          .story-heading-grid { gap:45px; }
          .article-layout { grid-template-columns:190px minmax(0,720px); gap:45px; }
          .deals-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
        }
        @media (max-width:991px) {
          .story-heading-grid, .breaking-grid { grid-template-columns:1fr; gap:32px; }
          .article-layout { grid-template-columns:1fr; }
          .article-aside { position:static; }
          .article-aside { display:grid; grid-template-columns:1fr auto; gap:20px; padding:20px 0; border-top:4px solid var(--ink); border-bottom:1px solid #cbc8bd; }
          .article-aside .aside-rule, .article-aside dl { display:none; }
          .aside-label--share { margin:0; align-self:center; }
          .aside-share { grid-column:2; grid-row:1; }
          .copy-confirmation { grid-column:2; }
          .feature-card, .feature-card--lead { grid-template-columns:1fr; }
          .feature-card--lead { min-height:0; }
          .feature-media { min-height:310px; }
          .breaking-label { width:max-content; }
        }
        @media (max-width:767px) {
          .publication-masthead { padding-top:122px; }
          .publication-topline span:first-child, .publication-bottomline>span { display:none; }
          .publication-topline, .publication-bottomline { justify-content:center; }
          .publication-name { font-size:clamp(42px,13vw,66px); letter-spacing:-.06em; }
          .story-lead { padding:50px 0 60px; }
          .story-heading-grid { padding-bottom:30px; }
          .story-heading-grid h1 { font-size:clamp(43px,13vw,66px); }
          .story-standfirst>p { font-size:17px; }
          .lead-image img { min-height:280px; }
          .lead-image figcaption { align-items:flex-start; flex-direction:column; }
          .article-section { padding-bottom:70px; }
          .article-copy>p { font-size:17px; line-height:1.8; }
          .article-copy h2 { font-size:31px; }
          .article-copy blockquote { padding:25px 20px; }
          .editorial-section, .deals-section, .breaking-section { padding:70px 0; }
          .section-heading, .deals-heading, .story-share-row { align-items:flex-start; flex-direction:column; }
          .section-heading h2, .deals-heading h2, .breaking-copy h2, .story-share-row h2 { font-size:39px; }
          .featured-grid { grid-template-columns:1fr; }
          .feature-card--lead { grid-column:auto; }
          .feature-media { min-height:245px; }
          .feature-card--lead .feature-copy, .feature-copy { padding:27px 24px; }
          .deals-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .deals-grid article { min-height:190px; padding:22px 18px; }
          .editorial-gallery { grid-template-columns:1fr; grid-auto-rows:260px; }
          .editorial-gallery figure, .editorial-gallery figure:first-child, .editorial-gallery figure:nth-child(2), .editorial-gallery figure:nth-child(3) { grid-column:auto; grid-row:auto; }
          .breaking-label { font-size:34px; }
          .story-footer { padding:65px 0 75px; }
          .edition-navigation { grid-template-columns:1fr; }
          .edition-navigation>div:last-child a { text-align:left; }
        }
        @media (max-width:420px) {
          .deals-grid { grid-template-columns:1fr; }
          .article-aside { grid-template-columns:1fr; }
          .aside-share { grid-column:1; grid-row:auto; }
          .copy-confirmation { grid-column:1; }
        }
        @media (prefers-reduced-motion:reduce) {
          .editorial-gallery img { transition:none; }
          .editorial-gallery figure:hover img { transform:none; }
        }

        /* Modern corporate block restyle */
        .editorial-page { --navy:#0d2435; --ink:#182a38; --gold:#d59d49; --paper:#f3f5f1; --sage:#8e9780; background:var(--paper); font-family:var(--site-font-family),Arial,sans-serif; }
        .publication-masthead { padding:132px 0 44px; background:radial-gradient(circle at 82% 20%,rgba(142,151,128,.3),transparent 30%),linear-gradient(125deg,#0b2031,#153347); }
        .publication-topline { align-items:center; padding:0 0 26px; border:0; color:rgba(255,255,255,.64); }
        .publication-topline a { display:inline-flex; align-items:center; gap:8px; color:#fff; text-decoration:none; }
        .publication-topline span { padding:9px 13px; border:1px solid rgba(255,255,255,.2); border-radius:999px; background:rgba(255,255,255,.06); }
        .publication-brand { display:flex; align-items:center; gap:24px; padding:32px 0; border-top:1px solid rgba(255,255,255,.16); }
        .publication-mark { display:grid; flex:0 0 88px; width:88px; height:88px; place-items:center; border-radius:20px; background:linear-gradient(145deg,#a7af98,#737d68); color:#fff; font-size:30px; font-weight:800; letter-spacing:-.05em; box-shadow:0 18px 36px rgba(0,0,0,.2); }
        .publication-name { padding:0; font-family:inherit; font-size:clamp(40px,5.6vw,72px); font-weight:750; letter-spacing:-.055em; line-height:1; text-align:left; }
        .publication-brand p { max-width:620px; margin:10px 0 0; color:rgba(255,255,255,.58); font-size:15px; line-height:1.6; }
        .publication-bottomline { justify-content:flex-start; gap:8px; padding:22px 0 0; border:0; }
        .publication-bottomline span { padding:8px 12px; border-radius:7px; background:rgba(255,255,255,.07); color:rgba(255,255,255,.7); }
        .story-lead { padding:58px 0 82px; background:#e9eee8; }
        .story-lead-grid { display:grid; grid-template-columns:minmax(380px,.82fr) minmax(0,1.18fr); gap:0; align-items:stretch; }
        .story-copy-block { position:relative; z-index:2; display:flex; flex-direction:column; justify-content:center; padding:54px; border-left:7px solid var(--sage); border-radius:18px 0 0 18px; background:#fff; box-shadow:0 24px 60px rgba(13,36,53,.11); }
        .story-kicker, .section-heading p, .deals-heading p, .breaking-copy>p, .story-share-row p { color:var(--gold); font-size:10px; letter-spacing:.17em; }
        .story-copy-block h1 { margin:0; color:var(--ink); font-family:inherit; font-size:clamp(44px,5.5vw,72px); font-weight:750; letter-spacing:-.055em; line-height:1.02; overflow-wrap:anywhere; }
        .story-standfirst>p { display:-webkit-box; overflow:hidden; margin:25px 0 28px; color:#5f6d77; font-family:inherit; font-size:16px; font-style:normal; line-height:1.7; white-space:pre-line; -webkit-box-orient:vertical; -webkit-line-clamp:7; }
        .story-byline { gap:8px 18px; margin-top:auto; padding-top:20px; border-top:1px solid #dce2dd; color:#75818a; font-size:10px; }
        .lead-image { position:relative; min-height:620px; margin:28px 0; overflow:hidden; border:0; border-radius:0 18px 18px 0; box-shadow:0 24px 60px rgba(13,36,53,.11); }
        .lead-image img { width:100%; height:100%; min-height:620px; max-height:none; object-fit:cover; }
        .lead-image figcaption { position:absolute; right:18px; bottom:18px; left:18px; padding:13px 16px; border:0; border-radius:10px; background:rgba(13,36,53,.8); color:rgba(255,255,255,.72); backdrop-filter:blur(8px); }
        .article-section { padding:95px 0; background:#fff; }
        .article-layout { grid-template-columns:250px minmax(0,730px); gap:62px; }
        .article-aside { top:110px; padding:28px; border-radius:16px; background:var(--navy); color:#fff; box-shadow:0 18px 45px rgba(13,36,53,.13); }
        .aside-rule { width:42px; height:4px; background:var(--gold); }
        .aside-label { color:#fff; }
        .article-aside dl>div { border-color:rgba(255,255,255,.14); }
        .article-aside dt { color:rgba(255,255,255,.48); }
        .article-aside dd { color:#fff; font-family:inherit; font-size:13px; }
        .aside-share a, .aside-share button { border-radius:10px; background:rgba(255,255,255,.12); }
        .article-copy>p { color:#42515c; font-family:inherit; font-size:17px; line-height:1.85; }
        .article-copy>.article-opening::first-letter { float:none; margin:0; color:inherit; font:inherit; line-height:inherit; }
        .article-copy h2 { position:relative; margin:48px 0 20px; padding:0 0 0 20px; border:0; font-family:inherit; font-size:34px; letter-spacing:-.035em; }
        .article-copy h2::before { content:""; position:absolute; top:5px; bottom:5px; left:0; width:5px; border-radius:4px; background:var(--gold); }
        .article-copy h3 { color:var(--ink); font-size:21px; }
        .article-copy blockquote { margin:38px 0; padding:30px; border:0; border-radius:16px; background:var(--navy); }
        .article-copy blockquote p { color:#fff; font-family:inherit; font-size:clamp(23px,2.8vw,31px); font-style:normal; font-weight:600; }
        .article-highlight, .article-alert { border:0; border-radius:14px; background:#edf1ea; }
        .article-alert { background:var(--navy); }
        .article-highlight p, .article-alert p, .article-copy li { font-family:inherit; }
        .body-image img { border-radius:15px; }
        .download-edition { border-radius:10px; }
        .editorial-section { border:0; background:var(--paper); }
        .section-heading { padding-bottom:24px; border-bottom:1px solid #d3dad4; }
        .section-heading h2, .deals-heading h2, .breaking-copy h2, .story-share-row h2 { font-family:inherit; font-weight:750; letter-spacing:-.045em; }
        .featured-grid { gap:20px; }
        .feature-card { overflow:hidden; border:0; border-radius:17px; background:#fff; box-shadow:0 14px 36px rgba(13,36,53,.08); }
        .feature-card--lead { border:0; }
        .feature-card--lead .feature-copy { background:linear-gradient(145deg,#0d2435,#183b50); }
        .feature-copy h3, .feature-card--lead .feature-copy h3 { font-family:inherit; font-weight:700; }
        .feature-copy>div { font-family:inherit; }
        .feature-media>span { border-radius:10px; }
        .deals-section { background:#102c3f; }
        .deals-heading { border-color:rgba(255,255,255,.15); }
        .deals-grid { gap:12px; border:0; }
        .deals-grid article { min-height:220px; border:1px solid rgba(255,255,255,.12); border-radius:15px; background:rgba(255,255,255,.055); }
        .deals-grid h3 { font-family:inherit; }
        .gallery-section { background:#fff; }
        .editorial-gallery { gap:16px; }
        .editorial-gallery figure { border-radius:16px; }
        .editorial-gallery figcaption { border-radius:10px; }
        .breaking-section { background:#fff; }
        .breaking-grid { grid-template-columns:230px minmax(0,780px); gap:24px; padding:24px; border-radius:20px; background:#f5eee2; }
        .breaking-label { display:flex; flex-direction:column; justify-content:center; border-radius:14px; background:linear-gradient(145deg,#c78443,#a86031); font-size:36px; text-align:center; }
        .breaking-copy { padding:38px 34px; }
        .breaking-copy>div { font-family:inherit; font-size:16px; }
        .breaking-copy a { border-radius:10px; }
        .story-footer { border:0; background:#e9eee8; }
        .story-share-row { padding:36px; border:0; border-radius:17px; background:#fff; box-shadow:0 14px 36px rgba(13,36,53,.07); }
        .story-share-row a, .story-share-row button { border-radius:12px; }
        .edition-navigation { gap:12px; border:0; }
        .edition-navigation>div { border:0; border-radius:14px; background:#fff; }
        .edition-navigation strong { font-family:inherit; }

        @media (max-width:991px) {
          .story-lead-grid { grid-template-columns:1fr; }
          .story-copy-block { border-radius:18px 18px 0 0; }
          .lead-image { min-height:480px; margin:0; border-radius:0 0 18px 18px; }
          .lead-image img { min-height:480px; }
          .article-layout { grid-template-columns:minmax(0,1fr); gap:42px; }
          .article-aside { position:static; display:grid; grid-template-columns:1fr auto; gap:18px; padding:24px; border:0; }
          .article-aside .aside-rule, .article-aside dl { display:none; }
          .aside-label--share { align-self:center; margin:0; }
          .aside-share { grid-column:2; grid-row:1; }
          .copy-confirmation { grid-column:2; }
          .feature-card, .feature-card--lead { grid-template-columns:1fr; }
          .feature-card--lead { min-height:0; }
          .feature-media { min-height:310px; }
          .deals-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
          .breaking-grid { grid-template-columns:1fr; }
          .breaking-label { width:100%; padding:20px; }
          .breaking-label span { display:inline; }
        }
        @media (max-width:767px) {
          .publication-masthead { padding:118px 0 35px; }
          .publication-topline { flex-wrap:wrap; justify-content:space-between; gap:12px; }
          .publication-topline span { display:inline-flex; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
          .publication-brand { gap:16px; padding:26px 0; }
          .publication-brand>div { min-width:0; }
          .publication-mark { flex-basis:62px; width:62px; height:62px; border-radius:15px; font-size:23px; }
          .publication-name { font-size:clamp(31px,9.5vw,46px); overflow-wrap:anywhere; }
          .publication-brand p { display:none; }
          .publication-bottomline { display:flex; justify-content:flex-start; overflow-x:auto; }
          .publication-bottomline>span { display:inline-flex; white-space:nowrap; }
          .story-lead { padding:35px 0 55px; }
          .story-lead-grid, .story-copy-block, .lead-image { min-width:0; }
          .story-copy-block { overflow:hidden; padding:34px 25px; }
          .story-copy-block h1 { font-size:clamp(40px,13vw,58px); }
          .story-standfirst>p { overflow-wrap:anywhere; }
          .lead-image, .lead-image img { min-height:330px; }
          .article-section { padding:70px 0; }
          .article-aside { grid-template-columns:1fr; border-radius:14px; background:var(--navy); }
          .aside-share { grid-column:1; grid-row:auto; }
          .copy-confirmation { grid-column:1; }
          .article-copy { min-width:0; overflow-wrap:anywhere; }
          .featured-grid { grid-template-columns:1fr; }
          .feature-card--lead { grid-column:auto; }
          .feature-media { min-height:245px; }
          .feature-card--lead .feature-copy, .feature-copy { padding:27px 24px; }
          .deals-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }
          .deals-grid article { min-height:190px; padding:22px 18px; }
          .editorial-gallery { grid-template-columns:1fr; grid-auto-rows:260px; }
          .editorial-gallery figure, .editorial-gallery figure:first-child, .editorial-gallery figure:nth-child(2), .editorial-gallery figure:nth-child(3) { grid-column:auto; grid-row:auto; }
          .breaking-grid { margin-right:12px; margin-left:12px; padding:14px; }
          .breaking-copy { padding:25px 16px; }
          .story-share-row { padding:27px 23px; }
          .edition-navigation { grid-template-columns:1fr; }
          .edition-navigation>div:last-child a { text-align:left; }
        }
        @media (max-width:420px) {
          .deals-grid { grid-template-columns:1fr; }
        }
        @media (max-width:575px) {
          .publication-topline { align-items:flex-start; flex-direction:column; }
          .publication-name { font-size:clamp(28px,8vw,36px); }
          .story-copy-block, .story-standfirst, .story-standfirst>p { max-width:100%; }
          .lead-image figcaption { align-items:flex-start; flex-direction:column; }
        }

        /* Professional long-form blog layout */
        .editorial-page { --navy:#102b3d; --ink:#16232c; --gold:#b98945; --paper:#f4f4ef; --sage:#7f8973; background:#fff; color:var(--ink); }
        .publication-masthead { padding:124px 0 0; background:var(--navy); color:#fff; }
        .publication-topline { align-items:center; padding:17px 0; border-top:1px solid rgba(255,255,255,.16); border-bottom:1px solid rgba(255,255,255,.16); color:rgba(255,255,255,.66); }
        .publication-topline a { display:inline-flex; align-items:center; gap:9px; color:#fff; text-decoration:none; transition:color .2s ease; }
        .publication-topline a:hover { color:#e7bd7c; }
        .publication-topline span { padding:0; border:0; background:transparent; }
        .publication-brand { display:flex; align-items:center; gap:18px; padding:22px 0 20px; border:0; }
        .publication-mark { display:grid; flex:0 0 54px; width:54px; height:54px; place-items:center; border:1px solid rgba(255,255,255,.35); border-radius:0; background:transparent; box-shadow:none; color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:20px; }
        .publication-name { padding:0; color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:28px; font-weight:700; letter-spacing:-.025em; line-height:1; text-align:left; }
        .publication-brand p { margin:5px 0 0; color:rgba(255,255,255,.58); font-size:12px; }
        .publication-bottomline { display:flex; justify-content:flex-start; gap:34px; padding:13px 0; border-top:1px solid rgba(255,255,255,.12); border-bottom:0; }
        .publication-bottomline span { padding:0; background:transparent; color:rgba(255,255,255,.52); }

        .story-lead { padding:80px 0 0; background:var(--paper); }
        .story-lead--without-image { padding-bottom:80px; }
        .story-lead-grid { display:block; }
        .story-copy-block { display:block; max-width:1000px; margin:0 auto; padding:0 30px; border:0; border-radius:0; background:transparent; box-shadow:none; text-align:center; }
        .story-kicker { display:inline-flex; align-items:center; gap:10px; margin:0 0 22px; color:#6c765f; font-size:11px; letter-spacing:.18em; }
        .story-kicker::before, .story-kicker::after { content:''; width:28px; height:1px; background:#aeb5a7; }
        .story-copy-block h1 { max-width:960px; margin:0 auto; color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:clamp(48px,6.5vw,84px); font-weight:700; letter-spacing:-.052em; line-height:1.02; overflow-wrap:anywhere; }
        .story-standfirst>p { display:block; max-width:780px; margin:28px auto 29px; color:#5c676e; font-family:inherit; font-size:18px; font-style:normal; line-height:1.75; white-space:pre-line; }
        .story-byline { justify-content:center; gap:0; margin:0; padding:20px 0 0; border-top:1px solid #d7dad3; color:#707a80; font-size:10px; }
        .story-byline span::after { content:'•'; margin:0 15px; color:#aeb5ad; }
        .lead-image { position:relative; min-height:0; max-width:1320px; margin:58px auto 0; overflow:hidden; border:0; border-radius:0; background:#dfe3dc; box-shadow:0 24px 70px rgba(16,43,61,.13); }
        .lead-image img { display:block; width:100%; height:auto; min-height:0; max-height:none; aspect-ratio:1.85/1; object-fit:cover; }
        .lead-image figcaption { display:flex; position:absolute; right:0; bottom:0; left:0; justify-content:space-between; gap:20px; padding:14px 20px; border:0; border-radius:0; background:linear-gradient(transparent,rgba(8,24,35,.82)); color:rgba(255,255,255,.76); backdrop-filter:none; }

        .article-section { padding:100px 0 110px; background:#fff; }
        .article-layout { display:grid; grid-template-columns:minmax(0,790px) minmax(280px,330px); justify-content:center; gap:80px; align-items:start; }
        .article-copy { min-width:0; grid-column:1; grid-row:1; }
        .article-copy>p { margin:0 0 27px; color:#3f4b53; font-family:Georgia,'Times New Roman',serif; font-size:19px; line-height:1.9; }
        .article-copy>.article-opening::first-letter { float:left; margin:9px 12px 0 0; color:var(--navy); font-family:Georgia,'Times New Roman',serif; font-size:76px; font-weight:700; line-height:.72; }
        .article-copy h2 { position:relative; margin:56px 0 22px; padding:24px 0 0; border-top:3px solid var(--ink); color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:38px; letter-spacing:-.035em; line-height:1.15; }
        .article-copy h2::before { display:none; }
        .article-copy h3 { margin:39px 0 16px; color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:25px; letter-spacing:-.018em; line-height:1.3; }
        .article-copy blockquote { margin:44px 0; padding:35px 38px; border:0; border-left:5px solid var(--gold); border-radius:0; background:#f1f2ed; }
        .article-copy blockquote p { color:var(--navy); font-family:Georgia,'Times New Roman',serif; font-size:clamp(24px,2.8vw,34px); font-style:italic; font-weight:400; line-height:1.42; }
        .article-highlight, .article-alert { margin:38px 0; padding:29px 32px; border:0; border-left:5px solid var(--sage); border-radius:0; background:#edf0e9; }
        .article-alert { border-left-color:var(--gold); background:var(--navy); }
        .article-highlight p, .article-alert p { font-family:Georgia,'Times New Roman',serif; font-size:18px; }
        .article-copy ul { margin:25px 0 34px; }
        .article-copy li { margin-bottom:14px; font-family:Georgia,'Times New Roman',serif; font-size:18px; line-height:1.75; }
        .body-image { margin:44px 0; }
        .body-image img { border-radius:0; }
        .body-image--uploaded { margin-top:48px; }
        .download-edition { min-height:52px; padding:0 24px; border-radius:0; transition:background .2s ease; }
        .download-edition:hover { background:#24465b; color:#fff; }
        .article-tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:42px; padding-top:27px; border-top:1px solid #dfe3de; }
        .article-tags span { padding:8px 12px; border:1px solid #d4dad3; border-radius:0; color:#5f6958; font-size:10px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; }
        .author-card { display:flex; align-items:center; gap:15px; margin-top:30px; padding-top:26px; border-top:1px solid #edf0ec; }
        .author-card>span { display:grid; place-items:center; width:50px; height:50px; border-radius:50%; background:var(--navy); color:#fff; font-size:12px; font-weight:800; }
        .author-card strong, .author-card small { display:block; }
        .author-card strong { color:var(--ink); font-size:14px; }
        .author-card small { margin-top:4px; color:#879088; font-size:11px; }

        .article-aside { position:sticky; top:110px; display:block; grid-column:2; grid-row:1; padding:28px; border:1px solid #dfe3de; border-top:5px solid var(--sage); border-radius:0; background:#fafbf8; color:var(--ink); box-shadow:none; }
        .article-aside>.aside-rule { display:none; }
        .article-aside>.aside-label { display:block; color:var(--ink); }
        .article-aside>dl { display:block; margin-bottom:0; }
        .article-aside dl>div { display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:11px 0; border-color:#dfe3de; }
        .article-aside dt { color:#7b8580; }
        .article-aside dd { color:var(--ink); font-family:inherit; font-size:12px; text-align:right; }
        .aside-label--share { margin:28px 0 13px; }
        .article-aside>.aside-share { display:flex; gap:8px; }
        .aside-share a, .aside-share button { width:41px; height:41px; border:1px solid #d6dcd5; border-radius:50%; background:#fff; color:var(--navy); transition:background .2s ease,color .2s ease,border-color .2s ease; }
        .aside-share a:hover, .aside-share button:hover { border-color:var(--navy); background:var(--navy); color:#fff; }
        .article-aside>.copy-confirmation { display:block; }
        .aside-featured { margin-top:38px; padding-top:31px; border-top:1px solid #dfe3de; }
        .aside-featured>h2 { margin:0 0 19px; color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:26px; font-weight:700; letter-spacing:-.035em; }
        .aside-feature-card { display:grid; grid-template-columns:96px minmax(0,1fr); min-height:94px; margin-bottom:15px; overflow:hidden; border:0; border-radius:0; background:#fff; }
        .aside-feature-card>div { min-height:94px; background:#e7ebe5; }
        .aside-feature-card img { width:100%; height:100%; object-fit:cover; }
        .aside-feature-card>div>i { display:grid; width:100%; height:100%; place-items:center; color:#879078; font-size:25px; }
        .aside-feature-card section { display:flex; min-width:0; flex-direction:column; justify-content:center; padding:11px 13px; }
        .aside-feature-card section span { margin-bottom:6px; color:#737d69; font-size:8px; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }
        .aside-feature-card section h3 { margin:0; color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:14px; font-weight:700; line-height:1.35; }
        .aside-cta { margin-top:31px; padding:28px; border-radius:0; background:var(--navy); color:#fff; }
        .aside-cta>span { display:block; margin-bottom:12px; color:#dfb56f; font-size:9px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
        .aside-cta h2 { margin:0 0 12px; color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:27px; font-weight:700; letter-spacing:-.03em; line-height:1.12; }
        .aside-cta p { margin:0 0 21px; color:rgba(255,255,255,.65); font-size:13px; line-height:1.65; }
        .aside-cta a { display:flex; align-items:center; justify-content:center; min-height:45px; border-radius:0; background:#fff; color:var(--navy); font-size:10px; font-weight:800; letter-spacing:.08em; text-decoration:none; text-transform:uppercase; }

        .newsletter-cta { padding:0 0 100px; background:#fff; }
        .newsletter-cta__inner { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(250px,.75fr) auto; gap:38px; align-items:center; padding:47px 50px; border-radius:0; background:var(--sage); color:#fff; }
        .newsletter-cta__inner span { display:block; margin-bottom:9px; color:rgba(255,255,255,.72); font-size:9px; font-weight:800; letter-spacing:.15em; text-transform:uppercase; }
        .newsletter-cta__inner h2 { margin:0; color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:clamp(30px,3.3vw,45px); font-weight:700; letter-spacing:-.04em; line-height:1.05; }
        .newsletter-cta__inner p { margin:0; color:rgba(255,255,255,.76); font-size:14px; line-height:1.7; }
        .newsletter-cta__inner>a { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:50px; padding:0 22px; border-radius:0; background:#fff; color:#53604d; font-size:10px; font-weight:800; letter-spacing:.07em; text-decoration:none; text-transform:uppercase; white-space:nowrap; }

        .editorial-section { padding:100px 0; }
        .featured-section { background:var(--paper); }
        .section-heading { margin-bottom:40px; padding-bottom:22px; border-bottom:3px solid var(--ink); }
        .section-heading h2 { font-family:Georgia,'Times New Roman',serif; font-size:clamp(40px,4.5vw,58px); }
        .featured-grid { grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px; }
        .feature-card, .feature-card--lead { grid-column:auto; grid-template-columns:1fr; min-height:0; overflow:hidden; border:1px solid #dfe3de; border-top:4px solid var(--sage); border-radius:0; background:#fff; box-shadow:none; }
        .feature-media, .feature-card--lead .feature-media { min-height:240px; }
        .feature-copy, .feature-card--lead .feature-copy { justify-content:flex-start; padding:28px 25px; background:#fff; }
        .feature-card--lead .feature-copy h3, .feature-copy h3 { color:var(--ink); font-family:Georgia,'Times New Roman',serif; font-size:25px; }
        .feature-card--lead .feature-copy>div, .feature-copy>div { color:#657179; font-family:inherit; }
        .feature-media img { transition:transform .35s ease; }
        .feature-card:hover .feature-media img { transform:scale(1.035); }
        .deals-grid article, .story-share-row, .edition-navigation>div, .editorial-gallery figure { border-radius:0; }

        .deals-section { padding:96px 0; }
        .deals-grid { gap:0; border-top:1px solid rgba(255,255,255,.22); border-left:1px solid rgba(255,255,255,.22); }
        .deals-grid article { border-right:1px solid rgba(255,255,255,.22); border-bottom:1px solid rgba(255,255,255,.22); background:transparent; }
        .gallery-section { background:#fff; }
        .breaking-grid { padding:0; border:0; border-radius:0; background:#f3eee5; }
        .breaking-label { border-radius:0; }
        .story-footer { background:var(--paper); }
        .story-share-row { padding:0 0 38px; border-bottom:3px solid var(--ink); background:transparent; box-shadow:none; }
        .edition-navigation { gap:0; border-top:1px solid #cbd0c9; border-left:1px solid #cbd0c9; }
        .edition-navigation>div { border-right:1px solid #cbd0c9; border-bottom:1px solid #cbd0c9; background:transparent; }

        @media (max-width:1199px) {
          .article-layout { grid-template-columns:minmax(0,730px) minmax(260px,300px); gap:48px; }
          .featured-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        }
        @media (max-width:991px) {
          .story-copy-block { max-width:850px; }
          .article-layout { grid-template-columns:minmax(0,1fr); max-width:790px; }
          .article-copy { grid-column:1; grid-row:1; }
          .article-aside { position:static; grid-column:1; grid-row:2; display:grid; grid-template-columns:1fr auto; gap:18px 25px; }
          .article-aside>.aside-label:first-of-type, .article-aside>dl { grid-column:1; }
          .aside-label--share, .article-aside>.aside-share { grid-column:2; }
          .aside-label--share { align-self:end; margin:0; }
          .article-aside>.aside-share { grid-row:2; align-self:start; }
          .article-aside>.copy-confirmation { grid-column:2; }
          .aside-featured, .aside-cta { grid-column:1/-1; }
          .aside-featured { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:15px; }
          .aside-featured>h2 { grid-column:1/-1; }
          .aside-feature-card { margin:0; }
          .newsletter-cta__inner { grid-template-columns:1fr 1fr; }
          .newsletter-cta__inner>a { grid-column:1/-1; width:max-content; }
          .deals-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
        }
        @media (max-width:767px) {
          .publication-masthead { padding-top:112px; }
          .publication-topline { align-items:flex-start; flex-direction:column; gap:9px; }
          .publication-brand { padding:18px 0; }
          .publication-brand p, .publication-bottomline { display:none; }
          .story-lead { padding-top:56px; }
          .story-lead--without-image { padding-bottom:56px; }
          .story-copy-block { padding:0 4px; }
          .story-copy-block h1 { font-size:clamp(42px,12.5vw,61px); line-height:1.05; }
          .story-standfirst>p { font-size:16px; line-height:1.7; }
          .story-byline { align-items:center; flex-direction:column; gap:6px; }
          .story-byline span::after { display:none; }
          .lead-image { margin-top:42px; box-shadow:none; }
          .lead-image img { aspect-ratio:1.15/1; }
          .lead-image figcaption { position:static; align-items:flex-start; flex-direction:column; padding:11px 0; background:transparent; color:#69747a; }
          .article-section { padding:70px 0 78px; }
          .article-copy>p { font-size:17px; line-height:1.82; }
          .article-copy>.article-opening::first-letter { font-size:63px; }
          .article-copy h2 { font-size:31px; }
          .article-copy blockquote { padding:27px 24px; }
          .article-aside { display:block; padding:24px; }
          .article-aside>.aside-label, .article-aside>dl, .article-aside>.aside-share, .article-aside>.copy-confirmation { display:block; }
          .article-aside>.aside-share { display:flex; }
          .aside-label--share { margin-top:26px; }
          .aside-featured { display:block; }
          .aside-feature-card { grid-template-columns:105px minmax(0,1fr); margin-bottom:13px; }
          .newsletter-cta { padding-bottom:72px; }
          .newsletter-cta__inner { grid-template-columns:1fr; gap:21px; padding:34px 27px; }
          .newsletter-cta__inner>a { grid-column:auto; width:100%; }
          .featured-grid { grid-template-columns:1fr; }
          .deals-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .editorial-section, .deals-section, .breaking-section { padding:72px 0; }
        }
        @media (max-width:420px) {
          .publication-mark { flex-basis:46px; width:46px; height:46px; }
          .publication-name { font-size:24px; }
          .story-copy-block h1 { font-size:39px; }
          .story-kicker::before, .story-kicker::after { width:18px; }
          .lead-image img { aspect-ratio:1/1; }
          .deals-grid { grid-template-columns:1fr; }
        }

        /* Clean commercial-property insight layout */
        .editorial-page { --navy:#102f40; --ink:#172a36; --gold:#b47c2c; --paper:#f5f6f2; --line:#dfe3de; background:#fff; font-family:var(--site-font-family),Arial,sans-serif; }
        .publication-masthead { padding:122px 0 18px; background:var(--navy); }
        .publication-masthead>.container, .story-lead-grid { width:min(1320px,calc(100% - 48px)); max-width:none; margin-right:auto; margin-left:auto; padding-right:0; padding-left:0; }
        .publication-topline { padding:0; border:0; color:rgba(255,255,255,.7); font-size:10px; }
        .publication-topline a { color:#fff; }
        .publication-topline span { color:rgba(255,255,255,.68); }

        .story-lead { padding:78px 0 0; background:#fff; }
        .story-lead--without-image { padding-bottom:78px; }
        .story-copy-block { max-width:1050px; margin:0; padding:0; text-align:left; }
        .story-kicker { display:block; margin:0 0 20px; color:var(--gold); font-size:11px; letter-spacing:.16em; }
        .story-kicker::before, .story-kicker::after { display:none; }
        .story-copy-block h1 { max-width:1000px; margin:0; font-family:inherit; font-size:clamp(48px,5.7vw,76px); font-weight:700; letter-spacing:-.052em; line-height:1.04; }
        .story-standfirst>p { display:-webkit-box; max-width:800px; overflow:hidden; margin:27px 0 0; color:#53636d; font-size:clamp(18px,1.7vw,22px); line-height:1.65; white-space:normal; -webkit-box-orient:vertical; -webkit-line-clamp:3; }
        .story-byline { justify-content:flex-start; width:min(100%,800px); margin:30px 0 0; padding:20px 0 0; border-top:1px solid var(--line); color:#6e7a82; font-size:10px; }
        .lead-image { max-width:1320px; margin:58px auto 0; border-radius:0; background:#e6e9e4; box-shadow:none; }
        .lead-image img { aspect-ratio:2/1; }
        .lead-image figcaption { position:static; padding:12px 0; border-bottom:1px solid var(--line); background:#fff; color:#748087; }

        .article-section { padding:76px 0 105px; }
        .article-layout { display:block; max-width:920px; margin:0 auto; }
        .article-aside { position:static; display:flex; align-items:center; justify-content:space-between; gap:30px; width:100%; margin:0 auto 58px; padding:19px 0; border:0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:#fff; }
        .article-aside>.aside-rule, .article-aside>.aside-label { display:none; }
        .article-aside>dl { display:flex; flex:1; flex-wrap:wrap; gap:12px 36px; margin:0; }
        .article-aside dl>div { display:block; padding:0; border:0; }
        .article-aside dt { margin:0 0 4px; color:#919a9f; font-size:9px; }
        .article-aside dd { color:var(--ink); font-size:12px; text-align:left; }
        .article-aside>.aside-share { display:flex; flex:0 0 auto; gap:8px; }
        .aside-share a, .aside-share button { width:39px; height:39px; border:1px solid var(--line); border-radius:50%; background:#fff; color:var(--navy); }
        .article-aside>.copy-confirmation { flex:0 0 auto; margin:0; }
        .aside-featured, .aside-cta { display:none; }

        .article-copy { max-width:780px; margin:0 auto; }
        .article-copy>p { margin-bottom:25px; color:#3e4f59; font-family:inherit; font-size:18px; line-height:1.86; }
        .article-copy>.article-opening::first-letter { float:none; margin:0; color:inherit; font:inherit; line-height:inherit; }
        .article-copy h2 { margin:54px 0 21px; padding:0; border:0; font-family:inherit; font-size:clamp(30px,3vw,39px); font-weight:700; letter-spacing:-.035em; line-height:1.18; }
        .article-copy h3 { margin:38px 0 15px; font-family:inherit; font-size:23px; font-weight:700; }
        .article-copy blockquote { margin:42px 0; padding:30px 32px; border:0; border-left:4px solid var(--gold); background:var(--paper); }
        .article-copy blockquote p { font-family:inherit; font-size:clamp(22px,2.5vw,29px); font-style:normal; font-weight:600; line-height:1.45; }
        .article-highlight, .article-alert { padding:27px 29px; border-left-width:4px; }
        .article-highlight p, .article-alert p, .article-copy li { font-family:inherit; }
        .body-image { margin:42px 0; }
        .author-card { margin-top:34px; }

        .newsletter-cta { padding:0 0 90px; }
        .newsletter-cta__inner { grid-template-columns:minmax(0,1fr) minmax(260px,.65fr) auto; padding:42px 46px; background:var(--navy); }
        .newsletter-cta__inner h2 { font-family:inherit; font-size:clamp(29px,3vw,42px); }
        .newsletter-cta__inner>a { color:var(--navy); }

        .editorial-section { padding:86px 0 96px; }
        .featured-section { background:var(--paper); }
        .section-heading { align-items:end; margin-bottom:34px; padding:0 0 20px; border-bottom:1px solid #cdd3cd; }
        .section-heading h2 { font-family:inherit; font-size:clamp(36px,4vw,50px); }
        .featured-grid { grid-template-columns:repeat(3,minmax(0,1fr)); gap:26px; }
        .feature-card, .feature-card--lead { border:0; border-radius:0; background:transparent; }
        .feature-media, .feature-card--lead .feature-media { min-height:245px; background:#e3e7e1; }
        .feature-media>span { display:none; }
        .feature-copy, .feature-card--lead .feature-copy { padding:22px 0 0; background:transparent; }
        .feature-card--lead .feature-copy h3, .feature-copy h3 { margin-bottom:11px; font-family:inherit; font-size:23px; line-height:1.25; }
        .feature-copy>div, .feature-card--lead .feature-copy>div { display:-webkit-box; overflow:hidden; color:#68757d; font-size:14px; line-height:1.65; -webkit-box-orient:vertical; -webkit-line-clamp:3; }
        .feature-copy a { margin-top:18px; color:var(--navy); }

        .deals-section { padding:84px 0 92px; background:#fff; color:var(--ink); }
        .deals-heading { border-color:var(--line); }
        .deals-heading h2 { color:var(--ink); font-family:inherit; }
        .deals-grid { grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; border:0; }
        .deals-grid article { min-height:190px; padding:25px; border:1px solid var(--line); background:var(--paper); }
        .deals-grid article>span { color:#a7afb2; }
        .deals-grid i { margin-bottom:32px; color:var(--gold); }
        .deals-grid p { color:var(--gold); }
        .deals-grid h3 { color:var(--ink); font-family:inherit; }
        .deals-grid small { color:#758087; }

        .gallery-section { padding-top:86px; background:var(--paper); }
        .editorial-gallery { gap:16px; }
        .editorial-gallery figure { background:#e3e7e1; }
        .breaking-section { padding:88px 0; }
        .breaking-grid { grid-template-columns:190px minmax(0,760px); background:#f6f1e8; }
        .breaking-label { padding:25px; background:#a85a3d; font-size:31px; }
        .breaking-copy h2 { font-family:inherit; }
        .breaking-copy>div { font-family:inherit; }

        .story-footer { padding:72px 0 84px; background:#fff; }
        .story-share-row { padding:0 0 32px; border-bottom:1px solid var(--line); }
        .story-share-row h2 { font-family:inherit; font-size:clamp(32px,3.5vw,45px); }
        .edition-navigation { border:0; border-top:1px solid var(--line); }
        .edition-navigation>div { border:0; border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
        .edition-navigation>div:first-child { border-left:1px solid var(--line); }
        .edition-navigation strong { font-family:inherit; }

        .pdf-edition-section { padding:70px 0 100px; background:#e9eee8; }
        .pdf-edition-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:30px; margin-bottom:28px; padding:28px 32px; border-left:6px solid var(--gold); background:#fff; box-shadow:0 18px 42px rgba(13,36,53,.08); }
        .pdf-edition-heading p { margin:0 0 8px; color:var(--gold); font-size:10px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; }
        .pdf-edition-heading h2 { margin:0; color:var(--navy); font-size:clamp(29px,3.4vw,46px); font-weight:750; letter-spacing:-.04em; line-height:1.05; }
        .pdf-edition-heading span { display:block; margin-top:10px; color:#66737b; font-size:14px; }
        .pdf-edition-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:10px; }
        .pdf-edition-actions a { display:inline-flex; align-items:center; justify-content:center; gap:9px; min-height:48px; padding:0 18px; background:var(--navy); color:#fff; font-size:11px; font-weight:800; letter-spacing:.08em; text-decoration:none; text-transform:uppercase; }
        .pdf-edition-actions a:last-child { background:var(--sage); }
        .pdf-edition-viewer { position:relative; min-height:78vh; overflow:hidden; border:1px solid #ccd4cc; background:#3d4448; box-shadow:0 28px 65px rgba(13,36,53,.18); }
        .pdf-edition-viewer iframe { position:relative; z-index:1; display:block; width:100%; height:78vh; min-height:720px; border:0; background:#fff; }
        .pdf-edition-fallback { position:absolute; inset:0; display:grid; align-content:center; justify-items:center; gap:12px; padding:30px; color:#fff; text-align:center; }
        .pdf-edition-fallback i { font-size:54px; }
        .pdf-edition-fallback p { max-width:450px; margin:0; color:rgba(255,255,255,.72); }
        .pdf-edition-fallback a { padding:11px 18px; background:#fff; color:var(--navy); font-size:11px; font-weight:800; text-decoration:none; text-transform:uppercase; }

        @media (max-width:991px) {
          .story-copy-block { max-width:850px; }
          .article-layout { max-width:820px; }
          .article-aside { display:flex; }
          .aside-featured, .aside-cta { display:none; }
          .newsletter-cta__inner { grid-template-columns:1fr 1fr; }
          .newsletter-cta__inner>a { grid-column:1/-1; }
          .featured-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .deals-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        }
        @media (max-width:767px) {
          .pdf-edition-section { padding:45px 0 70px; }
          .pdf-edition-heading { align-items:flex-start; flex-direction:column; padding:24px 22px; }
          .pdf-edition-actions { width:100%; justify-content:stretch; }
          .pdf-edition-actions a { flex:1 1 170px; }
          .pdf-edition-viewer, .pdf-edition-viewer iframe { min-height:600px; height:72vh; }
          .publication-masthead { padding:110px 0 17px; }
          .publication-topline { flex-direction:row; }
          .story-lead { padding-top:52px; }
          .story-lead--without-image { padding-bottom:52px; }
          .story-copy-block h1 { font-size:clamp(40px,12vw,56px); }
          .story-standfirst>p { font-size:17px; }
          .story-byline { align-items:flex-start; flex-direction:row; }
          .story-byline span::after { display:inline; }
          .lead-image { margin-top:40px; }
          .lead-image img { aspect-ratio:1.25/1; }
          .lead-image figcaption { padding:10px 0; }
          .article-section { padding:58px 0 74px; }
          .article-aside { display:block; margin-bottom:45px; padding:18px 0; }
          .article-aside>dl { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
          .article-aside>dl>div:last-child { grid-column:1/-1; }
          .article-aside>.aside-share { display:flex; margin-top:20px; }
          .article-copy>p { font-size:17px; line-height:1.8; }
          .newsletter-cta__inner { grid-template-columns:1fr; padding:32px 26px; }
          .newsletter-cta__inner>a { grid-column:auto; }
          .featured-grid, .deals-grid { grid-template-columns:1fr; }
          .feature-media, .feature-card--lead .feature-media { min-height:260px; }
          .breaking-grid { grid-template-columns:1fr; }
          .breaking-label { width:100%; text-align:left; }
          .story-share-row { align-items:flex-start; }
        }
        @media (max-width:420px) {
          .publication-topline { align-items:flex-start; flex-direction:column; }
          .story-copy-block h1 { font-size:38px; }
          .story-byline { flex-direction:column; }
          .story-byline span::after { display:none; }
        }
      `}</style>
    </>
  );
}

const statusStyles = `
  .newsletter-status-page { display:grid; min-height:78vh; padding:150px 24px 80px; place-items:center; background:#f5f2e9; }
  .newsletter-loader { width:min(620px,100%); padding:50px; border-top:6px solid #b8893f; background:#fff; text-align:center; }
  .newsletter-loader>span { display:inline-block; width:38px; height:38px; margin-bottom:20px; border:3px solid #d8d8d2; border-top-color:#102536; border-radius:50%; animation:newsletter-spin .8s linear infinite; }
  .newsletter-loader>i { display:block; margin-bottom:18px; color:#b8893f; font-size:40px; }
  .newsletter-loader h1 { margin:0 0 10px; color:#102536; font-family:Georgia,'Times New Roman',serif; font-size:34px; }
  .newsletter-loader p { margin:0; color:#66737b; }
  .newsletter-loader>div { display:flex; justify-content:center; gap:10px; margin-top:25px; }
  .newsletter-loader button, .newsletter-loader a { display:inline-flex; align-items:center; min-height:46px; padding:0 20px; border:0; background:#102536; color:#fff; font-size:11px; font-weight:800; letter-spacing:.08em; text-decoration:none; text-transform:uppercase; }
  .newsletter-loader a { background:#879078; }
  @keyframes newsletter-spin { to { transform:rotate(360deg); } }
`;
