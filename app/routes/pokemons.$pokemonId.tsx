import { Box, Card, CardContent, Grid, Tab } from "@mui/material";
import { getPokemonInfo } from "~/queryHandler";
import type { PokemonInfo } from "~/queryHandler";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PokemonInfoCard } from "~/components/PokemonInfoCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { capitaliseInitial } from "~/utils/utils";


export const loader = async({ params}: LoaderFunctionArgs) => {
    return await getPokemonInfo(Number.parseInt(params.pokemonId));
}

const processPokemonMoveLevel = (level: number) : string => {
    return `Level ${level}`;
}

export default function Home() {
    const [tabValue, setTabValue] = useState("stats");

    const handleChange = (_ev: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    }
    const pokemon: PokemonInfo = useLoaderData()["pokemon_v2_pokemon"][0];
    return (
        <Box>
            <PokemonInfoCard pokemon={pokemon} />
            <TabContext value={tabValue}>
                <TabList onChange={handleChange}>
                    <Tab label="Stats" value="stats" />
                    <Tab label="Moves" value="moves"/>
                </TabList>
                <TabPanel value="stats">

                </TabPanel>
                <TabPanel value="moves">
                    <Grid container spacing={2}>
                        {pokemon.pokemon_v2_pokemonmoves.map(move => (
                            <Grid item xs={12 / 3} key={`${move.pokemon_v2_move.name}${move.level}`}>
                                <Card>
                                    <CardContent>
                                        {capitaliseInitial(move.pokemon_v2_move.name, "-")}
                                    </CardContent>
                                    <CardContent>
                                        {processPokemonMoveLevel(move.level)}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}    
                    </Grid>           
                </TabPanel>
            </TabContext>
        </Box>
    );
}