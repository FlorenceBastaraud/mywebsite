// animations
window.addEventListener('load', () => {
  const tl = gsap.timeline()
  const ball = '.preload-ball'
  const playground = '.preload-playground'
  const workTitle = '.content__work-title'
  const nav = '.header__content--nav'
  const socials = '.footer__content--links'
  const copyr = '.footer__content--copyrights'
  const logo = '.header__content--logo'
  const heroIllust = '#hero-illust'
  const particles = '#particles-js'
  const speechBubble = '.illust__speech-bubble'

  tl.to(ball, {
    y: '80vh',
    scale: 1,
    duration: 2,
    ease: 'bounce.out',
  })

  tl.to(
    ball,
    {
      x: '110vw',
      duration: 3,
      ease: 'power1.inOut',
    },
    'preload'
  )

  tl.to(
    ball,
    {
      backgroundColor: '#070707',
      duration: 1.5,
      ease: 'power1.inOut',
      onComplete: () => {
        document.querySelector(ball).style.display = 'none'
      },
    },
    'preload'
  )

  tl.to(
    playground,
    {
      x: '-110vw',
      duration: 3,
      ease: 'power1.inOut',
      onComplete: () => {
        document.querySelector(playground).style.display = 'none'
      },
    },
    'preload'
  )

  tl.to(
    heroIllust,
    {
      duration: 4,
      rotationY: 360,
      ease: 'power2.out',
    },
    'preload'
  )

  tl.to(
    workTitle,
    {
      left: 0,
      opacity: 1,
      duration: 2,
      ease: 'power1.out',
    },
    'preload'
  )

  tl.to(
    nav,
    {
      opacity: 1,
      duration: 1,
      ease: 'sine.out',
    },
    'hero2'
  )

  tl.to(
    socials,
    {
      opacity: 1,
      duration: 0.5,
      ease: 'sine.out',
    },
    'hero2'
  )

  tl.to(
    particles,
    {
      opacity: 1,
      duration: 0.5,
      ease: 'sine.out',
    },
    'hero2'
  )

  tl.to(speechBubble, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'elastic.out(1, 0.75)',
  })

  tl.to(copyr, {
    opacity: 1,
    duration: 0.5,
    ease: 'sine.out',
  })

  tl.to(logo, {
    opacity: 1,
    duration: 0.5,
    ease: 'sine.out',
  })

  gsap.registerPlugin(ScrollTrigger)
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 2%',
          scrub: 1,
          markers: false,
          onEnter: () => {
            gsap.set(section, { clearProps: 'all' })
          },
          onLeaveBack: () => {
            gsap.to(section, { opacity: 0, y: 50, scale: 0.9, duration: 0.5 })
          },
        },
      }
    )
  })
})

// remove footer fixed position on scroll
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer')

  function handleFooterPosition() {
    if (window.scrollY > 100) {
      footer.style.position = 'relative'
    } else {
      if (window.innerWidth > 760) {
        footer.style.position = 'fixed'
      } else {
        footer.style.position = 'relative'
      }
    }
  }

  window.addEventListener('scroll', handleFooterPosition)
  window.addEventListener('resize', handleFooterPosition)
})

// particles
window.addEventListener('DOMContentLoaded', () => {
  const particleColor = '#FFF'
  const particleShapeStokeColor = '#000'
  const particleLineLinkedColor = '#FFF'

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 70,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: particleColor,
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: particleShapeStokeColor,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: particleLineLinkedColor,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  })
})

