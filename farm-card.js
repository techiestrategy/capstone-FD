document.addEventListener('DOMContentLoaded', () => {
    const farmCards = document.querySelectorAll('.farm-card');
    let currentIndex = 0;

    // Function to update card classes based on current index
    function updateCardDisplay() {
        farmCards.forEach((card, index) => {
            card.classList.remove('active', 'next', 'last');
            card.style.transform = ''; // Reset transform
            card.style.opacity = ''; // Reset opacity
            card.style.zIndex = ''; // Reset z-index

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex + 1) % farmCards.length) {
                card.classList.add('next');
            } else if (index === (currentIndex + 2) % farmCards.length) {
                card.classList.add('last');
            }
            // For more than 3 cards, you'd add more 'else if' or a loop for stacking
        });

        // Manually adjust z-index to ensure active is on top, then next, then last
        farmCards[currentIndex].style.zIndex = '3';
        farmCards[(currentIndex + 1) % farmCards.length].style.zIndex = '2';
        farmCards[(currentIndex + 2) % farmCards.length].style.zIndex = '1';
        // If you have more cards, the ones not shown should have lower z-index and be translated further out or display: none
        for (let i = 0; i < farmCards.length; i++) {
            if (i !== currentIndex && i !== (currentIndex + 1) % farmCards.length && i !== (currentIndex + 2) % farmCards.length) {
                 farmCards[i].style.transform = 'translateX(200%) scale(0.8)'; // Move far out
                 farmCards[i].style.opacity = '0';
                 farmCards[i].style.zIndex = '0';
                 farmCards[i].style.pointerEvents = 'none';
            }
        }
    }

    // Function to show the next card
    function showNextCard() {
        currentIndex = (currentIndex + 1) % farmCards.length;
        updateCardDisplay();
    }

    // Add click listener to the farm-cards-container for event delegation
    // This allows us to check what was actually clicked inside the card
    document.querySelector('.farm-cards-container').addEventListener('click', (event) => {
        const clickedElement = event.target;
        const clickedCard = clickedElement.closest('.farm-card'); // Find the parent farm-card

        if (clickedCard && clickedCard.classList.contains('active')) {
            // Check if the click originated from the dropdown or its children
            const isDropdownClick = clickedElement.closest('.dropdown') || clickedElement.tagName === 'SELECT';

            // Check if the click originated from the 'More Details' button
            const isMoreDetailsButtonClick = clickedElement.classList.contains('more-details-btn');

            if (isDropdownClick) {
                // Do nothing, prevent card switch
                event.stopPropagation(); // Stop the event from bubbling up to the card's click handler
                return;
            } else if (isMoreDetailsButtonClick) {
                // Navigate to a new page
                const targetPage = clickedElement.dataset.href; // Get the URL from data-href
                if (targetPage) {
                    window.location.href = targetPage; // Navigate to the new page
                }
                event.stopPropagation(); // Prevent card from switching as well
                return;
            } else {
                // If it's a click on the active card but not on dropdown or button, then switch card
                showNextCard();
            }
        }
    });

    // Initial display
    updateCardDisplay();
});