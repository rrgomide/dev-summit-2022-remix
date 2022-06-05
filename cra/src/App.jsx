import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

import { Country, CountryList } from './components'
import {
  apiGetAllCountryNames,
  apiGetCountryData,
  apiToggleFavoriteCountry,
} from './api/api'

export default function App() {
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    async function getApiCountries() {
      setLoadingCountries(true)
      const apiCountries = await apiGetAllCountryNames()

      setCountries(apiCountries)
      setLoadingCountries(false)
    }

    getApiCountries()
  }, [])

  useEffect(() => {
    if (!selectedCountryId) {
      return
    }

    async function getCountryData() {
      const apiCountry = await apiGetCountryData(selectedCountryId)
      setSelectedCountry(apiCountry)
    }

    getCountryData()
  }, [selectedCountryId])

  async function handleToggleFavorite(countryId) {
    /**
     * Backend
     */
    await apiToggleFavoriteCountry(countryId)

    /**
     * Frontend
     */
    setCountries(currentCountries =>
      currentCountries.map(country => {
        if (country.id === countryId) {
          return { ...country, favorite: !country.favorite }
        }

        return { ...country }
      })
    )
  }

  function handleSelectCountry(countryId) {
    setSelectedCountryId(countryId)
  }

  if (loadingCountries) {
    return (
      <div className="text-center mt-8">
        <ClipLoader />
      </div>
    )
  }

  const favoriteCountries = countries.filter(({ favorite }) => favorite).length

  let countryDetailJsx = <p>Nenhum país selecionado.</p>

  if (selectedCountry) {
    countryDetailJsx = <Country>{selectedCountry}</Country>
  }

  return (
    <div>
      <header>
        <div className="bg-blue-100 mx-auto p-4">
          <h1 className="text-center font-semibold text-xl">
            create-react-app
          </h1>
        </div>
      </header>

      <main className="my-4">
        <h2 className="text-center font-semibold text-lg">
          {favoriteCountries} país(es) favoritado(s)
        </h2>

        <div className="container mx-auto mt-4">
          <div className="flex flex-row items-start justify-between">
            <aside>
              <CountryList
                countries={countries}
                onSelect={handleSelectCountry}
                onToggleFavorite={handleToggleFavorite}
              />
            </aside>

            <section className="flex-1">{countryDetailJsx}</section>
          </div>
        </div>
      </main>
    </div>
  )
}
