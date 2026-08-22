import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const codes = new Map();

app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  codes.set(email, otp);

  console.log('\n========================================');
  console.log(`📩 CÓDIGO GENERADO PARA: ${email}`);
  console.log(`🔑 CÓDIGO OTP: ${otp}`);
  console.log('========================================\n');

  res.json({ success: true, otp: otp });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  if (codes.get(email) === otp) {
    codes.delete(email);
    return res.json({ success: true });
  }
  
  res.status(400).json({ error: 'Código incorrecto' });
});

app.listen(4000, () => console.log('Servidor corriendo en puerto 4000'));