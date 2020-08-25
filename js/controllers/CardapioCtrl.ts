import { IComponentController, IScope, IHttpService} from 'angular';

class CardapioCtrl implements IComponentController {
    public static $inject = ['$scope', '$http'];
    public http: IHttpService;
    public combos: any;
    public teste: String;
    public lanches: any;
    public todasBebidas: any;
    public fazerProduto:any;
    public viewSelecionado:String;
    public viewProdutos:number;
    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.combos = [];
        this.teste = "TesteTesteTeste";
        this.lanches = [];
        this.todasBebidas = [];
        this.fazerProduto = [];
        this.viewSelecionado = "cardapio";
        this.viewProdutos = 0;
    }

    public carregarCombos() {
        this.http.get("http://127.0.0.1:8080/cardapio/combos").then((res) => this.combos = res.data);
    }
    public carregarTeste() {
        this.teste = "Teste2Teste2";
    }
    public carregarLanches() {
        this.http.get("http://127.0.0.1:8080/cardapio/lanches").then((res) => this.lanches = res.data);
    };
    public carregarBebidas() {
        this.http.get("http://127.0.0.1:8080/cardapio/bebidas").then((res) => this.todasBebidas = res.data);
    };

    //Lista de ingredientes e quantidade utilizada na produção do lanche
    public carregarFazerProduto(produtoId:number){
        this.http.get("http://localhost:8080/fazer/info?produtoId=" + produtoId).then((res) => this.fazerProduto = res.data);
    }


    public selecionarView(selecionado:String) {
        this.viewSelecionado = selecionado;
    }


    public viewProdutosCombo(id:number){
        this.viewProdutos = id; 
    } 

    $onInit(){
        console.log(this.carregarLanches(), this.carregarBebidas(), this.carregarCombos());
    }
}
export default CardapioCtrl;