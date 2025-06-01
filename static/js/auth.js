const form = document.querySelector('form');

form.addEventListener('submit', () => {
    document.getElementById('submit-button').disabled = true;
    document.getElementById('submit-button').style.opacity = "0.5";
    document.getElementById('submit-button').innerText = 'Enviando...'; 
});