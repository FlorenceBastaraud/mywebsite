document.addEventListener('DOMContentLoaded', (e) => {


  // horizontal scrolling
  const mainWrapper = document.querySelector('main');
  const projectsWrapper = document.getElementById('projects');

  mainWrapper.addEventListener('wheel', (e) => {
        
    if(screen.width > 840){
      
      if(e.deltaY > 0){
              
        if(projectsWrapper.getBoundingClientRect().x == 0){
                    
          mainWrapper.classList.add('vertical-scroll');
          document.body.classList.add('vertical-scroll');
          document.querySelector('footer').classList.add('vertical-scroll');
          
        } else {
          
          e.preventDefault();
          mainWrapper.classList.remove('vertical-scroll');
          document.body.classList.remove('vertical-scroll');
          document.querySelector('footer').classList.remove('vertical-scroll');

          mainWrapper.scrollLeft += screen.width;

        }
        
      } else {

        
        if(projectsWrapper.getBoundingClientRect().top > 0){
          mainWrapper.classList.remove('vertical-scroll');
          document.body.classList.remove('vertical-scroll');
          document.querySelector('footer').classList.remove('vertical-scroll');

          mainWrapper.scrollLeft -= screen.width;

        }
                

      }

    }

  });


  // skills
  const displayskills = async () => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/skills.json`);
    const skills = await response.json();

    const frontSkillsListWrapper = document.getElementById('skills__front--list');
    let frontSkillsItems = ``;

    skills.front.map(skill => {
      frontSkillsItems += `<li class="skill">${skill}</li>`;
    });

    frontSkillsListWrapper.innerHTML += frontSkillsItems;

    const backSkillsListWrapper = document.getElementById('skills__back--list');
    let backSkillsItems = ``;

    skills.back.map(skill => {
      backSkillsItems += `<li class="skill">${skill}</li>`;
    });

    backSkillsListWrapper.innerHTML += backSkillsItems;

    const moreSkillsListWrapper = document.getElementById('skills__more--list');
    let moreSkillsItems = ``;

    skills.more.map(skill => {
      moreSkillsItems += `<li class="skill">${skill}</li>`;
    });

    moreSkillsListWrapper.innerHTML += moreSkillsItems;

  } 

  displayskills();
  

  // experiences
  const displayExperiences = async () => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/experiences.json`);
    const experiences = await response.json();

    const experiencesListWrapper = document.getElementById('experiences-list');
    let experiencesItems = ``;

    experiences.data.map(experience => {

      const {date, society, description} = experience;

      experiencesItems += `

            <div class="experiences__item">
              <h4 class="experiences__item--society">
                <i class="fas fa-network-wired icon"></i>
                <span>${society}</span>
              </h4>
              <div class="experiences__item--date">${date}</div>
              <p class="experiences__item--description">${description}</p>
            </div>
      
      `;

    });


    experiencesListWrapper.innerHTML += experiencesItems;

  } 

  displayExperiences();


  // education
  const displayEducation = async () => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/education.json`);
    const education = await response.json();

    const educationListWrapper = document.getElementById('education-list');
    let educationItems = ``;

    education.data.map(education => {

      const {date, title, description, mention} = education;

      educationItems += `

            <div class="education__item">
              <h4 class="education__item--title">
                <i class="fas fa-network-wired icon"></i>
                <span>${title}</span>
              </h4>
              <div class="education__item--date">${date}</div>
              <p class="education__item--description">${description}</p>
              <span class="education__item--mention">${mention}</span>

            </div>
      
      `;

    });


    educationListWrapper.innerHTML += educationItems;

  } 

  displayEducation();


  // career tabs
  document.querySelectorAll('.career-tabs__item').forEach(tabItem => {
    
    tabItem.addEventListener('click', (e) => {

      let currentTabItem = e.target.getAttribute('data-career');
      
      if(currentTabItem == 'experiences'){

        document.getElementById('experiences-list').classList.remove('display-none');
        document.getElementById('education-list').classList.add('display-none');
        document.querySelector('.career-tabs__item[data-career="experiences"]').classList.add('active');
        document.querySelector('.career-tabs__item[data-career="education"]').classList.remove('active');

      } else if(currentTabItem == 'education') {

        document.getElementById('education-list').classList.remove('display-none');
        document.getElementById('experiences-list').classList.add('display-none');
        document.querySelector('.career-tabs__item[data-career="experiences"]').classList.remove('active');
        document.querySelector('.career-tabs__item[data-career="education"]').classList.add('active');


      }

    });
    
  })


  // projects
  const displayProjects = async (tech = 'all') => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/projects.json`);
    const projects = await response.json();
    const projectsSelected = [];
    projects.data.map(project => {
      if(tech !== 'all'){

        if(project.technologies.tags.includes(tech)){
            projectsSelected.push(project);
        }
    
      } else {
        projectsSelected.push(project);
      }

    });
        
    const projectsListWrapper = document.querySelector('.projects__flux');
    let projectsItems = ``;

    projectsSelected.map(project => {

      const {name, link, github, description, thumbnail, technologies} = project;

      projectsItems += `

            <div class="projects__flux--item">

              <div class="image">
                <img src="${url}/src/images/projects/${thumbnail}" alt="${name}">
              </div>

              <div class="content">

                <div class="content__infos">
                  <h4 class="content__infos--name">${name}</h4>
                  <p class="content__infos--description">${description}</p>
                  <h5 class="content__infos--stack"><span class="label">Stack: </span>${technologies.string}</h5>
                </div>

                <div class="content__links">
                  <a href="${github}" class="github secondary-cta" title="View project files" target="_blank">Git</a>
                  <a href="${link}" class="live primary-cta" title="View live" target="_blank">Live</a>
                </div>

              </div>

            </div>
      
      `;

    });


    projectsListWrapper.innerHTML = projectsItems;

  } 
  
  displayProjects();


  // projects filters
  const displayFilters = async () => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/projects.json`);
    const projects = await response.json();

    const projectsFiltersListWrapper = document.querySelector('.projects__filters--list');
    let projectsFiltersItems = ``;

    const filtersValues = [];

    projects.data.map(project => {
      
      project.technologies.tags.map(technology => {
        filtersValues.push(technology);
      });

    });

    const filters = Array.from(new Set(filtersValues)).sort();
    
    projectsFiltersItems += `<li class="filter active" data-filter="all">all</li>`;

    filters.map(filter => {
      if(filter !== 'prestashop'){
        projectsFiltersItems += `<li class="filter" data-filter="${filter}">${filter}</li>`;
      }
    })

    projectsFiltersListWrapper.innerHTML = projectsFiltersItems;

    


    const filterElements = document.querySelectorAll('.filter');
    
    filterElements.forEach(filter => {



      filter.addEventListener('click', (e) => {

        let currFilter = e.target.getAttribute('data-filter');

        e.target.classList.add('active');
        let otherFilters = document.querySelectorAll(`.filter:not([data-filter="${currFilter}"])`);
        
        otherFilters.forEach(otherFilter => {
            otherFilter.classList.remove('active');   
        })
        

        return displayProjects(currFilter);
        

      });
          
    })

  }

  displayFilters();


});