export default function Sidebar({ category, setCategory, selectedGenre, setSelectedGenre, genres, user, onLogout, showFavs, setShowFavs, favCount, darkMode, onToggleTheme, showWatchlist, setShowWatchlist, watchCount }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">Movie Hub</h2>
      <div className="side-section">
        <h3>Discover</h3>
        <button className={category==='popular' && !selectedGenre && !showFavs && !showWatchlist ? 'active' : ''} onClick={() => { setCategory('popular'); setSelectedGenre(null); setShowFavs(false); setShowWatchlist(false) }}>💎 Popular</button>
        <button className={category==='upcoming' && !selectedGenre && !showFavs && !showWatchlist ? 'active' : ''} onClick={() => { setCategory('upcoming'); setSelectedGenre(null); setShowFavs(false); setShowWatchlist(false) }}>✨ Upcoming</button>
        <button className={category==='top_rated' && !selectedGenre && !showFavs && !showWatchlist ? 'active' : ''} onClick={() => { setCategory('top_rated'); setSelectedGenre(null); setShowFavs(false); setShowWatchlist(false) }}>❤️ Top Rated</button>
        <button className={showFavs ? 'active' : ''} onClick={() => { setShowFavs(true); setShowWatchlist(false) }}>❤️ My Favorites ({favCount})</button>
        <button className={showWatchlist ? 'active' : ''} onClick={() => { setShowWatchlist(true); setShowFavs(false) }}>📺 My Watchlist ({watchCount})</button>
      </div>
      <div className="side-section">
        <h3>Genres</h3>
        {genres.slice(0, 8).map(g => (
          <button key={g.id} className={selectedGenre===g.id ? 'active' : ''} onClick={() => { setSelectedGenre(g.id); setShowFavs(false); setShowWatchlist(false) }}>▶ {g.name}</button>
        ))}
        <button className="show-all" onClick={() => { setSelectedGenre(null); setShowFavs(false); setShowWatchlist(false) }}>Show All</button>
      </div>
      <div className="side-bottom">
        <p>Hi, {user} 👋</p>
  
        <button onClick={onToggleTheme} className="theme-btn">{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </aside>
  )
}