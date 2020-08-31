import { IComponentController, IScope, IHttpService } from 'angular';

interface IIngredienteCtrl extends IScope {
    ingrediente: any;
    ingredienteFormCadastrar: any;

    ingredienteComprar: any;
    ingredienteFormComprar: any;

    ingredienteDarBaixa: any;
    ingredienteFormDarBaixa: any;

    ingredienteAtualizarNome: any;
    ingredienteFormAtualizarNome: any;

    ingredienteAtualizarQuantidadeMinima: any;
    ingredienteFormAtualizarQuantidadeMinima: any;
}

class IngredienteCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IIngredienteCtrl;

    private ingredientesInicio: boolean;
    private pageIngredientes: number;
    private ingredientesData: any;
    private ingredientes: any;
    private paginationIngredientes: any;
    private paginationIngredientesFirst: boolean;
    private paginationIngredientesLast: boolean;

    private ingredientesLimiteInicio: boolean;
    private pageIngredientesLimite: number;
    private ingredientesLimiteData: any;
    private ingredientesLimite: any;
    private paginationIngredientesLimite: any;
    private paginationIngredientesLimiteFirst: boolean;
    private paginationIngredientesLimiteLast: boolean;

    private ingredientesZeradosInicio: boolean;
    private pageIngredientesZerados: number;
    private ingredientesZeradosData: any;
    private ingredientesZerados: any;
    private paginationIngredientesZerados: any;
    private paginationIngredientesZeradosFirst: boolean;
    private paginationIngredientesZeradosLast: boolean;

    private ingredienteCadastrado: any;
    private showIngredienteCadastrado: boolean;

    private ingredienteComprado: any;
    private showIngredienteComprado: boolean;

    private ingredientePerdido: any;
    private showIngredientePerdido: boolean;

    private ingredienteNomeAtualizado: any;
    private showIngredienteNomeAtualizado: boolean;

    private ingredienteQuantidadeMinimaAtualizada: any;
    private showIngredienteQuantidadeMinimaAtualizada: boolean;

    private viewPagina: string;
    private viewSelecionado: string;

    constructor($scope: IIngredienteCtrl, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.ingredientesInicio = false;
        this.pageIngredientes = 1;
        this.paginationIngredientesFirst = false;
        this.paginationIngredientesLast = false;

        this.ingredientesLimiteInicio = false;
        this.pageIngredientesLimite = 1;
        this.paginationIngredientesLimiteFirst = false;
        this.paginationIngredientesLimiteLast = false;

        this.ingredientesZeradosInicio = false;
        this.pageIngredientesZerados = 1;
        this.paginationIngredientesZeradosFirst = false;
        this.paginationIngredientesZeradosLast = false;

        this.showIngredienteCadastrado = false;
        this.showIngredienteComprado = false;
        this.showIngredientePerdido = false;
        this.showIngredienteNomeAtualizado = false;
        this.showIngredienteQuantidadeMinimaAtualizada = false;

        this.viewPagina = "ingredientes";
        this.viewSelecionado = "ingredientes";
    }

    private viewIngredientesInicio() {
        this.ingredientesInicio = true;
    }
    private carregarIngredientes() {
        if (this.ingredientesInicio) {
            this.pageIngredientes = 1;
        }
        this.ingredientesInicio = false;
        this.http.get("http://127.0.0.1:8080/ingrediente/visualizar/completo?page=" + (this.pageIngredientes - 1)).then((res) => {
            this.ingredientesData = res.data;
            this.ingredientes = this.ingredientesData.content;
            this.paginationIngredientes = [];
            this.paginationIngredientesFirst = this.ingredientesData.first;
            this.paginationIngredientesLast = this.ingredientesData.last;

            for (let index: number = 1; index <= this.ingredientesData.totalPages; index++) {
                this.paginationIngredientes.push(index);
            }
            this.paginationIngredientes = this.paginationIngredientes.slice(this.pageIngredientes == 1 ? this.pageIngredientes - 1 : this.pageIngredientes == 2 ? this.pageIngredientes - 2 : this.pageIngredientes - 3, this.pageIngredientes + 2);
        })
    }
    private viewPageNavigationIngredientesAnterior() {
        this.pageIngredientes -= 1;
        this.carregarIngredientes();
    }
    private viewPageNavigationIngredientesProxima() {
        this.pageIngredientes += 1;
        this.carregarIngredientes();
    }
    private viewPageNavigationIngredientes(page: number) {
        this.pageIngredientes = page;
        this.carregarIngredientes();
    }


    private viewIngredientesLimiteInicio() {
        this.ingredientesLimiteInicio = true;
    }
    private carregarIngredientesLimite() {
        if (this.ingredientesLimiteInicio) {
            this.pageIngredientesLimite = 1;
        }
        this.ingredientesLimiteInicio = false;
        this.http.get("http://127.0.0.1:8080/ingrediente/visualizar/limite?page=" + (this.pageIngredientesLimite - 1)).then((res) => {
            this.ingredientesLimiteData = res.data;
            this.ingredientesLimite = this.ingredientesLimiteData.content;
            this.paginationIngredientesLimite = [];
            this.paginationIngredientesLimiteFirst = this.ingredientesLimiteData.first;
            this.paginationIngredientesLimiteLast = this.ingredientesLimiteData.last;

            for (let index: number = 1; index <= this.ingredientesLimiteData.totalPages; index++) {
                this.paginationIngredientesLimite.push(index);
            }
            this.paginationIngredientesLimite = this.paginationIngredientesLimite.slice(this.pageIngredientesLimite == 1 ? this.pageIngredientesLimite - 1 : this.pageIngredientesLimite == 2 ? this.pageIngredientesLimite - 2 : this.pageIngredientesLimite - 3, this.pageIngredientesLimite + 2);
        })
    }
    private viewPageNavigationIngredientesLimiteAnterior() {
        this.pageIngredientesLimite -= 1;
        this.carregarIngredientesLimite();
    }
    private viewPageNavigationIngredientesLimiteProxima() {
        this.pageIngredientesLimite += 1;
        this.carregarIngredientesLimite();
    }
    private viewPageNavigationIngredientesLimite(page: number) {
        this.pageIngredientesLimite = page;
        this.carregarIngredientesLimite();
    }


    private viewIngredientesZeradosInicio() {
        this.ingredientesZeradosInicio = true;
    }
    private carregarIngredientesZerados() {
        if (this.ingredientesZeradosInicio) {
            this.pageIngredientesZerados = 1;
        }
        this.ingredientesZeradosInicio = false;
        this.http.get("http://127.0.0.1:8080/ingrediente/visualizar/zerado?page=" + (this.pageIngredientesZerados - 1)).then((res) => {
            this.ingredientesZeradosData = res.data;
            this.ingredientesZerados = this.ingredientesZeradosData.content;
            this.paginationIngredientesZerados = [];
            this.paginationIngredientesZeradosFirst = this.ingredientesZeradosData.first;
            this.paginationIngredientesZeradosLast = this.ingredientesZeradosData.last;

            for (let index: number = 1; index <= this.ingredientesZeradosData.totalPages; index++) {
                this.paginationIngredientesZerados.push(index);
            }
            this.paginationIngredientesZerados = this.paginationIngredientesZerados.slice(this.pageIngredientesZerados == 1 ? this.pageIngredientesZerados - 1 : this.pageIngredientesZerados == 2 ? this.pageIngredientesZerados - 2 : this.pageIngredientesZerados - 3, this.pageIngredientesZerados + 2);
        })
    }
    private viewPageNavigationIngredientesZeradosAnterior() {
        this.pageIngredientesZerados -= 1;
        this.carregarIngredientesZerados();
    }
    private viewPageNavigationIngredientesZeradosProxima() {
        this.pageIngredientesZerados += 1;
        this.carregarIngredientesZerados();
    }
    private viewPageNavigationIngredientesZerados(page: number) {
        this.pageIngredientesZerados = page;
        this.carregarIngredientesZerados();
    }


    private cadastrarIngrediente(ingrediente: any) {
        this.http.post("http://127.0.0.1:8080/ingrediente/cadastrar", ingrediente).then((res) => {
            this.ingredienteCadastrado = res.data;
            this.showIngredienteCadastrado = true;

            this.scope.ingrediente = undefined;
            this.scope.ingredienteFormCadastrar.$setPristine();
        })
    }


    private comprarIngrediente(ingredienteComprar: any) {
        this.http.get("http://127.0.0.1:8080/ingrediente/comprar?ingredienteId=" + ingredienteComprar.id + "&quantidade=" + ingredienteComprar.quantidade).then((res) => {
            this.ingredienteComprado = res.data;
            this.showIngredienteComprado = true;

            this.scope.ingredienteComprar = undefined;
            this.scope.ingredienteFormComprar.$setPristine();
        })
    }


    private darBaixa(ingredienteDarBaixa: any) {
        this.http.get("http://127.0.0.1:8080/ingrediente/darBaixa?ingredienteId=" + ingredienteDarBaixa.id + "&quantidade=" + ingredienteDarBaixa.quantidade).then((res) => {
            this.ingredientePerdido = res.data;
            this.showIngredientePerdido = true;

            this.scope.ingredienteDarBaixa = undefined;
            this.scope.ingredienteFormDarBaixa.$setPristine();
        })
    }


    private atualizarNome(ingredienteAtualizarNome: any) {
        this.http.get("http://127.0.0.1:8080/ingrediente/atualizarNome?ingredienteId=" + ingredienteAtualizarNome.id + "&nome=" + ingredienteAtualizarNome.nome).then((res) => {
            this.ingredienteNomeAtualizado = res.data;
            this.showIngredienteNomeAtualizado = true;

            this.scope.ingredienteAtualizarNome = undefined;
            this.scope.ingredienteFormAtualizarNome.$setPristine();
        })
    }


    private atualizarQuantidadeMinima(ingredienteAtualizarQuantidadeMinima: any) {
        this.http.get("http://127.0.0.1:8080/ingrediente/quantidadeMinima?ingredienteId=" + ingredienteAtualizarQuantidadeMinima.id + "&quantidadeMinima=" + ingredienteAtualizarQuantidadeMinima.quantidadeMinima).then((res) => {
            this.ingredienteQuantidadeMinimaAtualizada = res.data;
            this.showIngredienteQuantidadeMinimaAtualizada = true;

            this.scope.ingredienteAtualizarQuantidadeMinima = undefined;
            this.scope.ingredienteFormAtualizarQuantidadeMinima.$setPristine();
        })
    }

    private selecionarView(pagina: string, selecionado: string) {
        this.viewPagina = pagina;
        this.viewSelecionado = selecionado;
    }

    $onInit() {
        this.carregarIngredientes();
    }
}
export default IngredienteCtrl;