// Highlight active nav link dynamically
document.addEventListener("DOMContentLoaded", () => {
    const currentLocation = location.pathname.split("/").slice(-1)[0];
    const menuItems = document.querySelectorAll("nav ul li a");
  
    menuItems.forEach(link => {
      if (link.getAttribute("href") === currentLocation) {
        link.classList.add("active");
      }
    });
  });
  