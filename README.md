# :clapper: 영화 검색

## 배포 주소

[DEMO](https://marvelous-moxie-925932.netlify.app/)

## 🛠 사용 기술

---

![HTML5](https://camo.githubusercontent.com/47d8237d822743a0389cd64dbeffce5220d3237fb6fc15f480df19cbd4d3cb77/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d48544d4c35266c6f676f436f6c6f723d7768697465) ![CSS3](https://camo.githubusercontent.com/cb4472f9af9977db27f95300d3802acf99b3bd55e5596fe944be773754ddb6b2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d43535333266c6f676f436f6c6f723d7768697465) ![JAVASCRIPT](https://camo.githubusercontent.com/4d1500c724fa48565881170551b0c13bd6fbd6686879934bea3a4836564a7e09/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176617363726970742d4537444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d4a617661536372697074266c6f676f436f6c6f723d626c61636b)

## 요구사항

필수 요구사항은 꼭 달성해야 하는 목표로, 수정/삭제는 불가하고 추가는 가능합니다.  
선택 요구사항은 단순 예시로, 자유롭게 추가/수정/삭제해서 구현해보세요.

### :exclamation: 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [x] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [ ] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [ ] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 영화와 관련된 기타 기능도 고려해보세요.

## API 기본 사용법

```curl
curl https://omdbapi.com/?apikey=7035c60c
  \ -X 'GET'
```

## 영화 목록 검색

영화 목록은 한 번에 최대 10개까지 검색할 수 있습니다.

| 파라미터 | 설명                              | 기본값 |
| -------- | --------------------------------- | ------ |
| `s`      | 검색할 영화 제목(필수!)           |
| `y`      | 검색할 개봉연도, 빈값은 전체 검색 |
| `page`   | 검색할 페이지 번호                | `1`    |

요청 코드 예시:

```js
async function getMovies(title, year = "", page = 1) {
  const s = `&s=${title}`;
  const y = `&y=${year}`;
  const p = `&page=${page}`;
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c${s}${y}${p}`);
  const json = await res.json();
  if (json.Response === "True") {
    const { Search: movies, totalResults } = json;
    return {
      movies,
      totalResults,
    };
  }
  return json.Error;
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  Search: Movie[]; // 검색된 영화 목록, 최대 10개
  totalResults: string; // 검색된 영화 개수
  Response: "True" | "False"; // 요청 성공 여부
}
interface Movie {
  Title: string; // 영화 제목
  Year: string; // 영화 개봉연도
  imdbID: string; // 영화 고유 ID
  Type: string; // 영화 타입
  Poster: string; // 영화 포스터 이미지 URL
}
```

```json
{
  "Search": [
    {
      "Title": "Frozen",
      "Year": "2013",
      "imdbID": "tt2294629",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg"
    },
    {
      "Title": "Frozen II",
      "Year": "2019",
      "imdbID": "tt4520988",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg"
    }
  ],
  "totalResults": "338",
  "Response": "True"
}
```

## 영화 상제정보 검색

단일 영화의 상제정보를 검색합니다.

| 파라미터 | 설명                  | 기본값  |
| -------- | --------------------- | ------- |
| `i`      | 검색할 영화 ID(필수!) |
| `plot`   | 줄거리 길이           | `short` |

요청 코드 예시:

```js
async function getMovie(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  );
  const json = await res.json();
  if (json.Response === "True") {
    return json;
  }
  return json.Error;
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  Title: string; // 영화 제목
  Year: string; // 영화 개봉연도
  Rated: string; // 영화 등급
  Released: string; // 영화 개봉일
  Runtime: string; // 영화 상영시간
  Genre: string; // 영화 장르
  Director: string; // 영화 감독
  Writer: string; // 영화 작가
  Actors: string; // 영화 출연진
  Plot: string; // 영화 줄거리
  Language: string; // 영화 언어
  Country: string; // 영화 제작 국가
  Awards: string; // 영화 수상 내역
  Poster: string; // 영화 포스터 이미지 URL
  Ratings: Rating[]; // 영화 평점 정보
  Metascore: string; // 영화 메타스코어
  imdbRating: string; // 영화 IMDB 평점
  imdbVotes: string; // 영화 IMDB 투표 수
  imdbID: string; // 영화 고유 ID
  Type: string; // 영화 타입
  DVD: string; // 영화 DVD 출시일
  BoxOffice: string; // 영화 박스오피스
  Production: string; // 영화 제작사
  Website: string; // 영화 공식 웹사이트
  Response: string; // 요청 성공 여부
}
interface Rating {
  // 영화 평점 정보
  Source: string; // 평점 제공 사이트
  Value: string; // 평점
}
```

```json
{
  "Title": "Frozen",
  "Year": "2013",
  "Rated": "PG",
  "Released": "27 Nov 2013",
  "Runtime": "102 min",
  "Genre": "Animation, Adventure, Comedy",
  "Director": "Chris Buck, Jennifer Lee",
  "Writer": "Jennifer Lee, Hans Christian Andersen, Chris Buck",
  "Actors": "Kristen Bell, Idina Menzel, Jonathan Groff",
  "Plot": "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather co...",
  "Language": "English, Norwegian",
  "Country": "United States",
  "Awards": "Won 2 Oscars. 82 wins & 60 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "7.4/10" },
    { "Source": "Rotten Tomatoes", "Value": "90%" },
    { "Source": "Metacritic", "Value": "75/100" }
  ],
  "Metascore": "75",
  "imdbRating": "7.4",
  "imdbVotes": "620,489",
  "imdbID": "tt2294629",
  "Type": "movie",
  "DVD": "18 Mar 2014",
  "BoxOffice": "$400,953,009",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
```
