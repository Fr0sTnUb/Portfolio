const Labs = () => {
  const labs = [
    {
      label: 'In testing',
      title: 'RAG assistant for Discord communities',
      description: 'Retrieval-augmented chatbot that learns from your server knowledge base and handles onboarding Q&A in real-time.',
      tools: ['discord.js', 'LangChain', 'Pinecone'],
      progress: 0.7,
      status: 'Beta with 120+ testers'
    },
    {
      label: 'Ideation',
      title: 'Data viz starter kit for hackathons',
      description: 'A plug-and-play template that bootstraps dashboards with Tailwind, Typescript, and composable chart components.',
      tools: ['Next.js', 'Supabase', 'D3'],
      progress: 0.35,
      status: 'Wireframing & component design'
    },
    {
      label: 'Ship soon',
      title: 'WebGL visualiser for micro-interactions',
      description: 'A library of reusable motion patterns and shader snippets to add depth to product onboarding flows.',
      tools: ['Three.js', 'GLSL', 'Framer Motion'],
      progress: 0.55,
      status: 'Prototyping with design partners'
    }
  ]

  return (
    <section id="labs" className="section labs" data-animate>
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow" data-text-reveal="1">Labs</p>
          <h2 data-text-reveal="2">Experiments from the fr0strated playground</h2>
        </div>
        <div className="lab-grid">
          {labs.map((lab) => (
            <article key={lab.title} className="lab-card">
              <div className="lab-label">{lab.label}</div>
              <h3>{lab.title}</h3>
              <p>{lab.description}</p>
              <div className="lab-tools">
                {lab.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <div className="lab-progress" style={{ '--progress': lab.progress }}>
                <span className="lab-progress-bar"></span>
              </div>
              <p className="lab-status">Status · {lab.status}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Labs

