const ratingCard = document.getElementById("rating-card");
const thankYouCard = document.getElementById("thank-you-card");
const ratingForm = document.getElementById("rating-form");
const ratingSelector = ratingForm.querySelector(".rating-selector");

const getRatingValue = (option) => {
  const input = option?.querySelector("input");
  return input ? parseInt(input.value, 10) : 0;
};

const updateRatingSelector = (rating, selector) => {
  Array.from(selector.children).forEach((option) => {
    if (!option.classList.contains("rating-option")) {
      return;
    }

    const input = option.querySelector("input");
    const ratingValue = getRatingValue(option);

    option.classList.toggle("checked", ratingValue === rating);
    input.checked = ratingValue === rating;
  });
};

ratingSelector.addEventListener("click", (event) => {
  if (!event.target.classList.contains("rating-option")) {
    return;
  }

  const selectedRating = getRatingValue(event.target);
  updateRatingSelector(selectedRating, ratingSelector);
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
