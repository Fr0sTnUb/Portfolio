import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'
import { Github, Linkedin, MessageSquare, Instagram } from 'lucide-react'
import { useSectionReveal } from '../hooks/useSectionReveal'

const socialLinks = [
  { icon: Github,        label: 'GITHUB',    href: 'https://github.com/Fr0sTnUb' },
  { icon: Linkedin,      label: 'LINKEDIN',  href: 'https://www.linkedin.com/in/nitesh-sha-a988b3276/' },
  { icon: MessageSquare, label: 'DISCORD',   href: 'https://discord.gg/Yxbjf5FUVt' },
  { icon: Instagram,     label: 'INSTAGRAM', href: 'https://www.instagram.com/fr0st._.rated/' },
]

const Contact = () => {
  const formRef   = useRef(null)
  const sectionRef= useRef(null)
  const [titleRef, titleVisible] = useSectionReveal(0.3)
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('MISSING_FIELDS: name, email, message required')
      return
    }
    setLoading(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      toast.success('TRANSMISSION_COMPLETE: Message delivered.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS Error:', err)
      toast.error('TRANSMISSION_FAILED: Please retry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} style={{ borderBottom: '1px solid var(--border)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <Toaster
        position="top-right"
        toastOptions={{ style: { background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' } }}
      />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            <span style={{ color: '#6b7280' }}># ──</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>05. INITIALIZE_CONNECTION</span>{' '}
            <span style={{ color: '#1e2d40' }}>{'─'.repeat(24)}</span>
          </p>
          <h2
            ref={titleRef}
            className={titleVisible ? 'title-matrix' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
              opacity: titleVisible ? undefined : 0,
            }}
          >
            PING ME
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Awaiting input packet...
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

          {/* Form — glass-strong code-editor */}
          <div className="reveal-left">
            <div className="glass-strong" style={{ borderRadius: 16, overflow: 'hidden' }}>
              {/* Editor titlebar */}
              <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid rgba(0,212,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#3a4a5c', letterSpacing: '0.3em' }}>
                ●  ●  ●
              </div>

              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>def</span>{' '}
                  <span style={{ color: 'var(--text)' }}>send_message</span>
                  <span style={{ color: 'var(--text-dim)' }}>(</span>
                </p>

                <form ref={formRef} onSubmit={handleSubmit}>
                  {[
                    { field: 'name',    label: 'name',    type: 'text',  placeholder: 'ENTER_NAME',   required: true },
                    { field: 'email',   label: 'email',   type: 'email', placeholder: 'ENTER_EMAIL',  required: true },
                    { field: 'subject', label: 'subject', type: 'text',  placeholder: 'ENTER_SUBJECT',required: false },
                  ].map(({ field, label, type, placeholder, required }) => (
                    <div key={field} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--purple)', paddingLeft: '1rem' }}>{label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>=</span>
                      </div>
                      <input type={type} name={field} value={form[field]} onChange={handleChange} placeholder={`"${placeholder}"`} required={required} className="ds-input" style={{ paddingLeft: '2rem' }} />
                    </div>
                  ))}

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--purple)', paddingLeft: '1rem' }}>payload</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>=</span>
                    </div>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder='"TRANSMIT_MESSAGE..."' required rows={5} className="ds-input" style={{ paddingLeft: '2rem', resize: 'vertical' }} />
                  </div>

                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>)</p>

                  <button type="submit" className={loading ? 'btn-outline' : 'btn-cyan'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={loading}>
                    {loading ? (
                      <>
                        <span style={{ width: 12, height: 12, border: '2px solid var(--cyan)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                        Transmitting...
                      </>
                    ) : '[ EXECUTE_SEND() ]'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
              <span style={{ color: '#6b7280' }}>#</span> EXTERNAL_LINKS<br />
              <span style={{ fontSize: '0.68rem' }}>Direct network connections. Expected response time: &lt; 24h.</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {socialLinks.map(({ icon: Icon, label, href }, i) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                   className="glass-card stagger-child"
                   style={{
                     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                     padding: '1.25rem', textDecoration: 'none', color: 'var(--text-dim)',
                     animationDelay: `${i * 0.1}s`,
                     transition: 'color 0.25s ease',
                     borderRadius: 14,
                   }}
                   onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)' }}
                   onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)' }}
                >
                  <Icon size={22} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{label}</span>
                </a>
              ))}
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', borderTop: '2px solid var(--purple)', borderRadius: 14 }}>
              {[['LOC','IST (UTC+5:30)'],['RESPONSE','&lt; 24 hours'],['STATUS','OPEN TO WORK']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '1rem', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ color: 'var(--text-dim)', minWidth: 80 }}>{k}</span>
                  <span style={{ color: 'var(--border-bright)' }}>:</span>
                  <span style={{ color: k === 'STATUS' ? 'var(--green)' : 'var(--text)' }} dangerouslySetInnerHTML={{ __html: v }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

export default Contact
