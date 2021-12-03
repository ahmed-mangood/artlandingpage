// Check If There's Local Storage Color Option

let mainColors = localStorage.getItem("color_option");

// console.log(mainColors);

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-color === Local Storage
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Random Background Option

let backgroundOpition = true;

// Variable To Control The Interval

let backgroundInterval;

// check if there's local storage random background item

let backgroundLocalStorage = localStorage.getItem("background_option");

if (backgroundLocalStorage !== null) {
  if (backgroundLocalStorage === "true") {
    backgroundOpition = true;
  } else {
    backgroundOpition = false;
  }
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active");
  });

  if (backgroundLocalStorage === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Sittings [ toggle Icon + Open Sittings  ]//

let rotat = document.querySelector(".toggle-sittings .fa-fw");

rotat.onclick = function() {
  // Add class fa-spin to rotat icon
  this.classList.toggle("fa-spin");

  // Add class open to open sittings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors

let colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {
  // Click On Every List Items
  li.addEventListener("click", e => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    activeHandle(e);

  });
});

// Switch Random Background Elements

let randomBackG = document.querySelectorAll(".random-background span");
// Loop On All List Items
randomBackG.forEach(span => {
  // Click On Every Span
  span.addEventListener("click", e => {
    
    activeHandle(e);

    if (e.target.dataset.random === "yes") {
      backgroundOpition = true;

      randomizeImage();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOpition = false;
      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});


// Select Landing Page Elements
let landPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgArray = [
  "background-one.png",
  "background-two.png",
  "background-three.png",
  "background-four.png",
  "background-five.png"
];

// Function To Random Imgs

function randomizeImage() {
  if (backgroundOpition === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgArray.length);

      // Chanage Background Image Url

      landPage.style.backgroundImage =
        'url("/img/' + imgArray[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImage();

// Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > 800) {
    let allSkills = document.querySelectorAll(
      ".skills-box .skill-progress span"
    );

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
  img.addEventListener("click", e => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To Popup Box
    popupBox.className = "popup-box";

    // Type alt text in header of img

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let textHeading = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(textHeading);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image TO Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box TO Body
    document.body.appendChild(popupBox);

    // create close span
    let closeButton = document.createElement("span");

    // create the close button text
    let closeButtonText = document.createTextNode("x");

    // append text to close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to popup box
    popupBox.appendChild(closeButton);
  });
});

// close the popup
document.addEventListener("click", function(e) {
  if (e.target.className == "close-button") {
    // Remove The Popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Start Hover on feat-box effects
let featBox = document.querySelectorAll(".features .feat-box");

featBox.forEach(box => {
  box.onmouseover = function () {
    box.style = "transition: 1s; background-color: #f5f5f5";
    box.lastElementChild.style = "transition: 1s; color: #000";
  }
  box.onmouseout = function () {
    box.style = "transition: 1s; background-color: white";
    box.lastElementChild.style = "transition: 1s; color: #8a8a8a";
  }
});
// End Hover on feat-box effects

// Select All Bullets To Make Scroll Smoth
let allbullets = document.querySelectorAll(".nav-bullets .bullets");

allbullets.forEach(bullet => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Function To handle Active Class
function activeHandle(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  // Add Active Class on Self
  ev.target.classList.add("active");
}

// Show And Hide Bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach(span => {

  span.addEventListener("click", (e) => {

    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
    } else {
      bulletsContainer.style.display = "none";
    }
    activeHandle(e);
  });
});

// Reset Option

document.querySelector(".reset-options").onclick = function () {
  // Clear Local Storage
  localStorage.clear();
  // Reload Page
  window.location.reload();
};

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop The Propagation
  e.stopPropagation();

  // Add Class Menu-active To show The line
  this.classList.toggle("menu-active");
  // Add Class Open To Show The Toggle Menu
  tLinks.classList.toggle("open");
};
 // Stop Propagation For The Links
tLinks.onclick = function (e) {
  e.stopPropagation();
}

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      // Add Class Menu-active To show The line
      toggleBtn.classList.toggle("menu-active");
      // Add Class Open To Show The Toggle Menu
      tLinks.classList.toggle("open");
    }
  }
})

