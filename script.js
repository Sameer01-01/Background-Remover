let imageURL;

function submitHandler() {
    const fileInput = document.getElementById('fileInput');
    const image = fileInput.files[0];
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = '5mpEKdbHGQcbJBEdcFQbDh7c';
    
    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        imageURL = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = imageURL;
        document.body.appendChild(img);
    })
    .catch(error => console.error('Error:', error));
}

function downloadFile() {
    if (!imageURL) return;
    
    const anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'processed_image.png';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
}
