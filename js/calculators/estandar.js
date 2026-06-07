// Calculadora Estándar
function initCalculadoraEstandar(container) {
    container.innerHTML = `
        <div class="calculator-standard">
            <div class="display" id="display">0</div>
            <div class="buttons-grid">
                <button class="btn btn-function" onclick="clearDisplay()">C</button>
                <button class="btn btn-function" onclick="deleteLast()">⌫</button>
                <button class="btn btn-function" onclick="appendOperator('%')">%</button>
                <button class="btn btn-operator" onclick="appendOperator('/')">÷</button>
                
                <button class="btn btn-number" onclick="appendNumber('7')">7</button>
                <button class="btn btn-number" onclick="appendNumber('8')">8</button>
                <button class="btn btn-number" onclick="appendNumber('9')">9</button>
                <button class="btn btn-operator" onclick="appendOperator('*')">×</button>
                
                <button class="btn btn-number" onclick="appendNumber('4')">4</button>
                <button class="btn btn-number" onclick="appendNumber('5')">5</button>
                <button class="btn btn-number" onclick="appendNumber('6')">6</button>
                <button class="btn btn-operator" onclick="appendOperator('-')">−</button>
                
                <button class="btn btn-number" onclick="appendNumber('1')">1</button>
                <button class="btn btn-number" onclick="appendNumber('2')">2</button>
                <button class="btn btn-number" onclick="appendNumber('3')">3</button>
                <button class="btn btn-operator" onclick="appendOperator('+')">+</button>
                
                <button class="btn btn-number" onclick="appendNumber('0')">0</button>
                <button class="btn btn-number" onclick="appendNumber('.')">.</button>
                <button class="btn btn-equals" onclick="calculate()">=</button>
                <button class="btn btn-equals" onclick="calculate()">=</button>
            </div>
        </div>
    `;
}

let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    const display = document.getElementById('display');
    if (display) {
        display.textContent = currentInput;
    }
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (num === '.' && currentInput.includes('.')) return;
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (op === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
        return;
    }
    
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        // Reemplazar operadores para evaluación segura
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        // Evaluar la expresión
        let result = eval(expression);
        
        // Formatear resultado
        if (Number.isInteger(result)) {
            currentInput = result.toString();
        } else {
            currentInput = result.toFixed(8).replace(/\.?0+$/, '');
        }
        
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}
