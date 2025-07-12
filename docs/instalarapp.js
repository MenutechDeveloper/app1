// Oculta completamente el botón si la app ya está instalada
if (window.matchMedia('(display-mode: standalone)').matches) {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.parentElement.remove(); // Elimina el contenedor <a>
  }
}

// Guarda el evento que permite mostrar el prompt de instalación
let deferredPrompt;

// Escucha cuando el navegador detecta que se puede instalar la app
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita que el navegador muestre el banner automático
  deferredPrompt = e; // Guarda el evento para usarlo más tarde
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block'; // Muestra el botón
  }
});

// Cuando el usuario hace clic en "Instalar App"
document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Muestra el cuadro de instalación
    const choiceResult = await deferredPrompt.userChoice; // Espera la respuesta del usuario

    // Verifica si aceptó o canceló
    if (choiceResult.outcome === 'accepted') {
      console.log('Instalación aceptada');

      // Elimina el botón del DOM para que la grilla se reacomode
      const installBtn = document.getElementById('installBtn');
      if (installBtn) {
        installBtn.parentElement.remove(); // Elimina el <a> que contiene la imagen
      }
    } else {
      console.log('Instalación rechazada');
    }

    // Limpia el evento
    deferredPrompt = null;
  }
});

// Registra el service worker cuando la página termina de cargar
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js') // Usa el archivo sw.js
      .then(reg => console.log('Service Worker registrado'))
      .catch(err => console.error('Error al registrar el Service Worker', err));
  });
}


