import { LoaderFunctionArgs, json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';
import { PocketKnife } from 'lucide-react';

const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')

const pokemonNameId = gql`
    query PokeAPIquery($searchQuery: String!) {
        pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}, limit: 10) {
            id
            name
        }
    }
`;

const pokemonInfo = gql`
    query PokeAPIquery($searchQuery: Int) {
        pokemon_v2_pokemon(where: {id: {_eq: $searchQuery}}) {
            base_experience
            height
            weight
            pokemon_v2_pokemonmoves {
                pokemon_v2_move {
                    name
                }
            }            
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
        }
    }
`

export const getPokemonName = async (name: string) => {
    return (await client.request(pokemonNameId, {searchQuery: name}))["pokemon_v2_pokemon"];
}

export const getPokemonInfo = async (id: Number) => {
    return (await client.request(pokemonInfo, {searchQuery: id}));
}