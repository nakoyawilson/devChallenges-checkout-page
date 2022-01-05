const country = document.querySelector("#country");
const totalCost = document.querySelector("#total-cost");
const shippingCost = document.querySelector("#shipping-cost");
const costBag = 54.99;
const costShoe = 74.99;
const shipping = 19;
const decreaseBag = document.querySelector("#decrease-bag");
const increaseBag = document.querySelector("#increase-bag");
const decreaseShoe = document.querySelector("#decrease-shoe");
const increaseShoe = document.querySelector("#increase-shoe");
const quantityBag = document.querySelector("#quantity-bag");
const quantityShoe = document.querySelector("#quantity-shoe");
const submitButton = document.querySelector(".submit-btn");
const inputs = document.querySelectorAll("input");
const errorMessages = document.querySelectorAll(".error-container");
const countryErrorMessage = document.querySelector("#country-error");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberRegex = /\d+/;

const calculateTotal = () => {
  const bagQty = Number(quantityBag.innerHTML);
  const shoeQty = Number(quantityShoe.innerHTML);
  const total = bagQty * costBag + shoeQty * costShoe + shipping;
  if (bagQty === 0 && shoeQty === 0) {
    totalCost.innerHTML = "0.00";
    shippingCost.innerHTML = "0";
  } else {
    totalCost.innerHTML = total.toFixed(2);
    shippingCost.innerHTML = "19";
  }
};

country.addEventListener("change", () => {
  if (country.value !== "") {
    country.style.color = "#333333";
  } else {
    country.style.color = "#828282";
  }
});

decreaseBag.addEventListener("click", () => {
  let count = Number(quantityBag.innerHTML);
  if (count > 0) {
    count--;
  }
  if (count === 0) {
    quantityBag.style.color = "#bdbdbd";
  }
  quantityBag.innerHTML = count;
  calculateTotal();
});

increaseBag.addEventListener("click", () => {
  let count = Number(quantityBag.innerHTML);
  count++;
  if (count > 0) {
    quantityBag.style.color = "#333333";
  }
  quantityBag.innerHTML = count;
  calculateTotal();
});

decreaseShoe.addEventListener("click", () => {
  let count = Number(quantityShoe.innerHTML);
  if (count > 0) {
    count--;
  }
  if (count === 0) {
    quantityShoe.style.color = "#bdbdbd";
  }
  quantityShoe.innerHTML = count;
  calculateTotal();
});

increaseShoe.addEventListener("click", () => {
  let count = Number(quantityShoe.innerHTML);
  count++;
  if (count > 0) {
    quantityShoe.style.color = "#333333";
  }
  quantityShoe.innerHTML = count;
  calculateTotal();
});

const validateForm = () => {
  inputs.forEach((input) => {
    if (input.type !== "checkbox") {
      const errorContainer = input.nextElementSibling;
      const errorMessage = input.nextElementSibling.lastElementChild.firstChild;
      if (input.value === "" && input.type !== "checkbox") {
        errorContainer.style.opacity = "1";
      } else if (input.type === "email" && !input.value.match(emailRegex)) {
        errorMessage.innerHTML = "Looks like this is not an email";
      } else if (input.type === "tel" && !input.value.match(numberRegex)) {
        errorMessage.innerHTML = "Looks like this is not a phone number";
      } else {
        input.nextElementSibling.style.opacity = "0";
      }
    }
  });
  if (country.value === "") {
    countryErrorMessage.style.opacity = "1";
  } else {
    countryErrorMessage.style.opacity = "0";
  }
};

submitButton.addEventListener("click", (e) => {
  validateForm();
  let errorDisplayed = false;
  errorMessages.forEach((errorMessage) => {
    if (errorMessage.style.opacity === "1") {
      errorDisplayed = true;
    }
  });
  if (errorDisplayed === false) {
    alert("Success! Your order has been placed.");
    inputs.forEach((input) => {
      input.value = "";
    });
    country.value = "";
    country.style.color = "#828282";
    document.querySelector("#save").checked = false;
  }
  e.preventDefault();
});

inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      submitButton.click();
    }
  });
});
