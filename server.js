import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.post('/api/send', async (req, res) => {
  const data = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'ixapack.mail.protection.outlook.com',
      port: 25,
      secure: false
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
      from: 'christelle.bertrand@ixapack.com',
      to: [
        'christelle.bertrand@ixapack.com',
        'informatique@ixapack.com'
      ],
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
