/**
 *
 * @param {Event} e
 */
function handleNewUrlCreation(e) {
  e.preventDefault();
  let url_to_shorten = document.querySelector("#url").value;
  fetch(`/api/v1/new_url?url=${url_to_shorten}`, {
  }).then(reponse => reponse.text())
    .then(data => {
      let location = window.location.href
      document.querySelector("#shortend-url").innerText = `${location}u/${data}`
      document.querySelector("#shortend-url").setAttribute("href", `${location}u/${data}`)
      document.querySelector("#url").value = ""
    })
}

function handleInfoForm(e) {
  e.preventDefault()
  let urlid = document.querySelector("#urlid").value;
  fetch(`/api/v1/get_info/${urlid}`, {
  }).then(reponse => reponse.json())
    .then(data => {
      document.querySelector("#clicks").innerHTML = data.clicks
      document.querySelector("#url-info").innerHTML = data.url
      document.querySelector("#created").innerHTML = data.created
    })
}

window.addEventListener("load", () => {
  document.querySelector("#url-shorten-form").addEventListener("submit", handleNewUrlCreation);

  document.querySelector("#url-info-form").addEventListener("submit", handleInfoForm)
});
