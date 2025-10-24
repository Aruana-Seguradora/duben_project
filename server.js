require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
// const port = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/submit-form', upload.any(), async (req, res) => {

  const targetUrl = process.env.TARGET_URL;

  try {
    const payload = { ...(req.body || {}) };

    const byField = {};
    for (const f of (req.files || [])) {
      const asObj = {
        filename: f.originalname,
        contentType: f.mimetype || 'application/octet-stream',
        content: f.buffer.toString('base64'),
      };
      if (!byField[f.fieldname]) {
        byField[f.fieldname] = asObj;       
      } else if (Array.isArray(byField[f.fieldname])) {
        byField[f.fieldname].push(asObj);   
      } else {
        byField[f.fieldname] = [byField[f.fieldname], asObj]; // segundo arquivo -> vira array
      }
    }

    // 3) Aplica os campos de arquivo no payload, sobrescrevendo qualquer valor anterior
    //    (em multipart, normalmente o field de file não aparece no body, mas por garantia)
    for (const [field, value] of Object.entries(byField)) {
      delete payload[field];    
      payload[field] = value; 
    }

    console.log('Encaminhando payload: ', payload);

    // 4) Encaminha pro Flow como JSON (sem whitelists, totalmente dinâmico)
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

module.exports = app;
