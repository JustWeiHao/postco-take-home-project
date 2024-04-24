import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { SearchBar } from "./components/ui/SearchBar";
import styles from './tailwind.css?url';
import { getPokemonName } from "./queryHandler"
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
    const formData = new URLSearchParams(await request.text())
    const pokemonName = formData.get("pokemon")
    const pokemons = await getPokemonName(`${pokemonName ? pokemonName : ""}%`)
    return json({ pokemons });
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const pokemonPrefix = formData.get("pokemon");
    const pokemonId = await getPokemonName(`${pokemonPrefix ? pokemonPrefix : ""}%`)
    return redirect("/");
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    // (cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
export default function App() {
    // useEffect(() => {
    //     window.localStorage.setItem("pokemons", "charizard");
    //     const localPokemons = window.localStorage.getItem("pokemons");  
    //     console.log(localPokemons);
    // },[]);

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