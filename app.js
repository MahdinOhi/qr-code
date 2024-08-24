document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
    })
        .then(response => response.blob())
        .then(blob => {
            const img = document.getElementById('qrImage');
            img.src = URL.createObjectURL(blob);
        });
});