// data displays
document.addEventListener('DOMContentLoaded', () => {
  const mainWrapper = document.querySelector('main')
  const projectsWrapper = document.getElementById('projects')

  // skills
  const displayskills = async () => {
    const url = location.origin
    const response = await fetch(`${url}/src/data/skills.json`)
    const skills = await response.json()

    const frontSkillsListWrapper = document.getElementById(
      'skills__front--list'
    )
    let frontSkillsItems = ``

    skills.front.map((skill) => {
      frontSkillsItems += `<li class="skill">${skill}</li>`
    })

    frontSkillsListWrapper.innerHTML += frontSkillsItems

    const backSkillsListWrapper = document.getElementById('skills__back--list')
    let backSkillsItems = ``

    skills.back.map((skill) => {
      backSkillsItems += `<li class="skill">${skill}</li>`
    })

    backSkillsListWrapper.innerHTML += backSkillsItems

    const moreSkillsListWrapper = document.getElementById('skills__more--list')
    let moreSkillsItems = ``

    skills.more.map((skill) => {
      moreSkillsItems += `<li class="skill">${skill}</li>`
    })

    moreSkillsListWrapper.innerHTML += moreSkillsItems
  }

  displayskills()

  // experiences
  const displayExperiences = async () => {
    const url = location.origin
    const response = await fetch(`${url}/src/data/experiences.json`)
    const experiences = await response.json()

    const experiencesListWrapper = document.getElementById('experiences-list')
    let experiencesItems = ``

    experiences.data.map((experience) => {
      const { date, society, description } = experience

      experiencesItems += `

            <div class="experiences__item">
              <h3 class="experiences__item--society">
                <i class="fas fa-network-wired icon"></i>
                <span>${society}</span>
              </h3>
              <div class="experiences__item--date">${date}</div>
              <p class="experiences__item--description">${description}</p>
            </div>
      
      `
    })

    experiencesListWrapper.innerHTML += experiencesItems
  }

  // displayExperiences()

  // education
  const displayEducation = async () => {
    const url = location.origin
    const response = await fetch(`${url}/src/data/education.json`)
    const education = await response.json()

    const educationListWrapper = document.getElementById('education-list')
    let educationItems = ``

    education.data.map((education) => {
      const { date, title, description, mention } = education

      educationItems += `

            <div class="education__item">
              <h3 class="education__item--title">
                <i class="fas fa-network-wired icon"></i>
                <span>${title}</span>
              </h3>
              <div class="education__item--date">${date}</div>
              <p class="education__item--description">${description}</p>
              <span class="education__item--mention">${mention}</span>

            </div>
      
      `
    })

    educationListWrapper.innerHTML += educationItems
  }

  // displayEducation()

  // career tabs
  document.querySelectorAll('.career-tabs__item').forEach((tabItem) => {
    tabItem.addEventListener('click', (e) => {
      let currentTabItem = e.target.getAttribute('data-career')

      if (currentTabItem == 'experiences') {
        document
          .getElementById('experiences-list')
          .classList.remove('display-none')
        document.getElementById('education-list').classList.add('display-none')
        document
          .querySelector('.career-tabs__item[data-career="experiences"]')
          .classList.add('active')
        document
          .querySelector('.career-tabs__item[data-career="education"]')
          .classList.remove('active')
      } else if (currentTabItem == 'education') {
        document
          .getElementById('education-list')
          .classList.remove('display-none')
        document
          .getElementById('experiences-list')
          .classList.add('display-none')
        document
          .querySelector('.career-tabs__item[data-career="experiences"]')
          .classList.remove('active')
        document
          .querySelector('.career-tabs__item[data-career="education"]')
          .classList.add('active')
      }
    })
  })

  // projects
  const displayProjects = async (tech = 'all') => {
    const url = location.origin
    const response = await fetch(`${url}/src/data/projects.json`)
    const projects = await response.json()
    const projectsSelected = []
    projects.data.map((project) => {
      if (tech !== 'all') {
        if (project.technologies.tags.includes(tech)) {
          projectsSelected.push(project)
        }
      } else {
        projectsSelected.push(project)
      }
    })

    const projectsListWrapper = document.querySelector('.projects__flux')
    let projectsItems = ``

    projectsSelected.map((project) => {
      const { name, description, thumbnail, technologies } = project

      const github = project.github
        ? `<a href="${project.github}" class="github secondary-cta" title="View project files" target="_blank">Git</a>`
        : ``
      const link = project.link
        ? `<a href="${project.link}" class="live primary-cta" title="View live" target="_blank">Live</a>`
        : ``

      projectsItems += `

            <div class="projects__flux--item">

              <div class="image">
                <img src="${url}/src/images/projects/${thumbnail}" alt="${name}">
              </div>

              <div class="content">

                <div class="content__infos">
                  <h3 class="content__infos--name">${name}</h3>
                  <p class="content__infos--description">${description}</p>
                  <h5 class="content__infos--stack"><span class="label">Stack: </span>${technologies.string}</h5>
                </div>

                <div class="content__links">
                  ${github}
                  ${link}
                </div>

              </div>

            </div>
      
      `
    })

    projectsListWrapper.innerHTML = projectsItems
  }

  displayProjects()

  // projects filters
  const displayFilters = async () => {
    const url = location.origin
    const response = await fetch(`${url}/src/data/projects.json`)
    const projects = await response.json()

    const projectsFiltersListWrapper = document.querySelector(
      '.projects__filters--list'
    )
    let projectsFiltersItems = ``

    const filtersValues = []

    projects.data.map((project) => {
      project.technologies.tags.map((technology) => {
        filtersValues.push(technology)
      })
    })

    const filters = Array.from(new Set(filtersValues)).sort()

    projectsFiltersItems += `<li class="filter active" data-filter="all">all</li>`

    filters.map((filter) => {
      if (filter !== 'prestashop') {
        projectsFiltersItems += `<li class="filter" data-filter="${filter}">${filter}</li>`
      }
    })

    projectsFiltersListWrapper.innerHTML = projectsFiltersItems

    const filterElements = document.querySelectorAll('.filter')

    filterElements.forEach((filter) => {
      filter.addEventListener('click', (e) => {
        let currFilter = e.target.getAttribute('data-filter')

        e.target.classList.add('active')
        let otherFilters = document.querySelectorAll(
          `.filter:not([data-filter="${currFilter}"])`
        )

        otherFilters.forEach((otherFilter) => {
          otherFilter.classList.remove('active')
        })

        return displayProjects(currFilter)
      })
    })
  }

  displayFilters()

  // force open cv pdf in new window
  document.querySelector('.cv').addEventListener('click', (e) => {
    e.preventDefault()
    window.open(e.target.getAttribute('href'))
  })
})
