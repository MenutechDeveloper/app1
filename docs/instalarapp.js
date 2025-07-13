// Guarda el evento para mostrar el cuadro de instalación
let deferredPrompt;

// ✅ Espera al DOM para manipular elementos
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  const installContainer = document.getElementById('installContainer');

  // ✅ Ocultar botón si la app ya fue instalada antes
  if (localStorage.getItem('pwaInstalled') === 'true') {
    if (installContainer) installContainer.remove();
    return;
  }

  // ✅ Mostrar botón si el navegador lanza el evento
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
      installBtn.style.display = 'block';
    }
  });

  // ✅ Instalar app al hacer clic
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Instalación aceptada');
          localStorage.setItem('pwaInstalled', 'true');

          if (installContainer) {
            installContainer.remove(); // ✅ Reacomoda el grid
          }
        } else {
          console.log('❌ Instalación rechazada');
        }

        deferredPrompt = null;
      }
    });
  }
});

// ✅ Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado'))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}










