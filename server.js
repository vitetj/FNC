import express from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const configPath = path.join(process.cwd(), 'emailConfig.json');

function readConfig() {
  try {
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { recipient: 'fnc@ixapack.com' };
  }
}

function writeConfig(cfg) {
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
}

app.get('/api/email', (req, res) => {
  res.json(readConfig());
});

app.post('/api/email', (req, res) => {
  const { recipient } = req.body;
  if (!recipient) return res.status(400).json({ error: 'recipient required' });
  writeConfig({ recipient });
  res.json({ message: 'updated' });
});

app.post('/api/send', async (req, res) => {
  const data = req.body;
  const { recipient } = readConfig();
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.CLOUDRON_MAIL_SMTP_SERVER,
      port: process.env.CLOUDRON_MAIL_SMTPS_PORT || process.env.CLOUDRON_MAIL_SMTP_PORT || 25,
      secure: !!process.env.CLOUDRON_MAIL_SMTPS_PORT,
      auth: {
        user: process.env.CLOUDRON_MAIL_SMTP_USERNAME,
        pass: process.env.CLOUDRON_MAIL_SMTP_PASSWORD
      }
    });

    const messageHtml = `
      <p><strong>${data.typeAction}</strong></p>
      <p><strong>OF :</strong> ${data.of}</p>
      <p><strong>Origine :</strong> ${data.origine}</p>
      <p><strong>Numéro du dossier :</strong> ${data.numeroDossier}</p>
      <p><strong>Référence pièces :</strong> ${data.referencePieces}</p>
      <p><strong>Quantité lancées :</strong> ${data.quantiteLancees}</p>
      <p><strong>Quantité rebutées :</strong> ${data.quantiteRebutees}</p>
      <p><strong>Quantité retouchées :</strong> ${data.quantiteRetouchees}</p>
      <p><strong>Numéro de FNC :</strong> ${data.numeroFNC}</p>
      <p><strong>Erreur Service :</strong> ${data.erreurService}</p>
      <p><strong>Cause :</strong> ${data.cause}</p>
      <p><strong>Retouche :</strong> ${data.retouche}</p>
      <p><strong>Phase :</strong> ${data.phase}</p>
      <p><strong>Temps :</strong> ${data.temps}</p>
    `;

    await transporter.sendMail({
      from: process.env.CLOUDRON_MAIL_FROM || 'webform@example.com',
      to: recipient,
      subject: `${data.typeAction} : ${data.numeroFNC} Numéro de FNC : ${data.numeroFNC} Numéro du dossier : ${data.numeroDossier}`,
      html: messageHtml
    });

    res.json({ message: 'Mail sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Mail not sent' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Backend listening on port', PORT);
});
