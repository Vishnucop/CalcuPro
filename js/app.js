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
        icon: '🇦🇷',
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
    switch(calcId) {
        case 'estandar':
            if (typeof initCalculadoraEstandar === 'function') {
                initCalculadoraEstandar(container);
            } else {
                container.innerHTML = '<p>Error: No se pudo cargar la calculadora</p>';
            }
            break;
        case 'porcentajes':
            container.innerHTML = '<p>Próximamente...</p>';
            break;
        case 'descuentos':
            container.innerHTML = '<p>Próximamente...</p>';
            break;
        case 'iva':
            container.innerHTML = '<p>Próximamente...</p>';
            break;
        case 'regla-tres':
            container.innerHTML = '<p>Próximamente...</p>';
            break;
        default:
            container.innerHTML = '<p>Calculadora en desarrollo...</p>';
    }
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
