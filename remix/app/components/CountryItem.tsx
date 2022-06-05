import { Link, useFetcher } from '@remix-run/react'

function CountryItem({
  id,
  name,
  favorite,
  withPendingUi,
  withOptimisticUi,
}: any) {
  const fetcher = useFetcher()

  const isSubmitting = fetcher.state !== 'idle'
  //const formData = fetcher.submission?.formData
  //const countryId = formData?.get('country-id')?.toString() ?? '-1'

  let favoriteIcon = favorite ? '🧡' : '🖤'

  if (isSubmitting) {
    if (withPendingUi) {
      favoriteIcon = '💛'
    }

    if (withOptimisticUi) {
      favoriteIcon = favorite ? '🖤' : '🧡'
    }
  }

  return (
    <li key={id} className="flex flex-row items-center jusity-start">
      <fetcher.Form method="post">
        <button
          type="submit"
          className="mr-2"
          name="_action"
          value="toggle-favorite"
        >
          {favoriteIcon}
        </button>

        <input type="hidden" name="country-id" value={id} />
      </fetcher.Form>

      <Link prefetch="intent" to={id}>
        {name}
      </Link>
    </li>
  )
}

export { CountryItem }
