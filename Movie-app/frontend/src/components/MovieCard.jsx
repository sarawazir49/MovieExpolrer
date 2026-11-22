export default function MovieCard({ movie, isFav, isWatchlist, onClick, onToggleFav, onToggleWatchlist }) {
  const image = movie.customImage || `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={image} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span>Language:</span><b>{movie.original_language}</b>
        </div>
        <div className="movie-meta">
          <span>Vote Average:</span><b>{movie.vote_average ? movie.vote_average.toFixed(1) : 'New'}</b>
        </div>
        <div className="movie-meta">
          <span>Release Date</span><b>{movie.release_date}</b>
        </div>

        <div className="card-actions">
          <button
            className={isFav ? 'fav-btn active' : 'fav-btn'}
            onClick={(e) => { e.stopPropagation(); onToggleFav(movie) }}
          >
            {isFav ? '❤️ Favorited' : '🤍 Favorite'}
          </button>

          <button
            className={isWatchlist ? 'watch-btn active' : 'watch-btn'}
            onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie) }}
          >
            {isWatchlist ? '📺 In Watchlist' : '➕ Watchlist'}
          </button>
        </div>

      </div>
    </div>
  )
}