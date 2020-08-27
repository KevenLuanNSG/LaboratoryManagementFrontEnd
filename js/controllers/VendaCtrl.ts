import { IComponentController, IScope, IHttpService, forEach } from 'angular';

class VendaCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IScope;

    private bebidasInd: any;
    private doces: any;
    private chocolates: any;
    private sorvetes: any;
    private bebidas: any;
    private lanches: any;
    private combos: any;

    private produtoList: any;
    private comboList: any;
    private produtoIndependenteList: any;

    private valorVenda: number;
    private vendaRealizada: any;
    private showVendaRealizada: boolean;

    private vendasInicio: boolean;
    private pageVendas: number;
    private vendasData: any;
    private vendas: any;
    private paginationVendas: any;
    private paginationFirstVendas: boolean;
    private paginationLastVendas: boolean;

    private vendasDoDiaInicio: boolean;
    private pageVendasDoDia: number;
    private vendasDoDiaData: any;
    private vendasDoDia: any;
    private paginationVendasDoDia: any;
    private paginationFirstVendasDoDia: boolean;
    private paginationLastVendasDoDia: boolean;
    private dateVendasDoDia: Date;

    private vendasPorPeriodoInicio: boolean;
    private pageVendasPorPeriodo: number;
    private vendasPorPeriodoData: any;
    private vendasPorPeriodo: any;
    private paginationVendasPorPeriodo: any;
    private paginationFirstVendasPorPeriodo: boolean;
    private paginationLastVendasPorPeriodo: boolean;
    private dateStartVendasPorPeriodo: Date;
    private dateEndVendasPorPeriodo: Date;


    private vendasPorClienteInicio: boolean;
    private pageVendasPorCliente: number;
    private vendasPorClienteData: any;
    private vendasPorCliente: any;
    private paginationVendasPorCliente: any;
    private paginationFirstVendasPorCliente: boolean;
    private paginationLastVendasPorCliente: boolean;
    private cpfVendasPorCliente: string;

    private vendasDoDiaPorClienteInicio: boolean;
    private pageVendasDoDiaPorCliente: number;
    private vendasDoDiaPorClienteData: any;
    private vendasDoDiaPorCliente: any;
    private paginationVendasDoDiaPorCliente: any;
    private paginationFirstVendasDoDiaPorCliente: boolean;
    private paginationLastVendasDoDiaPorCliente: boolean;
    private dateVendasDoDiaPorCliente: Date;
    private cpfVendasDoDiaPorCliente: string;

    private vendasPorPeriodoPorClienteInicio: boolean;
    private pageVendasPorPeriodoPorCliente: number;
    private vendasPorPeriodoPorClienteData: any;
    private vendasPorPeriodoPorCliente: any;
    private paginationVendasPorPeriodoPorCliente: any;
    private paginationFirstVendasPorPeriodoPorCliente: boolean;
    private paginationLastVendasPorPeriodoPorCliente: boolean;
    private dateStartVendasPorPeriodoPorCliente: Date;
    private dateEndVendasPorPeriodoPorCliente: Date;
    private cpfVendasPorPeriodoPorCliente: string;

    private hoje: Date;

    private viewPagina: string;
    private viewSelecionado: string;

    private selecionarProdutos: boolean;
    private selecionarTipoDoProduto: string;

    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.produtoList = [];
        this.comboList = [];
        this.produtoIndependenteList = [];

        this.valorVenda = 0;
        this.showVendaRealizada = false;

        this.vendasInicio = false;
        this.pageVendas = 1;
        this.paginationVendas = [];
        this.paginationFirstVendas = false;
        this.paginationLastVendas = false;

        this.vendasDoDiaInicio = false;
        this.pageVendasDoDia = 1;
        this.paginationVendasDoDia = [];
        this.paginationFirstVendasDoDia = false;
        this.paginationLastVendasDoDia = false;
        this.dateVendasDoDia = new Date;

        this.vendasPorPeriodoInicio = false;
        this.pageVendasPorPeriodo = 1;
        this.paginationVendasPorPeriodo = [];
        this.paginationFirstVendasPorPeriodo = false;
        this.paginationLastVendasPorPeriodo = false;
        this.dateStartVendasPorPeriodo = new Date;
        this.dateEndVendasPorPeriodo = new Date;


        this.vendasPorClienteInicio = false;
        this.pageVendasPorCliente = 1;
        this.paginationVendasPorCliente = [];
        this.paginationFirstVendasPorCliente = false;
        this.paginationLastVendasPorCliente = false;
        this.cpfVendasPorCliente = "";

        this.vendasDoDiaPorClienteInicio = false;
        this.pageVendasDoDiaPorCliente = 1;
        this.paginationVendasDoDiaPorCliente = [];
        this.paginationFirstVendasDoDiaPorCliente = false;
        this.paginationLastVendasDoDiaPorCliente = false;
        this.dateVendasDoDiaPorCliente = new Date;
        this.cpfVendasDoDiaPorCliente = "";

        this.vendasPorPeriodoPorClienteInicio = false;
        this.pageVendasPorPeriodoPorCliente = 1;
        this.paginationVendasPorPeriodoPorCliente = [];
        this.paginationFirstVendasPorPeriodoPorCliente = false;
        this.paginationLastVendasPorPeriodoPorCliente = false;
        this.dateStartVendasPorPeriodoPorCliente = new Date;
        this.dateEndVendasPorPeriodoPorCliente = new Date;
        this.cpfVendasPorPeriodoPorCliente = "";

        this.hoje = new Date;

        this.viewPagina = "realizarVenda";
        this.viewSelecionado = "realizarVenda";

        this.selecionarProdutos = false;
        this.selecionarTipoDoProduto = "";
    }

    private carregarBebidasInd() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Bebida").then((res) => {
            this.bebidasInd = res.data;
        });
    }
    private carregarDoces() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Doce").then((res) => {
            this.doces = res.data;
        });
    }
    private carregarChocolates() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Chocolate").then((res) => {
            this.chocolates = res.data;
        });
    }
    private carregarSorvetes() {
        this.http.get("http://127.0.0.1:8080/produtoIndependente/tipo?tipoProduto=Sorvete").then((res) => {
            this.sorvetes = res.data;
        });
    }
    private carregarBebidas() {
        this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Bebida").then((res) => {
            this.bebidas = res.data;
        });
    }
    private carregarLanches() {
        this.http.get("http://127.0.0.1:8080/produto/tipo?tipoProduto=Lanche").then((res) => {
            this.lanches = res.data;
        });
    }
    private carregarCombos() {
        this.http.get("http://127.0.0.1:8080/combo/combos").then((res) => {
            this.combos = res.data;
        });
    }



    private adicionarLanche(lanche: any) {
        this.produtoList.push(lanche);
    }
    private adicionarBebida(bebida: any) {
        this.produtoList.push(bebida);
    }
    private removerProduto(index: any) {
        this.produtoList.splice(index, 1);
    }


    private adicionarCombo(combo: any) {
        this.comboList.push(combo);
    }
    private removerCombo(index: any) {
        this.comboList.splice(index, 1);
    }


    private adicionarBebidaInd(bebidaInd: any) {
        this.produtoIndependenteList.push(bebidaInd);
    }
    private adicionarDoce(doce: any) {
        this.produtoIndependenteList.push(doce);
    }
    private adicionarChocolate(chocolate: any) {
        this.produtoIndependenteList.push(chocolate);
    }
    private adicionarSorvete(sorvete: any) {
        this.produtoIndependenteList.push(sorvete);
    }
    private removerProdutoIndependente(index: any) {
        this.produtoIndependenteList.splice(index, 1);
    }


    private carregarValorVenda() {
        this.valorVenda = 0;
        if (this.produtoList.length != 0) {
            for (let index: number = 0; index < this.produtoList.length; index++) {
                this.valorVenda += this.produtoList[index].preco;
            }
        }
        if (this.produtoIndependenteList.length > 0) {
            for (let index: number = 0; index < this.produtoIndependenteList.length; index++) {
                this.valorVenda += this.produtoIndependenteList[index].preco;
            }
        }
        if (this.comboList.length > 0) {
            for (let index: number = 0; index < this.comboList.length; index++) {
                this.valorVenda += this.comboList[index].preco;
            }
        }
    }
    private realizarVenda(venda: any) {
        if (this.produtoList.length > 0) {
            venda.produtoList = this.produtoList;
        }
        if (this.produtoIndependenteList.length > 0) {
            venda.produtoIndependenteList = this.produtoIndependenteList;
        }
        if (this.comboList.length > 0) {
            venda.comboList = this.comboList;
        }

        this.http.post("http://127.0.0.1:8080/venda/vender", venda).then((res) => {
            //delete this.venda;
            this.vendaRealizada = res.data;
            this.showVendaRealizada = true;
            //this.vendaFormRealizar.$setPristine();
            this.produtoList = [];
            this.produtoIndependenteList = [];
            this.comboList = [];
            this.valorVenda = 0;
        });
        

        
    };



    private viewVendasInicio() {
        this.vendasInicio = true;
    }

    private visualizarVendas() {
        if (this.vendasInicio) {
            this.pageVendas = 1;
        }
        this.vendasInicio = false;
        this.http.get("http://127.0.0.1:8080/venda/visualizar?page=" + (this.pageVendas - 1)).then((res) => {
            this.vendasData = res.data;
            this.vendas = this.vendasData.content;

            this.paginationVendas = [];

            this.paginationFirstVendas = this.vendasData.first;
            this.paginationLastVendas = this.vendasData.last;

            for (let index = 1; index <= this.vendasData.totalPages; index++) {
                this.paginationVendas.push(index);
            }

            this.paginationVendas = this.paginationVendas.slice(this.pageVendas == 1 ? this.pageVendas - 1 : this.pageVendas == 2 ? this.pageVendas - 2 : this.pageVendas - 3, this.pageVendas + 2);
        });
    };
    private viewPageNavigationAnteriorVendas() {
        this.pageVendas -= 1
        this.visualizarVendas();
    }
    private viewPageNavigationProximaVendas() {
        this.pageVendas += 1
        this.visualizarVendas();
    }
    private viewPageNavigationVendas(pageVendas: number) {
        this.pageVendas = pageVendas;
        this.visualizarVendas();
    }



    private viewVendasDoDiaInicio() {
        this.vendasDoDiaInicio = true;
    }

    private visualizarVendasDoDia(date: Date) {
        if (this.vendasDoDiaInicio) {
            this.pageVendasDoDia = 1;
        }
        this.vendasDoDiaInicio = false;
        this.dateVendasDoDia = date;
        let mesString = "";
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();
        if (mes < 10) {
            mesString = "0" + mes.toString();
        } else {
            mesString = mes.toString();
        }
        this.http.get("http://127.0.0.1:8080/venda/visualizar/data?dateStart=" + ano + "-" + mesString + "-" + dia + "&dateEnd=" + ano + "-" + mesString + "-" + dia + "&page=" + (this.pageVendasDoDia - 1)).then((res) => {
            this.vendasDoDiaData = res.data;
            this.vendasDoDia = this.vendasDoDiaData.content;

            this.paginationVendasDoDia = [];

            this.paginationFirstVendasDoDia = this.vendasDoDiaData.first;
            this.paginationLastVendasDoDia = this.vendasDoDiaData.last;

            for (let index = 1; index <= this.vendasDoDiaData.totalPages; index++) {
                this.paginationVendasDoDia.push(index);
            }

            this.paginationVendasDoDia = this.paginationVendasDoDia.slice(this.pageVendasDoDia == 1 ? this.pageVendasDoDia - 1 : this.pageVendasDoDia == 2 ? this.pageVendasDoDia - 2 : this.pageVendasDoDia - 3, this.pageVendasDoDia + 2);
        });
    };
    private viewPageNavigationAnteriorVendasDoDia() {
        this.pageVendasDoDia -= 1;
        this.vendasDoDiaInicio = false;
        this.visualizarVendasDoDia(this.dateVendasDoDia);
    }
    private viewPageNavigationProximaVendasDoDia() {
        this.pageVendasDoDia += 1;
        this.vendasDoDiaInicio = false;
        this.visualizarVendasDoDia(this.dateVendasDoDia);
    }
    private viewPageNavigationVendasDoDia(pageVendasDoDia: number) {
        this.pageVendasDoDia = pageVendasDoDia;
        this.vendasDoDiaInicio = false;
        this.visualizarVendasDoDia(this.dateVendasDoDia);
    }



    private viewVendasPorPeriodoInicio() {
        this.vendasPorPeriodoInicio = true;
    }

    private visualizarVendasPorPeriodo(dateStart: Date, dateEnd: Date) {
        if (this.vendasPorPeriodoInicio) {
            this.pageVendasPorPeriodo = 1;
        }
        this.vendasPorPeriodoInicio = false;
        this.dateStartVendasPorPeriodo = dateStart;
        this.dateEndVendasPorPeriodo = dateEnd;

        let mesStringStart = "";
        let diaStart = dateStart.getDate();
        let mesStart = dateStart.getMonth() + 1;
        let anoStart = dateStart.getFullYear();
        if (mesStart < 10) {
            mesStringStart = "0" + mesStart.toString();
        } else {
            mesStringStart = mesStart.toString();
        }

        let mesStringEnd = "";
        let diaEnd = dateEnd.getDate();
        let mesEnd = dateEnd.getMonth() + 1;
        let anoEnd = dateEnd.getFullYear();
        if (mesEnd < 10) {
            mesStringEnd = "0" + mesEnd.toString();
        } else {
            mesStringEnd = mesEnd.toString();
        }

        this.http.get("http://127.0.0.1:8080/venda/visualizar/data?dateStart=" + anoStart + "-" + mesStringStart + "-" + diaStart + "&dateEnd=" + anoEnd + "-" + mesStringEnd + "-" + diaEnd + "&page=" + (this.pageVendasPorPeriodo - 1)).then((res) => {
            this.vendasPorPeriodoData = res.data;
            this.vendasPorPeriodo = this.vendasPorPeriodoData.content;

            this.paginationVendasPorPeriodo = [];

            this.paginationFirstVendasPorPeriodo = this.vendasPorPeriodoData.first;
            this.paginationLastVendasPorPeriodo = this.vendasPorPeriodoData.last;

            for (let index = 1; index <= this.vendasPorPeriodoData.totalPages; index++) {
                this.paginationVendasPorPeriodo.push(index);
            }

            this.paginationVendasPorPeriodo = this.paginationVendasPorPeriodo.slice(this.pageVendasPorPeriodo == 1 ? this.pageVendasPorPeriodo - 1 : this.pageVendasPorPeriodo == 2 ? this.pageVendasPorPeriodo - 2 : this.pageVendasPorPeriodo - 3, this.pageVendasPorPeriodo + 2);
        });
    };
    private viewPageNavigationAnteriorVendasPorPeriodo() {
        this.pageVendasPorPeriodo -= 1;
        this.vendasPorPeriodoInicio = false;
        this.visualizarVendasPorPeriodo(this.dateStartVendasPorPeriodo, this.dateEndVendasPorPeriodo);
    }
    private viewPageNavigationProximaVendasPorPeriodo() {
        this.pageVendasPorPeriodo += 1;
        this.vendasPorPeriodoInicio = false;
        this.visualizarVendasPorPeriodo(this.dateStartVendasPorPeriodo, this.dateEndVendasPorPeriodo);
    }
    private viewPageNavigationVendasPorPeriodo(pageVendasPorPeriodo: number) {
        this.pageVendasPorPeriodo = pageVendasPorPeriodo;
        this.vendasPorPeriodoInicio = false;
        this.visualizarVendasPorPeriodo(this.dateStartVendasPorPeriodo, this.dateEndVendasPorPeriodo);
    }



    private viewVendasPorClienteInicio() {
        this.vendasPorClienteInicio = true;
    }

    private visualizarVendasPorCliente(cpf: string) {
        if (this.vendasPorClienteInicio) {
            this.pageVendasPorCliente = 1;
        }
        this.vendasPorClienteInicio = false;
        this.http.get("http://127.0.0.1:8080/venda/visualizar/cliente?cpf=" + cpf + "&page=" + (this.pageVendasPorCliente - 1)).then((res) => {
            this.vendasPorClienteData = res.data;
            this.vendasPorCliente = this.vendasPorClienteData.content;
            this.cpfVendasPorCliente = cpf;
            this.paginationVendasPorCliente = [];

            this.paginationFirstVendasPorCliente = this.vendasPorClienteData.first;
            this.paginationLastVendasPorCliente = this.vendasPorClienteData.last;

            for (let index = 1; index <= this.vendasPorClienteData.totalPages; index++) {
                this.paginationVendasPorCliente.push(index);
            }

            this.paginationVendasPorCliente = this.paginationVendasPorCliente.slice(this.pageVendasPorCliente == 1 ? this.pageVendasPorCliente - 1 : this.pageVendasPorCliente == 2 ? this.pageVendasPorCliente - 2 : this.pageVendasPorCliente - 3, this.pageVendasPorCliente + 2);
        });
    };
    private viewPageNavigationAnteriorVendasPorCliente() {
        this.pageVendasPorCliente -= 1;
        this.vendasPorClienteInicio = false;
        this.visualizarVendasPorCliente(this.cpfVendasPorCliente);
    }
    private viewPageNavigationProximaVendasPorCliente() {
        this.pageVendasPorCliente += 1;
        this.vendasPorClienteInicio = false;
        this.visualizarVendasPorCliente(this.cpfVendasPorCliente);
    }
    private viewPageNavigationVendasPorCliente(pageVendasPorCliente: number) {
        this.pageVendasPorCliente = pageVendasPorCliente;
        this.vendasPorClienteInicio = false;
        this.visualizarVendasPorCliente(this.cpfVendasPorCliente);
    }



    private viewVendasPorPeriodoPorClienteInicio() {
        this.vendasPorPeriodoPorClienteInicio = true;
    }

    private visualizarVendasPorPeriodoPorCliente(dateStart: Date, dateEnd: Date, cpf: string) {
        if (this.vendasPorPeriodoPorClienteInicio) {
            this.pageVendasPorPeriodoPorCliente = 1;
        }
        this.vendasPorPeriodoPorClienteInicio = false;
        this.dateStartVendasPorPeriodoPorCliente = dateStart;
        this.dateEndVendasPorPeriodoPorCliente = dateEnd;

        let mesStringStart = "";
        let diaStart = dateStart.getDate();
        let mesStart = dateStart.getMonth() + 1;
        let anoStart = dateStart.getFullYear();
        if (mesStart < 10) {
            mesStringStart = "0" + mesStart.toString();
        } else {
            mesStringStart = mesStart.toString();
        }

        let mesStringEnd = "";
        let diaEnd = dateEnd.getDate();
        let mesEnd = dateEnd.getMonth() + 1;
        let anoEnd = dateEnd.getFullYear();
        if (mesEnd < 10) {
            mesStringEnd = "0" + mesEnd.toString();
        } else {
            mesStringEnd = mesEnd.toString();
        }
        this.http.get("http://127.0.0.1:8080/venda/visualizar/clienteData?cpf=" + cpf + "&dateStart=" + anoStart + "-" + mesStringStart + "-" + diaStart + "&dateEnd=" + anoEnd + "-" + mesStringEnd + "-" + diaEnd + "&page=" + (this.pageVendasPorPeriodoPorCliente - 1)).then((res) => {
            this.vendasPorPeriodoPorClienteData = res.data;
            this.vendasPorPeriodoPorCliente = this.vendasPorPeriodoPorClienteData.content;
            this.cpfVendasPorPeriodoPorCliente = cpf;
            this.paginationVendasPorPeriodoPorCliente = [];

            this.paginationFirstVendasPorPeriodoPorCliente = this.vendasPorPeriodoPorClienteData.first;
            this.paginationLastVendasPorPeriodoPorCliente = this.vendasPorPeriodoPorClienteData.last;

            for (let index = 1; index <= this.vendasPorPeriodoPorClienteData.totalPages; index++) {
                this.paginationVendasPorPeriodoPorCliente.push(index);
            }

            this.paginationVendasPorPeriodoPorCliente = this.paginationVendasPorPeriodoPorCliente.slice(this.pageVendasPorPeriodoPorCliente == 1 ? this.pageVendasPorPeriodoPorCliente - 1 : this.pageVendasPorPeriodoPorCliente == 2 ? this.pageVendasPorPeriodoPorCliente - 2 : this.pageVendasPorPeriodoPorCliente - 3, this.pageVendasPorPeriodoPorCliente + 2);
        });
    };
    private viewPageNavigationAnteriorVendasPorPeriodoPorCliente() {
        this.pageVendasPorPeriodoPorCliente -= 1;
        this.vendasPorPeriodoPorClienteInicio = false;
        this.visualizarVendasPorPeriodoPorCliente(this.dateStartVendasPorPeriodoPorCliente, this.dateEndVendasPorPeriodoPorCliente, this.cpfVendasPorPeriodoPorCliente);
    }
    private viewPageNavigationProximaVendasPorPeriodoPorCliente() {
        this.pageVendasPorPeriodoPorCliente += 1;
        this.vendasPorPeriodoPorClienteInicio = false;
        this.visualizarVendasPorPeriodoPorCliente(this.dateStartVendasPorPeriodoPorCliente, this.dateEndVendasPorPeriodoPorCliente, this.cpfVendasPorPeriodoPorCliente);
    }
    private viewPageNavigationVendasPorPeriodoPorCliente(pageVendasPorPeriodoPorCliente: number) {
        this.pageVendasPorPeriodoPorCliente = pageVendasPorPeriodoPorCliente;
        this.vendasPorPeriodoPorClienteInicio = false;
        this.visualizarVendasPorPeriodoPorCliente(this.dateStartVendasPorPeriodoPorCliente, this.dateEndVendasPorPeriodoPorCliente, this.cpfVendasPorPeriodoPorCliente);
    }



    private viewVendasDoDiaPorClienteInicio() {
        this.vendasDoDiaPorClienteInicio = true;
    }

    private visualizarVendasDoDiaPorCliente(date: Date, cpf: string) {
        if (this.vendasDoDiaPorClienteInicio) {
            this.pageVendasDoDiaPorCliente = 1;
        }
        this.vendasDoDiaPorClienteInicio = false;
        this.dateVendasDoDiaPorCliente = date;
        let mesString = "";
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();
        if (mes < 10) {
            mesString = "0" + mes.toString();
        } else {
            mesString = mes.toString();
        }
        this.http.get("http://127.0.0.1:8080/venda/visualizar/clienteData?cpf=" + cpf + "&dateStart=" + ano + "-" + mesString + "-" + dia + "&dateEnd=" + ano + "-" + mesString + "-" + dia + "&page=" + (this.pageVendasDoDiaPorCliente - 1)).then((res) => {
            this.vendasDoDiaPorClienteData = res.data;
            this.vendasDoDiaPorCliente = this.vendasDoDiaPorClienteData.content;
            this.cpfVendasDoDiaPorCliente = cpf;
            this.paginationVendasDoDiaPorCliente = [];

            this.paginationFirstVendasDoDiaPorCliente = this.vendasDoDiaPorClienteData.first;
            this.paginationLastVendasDoDiaPorCliente = this.vendasDoDiaPorClienteData.last;

            for (let index = 1; index <= this.vendasDoDiaPorClienteData.totalPages; index++) {
                this.paginationVendasDoDiaPorCliente.push(index);
            }

            this.paginationVendasDoDiaPorCliente = this.paginationVendasDoDiaPorCliente.slice(this.pageVendasDoDiaPorCliente == 1 ? this.pageVendasDoDiaPorCliente - 1 : this.pageVendasDoDiaPorCliente == 2 ? this.pageVendasDoDiaPorCliente - 2 : this.pageVendasDoDiaPorCliente - 3, this.pageVendasDoDiaPorCliente + 2);
        });
    };
    private viewPageNavigationAnteriorVendasDoDiaPorCliente() {
        this.pageVendasDoDiaPorCliente -= 1;
        this.vendasDoDiaPorClienteInicio = false;
        this.visualizarVendasDoDiaPorCliente(this.dateVendasDoDiaPorCliente, this.cpfVendasDoDiaPorCliente);
    }
    private viewPageNavigationProximaVendasDoDiaPorCliente() {
        this.pageVendasDoDiaPorCliente += 1;
        this.vendasDoDiaPorClienteInicio = false;
        this.visualizarVendasDoDiaPorCliente(this.dateVendasDoDiaPorCliente, this.cpfVendasDoDiaPorCliente);
    }
    private viewPageNavigationVendasDoDiaPorCliente(pageVendasDoDiaPorCliente: number) {
        this.pageVendasDoDiaPorCliente = pageVendasDoDiaPorCliente;
        this.vendasDoDiaPorClienteInicio = false;
        this.visualizarVendasDoDiaPorCliente(this.dateVendasDoDiaPorCliente, this.cpfVendasDoDiaPorCliente);
    }


    private gerarHoje() {
        this.hoje = new Date();
        return this.hoje;
    }


    private selecionarView(pagina: string, selecionado: string) {
        this.viewPagina = pagina;
        this.viewSelecionado = selecionado;
        if (pagina == "realizarVenda") {
            this.carregarLanches();
            this.carregarBebidas();
            this.carregarBebidasInd();
            this.carregarCombos();
            this.carregarChocolates();
            this.carregarDoces();
            this.carregarSorvetes();
        }
    }


    private viewSelecionarProdutos() {
        if (this.selecionarProdutos) {
            this.selecionarProdutos = false;
        } else {
            this.selecionarProdutos = true;
        }
    }

    private viewSelecionarTipoDoProduto(tipoDoProduto: string) {
        this.selecionarTipoDoProduto = tipoDoProduto;
    }

    $onInit() {
        this.carregarLanches();
        this.carregarBebidas();
        this.carregarBebidasInd();
        this.carregarCombos();
        this.carregarChocolates();
        this.carregarDoces();
        this.carregarSorvetes();
    }
}
export default VendaCtrl;