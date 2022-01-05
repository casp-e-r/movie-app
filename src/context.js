
import { useState,createContext } from "react";

// export const MovieDetailsContext=createContext(null)

// function Movie({children}){
//     const [MovieDetails, setMovieDetails] = useState([])
    
//     return (
//       <MovieDetailsContext.Provider value={{ MovieDetails, setMovieDetails}}>
//         {children}
//       </MovieDetailsContext.Provider>
//     )
//   }
//   export default Movie 
  
// export const ShowContext=createContext(null)  
  

export const LoadingContext=createContext(null)
  
function Loading({children}){
  const [GlobalLoading, setGlobalLoading] = useState(true)
  // const [s_no, setS_no] = useState([])
  // const [ep_no, setEp_no] = useState([])
  
  return (
    <LoadingContext.Provider value={{ GlobalLoading, setGlobalLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}
export default Loading