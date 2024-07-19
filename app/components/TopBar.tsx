import { Box } from "@mui/material";
import HomeButton from "~/components/HomeButton";
import { SearchBar } from "~/components/SearchBar";

const TopBar = () => {
    return (
        <Box className="flex border border-black">
            <HomeButton />
            <SearchBar />
        </Box>
    );
};

export default TopBar;