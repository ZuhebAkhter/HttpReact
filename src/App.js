import React, { useState,useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MoviesForm from "./components/MoviesForm";

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
     const response= await fetch("https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");
     if(!response.ok){
      throw new Error('SomeWent wrong....retrying')
     }
     const data=await response.json();
     const loadedMovies=[];
     for(const key in data){
      loadedMovies.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate
      })
      
     }
      
       
        setMoviesList(loadedMovies);
        setLoading(false)
      }catch
        (error){
          setError(error.message)
        }
      
        setLoading(false)
       
   },[]) 
  //  useEffect(()=>{
  //   moviesHandler();
  // },[moviesHandler])
   
    

        // setTimeout(()=>{
        //   if(againRetrydata ){
        //   setAgainData(moviesHandler)
        //   }else return;
        // },5000)
        // async function postMoviesData(movie){
        //   console.log(movie)
        //   const response=await fetch('https://httpreact-2edb8-default-rtdb.firebaseio.com/movieslist.json',{
        //     method:'POST',
        //     body:JSON.stringify(movie),
        //     headers:{
        //       'content-type':'application/json'
        //     }
        //   });
        //   const data=await response.json();
        //   console.log(data)
        // }
        async function postMoviesData(movie) {
          const response = await fetch('https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          console.log(data);
        }
   
    
   
  
   
  return (
    <React.Fragment>
      <div className='section1'>
        <MoviesForm onAddMovie={postMoviesData}/>
      </div>
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
