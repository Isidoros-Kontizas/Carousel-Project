// Making variables and selecting track (container that holds the slides)
const track = document.querySelector(".carousel__track");

// Making variables for the slides to an array with array.from
const slides = Array.from(track.children);

// Making variables for the buttons (right and left) - (next and previous)
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const toggleButton = document.querySelector(".carousel__button--toggle");

// Making variables for the timer input field (range slider)
const timerInput = document.querySelector("#timer");
const timerValueDisplay = document.querySelector("#timerValue");

// Making variables for the navigation dots and converting them to an array
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

// Setting the width of a slide to know how much to move the carousel
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrow Function
// Positioning each slide in the correct horizontal position.
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// Arrow Function
// Moving the carousel to the desired slide.
const moveToSlide = (track, currentSlide, targetSlide) => {
  if (!targetSlide) return;
  track.style.transform = "translateX(-" + targetSlide.style.left + " )";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// Arrow Function
// Updating the dots to active to show the active current dot
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// Arrow Function
// Hide the arrows when the slides are in the start & in the end of the array.
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden"); // Hide previous button
    nextButton.classList.remove("is-hidden"); // Show next button
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden"); // Show previous button
    nextButton.classList.add("is-hidden"); // Hide next button
  } else {
    prevButton.classList.remove("is-hidden"); // Show previous and next button
    nextButton.classList.remove("is-hidden");
  }
};

// Arrow Function / Click Event
// Moving to the left the slide with previous button
prevButton.addEventListener("click", (e) => {
  pauseCarousel(); // Pause the carousel immediately

  const currentSlide = track.querySelector(".current-slide"); //Current Slide
  const prevSlide =
    currentSlide.previousElementSibling || slides[slides.length - 1]; //Previous Slide
  const currentDot = dotsNav.querySelector(".current-slide"); //Current Dot
  const prevDot = currentDot.previousElementSibling || dots[dots.length - 1]; //Previous Dot
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide); // Move to previous Slide
  updateDots(currentDot, prevDot); //Update Dots
  /* hideShowArrows(slides, prevButton, nextButton, prevIndex); */ // Hide & Show Arrows

  // Start autoplay again after 5 seconds
  setTimeout(() => {
    // Ensure autoplay is allowed to start again
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime); // Restart interval

      // Update the toggle button image to show play
      toggleButton.innerHTML = `<img src="/images/pause-solid.svg" alt="Pause" class="toggle-icon" />`;
    }
  }, 5000); // 5000ms = 5 seconds
});

// Arrow Function / Click Event
// Moving to the right the slide with nextbutton
nextButton.addEventListener("click", (e) => {
  pauseCarousel(); // Pause the carousel immediately

  const currentSlide = track.querySelector(".current-slide"); //Current Slide
  const nextSlide = currentSlide.nextElementSibling || slides[0]; // Next Slide
  const currentDot = dotsNav.querySelector(".current-slide"); //Current Dot
  const nextDot = currentDot.nextElementSibling || dots[0]; // Next Dot
  const nextIndex = slides.findIndex((slide) => slide === nextSlide); // Δείκτης του επόμενου slide

  moveToSlide(track, currentSlide, nextSlide); // Move to next slide
  updateDots(currentDot, nextDot); //Update Dots
  /* hideShowArrows(slides, prevButton, nextButton, nextIndex); */ // Hide & Show Arrows

  // Start autoplay again after 5 seconds
  setTimeout(() => {
    // Ensure autoplay is allowed to start again
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime); // Restart interval

      // Update the toggle button image to show play
      toggleButton.innerHTML = `<img src="/images/pause-solid.svg" alt="Pause" class="toggle-icon" />`;
    }
  }, 5000); // 5000ms = 5 seconds
});

// Arrow Function / Click Event
// Moving to the selected slide with the dots
dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button"); // Finds the dot that clicked
  if (!targetDot) return;

  pauseCarousel(); // Pause the carousel immediately

  const currentSlide = track.querySelector(".current-slide"); // Current Slide
  const currentDot = dotsNav.querySelector(".current-slide"); // Current Dot
  const targetIndex = dots.findIndex((dot) => dot === targetDot); // Showing dot that clicked
  const targetSlide = slides[targetIndex]; // Showing Slide with the Current clicked Dot

  moveToSlide(track, currentSlide, targetSlide); // Move to the the clicked Slide
  updateDots(currentDot, targetDot); // Update Dots
  /* hideShowArrows(slides, prevButton, nextButton, targetIndex); */ // Hide & Show Arrows

  // Start autoplay again after 5 seconds
  setTimeout(() => {
    // Ensure autoplay is allowed to start again
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime); // Restart interval

      // Update the toggle button image to show play
      toggleButton.innerHTML = `<img src="/images/pause-solid.svg" alt="Pause" class="toggle-icon" />`;
    }
  }, 5000); // 5000ms = 5 seconds
});

// Setting default Interval
let myInterval;
let intervalTime = 3000; // Initial interval time is 3 seconds

function startInterval(mSeconds = intervalTime) {
  if (!myInterval) {
    myInterval = setInterval(showNext, mSeconds);
  }
}
// Setting the interval to stop and clear interval
function stopInterval() {
  clearInterval(myInterval);
  myInterval = null;
}

function showNext() {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0];
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  /* hideShowArrows(slides, prevButton, nextButton, nextIndex); */
}

// Starting default intervaltime
startInterval(intervalTime);

// Arrow Function / Click Event
// Toggle Play/Pause Button with one image and changing the image of the play button
let autoPlayActive = true;

toggleButton.addEventListener("click", () => {
  if (autoPlayActive) {
    stopInterval();
    toggleButton.innerHTML = `<img src="/images/play-solid.svg" alt="Play" class="toggle-icon" />`;
  } else {
    startInterval(intervalTime);
    toggleButton.innerHTML = `<img src="/images/pause-solid.svg" alt="Pause" class="toggle-icon" />`;
  }

  autoPlayActive = !autoPlayActive;
});

// Arrow Function
// Stopping the interval when there is a manual change and changes the image to Play
const pauseCarousel = () => {
  stopInterval();
  autoPlayActive = false;
  toggleButton.innerHTML = `<img src="/images/play-solid.svg" alt="Play" class="toggle-icon" />`;
};

// Arrow Function / Range Bar event input
// Updating the interval time when the input changes from the range bar
timerInput.addEventListener("input", (e) => {
  intervalTime = parseInt(e.target.value, 10); // Take the user value from the range bar and convert it from string to a number
  timerValueDisplay.textContent = intervalTime + " ms"; // Updating the label showing under range bar
  if (autoPlayActive) {
    stopInterval();
    startInterval(intervalTime);
  }
});
