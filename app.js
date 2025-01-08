// Navigace mezi sekcemi
function navigateTo(section) {
    // Skrytí všech sekcí
    document.querySelectorAll('.section').forEach(el => {
        el.classList.remove('active');
    });
    
    // Zobrazení vybrané sekce
    const selectedSection = document.getElementById(section + '-section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Aktualizace aktivního tlačítka
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn'))
        .find(btn => btn.onclick.toString().includes(section));
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Informace o částech kokpitu
const cockpitInfo = {
    captain: {
        title: 'Stanoviště kapitána',
        description: 'Hlavní letové přístroje včetně PFD (Primary Flight Display) a ND (Navigation Display). ' +
                    'Obsahuje také záložní přístroje pro případ selhání elektroniky.'
    },
    fo: {
        title: 'Stanoviště prvního důstojníka',
        description: 'Zrcadlové uspořádání přístrojů jako na straně kapitána. ' +
                    'Umožňuje plnou kontrolu letadla z pozice prvního důstojníka.'
    },
    center: {
        title: 'Centrální panel',
        description: 'Mode Control Panel (MCP) pro ovládání autopilota a Flight Management Computer (FMC) ' +
                    'pro programování letové trasy a navigaci.'
    },
    overhead: {
        title: 'Overhead panel',
        description: 'Obsahuje ovládací prvky všech hlavních systémů letadla: elektrický, hydraulický, ' +
                    'palivový, klimatizace a další.'
    }
};

// Zobrazení informací o části kokpitu
function showInfo(section) {
    const info = cockpitInfo[section];
    if (info) {
        const infoBox = document.getElementById('panel-info');
        infoBox.innerHTML = `<strong>${info.title}</strong><br>${info.description}`;
    }
}

// Ukládání stavu checklistů
function saveChecklistState() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const state = {};
    
    checkboxes.forEach(checkbox => {
        state[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checklistState', JSON.stringify(state));
}

// Načtení stavu checklistů
function loadChecklistState() {
    const saved = localStorage.getItem('checklistState');
    if (saved) {
        const state = JSON.parse(saved);
        Object.entries(state).forEach(([id, checked]) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checked;
            }
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Načtení uloženého stavu checklistů
    loadChecklistState();
    
    // Přidání event listenerů pro ukládání stavu checklistů
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveChecklistState);
    });
    
    // Aktivace první sekce
    navigateTo('welcome');
});