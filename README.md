# exercise-tracker-app
Simple application that allows for the creation of exercise entries with limited input validation.
- Uses MongoDb for data storage
- Uses Node.js as the runtime environment
- Uses Express.js and express-validator to for the REST Api
- Uses React for the frontend single page application (SPA)
- npm package manager is used to download the required dependencies

![Recording 2025-03-22 at 15 10 04](https://github.com/user-attachments/assets/0618b8f7-9877-4788-a18f-12dfb03cf4bd)


# Build Instructions:
- supply a valid MongoDb server string in backend/.env (Functions are supplied to configure the db)
- frontend: "npm run dev"
  - localhost:5173 default
- backend: "npm start"
  - localhost:3000 default
