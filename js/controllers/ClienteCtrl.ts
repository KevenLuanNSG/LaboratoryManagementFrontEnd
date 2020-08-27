import { IComponentController, IScope, IHttpService } from 'angular';
class ClienteCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private scope: IScope;

    private clientesInicio: boolean;
    private page: number;
    private clientesData: any;
    private clientes: any;
    private pagination: any;
    private paginationFirst: boolean;
    private paginationLast: boolean;

    private clienteEncontrado:any;
    private showClienteEncontrado:boolean;

    private clienteNomeAtualizado:any;
    private showClienteNomeAtualizado:boolean;

    private clienteCadastrado:any;
    private showClienteCadastrado:boolean;

    private viewSelecionado:string;

    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.scope = $scope;

        this.clientesInicio = false;
        this.page = 1;
        this.paginationFirst = false;
        this.paginationLast = false;
        this.pagination = [];
        
        this.showClienteEncontrado = false;
        this.showClienteNomeAtualizado = false;
        this.showClienteCadastrado = false;

        this.viewSelecionado = "buscarCliente";
    }

    private viewClientesInicio() {
        this.clientesInicio = true;
    }
    private carregarClientes() {
         if (this.clientesInicio) {
            this.page = 1;
        }
        this.clientesInicio = false;
        this.http.get("http://127.0.0.1:8080/cliente/visualizar/todos?page=" + (this.page - 1)).then((res) => {
            this.clientesData = res.data;
            this.clientes = this.clientesData.content;
            this.pagination = [];
            this.paginationFirst = this.clientesData.first;
            this.paginationLast = this.clientesData.last;

            for (let index: number = 1; index <= this.clientesData.totalPages; index++) {
                this.pagination.push(index);
            }
            this.pagination = this.pagination.slice(this.page == 1 ? this.page - 1 : this.page == 2 ? this.page - 2 : this.page - 3, this.page + 2);
        })
    }
    private viewPageNavigationAnterior() {
        this.page -= 1;
        this.carregarClientes();
    }
    private viewPageNavigationProxima() {
        this.page += 1;
        this.carregarClientes();
    }
    private viewPageNavigation(page: number) {
        this.page = page;
        this.carregarClientes();
    }

    private buscarCliente(cpf:string){
        this.http.get("http://127.0.0.1:8080/cliente/visualizar?cpf="+ cpf).then((res) => {
            //delete $scope.cpf; 
            this.clienteEncontrado = res.data;
            this.showClienteEncontrado = true;
            //$scope.clienteFormAtualizarNome.$setPristine();
        })
    }

    private clienteAtualizarNome(cpf:string, nome:string){
        this.http.get("http://127.0.0.1:8080/cliente/atualizarNome?cpf="+cpf+"&nome="+nome).then((res) => {
            //delete $scope.cpf;
            //delete $scope.nome
            this.clienteNomeAtualizado = res.data;
            this.showClienteNomeAtualizado = true;
            //$scope.clienteFormAtualizarNome.$setPristine();
        })
    }

    private cadastrarCliente(cliente:any){
        this.http.post("http://127.0.0.1:8080/cliente/cadastrar", cliente).then((res) => {
            //delete $scope.cliente;
            this.clienteCadastrado = res.data;
            this.showClienteCadastrado = true;
            //$scope.clienteFormCadastrar.$setPristine();
        })
    }

    private selecionarView(selecionado:string){
        this.viewSelecionado = selecionado;
    }

    $onInit() {
    }
}
export default ClienteCtrl;