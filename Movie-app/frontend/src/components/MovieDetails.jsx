export default function MovieDetails({ movie, isFav, isWatchlist, onToggleFav, onToggleWatchlist, onClose }) {
  if (!movie) return null
  const image = movie.isCustom ? movie.customImage : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-box" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <img src={image} alt={movie.title} />
        <div className="details-info">
          <h2>{movie.title}</h2>
          <p className="details-meta">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'New'} | 📅 {movie.release_date || '---'} | 🌍 {movie.original_language || 'en'}</p>
          <p>{movie.overview || 'No description available.'}</p>
          <button className={isFav ? 'fav-btn active' : 'fav-btn'} onClick={() => onToggleFav(movie)}>
            {isFav ? '❤️ Remove from Favorites' : '🤍 Add to Favorite'}
          </button>
          <button className={isWatchlist ? 'fav-btn active' : 'fav-btn'} onClick={() => onToggleWatchlist(movie)}>
            {isWatchlist ? '📺 Remove from Watchlist' : '➕ Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  )
}