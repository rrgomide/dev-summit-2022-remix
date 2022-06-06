import { useLoaderData } from '@remix-run/react'

import type { LoaderFunction, ActionFunction } from '@remix-run/node'

import { json } from '@remix-run/node'
import { apiGetCountryData } from '~/server/api.server'
import type { Country } from '~/types'
import { CountryDetail } from '~/components'

type LoaderData = {
  countryData: Country
}

const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  if (!id) {
    throw new Error('oops')
  }

  const countryData = await apiGetCountryData(id)
  return json<LoaderData>({ countryData })
}

const action: ActionFunction = async ({ request, params }) => {
  return json({})
}

function CountryId() {
  const { countryData } = useLoaderData() as LoaderData
  return <CountryDetail>{countryData}</CountryDetail>
}

export { loader, action }
export default CountryId
