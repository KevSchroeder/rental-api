//creating a new home or updating an existing one, use BaseHome interface

import { Home } from "./home.interface"

export interface Homes {
    [key: number]: Home;
}