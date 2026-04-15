import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── Real Framer components ──
import BrandHeader    from '../framer/brand-header'
import HeadingTitle   from '../framer/heading-title'
import Button         from '../framer/button'
import FeaturedWorkCard from '../components/FeaturedWorkCard'
import ImageSlideshow from '../framer/image-slideshow'
import ImagesLeft     from '../framer/images-left'
import ImagesRight    from '../framer/images-right'

import { works } from '../data/works'

// Featured: first 4 works that have content
const featured = works.slice(0, 4)
const slideshowItems = works.slice(0, 6)


export default function Home() {
  // Track scroll progress through the hero section
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Fades in in sync with the rise; hits 1 when the block is centered (50% scroll). Wider ramp than [0,0,1] so letters aren’t stuck at opacity 0.
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1])
  // Centered in the sticky 100vh when y = 0 — reaches that at 50% of hero scroll, then holds
  const heroTextY = useTransform(scrollYProgress, [0, 0.5, 1], ['100vh', '0vh', '0vh'])
  // Panels clear before the headline fades in / finishes rising
  const heroLeftX = useTransform(scrollYProgress, [0, 0.36, 1], ['0%', '-100%', '-100%'])
  const heroRightX = useTransform(scrollYProgress, [0, 0.36, 1], ['0%', '100%', '100%'])
  // body uses white text; this block sits on zinc-200 — force dark foreground so Framer + spans aren’t stuck with inherited white
  const heroForeground = 'var(--zinc-950)'
  const heroSubtitleStyle = { color: heroForeground }
  const sectionStyle = { backgroundColor: 'var(--color-black)', position: 'relative' }

  return (
    <main style={{ backgroundColor: 'var(--color-black)' }}>

      {/* ══════════════════════════════════════════════════════
          HERO — 240vh gives enough scroll distance so images can exit, then the headline
          can travel from +100vh → 0 (visually centered on the zinc background) while opacity
          ramps 0 → 1 only in the last part of that motion (not while it’s still low on screen).
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '240vh',
          backgroundColor: 'var(--zinc-200)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Sticky container — pinned for the full hero scroll */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          {/* ── Image layer — Framer internals use their own z-index; keep this below the headline (see text z-index). */}
          <motion.div
            className="hero-images"
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              display: 'flex',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            <motion.div style={{ flex: 1, height: '100%', minWidth: 0, x: heroLeftX }}>
              <ImagesLeft style={{ width: '100%', height: '100%' }} />
            </motion.div>
            <motion.div style={{ flex: 1, height: '100%', minWidth: 0, x: heroRightX }}>
              <ImagesRight style={{ width: '100%', height: '100%' }} />
            </motion.div>
          </motion.div>

          {/* ── Text overlay — must sit above Framer image layers (they create nested stacking contexts). */}
          <motion.div
            className="hero-text-block"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              textAlign: 'center',
              color: heroForeground,
              opacity: heroTextOpacity,
              y: heroTextY,
            }}
          >
            <BrandHeader
              brandName="Odinakachi Odibo"
              style={{
                width: '100%',
                maxWidth: 1200,
                color: heroForeground,
                // Framer RichText / presets read this token; avoids white-on-zinc from body inheritance
                ['--framer-text-color']: heroForeground,
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '32px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span className="text-h5" style={heroSubtitleStyle}>
                Model Portfolio
              </span>
              <span className="text-h5" style={heroSubtitleStyle}>
                Born from a love of beauty — built for the brand
              </span>
            </div>
          </motion.div>

          {/* ── Scroll indicator (absolute bottom of sticky container) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 32,
                height: 48,
                border: '1.5px solid rgba(0,0,0,0.3)',
                borderRadius: 999,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '6px 0',
              }}
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                style={{
                  width: 4,
                  height: 8,
                  backgroundColor: 'var(--color-black)',
                  borderRadius: 999,
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED WORKS — native <img> cards (see FeaturedWorkCard.jsx)
      ══════════════════════════════════════════════════════ */}
      <section className="featured-works-section" style={sectionStyle}>
        <div className="section-inner featured-works-inner">
          <div className="featured-works-heading">
            <HeadingTitle title="Portfolio" color="rgb(228, 228, 231)"  />
          </div>

          <div className="works-grid">
            {featured.map((work, index) => (
              <motion.div
                key={work.slug}
                className="works-grid-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
              >
                <Link className="works-card-link" to={`/projects/${work.slug}`}>
                  <FeaturedWorkCard
                    title={work.title}
                    mainImage={work.mainImage}
                    hoverImage={work.hoverImage}
                    fetchPriorityHigh={index < 2}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="featured-works-cta">
            <Button
              className="featured-works-see-more-btn"
              title="See More"
              link="/projects"
              variant="Primary"
            />
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO WE ARE — sticky title + body text, matching
          the Framer AboutSection layout
      ══════════════════════════════════════════════════════ */}
      <section style={sectionStyle}>
        <div className="section-inner">
          <div className="about-row">
            <div style={{ flex: '0 0 auto' }}>
              <HeadingTitle title="About Me" color="rgb(255, 255, 255)" />
            </div>
            <div style={{ flex: '1 1 360px', maxWidth: 420 }}>
              <p
                className="text-body"
                style={{ color: 'var(--zinc-400)', marginBottom: 5, lineHeight: 1.8 }}
              >
                My name is Odinakachi Odibo. I am a Chicago-based commercial, editorial, and print model.
                <p>I have always had love for beauty and taking pictures, which poured into my desire for modeling,
                as well as advice from friends and strangers.</p>
                My goal as a model is to work in diverse roles which allow me portray products, experiences 
                and represent brands through my unique personality and features. I am looking to grow and learn more 
                with every experience, show up professionally and work diligently.
              </p>
              <div className="measurements-btn-wrap" style={{ marginBottom: 10, display: 'flex', justifyContent: 'end', width: "100%", zIndex: "2"}}>
                <Button title="Click to see measurements" link="/about" variant="Secondary" />
              </div>
          </div>
          <div className="featured-works-cta" style={{ marginBottom: 10 }}>
              <Button className="featured-works-see-more-btn" title="Let's Talk" link="/contact" variant="Primary" />
            </div>
            {slideshowItems.length >= 6 && (
          <div style={{ width: '100%', overflow: 'hidden', paddingBottom: 0 }}>
            <ImageSlideshow
              image1={{ src: slideshowItems[0].mainImage, alt: slideshowItems[0].title }}
              image2={{ src: slideshowItems[1].mainImage, alt: slideshowItems[1].title }}
              image3={{ src: slideshowItems[2].mainImage, alt: slideshowItems[2].title }}
              image4={{ src: slideshowItems[3].mainImage, alt: slideshowItems[3].title }}
              image5={{ src: slideshowItems[4].mainImage, alt: slideshowItems[4].title }}
              image6={{ src: slideshowItems[5].mainImage, alt: slideshowItems[5].title }}
              style={{ width: '100%', height: 220 }}
            />
          </div>
        )}     
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA + IMAGE SLIDESHOW
      ══════════════════════════════════════════════════════ */}
        {/* Full-width slideshow strip — no section-inner padding so it bleeds edge to edge */}
        
 

      {/* ── Shared layout styles ── */}
      <style>{`
        /* Light hero: body is still default white text — force dark type for Framer headline */
        .hero-text-block h1,
        .hero-text-block .framer-styles-preset-jehuhb {
          color: var(--zinc-950) !important;
        }

        /* Section inner padding — 100px desktop, 24px mobile */
        .section-inner {
          padding: 100px;
        }

        /* Featured Works: heading + grid share the same padded column */
        .featured-works-inner {
          width: 100%;
          max-width: var(--container-max-width, 1200px);
          margin-left: auto;
          margin-right: auto;
        }

        .featured-works-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-bottom: 28px;
          text-align: center;
        }

        .featured-works-kicker {
          color: var(--zinc-400);
          margin-bottom: 10px;
        }

        .featured-works-cta {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /*
          Framer Primary defaults to black label + icon on a clear “pill” — invisible on black.
          Force a light outline button; hover inverts to light fill + dark text.
        */
        .featured-works-cta .featured-works-see-more-btn {
          opacity: 1 !important;
          transform: translate3d(0, 0, 0) !important;
          color: rgb(228, 228, 231) !important;
          background-color: transparent !important;
          border: 1px solid rgb(228, 228, 231) !important;
          border-radius: 22px !important;
          padding: 0px 24px !important;
        }

        .featured-works-cta .featured-works-see-more-btn .framer-1nhvh8k {
          display: none !important;
        }

        .featured-works-cta .featured-works-see-more-btn p,
        .featured-works-cta .featured-works-see-more-btn .framer-styles-preset-1lbraru {
          --framer-text-color: rgb(228, 228, 231) !important;
          color: rgb(228, 228, 231) !important;
        }

        .featured-works-cta .featured-works-see-more-btn svg {
          color: rgb(228, 228, 231) !important;
        }

        .featured-works-cta .featured-works-see-more-btn:hover {
          padding: 0px 24px !important;
          background-color: rgb(228, 228, 231) !important;
          color: var(--zinc-950) !important;
          border-color: rgb(228, 228, 231) !important;
        }

        .featured-works-cta .featured-works-see-more-btn:hover p,
        .featured-works-cta .featured-works-see-more-btn:hover .framer-styles-preset-1lbraru {
          --framer-text-color: var(--zinc-950) !important;
          color: var(--zinc-950) !important;
        }

        .featured-works-cta .featured-works-see-more-btn:hover svg {
          color: var(--zinc-950) !important;
        }

        .works-card-link {
          display: block;
          width: 100%;
          min-width: 0;
          text-decoration: none;
          color: inherit;
        }

        /* Native-image FeaturedWorkCard (no Framer lazy viewport) */
        .featured-work-card {
          width: 100%;
          min-width: 0;
        }

        .featured-work-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 4px;
          background-color: var(--zinc-800);
        }

        .featured-work-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .featured-work-card__img--hover {
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .works-card-link:hover .featured-work-card__img--hover {
          opacity: 1;
        }

        .featured-work-card__title {
          color: rgb(228, 228, 231);
          margin-top: 20px;
          padding: 0 4px;
        }

        /* 2-column works grid — matches Framer's ProjectsCms grid */
        .works-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: start;
          gap: 40px;
          margin-bottom: 0;
          width: 100%;
        }

        .works-grid-item {
          min-width: 0;
        }

        /* About section: side-by-side title + text */
        .about-row {
          display: flex;
          flex-wrap: wrap;
          gap: 80px;
          justify-content: space-between;
          align-items: flex-start;
        }

        /* Zinc-800 section divider line */
        .divider {
          width: 100%;
          height: 1px;
          background-color: var(--zinc-800);
        }

        /* ── Mobile breakpoint ── */
        @media (max-width: 768px) {
        .hero-images {
            flex-direction: column;
          }
          .section-inner {
            padding: 60px 24px;
          }
          .featured-works-heading {
            margin-bottom: 24px;
          }
          .featured-works-cta {
            margin-top: 48px;
          }
          .works-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .about-row {
            flex-direction: column;
            gap: 32px;
          }
        }

        /* Measurements button: balanced padding, no icon, always visible */
        .measurements-btn-wrap .framer-z2sxfz,
        .measurements-btn-wrap .framer-z2sxfz.hover {
          padding: 0px 24px !important;
          opacity: 1 !important;
        }
        .measurements-btn-wrap .framer-1nhvh8k {
          display: none !important;
        }

        /* ── Tablet breakpoint ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .section-inner {
            padding: 80px 48px;
          }
          .works-grid {
            gap: 32px;
          }
        }
      `}</style>
    </main>
  )
}
