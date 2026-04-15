import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';
import routes from './routes';
import cors from 'cors';
import { setupDocs } from "./util/docManager";

dotenvFlow.config();

// create express application
const app: Application = express();



/**
 * 
 */
export function startServer() {

app.use(cors({

  // Allow request from any origin
  origin: ["http://localhost:5500","http://127.0.0.1:5500"],

  // allow HTTP methods
  methods: ["GET", "PUT", "POST", "DELETE"],

  // allow headers
  allowedHeaders: ['auth-token', 'Origin', 'X-Requested-Width', 'Content-Type', 'Accept'],

  // allow credentials
  credentials:true
}))


  
    
    // JSON body parser
    app.use(express.json());

    // bind routes to the app
    app.use('/api', routes);

    setupDocs(app);

    // test the connection to the database
    testConnection();

    // start the server
    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log("Server is up and running on port: " + PORT);
    });
}
