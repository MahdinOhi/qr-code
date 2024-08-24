document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;

    // Clear any existing QR code
    document.getElementById('qrCode').innerHTML = '';

    // Generate QR code
    const qr = qrcode(0, 'L');
    qr.addData(url);
    qr.make();

    // Display QR code
    document.getElementById('qrCode').innerHTML = qr.createImgTag();
});
