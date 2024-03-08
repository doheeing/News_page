const API_Key = 'c6bd233ed9d14f51937c6dbfde2d7cdf';
const getLatestNews = () =>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_Key}`
    );
    const response = fetch(url) // URL 호출. url 을 통해 인터넷의 데이터를 들고옴
};

getLatestNews();