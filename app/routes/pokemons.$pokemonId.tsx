import { getPokemonInfo } from "../queryHandler";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useParams, useLoaderData } from "@remix-run/react";

export const loader = async() => {
    const pokemons = await getPokemonInfo(1);
    return pokemons;
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = new URLSearchParams(await request.text());
    const pokemonId = formData.get("pokemon");
    return redirect(`/pokemons.${pokemonId}`);
}

export default function Home() {
    const pokemons = useLoaderData()["pokemon_v2_pokemon"][0]
    const pokemonBaseExperience = pokemons["base_experience"]
    const pokemonHeight = pokemons["height"]
    const pokemonWeight = pokemons["weight"]
    const pokemonMoves = pokemons["pokemon_v2_pokemonmoves"]
    const pokemonTypes = pokemons["pokemon_v2_pokemontypes"]
    return (
        <div>
            {`Base Experience: ${pokemonBaseExperience}`}
            <br />
            {`Height: ${pokemonHeight}`}
            <br />
            {`Weight: ${pokemonWeight}`}
            <br />
            {pokemonTypes.map(type => type["pokemon_v2_type"]["name"] + ", ")}
            <br />
            {pokemonMoves.map(move => move["pokemon_v2_move"]["name"] + ", ")}
            {/* {pokemonTypes} */}
        </div>
    );
}