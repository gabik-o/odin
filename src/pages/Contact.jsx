import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
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

      {/* Body */}
      <div className="contact-pad contact-body">

        {/* Info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h1 className="contact-heading">Get in Touch</h1>

          <div className="contact-details">
            <div>
              <p className="contact-detail-label">Email</p>
              <a
                href="mailto:odeenakaaa@gmail.com"
                className="contact-detail-value contact-link"
              >
                odeenakaaa@gmail.com
              </a>
            </div>

            <div>
              <p className="contact-detail-label">Instagram</p>
              <a
                href="https://www.instagram.com/odeenakaaa"
                target="_blank"
                rel="noreferrer"
                className="contact-detail-value contact-link"
              >
                @odeenakaaa
              </a>
            </div>

            <div>
              <p className="contact-detail-label">Based in</p>
              <p className="contact-detail-value">Chicago, IL</p>
            </div>

            <div>
              <p className="contact-detail-label">Status</p>
              <p className="contact-detail-value contact-available">
                <span className="contact-online-dot" />
                Available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="contact-form-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: '80px 0' }}
            >
              <p style={{ fontSize: 24, color: 'var(--color-white)', marginBottom: 12 }}>Message sent.</p>
              <p style={{ color: 'var(--zinc-500)' }}>I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {[
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your full name' },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com' },
                { name: 'company', label: 'Company', type: 'text',  placeholder: 'Brand or agency (optional)' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="contact-field-label">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.name !== 'company'}
                    placeholder={field.placeholder}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-white)')}
                    onBlur={(e)  => (e.target.style.borderBottomColor = 'var(--zinc-700)')}
                  />
                </div>
              ))}

              <div>
                <label className="contact-field-label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about the project or opportunity..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderBottomColor = 'var(--color-white)')}
                  onBlur={(e)  => (e.target.style.borderBottomColor = 'var(--zinc-700)')}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="contact-submit"
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
        .contact-body {
          padding-top: 60px;
          padding-bottom: 100px;
          display: flex;
          flex-wrap: wrap;
          gap: 100px;
          align-items: flex-start;
        }

        .contact-info {
          flex: 0 0 auto;
          width: clamp(220px, 25vw, 300px);
        }

        .contact-heading {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 500;
          color: rgb(228, 228, 231);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 52px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .contact-detail-label {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--zinc-600);
          margin: 0 0 6px;
        }

        .contact-detail-value {
          font-size: 14px;
          color: var(--zinc-300);
          margin: 0;
          line-height: 1.5;
        }

        .contact-link {
          text-decoration: none;
          color: var(--zinc-300);
          transition: color 0.2s ease;
        }
        .contact-link:hover { color: rgb(228, 228, 231); }

        .contact-available {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .contact-online-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          flex-shrink: 0;
        }

        .contact-form-col {
          flex: 1 1 400px;
          max-width: 600px;
        }

        .contact-field-label {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--zinc-500);
          margin-bottom: 8px;
        }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 16px 36px;
          border-radius: 999px;
          background-color: var(--color-white);
          color: var(--color-black);
          border: none;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        @media (max-width: 900px) {
          .contact-pad { padding-left: 24px !important; padding-right: 24px !important; }
          .contact-body { gap: 60px; }
          .contact-info { width: 100%; }
        }

        input::placeholder, textarea::placeholder { color: var(--zinc-700); }
      `}</style>
    </main>
  )
}
