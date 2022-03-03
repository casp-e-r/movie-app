import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import './Search.css'
import Skeleton from 'react-loading-skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { delay, getYear } from '../../helpers/helper'
import ReactPaginate from 'react-paginate';
import {GrStar} from 'react-icons/gr'
import po from "../../images/po.jpg"





function SearchMovie() {
    const [page, setPage] = useState(1)
    const [movieResults, setMovieResults] = useState([])
    const [loading, setLoading] = useState(true)
    const { query } = useParams()
    const history = useHistory()


useEffect(() => {
    window.scrollTo(0,0)
    
}, [page])

useEffect(() => {
        async function fetch(){
            try{
                await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`).then(e => {  
                    setMovieResults(e.data)
                })}
            catch(e){console.log(e);}
            finally{
                await delay(500)
                setLoading(false)
            }
        }
        fetch()
    }, [query,page])
    const handlePageChange=(e)=>{
    console.log(e);
        setPage(e)
    }
    console.log(movieResults,page);
    return (
        <div>
        <div className='search-grid-wrapper'>
            {movieResults.results && movieResults.results.map((obj, index) =>
             <div className='card-view'>

                        <div className='card-poster'>
                            {loading || movieResults.results.length === 0 ? <Skeleton height={'100%'} width={'100%'}/>:
                            <LazyLoadImage
                            className='img-poster'
                            src={obj.poster_path ? imageUrl+obj.poster_path : po } alt={obj.name}
                            height={'100%'} width={'100%'}
                            effect='opacity'
                            onClick={() => {
                                history.push(`/view/${obj.id}`, { id: obj.id,media:'movie' })
                            }}/>}
                        </div>
                            {loading ? null:<div className='card-name'>
                            <p>{obj ? obj.name || obj.original_name || obj.title : ""}</p>
                            <p1>{getYear(obj?.release_date || obj.first_air_date)} 
                            <p1><GrStar style={{'marginLeft':'50%','color':'yellow','fontSize':'.71rem' }}/>{obj.vote_average}</p1>
                            </p1>
                            </div>}
                        </div>
                    )}
                {movieResults.total_results===0 && <div> no results</div>}

        </div>
        <div className='pagination-outer'>
            {movieResults.total_pages>1 &&
        <ReactPaginate
                pageCount={Math.floor(movieResults.total_pages)}
                onPageChange={(e)=>handlePageChange(e.selected+1)}
                previousLabel="previous"
                nextLabel="next"
                breakLabel="..."
                breakClassName="break-me"
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                subContainerClassName="pages pagination"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
              />}
        </div>
        </div>
    )
}

export default SearchMovie
