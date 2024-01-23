const accessKey = 'QWFxqc-GzSUSNUUSSq9Y2CA0ahEURdbVJVCnImj-x-Y';
const imageContainer = document.querySelector('.img-container');
const background = document.querySelector('.outer-div');
const form = document.getElementById('form');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentIndex = 0;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let query = e.target.input.value;
    search(query);
});

prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + imageContainer.children.length) % imageContainer.children.length;
    updateBackground(currentIndex);
});

nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % imageContainer.children.length;
    updateBackground(currentIndex);
});

const search = async (queryParam) => {
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${queryParam}&client_id=${accessKey}`);
    let data = await response.json();

    imageContainer.innerHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let img = document.createElement('img');
        img.src = data.results[i].urls.regular;
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
    background.style.backgroundImage = `url(${imageContainer.children[index].src})`;
}
