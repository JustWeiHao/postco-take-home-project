import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { SearchBar } from "./components/ui/SearchBar";
import styles from './tailwind.css?url';
import { getPokemonName } from "./queryHandler"

export const loader = async ({ request }) => {
    const formData = new URLSearchParams(await request.text())
    const pokemonName = formData.get("pokemon")
    const pokemons = await getPokemonName(`${pokemonName ? pokemonName : ""}%`)
    return json({ pokemons });
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    // (cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
export default function App() {
    return (
        <html lang="en">
            <head>
                <link 
                    rel="icon"
                    href="data:image/x-icon;base64,AA"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <h1>Hello world!</h1>
                <SearchBar />
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
}