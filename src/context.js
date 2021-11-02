
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
  

export const TvContext=createContext(null)
  
function Tv({children}){
  const [tv, setTv] = useState([])
  const [s_no, setS_no] = useState([])
  const [ep_no, setEp_no] = useState([])
  
  return (
    <TvContext.Provider value={{ tv, setTv,s_no, setS_no,ep_no, setEp_no}}>
      {children}
    </TvContext.Provider>
  )
}
export default Tv 