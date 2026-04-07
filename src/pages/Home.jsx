import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

// ── Real Framer components ──
import BrandHeader    from '../framer/brand-header'
import HeadingTitle   from '../framer/heading-title'
import Button         from '../framer/button'
import ProjectCard    from '../framer/project-card'
import ImageSlideshow from '../framer/image-slideshow'
import ImagesLeft     from '../framer/images-left'
import ImagesRight    from '../framer/images-right'

import { works } from '../data/works'

// Featured: first 4 works that have content
const featured = works.filter((w) => w.content).slice(0, 4)
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
          FEATURED WORKS
          2-column grid matching Framer's ProjectsCms grid.
          Cards get an explicit aspect-ratio so the browser
          knows their size before images load (fixes the long
          lazy-load delay caused by zero-height containers).
      ══════════════════════════════════════════════════════ */}
      <section style={sectionStyle}>
        <div className="section-inner">
          <div style={{ marginBottom: 60 }}>
            <HeadingTitle title="Featured Works" color="rgb(228, 228, 231)" />
          </div>

          <div className="works-grid">
            {featured.map((work) => (
              <Link
                key={work.slug}
                to={`/projects/${work.slug}`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                {/*
                  Explicit aspect-ratio wrapper: without a known height the
                  browser treats the card as offscreen and delays image fetching.
                  4/5 matches the Framer ProjectCard's native ratio.
                */}
                <div style={{ width: '100%', aspectRatio: '4 / 5' }}>
                  <ProjectCard
                    title={work.title}
                    image={{ src: work.mainImage, alt: work.title }}
                    hoverImage={{ src: work.hoverImage, alt: work.title }}
                    style={{ width: '100%' }}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
            <Button title="More Works" link="/projects" variant="Primary" icon="ArrowRight" />
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
              <HeadingTitle title="Who We Are" color="rgb(255, 255, 255)" />
            </div>
            <div style={{ flex: '1 1 360px', maxWidth: 420 }}>
              <p
                className="text-body"
                style={{ color: 'var(--zinc-400)', marginBottom: 40, lineHeight: 1.8 }}
              >
                At Pure Visuals, we are a team of passionate creatives dedicated to
                crafting striking visual narratives. Specializing in photography,
                videography, and creative direction, we bring brands, stories, and
                concepts to life with a refined artistic touch.
              </p>
              <Button title="About Us" link="/about" variant="Primary" icon="ArrowRight" />
            </div>
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA + IMAGE SLIDESHOW
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--color-black)' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 40 }}>
            <HeadingTitle title="Turning imagination" color="rgb(228, 228, 231)" />
            <div style={{ marginTop: 8 }}>
              <HeadingTitle title="into reality" color="rgb(228, 228, 231)" />
            </div>
          </div>
          <div style={{ marginBottom: 60 }}>
            <Button title="Let's Talk" link="/contact" variant="Primary" icon="ArrowRight" />
          </div>
        </div>

        {/* Full-width slideshow strip — no section-inner padding so it bleeds edge to edge */}
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
      </section>

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

        /* 2-column works grid — matches Framer's gridColumns="2" */
        .works-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-bottom: 0;
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
          .works-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .about-row {
            flex-direction: column;
            gap: 32px;
          }
        }

        /* ── Tablet breakpoint ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .section-inner {
            padding: 80px 48px;
          }
        }
      `}</style>
    </main>
  )
}
