document.getElementById('file-input').addEventListener('change', async function(e) {
  const file = e.target.files[0];
  if (!file || file.type !== 'application/pdf') {
    alert('Please select a valid PDF file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async function() {
    const typedArray = new Uint8Array(reader.result);
    const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

    let extractedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      extractedText += strings.join(' ') + '\n\n';
    }

    document.getElementById('output').textContent = extractedText;
  };
  reader.readAsArrayBuffer(file);
});
