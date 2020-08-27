import { IComponentController, IScope, IHttpService, element, forEach } from 'angular';

class ProdutoCtrl implements IComponentController {
    private static $Inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IScope;

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

    private fazerProduto: any;

    private ingredienteListLanche: any;
    private ingredienteListBebida: any;

    private produtoList: any;

    private lancheCadastrado: any;
    private showLancheCadastrado: boolean;

    private bebidaCadastrada: any;
    private showBebidaCadastrada: boolean;

    private comboCadastrado: any;
    private showComboCadastrado: boolean;

    private bebidaIndCadastrada: any;
    private showBebidaIndCadastrada: boolean;

    private chocolateCadastrado: any;
    private showChocolateCadastrado: boolean;

    private doceCadastrado: any;
    private showDoceCadastrado: boolean;

    private sorveteCadastrado: any;
    private showSorveteCadastrado: boolean;

    private produtoIndQuantidadeMinimaAtualizada: any;
    private showProdutoIndQuantidadeMinimaAtualizada: boolean;

    private produtoIndPrecoAtualizado: any;
    private showProdutoIndPrecoAtualizado: boolean;

    private produtoIndNomeAtualizado: any;
    private showProdutoIndNomeAtualizado: boolean;

    private produtoIndDescricaoAtualizada: any;
    private showProdutoIndDescricaoAtualizada: boolean;
    
    private produtoIndPerdido: any;
    private showProdutoIndPerdido: boolean;

    private produtoIndComprado: any;
    private showProdutoIndComprado: boolean;

    private fazerProdutoCadastrado: any;
    private showFazerProduto: boolean;

    private quantidadeUtilizadaAtualizada: any;
    private showQuantidadeUtilizadaAtualizada: boolean;

    private fazerProdutoRemovido: any;
    private showFazerProdutoRemovido: boolean;

    private produtoNomeAtualizado: any;
    private showProdutoNomeAtualizado: boolean;

    private produtoDescricaoAtualizada: any;
    private showProdutoDescricaoAtualizada: boolean;

    private produtoPrecoAtualizado: any;
    private showProdutoPrecoAtualizado: boolean;

    private produtoQuantidade: any;
    private showProdutoQuantidade: boolean;

    private comboNomeAtualizado: any;
    private showComboNomeAtualizado: boolean;

    private comboDescricaoAtualizada: any;
    private showComboDescricaoAtualizada: boolean;

    private comboPrecoAtualizado: any;
    private showComboPrecoAtualizado: boolean;

    private viewPagina:string;
    private viewSelecionado:string;
    private viewProdutos:number;

    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.ingredienteListBebida = [];
        this.ingredienteListLanche = [];
        this.produtoList = [];

        
        this.showLancheCadastrado = false;
        this.showBebidaCadastrada = false;
        this.showComboCadastrado = false;
        this.showBebidaIndCadastrada = false;
        this.showChocolateCadastrado = false;
        this.showDoceCadastrado = false;
        this.showSorveteCadastrado = false;
        this.showProdutoIndQuantidadeMinimaAtualizada = false;
        this.showProdutoIndPrecoAtualizado = false;
        this.showProdutoIndNomeAtualizado = false;
        this.showProdutoIndDescricaoAtualizada = false;
        this.showProdutoIndPerdido = false;
        this.showProdutoIndComprado = false;
        this.showFazerProduto = false;
        this.showQuantidadeUtilizadaAtualizada = false;
        this.showFazerProdutoRemovido = false;
        this.showProdutoNomeAtualizado = false;
        this.showProdutoDescricaoAtualizada = false;
        this.showProdutoPrecoAtualizado = false;
        this.showProdutoQuantidade = false;
        this.showComboNomeAtualizado = false;
        this.showComboDescricaoAtualizada = false;
        this.showComboPrecoAtualizado = false;

