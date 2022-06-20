//Test

console.log("Client side js is running");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgBox1 = document.querySelector("#message-1");
const msgBox2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  msgBox1.textContent = "Loading...";
  msgBox2.textContent = "";

  const location = search.value;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgBox1.textContent = data.error;
      } else {
        const { forecast, location } = data;
        msgBox1.textContent = forecast;
        msgBox2.textContent = location;
      }
    });
  });
});
