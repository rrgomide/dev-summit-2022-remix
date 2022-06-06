import { NavLink, useFetcher } from '@remix-run/react'

type Props = {
  id: string
  name: string
  favorite: boolean
  withPendingUi: boolean
  withOptimisticUi: boolean
}

function CountryItem({
  id,
  name,
  favorite,
  withPendingUi,
  withOptimisticUi,
}: Props) {
  const fetcher = useFetcher()

  const isSubmittingOrLoading = fetcher.state !== 'idle'

  let favoriteIcon = favorite ? '🧡' : '🖤'

  if (isSubmittingOrLoading) {
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

      <NavLink
        prefetch="intent"
        to={id}
        className={({ isActive }) => (isActive ? 'underline' : undefined)}
      >
        {name}
      </NavLink>
    </li>
  )
}

export { CountryItem }
