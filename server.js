require('dotenv').config();
const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/consulta_placa', async (req, res) => {
  const { placa } = req.query;               
  const EMAIL = process.env.EMAIL;
  const API_KEY = process.env.TOKEN_API;

  const basic = Buffer.from(`${EMAIL}:${API_KEY}`).toString('base64');

  try {
    const url = `https://api.consultarplaca.com.br/v2/consultarPlaca?placa=${encodeURIComponent(placa)}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${basic}`,
        'Accept': 'application/json'
      }
    });

    // repassa status e corpo
    const ct = resp.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await resp.json() : await resp.text();
    return typeof data === 'string'
      ? res.status(resp.status).send(data)
      : res.status(resp.status).json(data);

  } catch (err) {
    console.error('Erro ao consultar placa:', err);
    return res.status(502).json({ error: 'Falha ao consultar serviço externo' });
  }
});

app.post('/submit-form', upload.any(), async (req, res) => {
  const targetUrl = process.env.TARGET_URL;

  try {
    // if (req.body && req.body['segTrabalhadas[]'] && Array.isArray(req.body['segTrabalhadas[]'])) {
    //   req.body.seguradorasTrabalhadas = req.body['segTrabalhadas[]'].join(', ');
    //   delete req.body['segTrabalhadas[]'];
    // }

    const payload = { ...(req.body || {}) };
    
    const byField = {};
    for (const f of (req.files || [])) {

      const cleanFileName = f.originalname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "_");

      const asObj = {
        filename: cleanFileName,
        contentType: f.mimetype || 'application/octet-stream',
        content: f.buffer.toString('base64'),
      };

      if (!byField[f.fieldname]) {
        byField[f.fieldname] = asObj;       
      } else if (Array.isArray(byField[f.fieldname])) {
        byField[f.fieldname].push(asObj);   
      } else {
        byField[f.fieldname] = [byField[f.fieldname], asObj];
      }
    }

    for (const [field, value] of Object.entries(byField)) {
      delete payload[field];    
      payload[field] = value; 
    }

    console.log('Encaminhando payload: ', payload);

    const forward = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const ct = forward.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await forward.json() : await forward.text();
    return typeof data === 'string'
      ? res.status(forward.status).send(data)
      : res.status(forward.status).json(data);
    
  } catch (err) {
    console.error('Erro ao encaminhar formulário:', err);
    return res.status(500).json({ error: 'Erro interno do servidor ao processar formulário.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor em http://localhost:${port}`);
});