        this.viewPagina = "lanches";
        this.viewSelecionado = "lanches";
        this.viewProdutos = 0;
    }

    // private carregarProdutos(tipoProduto: string) {
    //     this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=" + tipoProduto).then((res) => {
    //         if (tipoProduto == "Lanche") {
    //             this.lanches = res.data;
    //         } else if (tipoProduto == "Bebida") {
    //             this.bebidas = res.data;
    //         }
    //     });
    // }
    // private carregarProdutosInd(tipoProduto: string) {
    //     this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=" + tipoProduto).then((res) => {
    //         if (tipoProduto == "Bebida") {
    //             this.bebidasInd = res.data;
    //         } else if (tipoProduto == "Chocolate") {
    //             this.chocolates = res.data;
    //         } else if (tipoProduto == "Doce") {
    //             this.doces = res.data;
    //         } else if (tipoProduto == "Sorvete") {
    //             this.sorvetes = res.data;
    //         }
    //     });
    // }

    private carregarLanches() {
        this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Lanche").then((res) => {
            this.lanches = res.data;
        });
    }

    private carregarBebidas() {
        this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Bebida").then((res) => {
            this.bebidas = res.data;
        });
    }

    private carregarCombos() {
        this.http.get("http://127.0.0.1:8080/combo/combos").then((res) => {
            this.combos = res.data;
        });
    }

    private carregarBebidasInd() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Bebida").then((res) => {
            this.bebidasInd = res.data;
        });
    }

    private carregarChocolates() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Chocolate").then((res) => {
            this.chocolates = res.data;
        });
    }

    private carregarDoces() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Doce").then((res) => {
            this.doces = res.data;
        });
    }

    private carregarSorvetes() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Sorvete").then((res) => {
            this.sorvetes = res.data;
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
            if (tipo == "lanche") {
                this.carregarLanches();
                //this.carregarProdutos('Lanche');
            } else if (tipo == "bebida") {
                this.carregarBebidas();
                //this.carregarProdutos('Bebida');
            }
        });
    }

    private atualizarDisponibilidadeProdutoInd(produtoIndependenteId: number, disponivel: boolean, tipo: string) {
        this.http.get("http://localhost:8080/produtoIndependente/disponibilidade?produtoIndependenteId=" + produtoIndependenteId + "&disponivel=" + disponivel).then((res) => {
            if (tipo == "bebida") {
                this.carregarBebidasInd();
                //this.carregarProdutosInd('Bebida');
            } else if (tipo == "chocolate") {
                this.carregarChocolates();
                //this.carregarProdutosInd('Chocolate');
            } else if (tipo == "doce") {
                this.carregarDoces();
                //this.carregarProdutosInd('Doce');
            } else if (tipo == "sorvete") {
                this.carregarSorvetes();
                //this.carregarProdutosInd('Sorvete');
            } else if (tipo == "bebidaZerada") {
                this.carregarProdutosIndZerados('Bebida');
            } else if (tipo == "bebidaLimite") {
                this.carregarProdutosIndLimite('Bebida');
            } else if (tipo == "chocolateZerado") {
                this.carregarProdutosIndZerados('Chocolate');
            } else if (tipo == "chocolateLimite") {
                this.carregarProdutosIndLimite('Chocolate');
            } else if (tipo == "doceZerado") {
                this.carregarProdutosIndZerados('Doce');
            } else if (tipo == "doceLimite") {
                this.carregarProdutosIndLimite('Doce');
            } else if (tipo == "sorveteZerado") {
                this.carregarProdutosIndZerados('Sorvete');
            } else if (tipo == "sorveteLimite") {
                this.carregarProdutosIndLimite('Sorvete');
            }
        });
    }

    private atualizarDisponibilidadeCombo(comboId: number, disponivel: boolean) {
        this.http.get("http://localhost:8080/combo/disponibilidade?comboId=" + comboId + "&disponivel=" + disponivel).then((res) => {
            this.carregarCombos();
        });
    }


    private adicionarIngredienteLanche(ingrediente: any) {
        let existente: boolean = false;
        if (this.ingredienteListLanche.length > 0) {
            for (let index: number = 0; index < this.ingredienteListLanche.length; index++) {
                if (ingrediente == this.ingredienteListLanche[index]) {
                    existente = true;
                }
            }
            if (!existente) {
                this.ingredienteListLanche.push(ingrediente);
            }
        } else {
            this.ingredienteListLanche.push(ingrediente);
        }
    }
    private removerIngredienteLanche(index: any) {
        this.ingredienteListLanche.splice(index, 1);
    }

    private adicionarIngredienteBebida(ingrediente: any) {
        let existente: boolean = false;
        if (this.ingredienteListBebida.length > 0) {
            for (let index: number = 0; index < this.ingredienteListBebida.length; index++) {
                if (ingrediente == this.ingredienteListBebida.length[index]) {
                    existente = true;
                }
            }
            if (!existente) {
                this.ingredienteListBebida.push(ingrediente);
            }
        } else {
            this.ingredienteListBebida.push(ingrediente);
        }
    }
    private removerIngredienteBebida(index: any) {
        this.ingredienteListBebida.splice(index, 1);
    }

    private carregarIngredientes() {
        this.http.get("http://127.0.0.1:8080/ingrediente/todos").then((res) => {
            this.ingredientes = res.data;
        })
    }

    // private adicionarProduto(produto:any){
    //     this.produtoList.push(produto);
    // }
    private adicionarLanche(lanche: any) {
        this.produtoList.push(lanche);
    }
    private adicionarBebida(bebida: any) {
        this.produtoList.push(bebida);
    }
    private removerProduto(index: any) {
        this.produtoList.splice(index, 1);
    }

    // private cadastrarProduto(produto:any, tipo:string){
    //     produto.tipoProduto = tipo;
    //     if(tipo == "Lanche"){
    //         produto.ingredienteList = this.ingredienteListLanche;
    //     } else if (tipo == "Bebida"){
    //         produto.ingredienteList = this.ingredienteListBebida;
    //     }
    //     this.http.post("http://127.0.0.1:8080/produto/cadastrar", produto).then((res) => {
    //         //delete $scope.produto;
    //         this.produtoCadastrado = res.data;
    //         this.showProdutoCadastrado = true;
    //         //$scope.produtoFormCadastrar.$setPristine();
    //         this.ingredienteListLanche = [];
    //         this.ingredienteListBebida = [];
    //     });
    // }

    private cadastrarLanche(lanche: any) {
        lanche.tipoProduto = "Lanche";
        lanche.ingredienteList = this.ingredienteListLanche;
        this.http.post("http://127.0.0.1:8080/produto/cadastrar", lanche).then((res) => {
            //delete $scope.lanche;
            this.lancheCadastrado = res.data;
            this.showLancheCadastrado = true;
            //$scope.lancheFormCadastrar.$setPristine();
            this.ingredienteListLanche = [];
        });
    };
    private cadastrarBebida(bebida: any) {
        bebida.tipoProduto = "Bebida";
        bebida.ingredienteList = this.ingredienteListBebida;
        this.http.post("http://127.0.0.1:8080/produto/cadastrar", bebida).then((res) => {
            //delete $scope.bebida;
            this.bebidaCadastrada = res.data;
            this.showBebidaCadastrada = true;
            //$scope.bebidaFormCadastrar.$setPristine();
            this.ingredienteListBebida = [];
        });
    };


    private cadastrarBebidaInd(bebidaInd: any) {
        bebidaInd.tipoProduto = "Bebida";
        this.http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", bebidaInd).then((res) => {
            //delete $scope.bebidaInd;
            this.bebidaIndCadastrada = res.data;
            this.showBebidaIndCadastrada = true;
            //this.bebidaIndFormCadastrar.$setPristine();
        });
    };
    private cadastrarDoce(doce: any) {
        doce.tipoProduto = "Doce";
        this.http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", doce).then((res) => {
            //delete $scope.doce;
            this.doceCadastrado = res.data;
            this.showDoceCadastrado = true;
            //this.doceFormCadastrar.$setPristine();
        });
    };
    private cadastrarChocolate(chocolate: any) {
        chocolate.tipoProduto = "Chocolate";
        this.http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", chocolate).then((res) => {
            //delete $scope.chocolate;
            this.chocolateCadastrado = res.data;
            this.showChocolateCadastrado = true;
            //this.chocolateFormCadastrar.$setPristine();
        });
    };
    private cadastrarSorvete(sorvete: any) {
        sorvete.tipoProduto = "Sorvete";
        this.http.post("http://127.0.0.1:8080/produtoIndependente/cadastrar", sorvete).then((res) => {
            //delete $scope.sorvete;
            this.sorveteCadastrado = res.data;
            this.showSorveteCadastrado = true;
            //this.sorveteFormCadastrar.$setPristine();
        });
    };
    private cadastrarCombo(combo: any) {
        combo.tipoProduto = "Combo";
        combo.produtoList = this.produtoList;
        this.http.post("http://127.0.0.1:8080/combo/cadastrar", combo).then((res) => {
            // delete this.combo;
            this.comboCadastrado = res.data;
            this.showComboCadastrado = true;
            //this.comboFormCadastrar.$setPristine();
            this.produtoList = [];
        });
    };

    private produtoIndAtualizarQuantidadeMinima(produtoIndependenteId: number, quantidadeMinima: number) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/quantidadeMinima?produtoIndependenteId=" + produtoIndependenteId + "&quantidadeMinima=" + quantidadeMinima).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.quantidadeMinima;
            this.produtoIndQuantidadeMinimaAtualizada = res.data;
            this.showProdutoIndQuantidadeMinimaAtualizada = true;
            //$scope.produtoIndFormAtualizarQuantidadeMinima.$setPristine();
        });
    };
    private produtoIndAtualizarPreco(produtoIndependenteId: number, preco: number) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarPreco?produtoIndependenteId=" + produtoIndependenteId + "&preco=" + preco).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.preco;
            this.produtoIndPrecoAtualizado = res.data;
            this.showProdutoIndPrecoAtualizado = true;
            //$scope.produtoIndFormAtualizarPreco.$setPristine();
        });
    };
    private produtoIndAtualizarNome(produtoIndependenteId: number, nome: string) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarNome?produtoIndependenteId=" + produtoIndependenteId + "&nome=" + nome).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.nome;
            this.produtoIndNomeAtualizado = res.data;
            this.showProdutoIndNomeAtualizado = true;
            //$scope.produtoIndFormAtualizarNome.$setPristine();
        });
    };
    private produtoIndAtualizarDescricao(produtoIndependenteId: number, descricao: string) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/atualizarDescricao?produtoIndependenteId=" + produtoIndependenteId + "&descricao=" + descricao).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.descricao;
            this.produtoIndDescricaoAtualizada = res.data;
            this.showProdutoIndDescricaoAtualizada = true;
            //$scope.produtoIndFormAtualizarDescricao.$setPristine();
        });
    };
    private darBaixaProdutoInd(produtoIndependenteId: number, quantidade: number) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/darBaixa?produtoIndependenteId=" + produtoIndependenteId + "&quantidade=" + quantidade).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.quantidade;
            this.produtoIndPerdido = res.data;
            this.showProdutoIndPerdido = true;
            //$scope.produtoIndFormDarBaixa.$setPristine();
        });
    };
    private comprarProdutoInd(produtoIndependenteId: number, quantidade: number) {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/comprar?produtoIndependenteId=" + produtoIndependenteId + "&quantidade=" + quantidade).then((res) => {
            //delete $scope.produtoIndependenteId;
            //delete $scope.quantidade;
            this.produtoIndComprado = res.data;
            this.showProdutoIndComprado = true;
            //$scope.produtoIndFormComprar.$setPristine();
        });
    };

    private cadastrarFazerProduto(fazerProduto: any) {
        this.http.post("http://127.0.0.1:8080/fazer/produto", fazerProduto).then((res) => {
            //delete $scope.fazerProduto;
            this.fazerProdutoCadastrado = res.data;
            this.showFazerProduto = true;
            //$scope.fazerProdutoFormCadastrar.$setPristine();
        });
    };
    private atualizarQuantidadeUtilizada(produtoId: number, ingredienteId: number, quantidadeFazer: number) {
        this.http.get("http://127.0.0.1:8080/fazer/atualizarQuantFazer?produtoId=" + produtoId + "&ingredienteId=" + ingredienteId + "&quantidadeFazer=" + quantidadeFazer).then((res) => {
            //delete $scope.produtoId;
            //delete $scope.ingredienteId;
            //delete $scope.quantidadeFazer;
            this.quantidadeUtilizadaAtualizada = res.data;
            this.showQuantidadeUtilizadaAtualizada = true;
            //$scope.atualizarQuantidadeUtilizadaForm.$setPristine();
        });
    };
    private removerFazerProduto(removerProdutoId: number, removerIngredienteId: number) {
        this.http.get("http://127.0.0.1:8080/fazer/remover?produtoId=" + removerProdutoId + "&ingredienteId=" + removerIngredienteId).then((res) => {
            //delete $scope.removerProdutoId;
            //delete $scope.removerIngredienteId;
            this.fazerProdutoRemovido = res.data;
            // if (this.fazerProdutoRemovido == "") {
            //     this.fazerProdutoRemovidoSucesso = "Ingrediente removido da produção do produto"
            // }
            this.showFazerProdutoRemovido = true;
            //$scope.removerFazerProdutoForm.$setPristine();
        });
    };


    private atualizarNomeProduto(produtoId: number, nome: string) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarNome?produtoId=" + produtoId + "&nome=" + nome).then((res) => {
            //delete $scope.produtoId;
            //delete $scope.nome;
            this.produtoNomeAtualizado = res.data;
            this.showProdutoNomeAtualizado = true;
            //$scope.produtoFormAtualizarNome.$setPristine();
        });
    };
    private atualizarDescricaoProduto(produtoId: number, descricao: string) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarDescricao?produtoId=" + produtoId + "&descricao=" + descricao).then((res) => {
            //delete $scope.produtoId;
            //delete $scope.descricao;
            this.produtoDescricaoAtualizada = res.data;
            this.showProdutoDescricaoAtualizada = true;
            //$scope.produtoFormAtualizarDescricao.$setPristine();
        });
    };
    private atualizarPrecoProduto(produtoId: number, preco: number) {
        this.http.get("http://127.0.0.1:8080/produto/atualizarPreco?produtoId=" + produtoId + "&preco=" + preco).then((res) => {
            //delete $scope.produtoId;
            //delete $scope.preco;
            this.produtoPrecoAtualizado = res.data;
            this.showProdutoPrecoAtualizado = true;
            //$scope.produtoFormAtualizarPreco.$setPristine();
        });
    };
    private quantidadeProduto(produtoId: number) {
        this.http.get("http://127.0.0.1:8080/produto/quantidade?produtoId=" + produtoId).then((res) => {
            //delete $scope.produtoId;
            this.produtoQuantidade = res.data;
            this.showProdutoQuantidade = true;
            //$scope.produtoFormQuantidade.$setPristine();
        });
    };


    private atualizarNomeCombo(comboId: number, nome: string) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarNome?comboId=" + comboId + "&nome=" + nome).then((res) => {
            //delete $scope.comboId;
            //delete $scope.nome;
            this.comboNomeAtualizado = res.data;
            this.showComboNomeAtualizado = true;
            //$scope.comboFormAtualizarNome.$setPristine();
        });
    };
    private atualizarDescricaoCombo(comboId: number, descricao: string) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarDescricao?comboId=" + comboId + "&descricao=" + descricao).then((res) => {
            //delete $scope.comboId;
            //delete $scope.descricao;
            this.comboDescricaoAtualizada = res.data;
            this.showComboDescricaoAtualizada = true;
            //$scope.comboFormAtualizarDescricao.$setPristine();
        });
    };
    private atualizarPrecoCombo(comboId: number, preco: number) {
        this.http.get("http://127.0.0.1:8080/combo/atualizarPreco?comboId=" + comboId + "&preco=" + preco).then((res) => {
            //delete $scope.comboId;
            //delete $scope.preco;
            this.comboPrecoAtualizado = res.data;
            this.showComboPrecoAtualizado = true;
            //$scope.comboFormAtualizarPreco.$setPristine();
        });
    };


    private selecionarView(pagina:string, selecionado:string) {
        this.viewPagina = pagina;
        this.viewSelecionado = selecionado;
        if ((pagina == "cadastrarLanche") || (pagina == "cadastrarBebida")) {
            this.carregarIngredientes();
        } else if (pagina == "cadastrarCombo") {
            this.carregarLanches();
            this.carregarBebidas();
        }

    }

    private viewProdutosCombo(id:number) {
        this.viewProdutos = id;
    }


    $onInit(){
        this.carregarLanches();
    }
}
export default ProdutoCtrl;