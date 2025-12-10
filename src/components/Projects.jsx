const Projects = () => {
  const projects = [
    {
      tag: 'Data Science',
      title: 'MTA Daily Ridership Analysis',
      description: 'A deep dive into NYC transit usage before, during, and after the pandemic. Built with Python, Pandas, and visualization stacks to surface actionable insights.',
      link: 'https://github.com/Fr0sTnUb/MTA-daily-ridership-analysis'
    },
    {
      tag: 'AI · Web',
      title: 'AI Chatbot Stylist',
      description: 'A conversational agent recommending outfit accessories based on user mood and style. Powered by TypeScript, NLP pipelines, and a sleek web interface.',
      link: 'https://github.com/Fr0sTnUb/AI-Chatbot'
    },
    {
      tag: 'Discord Bots',
      title: 'Uchiha',
      description: 'Multi-purpose Discord bot with moderation, automation, and community engagement tools. Focused on reliability, modular architecture, and delightful UX.',
      link: 'https://github.com/Fr0sTnUb/Uchiha'
    },
    {
      tag: 'Showcase',
      title: 'Discord Bot Web',
      description: 'A polished landing experience for Discord bots, highlighting commands and feature sets. Crafted with responsive CSS and community-driven design patterns.',
      link: 'https://github.com/Fr0sTnUb/discord-bot-web'
    }
  ]

  return (
    <section id="projects" className="section projects" data-animate>
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow" data-text-reveal="1">Projects</p>
          <h2 data-text-reveal="2">Selected work from data stories to immersive apps</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-meta">
                <span className="project-tag">{project.tag}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                View repository
                <i className="ri-arrow-right-up-line"></i>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

