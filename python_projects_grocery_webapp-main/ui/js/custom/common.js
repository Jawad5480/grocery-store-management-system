// Define your API URLs here
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var uomListApiUrl = 'http://127.0.0.1:5000/getUOM';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';
var loginApiUrl = 'http://127.0.0.1:5000/login';

// General API call function with JSON handling
function callApi(method, url, data, onSuccess, onFailure) {
    console.log("Calling API:", method, url, data);

    $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json"
    }).done(function(response) {
        console.log("API call successful:", response);
        if (onSuccess) onSuccess(response);
        else window.location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("API call failed:", textStatus, errorThrown, jqXHR.responseText);
        alert("API call failed: " + textStatus);
        if (onFailure) onFailure(jqXHR);
    });
}

// Login function example
function loginUser() {
    var username = $("#username").val();
    var password = $("#password").val();

    var payload = {
        username: username,
        password: password
    };

    callApi("POST", loginApiUrl, payload, function(response){
        alert(response.message);
        if(response.status === "success"){
            window.location.href = "index.html"; // redirect to home page after successful login
        }
    }, function(error){
        alert("Login failed. Check console for details.");
    });
}

// Calculate grand total for orders
function calculateValue() {
    var total = 0;
    $(".product-item").each(function() {
        var qty = parseFloat($(this).find('.product-qty').val()) || 0;
        var price = parseFloat($(this).find('#product_price').val()) || 0;
        var itemTotal = price * qty;

        $(this).find('#item_total').val(itemTotal.toFixed(2));
        total += itemTotal;
    });

    $("#product_grand_total").val(total.toFixed(2));
}
