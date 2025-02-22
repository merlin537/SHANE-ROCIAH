const imageGrid = document.getElementById("imageGrid");
const uploadInput = document.getElementById("uploadInput");
let images = [];

function uploadImages() {
    const files = uploadInput.files;
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const url = URL.createObjectURL(file);
            images.push(url);
            displayImages();
        });
    }
}

function displayImages() {
    imageGrid.innerHTML = "";
    images.forEach((src, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.setAttribute("data-index", index);
        imageGrid.appendChild(imgElement);
    });
}

function deleteImage() {
    if (images.length > 0) {
        images.pop();
        displayImages();
    }
}

document.addEventListener("DOMContentLoaded", displayImages);
