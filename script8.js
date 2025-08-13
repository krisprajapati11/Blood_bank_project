



// // Function to calculate distance using Haversine formula
// function getDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
// }

// // Function to get user's location and find nearest centers within 50km
// function findNearbyCenters() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const userLat = position.coords.latitude;
//             const userLon = position.coords.longitude;

//             // Filter centers within a 50km radius
//             let nearbyCenters = bloodCenters
//                 .map(center => ({
//                     ...center,
//                     distance: getDistance(userLat, userLon, center.latitude, center.longitude)
//                 }))
//                 .filter(center => center.distance <= 50) // Only centers within 50km
//                 .sort((a, b) => a.distance - b.distance); // Sort by distance

//             // Display filtered centers
//             displayCenters(nearbyCenters);
//         }, error => {
//             alert("Unable to retrieve location. Please enable location services.");
//         });
//     } else {
//         alert("Geolocation is not supported by your browser.");
//     }
// }

// // Function to display centers
// function displayCenters(centers) {
//     const centersListDiv = document.getElementById("donation-centers-list");
//     centersListDiv.innerHTML = ""; // Clear previous results

//     if (centers.length === 0) {
//         centersListDiv.innerHTML = `<p class="no-centers">No centers found within 50km.</p>`;
//         return;
//     }

//     centers.forEach(center => {
//         let centerDiv = document.createElement("div");
//         centerDiv.classList.add("center-item");
//         centerDiv.innerHTML = `
//             <h3>${center.name}</h3>
//             <p>${center.address}</p>
//             <p>Distance: ${center.distance.toFixed(2)} km</p>
//             <p>Phone: ${center.phone || "N/A"}</p>
//             <button class="book-slot-btn" onclick="showBookingSlots('${center.name}')">Book Slots Now</button>
//         `;
//         centersListDiv.appendChild(centerDiv);
//     });
// }

// // Function to show available booking slots
// function showBookingSlots(centerName) {
//     const modal = document.createElement("div");
//     modal.classList.add("modal");

//     // Generate random available slots
//     let slots = generateTimeSlots();

//     let slotsHTML = slots.map(slot =>
//         `<button class="slot-btn" onclick="confirmBooking('${centerName}', '${slot}')">${slot}</button>`
//     ).join("");

//     modal.innerHTML = `
//         <div class="modal-content">
//             <h2>Select a Time Slot at ${centerName}</h2>
//             <div class="slots-container">${slotsHTML}</div>
//             <button class="close-btn" onclick="closeModal()">Close</button>
//         </div>
//     `;

//     document.body.appendChild(modal);
// }

// // Function to generate random time slots
// function generateTimeSlots() {
//     return [
//         "10:00 AM - 10:30 AM",
//         "11:00 AM - 11:30 AM",
//         "12:00 PM - 12:30 PM",
//         "02:00 PM - 02:30 PM",
//         "03:30 PM - 04:00 PM",
//         "05:00 PM - 05:30 PM"
//     ];
// }

// // Function to confirm booking
// function confirmBooking(centerName, timeSlot) {
//     closeModal();

//     const confirmationDiv = document.createElement("div");
//     confirmationDiv.classList.add("confirmation-message");
//     confirmationDiv.innerHTML = `
//         <h2>Booking Confirmed!</h2>
//         <p>Your slot at <strong>${centerName}</strong> is booked for <strong>${timeSlot}</strong>.</p>
        
//         <!-- Form with a submit button -->
//         <form action="index.html" method="GET">
//             <button type="submit" class="done-btn">Done</button>
//         </form>
//     `;

//     document.body.appendChild(confirmationDiv);
// }

// // Function to close modal
// function closeModal() {
//     const modal = document.querySelector(".modal");
//     if (modal) modal.remove();
// }

// // Add event listener to button for finding locations
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("find-locations-button").addEventListener("click", findNearbyCenters);
// });




// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to get user's location and find nearest centers within 50km
function findNearbyCenters() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            // Filter centers within a 50km radius
            let nearbyCenters = bloodCenters
                .map(center => ({
                    ...center,
                    distance: getDistance(userLat, userLon, center.latitude, center.longitude)
                }))
                .filter(center => center.distance <= 50) // Only centers within 50km
                .sort((a, b) => a.distance - b.distance); // Sort by distance

            // Display filtered centers
            displayCenters(nearbyCenters);
        }, error => {
            alert("Unable to retrieve location. Please enable location services.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to display centers
function displayCenters(centers) {
    const centersListDiv = document.getElementById("donation-centers-list");
    centersListDiv.innerHTML = ""; // Clear previous results

    if (centers.length === 0) {
        centersListDiv.innerHTML = `<p class="no-centers">No centers found within 50km.</p>`;
        return;
    }

    centers.forEach(center => {
        let centerDiv = document.createElement("div");
        centerDiv.classList.add("center-item");
        centerDiv.innerHTML = `
            <h3>${center.name}</h3>
            <p>${center.address}</p>
            <p>Distance: ${center.distance.toFixed(2)} km</p>
            <p>Phone: ${center.phone || "N/A"}</p>
            <button class="book-slot-btn" onclick="showBookingSlots('${center.name}')">Book Slots Now</button>
        `;
        centersListDiv.appendChild(centerDiv);
    });
}

// Function to show available booking slots with dates
function showBookingSlots(centerName) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Generate dates for the next 7 days
    let dates = generateDates();

    let datesHTML = dates.map(date => 
        `<button class="date-btn" onclick="selectDate('${centerName}', '${date}')">${date}</button>`
    ).join("");

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Select a Date at ${centerName}</h2>
            <div class="dates-container">${datesHTML}</div>
            <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Function to generate dates for the next 7 days
function generateDates() {
    let dates = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
        let futureDate = new Date();
        futureDate.setDate(today.getDate() + i);
        let formattedDate = futureDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
        dates.push(formattedDate);
    }
    return dates;
}

// Function to select a date and show time slots
function selectDate(centerName, selectedDate) {
    closeModal();

    const modal = document.createElement("div");
    modal.classList.add("modal");

    let slots = generateTimeSlots();

    let slotsHTML = slots.map(slot =>
        `<button class="slot-btn" onclick="confirmBooking('${centerName}', '${selectedDate}', '${slot}')">${slot}</button>`
    ).join("");

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Select a Time Slot on ${selectedDate} at ${centerName}</h2>
            <div class="slots-container">${slotsHTML}</div>
            <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
}

// Function to generate random time slots
function generateTimeSlots() {
    return [
        "10:00 AM - 10:30 AM",
        "11:00 AM - 11:30 AM",
        "12:00 PM - 12:30 PM",
        "02:00 PM - 02:30 PM",
        "03:30 PM - 04:00 PM",
        "05:00 PM - 05:30 PM"
    ];
}

// Function to confirm booking with date and time
function confirmBooking(centerName, selectedDate, timeSlot) {
    closeModal();

    const confirmationDiv = document.createElement("div");
    confirmationDiv.classList.add("confirmation-message");
    confirmationDiv.innerHTML = `
        <h2>Booking Confirmed!</h2>
        <p>Your slot at <strong>${centerName}</strong> is booked for <strong>${selectedDate}</strong> at <strong>${timeSlot}</strong>.</p>
        
        <!-- Form with a submit button -->
        <form action="index.html" method="GET">
            <button type="submit" class="done-btn">Done</button>
        </form>
    `;

    document.body.appendChild(confirmationDiv);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector(".modal");
    if (modal) modal.remove();
}

// Add event listener to button for finding locations
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("find-locations-button").addEventListener("click", findNearbyCenters);
});
