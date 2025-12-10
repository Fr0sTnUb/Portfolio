const About = () => {
  return (
    <section id="about" className="section about" data-animate>
      <div className="container split">
        <div className="section-heading">
          <p className="eyebrow" data-text-reveal="1">About</p>
          <h2 data-text-reveal="2">The curiosity that powers fr0strated</h2>
        </div>
        <div className="section-body">
          <p data-text-reveal="3">
            I grew up exploring code from every angle—front-end artistry, backend logic,
            and data-driven storytelling. Today, I blend these skills to ship polished products,
            design thoughtful user journeys, and surface actionable insights. Whether it's a
            real-time Discord bot or an end-to-end analytics pipeline, I thrive on crafting
            experiences that feel intuitive and intelligent.
          </p>
          <div className="pillars">
            <article className="pillar" data-text-slide-left>
              <h3>Front-end Specialist</h3>
              <p>
                Pixel-perfect interfaces with React, TypeScript, and modern CSS.
                I obsess over motion, accessibility, and performance.
              </p>
            </article>
            <article className="pillar" data-text-slide-left>
              <h3>Data Science Explorer</h3>
              <p>
                Python, R, and statistics to interpret complex datasets and frame the
                story a product needs to tell.
              </p>
            </article>
            <article className="pillar" data-text-slide-left>
              <h3>Community Builder</h3>
              <p>
                Discord bots, game prototypes, and collaborative side quests keep me plugged
                into communities and constantly experimenting.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

