About this project:

In this project, we are creating a Vacation home rental API, allowing a customer to reserve a home for a desired date for number of days without overlapping days.

1. app.ts has the logic to reserve a vacation home of a given type at a desired date and time for a given number of days.
2. app.test.ts has the test cases to POST and GET functionality and correctness
3. Run npm run test command to test cases
    Tests: 
    POST request to give a reservation
    GET request to retrieve all reservations
    POST request to send 400 when creating a reservation with conflicting dates
