import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import recipeRoute from './routes/invoiceRoute.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome To MERN Stack Recipe API');
});

app.use('/recipe', recipeRoute);

mongoose
  .connect('mongodb+srv://jenitjosephjose:r7ALP6C0TaT290Bm@cluster0.ntfhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
