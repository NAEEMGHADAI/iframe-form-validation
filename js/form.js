fetch(
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
)
  .then((response) => response.json())
  .then((data) => {
    const countrySelect = document.getElementById("country");
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.text = country.name;
      countrySelect.add(option);
    });
  });

const stateSelect = document.getElementById("state");
const countrySelect = document.getElementById("country");

if (countrySelect.innerHTML.length === 60) {
  stateSelect.disabled = true;
}

countrySelect.addEventListener("change", function () {
  const countryName = this.value;
  fetch(
    `https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        if (country.name === countryName) {
          stateSelect.disabled = false;
          if (country.states.length === 0) {
            const option = document.createElement("option");
            option.value = "No State";
            option.text = "No State";
            stateSelect.add(option);
          } else {
            country.states.forEach((state) => {
              const option = document.createElement("option");
              option.value = state.name;
              option.text = state.name;
              stateSelect.add(option);
            });
          }
        }
      });
    });
});

const form = document.getElementById("form");
const nameField = document.getElementById("name");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const country = document.getElementById("country");
const state = document.getElementById("state");
const parentWindow = window.parent;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = {};
  if (!nameField.value || !country.value || !state.value) {
    parentWindow.postMessage(
      (msg = { error: "name, country and state are mandatory" }),
      "*"
    );
    return;
  }

  if (nameField.value.length <= 4 || nameField.value.length >= 10) {
    parentWindow.postMessage(
      (msg = { Name: { error: "Name should be between 4-10 characters" } }),
      "*"
    );
    return;
  }
  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) &&
    email.value
  ) {
    parentWindow.postMessage((msg = { error: "Invalid email address" }), "*");
    return;
  }
  if (contact.value.length !== 10 && contact.value) {
    parentWindow.postMessage(
      (msg = { error: "Contact number should be of 10 digits" }),
      "*"
    );
    return;
  }
  if (Object.keys(msg).length === 0) {
    parentWindow.postMessage((msg = { Success: "All Field are valid." }), "*");
  } else {
    parentWindow.postMessage(msg, "*");
  }
});
