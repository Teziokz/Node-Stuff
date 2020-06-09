const element = document.getElementById("main-navigation");

window.addEventListener("scroll", (event) => {
  if (window.pageYOffset > 5) {
    setScrollState();
  } else {
    setDefaultState();
  }
});

function setScrollState() {
  element.style.backgroundColor = "#53ff53";
  element.style.color = "#282830";
  element.style.height = "70px";
  element.style.boxShadow = "0px 5px 5px 0px rgba(0,0,0,0.75)";
}

function setDefaultState() {
  element.style.backgroundColor = "transparent";
  element.style.color = "#c5c6c7";
  element.style.height = "100px";
  element.style.boxShadow = "none";
}
