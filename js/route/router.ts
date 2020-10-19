configRoutes.$inject=["$routeProvider"];
function configRoutes($routeProvider: ng.route.IRouteProvider){
  $routeProvider
    .when("/", {
      templateUrl: "../../view/schedules.html"
    })
    .when("/schedules", {
      templateUrl: "../../view/schedules.html"
    })
    .when("/register", {
      templateUrl: "../../view/register.html"
    })
    .when("/auto-generator", {
      templateUrl: "../../view/generator.html"
    })
    .when("/to-schedule", {
      templateUrl: "../../view/to-schedule.html"
    })    
    .when("/laboratory", {
      templateUrl: "../../view/laboratory.html"
    });
}
export default configRoutes;

