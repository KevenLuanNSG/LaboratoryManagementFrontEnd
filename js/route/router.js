var app = angular.module("lanchonete");
app.config(function ($routeProvider) {
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
});

