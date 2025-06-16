document.addEventListener('DOMContentLoaded', () => {
    // --- Overlapping Farm Cards Logic ---
    const farmCards = document.querySelectorAll('.farm-card');
    let currentIndex = 0;

    function updateCardDisplay() {
        farmCards.forEach((card, index) => {
            card.classList.remove('active', 'next', 'last');
            card.style.transform = '';
            card.style.opacity = '';
            card.style.zIndex = '';

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex + 1) % farmCards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex + 2) % farmCards.length) {
                card.classList.add('last');
            }
        });

        farmCards[currentIndex].style.zIndex = '3';
        farmCards[(currentIndex + 1) % farmCards.length].style.zIndex = '2';
        farmCards[(currentIndex + 2) % farmCards.length].style.zIndex = '1';

        for (let i = 0; i < farmCards.length; i++) {
            if (i !== currentIndex && i !== (currentIndex + 1) % farmCards.length && i !== (currentIndex + 2) % farmCards.length) {
                 farmCards[i].style.transform = 'translateX(200%) scale(0.8)';
                 farmCards[i].style.opacity = '0';
                 farmCards[i].style.zIndex = '0';
                 farmCards[i].style.pointerEvents = 'none';
            }
        }
    }

    function showNextCard() {
        currentIndex = (currentIndex + 1) % farmCards.length;
        updateCardDisplay();
    }

    const farmCardsContainer = document.querySelector('.farm-cards-container');
    if (farmCardsContainer) {
        farmCardsContainer.addEventListener('click', (event) => {
            const clickedElement = event.target;
            const clickedCard = clickedElement.closest('.farm-card');

            if (clickedCard && clickedCard.classList.contains('active')) {
                const isDropdownClick = clickedElement.closest('.dropdown') || clickedElement.tagName === 'SELECT';
                const isMoreDetailsButtonClick = clickedElement.classList.contains('more-details-btn');

                if (isDropdownClick) {
                    event.stopPropagation();
                    return;
                } else if (isMoreDetailsButtonClick) {
                    const targetPage = clickedElement.dataset.href;
                    if (targetPage) {
                        window.location.href = targetPage;
                    }
                    event.stopPropagation();
                    return;
                } else {
                    showNextCard();
                }
            }
        });
    }

    updateCardDisplay();


    // --- Global Panel & Overlay Logic ---
    const sidebar = document.querySelector('.sidebar');
    const notificationPanel = document.querySelector('.notification-panel');
    const userProfilePanel = document.querySelector('.user-profile-panel');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Function to close all panels
    function closeAllPanels() {
        sidebar.classList.remove('active');
        notificationPanel.classList.remove('active');
        userProfilePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Toggle Sidebar
    const menuToggleIcon = document.querySelector('.menu-toggle-icon');
    if (menuToggleIcon && sidebar) {
        menuToggleIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent immediate closing from body/overlay click
            if (!sidebar.classList.contains('active')) { // If sidebar is not active, close others first
                closeAllPanels();
            }
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Toggle Notification Panel
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon && notificationPanel) {
        notificationIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!notificationPanel.classList.contains('active')) { // If notification panel is not active, close others first
                closeAllPanels();
            }
            notificationPanel.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Toggle User Profile Panel
    const userProfileIcon = document.querySelector('.user-profile-icon');
    if (userProfileIcon && userProfilePanel) {
        userProfileIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!userProfilePanel.classList.contains('active')) { // If user profile panel is not active, close others first
                closeAllPanels();
            }
            userProfilePanel.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close panels when clicking on overlay
    overlay.addEventListener('click', closeAllPanels);

    // Close panels when clicking on close buttons inside them
    document.querySelectorAll('.close-panel-btn').forEach(button => {
        button.addEventListener('click', closeAllPanels);
    });

    // Close sidebar (only) when clicking a link inside it (for mobile view)
    const sidebarLinks = document.querySelectorAll('.sidebar .main-nav a, .sidebar .logout');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) { // Apply only for mobile breakpoint
                closeAllPanels(); // Use closeAllPanels to ensure overlay and no-scroll are removed
            }
        });
    });


    // --- Active Alerts "Done" button functionality ---
    const alertButtons = document.querySelectorAll('.alert-item button');
    alertButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const alertItem = event.target.closest('.alert-item');
            if (alertItem) {
                alertItem.style.opacity = '0.5';
                alertItem.style.textDecoration = 'line-through';
                event.target.textContent = 'Completed';
                event.target.disabled = true;
                event.target.style.backgroundColor = '#ccc';
                event.target.style.color = '#777';
            }
        });
    });
});

// Add a global CSS class for no-scroll on body
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    body.no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(styleSheet);