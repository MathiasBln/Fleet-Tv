import React, {useState, useEffect} from 'react';
import './App.css';
import DetailsRow from './DetailsRow';
import MovieRow from './MovieRow';


function App() {

  //Liste des films
  const [movies, setMovies] = useState([]);
  //Détail d'un film
  const [details, setDetails] = useState({});
  //Détail Cast
  const [cast, setCast] = useState({});
  //Gere l'état de l'input
  const [search, setSearch] = useState('');

  useEffect(function(){
    (async function(){
      //Connexion vers une liste de film
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310')
      const responseData = await response.json()
      //Connexion vers les détails d'un film via son ID
      const details = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const detailsData = await details.json()
      //Connexion vers le Cast via son ID
      const castings = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"/credits?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const castingsData = await castings.json()

      if (response.ok){
        setMovies(responseData.results)
        setDetails(detailsData)
        setCast(castingsData)
      } else {
        alert(JSON.stringify(responseData.results))
      }
    })()
  },[])
  
  //Gestion de l'event donné dans l'input
  const handleOnSubmit = (event) => {
    event.preventDefault();
    (async function(){
      //Connextion vers la liste de film contenant la recherche
      const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&query=" + search)
      const responseData = await response.json()
      const castings = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"/credits?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const castingsData = await castings.json()
      if (response.ok){
        setMovies(responseData.results)
        setDetails(responseData.results[0])
        setCast(castingsData)
      }
    })()
    //Reset le search
    setSearch('');
  };

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  }

  //Change les details en fonction du film sélectionné
  const SelectDetails = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/movie/" + movie.id +"?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US");
    const detailsData = await data.json()
    const castings = await fetch("https://api.themoviedb.org/3/movie/" + movie.id +"/credits?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
    const castingsData = await castings.json()
    setDetails(detailsData)
    setCast(castingsData)
  }

  return (
    <div className="App">
      <div id="Background"></div>
      <div id='MoviesSection'>
        <div  id="MoviesList">
          <form className="formSearch" onSubmit={handleOnSubmit}>
            <input className="search" type="search" placeholder='Search...' value={search} onChange={handleOnChange}></input>
          </form>
          {movies.map(movie => 
                  <MovieRow 
                    key={movie.id}
                    movie={movie}
                    details={SelectDetails}
                  />
                  )} 
        </div>

        <div id="MovieDetails">
          <DetailsRow details={details} castings={cast}/>       
        </div>
      </div>
    </div>
  );
}

export default App;
