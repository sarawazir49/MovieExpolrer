import '../css/SearchBar.css'
export default function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form className="top-search" onSubmit={onSearch}>
      <span>🔍</span>
      <input placeholder="Search from 600,000 movies" value={search} onChange={e => setSearch(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}