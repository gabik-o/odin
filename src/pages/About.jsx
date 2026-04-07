import { motion } from 'framer-motion'
import HeadingTitle from '../framer/heading-title'
import Button       from '../framer/button'

export default function About() {
  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 120 }}>

      {/* Hero */}
      <div style={{ padding: '80px 100px', borderBottom: '1px solid var(--zinc-800)' }} className="about-pad">
        <motion.p
          className="text-h6-sm"
          style={{ color: 'var(--zinc-500)', marginBottom: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Pure Visuals
        </motion.p>

        <motion.h1
          className="text-h1"
          style={{ color: 'var(--color-white)', maxWidth: 900, marginBottom: 60 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Born from a love of beauty — built for the brand
        </motion.h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 80, alignItems: 'flex-start' }}>
          <motion.div
            style={{ flex: '1 1 400px', maxWidth: 600, aspectRatio: '3/4', overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://framerusercontent.com/images/1DHUE6yHyzYlI1q4FB6eE3pBlJM.png"
              alt="Pure Visuals"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          <motion.div
            style={{ flex: '1 1 300px', maxWidth: 480, paddingTop: 40 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-body-lg" style={{ color: 'var(--zinc-300)', marginBottom: 40 }}>
              At Pure Visuals, we are a team of passionate creatives dedicated to crafting
              striking visual narratives. Specializing in photography, videography, and
              creative direction, we bring brands, stories, and concepts to life with a
              refined artistic touch.
            </p>
            <p className="text-body" style={{ color: 'var(--zinc-500)', marginBottom: 60 }}>
              Every project begins with a deep understanding of the brand and its story.
              We believe that the most compelling visuals are born from a genuine connection
              between concept and execution — where technique meets intention.
            </p>
            <Button title="View Works" link="/projects" variant="Primary" icon="ArrowRight" />
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: '100px' }} className="about-pad">
        <HeadingTitle title="What drives us" color="rgb(228, 228, 231)" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 40,
            marginTop: 80,
          }}
        >
          {[
            { number: '01', title: 'Intentional Vision',    body: 'Every frame is purposeful. We approach each shoot with a clear creative brief and a commitment to craft.' },
            { number: '02', title: 'Brand First',           body: 'We immerse ourselves in your world so every visual we produce feels like an authentic extension of your brand.' },
            { number: '03', title: 'Technical Excellence',  body: 'From lighting to post-production, we hold our technical standards as high as our creative ones.' },
            { number: '04', title: 'Collaborative Spirit',  body: 'The best work happens in partnership. We build real relationships with the clients and teams we work with.' },
          ].map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ borderTop: '1px solid var(--zinc-800)', paddingTop: 32 }}
            >
              <p className="text-h6-sm" style={{ color: 'var(--zinc-600)', marginBottom: 16 }}>{v.number}</p>
              <h3 className="text-h4"   style={{ color: 'var(--zinc-200)', marginBottom: 16 }}>{v.title}</h3>
              <p className="text-body-sm" style={{ color: 'var(--zinc-500)' }}>{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{ padding: '100px', borderTop: '1px solid var(--zinc-800)', textAlign: 'center' }}
        className="about-pad"
      >
        <HeadingTitle title="Let's create something together" color="rgb(228, 228, 231)" />
        <div style={{ marginTop: 40 }}>
          <Button title="Get in Touch" link="/contact" variant="Primary" icon="ArrowRight" />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-pad { padding: 60px 24px !important; }
        }
      `}</style>
    </main>
  )
}
