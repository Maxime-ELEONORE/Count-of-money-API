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
}));
app.use(loggerService);
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
app.use(passportGoogle.initialize());
cron.schedule('*/5 * * * *', () => {
  console.log('Exécution de la tâche cron pour mettre à jour l’historique des cryptos');
  CryptosJobs.updateHistory()
      .then(() => console.log('Mise a jour des cryptos terminer'))
      .catch(() => console.log('Erreur lors de la mise a jours des historiques des cryptos'));
});

app.use('/api/auths', AuthenticationRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/cryptos', CryptoRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
