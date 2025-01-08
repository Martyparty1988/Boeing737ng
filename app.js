// Načítání detailů kokpitu s obrázky
const clickableAreas = document.querySelectorAll('.cockpit-area');
const detailBox = document.getElementById('cockpit-detail');
const detailImage = detailBox.querySelector('.detail-image');
const detailText = detailBox.querySelector('.detail-text');
const closeBtn = detailBox.querySelector('[data-close]');

clickableAreas.forEach(area => {
  area.addEventListener('click', () => {
    const areaName = area.dataset.area;
    let popis = "";
    let obrazek = "";

    switch (areaName) {
      case "overhead":
        popis = "Overhead panel obsahuje přepínače pro elektrické, palivové a hydraulické systémy.";
        obrazek = "https://upload.wikimedia.org/wikipedia/commons/8/86/Boeing_737-800_Overhead_Panel.jpg";
        break;
      case "captain":
        popis = "Stanoviště kapitána zahrnuje hlavní letové displeje a FMC.";
        obrazek = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Boeing_737-800_interior_cockpit.jpg";
        break;
      case "central":
        popis = "Centrální panel obsahuje rádia, navigační panely a další ukazatele.";
        obrazek = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Boeing_737_Central_Panel.jpg";
        break;
      case "fo":
        popis = "Stanoviště prvního důstojníka zrcadlí stanoviště kapitána.";
        obrazek = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Boeing_737-800_copilot_seat.jpg";
        break;
      default:
        popis = "Neznámá oblast kokpitu.";
    }

    detailText.textContent = popis;
    if (obrazek) {
      detailImage.src = obrazek;
      detailImage.hidden = false;
    } else {
      detailImage.hidden = true;
    }
    detailBox.hidden = false;
  });
});

// Zavření detailního okna
closeBtn.addEventListener('click', () => {
  detailBox.hidden = true;
});