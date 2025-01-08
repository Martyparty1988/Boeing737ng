function navigateTo(section) {
    const content = document.getElementById('content');
    if (section === 'cockpit') {
        content.innerHTML = `
            <h2>Kokpit</h2>
            <p>Klikněte na část kokpitu pro více informací:</p>
            <div class="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
                    <rect id="captain" x="20" y="20" width="20" height="20" fill="#333" />
                    <text x="22" y="35" font-size="8" fill="white">Kapitán</text>
                    <rect id="first-officer" x="60" y="20" width="20" height="20" fill="#555" />
                    <text x="62" y="35" font-size="8" fill="white">1. důstojník</text>
                    <rect id="center-panel" x="40" y="60" width="20" height="20" fill="#777" />
                    <text x="42" y="75" font-size="8" fill="white">Centrální</text>
                    <rect id="overhead-panel" x="20" y="0" width="60" height="10" fill="#999" />
                    <text x="30" y="8" font-size="6" fill="black">Overhead</text>
                </svg>
            </div>
            <p id="info" class="info-box">Klikněte na část kokpitu pro více informací.</p>
        `;
        addCockpitListeners();
    } else if (section === 'procedures') {
        content.innerHTML = `
            <h2>Procedury</h2>
            <ul>
                <li>
                    <button class="toggle-details">Startovací procedura</button>
                    <p class="details">Kontrola motorů, nastavení FMC, kontrola systémů...</p>
                </li>
                <li>
                    <button class="toggle-details">Přistávací procedura</button>
                    <p class="details">Kontrola klapek, nastavení autopilota, příprava přistání...</p>
                </li>
                <li>
                    <button class="toggle-details">Nouzové přistání</button>
                    <p class="details">Vypnutí motorů, ovládání přetížení, příprava nouzového přistání...</p>
                </li>
            </ul>
        `;
        addProcedureListeners();
    } else if (section === 'checklist') {
        content.innerHTML = `
            <h2>Checklisty</h2>
            <div>
                <ul id="checklist">
                    <li><input type="checkbox" id="item1"> Palivové čerpadlo ON</li>
                    <li><input type="checkbox" id="item2"> Generátor OFF</li>
                    <li><input type="checkbox" id="item3"> Autopilot ON</li>
                </ul>
                <input type="text" id="new-item" placeholder="Přidat novou položku">
                <button onclick="addChecklistItem()">Přidat</button>
            </div>
        `;
        loadChecklistState();
    } else if (section === 'systems') {
        content.innerHTML = `
            <h2>Systémy letadla</h2>
            <div>
                <h3><i class="fas fa-battery-three-quarters"></i> Elektrický systém</h3>
                <p>Zajišťuje napájení všech klíčových systémů letadla.</p>
                <h3><i class="fas fa-water"></i> Hydraulický systém</h3>
                <p>Ovládá klapky, podvozek a další mechanické části letadla.</p>
                <h3><i class="fas fa-tint"></i> Palivový systém</h3>
                <p>Zajišťuje efektivní distribuci paliva do motorů.</p>
            </div>
        `;
    }
}

function addCockpitListeners() {
    const areas = {
        captain: 'Kapitán: Ovládá letadlo a provádí klíčová rozhodnutí.',
        'first-officer': 'První důstojník: Podporuje kapitána a monitoruje systémy.',
        'center-panel': 'Centrální panel: Zobrazuje klíčové informace o letu.',
        'overhead-panel': 'Overhead panel: Obsahuje klíčové spínače a kontrolky.'
    };

    for (const [id, info] of Object.entries(areas)) {
        document.getElementById(id).addEventListener('click', () => displayCockpitInfo(info));
    }
}

function addProcedureListeners() {
    const buttons = document.querySelectorAll('.toggle-details');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });
    });
}

function displayCockpitInfo(info) {
    const infoBox = document.getElementById('info');
    infoBox.textContent = info;
    infoBox.style.backgroundColor = '#d4edda';
    infoBox.style.color = '#155724';
    infoBox.style.border = '1px solid #c3e6cb';
}

function addChecklistItem() {
    const newItemInput = document.getElementById('new-item');
    const newItemText = newItemInput.value.trim();
    if (newItemText) {
        const checklist = document.getElementById('checklist');
        const newItem = document.createElement('li');
        newItem.innerHTML = `<input type="checkbox"> ${newItemText}`;
        checklist.appendChild(newItem);
        newItemInput.value = '';
    }
}

function loadChecklistState() {
    const checklist = document.getElementById('checklist');
    const savedState = JSON.parse(localStorage.getItem('checklistState')) || {};
    Array.from(checklist.querySelectorAll('input[type="checkbox"]')).forEach((checkbox) => {
        checkbox.checked = savedState[checkbox.id] || false;
        checkbox.addEventListener('change', () => {
            savedState[checkbox.id] = checkbox.checked;
            localStorage.setItem('checklistState', JSON.stringify(savedState));
        });
    });
}
