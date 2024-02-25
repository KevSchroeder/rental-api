import request from "supertest";
import app from "../../app";
import { describe } from "node:test";

describe("POST /reservations", () => {

    describe("give a reservation", () => {
        // Post request to give a reservation
        test("should respond with a 200 status code", async () => {
            const createResponse = await request(app).post("/reservations").send({
                homeType: "Beach House", startDate: "2024-01-01", endDate: "2024-01-10"
            })
            expect(createResponse.statusCode).toBe(200);
            
            // Get request to retrieve all reservations
            const listResponse = await request(app).get("/reservations");

            const createdReservation = createResponse.body;
            const isReservationPresent = listResponse.body.some((reservation: any) => {
                return reservation.homeType === createdReservation.homeType &&
                        reservation.startDate === createdReservation.startDate &&
                        reservation.endDate === createdReservation.endDate;
            });
            expect(isReservationPresent).toBe(true);
        });


        test("shouldn't be able to create a reservation if there is a date conflict", async () => {
            const existingReservation = {
                startDate: "2024-01-01",
                endDate: "2024-01-10"
            };
        
            // Provide a conflicting date range (overlapping with the existing reservation)
            const conflictingStartDate = "2024-01-05";
            const conflictingEndDate = "2024-01-15";
        
            // Send a POST request to create a reservation with conflicting dates
            const createResponse = await request(app).post("/reservations").send({
                homeType: "Beach House",
                startDate: conflictingStartDate,
                endDate: conflictingEndDate
            });
            expect(createResponse.statusCode).toBe(400);
        });
    });
});
