import type { LinksFunction, MetaFunction } from '@remix-run/node'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/tailwind.css'
import globalStylesheetUrl from './styles/global.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    { rel: 'stylesheet', href: globalStylesheetUrl },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: `Remix`,
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>

      <body className="h-full bg-white">
        <header>
          <div className="bg-yellow-100 mx-auto p-4">
            <h1 className="text-center font-semibold text-xl">Remix</h1>
          </div>
        </header>

        <main className="my-4 ">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
