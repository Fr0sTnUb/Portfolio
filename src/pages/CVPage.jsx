import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CVPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Nitesh SHA — CV'
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cv-page {
          width: 100vw;
          height: 100vh;
          background: #0A0E1A;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Courier New', monospace;
        }

        /* ── Top bar ── */
        .cv-topbar {
          height: 56px;
          background: #0F1629;
          border-bottom: 1px solid #1E2D40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          flex-shrink: 0;
          z-index: 10;
        }

        .cv-topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cv-back {
          color: #00D4FF;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          border: 1px solid #00D4FF;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .cv-back:hover {
          background: #00D4FF;
          color: #0A0E1A;
        }

        .cv-title {
          font-size: 0.75rem;
          color: #64748B;
          letter-spacing: 0.15em;
        }
        .cv-title span {
          color: #E2E8F0;
        }

        .cv-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cv-download-btn {
          font-family: 'Courier New', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: #0A0E1A;
          background: #00D4FF;
          border: 1px solid #00D4FF;
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cv-download-btn:hover {
          background: transparent;
          color: #00D4FF;
        }

        .cv-status {
          font-size: 0.65rem;
          color: #10B981;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .cv-status::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 6px #10B981;
          display: inline-block;
        }

        /* ── PDF iframe ── */
        .cv-viewer {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .cv-iframe {
          width: 100%;
          height: 100%;
          border: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .cv-iframe.ready {
          opacity: 1;
        }

        /* Loading skeleton */
        .cv-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: #0A0E1A;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .cv-loading.hidden { opacity: 0; }

        .cv-loading-text {
          font-size: 0.75rem;
          color: #00D4FF;
          letter-spacing: 0.2em;
          animation: blink 1s step-end infinite;
        }

        .cv-loading-bar {
          width: 200px;
          height: 2px;
          background: #1E2D40;
          border-radius: 2px;
          overflow: hidden;
        }
        .cv-loading-fill {
          height: 100%;
          background: linear-gradient(90deg, #00D4FF, #7C3AED);
          border-radius: 2px;
          animation: load-sweep 1.2s ease-in-out infinite;
        }

        @keyframes load-sweep {
          0%   { width: 0%;   margin-left: 0; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ── Mobile fallback ── */
        .cv-mobile-fallback {
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 1.5rem;
          padding: 2rem;
          text-align: center;
        }
        .cv-mobile-fallback p {
          font-size: 0.8rem;
          color: #64748B;
          letter-spacing: 0.08em;
          line-height: 1.6;
        }

        @media (max-width: 767px) {
          .cv-viewer       { display: none; }
          .cv-mobile-fallback { display: flex; }
        }
      `}</style>

      <div className="cv-page">

        {/* Top bar */}
        <div className="cv-topbar">
          <div className="cv-topbar-left">
            <Link to="/" className="cv-back">← BACK</Link>
            <span className="cv-title">
              NITESH_SHA / <span>CURRICULUM_VITAE.pdf</span>
            </span>
          </div>
          <div className="cv-topbar-right">
            <span className="cv-status">LOADED</span>
            <a
              href="/NiteshSHA_CV.pdf"
              download="NiteshSHA_CV.pdf"
              className="cv-download-btn"
            >
              [ DOWNLOAD_CV ]
            </a>
          </div>
        </div>

        {/* PDF viewer — desktop */}
        <div className="cv-viewer">
          <div className={`cv-loading ${loaded ? 'hidden' : ''}`}>
            <span className="cv-loading-text">LOADING_CV...</span>
            <div className="cv-loading-bar">
              <div className="cv-loading-fill" />
            </div>
          </div>
          <iframe
            src="/NiteshSHA_CV.pdf"
            className={`cv-iframe ${loaded ? 'ready' : ''}`}
            title="Nitesh SHA CV"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Mobile fallback — iframes don't work well on mobile */}
        <div className="cv-mobile-fallback">
          <span style={{ fontSize: '0.65rem', color: '#00D4FF', letterSpacing: '0.2em' }}>
            [ CV_VIEWER ]
          </span>
          <p>PDF preview is not available on mobile browsers.<br />Tap below to download directly.</p>
          <a
            href="/NiteshSHA_CV.pdf"
            download="NiteshSHA_CV.pdf"
            className="cv-download-btn"
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}
          >
            [ DOWNLOAD_CV ]
          </a>
          <Link to="/" className="cv-back" style={{ marginTop: '0.5rem' }}>
            ← BACK TO PORTFOLIO
          </Link>
        </div>

      </div>
    </>
  )
}
