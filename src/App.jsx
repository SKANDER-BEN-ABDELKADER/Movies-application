import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import MovieCard from './components/MovieCard'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY
const API_OPTION = 
{method: 'GET',
header:{
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
}
}


const App = () => {
  const [searchTerme, setSearchTerme] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [moviesListe, setMoviesListe] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('') 
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      if (data.response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMoviesListe([]);
        return;
      }
      setMoviesListe(data.results)
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Failed to fetch movies')
    }finally{
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern'/>
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>Find a <span className='text-gradient'>Movie</span> You'll enjoy without the hassle</h1>
                <Search searchTerme={searchTerme} setSearchTerme={setSearchTerme}/>
        </header>
        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <p className='text-white'>Loading ...</p>
          ) : errorMessage ? (
            <p className='text-white'>{errorMessage}</p>
          ) : (
            <ul>
              {moviesListe.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
         </section>
    </div>
    </main>

  )
}

export default (App)
