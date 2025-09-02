// Select elements
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav--links");
const hamburgerIcon = document.querySelector(".hamburger-icon");

// Toggle navigation and icon
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Change hamburger to close icon
  if (navLinks.classList.contains("active")) {
    hamburgerIcon.textContent = '✕';
  } else {
    hamburgerIcon.textContent = '☰';
  }
});

// Handle dropdown toggle
document.querySelectorAll(".all--links > li").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (item.querySelector(".dropdown")) {
      e.stopPropagation();
      item.classList.toggle("open");
    }
  });
});


// dekstop drop down

// Select all desktop navbar items with dropdowns
const desktopMenuItems = document.querySelectorAll('.desktop--all--links > li');

desktopMenuItems.forEach(item => {
  const dropdown = item.querySelector('.desktop--dropdown');

  if (dropdown) {
    item.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling
      // Close other open dropdowns
      desktopMenuItems.forEach(i => {
        if (i !== item) i.classList.remove('open');
      });
      // Toggle this dropdown
      item.classList.toggle('open');
    });
  }
});

// Optional: close dropdowns if clicked outside
document.addEventListener('click', () => {
  desktopMenuItems.forEach(item => item.classList.remove('open'));
});


