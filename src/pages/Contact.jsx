import { useState } from 'react'
import { motion } from 'framer-motion'
import HeadingTitle from '../framer/heading-title'

const services = ['Photography', 'Videography', 'Visual Direction', 'Post-Production', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--zinc-700)',
    padding: '16px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: 16,
    color: 'var(--color-white)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <main style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: 120 }}>

      {/* Header */}
      <div style={{ padding: '80px 100px 0', borderBottom: '1px solid var(--zinc-800)' }} className="contact-pad">
        <motion.p
          className="text-h6-sm"
          style={{ color: 'var(--zinc-500)', marginBottom: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Get in Touch
        </motion.p>
        <div style={{ paddingBottom: 80 }}>
          <HeadingTitle title="Turning imagination" color="rgb(228, 228, 231)" />
          <HeadingTitle title="into reality"        color="rgb(228, 228, 231)" style={{ marginTop: 8 }} />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '80px 100px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 80,
          alignItems: 'flex-start',
        }}
        className="contact-pad"
      >
        {/* Info */}
        <motion.div
          style={{ flex: '1 1 280px', maxWidth: 360 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-body" style={{ color: 'var(--zinc-400)', marginBottom: 60 }}>
            We'd love to hear about your project. Fill out the form or reach out directly and
            we'll get back to you within 24 hours.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              { label: 'Email',         value: 'contact@gaboye.dev' },
              { label: 'Based in',      value: 'Chicago, IL' },
              { label: 'Available for', value: 'Global projects' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-h6-sm" style={{ color: 'var(--zinc-600)', marginBottom: 6 }}>{item.label}</p>
                <p className="text-body-sm" style={{ color: 'var(--zinc-300)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          style={{ flex: '1 1 400px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '80px 0' }}
            >
              <p className="text-h3" style={{ color: 'var(--color-white)', marginBottom: 16 }}>Message sent.</p>
              <p className="text-body" style={{ color: 'var(--zinc-400)' }}>We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {[
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your full name' },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-h6-sm" style={{ color: 'var(--zinc-500)', display: 'block', marginBottom: 8 }}>
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-white)')}
                    onBlur={(e)  => (e.target.style.borderBottomColor = 'var(--zinc-700)')}
                  />
                </div>
              ))}

              <div>
                <label className="text-h6-sm" style={{ color: 'var(--zinc-500)', display: 'block', marginBottom: 8 }}>
                  Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-white)')}
                  onBlur={(e)  => (e.target.style.borderBottomColor = 'var(--zinc-700)')}
                >
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => (
                    <option key={s} value={s} style={{ backgroundColor: 'var(--zinc-900)', color: 'var(--color-white)' }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-h6-sm" style={{ color: 'var(--zinc-500)', display: 'block', marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-white)')}
                  onBlur={(e)  => (e.target.style.borderBottomColor = 'var(--zinc-700)')}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '16px 36px',
                    borderRadius: 999,
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-black)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message →
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-pad { padding: 60px 24px !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--zinc-700); }
      `}</style>
    </main>
  )
}
