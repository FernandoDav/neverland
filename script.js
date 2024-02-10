// Initialize Firebase
const firebaseConfig = {
            apiKey: "AIzaSyCPI9lrqEh7ayBez4LuP9DLoPEO9amhZ8c",
            authDomain: "neverlard.firebaseapp.com",
            projectId: "neverlard",
            storageBucket: "neverlard.appspot.com",
            messagingSenderId: "450131051308",
            appId: "1:450131051308:web:0f20b8ea3b2ca4b69ba289",
            measurementId: "G-6M1RM7F6KW"
        };
       
        
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        const form = document.getElementById('crud-form'); 
        

        const userList = document.getElementById('user-list');

        db.collection('Bodega').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userId = doc.id;
    
                const userElement = document.createElement('div');
                userElement.innerHTML = `<p>ID: ${userId}, Producto: ${userData.producto}, Precio: ${userData.Precio}</p>`;
    
                userList.appendChild(userElement);
            });
        })
        .catch((error) => {
            console.error("Error getting Bodega: ", error);
        });
        





// Evento de envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const producto = form.producto.value;
    const Precio = form.Precio.value;
    const docId = form['doc-id'].value;

    if (docId) {
        // Actualizar documento existente
        db.collection('Bodega').doc(docId).update({
            producto: producto,
            Precio: parseInt(Precio)
        })
        .then(() => {
            console.log("Document updated successfully");
            form.reset();
            form['doc-id'].value = '';
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    } else {
        // Crear nuevo documento
        db.collection('Bodega').add({
            producto: producto,
            Precio: parseInt(Precio)
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            form.reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
});

// Función para cargar datos de un documento a editar
function loadDocument(docId, producto, Precio) {
    form['doc-id'].value = docId;
    form.producto.value = producto;
    form.Precio.value = Precio;
}

const updateForm = document.getElementById('update-form');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docId = updateForm.querySelector('#update-id').value;
    const newproducto = updateForm.querySelector('#update-producto').value;
    const newPrecio = parseInt(updateForm.querySelector('#update-Precio').value);

    // Actualizar el documento en Firestore
    db.collection('Bodega').doc(docId).update({
        producto: newproducto,
        Precio: newPrecio
    })
    .then(() => {
        console.log("Document successfully updated!");
        updateForm.reset();
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});

const deleteForm = document.getElementById('delete-form');

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docId = deleteForm.querySelector('#delete-id').value;

    // Eliminar el documento en Firestore
    db.collection('Bodega').doc(docId).delete()
    .then(() => {
        console.log("Document successfully deleted!");
        deleteForm.reset();
    })
    .catch((error) => {
        console.error("Error deleting document: ", error);
    });
});



       
        
