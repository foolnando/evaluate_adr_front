import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nome, email, modelo, tempo, consultas, decisao } = req.body;

  // Dados para o email
  const emailData = {
    to: 'fernando.neves@icomp.ufam.edu.br',
    from: email,
    subject: `experimento adr ${nome}`,
    text: `
Nome do participante: ${nome}
Email do participante: ${email}
Modelo utilizado: ${modelo}
Tempo de preenchimento: ${tempo} segundos
Número de consultas ao material: ${consultas}
ADR produzida:
${decisao}
    `,
    html: `
      <h2>Dados do Experimento ADR</h2>
      <p><strong>Nome do participante:</strong> ${nome}</p>
      <p><strong>Email do participante:</strong> ${email}</p>
      <p><strong>Modelo utilizado:</strong> ${modelo}</p>
      <p><strong>Tempo de preenchimento:</strong> ${tempo} segundos</p>
      <p><strong>Número de consultas ao material:</strong> ${consultas}</p>
      <h3>ADR produzida:</h3>
      <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${decisao}</pre>
    `
  };

  // Salvar dados localmente como fallback
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `adr-experiment-${nome.replace(/\s+/g, '-')}-${timestamp}.json`;
  const filepath = path.join(process.cwd(), 'experiment-data', filename);

  // Criar diretório se não existir
  const dataDir = path.join(process.cwd(), 'experiment-data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const experimentData = {
    timestamp: new Date().toISOString(),
    nome,
    email,
    modelo,
    tempo,
    consultas,
    decisao,
    emailData
  };

  try {
    // Salvar dados localmente
    fs.writeFileSync(filepath, JSON.stringify(experimentData, null, 2));
    console.log('Dados salvos localmente:', filepath);
    
    // Tentar enviar email
    let emailSent = false;
    let emailError = null;
    
    try {
      // Configurar transporter (você pode configurar com suas credenciais de email)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Se as credenciais estiverem configuradas, tentar enviar email
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"Experimento ADR" <${process.env.SMTP_USER}>`,
          to: 'fernando.neves@icomp.ufam.edu.br',
          subject: `experimento adr ${nome}`,
          text: emailData.text,
          html: emailData.html,
        });
        
        emailSent = true;
        console.log('Email enviado com sucesso');
      } else {
        console.log('Credenciais de email não configuradas, apenas salvando localmente');
      }
      
    } catch (emailErr) {
      emailError = emailErr.message;
      console.error('Erro ao enviar email:', emailErr);
    }
    
    return res.status(200).json({ 
      message: 'Dados processados com sucesso',
      savedLocally: true,
      emailSent: emailSent,
      emailError: emailError,
      filename: filename
    });

  } catch (error) {
    console.error('Erro ao processar dados:', error);
    return res.status(500).json({ 
      message: 'Erro ao processar dados',
      error: error.message 
    });
  }
}
