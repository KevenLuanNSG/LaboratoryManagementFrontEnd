import { IComponentController, IScope, IHttpService } from 'angular';

interface IRegisterScheduleCtrl extends IScope {
    schedule: any;
    registerScheduleForm: any;

    scheduleToCancel: any;
    cancelScheduleForm: any;

    recurrentSchedule: any;
    registerRecurrentScheduleForm: any;

    recurrentScheduleToCancel: any;
    cancelRecurrentScheduleForm: any;
}

class RegisterScheduleCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IRegisterScheduleCtrl;

    private scheduleRegistered: any;
    private showScheduleRegistered: boolean;

    private scheduleCanceled: any;
    private showScheduleCanceled: boolean;

    private recurrentScheduleFailed: any;
    private showRecurrentScheduleFailed: boolean;

    private recurrentScheduleCanceled: any;

    private viewPage: String;

    constructor($scope: IRegisterScheduleCtrl, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.showScheduleRegistered = false;
        this.showScheduleCanceled = false;
        this.showRecurrentScheduleFailed = false;

        this.recurrentScheduleFailed = [];

        this.viewPage = "registerSchedule";
    }

    private registerSchedule(schedule: any) {
        this.http.post("http://127.0.0.1:8080/schedule/register/simple", schedule).then((res) => {
            this.scheduleRegistered = res.data;
            this.showScheduleRegistered = true;

            this.scope.schedule = undefined;
            this.scope.registerScheduleForm.$setPristine();
        })
    }

    private cancelSchedule(scheduleToCancel: any) {
        this.http.get("http://127.0.0.1:8080/schedule/cancel/simple?scheduleId=" + scheduleToCancel).then((res) => {
            this.scheduleCanceled = res.data;
            this.showScheduleCanceled = true;

            this.scope.scheduleToCancel = undefined;
            this.scope.cancelScheduleForm.$setPristine();
        })
    }

    private registerRecurrentSchedule(recurrentSchedule: any) {
        this.http.post("http://127.0.0.1:8080/schedule/register/recurrent", recurrentSchedule).then((res) => {
            this.recurrentScheduleFailed = res.data;

            this.scope.recurrentSchedule = undefined;
            this.scope.registerRecurrentScheduleForm.$setPristine();
        })
    }

    private cancelRecurrentSchedule(recurrentScheduleToCancel: any) {
        this.http.get("http://127.0.0.1:8080/schedule/cancel/recurrent?scheduleId=" + recurrentScheduleToCancel).then((res) => {
            this.recurrentScheduleCanceled = res.data;

            this.scope.recurrentScheduleToCancel = undefined;
            this.scope.cancelRecurrentScheduleForm.$setPristine();
        })
    }

    private selectView(page: String) {
        this.viewPage = page;
    }
}
export default RegisterScheduleCtrl;