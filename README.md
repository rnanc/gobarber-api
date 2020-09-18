 <center><h1>:scissors: GoBarber API :scissors:</h1></center>

## Requirements

- PostgreSQL
- Redis
- Mongo DB
- Yarn
- Node

### PostgreSQL

To install it without docker you will have to access [PostgreSQL](https://www.postgresql.org/), follow the instructions till the end.

To install with docker, run the command:

> $ docker run --name container-name -e POSTGRES_PASSWORD=your-password -p 5434:5434 -d postgres

After the installations is completed, create a database named `gostack_gobarber` with the GUI of your choices, recommended: pgAdmin or [DBeaver](https://dbeaver.io/).

### Cloning and Running Migrations

After cloning the repository, navigate to the backend folder and run the following command on terminal to install dependencies:

> $ yarn

Next you'll have to run the following command to run database migrations:

> $ yarn typeorm migration:run

Now you can check if the tables were created in your database.

### Running the API

To run the API in development settings, type and run the following command on terminal:

> $ yarn dev:server

### Automated Testing

The API have automated testing in all it's services, to run the tests enter the following command on terminal:

> $ yarn test

## Related Links

GoBarber Mobile :iphone:: https://github.com/rnanc/gobarber-app

GoBarber Web :computer:: https://github.com/rnanc/gobarber-web

