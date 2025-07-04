var productPrices = {};

$(function () {
    // Fetch products for order dropdown
    $.get(productListApiUrl, function (response) {
        productPrices = {};
        if (response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function (index, product) {
                options += '<option value="' + product.product_id + '">' + product.name + '</option>';
                productPrices[product.product_id] = product.price_per_unit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

// Add more product rows
$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-total").last().text('0.0');
});

// Remove product row
$(document).on("click", ".remove-row", function () {
    $(this).closest('.row').remove();
    calculateValue();
});

// Update price when product is selected
$(document).on("change", ".cart-product", function () {
    var product_id = $(this).val();
    var price = productPrices[product_id] || 0;

    $(this).closest('.row').find('#product_price').val(price);
    calculateValue();
});

// Recalculate total when quantity changes
$(document).on("change", ".product-qty", function () {
    calculateValue();
});

// Save Order button click
$("#saveOrder").on("click", function () {
    var formData = $("form").serializeArray();
    var requestPayload = {
        customer_name: null,
        grand_total: null,
        order_details: []
    };

    var currentOrderItem = null;

    for (var i = 0; i < formData.length; ++i) {
        var element = formData[i];

        switch (element.name) {
            case 'customerName':
                requestPayload.customer_name = element.value;
                break;
            case 'product_grand_total':
                requestPayload.grand_total = element.value;
                break;
            case 'product':
                currentOrderItem = {
                    product_id: element.value,
                    quantity: null,
                    total_price: null
                };
                requestPayload.order_details.push(currentOrderItem);
                break;
            case 'qty':
                if (currentOrderItem) {
                    currentOrderItem.quantity = element.value;
                }
                break;
            case 'item_total':
                if (currentOrderItem) {
                    currentOrderItem.total_price = element.value;
                }
                break;
        }
    }

    console.log("Final order payload:", requestPayload);

    // Call API with validated object
    callApi("POST", orderSaveApiUrl, requestPayload);
});
