
// Blood Centers Data (Initial Stock)
let bloodCenters = [
    { 
        name: "Apollo Hospital", 
        address: "123 Main Street, City", 
        phone: "9876543210", 
        latitude: 23.0225, 
        longitude: 72.5714, 
        stock: { "A+": 10, "A-": 5, "B+": 8, "B-": 4, "O+": 12, "O-": 8, "AB+": 7, "AB-": 3 }
    },
    { 
        name: "Prathama Blood Centre", 
        address: "456 Health Ave, City", 
        phone: "9876543220", 
        latitude: 23.0245, 
        longitude: 72.5716, 
        stock: { "A+": 15, "A-": 7, "B+": 10, "B-": 5, "O+": 18, "O-": 8, "AB+": 9, "AB-": 4 }
    }
];

document.getElementById("find-blood-centers").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            let nearbyCenters = bloodCenters
                .map(center => ({
                    ...center,
                    distance: getDistance(userLat, userLon, center.latitude, center.longitude)
                }))
                .filter(center => center.distance <= 50)
                .sort((a, b) => a.distance - b.distance);

            displayCenters(nearbyCenters);
        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation not supported.");
    }
});

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    return R * 2 * Math.atan2(
        Math.sqrt(
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2
        ),
        Math.sqrt(1 - (
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2
        ))
    );
}

// Function to display blood centers
function displayCenters(centers) {
    const container = document.getElementById("centers-container");
    container.innerHTML = "";

    if (centers.length === 0) {
        container.innerHTML = "<p>No nearby centers found within 50 km.</p>";
        return;
    }

    centers.forEach(center => {
        const card = document.createElement("div");
        card.classList.add("center-card");
        card.innerHTML = `
            <h3>${center.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
            <p><i class="fas fa-phone"></i> ${center.phone}</p>
            <button class="check-stock-btn">Check Stock</button>
        `;

        // Attach redirect logic to Check Stock button
        const checkStockBtn = card.querySelector(".check-stock-btn");
        checkStockBtn.onclick = () => {
            const encodedName = encodeURIComponent(center.name);
            window.location.href = `stock-details.html?center=${encodedName}`;
        };

        container.appendChild(card);
    });
}

//  // Blood Centers Data (Initial Stock)
//  let bloodCenters = [
//     { 
//         name: "Apollo Hospital", 
//         address: "123 Main Street, City", 
//         phone: "9876543210", 
//         latitude: 23.0225, 
//         longitude: 72.5714, 
//         stock: { "A+": 10, "A-": 5, "B+": 8, "B-": 4, "O+": 12, "O-": 8, "AB+": 7, "AB-": 3 }
//     },
//     { 
//         name: "Prathama Blood Centre", 
//         address: "456 Health Ave, City", 
//         phone: "9876543220", 
//         latitude: 23.0245, 
//         longitude: 72.5716, 
//         stock: { "A+": 15, "A-": 7, "B+": 10, "B-": 5, "O+": 18, "O-": 8, "AB+": 9, "AB-": 4 }
//     }
// ];

// document.getElementById("find-blood-centers").addEventListener("click", function () {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const userLat = position.coords.latitude;
//             const userLon = position.coords.longitude;

//             let nearbyCenters = bloodCenters
//                 .map(center => ({
//                     ...center,
//                     distance: getDistance(userLat, userLon, center.latitude, center.longitude)
//                 }))
//                 .filter(center => center.distance <= 50)
//                 .sort((a, b) => a.distance - b.distance);

//             displayCenters(nearbyCenters);
//         }, () => {
//             alert("Unable to retrieve location.");
//         });
//     } else {
//         alert("Geolocation not supported.");
//     }
// });

// // Function to calculate distance using Haversine formula
// function getDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371;
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     return R * 2 * Math.atan2(Math.sqrt(Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2), Math.sqrt(1 - Math.sin(dLat / 2) ** 2));
// }

// // Function to display blood centers
// function displayCenters(centers) {
//     const container = document.getElementById("centers-container");
//     container.innerHTML = "";

//     if (centers.length === 0) {
//         container.innerHTML = "<p>No nearby centers found within 50 km.</p>";
//         return;
//     }

//     centers.forEach(center => {
//         const card = document.createElement("div");
//         card.classList.add("center-card");
//         card.innerHTML = `
//             <h3>${center.name}</h3>
//             <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
//             <p><i class="fas fa-phone"></i> ${center.phone}</p>
//             <button class="check-stock-btn" onclick='showBloodStock(${JSON.stringify(center)})'>Check Stock</button>
//         `;
//         container.appendChild(card);
//     });
// }

