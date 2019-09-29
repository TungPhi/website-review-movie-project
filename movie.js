fetch('https://api.themoviedb.org/3/list/3945?api_key=55ed0db911e36ccf5bf3567c3559acd6&language=en-US')
.then(response => response.json())
.then(data => {
  return data.items;
}).then(data =>{
     insertDataTable(data);
}) 
function insertDataTable(data) {
  let table = document.getElementsByClassName('list_movie');
  console.log(data);
  let body = '';
  let i = 0;
  data.forEach(movieInfo => {
    let id = movieInfo.id;
    let image = movieInfo.poster_path;
    let rating = movieInfo.vote_average;
    i++;
    body +=`
    <li>
               <div class="item_wrapper">
                   <div class="info_wrapper">
                       <div class="image">
                           <a href="./detail_movie.html?id=${id}">
                               <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${image}" alt="">
                           </a>
                       </div>
                       <div class="info_strip">
                           <div class="number">
                               <span>${i}</span>
                             </div>
                             <div class="meta buttons">
                               <a class="heart"><i class="fas fa-heart"></i></a>
                               <a class="bookmark"><i class="fas fa-bookmark"></i></a>
                               <a class="rating"><span class="rating"><i class="fas fa-star"></i></span>
                                          <span class="rating">${rating}</span></a>
                             </div>
                       </div>
                   </div>
               </div>
           </li>
    `
    
});
console.log(body);
table[0].innerHTML = body;
let hearts = document.getElementsByClassName('heart')
for (let i = 0; i < hearts.length; i++) {
  let heart = hearts[i]
heart.addEventListener('click',function () {
    heart.style.color = "red";
    // alert('1')
})

}
let bookmarks = document.getElementsByClassName('bookmark')
for (let i = 0; i < bookmarks.length; i++) {
  let bookmark = bookmarks[i]
  bookmark.addEventListener('click',function () {
    bookmark.style.color = "#c7ecff";
    // alert('1')
})
}
let ratings = document.getElementsByClassName('rating')
for (let i = 0; i < ratings.length; i++) {
  let rating = ratings[i]
  rating.addEventListener('click',function () {
    rating.style.color = "#fbc633";
    // alert('1')
})
}
}
