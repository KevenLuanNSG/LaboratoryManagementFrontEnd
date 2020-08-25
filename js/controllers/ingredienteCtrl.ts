/*angular.module("lanchonete").controller("ingredienteCtrl", function ($scope, $http) {

    //Paginação dos ingredientes
    $scope.ingredientesInicio = false;
    $scope.viewIngredientesInicio = function () {
        $scope.ingredientesInicio = true;
    }
    $scope.pageIngredientes = 1;
    $scope.carregarIngredientes = function () {
        if ($scope.ingredientesInicio) {
            $scope.pageIngredientes = 1;
        }
        $scope.ingredientesInicio = false;
        $http.get("http://localhost:8080/ingrediente/visualizar/completo?page=" + ($scope.pageIngredientes - 1)).then(function (res) {
            $scope.ingredientes = res.data.content;

            $scope.paginationIngredientes = [];

            $scope.paginationIngredientesFirst = res.data.first;
            $scope.paginationIngredientesLast = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationIngredientes.push(index);
            }

            $scope.paginationIngredientes = $scope.paginationIngredientes.slice($scope.pageIngredientes == 1 ? $scope.pageIngredientes - 1 : $scope.pageIngredientes == 2 ? $scope.pageIngredientes - 2 : $scope.pageIngredientes - 3, $scope.pageIngredientes + 2);
        });
    };
    $scope.viewPageNavigationIngredientesAnterior = function () {
        $scope.pageIngredientes -= 1
        $scope.carregarIngredientes();
    }
    $scope.viewPageNavigationIngredientesProxima = function () {
        $scope.pageIngredientes += 1
        $scope.carregarIngredientes();
    }
    $scope.viewPageNavigationIngredientes = function (pageIngredientes) {
        $scope.pageIngredientes = parseInt(pageIngredientes.toString());
        $scope.carregarIngredientes();
    }//Fim da paginação dos ingredientes

    //Paginação dos ingredientes com quantidade mínima atingida
    $scope.ingredientesLimiteInicio = false;
    $scope.viewIngredientesLimiteInicio = function () {
        $scope.ingredientesLimiteInicio = true;
    }
    $scope.pageIngredientesLimite = 1;
    $scope.carregarIngredientesLimite = function () {
        if ($scope.ingredientesLimiteInicio) {
            $scope.pageIngredientesLimite = 1;
        }
        $scope.ingredientesLimiteInicio = false;
        $http.get("http://localhost:8080/ingrediente/visualizar/limite?page=" + ($scope.pageIngredientesLimite - 1)).then(function (res) {
            $scope.ingredientesLimite = res.data.content;

            $scope.paginationIngredientesLimite = [];

            $scope.paginationIngredientesLimiteFirst = res.data.first;
            $scope.paginationIngredientesLimiteLast = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationIngredientesLimite.push(index);
            }

            $scope.paginationIngredientesLimite = $scope.paginationIngredientesLimite.slice($scope.pageIngredientesLimite == 1 ? $scope.pageIngredientesLimite - 1 : $scope.pageIngredientesLimite == 2 ? $scope.pageIngredientesLimite - 2 : $scope.pageIngredientesLimite - 3, $scope.pageIngredientesLimite + 2);
        });
    };
    $scope.viewPageNavigationIngredientesLimiteAnterior = function () {
        $scope.pageIngredientesLimite -= 1
        $scope.carregarIngredientesLimite();
    }
    $scope.viewPageNavigationIngredientesLimiteProxima = function () {
        $scope.pageIngredientesLimite += 1
        $scope.carregarIngredientesLimite();
    }
    $scope.viewPageNavigationIngredientesLimite = function (pageIngredientesLimite) {
        $scope.pageIngredientesLimite = parseInt(pageIngredientesLimite.toString());
        $scope.carregarIngredientesLimite();
    }//Fim da paginação dos ingredientes com quantidade mínima atingida

    //Paginação dos ingredientes com quantidade igual a 0
    $scope.ingredientesZeradosInicio = false;
    $scope.viewIngredientesZeradosInicio = function () {
        $scope.ingredientesZeradosInicio = true;
    }
    $scope.pageIngredientesZerados = 1;
    $scope.carregarIngredientesZerados = function () {
        if ($scope.ingredientesZeradosInicio) {
            $scope.pageIngredientesZerados = 1;
        }
        $scope.ingredientesZeradosInicio = false;
        $http.get("http://localhost:8080/ingrediente/visualizar/zerado?page=" + ($scope.pageIngredientesZerados - 1)).then(function (res) {
            $scope.ingredientesZerados = res.data.content;

            $scope.paginationIngredientesZerados = [];

            $scope.paginationIngredientesZeradosFirst = res.data.first;
            $scope.paginationIngredientesZeradosLast = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationIngredientesZerados.push(index);
            }

            $scope.paginationIngredientesZerados = $scope.paginationIngredientesZerados.slice($scope.pageIngredientesZerados == 1 ? $scope.pageIngredientesZerados - 1 : $scope.pageIngredientesZerados == 2 ? $scope.pageIngredientesZerados - 2 : $scope.pageIngredientesZerados - 3, $scope.pageIngredientesZerados + 2);
        });
    };
    $scope.viewPageNavigationIngredientesZeradosAnterior = function () {
        $scope.pageIngredientesZerados -= 1
        $scope.carregarIngredientesZerados();
    }
    $scope.viewPageNavigationIngredientesZeradosProxima = function () {
        $scope.pageIngredientesZerados += 1
        $scope.carregarIngredientesZerados();
    }
    $scope.viewPageNavigationIngredientesZerados = function (pageIngredientesZerados) {
        $scope.pageIngredientesZerados = parseInt(pageIngredientesZerados.toString());
        $scope.carregarIngredientesZerados();
    }//Fim da paginação dos ingredientes com quantidade igual a 0

    $scope.cadastrarIngrediente = function (ingrediente) {
        $http.post("http://127.0.0.1:8080/ingrediente/cadastrar", ingrediente).then(function (res) {
            delete $scope.ingrediente;
            $scope.ingredienteCadastrado = res.data;
            $scope.showIngredienteCadastrado = true;
            $scope.ingredienteFormCadastrar.$setPristine();
        });
    };

    $scope.comprarIngrediente = function (ingredienteId, quantidade) {
        $http.get("http://127.0.0.1:8080/ingrediente/comprar?ingredienteId=" + ingredienteId + "&quantidade=" + quantidade).then(function (res) {
            delete $scope.ingredienteId;
            delete $scope.quantidade;
            $scope.ingredienteComprado = res.data;
            $scope.showIngredienteComprado = true;
            $scope.ingredienteFormComprar.$setPristine();
        });
    };

    $scope.darBaixa = function (ingredienteId, quantidade) {
        $http.get("http://127.0.0.1:8080/ingrediente/darBaixa?ingredienteId=" + ingredienteId + "&quantidade=" + quantidade).then(function (res) {
            delete $scope.ingredienteId;
            delete $scope.quantidade;
            $scope.ingredientePerdido = res.data;
            $scope.showIngredientePerdido = true;
            $scope.ingredienteFormDarBaixa.$setPristine();
        });
    };

    $scope.atualizarNome = function (ingredienteId, nome) {
        $http.get("http://127.0.0.1:8080/ingrediente/atualizarNome?ingredienteId=" + ingredienteId + "&nome=" + nome).then(function (res) {
            delete $scope.ingredienteId;
            delete $scope.nome;
            $scope.ingredienteNomeAtualizado = res.data;
            $scope.showIngredienteNomeAtualizado = true;
            $scope.ingredienteFormAtualizarNome.$setPristine();
        });
    };

    $scope.atualizarQuantidadeMinima = function (ingredienteId, quantidadeMinima) {
        $http.get("http://127.0.0.1:8080/ingrediente/quantidadeMinima?ingredienteId=" + ingredienteId + "&quantidadeMinima=" + quantidadeMinima).then(function (res) {
            delete $scope.ingredienteId;
            delete $scope.quantidadeMinima;
            $scope.ingredienteQuantidadeMinimaAtualizada = res.data;
            $scope.showIngredienteQuantidadeMinimaAtualizada = true;
            $scope.ingredienteFormAtualizarQuantidadeMinima.$setPristine();
        });
    };

    $scope.viewPagina = "ingredientes";
    $scope.viewSelecionado = "ingredientes";
    $scope.selecionarView = function (pagina, selecionado) {
        $scope.viewPagina = pagina;
        $scope.viewSelecionado = selecionado;
    }

    $scope.carregarIngredientes();
});*/