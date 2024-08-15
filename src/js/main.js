document.addEventListener('DOMContentLoaded', (e) => {

  const mainWrapper = document.querySelector('main');

  mainWrapper.addEventListener('wheel', (e) => {
    
    e.preventDefault();

    let currentShownElement = e.target.getAttribute('id');

    document.querySelector('body').setAttribute('view', currentShownElement);
    mainWrapper.setAttribute('view', currentShownElement);

    if(e.deltaY > 0){
      mainWrapper.scrollLeft += screen.width;
    } else {
      mainWrapper.scrollLeft -= screen.width;      
    }
    

  });

});