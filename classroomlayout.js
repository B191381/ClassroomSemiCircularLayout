document.getElementById("generate-layout").addEventListener("click", () => {
    const rowsContainer = document.getElementById("rows-container");
    const layoutContainer = document.getElementById("layout-container");
    layoutContainer.innerHTML = ""; // Clear previous layout
  
    const centerX = layoutContainer.clientWidth / 2; // Horizontal center of the container
    const centerY = layoutContainer.clientHeight-100; // Bottom center
  
    rowsContainer.querySelectorAll("tr").forEach((row, rowIndex) => {
      const block1Seats = parseInt(row.querySelector('[data-block="1"]').value);
      const block2Seats = parseInt(row.querySelector('[data-block="2"]').value);
  
      const totalSeats = block1Seats + block2Seats; // Total seats in the row
      const rowRadius = 140 + rowIndex * 70; // Radius for each row
  
      // Calculate angle increment for seat alignment
      const angleIncrement = Math.PI / (totalSeats - 1);
  
      let seatNumber = 1; // Start numbering for Block 1
  
      // Position Block 1 seats along the arc
      for (let i = 0; i < block1Seats; i++) {
        const angle = Math.PI - i * angleIncrement; // Start from leftmost side
        const x = centerX + rowRadius * Math.cos(angle); // X-coordinate
        const y = centerY - rowRadius * Math.sin(angle); // Y-coordinate (flip for arc shape)
  
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = seatNumber++;
  
        // Position the seat
        seat.style.position = "absolute";
        seat.style.left = `${x}px`; // Center horizontally (assuming seat width = 40px)
        seat.style.top = `${y}px`; // Center vertically (assuming seat height = 40px)
        seat.style.transform = `rotate(${(angle - Math.PI / 2) * (-180 / Math.PI)}deg)`;
        layoutContainer.appendChild(seat);
      }

      // Position Block 2 seats along the arc, starting from 1
      seatNumber=1;
      for (let i = 0; i < block2Seats; i++) {
        const angle = Math.PI - (block1Seats + i) * angleIncrement; // Start where Block 1 ends
        const x = centerX + rowRadius * Math.cos(angle); // X-coordinate
        const y = centerY - rowRadius * Math.sin(angle); // Y-coordinate (flip for arc shape)
  
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = seatNumber++;
  
        // Position the seat
        seat.style.position = "absolute";
        seat.style.left = `${x}px`; // Center horizontally (assuming seat width = 40px)
        seat.style.top = `${y}px`; // Center vertically (assuming seat height = 40px)
        //seat.style.transform = `rotate(${angle * (20 / Math.PI)}deg)`;
        seat.style.transform = `rotate(${(angle - Math.PI / 2) * (-180 / Math.PI)}deg)`;
        layoutContainer.appendChild(seat);
      }
    });
});