import express from 'express';
import bodyParser from 'body-parser';
import registerRoute from './routes/register.route';

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allowed-Methods', 'GET', 'POST', 'PUT');
    res.setHeader('Access-Control-Allowed-Headers', 'Content-Type', 'Authorisation');
    next();
  });
  
app.use('/api/v1/auth', registerRoute);


app.listen(3000);