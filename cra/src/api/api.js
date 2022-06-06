import axiosModule from 'axios'

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' })

async function apiGetAllCountryNames() {
  const { data } = await axios.get('/countries')

  const response = data
    .map(item => {
      const { id, name, favorite } = item

      return {
        id,
        name: name.common,
        favorite,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return response
}

async function apiGetCountryData(countryId) {
  const { data: countryData } = await axios.get(`/countries/${countryId}`)

  const { id, favorite, name, population, region, flags } = countryData

  const response = {
    id,
    favorite,
    name: name.common,
    population,
    region,
    flag: flags.svg ?? flags.png,
  }

  return response
}

async function apiToggleFavoriteCountry(countryId) {
  const { data: countryData } = await axios.get(`/countries/${countryId}`)
  const { favorite } = countryData

  await axios.put(`/countries/${countryId}`, {
    ...countryData,
    favorite: !favorite,
  })
}

export { apiGetAllCountryNames, apiToggleFavoriteCountry, apiGetCountryData }
