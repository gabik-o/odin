import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main
      style={{
        backgroundColor: 'var(--color-black)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-brand-header"
          style={{ color: 'var(--zinc-800)', marginBottom: '24px' }}
        >
          404
        </p>
        <h1 className="text-h3" style={{ color: 'var(--zinc-200)', marginBottom: '16px' }}>
          Page not found
        </h1>
        <p className="text-body" style={{ color: 'var(--zinc-500)', marginBottom: '48px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '14px 28px',
            borderRadius: '999px',
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            transition: 'opacity 0.2s',
          }}
        >
          Back Home →
        </Link>
      </motion.div>
    </main>
  )
}
