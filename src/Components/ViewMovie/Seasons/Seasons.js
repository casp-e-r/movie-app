import React from 'react'
import './Seasons.css'
import {  imageUrl, imageUrl3 } from '../../../constants/constants'
import { truncate } from '../../../helpers/helper'
import po from "../../../images/po.jpg";



function Seasons({ID,seasons}) {

  return (
  
    <div className="seasons">
        { seasons.map(s=>{
            return (s.poster_path && <div className="season" key={s.season_number}>
                <img className="season-poster" src={s.poster_path ?(imageUrl3 || imageUrl) +s.poster_path : po } alt='not found' />
                <div className="s-details">
                    <p className="number">{s.name}</p>
                    {s.episode_count && <p className="count">{s.episode_count} episodes</p>}
                    {s.air_date && <p className='date'>Air Date:{s.air_date}</p>}
                    <p className='overview'>{truncate(s.overview,100)}</p>
                </div>
            </div>)
            })}

    </div>

  )
}

export default Seasons