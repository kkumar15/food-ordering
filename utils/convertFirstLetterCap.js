// adding a prototype to make it a build in function of string
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}