document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getProductInfo' }, function(response) {
            if (response) {
                document.getElementById('product-title').value = response.title;
                document.getElementById('product-description').value = response.description;
                document.getElementById('product-price').value = response.price;
            }
        });
    });

    document.getElementById('close-popup').addEventListener('click', function() {
        window.close();
    });
});