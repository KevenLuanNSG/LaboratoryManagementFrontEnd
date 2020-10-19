import { IComponentController, IScope, IHttpService } from 'angular';


class LaboratoryCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IScope;

    private laboratories:any;

    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;
    }
    private viewLaboratories() {
        this.http.get("http://127.0.0.1:8080/laboratory/view/all").then((res) => {
            this.laboratories = res.data;
        })
    }

    $onInit(){
        this.viewLaboratories();
    }
}
export default LaboratoryCtrl;