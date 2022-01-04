const country = document.querySelector("#country");

country.addEventListener("change", () => {
  if (country.value !== "") {
    country.style.color = "#333333";
  } else {
    country.style.color = "#828282";
  }
});
