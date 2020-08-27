import CardapioCtrl from './controllers/CardapioCtrl';
import {module} from 'angular';
import ngRoute from 'angular-route';
import configRoutes from './route/router';
import ClienteCtrl from './controllers/ClienteCtrl';
import cpfFilter from './filters/cpfFilter';
import IngredienteCtrl from './controllers/IngredienteCtrl';
import ProdutoCtrl from './controllers/ProdutoCtrl';
import VendaCtrl from './controllers/VendaCtrl';
const app=module("lanchonete", [ngRoute]);
app.config(configRoutes);
app.controller('CardapioCtrl', CardapioCtrl);
app.controller('ClienteCtrl', ClienteCtrl);
app.controller('IngredienteCtrl', IngredienteCtrl);
app.controller('ProdutoCtrl', ProdutoCtrl);
app.controller('VendaCtrl', VendaCtrl);
app.filter("cpfFilter", () => cpfFilter);


export default app;