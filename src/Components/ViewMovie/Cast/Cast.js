import React from 'react'
import { imageUrl } from '../../../constants/constants';
import './Cast.css'
import unknown from "../../../images/unknown.jpg"


function Cast({creator,cast}) {
    console.log(cast);
    return (
        
            <div className='view-cast-creator'>
                {creator && <>
                    <h1>Created by</h1>
                    <div className='creator'>
                            {creator.map(e=>{return<div className='profile-img'>
                                    <img  src={imageUrl + e.profile_path} alt='' /> 
                                    <p>{e.name}</p>
                                    <p1>{e.character}</p1>

                                 </div>})}
                    </div>
                    </>}
                    <h1>Cast</h1>
                    <div className="cast">
                    {cast &&cast.slice(0,10).map(obj =>
                        <div className='profile-img' >
                            {obj.img ? <img src={`${imageUrl}${obj.img}`} alt='' /> : <img src={unknown} alt='' />}
                            <p>{obj.name}</p>
                            <p1>{obj.character}</p1>
                        </div>
                    )}
                    </div>
                    
                    
                </div>
        
    )
}

export default Cast
