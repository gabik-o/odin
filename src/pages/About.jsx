import { motion } from 'framer-motion'

const measurements = [
  { label: 'Height',     value: "5'8\"" },
  { label: 'Bust',       value: '34' },
  { label: 'Waist',      value: '27.5' },
  { label: 'Hip Bone',   value: '31' },
  { label: 'Hip',        value: '38.5' },
  { label: 'Shoulders',  value: '18' },
]

export default function About() {
  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 100 }}>

      {/* ── Hero ── */}
      <div className="about-pad about-hero">
        <motion.p
          className="about-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.p>

        <div className="about-hero-inner">
          {/* Image */}
          <motion.div
            className="about-image-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <img
              src="https://framerusercontent.com/images/HZsAb9finLbFzY3uxIkQw8O85Ko.jpg"
              alt="Odinakachi Odibo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className="about-text-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h1 className="about-name">Odinakachi Odibo</h1>

            <div className="about-bio">
              <p>
                I am a Chicago-based commercial, editorial, and print model.
              </p>
              <p>
                I have always had a love for beauty and taking pictures, which poured into
                my desire for modeling, as well as advice from friends and strangers.
              </p>
              <p>
                My goal as a model is to work in diverse roles which allow me to portray
                products, experiences, and represent brands through my unique personality
                and features. I am looking to grow and learn more with every experience,
                show up professionally, and work diligently.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Measurements ── */}
      <motion.div
        className="about-pad about-measurements"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="about-section-label">My Measurements — in inches</p>
        <div className="measurements-grid">
          {measurements.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="measurement-item"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <span className="measurement-value">{value}</span>
              <span className="measurement-label">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .about-hero {
          padding-top: 60px;
          padding-bottom: 80px;
          border-bottom: 1px solid var(--zinc-800);
        }

        .about-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--zinc-500);
          margin: 0 0 48px;
        }

        .about-hero-inner {
          display: flex;
          gap: 80px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .about-image-wrap {
          flex: 0 0 auto;
          width: clamp(240px, 30vw, 380px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background-color: var(--zinc-900);
        }

        .about-text-col {
          flex: 1 1 300px;
          max-width: 520px;
          padding-top: 8px;
        }

        .about-name {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 500;
          color: rgb(228, 228, 231);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 36px;
        }

        .about-bio {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .about-bio p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--zinc-400);
          margin: 0;
        }

        /* Measurements */
        .about-measurements {
          padding-top: 80px;
          padding-bottom: 100px;
        }

        .about-section-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--zinc-600);
          margin: 0 0 48px;
        }

        .measurements-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 2px;
        }

        .measurement-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 32px 24px;
          border: 1px solid var(--zinc-800);
        }

        .measurement-value {
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 400;
          color: rgb(228, 228, 231);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .measurement-label {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--zinc-600);
        }

        @media (max-width: 900px) {
          .about-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .about-hero-inner { gap: 40px; }
          .about-image-wrap { width: 100%; aspect-ratio: 4 / 5; }
          .measurements-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 480px) {
          .measurements-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </main>
  )
}
