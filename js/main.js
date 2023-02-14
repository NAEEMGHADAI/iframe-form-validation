window.onmessage = function (e) {
  if (e.data) {
    document.getElementById("message").style.display = "block";
    if (document.getElementById("message").innerHTML !== "Result:") {
      document.getElementById("message").innerHTML = "Result:";
    }
    for (const key in e.data) {
      document.getElementById(
        "message"
      ).innerHTML += `<br>${key}: ${e.data[key].error}`;
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
        length: 10,
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
