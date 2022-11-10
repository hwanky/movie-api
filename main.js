(async () => {
  // 초기화 코드들
  const moviesEl = document.querySelector(".movies");
  const searchTxtEl = document.querySelector(".search-text");
  const searchBtnEl = document.querySelector(".search-btn");
  const moreBtnEl = document.querySelector(".more-btn");

  let page = 1;
  let maxPage = -1;

  // 검색 버튼 클릭
  searchBtnEl.addEventListener("click", async (event) => {
    event.preventDefault();
    let title = searchTxtEl.value;
    const movies = await getMovies(title, 1);

    initMovies();

    if (title) {
      renderMovies(movies);
    } else {
      alert("제목을 입력해 주세요.");
    }
  });

  // more 버튼 클릭
  moreBtnEl.addEventListener("click", async () => {
    let title = searchTxtEl.value;
    const movies = await getMovies(title, page);
    page += 1;
    renderMovies(movies);
  });

  async function getMovies(title = "", page = 1) {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}`
    );
    const { Search: movies, totalResults } = await res.json();
    maxPage = Math.ceil(Number(totalResults) / 10);
    return movies;
  }

  function renderMovies(movies) {
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      h1El.addEventListener("click", () => {
        console.log(movie.Title);
      });

      const imgEl = document.createElement("img");
      imgEl.src =
        movie.Poster === "N/A"
          ? `https://2.bp.blogspot.com/-7fdJ0sJ_QrI/U4W-v8caIpI/AAAAAAAABxo/e7_hvfnNVFU/s1600/img.gif`
          : movie.Poster;
      el.append(h1El, imgEl);

      moviesEl.append(el);
    }
  }

  function initMovies() {
    moviesEl.innerHTML = "";
    page = 1;
  }
})();
