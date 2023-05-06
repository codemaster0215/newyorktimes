let news = []
let pages = 1;
let total_page =0;
let menus = document.querySelectorAll(".menus button");
menus.forEach(menu=> menu.addEventListener("click",(event)=>getNewsByTopic(event)))
let url;

let searchButton = document.getElementById("search-button")

const getNews = async()=>{
    let header = new Headers({'x-api-key':'ClJKt2yZtjOvhXuNFDFszOA7zCl-6EQM4wruaphciQQ'})

    let response = await fetch(url,{headers:header});
    let data = await response.json();
    news = data.articles
    console.log(news)

    render();
}


const getLatestNews = async ()=> {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business`);
    getNews();
};

const getNewsByKeyword = async () =>{
//1. bring search keyword
//2. make search keyword in url
//3. header ready
//4. call url
//5. bring data
//6. show data

let keyword = document.getElementById("search-input").value
url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`)
    getNews();
}

const getNewsByTopic = async(event)=>{
    console.log("clicked,")
    let topic = event.target.textContent.toLowerCase()
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=${topic}`)
    getNews();
    
}

const render =() =>{
    let newsHTML =''
    newsHTML  = news.map(item=>{
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.media}">
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>
                ${item.summary}
            </p>
            <div>
                ${item.rights} * ${item.published_date}
            </div>
        </div>
    </div>`;
    }).join('');



    document.getElementById("news-board").innerHTML=newsHTML
}

const pagenation = () => {
    //total_page
    //landing page
    //page group
    //last
    //first
    //first~last page print


}

searchButton.addEventListener("click",getNewsByKeyword);
getLatestNews();
