let menuShown = false;
const menu = document.getElementById("nav-menu");
const nav = document.getElementById("main-navigation");

function toggleNavigation() {
  console.log("Toggle nav");
  menuShown = !menuShown;

  if (menuShown) {
    console.log("nav height: " + nav.style.height);
    menu.style.top = 0;
  } else {
    menu.style.top = "-300px";
    console.log(menu.style.top);
  }
}
