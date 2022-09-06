const container = document.querySelector(".container");
const images = document.querySelectorAll(".slider img");
const slider = document.querySelector(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const sliderCounter = document.querySelector(".sliderCounter");
const range = document.getElementById('myRange')
const audiolink = 'https://res.cloudinary.com/nzmai/video/upload/v1605698209/errorsound_jxtmqg.mp3'



const imageWidth = slider.clientWidth;
playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
let counter = 0;
let isPlayed = false;
let intervalId;
let defaultSpeed = 1500;

range.addEventListener('change',(e) => {
  isPlayed = !isPlayed
  const val = Number(e.target.value);
  if (val === 1) {
    defaultSpeed = 1500 / val
  } else if (val === 2) {
  defaultSpeed = 1500 / val
  } else if (val === 3)
  
  console.log(defaultSpeed);
  
})

const transitionImage = ({
  transMode = "ease-in-out",
  transSpeed = 0.4,
  offset = 0,
}) => {
  slider.style.transition = `transform ${transSpeed}s ${transMode}`;
  slider.style.transform = `translateX(${offset}px)`;
};

playBtn.addEventListener("click", () => {
  new Audio(audiolink).play()
  isPlayed = !isPlayed;
  playBtn.innerHTML = isPlayed
    ? '<i class="fa fa-stop" aria-hidden="true"></i>'
    : '<i class="fa fa-play" aria-hidden="true"></i>';
  if (isPlayed) {
    intervalId = setInterval(() => {
      if (counter < images.length) {
        transitionImage({
          transSpeed: 0.6,
          transMode: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          offset: -imageWidth * counter,
        });
        sliderCounter.textContent = `${counter + 1}/${images.length}`
        counter++;
      } else {
        counter = 0;
      }
    }, defaultSpeed);
  } else {
    clearInterval(intervalId);
  }
});

nextBtn.addEventListener("click", () => {
  if (counter >= images.length - 1) {
    counter = 0;
    transitionImage({
      transSpeed: 0.3,
      transMode: "ease-in-out",
      offset: 0,
    });
  } else {
    counter++;
    transitionImage({
      transSpeed: 0.6,
      transMode: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      offset: -imageWidth * counter,
    });
  }
  sliderCounter.textContent = `${counter + 1}/${images.length}`
});

prevBtn.addEventListener("click", () => {
  if (counter < 1) {
    counter = images.length - 1;
    transitionImage({
      transSpeed: 0.4,
      transMode: "ease",
      offset: -imageWidth * counter,
    });
  } else {
    counter--;
    transitionImage({
      transSpeed: 0.2,
      transMode: "ease-in-out",
      offset: -imageWidth * counter,
    });
  }
  sliderCounter.textContent = `${counter + 1}/${images.length}`
});

sliderCounter.textContent = `${counter + 1}/${images.length}`