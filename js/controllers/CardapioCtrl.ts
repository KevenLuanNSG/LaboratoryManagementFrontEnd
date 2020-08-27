import { IComponentController, IScope, IHttpService} from 'angular';

class CardapioCtrl implements IComponentController {
    private static $inject = ['$scope', '$http'];
    private http: IHttpService;
    private combos: any;
    private lanches: any;
    private todasBebidas: any;
    private fazerProduto:any;
    private viewSelecionado:String;
    private viewProdutos:number;
    constructor($scope: IScope, $http: IHttpService) {
        this.http = $http;
        this.combos = [];
        this.lanches = [];
        this.todasBebidas = [];
        this.fazerProduto = [];
        this.viewSelecionado = "cardapio";
        this.viewProdutos = 0;
    }

    private carregarCombos() { 
        this.http.get("http://127.0.0.1:8080/cardapio/combos").then((res) => this.combos = res.data);
    }
    private carregarLanches() {
        this.http.get("http://127.0.0.1:8080/cardapio/lanches").then((res) => this.lanches = res.data);
    };
    private carregarBebidas() {
        this.http.get("http://127.0.0.1:8080/cardapio/bebidas").then((res) => this.todasBebidas = res.data);
    };

    //Lista de ingredientes e quantidade utilizada na produção do lanche
    private carregarFazerProduto(produtoId:number){
        this.http.get("http://localhost:8080/fazer/info?produtoId=" + produtoId).then((res) => this.fazerProduto = res.data);
    }


    private selecionarView(selecionado:String) {
        this.viewSelecionado = selecionado;
    }


    private viewProdutosCombo(id:number){
        this.viewProdutos = id; 
    } 
    
    $onInit(){
        console.log(this.carregarLanches(), this.carregarBebidas(), this.carregarCombos());
    }
}
export default CardapioCtrl;