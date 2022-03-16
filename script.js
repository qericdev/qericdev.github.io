let arrayOfMovies = []
document.getElementById("searchButton").addEventListener("click", function() {
    fetch(`http://www.omdbapi.com/?apikey=4003b458&s="${document.getElementById("movieToSearch").value}"`)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "True") {
                document.getElementById("mainContent").style.backgroundImage = "none";
                
                for(let i = 0; i < data.Search.length; i++) {
                    fetch(`http://www.omdbapi.com/?apikey=4003b458&i=${data.Search[i].imdbID}`)
                        .then(res => res.json())
                        .then(dataByMovie => {
                            let dataPerMovie = `
                            <div class="movieDescription">
                                <div>
                                    <img class="poster" src="${data.Search[i].Poster}"/>
                                </div>
                                <div class="movieData">
                                    <div class="titleAndRating">
                                        <h1>${data.Search[i].Title}</h1>
                                        <img src="./images/star.png"/>
                                        <p>${dataByMovie.imdbRating}</p>
                                    </div>
                                    <div class="runtimeAndGenre">
                                        <p>${dataByMovie.Runtime}</p>
                                        <p class="genre">${dataByMovie.Genre}</p>
                                        <button class="addButton" id="addMovie${i}"> <img src="./images/addmovie.png"/>Watchlist</button>
                                    </div>
                                    <div class="plot">
                                        <p>${dataByMovie.Plot}</p>
                                    </div>
                                </div>
                            </div>
                            <hr class="separator">
                            `
                            document.getElementById("mainContent").children[i].innerHTML = dataPerMovie;

                            document.getElementById(`addMovie${i}`).addEventListener("click", function() {
                                let newDataPerMovie = `
                                <div class="movieDescription">
                                    <div>
                                        <img class="poster" src="${data.Search[i].Poster}"/>
                                    </div>
                                    <div class="movieData">
                                        <div class="titleAndRating">
                                            <h1>${data.Search[i].Title}</h1>
                                            <img src="./images/star.png"/>
                                            <p>${dataByMovie.imdbRating}</p>
                                        </div>
                                        <div class="runtimeAndGenre">
                                            <p>${dataByMovie.Runtime}</p>
                                            <p class="genre">${dataByMovie.Genre}</p>
                                            <button class="buttonRemove" id="removeMovie${i}"> <img src="./images/remove.png"/>Remove</button>
                                        </div>
                                        <div class="plot">
                                            <p>${dataByMovie.Plot}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr class="separator">
                                `
                                document.getElementById(`addMovie${i}`).innerHTML=`<button class="addButton" id="addMovie${i}"> <img style="width: 20px;" src="./images/check.png"/>Added</button>`

                                if(JSON.parse(localStorage.getItem("arrayOfMovies")) === null) {
                                    arrayOfMovies.push(newDataPerMovie);
                                    localStorage.setItem("arrayOfMovies", JSON.stringify(arrayOfMovies));
                                    
                                } else {
                                    let prevArray = JSON.parse(localStorage.getItem("arrayOfMovies"))
                                    prevArray.push(newDataPerMovie)
                                    localStorage.setItem("arrayOfMovies", JSON.stringify(prevArray));
                                }
                            })
                })
            }
            
            } else {
                document.getElementById("mainContent").children[0].innerHTML = `<p class="unableResults">Unable to find what you’re looking for. Please try another search.</p>`
                document.getElementById("mainContent").style.backgroundImage = "none";
            }
        });
});

function mySavedMovies() {

    if(JSON.parse(localStorage.getItem("arrayOfMovies")) !== null) {
        let dataToShow = JSON.parse(localStorage.getItem("arrayOfMovies"));
        document.getElementById(`unableResultsId`).innerHTML =""

        for(let i = 0; i < dataToShow.length; i++) {
            if( i < 23) {
                document.getElementById(`watchlist${i}`).innerHTML = dataToShow[i]
            }
        }

        for(let i = 1; i<dataToShow.length+1; i++) {
            if(i < 24) {
                document.getElementsByTagName("button")[i].addEventListener("click", function() {
                    document.getElementById(`watchlist${i-1}`).innerHTML = ""
                    dataToShow.splice(i-1,1)
                    localStorage.setItem("arrayOfMovies",JSON.stringify(dataToShow))
                })
            }
        }
    }
}
