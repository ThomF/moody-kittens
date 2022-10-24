let kittens = [];
let tolerance = 0;
let maxTolerance = 10;
let minTolerance = -1;
let mood = 1;
let maxMood = 4;
let minMood = 0;

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */

function addKitten(event) {
  event.preventDefault();
  let form = event.target;

  let kitten = {
    id: generateId(),
    name: form.name.value,
    tolerance: 1,
    mood: 1,
  };

  if (kittens.findIndex((finding) => finding.name == kitten.name) != -1) {
    alert("Name exist");
    form.reset();
  } else {
    kittens.push(kitten);
    form.reset();
    drawKittens();
  }
  saveKittens();
  form.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */

function drawKittens() {
  let kittenListElement = document.getElementById("kitten-list");
  let kittenTemplate = "";

  kittens.forEach((kitten) => {
    let moodClass = "";
    console.log("kitten", kitten);
    if (kitten.mood == 3) {
      moodClass = "kittenAngry";
    }
    if (kitten.mood == 2) {
      moodClass = "kittenTolerant";
    }
    if (kitten.mood == 1) {
      moodClass = "kittenHappy";
    }
    /** TODO -- removed this so you cant see mood <p>mood Level: ${kitten.mood} </p> */
    kittenTemplate += `
    <div id="kitten-${kitten.id}" class="d-flex d-flex.justify-content-center flex-wrap
    ${moodClass}">
    <header>
      <h3>${kitten.name}</h3>
      </header>
      <img id="kittenPix" class="kittenImage" src="KittensIMG/MoodyKitten1.png" alt="kitten image"></img>
      <div class="content">
     
      <p>Head scratch ${kitten.tolerance} </p>
      <button type="button" onclick="pet('${kitten.id}')">Pet</button>
      <button type="button" onclick="catnip('${kitten.id}')">catnip</button>
      <button type="button" onclick="removeKitten('${kitten.id}')">Free Cat</button>
      </div>
    </div>
    `;
  });

  kittenListElement.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  kittens.forEach((kitten) => {
    if (kitten.id == id) {
      kitten.tolerance = kitten.tolerance + 1;
    }
  });

  /*setKittenMood();*/
  console.log("kittens", kittens);
  checkMood();
  checkMoodMax();
  checkMinMood();
  saveKittens();
}
function checkMood() {
  kittens.forEach((kitten) => {
    if (kitten.tolerance >= maxTolerance) {
      console.log("mood change");
      kitten.mood = kitten.mood + 1;
      kitten.tolerance = 0;
    }
  });
}
function checkMoodMax() {
  kittens.forEach((kitten) => {
    if (kitten.mood == maxMood) {
      removeKitten();
    }
  });
}
function checkMinMood() {
  kittens.forEach((kitten) => {
    if (kitten.mood <= minMood) {
      kitten.mood = kitten.mood + 1;
    }
  });
}
/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  kittens.forEach((kitten) => {
    if (kitten.id == id) {
      kitten.tolerance = kitten.tolerance - 5;
    }
  });
  console.log("kittens", kittens);
  catnipMood();
  checkMinMood();
  saveKittens();
}
function catnipMood() {
  kittens.forEach((kitten) => {
    if (kitten.tolerance <= minTolerance) console.log("mood change");
    kitten.mood = kitten.mood - 1;
    kitten.tolerance = 0;
  });
}
function removeKitten(id) {
  let index = kittens.findIndex((kitten) => kitten.id == id);
  if (index == -1);
  kittens.splice(index, 1);
  saveKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (tolerance >= maxTolerance) {
    console.log("mood");
    let kittenElement = document.getElementById("kitten");

    kittenElement.classList.add("kittenAngry");
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  arr.splice(0, arr.length);
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log("Good Luck, Take it away");
  document.getElementById("get-started").classList.add("hidden");
  document.getElementById("add-kitten").classList.remove("hidden");
}
function catBtn() {
  document.getElementById("add-kitten").classList.add("hidden");
}
function addKtn() {
  document.getElementById("add-kitten").classList.remove("hidden");
  console.log("Good Luck, Take it away");
}
function cancel() {
  document.getElementById("add-kitten").classList.add("hidden");
}
// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens();
drawKittens();
