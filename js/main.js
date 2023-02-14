window.onmessage = function (e) {
  if (e.data) {
    document.getElementById("message").style.display = "block";
    if (document.getElementById("message").innerHTML !== "Result:") {
      document.getElementById("message").innerHTML = "Result:";
    }
    document.getElementById("message").innerHTML += JSON.stringify(e.data);
  }
};
