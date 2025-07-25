document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    const lines = text.split('\n');
    const channelsDiv = document.getElementById('channels');
    channelsDiv.innerHTML = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#EXTINF')) {
        const logoMatch = line.match(/tvg-logo="(.*?)"/);
        const nameMatch = line.match(/,(.*)/);
        const url = lines[i + 1] ? lines[i + 1].trim() : '';

        const logo = logoMatch ? logoMatch[1] : '';
        const name = nameMatch ? nameMatch[1] : 'Canal desconocido';

        const channelDiv = document.createElement('div');
        channelDiv.className = 'channel';
        channelDiv.innerHTML = `
          <img src="${logo}" alt="${name}" onerror="this.style.display='none'">
          <div>
            <strong>${name}</strong><br>
            <a href="${url}" target="_blank">Ver canal</a>
          </div>
        `;
        channelsDiv.appendChild(channelDiv);
      }
    }
  };
  reader.readAsText(file);
});
