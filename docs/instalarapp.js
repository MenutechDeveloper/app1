// Asegúrate de que restaurantId exista
const restaurantKey = restaurantId ? 'pwaInstalled_' + restaurantId : 'pwaInstalled_global';

// Elimina el botón si ya se instaló esta app o si estamos en modo standalone
if (localStorage.getItem(restaurantKey) === 'true' || window.matchMedia('(display-mode: standalone)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
      installContainer.remove();
    }
  });
}

// Guarda el evento que permite mostrar el prompt de instalación
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (!localStorage.getItem(restaurantKey)) {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
      installBtn.style.display = 'block';
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('Instalación aceptada');
          localStorage.setItem(restaurantKey, 'true');

          const installContainer = document.getElementById('installContainer');
          if (installContainer) {
            installContainer.remove();
          }
        } else {
          console.log('Instalación rechazada');
        }

        deferredPrompt = null;
      }
    });
  }
});

// Registra el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado'))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}






