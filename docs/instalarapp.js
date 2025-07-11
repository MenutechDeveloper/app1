// Guarda el evento que permite mostrar el prompt de instalación
let deferredPrompt;

// Escucha cuando el navegador detecta que se puede instalar la app
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita que el navegador muestre el banner automático
  deferredPrompt = e; // Guarda el evento para usarlo más tarde
  document.getElementById('installBtn').style.display = 'block'; // Muestra el botón
});

// Cuando el usuario hace clic en "Instalar App"
document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Muestra el cuadro de instalación
    const choiceResult = await deferredPrompt.userChoice; // Espera la respuesta del usuario

    // Verifica si aceptó o canceló
    if (choiceResult.outcome === 'accepted') {
      console.log('Instalación aceptada');
    } else {
      console.log('Instalación rechazada');
    }

    // Limpia el evento y oculta el botón
    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
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

