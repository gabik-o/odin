import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeadingTitle from '../framer/heading-title'
import { getWorkBySlug, works } from '../data/works'

export default function ProjectDetail() {
  const { slug } = useParams()
  const work = getWorkBySlug(slug)

  if (!work) return <Navigate to="/404" replace />

  const currentIndex = works.findIndex((w) => w.slug === slug)
  const next = works[(currentIndex + 1) % works.length]
  const prev = works[(currentIndex - 1 + works.length) % works.length]

  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 100 }}>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="detail-hero"
      >
        <motion.img
          src={work.mainImage}
          alt={work.title}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.div>

      {/* Project info */}
      <div
        style={{
          padding: '50px 100px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 40,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--zinc-800)',
        }}
        className="detail-pad"
      >
        <motion.div
          className="detail-title-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeadingTitle title={work.title} color="rgb(255, 255, 255)" />
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 200 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Studio', value: work.studio },
            { label: 'Photographer',  value: work.photographer },
            { label: 'Creative Director',      value: work.creativeDirector },
            { label: 'Stylist',    value: work.stylist },
            {label: 'MUA', value: work.mua},
            {label: "Other Model", value: work.otherModel}
          ]
            .filter((m) => m.value)
            .map((meta) => (
              <div key={meta.label}>
                <p className="text-h6-sm" style={{ color: 'var(--zinc-600)', marginBottom: 4 }}>
                  {meta.label}
                </p>
                <p className="text-body-sm" style={{ color: 'var(--zinc-300)' }}>
                  {meta.value}
                </p>
              </div>
            ))}
        </motion.div>
      </div>

      {/* Content */}
      {/* {work.content && (
        <div style={{ padding: '80px 100px', maxWidth: 760 }} className="detail-pad">
          <motion.div
            className="text-body-lg"
            style={{ color: 'var(--zinc-300)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            dangerouslySetInnerHTML={{ __html: work.content }}
          />
        </div>
      )} */}

      {/* Gallery */}
      {work.images.length > 0 && (
        <div
          style={{
            marginTop: '40px',
            padding: '0 100px 100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 20,
          }}
          className="detail-pad detail-gallery"
        >
          {work.images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                backgroundColor: 'var(--zinc-900)',
              }}
            >
              <img
                src={src}
                alt={`${work.title} ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="detail-nav detail-pad">
        <Link to={`/projects/${prev.slug}`} className="detail-nav__card detail-nav__card--prev">
          <p className="detail-nav__label">← Previous</p>
          <div className="next-card">
            <div className="next-card__media">
              <img className="next-card__img next-card__img--base" src={prev.mainImage} alt={prev.title} loading="lazy" draggable={false} />
              {prev.hoverImage && (
                <img className="next-card__img next-card__img--hover" src={prev.hoverImage} alt="" loading="lazy" draggable={false} />
              )}
            </div>
            <p className="next-card__title">{prev.title}</p>
          </div>
        </Link>

        <Link to={`/projects/${next.slug}`} className="detail-nav__card detail-nav__card--next">
          <p className="detail-nav__label">Next →</p>
          <div className="next-card">
            <div className="next-card__media">
              <img className="next-card__img next-card__img--base" src={next.mainImage} alt={next.title} loading="lazy" draggable={false} />
              {next.hoverImage && (
                <img className="next-card__img next-card__img--hover" src={next.hoverImage} alt="" loading="lazy" draggable={false} />
              )}
            </div>
            <p className="next-card__title">{next.title}</p>
          </div>
        </Link>
      </div>

      <style>{`
        .detail-title-wrap {
          width: 100%;
          min-width: 0;
        }

        /* Allow HeadingTitle internals to shrink and wrap */
        .detail-title-wrap > div,
        .detail-title-wrap .framer-QR360 {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }

        .detail-nav {
          border-top: 1px solid var(--zinc-800);
          padding-top: 80px;
          padding-bottom: 80px;
          display: flex;
          justify-content: space-around;
          gap: 40px;
        }

        .detail-nav__card {
          display: block;
          text-decoration: none;
          width: 220px;
          flex-shrink: 0;
        }

        .detail-nav__card .next-card__media {
          margin: 0 4px;
        }

        .detail-nav__card--next {
          text-align: right;
        }

        .detail-nav__label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--zinc-600);
          margin: 0 0 16px;
        }

        @media (max-width: 768px) {
          .detail-nav {
            flex-direction: column;
            gap: 48px;
          }
          .detail-nav__card,
          .detail-nav__card--next {
            width: 100%;
            text-align: left;
          }
        }

        .next-card-link {
          display: block;
          text-decoration: none;
          width: 240px;
        }

        .next-card { width: 100%; }

        .next-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background-color: var(--zinc-900);
          border-radius: 4px;
        }

        .next-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .next-card__img--hover {
          opacity: 0;
          transition: opacity 0.35s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .next-card-link:hover .next-card__img--base { transform: scale(1.04); }
        .next-card-link:hover .next-card__img--hover { opacity: 1; transform: scale(1.04); }

        .next-card__title {
          font-family: "JetBrains Mono", monospace;
          font-size: 16px;
          font-weight: 500;
          color: rgb(228, 228, 231);
          margin: 14px 0 0;
          letter-spacing: -0.02em;
          line-height: 1.2em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .next-card-link { width: 100%; }
        }

        @media (max-width: 768px) {
          .detail-title-wrap h2,
          .detail-title-wrap .framer-styles-preset-f8fm9t {
            font-size: clamp(24px, 7vw, 44px) !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            line-height: 1.1 !important;
          }
        }

        .detail-hero {
          width: 40%;
          margin: 0 auto;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .detail-hero {
            width: 100%;
          }
          .detail-gallery {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          }
          .detail-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .detail-pad h1,
          .detail-pad .framer-styles-preset-19wksx {
            font-size: clamp(22px, 6vw, 40px) !important;
            word-break: break-word;
          }
        }
      `}</style>
    </main>
  )
}
