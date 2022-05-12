import React from 'react';

const URL_Image = "https://image.tmdb.org/t/p/w500";

function MovieRow ({movie, details}) {
    return (
        <div className="card m-2 mt-4" id="MoviesCard" onClick={()=>details(movie)}>
            <div className="card-image" id="MoviesCardPicture">
                <figure className="image is-3by4">
                    {movie.backdrop_path ?<img src={URL_Image + movie.poster_path} alt={movie.title}/>
                    :
                    <img id="MoviePictures" alt="No image found"></img>
                    }
                </figure>
            </div>
            <div className="card-content is-overlay	">
                <div className="content">
                    <h2 className="title has-text-white">{movie.title}</h2>      
                </div>
            </div>
        </div>
    )
} 

    
export default MovieRow;