// // Function to display blood stock dynamically
// function showBloodStock(center) {
//     const stockContainer = document.getElementById("stock-container");
//     stockContainer.innerHTML = "";

//     Object.entries(center.stock).forEach(([type, qty]) => {
//         let btn = document.createElement("button");
//         btn.classList.add("blood-stock-btn", type.toLowerCase().replace("+", "-pos").replace("-", "-neg"));
//         btn.textContent = `${type}: ${qty} units`;
//         btn.onclick = () => selectBloodType(center, type, qty);
//         stockContainer.appendChild(btn);
//     });

//     // Add Blood Request Section
//     const requestContainer = document.createElement("div");
//     requestContainer.classList.add("blood-request-section");
//     requestContainer.innerHTML = `
//         <h3>Request Blood</h3>
//         <label for="blood-type">Selected Blood Type:</label>
//         <input type="text" id="selected-blood-type" readonly>
//         <label for="blood-amount">Enter Amount (in units):</label>
//         <input type="number" id="blood-amount" min="1" placeholder="Enter units needed">
//         <button class="request-blood-btn">Request Blood</button>
//         <p id="request-message"></p>
//     `;

//     stockContainer.appendChild(requestContainer);

//     document.getElementById("modal-title").textContent = `Available Blood Stock - ${center.name}`;
//     document.getElementById("blood-stock-modal").style.display = "flex";

//     document.querySelector(".request-blood-btn").onclick = () => requestBlood(center);

//     // Close modal functionality
//     document.querySelector(".close-btn").onclick = closeModal;
// }

// // Function to close modal
// function closeModal() {
//     document.getElementById("blood-stock-modal").style.display = "none";
// }

// // Function to select blood type and update input field
// function selectBloodType(center, type, availableUnits) {
//     document.getElementById("selected-blood-type").value = type;
//     document.getElementById("blood-amount").setAttribute("max", availableUnits);
//     document.getElementById("blood-amount").setAttribute("data-center", center.name);
// }

// // Function to handle blood request and update stock dynamically
// function requestBlood(center) {
//     const bloodType = document.getElementById("selected-blood-type").value;
//     const amount = parseInt(document.getElementById("blood-amount").value);
//     const requestMessage = document.getElementById("request-message");

//     if (!bloodType) {
//         requestMessage.innerHTML = `<p class="error-msg">⚠️ Please select a blood type first.</p>`;
//         return;
//     }

//     if (!amount || amount <= 0) {
//         requestMessage.innerHTML = `<p class="error-msg">⚠️ Please enter a valid blood amount.</p>`;
//         return;
//     }

//     if (amount > center.stock[bloodType]) {
//         requestMessage.innerHTML = `<p class="error-msg">❌ Not enough stock available.</p>`;
//         return;
//     }

//     // Reduce stock
//     center.stock[bloodType] -= amount;

//     // Keep success message and "Back to Home" button visible
//     requestMessage.innerHTML = `
//         <p class="success-msg">✅ Your request for ${amount} units of ${bloodType} has been approved.</p>
//         <button class="home-btn" onclick="window.location.href='index.html'">Back to Home</button>
//     `;

//     // Refresh only stock display without clearing the message
//     updateStockDisplay(center);
// }

// // Function to refresh stock display dynamically without hiding success message
// function updateStockDisplay(center) {
//     const stockContainer = document.getElementById("stock-container");
//     const existingRequestMessage = document.getElementById("request-message").innerHTML;

//     stockContainer.innerHTML = "";

//     Object.entries(center.stock).forEach(([type, qty]) => {
//         let btn = document.createElement("button");
//         btn.classList.add("blood-stock-btn", type.toLowerCase().replace("+", "-pos").replace("-", "-neg"));
//         btn.textContent = `${type}: ${qty} units`;
//         btn.onclick = () => selectBloodType(center, type, qty);
//         stockContainer.appendChild(btn);
//     });

//     // Re-add the request form and keep the success message visible
//     const requestContainer = document.createElement("div");
//     requestContainer.classList.add("blood-request-section");
//     requestContainer.innerHTML = `
//         <h3>Request Blood</h3>
//         <label for="blood-type">Selected Blood Type:</label>
//         <input type="text" id="selected-blood-type" readonly>
//         <label for="blood-amount">Enter Amount (in units):</label>
//         <input type="number" id="blood-amount" min="1" placeholder="Enter units needed">
//         <button class="request-blood-btn">Request Blood</button>
//         <p id="request-message">${existingRequestMessage}</p>
//     `;

//     stockContainer.appendChild(requestContainer);

//     document.querySelector(".request-blood-btn").onclick = () => requestBlood(center);
// }


