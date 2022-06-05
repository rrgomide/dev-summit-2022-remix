import React from 'react'
import { helpersFormatNumber } from '../helpers'

function CountryDetail({ children: countryData }: any) {
  const { name, flag, population, region } = countryData

  return (
    <div key={name} className="flex flex-col items-center">
      <h3 className="text-center font-semibold text-xl my-4">{name}</h3>

      <img width={300} height={150} src={flag} alt={name} />

      <ul>
        <li>
          <strong>População: </strong>
          {helpersFormatNumber(population)}
        </li>

        <li>
          <strong>Região: </strong>
          {region}
        </li>
      </ul>
    </div>
  )
}

export { CountryDetail }
