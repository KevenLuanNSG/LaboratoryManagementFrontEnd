import { IComponentController, IScope, IHttpService } from 'angular';

interface IScheduleCtrl extends IScope {
    dateScheduleByDate: any;
    scheduleByDateForm: any;

    dateScheduleByDateAndShift: any;
    shiftScheduleByDateAndShift: any;
    scheduleByDateAndShiftForm: any;

    dateScheduleByDateAndShiftAndScheduleTime: any;
    shiftScheduleByDateAndShiftAndScheduleTime: any;
    scheduleTimeScheduleByDateAndShiftAndScheduleTime: any;
    scheduleByDateAndShiftAndScheduleTimeForm: any;

    shiftScheduleByShift: any;
    scheduleByShiftForm: any;

    shiftScheduleByShiftAndScheduleTime: any;
    scheduleTimeScheduleByShiftAndScheduleTime: any;
    scheduleByShiftAndScheduleTimeForm: any;

    scheduleByTeacher: any;
    scheduleByTeacherForm: any;

    scheduleByTeacherAndDate: any;
    scheduleByTeacherAndDateForm: any;

    scheduleByTeacherAndDateAndShiftAndScheduleTime: any;
    scheduleByTeacherAndDateAndShiftAndScheduleTimeForm: any;

    scheduleByTeacherAndClass: any;
    scheduleByTeacherAndClassForm: any;

    scheduleByLaboratory: any;
    scheduleByLaboratoryForm: any;

    scheduleByLaboratoryAndDate: any;
    scheduleByLaboratoryAndDateForm: any;

    scheduleByClassOfStudents: any;
    scheduleByClassOfStudentsForm: any;

    scheduleByClassOfStudentsAndDate: any;
    scheduleByClassOfStudentsAndDateForm: any;

    scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime: any;
    scheduleByClassOfStudentsAndDateAndShiftAndScheduleTimeForm: any;

    scheduleByClassOfStudentsAndTeacher: any;
    scheduleByClassOfStudentsAndTeacherForm: any;
}

class ScheduleCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private scope: IScheduleCtrl;
    private http: IHttpService;
    private viewSelected: String;
    private viewPage: String;

    private dateScheduleByDate: Date;
    private scheduleByDate: any;

    private dateScheduleByDateAndShift: Date;
    private scheduleByDateAndShift: any;

    private dateScheduleByDateAndShiftAndScheduleTime: Date;
    private scheduleByDateAndShiftAndScheduleTime: any;

    private scheduleByShiftStart: boolean;
    private pageScheduleByShift: number;
    private scheduleByShiftData: any;
    private scheduleByShift: any;
    private paginationScheduleByShift: any;
    private paginationFirstScheduleByShift: boolean;
    private paginationLastScheduleByShift: boolean;
    private shiftScheduleByShift: String;

    private scheduleByShiftAndScheduleTimeStart: boolean;
    private pageScheduleByShiftAndScheduleTime: number;
    private scheduleByShiftAndScheduleTimeData: any;
    private scheduleByShiftAndScheduleTime: any;
    private paginationScheduleByShiftAndScheduleTime: any;
    private paginationFirstScheduleByShiftAndScheduleTime: boolean;
    private paginationLastScheduleByShiftAndScheduleTime: boolean;
    private shiftScheduleByShiftAndScheduleTime: String;
    private scheduleTimeScheduleByShiftAndScheduleTime: String;

    private scheduleByTeacherStart: boolean;
    private pageScheduleByTeacher: number;
    private scheduleByTeacherData: any;
    private scheduleByTeacher: any;
    private paginationScheduleByTeacher: any;
    private paginationFirstScheduleByTeacher: boolean;
    private paginationLastScheduleByTeacher: boolean;
    private teacherScheduleByTeacher: string;

    private dateScheduleByTeacherAndDate: Date;
    private scheduleByTeacherAndDate: any;

    private scheduleByTeacherAndDateAndShiftAndScheduleTime: any;

    private scheduleByTeacherAndClass: any;

    private initialPage:any;
    private dateInitialPage: any;

    private scheduleByLaboratoryStart: boolean;
    private pageScheduleByLaboratory: number;
    private scheduleByLaboratoryData: any;
    private scheduleByLaboratory: any;
    private paginationScheduleByLaboratory: any;
    private paginationFirstScheduleByLaboratory: boolean;
    private paginationLastScheduleByLaboratory: boolean;
    private laboratoryScheduleByLaboratory: string;

    private dateScheduleByLaboratoryAndDate: Date;
    private scheduleByLaboratoryAndDate: any;

    private scheduleByClassOfStudentsStart: boolean;
    private pageScheduleByClassOfStudents: number;
    private scheduleByClassOfStudentsData: any;
    private scheduleByClassOfStudents: any;
    private paginationScheduleByClassOfStudents: any;
    private paginationFirstScheduleByClassOfStudents: boolean;
    private paginationLastScheduleByClassOfStudents: boolean;
    private classOfStudentsScheduleByClassOfStudents: string;

    private dateScheduleByClassOfStudentsAndDate: Date;
    private scheduleByClassOfStudentsAndDate: any;

    private scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime: any;

    private scheduleByClassOfStudentsAndTeacher: any;

    constructor($scope: IScheduleCtrl, $http: IHttpService) {
        this.scope = $scope;
        this.http = $http;
        this.viewSelected = "scheduleByDate";
        this.viewPage = "scheduleByDate";

        this.dateScheduleByDate = new Date;
        this.dateScheduleByDateAndShift = new Date;
        this.dateScheduleByDateAndShiftAndScheduleTime = new Date;
        this.dateScheduleByTeacherAndDate = new Date;
        this.dateScheduleByLaboratoryAndDate = new Date;
        this.dateScheduleByClassOfStudentsAndDate = new Date;

        this.scheduleByShiftStart = false;
        this.pageScheduleByShift = 1;
        this.paginationScheduleByShift = [];
        this.paginationFirstScheduleByShift = false;
        this.paginationLastScheduleByShift = false;
        this.shiftScheduleByShift = "";

        this.scheduleByShiftAndScheduleTimeStart = false;
        this.pageScheduleByShiftAndScheduleTime = 1;
        this.paginationScheduleByShiftAndScheduleTime = [];
        this.paginationFirstScheduleByShiftAndScheduleTime = false;
        this.paginationLastScheduleByShiftAndScheduleTime = false;
        this.shiftScheduleByShiftAndScheduleTime = "";
        this.scheduleTimeScheduleByShiftAndScheduleTime = "";

        this.scheduleByTeacherStart = false;
        this.pageScheduleByTeacher = 1;
        this.paginationScheduleByTeacher = [];
        this.paginationFirstScheduleByTeacher = false;
        this.paginationLastScheduleByTeacher = false;
        this.teacherScheduleByTeacher = "";

        this.scheduleByLaboratoryStart = false;
        this.pageScheduleByLaboratory = 1;
        this.paginationScheduleByLaboratory = [];
        this.paginationFirstScheduleByLaboratory = false;
        this.paginationLastScheduleByLaboratory = false;
        this.laboratoryScheduleByLaboratory = "";

        this.scheduleByClassOfStudentsStart = false;
        this.pageScheduleByClassOfStudents = 1;
        this.paginationScheduleByClassOfStudents = [];
        this.paginationFirstScheduleByClassOfStudents = false;
        this.paginationLastScheduleByClassOfStudents = false;
        this.classOfStudentsScheduleByClassOfStudents = "";
    }

    private selectView(selected: String, page: String) {
        this.viewSelected = selected;
        this.viewPage = page;
    }

    private viewScheduleByDate(date: Date) {
        this.dateScheduleByDate = date;
        let monthString = "";
        let dayString = "";
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/date?date=" + year + "-" + monthString + "-" + dayString).then((res) => {
            this.scheduleByDate = res.data;

            this.scope.dateScheduleByDate = undefined;
            this.scope.scheduleByDateForm.$setPristine();
        });
    };

    private viewScheduleByDateAndShift(date: Date, shift: String) {
        this.dateScheduleByDateAndShift = date;
        let monthString = "";
        let dayString = "";
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/dateAndShift?date=" + year + "-" + monthString + "-" + dayString + "&shift="+shift).then((res) => {
            this.scheduleByDateAndShift = res.data;

            this.scope.dateScheduleByDateAndShift = undefined;
            this.scope.shiftScheduleByDateAndShift = undefined;
            this.scope.scheduleByDateAndShiftForm.$setPristine();
        });
    };

    private viewScheduleByDateAndShiftAndScheduleTime(date: Date, shift: String, scheduleTime: String) {
        this.dateScheduleByDateAndShiftAndScheduleTime = date;
        let monthString = "";
        let dayString = "";
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/dateAndShiftAndScheduleTime?date=" + year + "-" + monthString + "-" + dayString + "&shift=" + shift + "&scheduleTime=" + scheduleTime).then((res) => {
            this.scheduleByDateAndShiftAndScheduleTime = res.data;

            this.scope.dateScheduleByDateAndShiftAndScheduleTime = undefined;
            this.scope.scheduleByDateAndShiftAndScheduleTimeForm.$setPristine();
        });
    };

    private viewScheduleByShiftStart (){
        this.scheduleByShiftStart = true;
    }
    private viewScheduleByShift(shift: String) {
        if (this.scheduleByShiftStart) {
            this.pageScheduleByShift = 1;
        }
        this.scheduleByShiftStart = false;
        this.shiftScheduleByShift = shift;
        this.http.get("http://127.0.0.1:8080/schedule/view/shift?shift=" + shift + "&page=" + (this.pageScheduleByShift - 1)).then((res) => {
            this.scheduleByShiftData = res.data;
            this.scheduleByShift = this.scheduleByShiftData.content;

            this.paginationScheduleByShift = [];

            this.paginationFirstScheduleByShift = this.scheduleByShiftData.first;
            this.paginationLastScheduleByShift = this.scheduleByShiftData.last;

            for (let index = 1; index <= this.scheduleByShiftData.totalPages; index++) {
                this.paginationScheduleByShift.push(index);
            }

            this.paginationScheduleByShift = this.paginationScheduleByShift.slice(this.pageScheduleByShift == 1 ? this.pageScheduleByShift - 1 : this.pageScheduleByShift == 2 ? this.pageScheduleByShift - 2 : this.pageScheduleByShift - 3, this.pageScheduleByShift + 2);
       
            this.scope.shiftScheduleByShift = undefined;
            this.scope.scheduleByShiftForm.$setPristine();
        });
    };
    private viewPageNavigationLeftScheduleByShift() {
        this.pageScheduleByShift -= 1
        this.viewScheduleByShift(this.shiftScheduleByShift);
    }
    private viewPageNavigationRightScheduleByShift() {
        this.pageScheduleByShift += 1
        this.viewScheduleByShift(this.shiftScheduleByShift);
    }
    private viewPageNavigationScheduleByShift(pageScheduleByShift: number) {
        this.pageScheduleByShift = pageScheduleByShift;
        this.viewScheduleByShift(this.shiftScheduleByShift);
    }


    private viewScheduleByShiftAndScheduleTimeStart (){
        this.scheduleByShiftAndScheduleTimeStart = true;
    }
    private viewScheduleByShiftAndScheduleTime(shift: String, scheduleTime: String) {
        if (this.scheduleByShiftAndScheduleTimeStart) {
            this.pageScheduleByShiftAndScheduleTime = 1;
        }
        this.scheduleByShiftAndScheduleTimeStart = false;
        this.shiftScheduleByShiftAndScheduleTime = shift;
        this.scheduleTimeScheduleByShiftAndScheduleTime = scheduleTime;
        this.http.get("http://127.0.0.1:8080/schedule/view/shiftAndScheduleTime?shift=" + shift + "&scheduleTime=" + scheduleTime + "&page=" + (this.pageScheduleByShiftAndScheduleTime - 1)).then((res) => {
            this.scheduleByShiftAndScheduleTimeData = res.data;
            this.scheduleByShiftAndScheduleTime = this.scheduleByShiftAndScheduleTimeData.content;

            this.paginationScheduleByShiftAndScheduleTime = [];

            this.paginationFirstScheduleByShiftAndScheduleTime = this.scheduleByShiftAndScheduleTimeData.first;
            this.paginationLastScheduleByShiftAndScheduleTime = this.scheduleByShiftAndScheduleTimeData.last;

            for (let index = 1; index <= this.scheduleByShiftAndScheduleTimeData.totalPages; index++) {
                this.paginationScheduleByShiftAndScheduleTime.push(index);
            }

            this.paginationScheduleByShiftAndScheduleTime = this.paginationScheduleByShiftAndScheduleTime.slice(this.pageScheduleByShiftAndScheduleTime == 1 ? this.pageScheduleByShiftAndScheduleTime - 1 : this.pageScheduleByShiftAndScheduleTime == 2 ? this.pageScheduleByShiftAndScheduleTime - 2 : this.pageScheduleByShiftAndScheduleTime - 3, this.pageScheduleByShiftAndScheduleTime + 2);
       
            this.scope.shiftScheduleByShiftAndScheduleTime = undefined;
            this.scope.scheduleTimeScheduleByShiftAndScheduleTime = undefined;
            this.scope.scheduleByShiftAndScheduleTimeForm.$setPristine();
        });
    };
    private viewPageNavigationLeftScheduleByShiftAndScheduleTime() {
        this.pageScheduleByShiftAndScheduleTime -= 1
        this.viewScheduleByShiftAndScheduleTime(this.shiftScheduleByShiftAndScheduleTime, this.scheduleTimeScheduleByShiftAndScheduleTime);
    }
    private viewPageNavigationRightScheduleByShiftAndScheduleTime() {
        this.pageScheduleByShiftAndScheduleTime += 1
        this.viewScheduleByShiftAndScheduleTime(this.shiftScheduleByShiftAndScheduleTime, this.scheduleTimeScheduleByShiftAndScheduleTime);
    }
    private viewPageNavigationScheduleByShiftAndScheduleTime(pageScheduleByShiftAndScheduleTime: number) {
        this.pageScheduleByShiftAndScheduleTime = pageScheduleByShiftAndScheduleTime;
        this.viewScheduleByShiftAndScheduleTime(this.shiftScheduleByShiftAndScheduleTime, this.scheduleTimeScheduleByShiftAndScheduleTime);
    }

    private viewScheduleByTeacherStart (){
        this.scheduleByTeacherStart = true;
    }
    private viewScheduleByTeacher(teacher: string) {
        if (this.scheduleByTeacherStart) {
            this.pageScheduleByTeacher = 1;
        }
        console.log(teacher);
        
        this.scheduleByTeacherStart = false;
        this.teacherScheduleByTeacher = teacher;
        this.http.get("http://127.0.0.1:8080/schedule/view/teacher?teacherId=" + teacher + "&page=" + (this.pageScheduleByTeacher - 1)).then((res) => {
            this.scheduleByTeacherData = res.data;
            this.scheduleByTeacher = this.scheduleByTeacherData.content;

            this.paginationScheduleByTeacher = [];

            this.paginationFirstScheduleByTeacher = this.scheduleByTeacherData.first;
            this.paginationLastScheduleByTeacher = this.scheduleByTeacherData.last;

            for (let index = 1; index <= this.scheduleByTeacherData.totalPages; index++) {
                this.paginationScheduleByTeacher.push(index);
            }

            this.paginationScheduleByTeacher = this.paginationScheduleByTeacher.slice(this.pageScheduleByTeacher == 1 ? this.pageScheduleByTeacher - 1 : this.pageScheduleByTeacher == 2 ? this.pageScheduleByTeacher - 2 : this.pageScheduleByTeacher - 3, this.pageScheduleByTeacher + 2);
       
            this.scope.scheduleByTeacher = undefined;
            this.scope.scheduleByTeacherForm.$setPristine();
        });
    }
    private viewPageNavigationLeftScheduleByTeacher() {
        this.pageScheduleByTeacher -= 1
        this.viewScheduleByTeacher(this.teacherScheduleByTeacher);
    }
    private viewPageNavigationRightScheduleByTeacher() {
        this.pageScheduleByTeacher += 1
        this.viewScheduleByTeacher(this.teacherScheduleByTeacher);
    }
    private viewPageNavigationScheduleByTeacher(pageScheduleByTeacher: number) {
        this.pageScheduleByTeacher = pageScheduleByTeacher;
        this.viewScheduleByTeacher(this.teacherScheduleByTeacher);
    }

    private viewScheduleByTeacherAndDate(scheduleByTeacherAndDate:any) {
        this.dateScheduleByTeacherAndDate = scheduleByTeacherAndDate.date;
        let teacherId = scheduleByTeacherAndDate.teacher;
        let monthString = "";
        let dayString = "";
        let day = this.dateScheduleByTeacherAndDate.getDate();
        let month = this.dateScheduleByTeacherAndDate.getMonth() + 1;
        let year = this.dateScheduleByTeacherAndDate.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/teacherAndDate?date=" + year + "-" + monthString + "-" + dayString + "&teacherId="+teacherId).then((res) => {
            this.scheduleByTeacherAndDate = res.data;

            this.scope.scheduleByTeacherAndDate = undefined;
            this.scope.scheduleByTeacherAndDateForm.$setPristine();
        });
    }

    private viewScheduleByTeacherAndDateAndShiftAndScheduleTime(scheduleByTeacherAndDateAndShiftAndScheduleTime:any) {
        let dateScheduleByTeacherAndDateAndShiftAndScheduleTime = scheduleByTeacherAndDateAndShiftAndScheduleTime.date;
        let teacherId = scheduleByTeacherAndDateAndShiftAndScheduleTime.teacher;
        let shift = scheduleByTeacherAndDateAndShiftAndScheduleTime.shift;
        let scheduleTime = scheduleByTeacherAndDateAndShiftAndScheduleTime.scheduleTime;

        let monthString = "";
        let dayString = "";
        let day = dateScheduleByTeacherAndDateAndShiftAndScheduleTime.getDate();
        let month = dateScheduleByTeacherAndDateAndShiftAndScheduleTime.getMonth() + 1;
        let year = dateScheduleByTeacherAndDateAndShiftAndScheduleTime.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/teacherAndDateAndShiftAndScheduleTime?date=" + year + "-" + monthString + "-" + dayString + "&teacherId="+teacherId+"&shift="+shift+"&scheduleTime="+scheduleTime).then((res) => {
            this.scheduleByTeacherAndDateAndShiftAndScheduleTime = res.data;

            this.scope.scheduleByTeacherAndDateAndShiftAndScheduleTime = undefined;
            this.scope.scheduleByTeacherAndDateAndShiftAndScheduleTimeForm.$setPristine();
        });
    }

    private viewScheduleByTeacherAndClass(scheduleByTeacherAndClass:any) {
        let teacherId = scheduleByTeacherAndClass.teacher;
        let classId = scheduleByTeacherAndClass.class;
        this.http.get("http://127.0.0.1:8080/schedule/view/teacherAndClass?teacherId="+teacherId+"&classId="+classId).then((res) => {
            this.scheduleByTeacherAndClass = res.data;

            this.scope.scheduleByTeacherAndClass = undefined;
            this.scope.scheduleByTeacherAndClassForm.$setPristine();
        });
    }

    
    private viewScheduleByLaboratoryStart (){
        this.scheduleByLaboratoryStart = true;
    }
    private viewScheduleByLaboratory(laboratory: string) {
        if (this.scheduleByLaboratoryStart) {
            this.pageScheduleByLaboratory = 1;
        }
        
        this.scheduleByLaboratoryStart = false;
        this.laboratoryScheduleByLaboratory = laboratory;
        this.http.get("http://127.0.0.1:8080/schedule/view/laboratory?laboratoryId=" + laboratory + "&page=" + (this.pageScheduleByLaboratory - 1)).then((res) => {
            this.scheduleByLaboratoryData = res.data;
            this.scheduleByLaboratory = this.scheduleByLaboratoryData.content;

            this.paginationScheduleByLaboratory = [];

            this.paginationFirstScheduleByLaboratory = this.scheduleByLaboratoryData.first;
            this.paginationLastScheduleByLaboratory = this.scheduleByLaboratoryData.last;

            for (let index = 1; index <= this.scheduleByLaboratoryData.totalPages; index++) {
                this.paginationScheduleByLaboratory.push(index);
            }

            this.paginationScheduleByLaboratory = this.paginationScheduleByLaboratory.slice(this.pageScheduleByLaboratory == 1 ? this.pageScheduleByLaboratory - 1 : this.pageScheduleByLaboratory == 2 ? this.pageScheduleByLaboratory - 2 : this.pageScheduleByLaboratory - 3, this.pageScheduleByLaboratory + 2);
       
            this.scope.scheduleByLaboratory = undefined;
            this.scope.scheduleByLaboratoryForm.$setPristine();
        });
    }
    private viewPageNavigationLeftScheduleByLaboratory() {
        this.pageScheduleByLaboratory -= 1
        this.viewScheduleByLaboratory(this.laboratoryScheduleByLaboratory);
    }
    private viewPageNavigationRightScheduleByLaboratory() {
        this.pageScheduleByLaboratory += 1
        this.viewScheduleByLaboratory(this.laboratoryScheduleByLaboratory);
    }
    private viewPageNavigationScheduleByLaboratory(pageScheduleByLaboratory: number) {
        this.pageScheduleByLaboratory = pageScheduleByLaboratory;
        this.viewScheduleByLaboratory(this.laboratoryScheduleByLaboratory);
    }

    private viewScheduleByLaboratoryAndDate(scheduleByLaboratoryAndDate:any) {
        this.dateScheduleByLaboratoryAndDate = scheduleByLaboratoryAndDate.date;
        let laboratoryId = scheduleByLaboratoryAndDate.laboratory;
        let monthString = "";
        let dayString = "";
        let day = this.dateScheduleByLaboratoryAndDate.getDate();
        let month = this.dateScheduleByLaboratoryAndDate.getMonth() + 1;
        let year = this.dateScheduleByLaboratoryAndDate.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/laboratoryAndDate?date=" + year + "-" + monthString + "-" + dayString + "&laboratoryId="+laboratoryId).then((res) => {
            this.scheduleByLaboratoryAndDate = res.data;

            this.scope.scheduleByLaboratoryAndDate = undefined;
            this.scope.scheduleByLaboratoryAndDateForm.$setPristine();
        });
    }

    private viewScheduleByClassOfStudentsStart (){
        this.scheduleByClassOfStudentsStart = true;
    }
    private viewScheduleByClassOfStudents(classOfStudents: string) {
        if (this.scheduleByClassOfStudentsStart) {
            this.pageScheduleByClassOfStudents = 1;
        }
        console.log(classOfStudents);
        
        this.scheduleByClassOfStudentsStart = false;
        this.classOfStudentsScheduleByClassOfStudents = classOfStudents;
        this.http.get("http://127.0.0.1:8080/schedule/view/class?classId=" + classOfStudents + "&page=" + (this.pageScheduleByClassOfStudents - 1)).then((res) => {
            this.scheduleByClassOfStudentsData = res.data;
            this.scheduleByClassOfStudents = this.scheduleByClassOfStudentsData.content;

            this.paginationScheduleByClassOfStudents = [];

            this.paginationFirstScheduleByClassOfStudents = this.scheduleByClassOfStudentsData.first;
            this.paginationLastScheduleByClassOfStudents = this.scheduleByClassOfStudentsData.last;

            for (let index = 1; index <= this.scheduleByClassOfStudentsData.totalPages; index++) {
                this.paginationScheduleByClassOfStudents.push(index);
            }

            this.paginationScheduleByClassOfStudents = this.paginationScheduleByClassOfStudents.slice(this.pageScheduleByClassOfStudents == 1 ? this.pageScheduleByClassOfStudents - 1 : this.pageScheduleByClassOfStudents == 2 ? this.pageScheduleByClassOfStudents - 2 : this.pageScheduleByClassOfStudents - 3, this.pageScheduleByClassOfStudents + 2);
       
            this.scope.scheduleByClassOfStudents = undefined;
            this.scope.scheduleByClassOfStudentsForm.$setPristine();
        });
    }
    private viewPageNavigationLeftScheduleByClassOfStudents() {
        this.pageScheduleByClassOfStudents -= 1
        this.viewScheduleByClassOfStudents(this.classOfStudentsScheduleByClassOfStudents);
    }
    private viewPageNavigationRightScheduleByClassOfStudents() {
        this.pageScheduleByClassOfStudents += 1
        this.viewScheduleByClassOfStudents(this.classOfStudentsScheduleByClassOfStudents);
    }
    private viewPageNavigationScheduleByClassOfStudents(pageScheduleByClassOfStudents: number) {
        this.pageScheduleByClassOfStudents = pageScheduleByClassOfStudents;
        this.viewScheduleByClassOfStudents(this.classOfStudentsScheduleByClassOfStudents);
    }

    private viewScheduleByClassOfStudentsAndDate(scheduleByClassOfStudentsAndDate:any) {
        this.dateScheduleByClassOfStudentsAndDate = scheduleByClassOfStudentsAndDate.date;
        let classOfStudentsId = scheduleByClassOfStudentsAndDate.classOfStudents;
        let monthString = "";
        let dayString = "";
        let day = this.dateScheduleByClassOfStudentsAndDate.getDate();
        let month = this.dateScheduleByClassOfStudentsAndDate.getMonth() + 1;
        let year = this.dateScheduleByClassOfStudentsAndDate.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/classAndDate?date=" + year + "-" + monthString + "-" + dayString + "&classId="+classOfStudentsId).then((res) => {
            this.scheduleByClassOfStudentsAndDate = res.data;

            this.scope.scheduleByClassOfStudentsAndDate = undefined;
            this.scope.scheduleByClassOfStudentsAndDateForm.$setPristine();
        });
    }

    private viewScheduleByClassOfStudentsAndDateAndShiftAndScheduleTime(scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime:any) {
        let dateScheduleByClassOfStudentsAndDateAndShiftAndScheduleTime = scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.date;
        let classOfStudentsId = scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.classOfStudents;
        let shift = scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.shift;
        let scheduleTime = scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.scheduleTime;

        let monthString = "";
        let dayString = "";
        let day = dateScheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.getDate();
        let month = dateScheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.getMonth() + 1;
        let year = dateScheduleByClassOfStudentsAndDateAndShiftAndScheduleTime.getFullYear();
        if (day < 10){
            dayString = "0" + day.toString();
        } else {
            dayString = day.toString();
        }
        if (month < 10) {
            monthString = "0" + month.toString();
        } else {
            monthString = month.toString();
        }
        this.http.get("http://127.0.0.1:8080/schedule/view/classAndDateAndShiftAndScheduleTime?date=" + year + "-" + monthString + "-" + dayString + "&classId="+classOfStudentsId+"&shift="+shift+"&scheduleTime="+scheduleTime).then((res) => {
            this.scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime = res.data;

            this.scope.scheduleByClassOfStudentsAndDateAndShiftAndScheduleTime = undefined;
            this.scope.scheduleByClassOfStudentsAndDateAndShiftAndScheduleTimeForm.$setPristine();
        });
    }

    private viewScheduleByClassOfStudentsAndTeacher(scheduleByClassOfStudentsAndTeacher:any) {
        let teacherId = scheduleByClassOfStudentsAndTeacher.teacher;
        let classId = scheduleByClassOfStudentsAndTeacher.class;
        this.http.get("http://127.0.0.1:8080/schedule/view/teacherAndClass?teacherId="+teacherId+"&classId="+classId).then((res) => {
            this.scheduleByClassOfStudentsAndTeacher = res.data;

            this.scope.scheduleByClassOfStudentsAndTeacher = undefined;
            this.scope.scheduleByClassOfStudentsAndTeacherForm.$setPristine();
        });
    }

    private viewInitialPage() {
        this.http.get("http://127.0.0.1:8080/schedule/view/now").then((res) => {
            this.initialPage = res.data;
        });
    };

    $onInit() {
        this.viewPage="initialPage";
        this.dateInitialPage = Date.now();
        this.viewInitialPage();
    }
}
export default ScheduleCtrl;