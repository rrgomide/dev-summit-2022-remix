import {
  useLoaderData,
  useActionData,
  Outlet,
  Form,
  useSubmit,
} from '@remix-run/react'

import type { LoaderFunction, ActionFunction } from '@remix-run/node'

import { json } from '@remix-run/node'
import {
  apiGetAllCountryNames,
  apiToggleFavoriteCountry,
} from '~/server/api.server'

import { CountryList } from '~/components'
import { useHydrated } from 'remix-utils'

const loader: LoaderFunction = async () => {
  const countries = await apiGetAllCountryNames()
  const favoriteCountries = countries.filter(({ favorite }) => favorite).length

  return json({ countries, favoriteCountries })
}

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const formAction = formData.get('_action')

  console.log(formAction)

  switch (formAction) {
    case 'toggle-favorite': {
      const countryId = formData.get('country-id')

      if (!countryId) {
        throw new Error('oops')
      }

      await apiToggleFavoriteCountry(countryId.toString())
      return json({})
    }

    case 'change-improvement': {
      const improvementType = formData.get('improvement') ?? 'none'
      return json({ improvementType })
    }

    default:
      return json({})
  }
}

function ExtraControls() {
  const submit = useSubmit()

  function handleSubmit(event: any) {
    submit(event.currentTarget)
  }

  return (
    <Form
      method="post"
      className="flex flex-row items-center justify-end space-x-4 px-4 my-4"
      onChange={handleSubmit}
    >
      <input type="hidden" name="_action" value="change-improvement" />

      <label className="flex flex-row items-center justify-start space-x-2">
        <input type="radio" name="improvement" value="none" />
        <span>Sem melhorias</span>
      </label>

      <label className="flex flex-row items-center justify-start space-x-2">
        <input type="radio" name="improvement" value="pending-ui" />
        <span>Pending UI</span>
      </label>

      <label className="flex flex-row items-center justify-start space-x-2">
        <input type="radio" name="improvement" value="optimistic-ui" />
        <span>Optimistic UI</span>
      </label>
    </Form>
  )
}

function Countries() {
  const { countries, favoriteCountries } = useLoaderData()
  const isJavaScriptEnabled = useHydrated()

  const actionData = useActionData()
  const pendingUi = actionData?.improvementType === 'pending-ui'
  const optimisticUi = actionData?.improvementType === 'optimistic-ui'

  return (
    <>
      {isJavaScriptEnabled && <ExtraControls />}

      <h2 className="text-center font-semibold text-lg">
        {favoriteCountries} país(es) favoritado(s)
      </h2>

      <div className="container mx-auto mt-4">
        <div className="flex flex-row items-start justify-between">
          <aside>
            <CountryList
              countries={countries}
              withPendingUi={pendingUi}
              withOptimisticUi={optimisticUi}
            />
          </aside>

          <section className="flex-1">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  )
}

export { loader, action }
export default Countries
