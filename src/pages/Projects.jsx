import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { works } from '../data/works'

const CATEGORIES = ['All', 'Commercial', 'Editorial']

// Stable shuffle seeded by category so order is consistent per tab but varied
function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const SEEDS = { All: 42, Commercial: 7, Editorial: 13 }

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    const list = active === 'All' ? works : works.filter((w) => w.category === active)
    return seededShuffle(list, SEEDS[active] ?? 1)
  }, [active])

  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 100 }}>

      {/* ── Hero header ── */}
      <div className="portfolio-header">
        <div className="portfolio-header__inner">
          <p className="portfolio-kicker">Model Portfolio</p>
          <h1 className="portfolio-title">Selected Works</h1>
          <p className="portfolio-subtitle">
            Commercial, editorial, and print — a curated look at work across campaigns, beauty, and brand.
          </p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="portfolio-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`portfolio-filter-btn${active === cat ? ' active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="portfolio-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {filtered.map((work, i) => (
            <motion.div
              key={work.slug}
              className="portfolio-grid__item"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <Link to={`/projects/${work.slug}`} className="portfolio-card-link">
                <article className="portfolio-card">
                  <div className="portfolio-card__media">
                    <img
                      className="portfolio-card__img portfolio-card__img--base"
                      src={work.mainImage}
                      alt={work.title}
                      loading={i < 6 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                    {work.hoverImage && (
                      <img
                        className="portfolio-card__img portfolio-card__img--hover"
                        src={work.hoverImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="portfolio-card__meta">
                    <h3 className="portfolio-card__title">{work.title}</h3>
                    {work.category && (
                      <span className="portfolio-card__category">{work.category}</span>
                    )}
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .portfolio-header {
          border-bottom: 1px solid var(--zinc-800);
          padding: 60px 100px 64px;
        }
        .portfolio-header__inner {
          max-width: 640px;
        }
        .portfolio-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--zinc-500);
          margin: 0 0 16px;
        }
        .portfolio-title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 500;
          color: rgb(228, 228, 231);
          margin: 0 0 20px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .portfolio-subtitle {
          font-size: 15px;
          color: var(--zinc-500);
          line-height: 1.7;
          margin: 0;
          max-width: 420px;
        }

        .portfolio-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          padding: 32px 100px;
          border-bottom: 1px solid var(--zinc-800);
        }
        .portfolio-filter-btn {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid var(--zinc-700);
          background: transparent;
          color: var(--zinc-400);
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .portfolio-filter-btn.active,
        .portfolio-filter-btn:hover {
          border-color: rgb(228, 228, 231);
          background: rgb(228, 228, 231);
          color: var(--color-black);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2px;
          padding: 2px;
        }

        .portfolio-grid__item { min-width: 0; }

        .portfolio-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .portfolio-card { width: 100%; }

        .portfolio-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background-color: var(--zinc-900);
        }

        .portfolio-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .portfolio-card__img--hover {
          opacity: 0;
          transition: opacity 0.35s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .portfolio-card-link:hover .portfolio-card__img--base {
          transform: scale(1.04);
        }

        .portfolio-card-link:hover .portfolio-card__img--hover {
          opacity: 1;
          transform: scale(1.04);
        }

        .portfolio-card__meta {
          padding: 14px 16px 20px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
        }

        .portfolio-card__title {
          font-size: 13px;
          font-weight: 400;
          color: rgb(228, 228, 231);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .portfolio-card__category {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--zinc-600);
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .portfolio-header,
          .portfolio-filters {
            padding-left: 24px;
            padding-right: 24px;
          }
          .portfolio-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .portfolio-header {
            padding-top: 40px;
            padding-bottom: 40px;
          }
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
