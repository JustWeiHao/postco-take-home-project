import { MetaFunction } from "@remix-run/node";
import { Meta, Outlet, Scripts } from "@remix-run/react";
import TopBar from "~/components/TopBar";
import "~/tailwind.css";

export const meta: MetaFunction = () => {
    return [{ 
        title : "Pokedex" ,
    }];
};

export default function App() {
    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <TopBar />
                <Outlet />
                <Scripts />
            </body>
        </html>
    );
};
