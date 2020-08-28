import { IComponentController, IScope, IHttpService} from 'angular';

interface IProdutoCtrl extends IScope {
    produtoFormCadastrar: any;
    produtoIndFormCadastrar: any;
    comboFormCadastrar: any;

    produtoFormAtualizarNome: any;
    produtoFormAtualizarDescricao: any;
    produtoFormAtualizarPreco: any;
    produtoFormQuantidade: any;

    fazerProdutoFormCadastrar: any;
    atualizarQuantidadeUtilizadaForm: any;
    removerFazerProdutoForm: any;

    produtoIndFormAtualizarNome: any;
    produtoIndFormAtualizarDescricao: any;
    produtoIndFormAtualizarPreco: any;
    produtoIndFormAtualizarQuantidadeMinima: any;
    produtoIndFormComprar: any;
    produtoIndFormDarBaixa: any;

    comboFormAtualizarNome: any;
    comboFormAtualizarDescricao: any;
    comboFormAtualizarPreco: any;

    produto: any;
    produtoInd: any;
    combo: any;

    atualizarNomeProduto: any;
    atualizarDescricaoProduto: any;
    atualizarPrecoProduto: any;
    quantidadeProduto: any;

    fazerProduto: any;
    atualizarQuantidadeUtilizada: any;
    removerFazerProduto: any;

    produtoIndAtualizarNome: any;
    produtoIndAtualizarDescricao: any;
    produtoIndAtualizarPreco: any;
    produtoIndAtualizarQuantidadeMinima: any;
    comprarProdutoInd: any;
    darBaixaProdutoInd: any;

    atualizarNomeCombo: any;
    atualizarDescricaoCombo: any;
    atualizarPrecoCombo: any;
}

class ProdutoCtrl implements IComponentController {
    private static $Inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IProdutoCtrl;

    private lanches: any;
    private bebidas: any;
    private combos: any;
    private bebidasInd: any;
    private chocolates: any;
    private doces: any;
    private sorvetes: any;
    private produtosIndLimite: any;
    private produtosIndZerados: any;
    private ingredientes: any;

    private ingredienteList: any;
    private produtoList: any;

    private produtoCadastrado: any;
    private showProdutoCadastrado: boolean;
    private produtoIndCadastrado: any;
    private showProdutoIndCadastrado: boolean;
    private comboCadastrado: any;
    private showComboCadastrado: boolean;


    private produtoNomeAtualizado: any;
    private showProdutoNomeAtualizado: boolean;
    private produtoPrecoAtualizado: any;
    private showProdutoPrecoAtualizado: boolean;
    private produtoDescricaoAtualizada: any;
    private showProdutoDescricaoAtualizada: boolean;
    private produtoQuantidade: any;
    private showProdutoQuantidade: boolean;

    private fazerProduto: any;
    private fazerProdutoCadastrado: any;
    private showFazerProduto: boolean;
    private quantidadeUtilizadaAtualizada: any;
    private showQuantidadeUtilizadaAtualizada: boolean;
    private fazerProdutoRemovido: any;
    private showFazerProdutoRemovido: boolean;

    private produtoIndNomeAtualizado: any;
    private showProdutoIndNomeAtualizado: boolean;
    private produtoIndPrecoAtualizado: any;
    private showProdutoIndPrecoAtualizado: boolean;
    private produtoIndDescricaoAtualizada: any;
    private showProdutoIndDescricaoAtualizada: boolean;
    private produtoIndQuantidadeMinimaAtualizada: any;
    private showProdutoIndQuantidadeMinimaAtualizada: boolean;
    private produtoIndComprado: any;
    private showProdutoIndComprado: boolean;
    private produtoIndPerdido: any;
    private showProdutoIndPerdido: boolean;

    private comboNomeAtualizado: any;
    private showComboNomeAtualizado: boolean;
    private comboPrecoAtualizado: any;
    private showComboPrecoAtualizado: boolean;
    private comboDescricaoAtualizada: any;
    private showComboDescricaoAtualizada: boolean;

    private viewPagina: string;
    private viewSelecionado: string;
    private viewProdutos: number;

