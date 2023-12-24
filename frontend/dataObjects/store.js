class Store {
    constructor(obj) {
        this.address = obj.address;
    }
    print() {
        console.log(this.to_string());
    }
    to_string() {
        return "Address: " + this.address;
    }
    to_option_entry() {
        return '<option value=\"' + this.address + '\">' +
        this.address + '</option>';
    }
}

