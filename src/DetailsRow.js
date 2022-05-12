import React, {useState} from 'react';
import CastRow from './CastRow';

const URL_Image = "https://image.tmdb.org/t/p/w500";

function DetailsRow ({details, castings}) {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="card m-4" id="DetailsCard">

      <div id="left">
        {details.backdrop_path ? <img  id="DetailsPictures" src={URL_Image + details.backdrop_path} alt={details.title}/>
        :
        <img id="DefaultPictures" alt="No image found"></img>
        }
        <h1 className="title" id="TitleDetails">{details.title}</h1>    
        <p className="subtitle">{details.tagline}</p>            
      </div>

      <div id="right">
        <div className="card-content" id="DetailsContent">
          <div className="content">
            <div id="top">
              <p>Release: <br/> <span id="Release">{details.release_date}</span>  </p>
            </div>
            <p id="OverviewDetails">{details.overview}</p> 
            <div id="ProductionContainer">
              <div id="marquee">
                {(details.production_companies || []).map((production) => 
                <img key={production.name} id="ProductionPictures" src={URL_Image + production.logo_path} alt={production.name}/>
                )}  
              </div>
            </div>
            <div id="infoSection">
              <h4>{details.vote_average}/10</h4>
              <button type="button" className="button is-success" id="openModal" onClick={()=>{setOpenModal(true);}}>Cast +</button>
            </div>
            {openModal && <CastRow  key={castings.id} castings={castings} closeModal={setOpenModal}/>}
          </div>
        </div>
      </div>
      
    </div> 
  )
} 

    
export default DetailsRow;
