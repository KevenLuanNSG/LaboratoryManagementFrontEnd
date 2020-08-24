angular.module("lanchonete").controller("vendaCtrl", function ($scope, $http) {

    $scope.carregarBebidasInd = function () {
        $http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Bebida").then(function (res) {
            $scope.bebidasInd = res.data;
        });
    }
    $scope.carregarDoces = function () {
        $http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Doce").then(function (res) {
            $scope.doces = res.data;
        });
    }
    $scope.carregarChocolates = function () {
        $http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Chocolate").then(function (res) {
            $scope.chocolates = res.data;
        });
    }
    $scope.carregarSorvetes = function () {
        $http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Sorvete").then(function (res) {
            $scope.sorvetes = res.data;
        });
    }
    $scope.carregarBebidas = function () {
        $http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Bebida").then(function (res) {
            $scope.bebidas = res.data;
        });
    }
    $scope.carregarLanches = function () {
        $http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Lanche").then(function (res) {
            $scope.lanches = res.data;
        });
    }
    $scope.carregarCombos = function () {
        $http.get("http://127.0.0.1:8080/combo/combos").then(function (res) {
            $scope.combos = res.data;
        });
    }


    $scope.produtoList = [];
    $scope.adicionarLanche = function (lanche) {
        $scope.produtoList.push(lanche);
    }
    $scope.adicionarBebida = function (bebida) {
        $scope.produtoList.push(bebida);
    }
    $scope.removerProduto = function (index) {
        $scope.produtoList.splice(index, 1);
    }

    $scope.comboList = [];
    $scope.adicionarCombo = function (combo) {
        $scope.comboList.push(combo);
    }
    $scope.removerCombo = function (index) {
        $scope.comboList.splice(index, 1);
    }

    $scope.produtoIndependenteList = [];
    $scope.adicionarBebidaInd = function (bebidaInd) {
        $scope.produtoIndependenteList.push(bebidaInd);
    }
    $scope.adicionarDoce = function (doce) {
        $scope.produtoIndependenteList.push(doce);
    }
    $scope.adicionarChocolate = function (chocolate) {
        $scope.produtoIndependenteList.push(chocolate);
    }
    $scope.adicionarSorvete = function (sorvete) {
        $scope.produtoIndependenteList.push(sorvete);
    }
    $scope.removerProdutoIndependente = function (index) {
        $scope.produtoIndependenteList.splice(index, 1);
    }


    $scope.carregarValorVenda = function () {
        $scope.valorVenda = 0;
        if ($scope.produtoList.length > 0) {
            $scope.produtoList.forEach(element => {
                $scope.valorVenda += element.preco;
            });
        }
        if ($scope.produtoIndependenteList.length > 0) {
            $scope.produtoIndependenteList.forEach(element => {
                $scope.valorVenda += element.preco;
            });
        }
        if ($scope.comboList.length > 0) {
            $scope.comboList.forEach(element => {
                $scope.valorVenda += element.preco;
            });
        }
    }
    $scope.realizarVenda = function (venda) {
        if ($scope.produtoList.length > 0) {
            venda.produtoList = $scope.produtoList;
        }
        if ($scope.produtoIndependenteList.length > 0) {
            venda.produtoIndependenteList = $scope.produtoIndependenteList;
        }
        if ($scope.comboList.length > 0) {
            venda.comboList = $scope.comboList;
        }

        $http.post("http://127.0.0.1:8080/venda/vender", venda).then(function (res) {
            delete $scope.venda;
            $scope.vendaRealizada = res.data;
            $scope.showVendaRealizada = true;
            $scope.vendaFormRealizar.$setPristine();
            $scope.produtoList = [];
            $scope.produtoIndependenteList = [];
            $scope.comboList = [];
        });
        $scope.valorVenda = 0;
    };


    $scope.vendasInicio = false;
    $scope.viewVendasInicio = function () {
        $scope.vendasInicio = true;
    }
    $scope.pageVendas = 1;
    $scope.visualizarVendas = function () {
        if ($scope.vendasInicio) {
            $scope.pageVendas = 1;
        }
        $scope.vendasInicio = false;
        $http.get("http://127.0.0.1:8080/venda/visualizar?page=" + ($scope.pageVendas - 1)).then(function (res) {
            $scope.vendas = res.data.content;

            $scope.paginationVendas = [];

            $scope.paginationFirstVendas = res.data.first;
            $scope.paginationLastVendas = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendas.push(index);
            }

            $scope.paginationVendas = $scope.paginationVendas.slice($scope.pageVendas == 1 ? $scope.pageVendas - 1 : $scope.pageVendas == 2 ? $scope.pageVendas - 2 : $scope.pageVendas - 3, $scope.pageVendas + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendas = function () {
        $scope.pageVendas -= 1
        $scope.visualizarVendas();
    }
    $scope.viewPageNavigationProximaVendas = function () {
        $scope.pageVendas += 1
        $scope.visualizarVendas();
    }
    $scope.viewPageNavigationVendas = function (pageVendas) {
        $scope.pageVendas = parseInt(pageVendas.toString());
        $scope.visualizarVendas();
    }


    $scope.vendasDoDiaInicio = false;
    $scope.viewVendasDoDiaInicio = function () {
        $scope.vendasDoDiaInicio = true;
    }
    $scope.pageVendasDoDia = 1;
    $scope.visualizarVendasDoDia = function (date) {
        if ($scope.vendasDoDiaInicio) {
            $scope.pageVendasDoDia = 1;
        }
        $scope.vendasDoDiaInicio = false;
        $scope.dateVendasDoDia = date;
        mesString = "";
        dia = date.getDate();
        mes = date.getMonth() + 1;
        ano = date.getFullYear();
        if (mes < 10) {
            mesString = "0" + mes.toString();
        } else {
            mesString = mes.toString();
        }
        $http.get("http://127.0.0.1:8080/venda/visualizar/data?dateStart=" + ano + "-" + mesString + "-" + dia + "&dateEnd=" + ano + "-" + mesString + "-" + dia + "&page=" + ($scope.pageVendasDoDia - 1)).then(function (res) {
            $scope.vendasDoDia = res.data.content;

            $scope.paginationVendasDoDia = [];

            $scope.paginationFirstVendasDoDia = res.data.first;
            $scope.paginationLastVendasDoDia = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendasDoDia.push(index);
            }

            $scope.paginationVendasDoDia = $scope.paginationVendasDoDia.slice($scope.pageVendasDoDia == 1 ? $scope.pageVendasDoDia - 1 : $scope.pageVendasDoDia == 2 ? $scope.pageVendasDoDia - 2 : $scope.pageVendasDoDia - 3, $scope.pageVendasDoDia + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendasDoDia = function () {
        $scope.pageVendasDoDia -= 1;
        $scope.vendasDoDiaInicio = false;
        $scope.visualizarVendasDoDia($scope.dateVendasDoDia);
    }
    $scope.viewPageNavigationProximaVendasDoDia = function () {
        $scope.pageVendasDoDia += 1;
        $scope.vendasDoDiaInicio = false;
        $scope.visualizarVendasDoDia($scope.dateVendasDoDia);
    }
    $scope.viewPageNavigationVendasDoDia = function (pageVendasDoDia) {
        $scope.pageVendasDoDia = parseInt(pageVendasDoDia.toString());
        $scope.vendasDoDiaInicio = false;
        $scope.visualizarVendasDoDia($scope.dateVendasDoDia);
    }


    $scope.vendasPorPeriodoInicio = false;
    $scope.viewVendasPorPeriodoInicio = function () {
        $scope.vendasPorPeriodoInicio = true;
    }
    $scope.pageVendasPorPeriodo = 1;
    $scope.visualizarVendasPorPeriodo = function (dateStart, dateEnd) {
        if ($scope.vendasPorPeriodoInicio) {
            $scope.pageVendasPorPeriodo = 1;
        }
        $scope.vendasPorPeriodoInicio = false;
        $scope.dateStartVendasPorPeriodo = dateStart;
        $scope.dateEndVendasPorPeriodo = dateEnd;

        mesStringStart = "";
        diaStart = dateStart.getDate();
        mesStart = dateStart.getMonth() + 1;
        anoStart = dateStart.getFullYear();
        if (mesStart < 10) {
            mesStringStart = "0" + mesStart.toString();
        } else {
            mesStringStart = mesStart.toString();
        }

        mesStringEnd = "";
        diaEnd = dateEnd.getDate();
        mesEnd = dateEnd.getMonth() + 1;
        anoEnd = dateEnd.getFullYear();
        if (mesEnd < 10) {
            mesStringEnd = "0" + mesEnd.toString();
        } else {
            mesStringEnd = mesEnd.toString();
        }

        $http.get("http://127.0.0.1:8080/venda/visualizar/data?dateStart=" + anoStart + "-" + mesStringStart + "-" + diaStart + "&dateEnd=" + anoEnd + "-" + mesStringEnd + "-" + diaEnd + "&page=" + ($scope.pageVendasPorPeriodo - 1)).then(function (res) {
            $scope.vendasPorPeriodo = res.data.content;

            $scope.paginationVendasPorPeriodo = [];

            $scope.paginationFirstVendasPorPeriodo = res.data.first;
            $scope.paginationLastVendasPorPeriodo = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendasPorPeriodo.push(index);
            }

            $scope.paginationVendasPorPeriodo = $scope.paginationVendasPorPeriodo.slice($scope.pageVendasPorPeriodo == 1 ? $scope.pageVendasPorPeriodo - 1 : $scope.pageVendasPorPeriodo == 2 ? $scope.pageVendasPorPeriodo - 2 : $scope.pageVendasPorPeriodo - 3, $scope.pageVendasPorPeriodo + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendasPorPeriodo = function () {
        $scope.pageVendasPorPeriodo -= 1;
        $scope.vendasPorPeriodoInicio = false;
        $scope.visualizarVendasPorPeriodo($scope.dateStartVendasPorPeriodo, $scope.dateEndVendasPorPeriodo);
    }
    $scope.viewPageNavigationProximaVendasPorPeriodo = function () {
        $scope.pageVendasPorPeriodo += 1;
        $scope.vendasPorPeriodoInicio = false;
        $scope.visualizarVendasPorPeriodo($scope.dateStartVendasPorPeriodo, $scope.dateEndVendasPorPeriodo);
    }
    $scope.viewPageNavigationVendasPorPeriodo = function (pageVendasPorPeriodo) {
        $scope.pageVendasPorPeriodo = parseInt(pageVendasPorPeriodo.toString());
        $scope.vendasPorPeriodoInicio = false;
        $scope.visualizarVendasPorPeriodo($scope.dateStartVendasPorPeriodo, $scope.dateEndVendasPorPeriodo);
    }


    $scope.vendasPorClienteInicio = false;
    $scope.viewVendasPorClienteInicio = function () {
        $scope.vendasPorClienteInicio = true;
    }
    $scope.pageVendasPorCliente = 1;
    $scope.visualizarVendasPorCliente = function (cpf) {
        if ($scope.vendasPorClienteInicio) {
            $scope.pageVendasPorCliente = 1;
        }
        $scope.vendasPorClienteInicio = false;
        $http.get("http://127.0.0.1:8080/venda/visualizar/cliente?cpf=" + cpf + "&page=" + ($scope.pageVendasPorCliente - 1)).then(function (res) {
            $scope.vendasPorCliente = res.data.content;
            $scope.cpfVendasPorCliente = cpf;
            $scope.paginationVendasPorCliente = [];

            $scope.paginationFirstVendasPorCliente = res.data.first;
            $scope.paginationLastVendasPorCliente = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendasPorCliente.push(index);
            }

            $scope.paginationVendasPorCliente = $scope.paginationVendasPorCliente.slice($scope.pageVendasPorCliente == 1 ? $scope.pageVendasPorCliente - 1 : $scope.pageVendasPorCliente == 2 ? $scope.pageVendasPorCliente - 2 : $scope.pageVendasPorCliente - 3, $scope.pageVendasPorCliente + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendasPorCliente = function () {
        $scope.pageVendasPorCliente -= 1;
        $scope.vendasPorClienteInicio = false;
        $scope.visualizarVendasPorCliente($scope.cpfVendasPorCliente);
    }
    $scope.viewPageNavigationProximaVendasPorCliente = function () {
        $scope.pageVendasPorCliente += 1;
        $scope.vendasPorClienteInicio = false;
        $scope.visualizarVendasPorCliente($scope.cpfVendasPorCliente);
    }
    $scope.viewPageNavigationVendasPorCliente = function (pageVendasPorCliente) {
        $scope.pageVendasPorCliente = parseInt(pageVendasPorCliente.toString());
        $scope.vendasPorClienteInicio = false;
        $scope.visualizarVendasPorCliente($scope.cpfVendasPorCliente);
    }


    $scope.vendasPorPeriodoPorClienteInicio = false;
    $scope.viewVendasPorPeriodoPorClienteInicio = function () {
        $scope.vendasPorPeriodoPorClienteInicio = true;
    }
    $scope.pageVendasPorPeriodoPorCliente = 1;
    $scope.visualizarVendasPorPeriodoPorCliente = function (dateStart, dateEnd, cpf) {
        if ($scope.vendasPorPeriodoPorClienteInicio) {
            $scope.pageVendasPorPeriodoPorCliente = 1;
        }
        $scope.vendasPorPeriodoPorClienteInicio = false;
        $scope.dateStartVendasPorPeriodoPorCliente = dateStart;
        $scope.dateEndVendasPorPeriodoPorCliente = dateEnd;

        mesStringStart = "";
        diaStart = dateStart.getDate();
        mesStart = dateStart.getMonth() + 1;
        anoStart = dateStart.getFullYear();
        if (mesStart < 10) {
            mesStringStart = "0" + mesStart.toString();
        } else {
            mesStringStart = mesStart.toString();
        }

        mesStringEnd = "";
        diaEnd = dateEnd.getDate();
        mesEnd = dateEnd.getMonth() + 1;
        anoEnd = dateEnd.getFullYear();
        if (mesEnd < 10) {
            mesStringEnd = "0" + mesEnd.toString();
        } else {
            mesStringEnd = mesEnd.toString();
        }
        $http.get("http://127.0.0.1:8080/venda/visualizar/clienteData?cpf=" + cpf + "&dateStart=" + anoStart + "-" + mesStringStart + "-" + diaStart + "&dateEnd=" + anoEnd + "-" + mesStringEnd + "-" + diaEnd + "&page=" + ($scope.pageVendasPorPeriodoPorCliente - 1)).then(function (res) {
            $scope.vendasPorPeriodoPorCliente = res.data.content;
            $scope.cpfVendasPorPeriodoPorCliente = cpf;
            $scope.paginationVendasPorPeriodoPorCliente = [];

            $scope.paginationFirstVendasPorPeriodoPorCliente = res.data.first;
            $scope.paginationLastVendasPorPeriodoPorCliente = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendasPorPeriodoPorCliente.push(index);
            }

            $scope.paginationVendasPorPeriodoPorCliente = $scope.paginationVendasPorPeriodoPorCliente.slice($scope.pageVendasPorPeriodoPorCliente == 1 ? $scope.pageVendasPorPeriodoPorCliente - 1 : $scope.pageVendasPorPeriodoPorCliente == 2 ? $scope.pageVendasPorPeriodoPorCliente - 2 : $scope.pageVendasPorPeriodoPorCliente - 3, $scope.pageVendasPorPeriodoPorCliente + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendasPorPeriodoPorCliente = function () {
        $scope.pageVendasPorPeriodoPorCliente -= 1;
        $scope.vendasPorPeriodoPorClienteInicio = false;
        $scope.visualizarVendasPorPeriodoPorCliente($scope.dateStartVendasPorPeriodoPorCliente, $scope.dateEndVendasPorPeriodoPorCliente, $scope.cpfVendasPorPeriodoPorCliente);
    }
    $scope.viewPageNavigationProximaVendasPorPeriodoPorCliente = function () {
        $scope.pageVendasPorPeriodoPorCliente += 1;
        $scope.vendasPorPeriodoPorClienteInicio = false;
        $scope.visualizarVendasPorPeriodoPorCliente($scope.dateStartVendasPorPeriodoPorCliente, $scope.dateEndVendasPorPeriodoPorCliente, $scope.cpfVendasPorPeriodoPorCliente);
    }
    $scope.viewPageNavigationVendasPorPeriodoPorCliente = function (pageVendasPorPeriodoPorCliente) {
        $scope.pageVendasPorPeriodoPorCliente = parseInt(pageVendasPorPeriodoPorCliente.toString());
        $scope.vendasPorPeriodoPorClienteInicio = false;
        $scope.visualizarVendasPorPeriodoPorCliente($scope.dateStartVendasPorPeriodoPorCliente, $scope.dateEndVendasPorPeriodoPorCliente, $scope.cpfVendasPorPeriodoPorCliente);
    }


    $scope.vendasDoDiaPorClienteInicio = false;
    $scope.viewVendasDoDiaPorClienteInicio = function () {
        $scope.vendasDoDiaPorClienteInicio = true;
    }
    $scope.pageVendasDoDiaPorCliente = 1;
    $scope.visualizarVendasDoDiaPorCliente = function (date, cpf) {
        if ($scope.vendasDoDiaPorClienteInicio) {
            $scope.pageVendasDoDiaPorCliente = 1;
        }
        $scope.vendasDoDiaPorClienteInicio = false;
        $scope.dateVendasDoDiaPorCliente = date;
        mesString = "";
        dia = date.getDate();
        mes = date.getMonth() + 1;
        ano = date.getFullYear();
        if (mes < 10) {
            mesString = "0" + mes.toString();
        } else {
            mesString = mes.toString();
        }
        $http.get("http://127.0.0.1:8080/venda/visualizar/clienteData?cpf=" + cpf + "&dateStart=" + ano + "-" + mesString + "-" + dia + "&dateEnd=" + ano + "-" + mesString + "-" + dia + "&page=" + ($scope.pageVendasDoDiaPorCliente - 1)).then(function (res) {
            $scope.vendasDoDiaPorCliente = res.data.content;
            $scope.cpfVendasDoDiaPorCliente = cpf;
            $scope.paginationVendasDoDiaPorCliente = [];

            $scope.paginationFirstVendasDoDiaPorCliente = res.data.first;
            $scope.paginationLastVendasDoDiaPorCliente = res.data.last;

            for (let index = 1; index <= res.data.totalPages; index++) {
                $scope.paginationVendasDoDiaPorCliente.push(index);
            }

            $scope.paginationVendasDoDiaPorCliente = $scope.paginationVendasDoDiaPorCliente.slice($scope.pageVendasDoDiaPorCliente == 1 ? $scope.pageVendasDoDiaPorCliente - 1 : $scope.pageVendasDoDiaPorCliente == 2 ? $scope.pageVendasDoDiaPorCliente - 2 : $scope.pageVendasDoDiaPorCliente - 3, $scope.pageVendasDoDiaPorCliente + 2);
        });
    };
    $scope.viewPageNavigationAnteriorVendasDoDiaPorCliente = function () {
        $scope.pageVendasDoDiaPorCliente -= 1;
        $scope.vendasDoDiaPorClienteInicio = false;
        $scope.visualizarVendasDoDiaPorCliente($scope.dateVendasDoDiaPorCliente, $scope.cpfVendasDoDiaPorCliente);
    }
    $scope.viewPageNavigationProximaVendasDoDiaPorCliente = function () {
        $scope.pageVendasDoDiaPorCliente += 1;
        $scope.vendasDoDiaPorClienteInicio = false;
        $scope.visualizarVendasDoDiaPorCliente($scope.dateVendasDoDiaPorCliente, $scope.cpfVendasDoDiaPorCliente);
    }
    $scope.viewPageNavigationVendasDoDiaPorCliente = function (pageVendasDoDiaPorCliente) {
        $scope.pageVendasDoDiaPorCliente = parseInt(pageVendasDoDiaPorCliente.toString());
        $scope.vendasDoDiaPorClienteInicio = false;
        $scope.visualizarVendasDoDiaPorCliente($scope.dateVendasDoDiaPorCliente, $scope.cpfVendasDoDiaPorCliente);
    }


    $scope.gerarHoje = function () {
        $scope.hoje = new Date();
        return $scope.hoje;
    }

    $scope.viewPagina = "realizarVenda";
    $scope.viewSelecionado = "realizarVenda";
    $scope.selecionarView = function (pagina, selecionado) {
        $scope.viewPagina = pagina;
        $scope.viewSelecionado = selecionado;
        if (pagina == "realizarVenda") {
            $scope.carregarLanches();
            $scope.carregarBebidas();
            $scope.carregarBebidasInd();
            $scope.carregarCombos();
            $scope.carregarChocolates();
            $scope.carregarDoces();
            $scope.carregarSorvetes();
        }
    }

    $scope.selecionarProdutos = false;
    $scope.viewSelecionarProdutos = function () {
        if ($scope.selecionarProdutos) {
            $scope.selecionarProdutos = false;
        } else {
            $scope.selecionarProdutos = true;
        }
    }

    $scope.viewSelecionarTipoDoProduto = function (tipoDoProduto) {
        $scope.selecionarTipoDoProduto = tipoDoProduto;
    }
});