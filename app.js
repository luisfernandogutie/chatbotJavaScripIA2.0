document.addEventListener('DOMContentLoaded', () => {
    loadPage('home');
});

function loadPage(page) {
    const content = document.getElementById('content');
    content.innerHTML = 'Loading...';
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            content.innerHTML = '<p>Sorry, an error occurred while loading the page.</p>';
        });
}
