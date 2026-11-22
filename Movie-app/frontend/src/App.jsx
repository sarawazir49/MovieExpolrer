import { useState, useEffect } from 'react'
import Login from './Login'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import './App.css'

const API_KEY = '0076e5a1bdb6b01bc68cabeb0c30dbcd'

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [category, setCategory] = useState('popular')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('')
  const [sort, setSort] = useState('popularity.desc')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'))
  const [showFavs, setShowFavs] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light')
  const [watchlist, setWatchlist] = useState(() => JSON.parse(localStorage.getItem('watchlist') || '[]'))
  const [showWatchlist, setShowWatchlist] = useState(false)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(r => r.json()).then(d => setGenres(d.genres || []))
  }, [])

  useEffect(() => { loadMovies() }, [category, selectedGenre, sort, year])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const loadMovies = async () => {
    let url = ''
    if (selectedGenre || year) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sort}`
      if (selectedGenre) url += `&with_genres=${selectedGenre}`
      if (year) url += `&primary_release_year=${year}`
    } else {
      url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=1`
    }
    const res = await fetch(url)
    const data = await res.json()
    let results = data.results || []
    if (sort === 'vote_average.desc') results = [...results].sort((a,b) => b.vote_average - a.vote_average)
    if (sort === 'title.asc') results = [...results].sort((a,b) => a.title.localeCompare(b.title))
    setMovies(results)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) { loadMovies(); return }
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
    const data = await res.json()
    setMovies(data.results || [])
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const toggleFav = (movie) => {
    let updated
    if (favorites.find(f => f.id === movie.id)) {
      updated = favorites.filter(f => f.id !== movie.id)
    } else {
      updated = [...favorites, movie]
    }
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const toggleWatchlist = (movie) => {
    let updated
    if (watchlist.find(w => w.id === movie.id)) {
      updated = watchlist.filter(w => w.id !== movie.id)
    } else {
      updated = [...watchlist, movie]
    }
    setWatchlist(updated)
    localStorage.setItem('watchlist', JSON.stringify(updated))
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className={darkMode ? 'hub' : 'hub light-mode'}>
      <Sidebar category={category} setCategory={setCategory} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genres={genres} user={user} onLogout={handleLogout} showFavs={showFavs} setShowFavs={setShowFavs} favCount={favorites.length} darkMode={darkMode} onToggleTheme={toggleTheme} showWatchlist={showWatchlist} setShowWatchlist={setShowWatchlist} watchCount={watchlist.length} />

      <main className="main">
        <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />

        <h1 className="big-title">{showFavs ? 'My Favorites ❤️' : showWatchlist ? 'My Watchlist 📺' : 'Discover Movies'}</h1>

        <Filters year={year} setYear={setYear} sort={sort} setSort={setSort} onClear={() => { setYear(''); setSort('popularity.desc'); setSelectedGenre(null); setCategory('popular'); setShowFavs(false); setShowWatchlist(false); setSearch(''); }} />

        <div className="movies-grid-hub">
          {(showFavs ? favorites : showWatchlist ? watchlist : movies).map(m =>
            <MovieCard key={m.id} movie={m} isFav={!!favorites.find(f => f.id === m.id)} isWatchlist={!!watchlist.find(w => w.id === m.id)} onClick={setSelectedMovie} onToggleFav={toggleFav} onToggleWatchlist={toggleWatchlist} />
          )}
        </div>

        {showFavs && favorites.length === 0 && <p style={{ color: '#888', marginTop: 20 }}>Ma 3andik favorites ba3ed! Kabsi 3al ❤️ 3al ay film.</p>}
        {showWatchlist && watchlist.length === 0 && <p style={{ color: '#888', marginTop: 20 }}>Watchlist fadi! Kabsi 3al 📺 3al ay film baddik t7adro ba3den.</p>}

        {selectedMovie && <MovieDetails movie={selectedMovie} isFav={!!favorites.find(f => f.id === selectedMovie.id)} isWatchlist={!!watchlist.find(w => w.id === selectedMovie.id)} onToggleFav={toggleFav} onToggleWatchlist={toggleWatchlist} onClose={() => setSelectedMovie(null)} />}
      </main>
    </div>
  )
}
export default App