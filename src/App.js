import React, {useState, useEffect} from 'react';
import './App.css';
import DetailsRow from './DetailsRow';
import MovieRow from './MovieRow';


function App() {

  //Creation of State
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState({});
  const [search, setSearch] = useState('');

  useEffect(function(){
    (async function(){
      //API -> popular movies
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310')
      const responseData = await response.json()
      //API -> details by ID movie
      const details = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const detailsData = await details.json()
      //API -> details by ID movie
      const castings = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"/credits?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const castingsData = await castings.json()

      //Change Data if response is done
      if (response.ok){
        setMovies(responseData.results)
        setDetails(detailsData)
        setCast(castingsData)
      } else {
        alert(JSON.stringify(responseData.results))
      }
    })()
  },[])
  

  //Switch all data
  const handleOnSubmit = (event) => {
    event.preventDefault();
    (async function(){
      //API -> movies and castings by ID movie and the state Search
      const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&query=" + search)
      const responseData = await response.json()
      const castings = await fetch("https://api.themoviedb.org/3/movie/" + responseData.results[0]['id'] +"/credits?api_key=3e6bcbaf4ebab5cd7b844c2ed8c0d310&language=en-US")
      const castingsData = await castings.json()

      //Change Data if response is done
      if (response.ok){
        setMovies(responseData.results)
        setDetails(responseData.results[0])
        setCast(castingsData)
      }
    })()
    //Reset search
    setSearch('');
  };

  //Set the value from the input to search State
  const handleOnChange = (event) => {
    setSearch(event.target.value);
  }

  //Add on click element for switch the movies rows
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
            <input className="search" type="search" placeholder=' Search' value={search} onChange={handleOnChange}></input>
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
