fetch("https://teziokz-node-stuff.glitch.me/data")
  .then(response => response.json())
  .then(data => console.log(data));
