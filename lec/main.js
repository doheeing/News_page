const API_Key = "c6bd233ed9d14f51937c6dbfde2d7cdf";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsbyCategory(event))
);
let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_Key}`
);
let inputArea = document.getElementById("input-area");
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // &page = page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("NO result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      pagenationRender();
      console.log("rr", data);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("error", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  let url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_Key}`
  );
  const response = await fetch(url); // URL 호출. url 을 통해 인터넷의 데이터를 들고옴
  const data = await response.json();
  newsList = data.articles;
  getNews();
};

const getNewsbyCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_Key}`
  );
  getNews();
};

const getNewsbyKeyword = async () => {
  const keyWord = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyWord}&apiKey=${API_Key}`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = newsList
    .map(
      (news) =>
        `<div class="row">
      <div class="col-lg-4 news">
          <img class="news-img-size"
              src="${
                news.urlToImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&krqp=CAU"
              }" />
      </div>
      <div class="col-lg-8 news">
          <h2>${news.title}</h2>
          <p>${
            news.description == null || news.description == ""
              ? "내용없음"
              : news.description.length > 200
              ? news.description.substring(0, 200) + "..."
              : news.description
          }</p>
          <div>
          ${news.source.name || "no source"} ${moment(
          news.publishedAt
        ).fromNow()}
          </div></div>
      </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
  inputArea.style.display = "none";
  document.getElementById("mySidenav").style.width = "0";
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  A simple danger alert with <a href="#" class="alert-link">${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenationRender = () => {
  let paginationHTML = ``;
  const totalPages = Math.ceil(totalResult/pageSize)
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if(lastPage > totalPages){
    lastPage = totalPages
  }
  let firstPage = 
  lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1)
console.log(firstPage,lastPage, pageGroup, groupSize)
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
    <li class="page-item" onclick="movetoPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const movetoPage = (pageNum) => {
  console.log("page", pageNum);
  page = pageNum;
  getNews();
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

getLatestNews();
