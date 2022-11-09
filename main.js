(async () => {
  // 초기화 코드들
  const moviesEl = document.querySelector(".movies");
  const searchTxtEl = document.querySelector(".search-text");
  const searchBtnEl = document.querySelector(".search-btn");
  const moreBtnEl = document.querySelector(".more-btn");

  let page = 1;
  let maxPage = -1;

  // 최초 호출
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);

  // 검색 버튼 클릭
  searchBtnEl.addEventListener("click", async (event) => {
    event.preventDefault();
    let title = searchTxtEl.value;
    const movies = await getMovies(1, title);

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
    const movies = await getMovies(page, title);
    page += 1;
    renderMovies(movies);
  });

  async function getMovies(page = 1, title = "avengers") {
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
      h1El.textContent = [movie.Title, movie.Year];
      h1El.addEventListener("click", () => {
        console.log(movie.Title);
      });
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;

      moviesEl.append(h1El, imgEl);
    }
  }

  function initMovies() {
    moviesEl.innerHTML = "";
    page = 1;
  }
})();
