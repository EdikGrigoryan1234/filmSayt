let api_key = "9b702a6b89b0278738dab62417267c49";
let searchApi = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;
let adidas = [];
let theme = document.querySelector("#switch-rounded")
console.log(theme);
let loading = document.querySelector(".loadingPage");
window.addEventListener("load", () => {
  loading.classList.add("hide");
  setTimeout(() => {
    loading.remove();
  }, 1000);
});
function reder(
  url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach((elem) => {
        let card = document.createElement("div");
        card.classList.toggle("movies_card");
        card.innerHTML = `<img src="https://image.tmdb.org/t/p/original${elem.poster_path}" id="movies_img"> 
        <h1>${elem.title}</h1> 
		<p>original_language - 	${elem.original_language}</p>
		<p>popularity - 	${elem.popularity}</p>
      <p onclick = "locatedPage(${elem.id})" class="visit_link">Visit movie page ➔</p> 
      `;
        filmCards.append(card);
        let shadow = document.createElement("div");
        shadow.setAttribute("class", "movieShadow");
        shadow.innerHTML = `<h3>${elem.vote_average}</h3>`;
        card.append(shadow);
        card.addEventListener("mouseenter", () => {
          shadow.style.display = "flex";
          if (+elem.vote_average > 7) {
            shadow.style.backgroundColor = "rgba(65, 224, 57, 0.482)";
          } else {
            shadow.style.backgroundColor = "rgba(245, 21, 51, 0.482)";
          }
        });
        card.addEventListener("mouseleave", () => {
          shadow.style.display = "none";
        });
      });
    });
}
reder();
let timerId;
inp.addEventListener("input", () => {
  if (inp.value.trim() !== "") {
    inp.style.backgroundColor = "grey";
    filmCards.innerHTML = "";
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      reder(searchApi + inp.value);
    }, 1000);
  } else {
    inp.style.backgroundColor = "#fff";
    reder();
  }
});
function locatedPage(i) {
  localStorage.setItem("id", i);
  window.location.href = "page.html";
}
// https://api.themoviedb.org/3/genre/movie/list?language=en'
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
  .then((response) => response.json())
  .then((response) =>
    response.genres.forEach((e) => {
      let gener = document.createElement("button");
      gener.setAttribute("class", "gener");
      gener.innerText = `${e.name}`;
      categories.append(gener);
      gener.addEventListener("click", () => {
        filmCards.innerHTML = "";
        if (!adidas.includes(e.id)) {
          adidas.push(e.id);
          gener.style.backgroundColor = "#fff"
          gener.style.color = "#000"
			 gener.style.border = "border: 1px solid #000"
			} else {
          adidas = adidas.filter((z) => z !== e.id);
          gener.style.backgroundColor = "#000"
          gener.style.color = "#fff"
        }
        if (adidas.length == 0) {
          reder()
        }
        reder(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${adidas}.`
        );
      });
    })
  )
  .catch((err) => console.error(err));
  
  let main = document.querySelector(".main")
  let moviesCard = document.querySelector(".movies_card")
  let header = document.querySelector(".header")
  let mutabal = true
	theme.addEventListener("click",()=>{
		if (mutabal == true) {
			main.style.backgroundColor = "#fff"
			categories.style.backgroundColor = "#fff"
			header.style.backgroundColor = "#fff"
			header.style.borderBottom = "5px solid black"
			mutabal = false
		}else if(mutabal == false){
			main.style.backgroundColor = "#000"
			categories.style.backgroundColor = "#000"
			header.style.backgroundColor = "#000"
			mutabal = true
		}
})
