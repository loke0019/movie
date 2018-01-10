let app = {
    URL: 'https://api.themoviedb.org/3/',
    INPUT: null,
    init: function () {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);

        let bkbtn = document.getElementById('back-button');
        bkbtn.addEventListener('click', function () {
            innerHTML = "";
            location.reload();
        });

        //listener for enter or return
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <return>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        })
    },
    runSearch: function (ev) {
        ev.preventDefault();
        if (app.INPUT.value) {
            //if they actually typed something other than <enter>
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;

            //`${app.URL}search/movie?api_key=${KEY}@query=${app.INPUT.value}`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    showMovies: function (movies) {
        //navigate to the search results page
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        movies.forEach(function (movie) {
            let div = document.createElement('div');


            //console.log(movie.id);
            // div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            let h1 = document.createElement('h1');
            h1.textContent = movie.title;
            div.appendChild(h1);

            let img = document.createElement('img');
            img.classList.add('poster');
            img.src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;

            div.appendChild(img);



            let p = document.createElement('p');
            p.textContent = movie.overview;
            div.appendChild(p);

            let btn = document.createElement('button');
            btn.textContent = "Get recommended movies";
            btn.setAttribute("data-movie", movie.id);
            btn.addEventListener('click', app.getRecommended);
            div.appendChild(btn);

            // div.textContent = movie.overview;
            // add image, movie desciption etc
            df.appendChild(div);
        });
        section.appendChild(df);

    },
    getRecommended: function (ev) {
        let movie_id = ev.target.getAttribute("data-movie");
        console.log(ev.target.tagName, movie_id);

        //runSearch: function(ev){
        ev.preventDefault();

        //if(app.INPUT.value){
        //if they actually typed something other than <enter>
        let url = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;
        //url += "&query=" + movie_id;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                app.showRecommended(data.results);
            })
            .catch(err => {
                console.log(err);
            });
    },
    switchPages: function (pageid) {
        switch (pageid) {
            case 'recommended-results':
                document.getElementById('recommended-results').classList.add('active');
                document.getElementById('search-results').classList.remove('active');
                break;
            case 'search-results':
                document.getElementById('recommended-results').classList.remove('active');
                document.getElementById('search-results').classList.add('active');
                break;
        }


    },

  showRecommended: function(movies){
        //part of the url here is the movie id <- included in the movie object
		
	
	
       let section = document.querySelector('#recommended-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
		let h4=document.createElement('h4');
		h4.textContent='';
        movies.forEach(function(movie){
            let div = document.createElement('div');
            //div.setAttribute("data-movie", movie.id);
            
            //console.log(movie.id);
           // div.addEventListener('click',
           // app.getRecommended);
            div.classList.add('movie');
            let h2 = document.createElement('h2');
            h2.textContent = movie.title;
			h2.classList.add("movie-title");
           // div.appendChild(h1);
            
            let p =  document.createElement('p');
             p.classList.add = ("movie.desc");
			p.textContent =movie.overview;
			if(movie.overview.length>250){
				p.textContent=''.concat('overview:',movie.overview.substr(0,250,'') )
			}else{
				p.textContent=movie.overview;
			}
           
			let h2r = document.createElement('h4');
            h2r.textContent = movie.release_date;
			h2r.classList.add("movie-release");
           
			
            let imge =document.createElement('img');
            imge.classList.add('poster_recomended');
			imge.src= "https://image.tmdb.org/t/p/w185"+movie.poster_path;
			
            
            div.appendChild(h2);
			
			div.appendChild(imge);
			div.appendChild(h2r);
			
            
             
			section.appendChild(h4);
			
           div.appendChild(p);
            
            // div.textContent = movie.overview;
            // add image, movie desciption etc
            df.appendChild(div);
			
			
        });
       section.appendChild(df);
    }
    
};



document.addEventListener('DOMContentLoaded', app.init);