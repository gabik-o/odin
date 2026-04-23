import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProjectCard  from '../framer/project-card'
import Button       from '../framer/button'
import HeadingTitle from '../framer/heading-title'
import { getWorkBySlug, works } from '../data/works'

export default function ProjectDetail() {
  const { slug } = useParams()
  const work = getWorkBySlug(slug)

  if (!work) return <Navigate to="/404" replace />

  const currentIndex = works.findIndex((w) => w.slug === slug)
  const next = works[(currentIndex + 1) % works.length]

  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 100 }}>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', height: '80vh', overflow: 'hidden' }}
      >
        <motion.img
          src={work.mainImage}
          alt={work.title}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* Project info */}
      <div
        style={{
          padding: '80px 100px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 80,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--zinc-800)',
        }}
        className="detail-pad"
      >
        <motion.div
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
            { label: 'Category', value: work.category },
            { label: 'Industry',  value: work.industry },
            { label: 'Year',      value: work.year },
            { label: 'Client',    value: work.client },
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
      {work.content && (
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
      )}

      {/* Gallery */}
      {work.images.length > 0 && (
        <div
          style={{
            padding: '0 100px 100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
          className="detail-pad"
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

      {/* Next project */}
      <div style={{ borderTop: '1px solid var(--zinc-800)', padding: '80px 100px' }} className="detail-pad">
        <p className="text-h6-sm" style={{ color: 'var(--zinc-600)', marginBottom: 40 }}>
          Next Project
        </p>
        <Link to={`/projects/${next.slug}`} style={{ display: 'block', textDecoration: 'none', maxWidth: 380 }}>
          <ProjectCard
            title={next.title}
            image={{ src: next.mainImage, alt: next.title }}
            hoverImage={{ src: next.hoverImage, alt: next.title }}
            style={{ width: '100%' }}
          />
        </Link>
      </div>

      {/* Back */}
      <div style={{ padding: '0 100px 80px' }} className="detail-pad">
        <Button title="All Works" link="/projects" variant="Primary" icon="ArrowLeft" />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  )
}
