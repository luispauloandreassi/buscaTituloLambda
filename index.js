const https = require('https');

exports.busca_titulo = (req, res) => {
  const url = req.query.url || '';
  try {
    https.get(url, (response) => {
      let html = '';
      response.on('data', (chunk) => {
        html += chunk;
      });
      response.on('end', () => {
        const title = extractTitle(html);
        res.status(200).send(`Título da URL: ${title}`);
      });
    }).on('error', () => {
      res.status(400).send('Erro: URL informada é inválida!.');
    });
  } catch (error) {
    res.status(500).send('Erro interno.');
  }
};

function extractTitle(html) {
  const titleRegex = /<title[^>]*>(.*?)<\/title>/i;
  const match = html.match(titleRegex);
  return match ? match[1] : '';
}
