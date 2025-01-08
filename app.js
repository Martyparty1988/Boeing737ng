// Jednoduchý skript pro interaktivní akce

// 1) Otevření detailu kokpitu po kliknutí
const clickableAreas = document.querySelectorAll('.cockpit-area');
const detailBox = document.getElementById('cockpit-detail');
const detailText = detailBox.querySelector('.detail-text');
const closeBtn = detailBox.querySelector('[data-close]');

clickableAreas.forEach(area => {
  area.addEventListener('click', () => {
    const areaName = area.dataset.area;
    let popis = "";

    switch(areaName) {
      case "overhead":
        popis = "Overhead panel obsahuje přepínače pro elektrické, palivové a hydraulické systémy, světla a další.";
        break;
      case "captain":
        popis = "Stanoviště kapitána zahrnuje hlavní letové displeje (PFD, ND), primární řízení a FMC.";
        break;
      case "fo":
        popis = "Stanoviště prvního důstojníka je zrcadlem kapitánova, obsahuje duální přístroje a záložní systémy.";
        break;
      case "central":
        popis = "Centrální panel obsahuje rádia, navigační panely, EICAS displej (spodní část) a další důležité ukazatele.";
        break;
      default:
        popis = "Neznámá oblast kokpitu.";
    }

    detailText.textContent = popis;
    detailBox.hidden = false;
  });
});

// Zavření detailu kokpitu
closeBtn.addEventListener('click', () => {
  detailBox.hidden = true;
});

// 2) Toggly pro ovládací prvky a systémy
const toggleButtons = document.querySelectorAll('[data-toggle]');
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sectionToToggle = btn.getAttribute('data-toggle');
    let content = null;

    if (sectionToToggle === 'controls') {
      content = document.getElementById('controls-details');
    } else if (sectionToToggle === 'systems') {
      content = document.getElementById('systems-details');
    }

    if (content) {
      content.hidden = !content.hidden;
      btn.textContent = content.hidden 
        ? "Zobrazit podrobnosti"
        : "Skrýt podrobnosti";
    }
  });
});

// 3) Checkboxy pro checklisty
const checklistInputs = document.querySelectorAll('input[type="checkbox"][data-checklist]');
checklistInputs.forEach(input => {
  input.addEventListener('change', () => {
    // Pouze příklad – v reálné aplikaci byste ukládali stav do localStorage a podobně
    if (input.checked) {
      console.log(`Položka (${input.dataset.checklist}) splněna`);
    } else {
      console.log(`Položka (${input.dataset.checklist}) je znovu aktivní`);
    }
  });
});