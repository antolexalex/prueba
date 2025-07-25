const m3uUrl = 'https://raw.githubusercontent.com/antolexalex/prueba/refs/heads/main/tv2.m3u'; // URL

fetch(m3uUrl)
  .then(response => {
    if (!response.ok) throw new Error('Error al cargar el M3U');
    return response.text();
  })
  .then(text => {
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

    if (!channelsDiv.hasChildNodes()) {
      channelsDiv.innerText = 'No se encontraron canales en el archivo M3U.';
    }
  })
  .catch(error => {
    document.getElementById('channels').innerText = 'Error al cargar canales: ' + error.message;
  });
