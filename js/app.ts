import CardapioCtrl from './controllers/CardapioCtrl';
import {module} from 'angular';
import ngRoute from 'angular-route';
import configRoutes from './route/router';
const app=module("lanchonete", [ngRoute]);
app.config(configRoutes);
app.controller('CardapioCtrl', CardapioCtrl);

export default app;