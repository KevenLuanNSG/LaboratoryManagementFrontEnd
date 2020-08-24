angular.module("lanchonete").controller("cardapioCtrl", function ($scope, $http) {

    var carregarCombos = function () {
        $http.get("http://127.0.0.1:8080/cardapio/combos").then(function (res) {
            $scope.combos = res.data;
        });
    };
    var carregarLanches = function () {
        $http.get("http://127.0.0.1:8080/cardapio/lanches").then(function (res) {
            $scope.lanches = res.data;
        });
    };
    var carregarBebidas = function () {
        $http.get("http://127.0.0.1:8080/cardapio/bebidas").then(function (res) {
            $scope.todasBebidas = res.data;
        });
    };

    //Lista de ingredientes e quantidade utilizada na produção do lanche
    $scope.carregarFazerProduto = function (produtoId) {
        $http.get("http://localhost:8080/fazer/info?produtoId=" + produtoId).then(function (res) {
            $scope.fazerProduto = res.data;
        });
    }

    $scope.viewSelecionado = "cardapio";
    $scope.selecionarView = function (selecionado) {
        $scope.viewSelecionado = selecionado;
    }

    $scope.viewProdutos = "";
    $scope.viewProdutosCombo = function (id) {
        $scope.viewProdutos = id;
    }

    carregarLanches();
    carregarBebidas();
    carregarCombos();
});