import React, { useState,useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMoviesList] = useState([]);
  const [Loading,setLoading]= useState(false);
  const [error,setError]=useState(null)
  // const [againRetrydata,setAgainData]=useState(true)
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
  
  
 
  
   const moviesHandler=useCallback( async()=>{
    setLoading(true)
    setError(!error)
    try{
     const response= await fetch("https://swapi.dev/api/films");
     if(!response.ok){
      throw new Error('SomeWent wrong....retrying')
     }
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
      }catch
        (error){
          setError(error.message)
        }
      
        setLoading(false)
       
   },[]) 
   useEffect(()=>{
    moviesHandler();
  },[moviesHandler])
   
    

        // setTimeout(()=>{
        //   if(againRetrydata ){
        //   setAgainData(moviesHandler)
        //   }else return;
        // },5000)
  
   
    
   
  
   
  return (
    <React.Fragment>
      <section>
        <button onClick={moviesHandler}>Fetch Movies</button>
        <button >Cancel</button>
      </section>
      <section>
        {!Loading && <MoviesList movies={movies} />}
        {Loading && <p>Loading...</p>}
        {!Loading && error && <p>{error}</p>}
        {/* {againRetrydata && ''} */}
        {/* {!errorfetch && !Loading && <p>Retrying Stopped</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
