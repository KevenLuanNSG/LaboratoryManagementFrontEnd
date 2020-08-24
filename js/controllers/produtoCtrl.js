angular.module("lanchonete").controller("produtoCtrl", function ($scope, $http) {
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


    //Lista de ingredientes e quantidade utilizada na produção do lanche
    $scope.carregarFazerProduto = function (produtoId) {
        $http.get("http://localhost:8080/fazer/info?produtoId=" + produtoId).then(function (res) {
            $scope.fazerProduto = res.data;
        });
    }


    $scope.atualizarDisponibilidadeProduto = function (produtoId, disponivel, tipo) {
        $http.get("http://localhost:8080/produto/disponibilidade?produtoId=" + produtoId + "&disponivel=" + disponivel).then(function (res) {
            if (tipo == "lanche") {
                $scope.carregarLanches();
            }
            if (tipo == "bebida") {
                $scope.carregarBebidas();
            }
        });
    }
    $scope.atualizarDisponibilidadeProdutoInd = function (produtoIndependenteId, disponivel, tipo) {
        $http.get("http://localhost:8080/produtoIndependente/disponibilidade?produtoIndependenteId=" + produtoIndependenteId + "&disponivel=" + disponivel).then(function (res) {
            if (tipo == "bebida") {
                $scope.carregarBebidasInd();
            }
            if (tipo == "doce") {
                $scope.carregarDoces();
            }
            if (tipo == "chocolate") {
                $scope.carregarChocolates();
            }
            if (tipo == "sorvete") {
                $scope.carregarSorvetes();
            }
            if (tipo == "bebidaZerada") {
                $scope.carregarProdutosIndZerados('Bebida');
            }
            if (tipo == "bebidaLimite") {
                $scope.carregarProdutosIndLimite('Bebida');
            }
            if (tipo == "doceZerado") {
                $scope.carregarProdutosIndZerados('Doce');
            }
            if (tipo == "doceLimite") {
                $scope.carregarProdutosIndLimite('Doce');
            }
            if (tipo == "chocolateZerado") {
                $scope.carregarProdutosIndZerados('Chocolate');
            }
            if (tipo == "chocolateLimite") {
                $scope.carregarProdutosIndLimite('Chocolate');
            }
            if (tipo == "sorveteZerado") {
                $scope.carregarProdutosIndZerados('Sorvete');
            }
            if (tipo == "sorveteLimite") {
                $scope.carregarProdutosIndLimite('Sorvete');
            }
        });
    }
    $scope.atualizarDisponibilidadeCombo = function (comboId, disponivel) {
        $http.get("http://localhost:8080/combo/disponibilidade?comboId=" + comboId + "&disponivel=" + disponivel).then(function (res) {
            $scope.carregarCombos();
        });
    }


    $scope.ingredienteListLanche = [];
    $scope.adicionarIngredienteLanche = function (ingrediente) {
        $scope.existente = false;
        if ($scope.ingredienteListLanche.length > 0) {
            $scope.ingredienteListLanche.map(element => {
                if (element == ingrediente) {
                    $scope.existente = true;
                }
            });
            if (!$scope.existente) {
                $scope.ingredienteListLanche.push(ingrediente);
            }
        } else {
            $scope.ingredienteListLanche.push(ingrediente);
        }
    }
    $scope.removerIngredienteLanche = function (index) {
        $scope.ingredienteListLanche.splice(index, 1);
    }
    $scope.ingredienteListBebida = [];
    $scope.adicionarIngredienteBebida = function (ingrediente) {
        $scope.existente = false;
        if ($scope.ingredienteListBebida.length > 0) {
            $scope.ingredienteListBebida.map(element => {
                if (element == ingrediente) {
                    $scope.existente = true;
                }
            });
            if (!$scope.existente) {
                $scope.ingredienteListBebida.push(ingrediente);
            }
        } else {
            $scope.ingredienteListBebida.push(ingrediente);
        }
    }
    $scope.removerIngredienteBebida = function (index) {
        $scope.ingredienteListBebida.splice(index, 1);
    }
    $scope.carregarIngredientes = function () {
        $http.get("http://localhost:8080/ingrediente/todos").then(function (res) {
            $scope.ingredientes = res.data;
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


    $scope.cadastrarLanche = function (lanche) {
        lanche.tipoProduto = "Lanche";
        lanche.ingredienteList = $scope.ingredienteListLanche;
        $http.post("http://127.0.0.1:8080/produto/cadastrar", lanche).then(function (res) {
            delete $scope.lanche;
            $scope.lancheCadastrado = res.data;
            $scope.showLancheCadastrado = true;
            $scope.lancheFormCadastrar.$setPristine();
            $scope.ingredienteList = [];
        });
    };
    $scope.cadastrarBebida = function (bebida) {
        bebida.tipoProduto = "Bebida";
        bebida.ingredienteList = $scope.ingredienteListBebida;
        $http.post("http://127.0.0.1:8080/produto/cadastrar", bebida).then(function (res) {
            delete $scope.bebida;
            $scope.bebidaCadastrada = res.data;
            $scope.showBebidaCadastrada = true;
            $scope.bebidaFormCadastrar.$setPristine();
            $scope.ingredienteList = [];
        });
    };
    $scope.cadastrarBebidaInd = function (bebidaInd) {
        bebidaInd.tipoProduto = "Bebida";
        $http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", bebidaInd).then(function (res) {
            delete $scope.bebidaInd;
            $scope.bebidaIndCadastrada = res.data;
            $scope.showBebidaIndCadastrada = true;
            $scope.bebidaIndFormCadastrar.$setPristine();
        });
    };
    $scope.cadastrarDoce = function (doce) {
        doce.tipoProduto = "Doce";
        $http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", doce).then(function (res) {
            delete $scope.doce;
            $scope.doceCadastrado = res.data;
            $scope.showDoceCadastrado = true;
            $scope.doceFormCadastrar.$setPristine();
        });
    };
    $scope.cadastrarChocolate = function (chocolate) {
        chocolate.tipoProduto = "Chocolate";
        $http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", chocolate).then(function (res) {
            delete $scope.chocolate;
            $scope.chocolateCadastrado = res.data;
            $scope.showChocolateCadastrado = true;
            $scope.chocolateFormCadastrar.$setPristine();
        });
    };
    $scope.cadastrarSorvete = function (sorvete) {
        sorvete.tipoProduto = "Sorvete";
        $http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", sorvete).then(function (res) {
            delete $scope.sorvete;
            $scope.sorveteCadastrado = res.data;
            $scope.showSorveteCadastrado = true;
            $scope.sorveteFormCadastrar.$setPristine();
        });
    };
    $scope.cadastrarCombo = function (combo) {
        combo.tipoProduto = "Combo";
        combo.produtoList = $scope.produtoList;
        $http.post("http://127.0.0.1:8080/combo/cadastrar", combo).then(function (res) {
            delete $scope.combo;
            $scope.comboCadastrado = res.data;
            $scope.showComboCadastrado = true;
            $scope.comboFormCadastrar.$setPristine();
            $scope.produtoList = [];
        });
    };


    $scope.produtoIndAtualizarQuantidadeMinima = function (produtoIndependenteId, quantidadeMinima) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/quantidadeMinima?produtoIndependenteId=" + produtoIndependenteId + "&quantidadeMinima=" + quantidadeMinima).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.quantidadeMinima;
            $scope.produtoIndQuantidadeMinimaAtualizada = res.data;
            $scope.showProdutoIndQuantidadeMinimaAtualizada = true;
            $scope.produtoIndFormAtualizarQuantidadeMinima.$setPristine();
        });
    };
    $scope.produtoIndAtualizarPreco = function (produtoIndependenteId, preco) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/atualizarPreco?produtoIndependenteId=" + produtoIndependenteId + "&preco=" + preco).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.preco;
            $scope.produtoIndPrecoAtualizado = res.data;
            $scope.showProdutoIndPrecoAtualizado = true;
            $scope.produtoIndFormAtualizarPreco.$setPristine();
        });
    };
    $scope.produtoIndAtualizarNome = function (produtoIndependenteId, nome) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/atualizarNome?produtoIndependenteId=" + produtoIndependenteId + "&nome=" + nome).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.nome;
            $scope.produtoIndNomeAtualizado = res.data;
            $scope.showProdutoIndNomeAtualizado = true;
            $scope.produtoIndFormAtualizarNome.$setPristine();
        });
    };
    $scope.produtoIndAtualizarDescricao = function (produtoIndependenteId, descricao) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/atualizarDescricao?produtoIndependenteId=" + produtoIndependenteId + "&descricao=" + descricao).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.descricao;
            $scope.produtoIndDescricaoAtualizada = res.data;
            $scope.showProdutoIndDescricaoAtualizada = true;
            $scope.produtoIndFormAtualizarDescricao.$setPristine();
        });
    };
    $scope.darBaixaProdutoInd = function (produtoIndependenteId, quantidade) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/darBaixa?produtoIndependenteId=" + produtoIndependenteId + "&quantidade=" + quantidade).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.quantidade;
            $scope.produtoIndPerdido = res.data;
            $scope.showProdutoIndPerdido = true;
            $scope.produtoIndFormDarBaixa.$setPristine();
        });
    };
    $scope.comprarProdutoInd = function (produtoIndependenteId, quantidade) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/comprar?produtoIndependenteId=" + produtoIndependenteId + "&quantidade=" + quantidade).then(function (res) {
            delete $scope.produtoIndependenteId;
            delete $scope.quantidade;
            $scope.produtoIndComprado = res.data;
            $scope.showProdutoIndComprado = true;
            $scope.produtoIndFormComprar.$setPristine();
        });
    };
    $scope.carregarProdutosIndZerados = function (tipoProduto) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/visualizar/zeradoList?tipoProduto=" + tipoProduto).then(function (res) {
            $scope.produtosIndZerados = res.data;
        });
    }
    $scope.carregarProdutosIndLimite = function (tipoProduto) {
        $http.get("http://127.0.0.1:8080/produtoIndependente/visualizar/limiteList?tipoProduto=" + tipoProduto).then(function (res) {
            $scope.produtosIndLimite = res.data;
        });
    }


    $scope.cadastrarFazerProduto = function (fazerProduto) {
        $http.post("http://127.0.0.1:8080/fazer/produto", fazerProduto).then(function (res) {
            delete $scope.fazerProduto;
            $scope.fazerProdutoCadastrado = res.data;
            $scope.showFazerProduto = true;
            $scope.fazerProdutoFormCadastrar.$setPristine();
        });
    };
    $scope.atualizarQuantidadeUtilizada = function (produtoId, ingredienteId, quantidadeFazer) {
        $http.get("http://127.0.0.1:8080/fazer/atualizarQuantFazer?produtoId=" + produtoId + "&ingredienteId=" + ingredienteId + "&quantidadeFazer=" + quantidadeFazer).then(function (res) {
            delete $scope.produtoId;
            delete $scope.ingredienteId;
            delete $scope.quantidadeFazer;
            $scope.quantidadeUtilizadaAtualizada = res.data;
            $scope.showQuantidadeUtilizadaAtualizada = true;
            $scope.atualizarQuantidadeUtilizadaForm.$setPristine();
        });
    };
    $scope.removerFazerProduto = function (removerProdutoId, removerIngredienteId) {
        $http.get("http://127.0.0.1:8080/fazer/remover?produtoId=" + removerProdutoId + "&ingredienteId=" + removerIngredienteId).then(function (res) {
            delete $scope.removerProdutoId;
            delete $scope.removerIngredienteId;
            $scope.fazerProdutoRemovido = res.data;
            if ($scope.fazerProdutoRemovido == "") {
                $scope.fazerProdutoRemovidoSucesso = "Ingrediente removido da produção do produto"
            }
            $scope.showFazerProdutoRemovido = true;
            $scope.removerFazerProdutoForm.$setPristine();
        });
    };


    $scope.atualizarNomeProduto = function (produtoId, nome) {
        $http.get("http://127.0.0.1:8080/produto/atualizarNome?produtoId=" + produtoId + "&nome=" + nome).then(function (res) {
            delete $scope.produtoId;
            delete $scope.nome;
            $scope.produtoNomeAtualizado = res.data;
            $scope.showProdutoNomeAtualizado = true;
            $scope.produtoFormAtualizarNome.$setPristine();
        });
    };
    $scope.atualizarDescricaoProduto = function (produtoId, descricao) {
        $http.get("http://127.0.0.1:8080/produto/atualizarDescricao?produtoId=" + produtoId + "&descricao=" + descricao).then(function (res) {
            delete $scope.produtoId;
            delete $scope.descricao;
            $scope.produtoDescricaoAtualizada = res.data;
            $scope.showProdutoDescricaoAtualizada = true;
            $scope.produtoFormAtualizarDescricao.$setPristine();
        });
    };
    $scope.atualizarPrecoProduto = function (produtoId, preco) {
        $http.get("http://127.0.0.1:8080/produto/atualizarPreco?produtoId=" + produtoId + "&preco=" + preco).then(function (res) {
            delete $scope.produtoId;
            delete $scope.preco;
            $scope.produtoPrecoAtualizado = res.data;
            $scope.showProdutoPrecoAtualizado = true;
            $scope.produtoFormAtualizarPreco.$setPristine();
        });
    };
    $scope.quantidadeProduto = function (produtoId) {
        $http.get("http://127.0.0.1:8080/produto/quantidade?produtoId=" + produtoId).then(function (res) {
            delete $scope.produtoId;
            $scope.produtoQuantidade = res.data;
            $scope.showProdutoQuantidade = true;
            $scope.produtoFormQuantidade.$setPristine();
        });
    };


    $scope.atualizarNomeCombo = function (comboId, nome) {
        $http.get("http://127.0.0.1:8080/combo/atualizarNome?comboId=" + comboId + "&nome=" + nome).then(function (res) {
            delete $scope.comboId;
            delete $scope.nome;
            $scope.comboNomeAtualizado = res.data;
            $scope.showComboNomeAtualizado = true;
            $scope.comboFormAtualizarNome.$setPristine();
        });
    };
    $scope.atualizarDescricaoCombo = function (comboId, descricao) {
        $http.get("http://127.0.0.1:8080/combo/atualizarDescricao?comboId=" + comboId + "&descricao=" + descricao).then(function (res) {
            delete $scope.comboId;
            delete $scope.descricao;
            $scope.comboDescricaoAtualizada = res.data;
            $scope.showComboDescricaoAtualizada = true;
            $scope.comboFormAtualizarDescricao.$setPristine();
        });
    };
    $scope.atualizarPrecoCombo = function (comboId, preco) {
        $http.get("http://127.0.0.1:8080/combo/atualizarPreco?comboId=" + comboId + "&preco=" + preco).then(function (res) {
            delete $scope.comboId;
            delete $scope.preco;
            $scope.comboPrecoAtualizado = res.data;
            $scope.showComboPrecoAtualizado = true;
            $scope.comboFormAtualizarPreco.$setPristine();
        });
    };


    $scope.viewPagina = "lanches";
    $scope.viewSelecionado = "lanches";
    $scope.selecionarView = function (pagina, selecionado) {
        $scope.viewPagina = pagina;
        $scope.viewSelecionado = selecionado;
        if ((pagina == "cadastrarLanche") || (pagina == "cadastrarBebida")) {
            $scope.carregarIngredientes();
        } else if (pagina == "cadastrarCombo") {
            $scope.carregarLanches();
            $scope.carregarBebidas();
        }

    }

    $scope.viewProdutosCombo = function (id) {
        $scope.viewProdutos = id;
    }

    $scope.carregarLanches();
});