import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { SearchBar } from "./components/ui/SearchBar";
import styles from './tailwind.css?url';
import { GraphQLClient } from 'graphql-request';


const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')

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