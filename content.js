console.log("Trying to remove shorts")
// Remove the Shorts carousel drawer
const carousels = document.querySelectorAll(
    "ytd-rich-section-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model"
);
carousels.forEach((carousel) => {
    // Add specific condition to target Shorts carousel if needed
carousel.remove();
})
