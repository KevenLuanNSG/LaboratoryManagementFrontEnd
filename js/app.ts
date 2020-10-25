import ScheduleCtrl from './controllers/ScheduleCtrl';
import {module} from 'angular';
import ngRoute from 'angular-route';
import configRoutes from './route/router';
import RegisterCtrl from './controllers/RegisterCtrl';
import cpfFilter from './filters/cpfFilter';
import GeneratorSchedulesCtrl from './controllers/GeneratorSchedulesCtrl';
import RegisterScheduleCtrl from './controllers/RegisterScheduleCtrl';
import LaboratoryCtrl from './controllers/LaboratoryCtrl';
const app=module("laboratory", [ngRoute]);
app.config(configRoutes);
app.controller('ScheduleCtrl', ScheduleCtrl);
app.controller('RegisterCtrl', RegisterCtrl);
app.controller('GeneratorSchedulesCtrl', GeneratorSchedulesCtrl)
app.controller('RegisterScheduleCtrl', RegisterScheduleCtrl)
app.controller('LaboratoryCtrl', LaboratoryCtrl)
app.filter('cpfFilter', () => cpfFilter);


export default app;