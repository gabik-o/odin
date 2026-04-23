import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
import Navigation from './framer/navigation'
import Footer from './framer/footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
}

const pageTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

// Detect viewport width for responsive nav variant
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

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const breakpoint = useBreakpoint()

  // Let framer nav links navigate via React Router instead of full page reload
  function handleNavClick(href) {
    if (href && href.startsWith('/')) navigate(href)
    else if (href) window.location.href = href
  }

  const isHome = location.pathname === '/'
  const navVariant = isHome
    ? breakpoint
    : breakpoint === 'Phone' ? 'Phone White'
    : breakpoint === 'Tablet' ? 'Tablet White'
    : 'Desktop White'

  return (
    <>
      <ScrollToTop />
      {/* ── Real Framer Navigation ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, width: '100%',
        // On non-home pages force nav text + icon to white by overriding the black color token
        ...(!isHome && {
          '--token-cc3662e6-3397-466e-9cb2-289050ebc7cb': 'rgb(255, 255, 255)',
        }),
      }}>
        <Navigation
          variant={navVariant}
          title="Works"
          link="/projects"
          title2="About"
          link2="/about"
          title3="Contact"
          link3="/contact"
          logo="Odinakachi Odibo"
          style={{ width: '100%' }}
        />
      </div>

      {/* ── Pages ── */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/projects"        element={<AnimatedPage><Projects /></AnimatedPage>} />
          <Route path="/projects/:slug"  element={<AnimatedPage><ProjectDetail /></AnimatedPage>} />
          <Route path="/about"           element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/contact"         element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/404"             element={<AnimatedPage><NotFound /></AnimatedPage>} />
          <Route path="*"                element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>

      {/* ── Real Framer Footer ── */}
      <Footer
        variant={breakpoint === 'Phone' ? 'Phone' : 'Desktop'}
        titleName1="Works"
        link="/projects"
        titleName2="About"
        link2="/about"
        titleName3="Contact"
        link3="/contact"
        copyright={`© ${new Date().getFullYear()} Odinakachi Odibo`}
        location="Chicago, IL"
        country="USA"
        socialLink1="https://www.instagram.com/odeenakaaa"
        style={{ width: '100%' }}
      />
      {/* Copyright — centered below About & Location on all screen sizes */}
      <div style={{
        backgroundColor: 'rgb(0, 0, 0)',
        width: '100%',
        paddingBottom: '32px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <p style={{
          color: 'rgb(148, 163, 184)',
          fontFamily: '"Inter", sans-serif',
          fontSize: '14px',
          letterSpacing: '-0.02em',
          lineHeight: '1.6em',
          margin: 0,
        }}>
          {`© ${new Date().getFullYear()} Odinakachi Odibo`}
        </p>
      </div>
      <style>{`
        /* Phone footer: hide Social Name 2 & 3 */
        .framer-TZlZW.framer-v-15pnoiw .framer-1maq6ki,
        .framer-TZlZW.framer-v-15pnoiw .framer-i7s96p {
          display: none !important;
        }
        /* Phone footer: reduce top padding to close gap with slideshow above */
        .framer-TZlZW.framer-v-15pnoiw.framer-16pj96t {
          padding-top: 24px !important;
        }
        /* Hide copyright in its original positions (desktop column + phone socials section) */
        .framer-TZlZW .framer-1dwpmpu,
        .framer-TZlZW .framer-mfa9km {
          display: none !important;
        }
        /* Remove bottom padding from footer since copyright now lives outside it */
        .framer-TZlZW.framer-16pj96t {
          padding-bottom: 0px !important;
        }
      `}</style>
    </>
  )
}
