fetch("https://teziokz-node-stuff.glitch.me/data")
  .then(response => response.text())
  .then(data => console.log(data));
