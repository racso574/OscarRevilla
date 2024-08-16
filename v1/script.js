let currentPageIndex = 0;
const pages = ['index.html', 'about.html', 'projects.html', 'links.html'];
let isScrolling = false;
let scrollTimeout;

function handleScroll(event) {
    if (isScrolling) return; // Evitar múltiples desplazamientos en proceso

    clearTimeout(scrollTimeout); // Limpiar cualquier temporizador existente

    // Determinar si el desplazamiento es hacia arriba o hacia abajo
    if (event.deltaY < 0) {
        currentPageIndex = Math.max(0, currentPageIndex - 1);
    } else {
        currentPageIndex = Math.min(pages.length - 1, currentPageIndex + 1);
    }

    window.location.href = pages[currentPageIndex];
    isScrolling = true; // Establecer el estado de desplazamiento

    // Establecer un tiempo de espera más largo para que el cambio de página sea más lento
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 1000); // Incrementa el tiempo a 1000ms o más según lo lento que lo desees
}

// Detecta si el evento de desplazamiento proviene de un trackpad o mouse
function adjustScrollSensitivity(event) {
    if (event.deltaMode === 0) {
        // trackpad
        handleScroll(event);
    } else if (event.deltaMode === 1) {
        // mouse
        handleScroll({ deltaY: event.deltaY * 10 }); // Ajusta la sensibilidad para ratón
    }
}

window.addEventListener('wheel', adjustScrollSensitivity);

const currentPath = window.location.pathname.split('/').pop();
currentPageIndex = pages.indexOf(currentPath);
