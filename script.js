class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.init();
    }

    init() {
        // Add event listeners
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.addAnimationClass(button, 'number-pressed');
                this.appendNumber(button.innerText);
                this.updateDisplay();
            });
        });

        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                this.addAnimationClass(button, 'operator-pressed');
                const action = button.dataset.action;
                this.handleOperation(action);
                this.updateDisplay();
            });
        });
    }

    addAnimationClass(element, className) {
        element.classList.add(className);
        element.addEventListener('animationend', () => {
            element.classList.remove(className);
        }, { once: true });
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }

    handleOperation(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'percent':
                this.percent();
                break;
            case 'calculate':
                this.calculate();
                break;
            default:
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.calculate();
                }
                this.operation = action;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
        }
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    percent() {
        let value = parseFloat(this.currentOperand);
        this.currentOperand = (value / 100).toString();
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.previousOperand = '';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        this.addAnimationClass(this.currentOperandElement, 'display-update');
        
        if (this.operation != null) {
            const operationSymbol = {
                'add': '+',
                'subtract': '-',
                'multiply': '×',
                'divide': '÷'
            }[this.operation];
            
            this.previousOperandElement.textContent = 
                `${this.previousOperand} ${operationSymbol}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// Initialize calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
