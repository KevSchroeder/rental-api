//express router for route handling details

import express, { Request, Response } from 'express';
import * as HomeService from './homes.service';
import { BaseHomes, Home } from './home.interface';

// router definition

export const homesRouter = express.Router();

// GET homes

homesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const homes: Home[] = await HomeService.findAll();

        res.status(200).send(homes);
    } catch (e) {
        if(e instanceof Error) {
        res.status(500).send(e.message);
        }
    }
});

//GET homes/:id

homesRouter.get("/:id", async (req:Request, res:Response) => {
    const id: number = parseInt(req.params.id, 10);

    try{
        const home: Home = await HomeService.find(id);

        if (home) {
            return res.status(200).send(home);
        }

        res.status(404).send("home not found");
    } catch (e) {
        if(e instanceof Error) {
        res.status(500).send(e.message);
        }
    }
});

// POST homes

homesRouter.post("/", async (req: Request, res:Response) => {

    try {
        const home: BaseHomes = req.body;

        const newHome = await HomeService.create(home);

        res.status(201).json(newHome);
    } catch (e) {
        if(e instanceof Error) {
        res.status(500).send(e.message);
        }
    }
});

// PUT homes/:id

homesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const homeUpdate: Home = req.body;

        const existingHome = await HomeService.find(id);

        if (existingHome) {
            const updatedHome = await HomeService.update(id, homeUpdate);
            return res.status(200).json(updatedHome);
        }

        const newHome = await HomeService.create(homeUpdate);

        res.status(201).json(newHome);
    } catch (e) {
        if(e instanceof Error) {
        res.status(500).send(e.message);
        }
    }
});

//DELETE homes/:id

homesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await HomeService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        if(e instanceof Error) {
        res.status(500).send(e.message);
        }
    }
});
