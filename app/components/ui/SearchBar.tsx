import { Form, useSubmit } from "@remix-run/react"
import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"
import { getPokemonName } from "../../queryHandler"

export function SearchBar(): JSX.Element {
  const submit = useSubmit();

  const handleChange = async(event) => {
    submit(event.currentTarget);
  }

  return (
    <Form action="/" method="post" onChange={handleChange}>
      <div className="flex w-full max-w-sm items-center space-x-2">
          <Input name="pokemon" defaultValue="" type="text" placeholder="Search"/>
          <Button type="submit">Search</Button>
      </div>
    </Form>
  )
}