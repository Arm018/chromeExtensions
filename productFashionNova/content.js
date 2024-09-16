$(document).ready(function () {
    var productTitle = $('.product-info__title');

    if (productTitle.length) {
        productTitle.css('cssText', 'color: red !important;');
    }
});
