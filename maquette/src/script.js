function toggleDropdown() {
    var menu = document.getElementById("dropdownMenu");
    menu.classList.toggle("hidden");
}
// Optional: Hide dropdown when clicking outside
window.addEventListener("click", function (e) {
    var button = document.querySelector("button[onclick='toggleDropdown()']");
    var dropdown = document.getElementById("dropdownMenu");
    if (!(e.target instanceof Node))
        return;
    if (button && dropdown && !button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});
