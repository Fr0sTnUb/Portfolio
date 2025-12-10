import { useState } from 'react'
import apiService from '../services/api'

const Connect = () => {
  const [formMessage, setFormMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    
    try {
      const response = await apiService.sendContact(data)
      setFormMessage(response.message || 'Thanks for reaching out! I will reply soon.')
      e.target.reset()
    } catch (error) {
      setFormMessage('Sorry, there was an error sending your message. Please try again later.')
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setFormMessage('')
      }, 5000)
    }
  }

  const socialCards = [
    {
      platform: 'GitHub',
      link: 'https://github.com/Fr0sTnUb',
      icon: 'ri-github-fill',
      class: 'social-github'
    },
    {
      platform: 'LinkedIn',
      link: 'https://www.linkedin.com/in/nitesh-sha-a988b3276/',
      icon: 'ri-linkedin-fill',
      class: 'social-linkedin'
    },
    {
      platform: 'Discord',
      link: 'https://discord.gg/Yxbjf5FUVt',
      icon: 'ri-discord-fill',
      class: 'social-discord'
    },
    {
      platform: 'Instagram',
      link: 'https://www.instagram.com/aint._.nitesh/',
      icon: 'ri-instagram-fill',
      class: 'social-instagram'
    }
  ]

  return (
    <section id="connect" className="section connect" data-animate>
      <div className="container split">
        <div className="section-heading">
          <p className="eyebrow" data-text-reveal="1">Connect</p>
          <h2 data-text-reveal="2">Let's build the next big thing together</h2>
          
          <div className="social-cards" data-text-reveal="3">
            {socialCards.map((social) => (
              <a
                key={social.platform}
                className={`social-card ${social.class}`}
                href={social.link}
                target="_blank"
                rel="noreferrer"
              >
                <div className="social-card-icon">
                  <i className={social.icon}></i>
                </div>
                <h4 className="social-card-title">{social.platform}</h4>
              </a>
            ))}
          </div>
        </div>
        <div className="section-body">
          <p>
            Whether you need a high-impact web experience, data storytelling, or a custom Discord bot,
            I'm ready to collaborate. Drop a message and I will get back quickly.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input type="text" name="name" placeholder="How should I call you?" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="Where can I reply?" required />
              </label>
            </div>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Share your idea, project, or challenge..."
                required
              ></textarea>
            </label>
            <button 
              className="btn btn-primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
              <i className="ri-send-plane-line"></i>
            </button>
            {formMessage && (
              <p className="form-message">{formMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Connect

