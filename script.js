// Importar los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvPxUqYiVB6PI6zIrj3945p2x45KZxIK8",
  authDomain: "web-confesions.firebaseapp.com",
  projectId: "web-confesions",
  storageBucket: "web-confesions.appspot.com",
  messagingSenderId: "276709609056",
  appId: "1:276709609056:web:a1625fdd29d28b8dd1fd05"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Manejar el envío de confesiones
document.getElementById('confessionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const confessionText = document.getElementById('confessionText').value;

    if (confessionText.trim()) {
        try {
            await addDoc(collection(db, 'confessions'), {
                confession: confessionText,
                timestamp: serverTimestamp()
            });
            document.getElementById('statusMessage').textContent = "Confesión enviada con éxito.";
            document.getElementById('confessionText').value = ''; // Limpiar el formulario
        } catch (error) {
            document.getElementById('statusMessage').textContent = "Error al enviar la confesión.";
            console.error("Error al enviar la confesión: ", error);
        }
    }
});

// Mostrar confesiones (solo para el administrador)
const isAdmin = true;  // Cambiar a false para ocultar la sección de administrador

if (isAdmin) {
    document.getElementById('adminSection').classList.remove('hidden');

    const q = query(collection(db, 'confessions'), orderBy('timestamp', 'desc'));
    onSnapshot(q, function(snapshot) {
        const confessionList = document.getElementById('confessionList');
        confessionList.innerHTML = ''; // Limpiar la lista

        snapshot.forEach(function(doc) {
            const confession = doc.data().confession;
            const listItem = document.createElement('li');
            listItem.textContent = confession;
            confessionList.appendChild(listItem);
        });
    });
}