    constructor($scope: IProdutoCtrl, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.ingredienteList = [];
        this.produtoList = [];

        this.showProdutoCadastrado = false;
        this.showProdutoIndCadastrado = false;
        this.showComboCadastrado = false;


        this.showProdutoNomeAtualizado = false;
        this.showProdutoPrecoAtualizado = false;
        this.showProdutoDescricaoAtualizada = false;
        this.showProdutoQuantidade = false;

        this.showFazerProduto = false;
        this.showQuantidadeUtilizadaAtualizada = false;
        this.showFazerProdutoRemovido = false;

        this.showProdutoIndNomeAtualizado = false;
        this.showProdutoIndPrecoAtualizado = false;
        this.showProdutoIndDescricaoAtualizada = false;
        this.showProdutoIndQuantidadeMinimaAtualizada = false;
        this.showProdutoIndComprado = false;
        this.showProdutoIndPerdido = false;

        this.showComboNomeAtualizado = false;
        this.showComboPrecoAtualizado = false;
        this.showComboDescricaoAtualizada = false;

        this.viewPagina = "lanches";
        this.viewSelecionado = "produtos";
        this.viewProdutos = 0;
    }

    private carregarProdutos(tipoProduto: string) {
        this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=" + tipoProduto).then((res) => {
            if (tipoProduto == "Lanche") {
                this.lanches = res.data;
            } else if (tipoProduto == "Bebida") {
                this.bebidas = res.data;
            }
        });
    }
    private carregarProdutosInd(tipoProduto: string) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=" + tipoProduto).then((res) => {
            if (tipoProduto == "Bebida") {
                this.bebidasInd = res.data;
            } else if (tipoProduto == "Chocolate") {
                this.chocolates = res.data;
            } else if (tipoProduto == "Doce") {
                this.doces = res.data;
            } else if (tipoProduto == "Sorvete") {
                this.sorvetes = res.data;
            }
        });
    }
    private carregarCombos() {
        this.http.get("http://127.0.0.1:8080/combo/combos").then((res) => {
            this.combos = res.data;
        });
    }

    private carregarFazerProduto(produtoId: number) {
        this.http.get("http://127.0.0.1:8080/fazer/info?produtoId=" + produtoId).then((res) => {
            this.fazerProduto = res.data;
        });
    }

    private carregarProdutosIndLimite(tipoProduto: string) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/visualizar/limiteList?tipoProduto=" + tipoProduto).then((res) => {
            this.produtosIndLimite = res.data;
        });
    }
    private carregarProdutosIndZerados(tipoProduto: string) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/visualizar/zeradoList?tipoProduto=" + tipoProduto).then((res) => {
            this.produtosIndZerados = res.data;
        });
    }

    private atualizarDisponibilidadeProduto(produtoId: number, disponivel: boolean, tipo: string) {
        this.http.get("http://127.0.0.1:8080/produto/disponibilidade?produtoId=" + produtoId + "&disponivel=" + disponivel).then((res) => {
            this.carregarProdutos(tipo);
        });
    }

    private atualizarDisponibilidadeProdutoInd(produtoIndependenteId: number, disponivel: boolean, tipo: string, quantidade: string) {
        this.http.get("http://localhost:8080/produtoIndependente/disponibilidade?produtoIndependenteId=" + produtoIndependenteId + "&disponivel=" + disponivel).then((res) => {
            if (quantidade == "todos") {
                this.carregarProdutosInd(tipo);
            }
            if (quantidade == "limite") {
                this.carregarProdutosIndLimite(tipo);
            }
            if (quantidade == "zerado") {
                this.carregarProdutosIndZerados(tipo);
            }
        });
    }

    private atualizarDisponibilidadeCombo(comboId: number, disponivel: boolean) {
        this.http.get("http://localhost:8080/combo/disponibilidade?comboId=" + comboId + "&disponivel=" + disponivel).then((res) => {
            this.carregarCombos();
        });
    }

    private adicionarIngrediente(ingrediente: any) {
        let existente: boolean = false;
        if (this.ingredienteList.length > 0) {
            for (let index: number = 0; index < this.ingredienteList.length; index++) {
                if (ingrediente == this.ingredienteList[index]) {
                    existente = true;
                }
            }
            if (!existente) {
                this.ingredienteList.push(ingrediente);
            }
        } else {
            this.ingredienteList.push(ingrediente);
        }
    }
    private removerIngrediente(index: any) {
        this.ingredienteList.splice(index, 1);
    }

    private carregarIngredientes() {
        this.http.get("http://127.0.0.1:8080/ingrediente/todos").then((res) => {
            this.ingredientes = res.data;
        })
    }

    private adicionarProduto(produto: any) {
        this.produtoList.push(produto);
    }
    private removerProduto(index: any) {
        this.produtoList.splice(index, 1);
    }

    private cadastrarProduto(produto: any) {
        produto.ingredienteList = this.ingredienteList;
        this.http.post("http://127.0.0.1:8080/produto/cadastrar", produto).then((res) => {
            this.produtoCadastrado = res.data;
            this.showProdutoCadastrado = true;

            this.scope.produto = undefined;
            this.scope.produtoFormCadastrar.$setPristine();
            this.ingredienteList = [];
        });
    }

    private cadastrarProdutoInd(produtoInd: any) {
        this.http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", produtoInd).then((res) => {
            this.produtoIndCadastrado = res.data;
            this.showProdutoIndCadastrado = true;

            this.scope.produtoInd = undefined;
            this.scope.produtoIndFormCadastrar.$setPristine();
        });
    }

    private cadastrarCombo(combo: any) {
        combo.tipoProduto = "Combo";
        combo.produtoList = this.produtoList;
        this.http.post("http://127.0.0.1:8080/combo/cadastrar", combo).then((res) => {
            this.comboCadastrado = res.data;
            this.showComboCadastrado = true;

            this.scope.combo = undefined;
            this.scope.comboFormCadastrar.$setPristine();
            this.produtoList = [];
        });
    };

    private produtoIndAtualizarQuantidadeMinima(produtoIndAtualizarQuantidadeMinima: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/quantidadeMinima?produtoIndependenteId=" + produtoIndAtualizarQuantidadeMinima.id + "&quantidadeMinima=" + produtoIndAtualizarQuantidadeMinima.quantidadeMinima).then((res) => {
            this.scope.produtoIndAtualizarQuantidadeMinima = undefined;
            this.produtoIndQuantidadeMinimaAtualizada = res.data;
            this.showProdutoIndQuantidadeMinimaAtualizada = true;
            this.scope.produtoIndFormAtualizarQuantidadeMinima.$setPristine();
        });
    };
    private produtoIndAtualizarPreco(produtoIndAtualizarPreco: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarPreco?produtoIndependenteId=" + produtoIndAtualizarPreco.id + "&preco=" + produtoIndAtualizarPreco.preco).then((res) => {
            this.produtoIndPrecoAtualizado = res.data;
            this.showProdutoIndPrecoAtualizado = true;

            this.scope.produtoIndAtualizarPreco = undefined;
            this.scope.produtoIndFormAtualizarPreco.$setPristine();
        });
    };
    private produtoIndAtualizarNome(produtoIndAtualizarNome: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarNome?produtoIndependenteId=" + produtoIndAtualizarNome.id + "&nome=" + produtoIndAtualizarNome.nome).then((res) => {
            this.produtoIndNomeAtualizado = res.data;
            this.showProdutoIndNomeAtualizado = true;

            this.scope.produtoIndAtualizarNome = undefined;
            this.scope.produtoIndFormAtualizarNome.$setPristine();
        });
    };
    private produtoIndAtualizarDescricao(produtoIndAtualizarDescricao: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarDescricao?produtoIndependenteId=" + produtoIndAtualizarDescricao.id + "&descricao=" + produtoIndAtualizarDescricao.descricao).then((res) => {
            this.produtoIndDescricaoAtualizada = res.data;
            this.showProdutoIndDescricaoAtualizada = true;

            this.scope.produtoIndAtualizarDescricao = undefined;
            this.scope.produtoIndFormAtualizarDescricao.$setPristine();
        });
    };
    private darBaixaProdutoInd(darBaixaProdutoInd: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/darBaixa?produtoIndependenteId=" + darBaixaProdutoInd.id + "&quantidade=" + darBaixaProdutoInd.quantidade).then((res) => {
            this.produtoIndPerdido = res.data;
            this.showProdutoIndPerdido = true;

            this.scope.darBaixaProdutoInd = undefined;
            this.scope.produtoIndFormDarBaixa.$setPristine();
        });
    };
    private comprarProdutoInd(comprarProdutoInd: any) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/comprar?produtoIndependenteId=" + comprarProdutoInd.id + "&quantidade=" + comprarProdutoInd.quantidade).then((res) => {
            this.produtoIndComprado = res.data;
            this.showProdutoIndComprado = true;

            this.scope.comprarProdutoInd = undefined;
            this.scope.produtoIndFormComprar.$setPristine();
        });
    };

    private cadastrarFazerProduto(fazerProduto: any) {
        this.http.post("http://127.0.0.1:8080/fazer/produto", fazerProduto).then((res) => {
            this.fazerProdutoCadastrado = res.data;
            this.showFazerProduto = true;

            this.scope.fazerProduto = undefined;
            this.scope.fazerProdutoFormCadastrar.$setPristine();
        });
    };

    private atualizarQuantidadeUtilizada(atualizarQuantidadeUtilizada:any) {
        this.http.get("http://127.0.0.1:8080/fazer/atualizarQuantFazer?produtoId=" + atualizarQuantidadeUtilizada.produtoId + "&ingredienteId=" + atualizarQuantidadeUtilizada.ingredienteId + "&quantidadeFazer=" + atualizarQuantidadeUtilizada.quantidadeFazer).then((res) => {
            this.quantidadeUtilizadaAtualizada = res.data;
            this.showQuantidadeUtilizadaAtualizada = true;

            this.scope.atualizarQuantidadeUtilizada = undefined;
            this.scope.atualizarQuantidadeUtilizadaForm.$setPristine();
        });
    };
    private removerFazerProduto(removerFazerProduto:any) {
        this.http.get("http://127.0.0.1:8080/fazer/remover?produtoId=" + removerFazerProduto.produtoId + "&ingredienteId=" + removerFazerProduto.ingredienteId).then((res) => {
            this.fazerProdutoRemovido = res.data;
            this.showFazerProdutoRemovido = true;

            this.scope.removerFazerProduto = undefined;
            this.scope.removerFazerProdutoForm.$setPristine();
        });
    };

    private atualizarNomeProduto(atualizarNomeProduto:any) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarNome?produtoId=" + atualizarNomeProduto.id + "&nome=" + atualizarNomeProduto.nome).then((res) => {
            this.produtoNomeAtualizado = res.data;
            this.showProdutoNomeAtualizado = true;
            
            this.scope.atualizarNomeProduto = undefined;
            this.scope.produtoFormAtualizarNome.$setPristine();
        });
    };
    private atualizarDescricaoProduto(atualizarDescricaoProduto:any) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarDescricao?produtoId=" + atualizarDescricaoProduto.id + "&descricao=" + atualizarDescricaoProduto.descricao).then((res) => {
            this.produtoDescricaoAtualizada = res.data;
            this.showProdutoDescricaoAtualizada = true;

            this.scope.atualizarDescricaoProduto = undefined;
            this.scope.produtoFormAtualizarDescricao.$setPristine();
        });
    };
    private atualizarPrecoProduto(atualizarPrecoProduto:any) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarPreco?produtoId=" + atualizarPrecoProduto.id + "&preco=" + atualizarPrecoProduto.preco).then((res) => {
            this.produtoPrecoAtualizado = res.data;
            this.showProdutoPrecoAtualizado = true;

            this.scope.atualizarPrecoProduto = undefined;
            this.scope.produtoFormAtualizarPreco.$setPristine();
        });
    };
    private quantidadeProduto(quantidadeProduto:any) {
        this.http.get("http://127.0.0.1:8080/produto/quantidade?produtoId=" + quantidadeProduto.id).then((res) => {
            this.produtoQuantidade = res.data;
            this.showProdutoQuantidade = true;

            this.scope.quantidadeProduto = undefined;
            this.scope.produtoFormQuantidade.$setPristine();
        });
    };

    private atualizarNomeCombo(atualizarNomeCombo:any) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarNome?comboId=" + atualizarNomeCombo.id + "&nome=" + atualizarNomeCombo.nome).then((res) => {
            this.comboNomeAtualizado = res.data;
            this.showComboNomeAtualizado = true;

            this.scope.atualizarNomeCombo = undefined;
            this.scope.comboFormAtualizarNome.$setPristine();
        });
    };
    private atualizarDescricaoCombo(atualizarDescricaoCombo:any) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarDescricao?comboId=" + atualizarDescricaoCombo.id + "&descricao=" + atualizarDescricaoCombo.descricao).then((res) => {
            this.comboDescricaoAtualizada = res.data;
            this.showComboDescricaoAtualizada = true;

            this.scope.atualizarDescricaoCombo = undefined;
            this.scope.comboFormAtualizarDescricao.$setPristine();
        });
    };
    private atualizarPrecoCombo(atualizarPrecoCombo:any) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarPreco?comboId=" + atualizarPrecoCombo.id + "&preco=" + atualizarPrecoCombo.preco).then((res) => {
            this.comboPrecoAtualizado = res.data;
            this.showComboPrecoAtualizado = true;

            this.scope.atualizarPrecoCombo = undefined;
            this.scope.comboFormAtualizarPreco.$setPristine();
        });
    };
    private viewProdutosCombo(id: number) {
        this.viewProdutos = id;
    }

    private selecionarView(pagina: string, selecionado: string) {
        this.viewPagina = pagina;
        this.viewSelecionado = selecionado;
        if (pagina == "cadastrarProduto") {
            this.carregarIngredientes();
        } else if (pagina == "cadastrarCombo") {
            this.carregarProdutos('Lanche');
            this.carregarProdutos('Bebida');
        }

    }

    $onInit() {
        this.carregarProdutos("Lanche");
    }
}
export default ProdutoCtrl;