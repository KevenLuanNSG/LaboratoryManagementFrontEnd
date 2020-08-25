/*angular.module("lanchonete").controller("clienteCtrl", function ($scope, $http) {

    //Paginação dos clientes
    $scope.clientesInicio = false;
    $scope.viewClientesInicio = function () {
        $scope.clientesInicio = true;
    }
    $scope.page = 1;
    $scope.carregarClientes = function () {
        if ($scope.clientesInicio) {
            $scope.page = 1;
        }
        $scope.clientesInicio = false;
        $http.get("http://127.0.0.1:8080/cliente/visualizar/todos?page=" + ($scope.page - 1)).then(function (res) {
            $scope.clientes = res.data.content;

            $scope.pagination = [];

            $scope.paginationFirst = res.data.first;
            $scope.paginationLast = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.pagination.push(index);
            }

            $scope.pagination = $scope.pagination.slice($scope.page == 1 ? $scope.page - 1 : $scope.page == 2 ? $scope.page - 2 : $scope.page - 3, $scope.page + 2);
        });
    };
    $scope.viewPageNavigationAnterior = function () {
        $scope.page -= 1
        $scope.carregarClientes();
    }
    $scope.viewPageNavigationProxima = function () {
        $scope.page += 1
        $scope.carregarClientes();
    }
    $scope.viewPageNavigation = function (page) {
        $scope.page = parseInt(page.toString());
        $scope.carregarClientes();
    }//Fim paginação dos clientes

    $scope.buscarCliente = function (cpf) {
        $http.get("http://127.0.0.1:8080/cliente/visualizar?cpf=" + cpf).then(function (res) {
            delete $scope.cpf;
            $scope.clienteEncontrado = res.data;
            $scope.showClienteEncontrado = true;
            $scope.clienteFormBuscar.$setPristine();
        });
    };

    $scope.clienteAtualizarNome = function (cpf, nome) {
        $http.get("http://127.0.0.1:8080/cliente/atualizarNome?cpf=" + cpf + "&nome=" + nome).then(function (res) {
            delete $scope.cpf;
            delete $scope.nome;
            $scope.clienteNomeAtualizado = res.data;
            $scope.showClienteNomeAtualizado = true;
            $scope.clienteFormAtualizarNome.$setPristine();
        });
    };

    $scope.cadastrarCliente = function (cliente) {
        $http.post("http://127.0.0.1:8080/cliente/cadastrar", cliente).then(function (res) {
            delete $scope.cliente;
            $scope.clienteCadastrado = res.data;
            $scope.showClienteCadastrado = true;
            $scope.clienteFormCadastrar.$setPristine();
        });
    };

    $scope.viewSelecionado = "buscarCliente";
    $scope.selecionarView = function (selecionado) {
        $scope.viewSelecionado = selecionado;
    }
});*/