var dataMovies = [];

fetch ('https://api.themoviedb.org/3/list/3945?api_key=55ed0db911e36ccf5bf3567c3559acd6&language=en-US')

.then(res => {
    return res.json();
  })
.then(data => {
    // console.log (data);
    dataMovies = data.items;  
    // console.log (dataMovies);
    searchTool (keyWords);
  });

  let query = location.search;
  console.log (query);
  query = query.replace("?query=", "");
  console.log (query);
  let wordInput = query.split("+");
  console.log(wordInput);

  let keyWords = '';
  for (let k=0; k<wordInput.length; k++) {
    keyWords = wordInput[k].toLowerCase();
    console.log (keyWords);
  }

  // searchTool (keyWords);

  // let search = document.getElementById('search');
  // let input = document.getElementById('input');
  // search.addEventListener('submit', function(payload) {
  //   payload.preventDefault();
  //   let inputValue = input.value.toLowerCase();
  //   console.log (inputValue);
  //   let keyWords = inputValue.split(' ');
  //   console.log (keyWords);
  //   searchTool (keyWords);
  // });
  
  function searchTool (keyWords) {
    let results=[];
    let title = '';
    let n = 0;
    for (let i=0; i<dataMovies.length; i++) {
      title = dataMovies[i].title.toLowerCase();
      n = title.indexOf(keyWords);
      console.log(n);
      if (n >= 0) {
        results.push(dataMovies[i]);
      }
    }
    insertResult(results);
    console.log(results);
  }
  

  function insertResult (results) {
    // console.log (results);
    let searchResult = document.getElementById('search_result');
    let divResult = '';
    if (results.length>0) {
      for (let j=0; j<results.length; j++) {
        let id = results[j].id;
        let poster = results[j].poster_path;
        let titleMovies = results[j].title;
        let dateRelease = results[j].release_date;
        let overView = results[j].overview;
        divResult += `
          <div class = "result_flex">
            <div class = "item_poster_class">
                <div class = "image_content">
                    <a class="result" href="./detail_movie.html?id=${id}" target='#'>
                      <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster}" alt="">
                    </a>
                  </div>
            <div class="info">
              <div class="wrapper">
                  <div class="flex">
                    <a class="title_result" href="./detail_movie.html?id=${id}" target='#'>${titleMovies}</a>
                    <span class="date_release">${dateRelease}</span>
                    </div>
                  </div>
                  <p class="overview">${overView}</p>
                  <p class="view_more">
                    <a class="result" href="./detail_movie.html?id=${id}" target='#'>More Info</a></p>
                </div>
              </div>
          </div>`;
        };
      }
    else {
        divResult = `No results found for "${query.replace(/[+]/gi, " ")}"`;
      }; 
    searchResult.innerHTML = divResult;
    };

 
