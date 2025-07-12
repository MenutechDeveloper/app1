// ✅ Clave única por restaurante
const restaurantKey = typeof window.restaurantId === 'string'
  ? 'pwaInstalled_' + window.restaurantId
  : 'pwaInstalled_global';

// Guarda el evento para mostrar el cuadro de instalación
let deferredPrompt;

// ✅ Siempre espera al DOM antes de modificar el botón o eliminarlo
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  const installContainer = document.getElementById('installContainer');

  // ✅ Si ya fue instalada esta app específica, elimina el botón
  if (localStorage.getItem(restaurantKey) === 'true') {
    if (installContainer) installContainer.remove();
    return; // Salir para no seguir mostrando ni activando el botón
  }

  // ✅ Escuchar el evento de instalación
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Mostrar el botón solo si no se ha instalado aún esta app
    if (installBtn) installBtn.style.display = 'block';
  });

  // ✅ Click en el botón para lanzar instalación
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Instalación aceptada');
          localStorage.setItem(restaurantKey, 'true');
          if (installContainer) installContainer.remove();
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









