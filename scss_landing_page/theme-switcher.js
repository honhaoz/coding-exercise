document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeBtn = document.getElementById('theme-button');
    toggleThemeBtn.addEventListener('click', toggleTheme);
});
function toggleTheme() {
    const bodyElement = document.body;
    bodyElement.classList.toggle('theme-light');
}