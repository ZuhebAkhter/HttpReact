import React,{useRef} from 'react'

const MoviesForm = (props) => {
  const titleInputref=useRef();
  const textInputref=useRef();
  const dateInputref=useRef();

  const SubmitHandler=(event)=>{
   event.preventDefault();
   const NewObj={
    title:titleInputref.current.value,
    openingText:textInputref.current.value,
     releaseDate:dateInputref.current.value 
   }
   console.log(NewObj)
   props.onAddMovie(NewObj)

  }
    


  return (
    <form onSubmit={SubmitHandler}>
        <label>Title</label>
        <input type='text' ref={titleInputref}></input>
        <label>Opening Text</label>
        <input type='text' ref={textInputref}></input>
        <label>Date</label>
        <input type='date' ref={dateInputref}></input>
        <button type='submit'>Add Movies</button>

        
    </form>
  )
}

export default MoviesForm