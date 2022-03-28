import React, { Component } from "react";
import "./Calculator.css"
import Button from "../components/Button";
import Display from "../components/Display";



const initialState = {
    displayValue: '0', //valor exibido no display da calculadora
    clearDisplay: false, // bool para saber se precisa limpar a tela
    operation: null, // a operação que vai realizar +.-,/
    values: [0, 0], // o array para colocar os 2 valores quando vai realizar uma operação
    current: 0 // vai ficar entre 0 e 1 para saber em qual posição do array estou mudando
}


export default class Calculator extends Component {

    state = { ...initialState } //clone do objeto

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialState }) //limpar colocando o valor incial
    }

    setOperation(operation) {
        console.log(operation)
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { //verificar se tem só um ponto para não adicionar outro
            return
        }
        const clearDisplay = this.state.displayValue === '0' // se o valor do displayvalue for 0 limpar ou se o cleardisplay for true tambem limpa
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue //o estado inicial é zero e passa a ser vazio na primeira executada, quando mudou já soma com o novo N
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current // saber de qual lado do array estar
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values] //clonou o array que tinha
            values[i] = newValue // o array clonado e a posicao escolhida recebe o novo valor
            this.setState({ values }) // passar agora para o estado o novo array
        }
    }
    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}>  </Display>
                <Button label="AC" click={this.clearMemory} triple ></Button>
                <Button label="/" click={this.setOperation} operation></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit}></Button>
                <Button label="9" click={this.addDigit}></Button>
                <Button label="*" click={this.setOperation} operation></Button>
                <Button label="4" click={this.addDigit}></Button>
                <Button label="5" click={this.addDigit}></Button>
                <Button label="6" click={this.addDigit}></Button>
                <Button label="-" click={this.setOperation} operation></Button>
                <Button label="1" click={this.addDigit}></Button>
                <Button label="2" click={this.addDigit}></Button>
                <Button label="3" click={this.addDigit}></Button>
                <Button label="+" click={this.setOperation} operation></Button>
                <Button label="0" click={this.addDigit} double></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" click={this.setOperation}></Button>
            </div>
        )
    }
}