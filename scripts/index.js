const ratingCard = document.getElementById("rating-card");
const thankYouCard = document.getElementById("thank-you-card");
const ratingForm = document.getElementById("rating-form");
const ratingSelector = ratingForm.querySelector(".rating-selector");

const getCurrentRating = (selector) => {
  const selectedOption = selector.querySelector(
    '.rating-option[aria-selected="true"] input'
  );
  return selectedOption ? selectedOption.value : 0;
};

const updateRatingSelector = (rating, selector) => {
  Array.from(selector.children).forEach((option) => {
    if (!option.classList.contains("rating-option")) {
      return;
    }

    const input = option.querySelector("input");
    option.setAttribute("aria-selected", input.value === rating);
    input.checked = input.value === rating;
  });
};

ratingSelector.addEventListener("click", (event) => {
  if (!event.target.classList.contains("rating-option")) {
    return;
  }

  let currentRating = getCurrentRating(ratingSelector);
  const selectedRating = event.target.querySelector("input").value;

  currentRating = currentRating === selectedRating ? 0 : selectedRating;

  updateRatingSelector(currentRating, ratingSelector);
});

ratingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const { rating = 0 } = Object.fromEntries(new FormData(event.target));
  if (rating === 0) {
    alert("Please select a rating before submitting.");
    return;
  }
  thankYouCard.querySelector(".card__rating").textContent = `${rating}`;

  ratingCard.classList.add("hidden");
  thankYouCard.classList.remove("hidden");
});
