function CountryList({
  countries = [],
  onSelect = null,
  onToggleFavorite = null,
}) {
  return (
    <ul>
      {countries.map(({ id, name, favorite }) => {
        const favoriteIcon = favorite ? '🧡' : '🖤'

        return (
          <li key={id}>
            <span
              className="cursor-pointer mr-2"
              onClick={() => onToggleFavorite(id)}
            >
              {favoriteIcon}
            </span>

            <span className="cursor-pointer" onClick={() => onSelect(id)}>
              {name}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export { CountryList }
