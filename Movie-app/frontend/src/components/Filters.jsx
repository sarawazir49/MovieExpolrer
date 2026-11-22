import '../css/Filters.css'
export default function Filters({ year, setYear, sort, setSort, onClear }) {
  return (
    <div className="filters">
      <label>Year:
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
      </label>
      <label>Sort:
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="title.asc">Title A-Z</option>
        </select>
      </label>
      <button type="button" className="clear-filter" onClick={onClear}>Clear ✖</button>
    </div>
  )
}