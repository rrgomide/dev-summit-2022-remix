import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

const loader: LoaderFunction = async () => {
  return redirect('/countries')
}

export { loader }
