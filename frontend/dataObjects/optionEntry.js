class OptionEntry {
    constructor(obj) {
        this.id = obj.id
        this.data = obj.data
    }
    to_option_entry() {
        return `
        <option value=\"` + this.id + `\">` + this.data + `</option>
        `
    }
}