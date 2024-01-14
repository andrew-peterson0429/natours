require("@babel/polyfill");
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFuZG0tdHJhdmVsbGVycyIsImEiOiJjbHEzOHh5dWQwYWFuMmttc2tncjJ3M2c1In0.bQMJZ4IOcYG9mB8lxXGNKw";
var e = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/aandm-travellers/clq3atd2r00ns01ol763bct9s",
  scrollZoom: !1,
});
const t = new mapboxgl.LngLatBounds();
locations.forEach((o) => {
  const s = document.createElement("div");
  (s.className = "marker"),
    new mapboxgl.Marker({ element: s, anchor: "bottom" })
      .setLngLat(o.coordinates)
      .addTo(e),
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(o.coordinates)
      .setHTML(`<p>Day ${o.day}: ${o.description}</p>`)
      .addTo(e),
    t.extend(o.coordinates);
}),
  e.fitBounds(t, { padding: { top: 200, bottom: 150, left: 100, right: 100 } });
console.log("login.js file added!");
const o = document.querySelector(".form"),
  s = async (e, t) => {
    console.log(e, t);
    try {
      console.log("Trying to send post request!");
      const o = await axios({
        method: "POST",
        url: "http://127.0.0.1:3000/api/v1/users/login",
        data: { email: e, password: t },
      });
      "success" === o.data.status &&
        window.setTimeout(() => {
          location.assign("/");
        }, 1500),
        console.log("This is the res: ", o);
    } catch (e) {}
  };
o.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = document.getElementById("email").value,
    o = document.getElementById("password").value;
  s(t, o);
}),
  console.log("index.js has been added to bundle and should be accessible!");
const a = document.getElementById("map"),
  n = document.querySelector(".form");
if (a) {
  const e = JSON.parse(a.dataset.locations);
  console.log(e);
}
n &&
  n.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = document.getElementById("email").value,
      o = document.getElementById("password").value;
    s(t, o);
  });
//# sourceMappingURL=index.js.map
