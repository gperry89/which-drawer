function goBack() {
    window.location.href = "index.html"
}
function displayImage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let objects = localStorage.getItem("objects")
        ? JSON.parse(localStorage.getItem("objects"))
        : [];
    if (objects.length != 0) {
        const item = urlParams.get('item')
        const url = objects[item]

        imageView = document.getElementById("item-img-div");
        var img = document.createElement("img");
        img.src = url;
        if (imageView != null) {
            imageView.appendChild(img);
        }
    }
}

function addListeners() {
    back_btn = document.getElementById('back-btn')
    if (back_btn != null) {
        back_btn.addEventListener('click', goBack)
    }
}

displayImage()
addListeners()