// function praseQuery (){
//     let queryObject = {}
//     let query = location.search;
//     query = query.replace('?', '');
//     query.split('&').forEach(couple => {
//         let parseCouple = couple.split('=');
//         queryObject[parseCouple[0]] = parseCouple[1];
//     });
//     return queryObject;
// }
// let queryObject = praseQuery();
Promise.all([
    fetch('https://api.themoviedb.org/3/movie/118340/videos?api_key=55ed0db911e36ccf5bf3567c3559acd6&language=en-US'),
    fetch('https://api.themoviedb.org/3/movie/118340?api_key=55ed0db911e36ccf5bf3567c3559acd6&append_to_response=credits&fbclid=IwAR3P7OKA_3m6OpxJkY3IWP2HgXgdswMUZTNBUOxR7fF1gMyyRoKJzr2CpxA')
    ]).then(values => {
        Promise.all([values[0].json(),values[1].json()]).then(data => {
            console.log(data);
            insertDataMovie(data);
        }).catch(err =>{
            return err;
        })
        })
function insertDataMovie(data) {
    let img_poster = document.getElementById('img_poster')
    let title = document.getElementById('title')
    let overview = document.getElementsByClassName('overview');
    let peopleNoImage = document.getElementsByClassName('people_no_image')
    let topBilledCast = document.getElementsByClassName('top_billed_cast_ol')
    let trailer = document.getElementById('video_trailer')


    img_poster.innerHTML = `<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${data[1].poster_path}">`
    title.innerText = `${data[1].original_title}`
    overview[0].innerHTML = `<p>${data[1].overview}</p>`
    let list = []
    for (let i = 0; i < data[1].credits.crew.length; i++) {
        if ((data[1].credits.crew[i].job === "Director") || (data[1].credits.crew[i].job === "Writer") || (data[1].credits.crew[i].job === "Story")) {
            let x = data[1].credits.crew[i].id
            let character = {
                name: '',
                role: [],
            };
            character.name = data[1].credits.crew[i].name
            for (let j = 0; j < data[1].credits.crew.length; j++){
                if(x === data[1].credits.crew[j].id){
                    character.role.push(data[1].credits.crew[j].job)
                }
            }
            if(!list.includes(character.name)){
                peopleNoImage[0].innerHTML += `<li class="profile">
                    <div>${character.name}</div>
                    <div class="character">${character.role.toString()}</div>
                    </li>`    
            }
            list.push(character.name);
        }
    }
    for(let i = 0; i< 5; i++){    
        topBilledCast[0].innerHTML += `<li class="card">
            <img src="https://image.tmdb.org/t/p/w138_and_h175_face${data[1].credits.cast[i].profile_path}" />
            <p>${data[1].credits.cast[i].name}</p>
            <p>${data[1].credits.cast[i].character}</p>
            </li>`
    }
    
    trailer.innerHTML = `<iframe width="533px" height="300px" src="https://www.youtube.com/embed/${data[0].results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowfullscreen></iframe>`
    
    document.getElementById('info_form_status').innerText = `${data[1].status}`
    document.getElementById('info_form_release').innerText = `${data[1].release_date}`
    document.getElementById('info_form_language').innerText = `${data[1].spoken_languages[0].name}`
    document.getElementById('info_form_time').innerText = `${data[1].runtime} minutes`
    document.getElementById('info_form_budget').innerText = `$${data[1].budget}`
    document.getElementById('info_form_revenue').innerText = `$${data[1].revenue}`
}   