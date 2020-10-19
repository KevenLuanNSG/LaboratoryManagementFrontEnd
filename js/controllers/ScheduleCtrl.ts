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

    private initialPage:any;
    private dateInitialPage: any;

    constructor($scope: IScheduleCtrl, $http: IHttpService) {
        this.scope = $scope;
        this.http = $http;
        this.viewSelected = "scheduleByDate";
        this.viewPage = "scheduleByDate";

        this.dateScheduleByDate = new Date;
        this.dateScheduleByDateAndShift = new Date;
        this.dateScheduleByDateAndShiftAndScheduleTime = new Date;
        this.dateScheduleByTeacherAndDate = new Date;

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
        this.scheduleByShiftStart = true;
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
    };
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
    };

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
    };


    private viewInitialPage() {
        this.http.get("http://127.0.0.1:8080/schedule/view/now").then((res) => {
            this.initialPage = res.data;
            console.log("Yes");
        });
    };

    $onInit() {
        this.viewPage="initialPage";
        this.dateInitialPage = Date.now();
        this.viewInitialPage();
    }
}
export default ScheduleCtrl;