import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  console.log(props)

  async function deleteDataHandler(){
    console.log(props.id)
    await fetch(`https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,{
      method:'DELETE',

    })
  }
  
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button type='button' onClick={deleteDataHandler}>Delete</button>
    </li>
  );
};

export default Movie;
