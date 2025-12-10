const Highlights = () => {
  return (
    <section id="hero" className="section highlights" data-animate>
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow" data-text-reveal="1">Highlights</p>
          <h2 data-text-reveal="2">Signature wins and community impact</h2>
        </div>
        <div className="highlight-grid">
          <article className="highlight-card" data-text-reveal="3">
            <div className="highlight-icon">
              <i className="ri-sparkling-2-fill"></i>
            </div>
            <h3>Full-stack craftsmanship</h3>
            <p>
              From concept to deployment, I ship delightful interfaces backed by reliable APIs,
              automated tests, and DevOps workflows.
            </p>
            <ul className="highlight-list">
              <li>
                <span className="bullet"></span>
                20+ products delivered across web, analytics, and automation.
              </li>
              <li>
                <span className="bullet"></span>
                Performance-first builds with Lighthouse 95+ scores.
              </li>
            </ul>
          </article>
          <article className="highlight-card" data-text-reveal="4">
            <div className="highlight-icon">
              <i className="ri-community-line"></i>
            </div>
            <h3>Discord ecosystem leader</h3>
            <p>
              Designing modular bot architectures that empower thriving communities and automate
              moderation and engagement.
            </p>
            <ul className="highlight-list">
              <li>
                <span className="bullet"></span>
                15+ bots launched with slash commands and observability.
              </li>
              <li>
                <span className="bullet"></span>
                Running the <a href="https://discord.gg/Yxbjf5FUVt" target="_blank" rel="noreferrer">fr0strated HQ</a> server for builders & creatives.
              </li>
            </ul>
          </article>
          <article className="highlight-card" data-text-reveal="5">
            <div className="highlight-icon">
              <i className="ri-bar-chart-2-line"></i>
            </div>
            <h3>Data stories that resonate</h3>
            <p>
              Turning raw datasets into human-friendly dashboards, experiments, and presentations
              that drive product decisions.
            </p>
            <ul className="highlight-list">
              <li>
                <span className="bullet"></span>
                MTA ridership study featured by peer communities.
              </li>
              <li>
                <span className="bullet"></span>
                Deep dives with Python, R, and visual storytelling.
              </li>
            </ul>
          </article>
        </div>
        <div className="highlight-callout">
          <p>
            Curious about the process? <a href="#connect">Let's chat</a> about how I can help your next product or data initiative shine.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Highlights

