//service module to access, manipulate and store records 

// Data Model Interfaces

import { BaseHomes, Home } from "./home.interface";
import { Homes } from "./homes.interface";

// In-Memory Store

let homes: Homes = {
    1: {
        id: 1,
        name: "Beach House",
        description: "A single family house right on the beach",
    },
    2: {
        id: 2,
        name: "Lake House",
        description: "A single family house on a pristine lake",
    },
    3: {
        id: 3,
        name: "City Apartment",
        description: "A penthouse apartment right downtown",
    },
    4: {
        id: 4,
        name: "Farm",
        description: "An open space farm in the rural countryside",
        }       
    
};

/* Service Methods
create methods to find vacation home elements
*/

export const findAll = async (): Promise<Home[]> => Object.values(homes);

export const find = async (id: number): Promise<Home> => homes[id];

//define a method to create a new vacation house

export const create = async (newHome: BaseHomes): Promise<Home> => {
    const id = new Date().valueOf();

    homes[id] ={
        id,
        ...newHome,        
    };

    return homes[id];
};

// update existing vacation home

export const update = async (
    id: number,
    homeUpdate: BaseHomes
): Promise<Home | null> => {
    const home = await find(id);

    if(!home) {
        return null;
    }

    homes[id] = {id, ...homeUpdate};

    return homes[id];
};


//remove vacation home
export const remove = async (id: number): Promise<null | void> => {
    const home = await find(id);

    if (!home) {
        return null;
    }

    delete homes[id];
};


//creating the above functions makes testing easier