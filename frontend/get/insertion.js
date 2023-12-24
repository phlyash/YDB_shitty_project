counter = 0
loaded_counter = 0
products = null
addresses = null


function addRow() {
    $('#insertion_table').append(`
    <tr>
    <td>
    <select id="product${++counter}">
    
    </select>
    </td>

    <td>
    <input>
    </td>

    <td>
    <select id="address${counter}">
    
    </select>
    </td>
    </tr>
    `)
    loaded_counter++
    if (products == null)
        getSelectRequest(
            {
                "data": "product"
            },
            "product"
        )
    else 
        update_select(products, "product")
    
    if (addresses == null)
        getSelectRequest(
            {
                "data": "address"
            },
            "address"
        )
    else
        update_select(addresses, "address")
}

function getDataFromTable() {
    data = {}
    input = $('#insertion_table').find('input') 
    for(i = 1; i < input.length + 1; i++) {
        data[i.toString()] = {
            'data': 'products',
            'name': $('#product' + i).val(),
            'amount': input[i - 1].value,
            'address': $('#address' + i).val()   
        }
    }
    return data
}

function update_select(data, id) {
    if($('#' + id + (loaded_counter - 1)).val() == null && loaded_counter != 1) {
        loaded_counter--
        update_select(data, id)
    }
    if(data.length > 0)
    {
        for(let i = 0; i < data.length; ++i) {
            let option = new OptionEntry(data[i]);
            $('#' + id + loaded_counter).append(option.to_option_entry());
        }
        $('#' + id + loaded_counter).show();
    } else {
        output_error("Incorrect data received")
    }

    if ($('#' + id + (loaded_counter + 1)).val() == null) loaded_counter++
}

function getSelectRequest(data, select) {
    $.ajax({
        url: yandex_function_url,
        method: 'GET',
        data: data,
        success: function(data){
            switch(select) {
                case 'product':
                    products = JSON.parse(preconvert_json(data))
                    update_select(products, select)
                    break
                case 'address':
                    addresses = JSON.parse(preconvert_json(data))
                    update_select(addresses, select)
                    break
            }
        }
    }).fail(function(data){
        output_error("GET request failed");
    })
}

function postRequestInsertProducts(data) {
    $.ajax({
        url: yandex_function_url + '?data=' + data['data'] + '&name=' + data['name'] + '&amount=' + data['amount'] + '&address=' + data['address'],
        crossDomain: true,
        type: 'post',
    }).done((response) => {
        getRequest(
            {
                "data": "products_list",
                "address": "All"
            },
            update_product_list
        )  
        $("#insertion_table tr").remove()
    });
}

function proccessFormSubmit() {
    data = getDataFromTable()
    for(key in data) {
        postRequestInsertProducts(data[key])
        //idk whats happening with transactions i guess ydb is not using serealizible or something dont want to figure that out so just make proccess some sleep
        sleep(100)
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
