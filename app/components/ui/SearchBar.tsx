import { Form } from "@remix-run/react"
import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"

export function SearchBar(): JSX.Element {
  return (
    <Form action="/pokemons/1" method="post">
      <div className="flex w-full max-w-sm items-center space-x-2">
          <Input name="pokemon" defaultValue="" type="text" placeholder="Search" />
          <Button type="submit">Search</Button>
      </div>
    </Form>
  )
}