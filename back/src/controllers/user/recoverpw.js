const jwt = require('jsonwebtoken');
const sgMail = require('./sendgridConfig');
const { JWT_SECRET } = process.env;
const { User } = require("../../db");


const checkIfEmailExists = (email) => {
  return User.findOne({
    where: {
      mail: email,
    },
  })
    .then((user) => {
      return !!user; 
    })
    .catch((error) => {
      throw error; 
    });
};


const requestPasswordRecovery = (req, res) => {
  const { mail } = req.body;

  checkIfEmailExists(mail)
    .then((emailExists) => {
      if (!emailExists) {
        return res.status(404).json({ error: 'Correo electrónico no encontrado' });
      }

      // Genera un token de recuperación único que incluye la dirección de correo electrónico.
      const token = jwt.sign({ mail }, JWT_SECRET, { expiresIn: '1h' });

      // Crea un enlace de recuperación que incluye el token.
      const recoveryLink = `http://127.0.0.1:5173/reset-password?token=${token}`;

      // Envia un correo electrónico al usuario con el enlace de recuperación.
      const msg = {
        to: mail,
        from: 'grtechPF@gmail.com',
        subject: 'Recuperación de contraseña',
        text: 'Siga este enlace para restablecer su contraseña',
        html: `<a href="${recoveryLink}">Haga clic aquí para restablecer su contraseña</a>`,
      };

      sgMail.send(msg)
        .then(() => {
          return res.status(200).json({ message: 'Correo de recuperación de contraseña enviado con éxito' });
        })
        .catch((error) => {
          console.error('Error al enviar el correo de recuperación de contraseña:', error);
          return res.status(500).json({ error: 'Error al enviar el correo de recuperación de contraseña' });
        });
    })
    .catch((error) => {
      console.error('Error al verificar la existencia del correo electrónico:', error);
      return res.status(500).json({ error: 'Error al verificar la existencia del correo electrónico' });
    });
};

const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

 
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: 'Token de recuperación no válido' });
    }

    const email = decoded.mail;

    User.update(
      {
        password: newPassword,
      },
      {
        where: {
          mail: email,
        },
      }
    )
      .then(() => {
        return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
      })
      .catch((error) => {
        console.error('Error al cambiar la contraseña en la base de datos:', error);
        return res.status(500).json({ error: 'Error al cambiar la contraseña en la base de datos' });
      });
  });
};

module.exports = { requestPasswordRecovery, resetPassword };
