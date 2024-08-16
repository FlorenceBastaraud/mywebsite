document.addEventListener('DOMContentLoaded', (e) => {


  // horizontal scrolling
  const mainWrapper = document.querySelector('main');

  mainWrapper.addEventListener('wheel', (e) => {
    
    if(screen.width > 666){

      e.preventDefault();

      let currentShownElement = e.target.getAttribute('id');

      document.querySelector('body').setAttribute('view', currentShownElement);
      mainWrapper.setAttribute('view', currentShownElement);

      if(e.deltaY > 0){
        mainWrapper.scrollLeft += screen.width;
      } else {
        mainWrapper.scrollLeft -= screen.width;      
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
  



});