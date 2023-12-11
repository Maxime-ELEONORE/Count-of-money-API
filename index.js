import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

import passport from './Initialisations/PassportLocal.js';
import passportGoogle from './Initialisations/PassportGoogle.js';
import initializeAdminUser from './Initialisations/AdminUser.js';
import CryptosJobs from './Jobs/UpdateCryptosHistory.js';

import loggerService from './Services/LoggerService.js';

import AuthenticationRoutes from './Routes/AuthenticationRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import CryptoRoutes from './Routes/CryptoRoutes.js';

const app = express();
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Connection to MongoDB: SUCCESS !');
      await initializeAdminUser();
    }).catch((err) => console.error('Connection to MongoDB: FAILED...', err));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {httpOnly: false, secure: true}
}));
app.use(loggerService);
app.use(express.urlencoded({extended: true}));
const whitelist = ['https://camille-lecoq.com', '10.17.72.229', '10.17.72.111', '10.17.72.138', "http://localhost:3000"]
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));
app.use(passport.initialize(undefined));
app.use(passportGoogle.initialize(undefined));
cron.schedule('*/5 * * * *', () => {
  console.log('Exécution de la tâche cron pour mettre à jour l’historique des cryptos');
  CryptosJobs.updateCryptoDatas()
      .then(() => console.log('Mise a jour des cryptos terminer'))
      .catch(() => console.log('Erreur lors de la mise a jours des historiques des cryptos'));
});
CryptosJobs.updateCryptoDatas().then(() => console.log("Crypto datas updated"))
    .catch(() => console.log("error fetching crypto datas"))

app.use('/api/auths', AuthenticationRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/cryptos', CryptoRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});