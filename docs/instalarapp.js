// Elimina el contenedor si ya se instaló la app previamente o si estamos en modo standalone
if (localStorage.getItem('pwaInstalled') === 'true' || window.matchMedia('(display-mode: standalone)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
      installContainer.remove(); // Elimina el <a> para que el grid se recorra
    }
  });
}

// Guarda el evento que permite mostrar el prompt de instalación
let deferredPrompt;

// Escucha cuando el navegador detecta que se puede instalar la app
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita que el navegador muestre el banner automático
  deferredPrompt = e; // Guarda el evento para usarlo más tarde

  // Solo muestra el botón si no está marcado como instalado
  if (!localStorage.getItem('pwaInstalled')) {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
      installBtn.style.display = 'block'; // Muestra el botón de instalación
    }
  }
});

// Maneja clic en el botón de instalación
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt(); // Muestra el prompt
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('Instalación aceptada');

          // Marca como instalada en localStorage
          localStorage.setItem('pwaInstalled', 'true');

          // Elimina el contenedor
          const installContainer = document.getElementById('installContainer');
          if (installContainer) {
            installContainer.remove();
          }
        } else {
          console.log('Instalación rechazada');
        }

        deferredPrompt = null; // Limpia el evento
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




