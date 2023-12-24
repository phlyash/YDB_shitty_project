class Product {
    constructor(obj) {
        this.name = obj.name;
        this.amount = obj.amount;
        this.address = obj.store_address;
    }
    print() {
        console.log(this.to_string());
    }
    to_string() {
        return "Name: " + this.name + ", amount: " + this.amount + ", address: " + this.address;
    }
    to_table_entry() {
        return '<tr><td>' +
            this.name + '</td><td>' +
            this.amount + '</td><td>' +
            this.address + '</td></tr>';
    }
}

