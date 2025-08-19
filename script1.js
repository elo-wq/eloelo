document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const containers = document.querySelectorAll('.image-container');
    const floatingText = document.getElementById('floating-text');
    const textDisplay = document.getElementById('text-display');
    const openImageBtn = document.getElementById('open-image-btn');
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close-btn');
    const resetBtn1 = document.getElementById('reset-btn1');
    const soundBtn = document.getElementById('sound-btn');
    const audio = document.getElementById('audio');
    const clickCounter = document.getElementById('click-counter');
    const toggleImage = document.getElementById('toggleImage');
    const dateDiv = document.getElementById('date');
    const videoButtons = document.querySelectorAll('[id^="video-btn"]');
    const videoModals = document.querySelectorAll('[id^="video-modal"]');
    const videoPlayers = document.querySelectorAll('video');

    let clickCount = 0;

    // Fonction pour positionner les éléments
    function getCenteredPosition() {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const imageWidth = 150;
        const imageHeight = 150;

        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        const radiusX = containerWidth / 2.5;
        const radiusY = containerHeight / 2.5;

        const x = centerX + (Math.random() - 0.5) * radiusX - imageWidth / 2;
        const y = centerY + (Math.random() - 0.5) * radiusY - imageHeight / 2;

        return { x, y };
    }

    // Positionner les images initialement
    function positionImages() {
        containers.forEach(container => {
            const position = getCenteredPosition();
            container.style.position = 'absolute';
            container.style.left = `${position.x}px`;
            container.style.top = `${position.y}px`;
        });
    }

    // Rendre les éléments déplaçables
    function makeDraggable(element) {
        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const shiftX = e.clientX - element.getBoundingClientRect().left;
            const shiftY = e.clientY - element.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                element.style.left = `${pageX - shiftX}px`;
                element.style.top = `${pageY - shiftY}px`;
            };

            const onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY);
            };

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            });
        });

        element.ondragstart = () => false;
    }

    // Positionner et rendre les éléments interactifs
    positionImages();
    containers.forEach(container => makeDraggable(container));
    makeDraggable(floatingText);

    // Texte flottant positionné de manière aléatoire
    const textPosition = getCenteredPosition();
    floatingText.style.position = 'absolute';
    floatingText.style.left = `${textPosition.x}px`;
    floatingText.style.top = `${textPosition.y}px`;

    // Gestion du bouton Son
    let isPlaying = false;
    soundBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            soundBtn.textContent = 'Son';
        } else {
            audio.play();
            soundBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        soundBtn.textContent = 'Son';
    });

    // Modale pour l'image
    openImageBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Gestion des vidéos
    videoButtons.forEach((button, index) => {
        const modal = videoModals[index];
        const video = videoPlayers[index];
        const closeVideoBtn = modal.querySelector('.close-btn');

        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            video.currentTime = 0;
            video.play();
        });

        closeVideoBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            video.pause();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                video.pause();
            }
        });
    });

    // Gestion du compteur de clics
    document.addEventListener('click', () => {
        clickCount++;
        clickCounter.textContent = ` : ${clickCount}`;
    });

    // Réinitialiser les images
    resetBtn1?.addEventListener('click', positionImages);

    // Alterner entre les images
    const images = ['home3.jpg', 'propos2.png', 'home2.jpg', 'home6.jpg'];
    let currentIndex = 0;
    toggleImage?.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % images.length;
        this.src = images[currentIndex];
    });

    // Afficher la date
    if (dateDiv) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateDiv.textContent = `${day}.${month}.${year}`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (le reste de votre code existant)

    // Galerie défilante
    const openImageBtn = document.getElementById('open-image-btn');
    const imageModal = document.getElementById('image-modal');
    const closeBtn = imageModal.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImage = document.getElementById('gallery-image');

    const images = [ 'diapo0.jpg', 'installation2.jpeg', 'diapo3.jpg', 'diapo4.jpg', 'diapo5.jpg']; // Ajoutez vos images ici
    let currentImageIndex = 0;

    function updateImage() {
        galleryImage.src = images[currentImageIndex];
    }

    openImageBtn.addEventListener('click', () => {
        imageModal.style.display = 'flex';
        updateImage();
    });

    closeBtn.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
});

