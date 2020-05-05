const newsContainer = document.querySelector(".news-container");
const myForm = document.querySelector("#search-form");
let newsData;

const renderNews = function (newsArray) {
    let newsHtmlArray = newsArray.map(function (currentStory, i) {
        return `<div class="movie col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card" style="width: 100%;">
                        <a href="${currentStory.url}"><img src=${currentStory.urlToImage} id="0" class="card-img-top" alt="${currentStory.title}"></a>
                        <div class="card-body">
                            <h5 class="card-title">${currentStory.title}</h5>
                            <p class="card-text">Author: ${currentStory.author}</p>
                            <p class="card-text">Published: ${currentStory.publishedAt}</p>
                            <button  id="readstory" class="btn btn-secondary" onclick="readStory('${currentStory.url}')">Read Story</button>
                            <hr>
                            <button  class="btn btn-primary" onclick="saveToNewsList('${i}')">Add Story</button>
                        </div>
                    </div>
                </div>`
    });
    return newsHtmlArray.join("");
};

const readStory = function(url) {
    window.location.assign(url);
};


function saveToNewsList(index) {
    let news = newsData[index];
    let newsListJSON = localStorage.getItem("newslist");
    let newslist = JSON.parse(newsListJSON);
    if (newslist === null) {
        newslist = [];
    };
    newslist.push(news);
    newsListJSON = JSON.stringify(newslist);
    localStorage.setItem("newslist", newsListJSON);
};

window.addEventListener("DOMContentLoaded", function () {
    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let zipcode = document.querySelector(".form-control").value;
        axios.get(`http://ZiptasticAPI.com/${zipcode}`).then(data => {
        let $searchString = data.data.city;
        let urlEncodedSearchString = encodeURIComponent($searchString)
        axios.get(`http://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=` + urlEncodedSearchString)
            .then(function (response) {
                newsContainer.innerHTML = renderNews(response.data.articles);
                newsData = response.data.articles;
            })
        })
    })
});
