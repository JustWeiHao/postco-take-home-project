import { Box, Card, CardContent, CardHeader, CardMedia, Chip, List, ListItem } from "@mui/material";
import { PokemonType } from "../enums";
import type { PokemonInfo } from "../queryHandler";
import { capitaliseInitial } from "~/utils/utils";

type PokemonInfoCardProps = {
    pokemon: PokemonInfo;
}

const pokemonTypeToColor = (pokemonType: string) : string => {
    switch(pokemonType) {
        case PokemonType.FIRE :
            return "bg-red-400";
        case PokemonType.FLYING :
            return "bg-blue-200";
        case PokemonType.GRASS :
            return "bg-green-400";
        case PokemonType.WATER :
            return "bg-blue-400";
        case PokemonType.NORMAL :
            return "bg-gray-300";
        case PokemonType.PSYCHIC :
            return "bg-pink-300";
        case PokemonType.POISON :
            return "bg-purple-300";
        default:
            return "bg-white";
    }
}

const formatPokemonName = (name: string) : string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const PokemonInfoCard = ({pokemon}: PokemonInfoCardProps) => {
    return (<Card>
    <CardContent>
        <CardHeader title={formatPokemonName(pokemon.name)} />
        <Box className="flex space-x-2">
            {pokemon.pokemon_v2_pokemontypes.map(
                type => (
                    <Chip
                        key={type.pokemon_v2_type.name}
                        className={pokemonTypeToColor(type.pokemon_v2_type.name)}
                        label={capitaliseInitial(type.pokemon_v2_type.name)}
                        size="small"
                        variant="filled"
                    />
                )
            )}
        </Box>
    <Box className="flex-row">
        {/* <CardMedia /> */}
        <List>
            <ListItem>
                Base experience: {pokemon.base_experience}
            </ListItem>
            <ListItem>
                Height: {pokemon.height}
            </ListItem>
            <ListItem>
                Weight: {pokemon.weight}
            </ListItem>
        </List>
    </Box>
    </CardContent>
</Card>);

}

export { PokemonInfoCard };