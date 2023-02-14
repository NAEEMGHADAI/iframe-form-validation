window.onmessage = function (e) {
  if (e.data) {
    document.getElementById("message").style.display = "block";
    if (document.getElementById("message").innerHTML.length !== 0) {
      document.getElementById("message").innerHTML = "";
    }
    for (const key in e.data) {
      if (e.data[key].error) {
        document.getElementById(
          "message"
        ).innerHTML += `<div class="alert alert-danger mx-5" role="alert">${key}: ${JSON.stringify(
          e.data[key]
        )}</div>`;
      } else {
        document.getElementById(
          "message"
        ).innerHTML += `<div class="alert alert-success mx-5" role="alert">${key}: ${JSON.stringify(
          e.data[key]
        )}</div>`;
      }
    }
  }
};

const validators = {
  validators: [
    {
      field: "name",
      validator: { required: true, minLength: 4, maxLength: 10 },
    },
    {
      field: "email",
      validator: {
        required: false,
        regex: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      },
    },
    {
      field: "contact",
      validator: {
        required: false,
        regex: "[0-9]{10}",
      },
    },
    {
      field: "country",
      validator: { required: true },
    },
    {
      field: "state",
      validator: { required: true },
    },
  ],
};

const IframeWindow = document.getElementById("formIframe").contentWindow;
IframeWindow.validators = validators;
