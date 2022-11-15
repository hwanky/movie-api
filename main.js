(async () => {
  // 초기화 코드들
  const moviesEl = document.querySelector(".movies");
  const searchTxtEl = document.querySelector(".search-text");
  const searchBtnEl = document.querySelector(".search-btn");
  const moreBtnEl = document.querySelector(".more-btn");
  const searchTypeEl = document.querySelector(".search-type");
  const searchNumEl = document.querySelector(".search-num");
  const searchYearEl = document.querySelector(".search-year");
  const bodyEl = document.querySelector("body");

  let page = 1;
  let maxPage = -1;

  // 검색 버튼 클릭
  searchBtnEl.addEventListener("click", async (event) => {
    event.preventDefault();
    let title = searchTxtEl.value;
    let type = searchTypeEl.value;
    let num = searchNumEl.value;
    let year = searchYearEl.value;

    initMovies();

    if (title) {
      const movies = await getMovies(title, page, type, year);
      moreBtnEl.style.display = "block";
      for (let i = 0; i < num; i++) {
        addPage();
      }
      renderMovies(movies);
    } else {
      alert("제목을 입력해 주세요.");
    }
  });

  // more 버튼 클릭
  moreBtnEl.addEventListener("click", async () => {
    addPage();
  });

  // 영화 상세정보 클릭

  // 영화 리스트 페이지 추가 함수
  async function addPage() {
    let title = searchTxtEl.value;
    let type = searchTypeEl.value;
    let year = searchYearEl.value;
    page += 1;
    const movies = await getMovies(title, page, type, year);
    renderMovies(movies);
  }

  // 영화 리스트 api 호출 함수
  async function getMovies(title = "", page = 1, type = "", year = "") {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}&type=${type}&y=${year}`
    );
    const { Search: movies, totalResults } = await res.json();
    maxPage = Math.ceil(Number(totalResults) / 10);

    if (page >= maxPage) {
      moreBtnEl.style.display = "none";
    }
    return movies;
  }

  // 영화 리스트 렌더링 함수
  function renderMovies(movies) {
    if (!movies) {
      alert("영화가 없습니다.");
      moreBtnEl.style.display = "none";
      return;
    }
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      h1El.addEventListener("click", () => {
        console.log(movie.Title);
        console.log(movie.Year);
        console.log(movie.Type);
      });

      const yearEl = document.createElement("span");
      yearEl.textContent = movie.Year;
      h1El.append(yearEl);

      const imgEl = document.createElement("img");
      imgEl.src =
        movie.Poster === "N/A"
          ? `https://2.bp.blogspot.com/-7fdJ0sJ_QrI/U4W-v8caIpI/AAAAAAAABxo/e7_hvfnNVFU/s1600/img.gif`
          : movie.Poster;
      el.append(h1El, imgEl);

      moviesEl.append(el);
    }
  }

  // 영화 상세정보 api 호출 함수
  async function getMovieDetail(id) {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    );
    const movieDetail = await res.json();
    if (movieDetail.Response === "True") {
      return movieDetail;
    }
    return movieDetail.Error;
  }

  // 영화 상세정보 렌더링 함수
  async function renderMovieDetail() {}

  // 영화 리스트 초기화 함수
  function initMovies() {
    moviesEl.innerHTML = "";
    page = 1;
  }

  // 년도 생성 함수
  for (let i = 2022; i >= 1960; i--) {
    const optionEl = document.createElement("option");
    optionEl.value = i;
    optionEl.textContent = i;
    searchYearEl.append(optionEl);
  }
})();
