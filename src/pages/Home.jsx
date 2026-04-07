import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

// Responsive variant for Framer components (matches App.jsx logic)
function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  if (width < 768) return 'Phone'
  if (width < 1024) return 'Tablet'
  return 'Desktop'
}

// ── Real Framer components ──
import BrandHeader    from '../framer/brand-header'
import HeadingTitle   from '../framer/heading-title'
import Button         from '../framer/button'
import ProjectCard    from '../framer/project-card'
import ServiceCard    from '../framer/service-card'
import Testimonials   from '../framer/testimonials'
import ImageSlideshow from '../framer/image-slideshow'
import ImagesLeft     from '../framer/images-left'
import ImagesRight    from '../framer/images-right'

import { works } from '../data/works'

// Featured: first 4 works that have content
const featured = works.filter((w) => w.content).slice(0, 4)

// Services — props map directly to ServiceCard's prop names from Framer XML
const services = [
  {
    name: 'Photography',
    subName1: 'Commercial Photography',
    subName2: 'Event Photography',
    subName3: 'Portrait Photography',
    subName4: 'Commercial Photography',
    subName5: 'Architectural Photography',
    subName6: '',
  },
  {
    name: 'Videography',
    subName1: 'Brand Films',
    subName2: 'Event Videography',
    subName3: 'Social Media Content',
    subName4: 'Cinematic Productions',
    subName5: 'Aerial Videography',
    subName6: 'Time-Lapse & Slow Motion',
  },
  {
    name: 'Visual Direction',
    subName1: 'Art Direction',
    subName2: 'Set & Prop Styling',
    subName3: 'Wardrobe & Fashion Styling',
    subName4: 'Makeup & Hair Styling',
    subName5: 'Visual Strategy',
    subName6: 'Storytelling',
  },
  {
    name: 'Post-Production & Retouching',
    subName1: 'Photo Editing & Retouching',
    subName2: 'Video Editing',
    subName3: 'Color Correction & Grading',
    subName4: '3D & CGI Integration',
    subName5: '',
    subName6: '',
  },
]

export default function Home() {
  const breakpoint = useBreakpoint()
  // ServiceCard variant: 'Desktop-Off' | 'Tablet-Off' | 'Phone-Off'
  const serviceVariant = `${breakpoint}-Off`
  // Testimonials variant: 'Desktop' | 'Phone'
  const testimonialsVariant = breakpoint === 'Phone' ? 'Phone' : 'Desktop'

  // Track scroll progress through the hero section
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Text fades out in the second half of the hero scroll
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 1, 0])
  // Subtle upward drift on the text as you scroll
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const heroImageX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
 

  return (
    <main style={{ backgroundColor: 'var(--color-black)' }}>

      {/* ══════════════════════════════════════════════════════
          HERO — 220vh tall so the sticky viewport lingers
          while the user scrolls, matching the Framer original.
          Structure mirrors the Framer XML:
            HeroSection (220vh)
              └── PreScroll (sticky 100vh)
                    ├── ImagesLeft + ImagesRight (absolute, full bg)
                    ├── Text overlay (transparent bg, z-index 1)
                    └── Scroll indicator (absolute bottom)
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          /* 220vh = same ratio as Framer's 2200px at 1000px viewport */
          height: '220vh',
          backgroundColor: 'var(--zinc-200)',
        }}
      >
        {/* Sticky container — stays pinned at top for the full 220vh scroll */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* ── Image layer (absolute, behind text) ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
            }}
          >
            <ImagesLeft  style={{ flex: 1, height: '100%', minWidth: 0, transform: heroImageX }} />
            <ImagesRight style={{ flex: 1, height: '100%', minWidth: 0 }} />
          </div>

          {/* ── Text overlay (transparent bg so images show through) ── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              textAlign: 'center',
              // NO backgroundColor — images must show through
              opacity: heroTextOpacity,
              y: heroTextY,
            }}
          >
            <BrandHeader
              brandName="Odinakachi Odibo"
              style={{ width: '100%', maxWidth: 1200 }}
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
              <span className="text-h5" style={{ color: 'var(--color-black)' }}>
                Model Portfolio
              </span>
              <span className="text-h5" style={{ color: 'var(--color-black)' }}>
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
              zIndex: 2,
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
      <section style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
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
                    style={{ width: '100%', height: '100%' }}
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
      <section style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
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
          OUR SERVICES — ServiceCard stack
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
        <div className="section-inner">
          <div style={{ marginBottom: 60, textAlign: 'center' }}>
            <HeadingTitle title="Our Services" color="rgb(228, 228, 231)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {services.map((s, i) => (
              <ServiceCard
                key={i}
                variant={serviceVariant}
                name1={s.name}
                subName1={s.subName1}
                subName2={s.subName2}
                subName3={s.subName3}
                subName4={s.subName4}
                subName5={s.subName5}
                subName6={s.subName6}
                style={{ width: '100%' }}
              />
            ))}
          </div>
        </div>
        <div className="divider" />
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
        <div className="section-inner" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 60, alignSelf: 'flex-start' }}>
            <HeadingTitle title="What they said" color="rgb(228, 228, 231)" />
          </div>
          <Testimonials
            variant="Desktop"
            style={{ width: '100%', maxWidth: 800 }}
          />
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
        <div style={{ width: '100%', overflow: 'hidden', paddingBottom: 0 }}>
          <ImageSlideshow
            image1={{ src: works[0].mainImage, alt: works[0].title }}
            image2={{ src: works[1].mainImage, alt: works[1].title }}
            image3={{ src: works[2].mainImage, alt: works[2].title }}
            image4={{ src: works[3].mainImage, alt: works[3].title }}
            image5={{ src: works[4].mainImage, alt: works[4].title }}
            image6={{ src: works[5].mainImage, alt: works[5].title }}
            style={{ width: '100%', height: 220 }}
          />
        </div>
      </section>

      {/* ── Shared layout styles ── */}
      <style>{`
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
