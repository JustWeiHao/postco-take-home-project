import { Form, useSubmit } from "@remix-run/react"
import { useState } from "react";
import { redirect } from "@remix-run/node"
import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"
import { getPokemonName } from "../../queryHandler"

export function SearchBar(): JSX.Element {

  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const submit = useSubmit();

  const handleSubmit = async(event) => {
    await emptySearch();
    submit(event);
  }

  const emptySearch = async () => {
    setSearchInput("");
    setSearchResult([]);
  }
  const handleChange = async(event) => {

    setSearchInput(event.target.value);

    const pokemonName = event.target.value;

    if (pokemonName === undefined || pokemonName === "") {
      console.log("empty search");
      setSearchResult([]);
      return ;
    }

    const pokemons = await getPokemonName(`${pokemonName ? pokemonName : ""}%`)
    setSearchResult(pokemons.map((pokemon) => {
      return (
        <Form action="/" method="post" key={pokemon["id"]}>
          <Button type="submit" name="pokemonId" value={pokemon["id"]}>{pokemon["name"]}</Button>
        </Form>
      )
    }));
  }

  return (
    <div>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input name="pokemon" value={searchInput} type="text" placeholder="Search" onChange={handleChange}/>
            {/* <Button type="submit">Search</Button> */}
        </div>
      {searchResult}
    </div>
  )
}