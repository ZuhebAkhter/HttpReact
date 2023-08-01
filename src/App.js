import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMoviesList] = useState([]);
  const [Loading,setLoading]= useState(false);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
   async function moviesHandler() {
    setLoading(true)
     const response= await fetch("https://swapi.dev/api/films");
     const data=await response.json();
      
        const dataConvert = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMoviesList(dataConvert);
        setLoading(false)
      
    
  
   }
  return (
    <React.Fragment>
      <section>
        <button onClick={moviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!Loading && <MoviesList movies={movies} />}
        {Loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
