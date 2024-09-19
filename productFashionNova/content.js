$(document).ready(function() {
    var button = $('<button id="show-popup">Add</button>').css({
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px',
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    });

    $('body').append(button);

    var popup = $(
        '<div id="product-popup" style="display:none;">' +
        '<div class="popup-content">' +
        '<h2>Product Info</h2>' +
        '<label>Title: ' +
        '   <input type="text" id="product-title" style="width: 450px !important;" />' +
        '</label><br><br>' +
        '<label for="product-description">Description:</label>' +
            '<textarea id="product-description" style="width: 450px !important;height: 250px !important;"></textarea>' +
        '<label>Price: ' +
        '   <input type="text" id="product-price" />' +
        '</label><br>' +
        '<button id="close-popup" style="margin-top: 50px !important;">Close</button>' +
        '</div>' +
        '</div>'
    ).css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '2px solid #ccc',
        padding: '20px',
        zIndex: 1001,
        display: 'none',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        width: '600px',
        height: '300px',
        overflow: 'auto'
    });


    $('body').append(popup);

    $('#show-popup').on('click', function() {
        var productTitle = $('.product-info__title').text();
        var productDescription = $('.product-info__details-body').text().trim();
        var productPrice = $('.product-info__price').text();

        $('#product-title').val(productTitle);
        $('#product-description').val(productDescription);
        $('#product-price').val(productPrice);

        $('#product-popup').show();
    });


    $('#close-popup').on('click', function() {
        $('#product-popup').hide();
    });
});
