// public/script.js
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { logAction } from '../logger.js';

// Add Event (Admin Panel)
const addBtn = document.getElementById("addEventBtn");
if (addBtn) {
  addBtn.addEventListener("click", async () => {
    const name = document.getElementById("eventName").value;
    const category = document.getElementById("category").value;
    const city = document.getElementById("city").value;
    const area = document.getElementById("area").value;
    const time = document.getElementById("eventTime").value;

    if (!name || !category || !city || !area || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        name,
        category,
        city,
        area,
        time
      });
      logAction("Event Added", name);
      alert("Event added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error adding event: " + error);
    }
  });
}

// Fetch Events (User or Admin)
const eventList = document.getElementById("eventsList") || document.getElementById("adminEventList");
if (eventList) {
  const eventsSnapshot = await getDocs(collection(db, "events"));
  eventsSnapshot.forEach((docSnap) => {
    const event = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${event.name} - ${event.category} - ${event.city}, ${event.area} @ ${new Date(event.time).toLocaleString()}`;
    eventList.appendChild(li);
  });
}
