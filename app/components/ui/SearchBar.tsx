import { Button } from "../../../@/components/ui/button"
import { Input } from "../../../@/components/ui/input"

export function SearchBar() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="search" placeholder="Search" />
      <Button type="submit">Search</Button>
    </div>
  )
}