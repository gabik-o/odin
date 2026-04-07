import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeadingTitle from '../framer/heading-title'
import ProjectCard  from '../framer/project-card'
import { works } from '../data/works'

const categories = ['All', ...Array.from(new Set(works.map((w) => w.category).filter(Boolean)))]

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? works : works.filter((w) => w.category === active)

  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 120 }}>

      {/* Header */}
      <div style={{ padding: '0 100px 80px', borderBottom: '1px solid var(--zinc-800)' }} className="page-pad">
        <HeadingTitle title="Works" color="rgb(228, 228, 231)" />
        <p className="text-body" style={{ color: 'var(--zinc-500)', marginTop: 24, maxWidth: 480 }}>
          A selection of photography, visual direction, and film work across commercial and editorial projects.
        </p>
      </div>

      {/* Category filter */}
      <div
        style={{
          padding: '40px 100px',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--zinc-800)',
        }}
        className="page-pad"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '8px 20px',
              borderRadius: 999,
              border: `1px solid ${active === cat ? 'var(--color-white)' : 'var(--zinc-700)'}`,
              backgroundColor: active === cat ? 'var(--color-white)' : 'transparent',
              color: active === cat ? 'var(--color-black)' : 'var(--zinc-400)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '80px 100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 40,
        }}
        className="page-pad"
      >
        {filtered.map((work) => (
          <Link key={work.slug} to={`/projects/${work.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
            <ProjectCard
              title={work.title}
              image={{ src: work.mainImage, alt: work.title }}
              hoverImage={{ src: work.hoverImage, alt: work.title }}
              style={{ width: '100%' }}
            />
          </Link>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .page-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  )
}
