// Informace o částech kokpitu
const panelInfo = {
    overhead: 'Overhead Panel: Obsahuje ovládací prvky elektrického, hydraulického a palivového systému.',
    captain: 'Stanoviště kapitána: Hlavní letové přístroje včetně PFD a ND.',
    fo: 'Stanoviště 1. důstojníka: Sekundární sada letových přístrojů.',
    central: 'Centrální panel: Mode Control Panel (MCP) a další sdílené ovládací prvky.'
};

// Přepínání mezi sekcemi
function showSection(sectionId) {
    // Deaktivace všech sekcí a tlačítek
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Aktivace vybrané sekce
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Aktivace příslušného tlačítka
    const selectedBtn = Array.from(document.querySelectorAll('.nav-btn'))
        .find(btn => btn.textContent.toLowerCase().includes(sectionId));
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Uložení aktuální sekce do localStorage
    localStorage.setItem('activeSection', sectionId);
}

// Inicializace kokpitu
function initKokpit() {
    const elements = document.querySelectorAll('.kokpit-element');
    const infoBox = document.getElementById('panel-info');

    elements.forEach(element => {
        element.addEventListener('click', () => {
            const panelType = element.getAttribute('data-panel');
            if (panelType && panelInfo[panelType]) {
                infoBox.textContent = panelInfo[panelType];
            }
        });
    });
}

// Ukládání stavu checklistů
function initChecklists() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    // Načtení uložených stavů
    checkboxes.forEach(checkbox => {
        const itemText = checkbox.parentElement.textContent.trim();
        const savedState = localStorage.getItem(`checklist-${itemText}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
    });

    // Přidání event listenerů pro ukládání
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const itemText = checkbox.parentElement.textContent.trim();
            localStorage.setItem(`checklist-${itemText}`, checkbox.checked);
        });
    });
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    initKokpit();
    initChecklists();
    
    // Načtení poslední aktivní sekce
    const lastActiveSection = localStorage.getItem('activeSection');
    if (lastActiveSection) {
        showSection(lastActiveSection);
    } else {
        showSection('uvod');
    }
});