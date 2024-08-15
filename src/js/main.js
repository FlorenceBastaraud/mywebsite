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




  // experiences
  const displayExperiences = async () => {

    const url = location.origin;
    const response = await fetch(`${url}/src/data/experiences.json`);
    const experiences = await response.json();

    console.log(experiences);
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


    experiencesListWrapper.innerHTML = experiencesItems;

  } 

  displayExperiences();
  



});