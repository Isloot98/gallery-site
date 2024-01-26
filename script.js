const accessKey = 'QWFxqc-GzSUSNUUSSq9Y2CA0ahEURdbVJVCnImj-x-Y';
const imageContainer = document.querySelector('.img-container');
const background = document.querySelector('.outer-div');
const liveRegion = document.getElementById('live-region');
const accept = document.getElementById('accept-cookies');
const decline = document.getElementById('decline-cookies');
const cookieNotice = document.getElementById('cookie-notice');
const form = document.getElementById('form');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const checkBox = document.getElementById('checkbox');
const switchSlider = document.getElementById('switch');
const message = document.getElementById('message');
let currentIndex = 0;

const announcer = document.createElement('div');
announcer.id = 'announcer';
announcer.setAttribute('role', 'status');
announcer.setAttribute('aria-live', 'assertive');
announcer.setAttribute('aria-atomic', 'true');
document.body.appendChild(announcer);


const submitSearch = () => {
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let query = e.target.input.value;
    searchAndDisplay(query);
});
};

submitSearch();

const makeArrowButtonsWork = () => {
prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + imageContainer.children.length) % imageContainer.children.length;
    updateBackground(currentIndex);
});

nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % imageContainer.children.length;
    updateBackground(currentIndex);
});
}

makeArrowButtonsWork();
const searchAndDisplay = async (queryParam) => {
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${queryParam}&client_id=${accessKey}`);
    let data = await response.json();
    console.log(data);

    imageContainer.innerHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let img = document.createElement('img');
        img.src = data.results[i].urls.regular;
        img.alt = data.results[i].alt_description;
        imageContainer.appendChild(img);

        img.addEventListener('click', function (e) {
            e.preventDefault();
            currentIndex = i;
            updateBackground(currentIndex);
        });

        if (i === 0) {
            updateBackground(i);
        }
    }

    
};

const updateBackground = (index) => {
    const selectedImage = imageContainer.children[index];

    background.style.backgroundImage = `url(${imageContainer.children[index].src})`;

    announcer.textContent = `Image ${index + 1}: ${selectedImage.alt}`;


}



const lemmeStyleTheImageContainerAndMakeTheArrowsWork = () => {

   imageContainer.addEventListener('click', function(event) {
    const clickedImage = event.target;
    const allImages = imageContainer.querySelectorAll('img');
    allImages.forEach(image => image.classList.remove('selected'));

    clickedImage.classList.add('selected');

    
})
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        const previousIndex = currentIndex;
        clickedImage = imageContainer.children[previousIndex];
        clickedImage.classList.remove('selected');

        if (event.code === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageContainer.children.length;
        } else if (event.code === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageContainer.children.length) % imageContainer.children.length;
        }

        clickedImage = imageContainer.children[currentIndex];
        clickedImage.classList.add('selected');

        updateBackground(currentIndex);
    }
})
};



 lemmeStyleTheImageContainerAndMakeTheArrowsWork()




accept.addEventListener('click', () => {
    cookieNotice.style.display = 'none';
    console.log('accepted');
    document.cookie = 'cookieAccepted=true';
  });
  
  decline.addEventListener('click', () => {
    cookieNotice.style.display = 'none';
    console.log('declined');
    document.cookie = 'cookieAccepted=false';
  });
  
  if (document.cookie.includes('cookieAccepted=true')) {
    cookieNotice.style.display = 'none';
  }

  if (document.cookie === 'cookieAccepted=true') {
    search(queryParam);
};




const toggleDarkMode = () => {
    console.log('Toggle Dark Mode function called');

switchSlider.addEventListener('click', () => {
    checkBox.checked = !checkBox.checked;
    if (checkBox.checked) {
        document.cookie = 'darkMode=true';
        document.body.style.backgroundColor = '#000000';
       document.body.style.color = '#ffffff';
       message.style.color = '#ffffff';
       imageContainer.style.border = '1px solid #ffffff';
       cookieNotice.style.color = '#000000'


      
    } else {
        
      document.cookie = 'darkMode=false';
      document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    message.style.color = '#000000';
    background.style.boxShadow = '0 0 10px 000000';
    imageContainer.style.border = '1px solid #000000';
    }
});

if (document.cookie.includes('darkMode=true')) {
    checkBox.checked = true;
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    cookieNotice.style.color = '#000000'

} else if (document.cookie.includes('darkMode=false')) {
    checkBox.checked = false;
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    background.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';

}

}
