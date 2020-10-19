import { IComponentController, IScope, IHttpService } from 'angular';

interface IGeneratorSchedulesCtrl extends IScope {
    semester: any;
    generatorSchedulesForm: any;
}

class GeneratorSchedulesCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IGeneratorSchedulesCtrl;

    private success: any;
    private showSuccess: boolean;


    constructor($scope: IGeneratorSchedulesCtrl, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.showSuccess = false;
    }
    private generatorSchedules(semester: any) {
        this.http.get("http://127.0.0.1:8080/schedule/autoGenerate/allLaboratory?semesterId="+semester,).then((res) => {
            this.success = "Agenda semestral gerada com sucesso."
            this.showSuccess = true;

            this.scope.semester = undefined;
            this.scope.generatorSchedulesForm.$setPristine();
        }).catch((error )=> {
            console.log(error);
        })
    }
}
export default GeneratorSchedulesCtrl;