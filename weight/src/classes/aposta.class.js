export default class Aposta {
    constructor(nome, peso){
        this.id = new Date().getTime();
        this.inNome = nome;
        this.inPeso = peso;
        this.ativo = true;
    }
}