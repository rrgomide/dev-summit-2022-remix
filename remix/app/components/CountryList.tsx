import { CountryItem } from '.'

function CountryList({
  countries = [],
  withPendingUi = false,
  withOptimisticUi = false,
}) {
  return (
    <ul>
      {countries.map(({ id, name, favorite }) => {
        return (
          <CountryItem
            key={id}
            id={id}
            name={name}
            favorite={favorite}
            withPendingUi={withPendingUi}
            withOptimisticUi={withOptimisticUi}
          />
        )
      })}
    </ul>
  )
}

export { CountryList }
