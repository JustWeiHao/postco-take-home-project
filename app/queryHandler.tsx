import { LoaderFunctionArgs, json } from '@remix-run/node';
import { GraphQLClient, gql } from 'graphql-request';
import { PocketKnife } from 'lucide-react';
import type { HasId, HasName } from './types';

type PokeAPIResponse<T> = {
    pokemon_v2_pokemon: T[]
}
  
type PokemonNameWithId = HasName & HasId;

type PokemonTypesDetails = {
    pokemon_v2_type: HasName;
}

type PokemonTypes = PokemonTypesDetails[];

type PokemonMovesDetails = {
    pokemon_v2_move: HasName;
    level: number;
}

type PokemonMoves = PokemonMovesDetails[];

type PokemonStatsDetails = {
    base_stat: number;
    pokemon_v2_stat: HasName;
}

type PokemonStats = PokemonStatsDetails[];

export type PokemonInfo = HasName & HasId & {
    base_experience: number;
    height: number;
    weight: number;
    pokemon_v2_pokemontypes: PokemonTypes;
    pokemon_v2_pokemonmoves: PokemonMoves;
    pokemon_v2_pokemonstats: PokemonStats;
}

const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta')

const pokemonNameId = gql`
query PokeAPIquery($searchQuery: String!) {
    pokemon_v2_pokemon(where: {name: {_like: $searchQuery}}) {  
        id
        name
    }
}
`;

const pokemonInfo = gql`
query PokeAPIquery($searchQuery: Int!) {
  pokemon_v2_pokemon(where: {id: {_eq: $searchQuery}}) {
    id
    base_experience
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonmoves(where: {pokemon_id: {_eq: $searchQuery}}, limit: 6) {
      pokemon_v2_move {
        name
      }
      level
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
  }
}
`;

export const getPokemonNameId = async (name: string): Promise<PokeAPIResponse<PokemonNameWithId>> => {
    return (await client.request(pokemonNameId, {searchQuery: name}));
}

export const getPokemonInfo = async (id: number): Promise<PokemonInfo> => {
    return (await client.request(pokemonInfo, {searchQuery: id}));
}