
import { useState,createContext } from "react";

export const MovieDetailsContext=createContext(null)

function Movie({children}){
    const [MovieDetails, setMovieDetails] = useState([])
    
    return (
      <MovieDetailsContext.Provider value={{ MovieDetails, setMovieDetails}}>
        {children}
      </MovieDetailsContext.Provider>
    )
  }
  export default Movie 
  
export const ShowContext=createContext(null)  
  
export  function ShowPost({children}){
  const [show, setShow] = useState(false)
  return(
    <ShowContext.Provider value={{show,setShow}}>
      {children}
    </ShowContext.Provider>
  )

}  