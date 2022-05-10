// Thank you w3 schools
// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchFiltering() {
    // Declare variables
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('search-item');
    filter = input.value.toUpperCase();
    ul = document.getElementById("item-list");
    li = ul.getElementsByTagName('li');
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

async function showLoc(item) {
    window.location.href = "item.html?item=" + item;
}