/**
 * fr0strated — Portfolio Interactions
 * Handles theme persistence, navigation toggles, scroll animations, and contact form UX.
 */

(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = nav ? nav.querySelectorAll(".nav-link") : [];
  const contactForm = document.querySelector("[data-contact-form]");
  const formMessage = document.querySelector("[data-form-message]");
  const animatedSections = document.querySelectorAll("[data-animate]");
  const sections = document.querySelectorAll("main section[id]");

  const STORAGE_KEY = "fr0strated-theme";

  /* ------------------------------------------------------------------------ */
  /* Theme handling                                                           */
  /* ------------------------------------------------------------------------ */

  const getSystemPreference = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };

  const initTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored || getSystemPreference();
    applyTheme(initial);
  };

  const toggleTheme = () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  initTheme();

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  };

  const toggleMenu = () => {
    if (!nav || !menuToggle) return;
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const setActiveNavLink = () => {
    const offset = 120;
    let activeId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.substring(1) : "";
      link.classList.toggle("active", id === activeId);
    });
  };

  if (navLinks.length > 0) {
    window.addEventListener("scroll", setActiveNavLink, { passive: true });
    setActiveNavLink();
  }

  /* ------------------------------------------------------------------------ */
  /* Scroll animations                                                        */
  /* ------------------------------------------------------------------------ */

  if (animatedSections.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    animatedSections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------ */
  /* Text Reveal Animations                                                   */
  /* ------------------------------------------------------------------------ */

  const textRevealElements = document.querySelectorAll(
    "[data-text-reveal], [data-text-slide-left], [data-text-slide-right], [data-text-scale]"
  );

  if (textRevealElements.length > 0) {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          } else {
            entry.target.classList.remove("revealed");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-50px",
      }
    );

    textRevealElements.forEach((element) => textObserver.observe(element));
  }

  /* ------------------------------------------------------------------------ */
  /* GSAP ScrollTrigger Card Stack Animation                                 */
  /* ------------------------------------------------------------------------ */

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const stackCards = document.querySelectorAll("[data-stack-card]");
    
    if (stackCards.length > 0) {
      stackCards.forEach((card, index) => {
        const isLast = index === stackCards.length - 1;
        
        // Simple ScrollTrigger for each card
        ScrollTrigger.create({
          trigger: card,
          start: "top 160px",
          end: isLast ? "bottom 160px" : "bottom 80px",
          scrub: 0.5,
          onEnter: () => {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              y: 0,
              rotationX: 0,
              filter: "brightness(1)",
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            if (!isLast) {
              gsap.to(card, {
                scale: 0.92,
                opacity: 0,
                y: -60,
                rotationX: 6,
                filter: "brightness(0.85)",
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
          onEnterBack: () => {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              y: 0,
              rotationX: 0,
              filter: "brightness(1)",
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              scale: 0.96,
              opacity: 0.9,
              y: 10,
              filter: "brightness(0.95)",
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      });

      // Refresh ScrollTrigger after load
      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });
    }
  } else {
    console.warn("[fr0strated] GSAP or ScrollTrigger not loaded. Card animations disabled.");
  }

  /* ------------------------------------------------------------------------ */
  /* Timeline Flowchart Animation                                             */
  /* ------------------------------------------------------------------------ */

  const timeline = document.querySelector("[data-timeline]");
  const timelineProgress = document.querySelector("[data-timeline-progress]");
  const timelineItems = document.querySelectorAll("[data-timeline-item]");

  if (timeline && timelineProgress && timelineItems.length > 0) {
    // Animate the progress line based on scroll
    window.addEventListener("scroll", () => {
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      
      // Calculate progress percentage
      const scrollStart = windowHeight * 0.8;
      const progress = Math.max(0, Math.min(1, (scrollStart - timelineTop) / (timelineHeight * 0.9)));
      
      // Update progress line height
      timelineProgress.style.height = `${progress * 100}%`;
    }, { passive: true });

    // Reveal timeline items as they come into view
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-150px",
      }
    );

    timelineItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Skill Card Flip Animation & Content Cycling                             */
  /* ------------------------------------------------------------------------ */

  const skillCard = document.querySelector("[data-skill-card]");
  const skillIcon = skillCard ? skillCard.querySelector("[data-skill-icon]") : null;
  const skillTitle = skillCard ? skillCard.querySelector("[data-skill-title]") : null;
  const skillTags = skillCard ? skillCard.querySelector("[data-skill-tags]") : null;

  if (skillCard && skillIcon && skillTitle && skillTags) {
    const skills = [
      {
        icon: "ri-code-s-slash-line",
        title: "Frontend",
        tags: ["React", "TypeScript", "Next.js", "Tailwind"],
      },
      {
        icon: "ri-server-line",
        title: "Backend",
        tags: ["Node.js", "Python", "FastAPI", "PostgreSQL"],
      },
      {
        icon: "ri-bar-chart-box-line",
        title: "Data Science",
        tags: ["Python", "R", "TensorFlow", "Pandas"],
      },
    ];

    let currentIndex = 0;

    function updateSkillCard() {
      currentIndex = (currentIndex + 1) % skills.length;
      const skill = skills[currentIndex];

      // Wait for the card to be halfway through the flip (perpendicular to viewer)
      setTimeout(() => {
        // Update icon
        skillIcon.querySelector("i").className = skill.icon;

        // Update title
        skillTitle.textContent = skill.title;

        // Update tags
        skillTags.innerHTML = skill.tags
          .map((tag) => `<span>${tag}</span>`)
          .join("");
      }, 1000); // Change content 1 second into the flip (when card is sideways)
    }

    // Trigger content change every 4 seconds
    setInterval(updateSkillCard, 4000);
  }

  /* ------------------------------------------------------------------------ */
  /* Contact form                                                             */
  /* ------------------------------------------------------------------------ */

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const entries = Object.fromEntries(formData.entries());

      // Fake submission – replace with actual request integration when ready.
      console.info("[fr0strated] Contact form submission:", entries);

      contactForm.reset();
      if (formMessage) {
        formMessage.hidden = false;
        setTimeout(() => {
          formMessage.hidden = true;
        }, 4000);
      }
    });
  }
})();

