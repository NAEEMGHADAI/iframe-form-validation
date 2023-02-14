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

  const validators = window.validators.validators;

  validators.forEach((validator) => {
    if (validator.validator.required) {
      if (!document.getElementById(validator.field).value) {
        msg[validator.field] = { error: "This field is required" };
      }
    }
    if (validator.validator.minLength) {
      console.log(
        document.getElementById(validator.field).value.length,
        validator.validator.minLength
      );
      if (
        document.getElementById(validator.field).value.length <
        validator.validator.minLength
      ) {
        msg[validator.field] = {
          error: `This field should be of minimum ${validator.validator.minLength} characters`,
        };
      }
    }
    if (validator.validator.maxLength) {
      if (
        document.getElementById(validator.field).value.length >
        validator.validator.maxLength
      ) {
        msg[validator.field] = {
          error: `This field should be of maximum ${validator.validator.maxLength} characters`,
        };
      }
    }
    if (
      validator.validator.regex &&
      document.getElementById(validator.field).value
    ) {
      if (
        !new RegExp(validator.validator.regex).test(
          document.getElementById(validator.field).value
        )
      ) {
        msg[validator.field] = { error: "Invalid input" };
      }
    }
    if (
      validator.validator.length &&
      document.getElementById(validator.field).value
    ) {
      if (
        document.getElementById(validator.field).value.length !==
        validator.validator.length
      ) {
        msg[validator.field] = {
          error: `This field should be of ${validator.validator.length} characters`,
        };
      }
    }
  });

  if (Object.keys(msg).length === 0) {
    parentWindow.postMessage((msg = { Success: "All Field are valid." }), "*");
  } else {
    console.log(msg);
    parentWindow.postMessage(msg, "*");
  }
});
