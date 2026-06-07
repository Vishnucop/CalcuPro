// Datos de las calculadoras
const calculatorsData = {
    basicas: {
        icon: '🧮',
        name: 'Básicas',
        calculators: [
            { id: 'estandar', name: 'Calculadora estándar' },
            { id: 'porcentajes', name: 'Porcentajes' },
            { id: 'descuentos', name: 'Descuentos' },
            { id: 'iva', name: 'IVA' },
            { id: 'regla-tres', name: 'Regla de tres' }
        ]
    },
    ventas: {
        icon: '💳',
        name: 'Ventas y financiación',
        calculators: [
            { id: 'cuotas-interes', name: 'Cuotas con interés' },
            { id: 'financiacion-inversa', name: 'Financiación inversa' },
            { id: 'comparador-contado-financiado', name: 'Comparador contado vs financiado' },
            { id: 'comision-vendedor', name: 'Comisión de vendedor' }
        ]
    },
    costos: {
        icon: '📦',
        name: 'Costos y precios',
        calculators: [
            { id: 'margen-ganancia', name: 'Margen de ganancia' },
            { id: 'markup', name: 'Markup' },
            { id: 'rentabilidad', name: 'Rentabilidad' },
            { id: 'punto-equilibrio', name: 'Punto de equilibrio' },
            { id: 'actualizacion-precios', name: 'Actualización masiva de precios' }
        ]
    },
    economia: {
        icon: '🇦',
        name: 'Economía',
        calculators: [
            { id: 'inflacion-acumulada', name: 'Inflación acumulada' },
            { id: 'actualizacion-inflacion', name: 'Actualización por inflación' },
            { id: 'conversor-usd-ars', name: 'Conversor USD ↔ ARS' },
            { id: 'impuestos', name: 'Calculadora de impuestos' }
        ]
    },
    negocios: {
        icon: '🏪',
        name: 'Negocios',
        calculators: [
            { id: 'ganancia-periodo', name: 'Ganancia diaria/semanal/mensual' },
            { id: 'proyeccion-ventas', name: 'Proyección de ventas' },
            { id: 'objetivo-facturacion', name: 'Objetivo de facturación' },
            { id: 'stock', name: 'Calculadora de stock' }
        ]
    }
};

let currentCategory = null;
let currentCalculator = null;

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});

// Renderizar categorías en el home
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    
    Object.keys(calculatorsData).forEach(key => {
        const category = calculatorsData[key];
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => showCategory(key);
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.calculators.length} calculadoras</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Mostrar categoría
function showCategory(categoryKey) {
    currentCategory = categoryKey;
    const category = calculatorsData[categoryKey];
    
    document.getElementById('category-title').textContent = `${category.icon} ${category.name}`;
    
    const grid = document.getElementById('calculators-grid');
    grid.innerHTML = '';
    
    category.calculators.forEach(calc => {
        const card = document.createElement('div');
        card.className = 'calculator-card';
        card.onclick = () => showCalculator(calc.id, calc.name);
        card.innerHTML = `<h4>${calc.name}</h4>`;
        grid.appendChild(card);
    });
    
    switchView('category-view');
}

// Mostrar calculadora
function showCalculator(calcId, calcName) {
    currentCalculator = calcId;
    document.getElementById('calculator-title').textContent = calcName;
    
    const content = document.getElementById('calculator-content');
    content.innerHTML = `<p>Cargando calculadora...</p>`;
    
    // Cargar el módulo de la calculadora correspondiente
    loadCalculator(calcId, content);
    
    switchView('calculator-view');
}

// Cargar calculadora dinámica
function loadCalculator(calcId, container) {
    // Aquí cargaremos las diferentes calculadoras
    // Por ahora un ejemplo básico
    container.innerHTML = `
        <div class="form-group">
            <label>Valor 1</label>
            <input type="number" id="val1" placeholder="Ingresa un valor">
        </div>
        <div class="form-group">
            <label>Valor 2</label>
            <input type="number" id="val2" placeholder="Ingresa un valor">
        </div>
        <button class="btn-calculate" onclick="calculate('${calcId}')">Calcular</button>
        <div id="result" class="result" style="display:none;">
            <h3>Resultado</h3>
            <div class="result-value" id="result-value"></div>
        </div>
    `;
}

// Función de cálculo genérica (se reemplazará en cada calculadora)
function calculate(calcId) {
    const val1 = parseFloat(document.getElementById('val1').value) || 0;
    const val2 = parseFloat(document.getElementById('val2').value) || 0;
    
    let result = 0;
    
    // Ejemplo básico - esto se personalizará para cada calculadora
    result = val1 + val2;
    
    document.getElementById('result-value').textContent = result.toFixed(2);
    document.getElementById('result').style.display = 'block';
}

// Navegación
function showHome() {
    currentCategory = null;
    switchView('home-view');
}

function showCategory() {
    switchView('category-view');
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}
