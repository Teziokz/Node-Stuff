const element = document.getElementById("main-navigation");
const navMenu = document.getElementById("nav-menu");
let scrollHeight;

window.addEventListener("scroll", (event) => {
  if (window.innerWidth <= 600) {
    scrollHeight = "40px";
  } else {
    scrollHeight = "70px";
  }

  if (window.pageYOffset > 50) {
    setScrollState();
  } else {
    setDefaultState();
  }

  if (window.innerWidth <= 600) {
    navMenu.style.paddingTop = element.style.height;
  }
});

function setScrollState() {
  element.style.backgroundColor = "#53ff53";
  element.style.color = "#282830";
  element.style.height = scrollHeight;
  element.style.boxShadow = "0px 5px 5px 0px rgba(0,0,0,0.75)";
}

function setDefaultState() {
  element.style.backgroundColor = "transparent";
  element.style.color = "#c5c6c7";
  element.style.height = "100px";
  element.style.boxShadow = "none";
}
