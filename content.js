let borderLightActive = false;
let borderElement = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'activateRingLight') {
    if (!borderLightActive) {
      createBorderLight();
      borderLightActive = true;
    }
  } else if (request.action === 'updateSettings') {
    updateBorderLight();
  }
});

function createBorderLight() {
  borderElement = document.createElement('div');
  borderElement.id = 'border-ring-light';
  borderElement.innerHTML = `
    <div class="border-top"></div>
    <div class="border-bottom"></div>
    <div class="border-left"></div>
    <div class="border-right"></div>
    <div class="ambient-glow"></div>
  `;
  
  document.body.appendChild(borderElement);
  updateBorderLight();
}

function updateBorderLight() {
  chrome.storage.sync.get(['brightness', 'temperature', 'size'], (data) => {
    const brightness = data.brightness || 80;
    const temperature = data.temperature || 50;
    const size = data.size || 60;
    
    const r = Math.round(200 + (temperature * 0.55));
    const g = Math.round(220 - (temperature * 0.2));
    const b = Math.round(255 - (temperature * 1.55));
    const color = `rgba(${r}, ${g}, ${b}, 1)`;
    
    const borderSize = Math.round((size / 100) * 120 + 60); 
    const blurSize = Math.round((size / 100) * 15 + 8); // adjusted for better effect
    const opacity = (brightness / 100) * 0.85;
    
    document.documentElement.style.setProperty('--light-color', color);
    document.documentElement.style.setProperty('--light-rgb', `${r}, ${g}, ${b}`);
    document.documentElement.style.setProperty('--border-size', `${borderSize}px`);
    document.documentElement.style.setProperty('--blur-size', `${blurSize}px`);
    document.documentElement.style.setProperty('--opacity', opacity);
  });
}