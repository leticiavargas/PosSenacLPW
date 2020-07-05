export default class ApostaLista {
    constructor(){
        this.apostas = [];
    }

    novaAposta(aposta) {
        this.apostas.push(aposta);
    }

    ativarDesativar(id) {
        for(const aposta of this.apostas){
            if(aposta.id == id){
                aposta.ativo = !aposta.ativo;
                break;
            }
        }
    }

    get() {
        return this.apostas;
    }

    removeInativos(){
        this.apostas = this.apostas.filter(aposta => aposta.ativo);
        return this.apostas;
    }

    ordenaVencedores(peso) {        
        this.apostas.forEach((aposta)=>{
           aposta.margemErro = (aposta.inPeso - peso);
        });
       
        return this.apostas.sort((aposta1, aposta2) => (aposta1.margemErro - aposta2.margemErro));
    }
}