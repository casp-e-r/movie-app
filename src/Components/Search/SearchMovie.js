import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import './Search.css'
import Skeleton from 'react-loading-skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
// import PaginationComp from './Pagination/PaginationComp'


function SearchMovie() {
    const [page, setPage] = useState(1)
    const [movieResults, setMovieResults] = useState([])
    const [loading, setLoading] = useState(true)
    const { query } = useParams()
    const history = useHistory()
    // const location=useLocation()
    // let page=location.state.page



useEffect(() => {
        async function fetch(){
            try{
                await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`).then(e => {  
                    setMovieResults(e.data.results)
                })}
            catch(e){console.log(e);}
            finally{
                setLoading(false)
            }
        }
        fetch()
    }, [query,page])
    const handlePageChange=()=>{
        setPage(page+1)
    }
    console.log(movieResults,page);
    return (
        <div>
        <div className='search-grid-wrapper'>
            {movieResults && movieResults.map((obj, index) =>
            <div className='card-view'>

                        <div className='card-poster'>
                            {loading ? <Skeleton height={'100%'} width={'100%'}/>:
                            <LazyLoadImage
                            className='img-poster'
                            src={imageUrl+obj.poster_path} alt={obj.name}
                            height={'100%'} width={'100%'}
                            effect='opacity'
                            onClick={() => {
                                history.push(`/view/${obj.id}`, { id: obj.id })
                            }}
        
                            />
                            // <img className='img-poster'
                            //     key={obj.id}
                            //     src={imageUrl + obj.poster_path} alt={obj.name}
                            //     onClick={() => {
                            //         history.push(`/view/${obj.id}`, { id: obj.id })
                            //     }}
                            // />
                            }
                        </div>
                            {loading ? null:<div className='card-name'>
                            <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                            </div>}
                        </div>
                    )}
        </div>
        <div>
        {/* <PaginationComp
        activePage={page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={movieResults.total_pages}
        totalPage={movieResults.total_pages}
      /> */}
        </div>
        </div>
    )
}

export default SearchMovie
