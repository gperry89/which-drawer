// https://firebase.google.com/docs/web/setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getStorage, ref, getDownloadURL, listAll, getMetadata } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
    apiKey: ' AIzaSyB6y_JrkR6xCJW8MVXk5Xz7aVWHF2IOlYg ',
    databaseURL: 'https://which-drawer-default-rtdb.firebaseio.com',
    storageBucket: 'which-drawer.appspot.com'
};

// Create a reference with an initial file path and name
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage, 'gs://which-drawer.appspot.com/');
const itemList = document.getElementById("item-list");

// Now we get the references of these images
function loadFiles() {
    let files = {}
    listAll(storageRef).then(function (result) {
        result.items.forEach(function (imageRef) {
            getDownloadURL(imageRef)
                .then((url) => {
                    getMetadata(imageRef)
                        .then((metadata) => {
                            let newListItem = document.createElement("li");
                            let display = metadata.customMetadata.Display
                            let itemName = document.createTextNode(display);
                            newListItem.appendChild(itemName);
                            newListItem.addEventListener('click', function(){ showLoc(display); });
                            itemList.appendChild(newListItem);
                            files[display] = url
                            localStorage.setItem('objects', JSON.stringify(files))
                        })
                        .catch((error) => {
                            console.log("Metadata error.")
                        });
                })
                .catch((error) => {
                    console.log("Kitchen's closed.")
                });
        });
    }).catch(function (error) {
        console.log("Kitchen's closed.")
    });
}

const auth = getAuth(firebaseApp);
signInAnonymously(auth)
    .then(() => {
        const objects = localStorage.getItem("objects")
            ? JSON.parse(localStorage.getItem("objects"))
            : [];

        if (objects.length == undefined || objects == 0) { loadFiles() }
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Kitchen's closed")
    });