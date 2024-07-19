import { Button } from "@mui/material"
import { Link } from "@remix-run/react";

const HomeButton = () => {
    return (
        <Link to="/">
            <Button>
                Pokedex
            </Button>
        </Link>
    )
};

export default HomeButton;