const inputs = document.getElementById("inputs");

// outsource to server
const secret = "GUESS";
let turns = 5;

inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;

  if (val !== "") {
    const next = target.nextElementSibling;
    next.disabled = false;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    const prev = target.previousElementSibling;

    if (prev) {
      prev.focus();
    }
    return;
  }

  if (key == "enter") {
    if (turns === 0) {
      alert("You have no more turns left");
      return;
    }

    const guess = getGuess();

    if (guess.length < 5) {
      alert("Please fill all the inputs");
      return;
    }

    addGuessToHistory(guess);
    if (guess.toLowerCase() === secret.toLowerCase()) {
      inputs.style.display = "none";
      if (
        confirm("You have guessed the secret word. Press OK to reload the page")
      ) {
        location.reload();
      }
    }
    clearInputs();
    inputs.firstElementChild.focus();
    turns -= 1;
  }
});

function getGuess() {
  return Array.from(inputs.children)
    .map((i) => i.value)
    .join("");
}

function addGuessToHistory(guess) {
  const history = document.getElementById("js-guess");

  const guessElement = document.createElement("div");
  guessElement.classList.add("c-guess-container");

  let targetCopy = secret.toLowerCase();
  let guessCopy = guess.toLowerCase();

  guessCopy.split("").forEach((g, i) => {
    const guessDigit = document.createElement("div");
    guessDigit.classList.add("c-letter-box");
    if (g.toLowerCase() === secret[i].toLowerCase()) {
      guessDigit.classList.add("correct");
    } else if (targetCopy.includes(g)) {
      targetCopy = targetCopy.replace(g, "", 1);
      guessDigit.classList.add("contains");
    }

    guessDigit.innerHTML = `${g}`;
    guessElement.appendChild(guessDigit);
  });

  history.append(guessElement);
}

function clearInputs() {
  Array.from(inputs.children).forEach((i) => {
    i.value = "";
  });
}
