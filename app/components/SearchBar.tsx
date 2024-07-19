import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../@/components/ui/button"
import { Input } from "../../@/components/ui/input";
import { Link } from "@remix-run/react";
import { getPokemonNameId } from "../queryHandler";
import type { HasId, HasName } from "../types";
import { Box } from "@mui/material";
import { useDebounce } from "~/utils/utils";

type SimpleEventType = {
  target: {
    value: string;
  }
}

export const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const handleSubmit = async(_event: any) => {
    if (searchInput === "") {
      setSearchResult([]);
      return;
    }
    const res = await getPokemonNameId(searchInput + "%");
    setSearchResult(res.pokemon_v2_pokemon);
  }

  const debouncedSearch = useDebounce(async () => {
    if (searchInput === "") {
      setSearchResult([]);
      return;
    }
    const res = await getPokemonNameId(searchInput + "%");
    setSearchResult(res.pokemon_v2_pokemon);
  }, 500);

  const handleChange = async(event: SimpleEventType) => {
    setSearchInput(event.target.value);
    debouncedSearch();
  }

  const handleOnClick = () => {
    setSearchInput("");
    setSearchResult([]);
  }

  const outputFormatter = (output: (HasId & HasName)[]) => {
    return (
    <Box className="flex flex-col">
      {output.map(res => (
        <Link to={`pokemons/${res.id}`}>
          <Button onClick={handleOnClick}>
            {res.name}
          </Button>
        </Link>
      ))}
    </Box>
    );
  }

  return (
    <Box>
        <Box className="flex w-full max-w-sm items-center space-x-2 border border-black">
            <Input name="pokemon" value={searchInput} type="text" placeholder="Search" onChange={handleChange}/>
            <Button>Search</Button>
        </Box>
      {outputFormatter(searchResult)}
    </Box>
  )
}