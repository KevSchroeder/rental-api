import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';


// Define interfaces for vacation home and reservation
interface VacationHome {
    type: string;
    availableDates: string[];    
}

interface Reservation {
    id: string;
    homeId: string;
    startDate: string;
    endDate: string;
}

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Placeholder data arrays
let vacationHomes: VacationHome[] = [];
let reservations: Reservation[] = [];

function createVacationHome(type: string, availableDates: string[]): void {
    const newVacationHome: VacationHome = {
        type,
        availableDates,
    };
    vacationHomes.push(newVacationHome);
}

createVacationHome("Beach House", ["2024-06-01", "2024-06-02"])
createVacationHome("Lake House", ["2024-07-01", "2024-07-02"])
createVacationHome("City Apartment", ["2024-10-01", "2024-10-10"])
createVacationHome("Farm", ["2024-03-01", "2024-03-07"])

console.log(vacationHomes)

function isReservationOverlap(reservation: Reservation): boolean {
    return reservations.some(existingReservation =>
        existingReservation.homeId === reservation.homeId &&
        !(new Date(reservation.endDate) <= new Date(existingReservation.startDate) ||
        new Date(reservation.startDate) >= new Date(existingReservation.endDate))
    );
}

function createReservation(homeType: string, startDate: string, endDate: string, customerId: string): void {
    // Check if the requested vacation home exists
    const vacationHome = vacationHomes.find(home => home.type === homeType);
    if (!vacationHome) {
        console.error('Vacation home not found');
        return;
    }

    // Check if the requested dates are available
    if (isReservationOverlap({ id: '', homeId: homeType, startDate, endDate })) {
        console.error('Vacation home already reserved for the specified dates');
        return;
    }

    // Create the reservation
    const reservation: Reservation = {
        id: uuidv4(),
        homeId: homeType,
        startDate,
        endDate,
    };
    reservations.push(reservation);

    // res.status(201).json(reservation);
}; //)

createReservation("Lake House","2024-06-01", "2024-06-03", "customer1");
createReservation("City Apartment", "2024-06-05", "2024-06-07", "customer2");
createReservation("Beach House", "2024-06-10", "2024-06-15", "customer3");


// Endpoint to retrieve all reservations
app.get('/reservations', (req: Request, res: Response) => {
    res.json(reservations);
});

// Endpoint to retrieve a specific reservation by ID
app.get('/reservations/:id', (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
});

// Endpoint to cancel a reservation
app.delete('/reservations/:id', (req: Request, res: Response) => {
    const reservationId = req.params.id;
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) {
        return res.status(404).json({ error: 'Reservation not found' });
    }
    reservations.splice(index, 1);
    res.status(204).end();
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Server is working");
});

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.use(express.json())
app.post('/reservations', (req: Request, res: Response) => {
    const { homeId, startDate, endDate, resvId } = req.body; 
    if(!{ homeId, startDate, endDate, resvId }) {
        res.sendStatus(400)
        return
    }
    res.send({resvId: 0})
    
});

export default app