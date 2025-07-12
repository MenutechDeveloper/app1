// Elimina el botón si la app ya está instalada, lo antes posible
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    const installContainer = document.getElementById('installContainer');
    if (installContainer) {
      installContainer.remove(); // Elimina el <a> entero para que la grilla se reacomode
    }
  });
}

// Guarda el evento que permite mostrar el prompt de instalación
let deferredPrompt;

// Escucha cuando el navegador detecta que se puede instalar la app
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita que el navegador muestre el banner automático
  deferredPrompt = e; // Guarda el evento para usarlo más tarde

  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block'; // Muestra el botón de instalación
  }
});

// Cuando el usuario hace clic en "Instalar App"
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt(); // Muestra el cuadro de instalación
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('Instalación aceptada');

          // Elimina el contenedor del botón
          const installContainer = document.getElementById('installContainer');
          if (installContainer) {
            installContainer.remove();
          }
        } else {
          console.log('Instalación rechazada');
        }

        // Limpia el evento
        deferredPrompt = null;
      }
    });
  }
});

// Registra el service worker al cargar la página
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado'))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}



