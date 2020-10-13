// jshint esversion:6


module.exports = empty

function empty() {
    var x;
    x = document.getElementById("name").value;
    if (x === "") {
        alert("Enter a Valid Roll Number");
        return false;
    };
}