// // let donors = [
// //     { name: "Darshil shah", bloodType: "A+", phone: "9624051692", location: "Mansa" },
// //     { name: "Harshil Shah", bloodType: "O-", phone: "7016534432", location: "Randheja" },
// //     { name: "Fenil Prajapti", bloodType: "B+", phone: "9904189728", location: "LDRP" },
// //     { name: "Kris prajapti", bloodType: "AB+", phone: "7862894847", location: "Charada" }
// // ];

// // function displayDonors(bloodType) {
// //     const donorList = document.getElementById("donor-list");
// //     const donorMessage = document.getElementById("donor-message");

// //     const filteredDonors = donors.filter(donor => donor.bloodType === bloodType);

// //     if (filteredDonors.length === 0) {
// //         donorMessage.innerHTML = `<p class="error-msg">⚠️ No donors available for ${bloodType}.</p>`;
// //         donorList.innerHTML = "";
// //         return;
// //     }

// //     donorMessage.innerHTML = `<p class="success-msg">✅ Found donors for ${bloodType}. Contact them below:</p>`;

// //     donorList.innerHTML = "";
// //     filteredDonors.forEach(donor => {
// //         const donorCard = document.createElement("div");
// //         donorCard.classList.add("donor-card");
// //         donorCard.innerHTML = `
// //             <h3>${donor.name}</h3>
// //             <p><strong>Blood Type:</strong> ${donor.bloodType}</p>
// //             <p><strong>Location:</strong> ${donor.location}</p>
// //             <p><strong>Phone:</strong> <a href="tel:${donor.phone}">${donor.phone}</a></p>
// //         `;
// //         donorList.appendChild(donorCard);
// //     });
// // }


// // // Function to handle blood request and update stock dynamically
// // function requestBlood(center) {
// //     const bloodType = document.getElementById("selected-blood-type").value;
// //     const amount = parseInt(document.getElementById("blood-amount").value);
// //     const requestMessage = document.getElementById("request-message");

// //     if (!bloodType) {
// //         requestMessage.innerHTML = `<p class="error-msg">⚠️ Please select a blood type first.</p>`;
// //         return;
// //     }

// //     if (!amount || amount <= 0) {
// //         requestMessage.innerHTML = `<p class="error-msg">⚠️ Please enter a valid blood amount.</p>`;
// //         return;
// //     }

// //     if (amount > center.stock[bloodType]) {
// //         requestMessage.innerHTML = `<p class="error-msg">❌ Not enough stock available.</p>`;
// //         return;
// //     }

// //     // Reduce stock and update UI
// //     center.stock[bloodType] -= amount;
    
// //     // Keep success message and "Back to Home" button visible
// //     requestMessage.innerHTML = `
// //         <p class="success-msg">✅ Your request for ${amount} units of ${bloodType} has been approved.</p>
// //         <button class="home-btn" onclick="window.location.href='index.html'">Back to Home</button>
// //     `;

// //     // **Fix: Update Stock Immediately**
// //     updateStockDisplay(center);
// //     displayDonors(bloodType); // Show donors after successful request
// // }

// // // Function to refresh stock display dynamically without hiding success message
// // function updateStockDisplay(center) {
// //     const stockContainer = document.getElementById("stock-container");
    
// //     // Preserve existing success/error messages
// //     const existingRequestMessage = document.getElementById("request-message")?.innerHTML || "";

// //     stockContainer.innerHTML = ""; // Clear previous stock list

// //     Object.entries(center.stock).forEach(([type, qty]) => {
// //         let btn = document.createElement("button");
// //         btn.classList.add("blood-stock-btn", type.toLowerCase().replace("+", "-pos").replace("-", "-neg"));
// //         btn.textContent = `${type}: ${qty} units`;
// //         btn.onclick = () => selectBloodType(center, type, qty);
// //         stockContainer.appendChild(btn);
// //     });

// //     // Re-add the request form while preserving messages
// //     const requestContainer = document.createElement("div");
// //     requestContainer.classList.add("blood-request-section");
// //     requestContainer.innerHTML = `
// //         <h3>Request Blood</h3>
// //         <label for="blood-type">Selected Blood Type:</label>
// //         <input type="text" id="selected-blood-type" readonly>
// //         <label for="blood-amount">Enter Amount (in units):</label>
// //         <input type="number" id="blood-amount" min="1" placeholder="Enter units needed">
// //         <button class="request-blood-btn">Request Blood</button>
// //         <p id="request-message">${existingRequestMessage}</p>
// //     `;

// //     stockContainer.appendChild(requestContainer);

// //     document.querySelector(".request-blood-btn").onclick = () => requestBlood(center);
// // }



