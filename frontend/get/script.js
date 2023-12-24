function preconvert_json(string) {
    return string.split('\'').join("\"").split('b\"').join("\"").split('None').join('null');
}

function update_product_list(data) 
{
    $("#product_table td").parent().remove();
    let received_products = JSON.parse(preconvert_json(data));
    if(received_products.length > 0)
    {
        for(let i = 0; i < received_products.length; ++i) {
            let product = new Product(received_products[i]);
            $('#product_table tr:last').after(product.to_table_entry());
        }
        $("#product_table").show();
    } else {
        output_error("Incorrect data received")
    }
}

function update_store_list(data) 
{
    $('categories').parent().remove();
    let received_stores = JSON.parse(preconvert_json(data));
    
    if(received_stores.length > 0)
    {
        for(let i = 0; i < received_stores.length; ++i) {
            let store = new Store(received_stores[i]);
            $('#categories').append(store.to_option_entry());
        }
        $("#categories").show();
    } else {
        output_error("Incorrect data received")
    }
}

function output_error(message, timeout = 2000) 
{
    $('.error_message').show();
    $('.error_message').text(message);
    setTimeout(function() {
        $('.error_message').hide();
    }, timeout);
}

function getRequest(data, successFunction) {
    $.ajax({
        url: yandex_function_url,
        method: 'GET',
        data: data,
        success: function(data){ 
            successFunction(data)   
        }
    }).fail(function(data){
        output_error("GET request failed");
    })
}
