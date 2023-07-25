# To run the project locally

- Clone it
- Make sure you have docker, docker-compose and nodejs 18+ installed in your system
- go to email-job folder and run `docker-compose up` => this will start postgres db and kafka broker. You can run it in detatch mode by running `docker-compose up -d` command.
- Then  in the email-job folder only, run `npm i` => this will install all the necessary dependencies listed in `package.json`
- Then run `npm start` => this will start the backend server. You can change envs if you want to run on different port or something. There is an `.env` file for that.
- Now to run the frontend, go to `sendmails` folder and run `npm i` and then `npm run dev`
- By default server will be running on port `4000` , websocket server on port `8001` and frontend on port `3000`
- Go to `localhost:3000` in your browser, preferably google chrome. And play with the project. You can check the backend logs and compose logs to see what is happening under the hood.


Backend

- Tech Stack
  - Nestjs
  - Kafka
  - PostgreSQL
  - TypeORM
  - TypeScript
  - Docker


Frontend

- Tech Stack
  - Next.js (React.js)
  - Websockets
  - Tailwind
