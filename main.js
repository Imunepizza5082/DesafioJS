class Investimento{
    constructor(proprietario, valorInicial, dataCriacao){
        this.proprietario = proprietario;
        this.valorInicial = valorInicial;
        this.dataCriacao = dataCriacao;
        this.ganhos = 0;
        this.retirado = false;
    }

    calcularSaldo(){
        let saldo = this.valorInicial + this.ganhos;
        return saldo;
    }

    calcularGanhoMensal(){
        let currentDate = new Date();
        let monthsDiff = (currentDate.getFullYear() - this.dataCriacao.getFullYear()) * 12;
        monthsDiff -= this.dataCriacao.getMonth();
        monthsDiff += currentDate.getMonth();
        monthsDiff = monthsDiff <= 0 ? 0 : monthsDiff;

        let ganhoMensal = this.valorInicial * (0.0052 + monthsDiff);
        return ganhoMensal;
    }

    atualizarGanhos(){
        if(!this.retirado){
            this.ganhos += this.calcularGanhoMensal();
        }
    }

    retirarInvestimento(imposto){
        if(!this.retirado){
            let valorFinal = this.calcularSaldo();
            if(imposto > 0 && imposto < 1){
                valorFinal -= valorFinal * imposto;
            }
            this.retirado = true;
            return valorFinal;
        } else{
            console.log("Este investimento já foi retirado.");
            return null;
        }
    }
}

class Pessoa{
    constructor(nome){
        this.nome = nome;
        this.investimentos = [];
    }

    criarInvestimento(proprietario, valorInicial, dataCriacao){
        let investimento = new Investimento(proprietario, valorInicial, dataCriacao)
        this.investimentos.push(investimento)
    }

    listarInvestimentos(pageSize, pageNumber){
        let startIndex = (pageNumber -1) * pageSize;
        let endIndex = startIndex + pageSize;
        let investimentosPaginados = this.investimentos.slice(startIndex,endIndex);
        return investimentosPaginados;
    }
}

let pessoa = new Pessoa();
pessoa.criarInvestimento("Lucas Matheus", 1000, new Date("2024-02-28"));
pessoa.criarInvestimento("Lucas", 2000, new Date("2024-02-28"));

console.log(pessoa.listarInvestimentos(1,2));