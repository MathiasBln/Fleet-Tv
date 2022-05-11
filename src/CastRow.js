import React from 'react';
import "./Modal.css";

const URL_Image = "https://image.tmdb.org/t/p/w500";

function CastRow ({castings, closeModal}) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div id="headerCast">
                    <button className="button is-success mt-5" onClick={()=> closeModal(false)}>X</button>
                    <div className="title" id="TitleCasting">
                        <h1>Castings</h1>
                    </div>
                </div>
                
                <div className="bodyCast">
                    {castings.cast.map(cast =>
                        <div id="CardCast">
                                {cast.profile_path ? <img key={cast.name} id="CastPictures" src={URL_Image + cast.profile_path} alt={cast.name}/>
                                :
                                <img  id="CastPictures" alt="No image found"></img>
                                }
                                <p>{cast.name}</p>
                        </div>
                            )} 
                </div>
            </div>
        </div>
        
    )
} 

    
export default CastRow;
