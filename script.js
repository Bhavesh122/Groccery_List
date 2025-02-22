document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('groceryForm');
    const groceryList = document.getElementById('groceryList');
    const suggestionBox = document.getElementById('suggestionBox');
    const suggestedItem = document.getElementById('suggestedItem');
    const addSuggestionBtn = document.getElementById('addSuggestion');
    const rejectSuggestionBtn = document.getElementById('rejectSuggestion');
    const voiceInputBtn = document.getElementById('voiceInput');

    // Related item suggestions
    const suggestions = {
        "milk": "cereal",
        "bread": "butter",
        "eggs": "bacon"
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemInput = document.getElementById('itemInput');
        const newItem = itemInput.value.trim().toLowerCase();

        if (newItem !== '') {
            addItem(newItem);
            itemInput.value = '';

            // Check for related item suggestion
            if (suggestions[newItem]) {
                suggestedItem.textContent = suggestions[newItem];
                suggestionBox.classList.remove('hidden');
            }
        }
    });

    function addItem(item) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-name">${item}</span>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(this, -1)">-</button>
                <span class="quantity">1</span>
                <button class="quantity-btn" onclick="changeQuantity(this, 1)">+</button>
            </div>
            <button class="boughtBtn" onclick="toggleBought(this)">Bought</button>
        `;
        groceryList.appendChild(li);
    }

    window.changeQuantity = function(button, change) {
        const quantitySpan = button.parentElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantitySpan.textContent);
        currentQuantity = Math.max(1, currentQuantity + change);
        quantitySpan.textContent = currentQuantity;
    };

    window.toggleBought = function(button) {
        const listItem = button.closest('li');
        const itemName = listItem.querySelector('.item-name');

        if (itemName.classList.contains('bought')) {
            itemName.classList.remove('bought');
            button.textContent = 'Bought';
        } else {
            itemName.classList.add('bought');
            button.textContent = 'Brought';
        }
    };

    addSuggestionBtn.addEventListener('click', function() {
        addItem(suggestedItem.textContent);
        suggestionBox.classList.add('hidden');
    });

    rejectSuggestionBtn.addEventListener('click', function() {
        suggestionBox.classList.add('hidden');
    });

    // Voice Input
    voiceInputBtn.addEventListener('click', function() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.start();
        recognition.onresult = function(event) {
            document.getElementById('itemInput').value = event.results[0][0].transcript;
        };
    });
});
