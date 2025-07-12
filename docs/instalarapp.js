// ✅ Clave única por restaurante
const restaurantKey = typeof window.restaurantId === 'string'
  ? 'pwaInstalled_' + window.restaurantId
  : 'pwaInstalled_global';

// ✅ Si ya está instalada (solo esta app), eliminamos el botón
if (localStorage.getItem(restaurantKey) === 'true') {
  document.addEventListener('DOMContentLoaded', () => {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
      installContainer.remove(); // Elimina el <a> para que el grid se reacomode
    }
  });
}

// Guarda el evento para mostrar el cuadro de instalación
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita el banner automático
  deferredPrompt = e;

  // ✅ Solo muestra el botón si esta app no está instalada
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
          console.log('✅ Instalación aceptada');
          localStorage.setItem(restaurantKey, 'true');

          const installContainer = document.getElementById('installContainer');
          if (installContainer) {
            installContainer.remove();
          }
        } else {
          console.log('❌ Instalación rechazada');
        }

        deferredPrompt = null;
      }
    });
  }
});

// ✅ Registra el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado'))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}








