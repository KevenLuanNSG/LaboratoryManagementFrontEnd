configRoutes.$inject=["$routeProvider"];
function configRoutes($routeProvider: ng.route.IRouteProvider){
  $routeProvider
    .when("/", {
      templateUrl: "../../view/cardapio.html"
    })
    .when("/produtos", {
      templateUrl: "../../view/produtos.html"
    })
    .when("/clientes", {
      templateUrl: "../../view/clientes.html"
    })
    .when("/ingredientes", {
      templateUrl: "../../view/ingredientes.html"
    })
    .when("/venda", {
      templateUrl: "../../view/venda.html"
    });
}
export default configRoutes;

