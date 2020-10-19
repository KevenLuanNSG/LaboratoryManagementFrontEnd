import { IComponentController, IScope, IHttpService } from 'angular';

interface IRegisterCtrl extends IScope {
    classOfStudents: any;
    registerClassOfStudentsForm: any;

    discipline: any;
    registerDisciplineForm: any;

    laboratory: any;
    registerLaboratoryForm: any;

    semester: any;
    registerSemesterForm: any;

    teacher: any;
    registerTeacherForm: any;
}

class RegisterCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IRegisterCtrl;

    private classOfStudentsRegistered: any;
    private showClassOfStudentsRegistered: boolean;

    private disciplineRegistered: any;
    private showDisciplineRegistered: boolean;

    private laboratoryRegistered: any;
    private showLaboratoryRegistered: boolean;

    private semesterRegistered: any;
    private showSemesterRegistered: boolean;

    private teacherRegistered: any;
    private showTeacherRegistered: boolean;

    private viewPage: String;

    constructor($scope: IRegisterCtrl, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.showClassOfStudentsRegistered = false;
        this.showDisciplineRegistered = false;
        this.showLaboratoryRegistered = false;
        this.showSemesterRegistered = false;
        this.showTeacherRegistered = false;

        this.viewPage = "registerSemester";
    }
    private registerClassOfStudents(classOfStudents: any) {
        this.http.post("http://127.0.0.1:8080/class/register", classOfStudents).then((res) => {
            this.classOfStudentsRegistered = res.data;
            this.showClassOfStudentsRegistered = true;

            this.scope.classOfStudents = undefined;
            this.scope.registerClassOfStudentsForm.$setPristine();
        })
    }

    private registerDiscipline(discipline: any) {
        this.http.post("http://127.0.0.1:8080/discipline/register", discipline).then((res) => {
            this.disciplineRegistered = res.data;
            this.showDisciplineRegistered = true;

            this.scope.discipline = undefined;
            this.scope.registerDisciplineForm.$setPristine();
        })
    }

    private registerLaboratory(laboratory: any) {
        this.http.post("http://127.0.0.1:8080/laboratory/register", laboratory).then((res) => {
            this.laboratoryRegistered = res.data;
            this.showLaboratoryRegistered = true;

            this.scope.laboratory = undefined;
            this.scope.registerLaboratoryForm.$setPristine();
        })
    }

    private registerSemester(semester: any) {
        this.http.post("http://127.0.0.1:8080/semester/register", semester).then((res) => {
            this.semesterRegistered = res.data;
            this.showSemesterRegistered = true;

            this.scope.semester = undefined;
            this.scope.registerSemesterForm.$setPristine();
        })
    }

    private registerTeacher(teacher: any) {
        this.http.post("http://127.0.0.1:8080/teacher/register", teacher).then((res) => {
            this.teacherRegistered = res.data;
            this.showTeacherRegistered = true;

            this.scope.teacher = undefined;
            this.scope.registerTeacherForm.$setPristine();
        })
    }

    private selectView(page: String) {
        this.viewPage = page;
    }
}
export default RegisterCtrl;