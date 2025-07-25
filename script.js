const m3uUrl = 'https://raw.githubusercontent.com/antolexalex/prueba/refs/heads/main/tv2.m3u'; // URL

fetch(m3uUrl)
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar el archivo M3U');
    return response.text();
  })
  .then(text => {
    const lines = text.split('\n');
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    let dial = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('#EXTINF')) {
        const logoMatch = line.match(/tvg-logo="(.*?)"/);
        const nameMatch = line.match(/,(.*)/);

        const logo = logoMatch ? logoMatch[1] : '';
        const name = nameMatch ? nameMatch[1] : 'Canal desconocido';

        const box = document.createElement('div');
        box.className = 'channel-box';
        box.innerHTML = `
          <img src="${logo}" alt="${name}" onerror="this.style.display='none'">
          <div class="channel-label">Canal ${dial}: ${name}</div>
        `;

        grid.appendChild(box);
        dial++;
      }
    }

    if (dial === 1) {
      grid.innerText = 'No se encontraron canales en el archivo M3U.';
    }
  })
  .catch(error => {
    document.getElementById('grid').innerText = 'Error: ' + error.message;
  });
