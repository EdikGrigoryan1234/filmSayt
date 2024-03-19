let filmId = localStorage.getItem("id");
let key = "9b702a6b89b0278738dab62417267c49";
function render() {
  fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${key}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((e) => {
        let watch = document.createElement("div");
        watch.classList.add("watch");
        watch.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${e.key}" ></iframe>
			<button onclick="popupFun('https://www.youtube.com/embed/${e.key}')">Popup</button>
		  ;`;
        wathcMovie.append(watch);
      });
    });
  fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${key}`)
    .then((response) => response.json())
    .then((response) =>
      response.cast.forEach((e) => {
        let acterCard = document.createElement("div");
        acterCard.classList.add("acterCard");
        acterCard.innerHTML = `
  <img src="https://image.tmdb.org/t/p/w500${e.profile_path}">
  <p id="acterName">${e.name}</p>
  `;
        acters.append(acterCard);
      })
    );
  fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${key}`)
    .then((response) => response.json())
    .then((response) => {
      let filmInfo = document.createElement("div");
      filmInfo.classList.add("filmInfo");
      filmInfo.innerHTML = `
  <h3>${response.original_title} : ${response.release_date}</h3>
  <p>${response.overview}</p>
  `;
      informMovie.append(filmInfo);
      informMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${response.backdrop_path})`;
    });
  let loading = document.querySelector(".loadingPage");
  window.addEventListener("load", () => {
    loading.classList.add("hide");
    setTimeout(() => {
      loading.remove();
    }, 1000);
  });
}
render();
function popupFun(videoUrl) {
	popupDiv.style.display = "flex"
	let iframe = document.createElement("iframe")
	iframe.width = "560"
	iframe.height = "315"
	iframe.src = videoUrl
	popupDiv.append(iframe)
	let closePopup = document.createElement("button")
	closePopup.setAttribute("class","closePopup")
	closePopup.innerHTML = "close"
	popupDiv.append(closePopup)
	closePopup.addEventListener("click",()=>{
		popupDiv.innerHTML = ""
		popupDiv.style.display = "none"
	})
}