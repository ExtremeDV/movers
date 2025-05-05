import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, message } = body;
  const date = new Date().toISOString();

  if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    throw new Error('One or more required environment variables are missing.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Замени на SMTP-хост твоего домена
    port: parseInt(process.env.EMAIL_PORT, 10), // Уточни порт у хостинг-провайдера
    secure: parseInt(process.env.EMAIL_PORT, 10) === 465, // true для 465, false для 587
    auth: {
      user: process.env.EMAIL_USER, // Твой email, например, 'your-email@your-domain.com'
      pass: process.env.EMAIL_PASS, // Пароль от email
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,      // Отправитель (твой email)
    to: process.env.EMAIL_TO, // Получатель (может быть тот же email или другой)
    subject: `Rhino-movers.com NEW ORDER`,
    html: `<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 6px;">
          <tr>
            <td align="center" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">
              <h1>Rhiho <span style="color: #83df2e;">Movers</span></h1>
              <h3>New order</h3>
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #333333; padding-bottom: 20px;">
              <h3>Order detail:</h3>
              <br>
              Client email: <a mailto=${email}>${email}</a>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; border-color: #dddddd;">
                <thead style="background-color: #f0f0f0;">
                  <tr>
                    <th align="left">Name</th>
                    <th align="center">Value</th>
                    <th align="right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Item</td>
                    <td align="center">${message.type}</td>
                    <td align="right">$ ${message.baseCost}</td>
                  </tr>
                  <tr>
                    <td>Distance</td>
                    <td align="center">${message.distance}</td>
                    <td align="right">$ ${message.distanceCost}</td>
                  </tr>
                  <tr>
                    <td>Number of stairs up</td>
                    <td align="center">${message.stairsUp}</td>
                    <td align="right">$ ${message.stepUpCost}</td>
                  </tr>
                  <tr>
                    <td>Number of stair down</td>
                    <td align="center">${message.stairsDown}</td>
                    <td align="right">$ ${message.stepDownCost}</td>
                  </tr>
                  <tr>
                    <td colspan="2" align="right"><strong>Total:</strong></td>
                    <td align="right"><strong>$ ${message.total}</strong></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 20px; font-size: 14px; color: #777777;">
            date order: ${date}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 30px; font-size: 12px; color: #aaaaaa;">
              © rhino-movers.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>`, // HTML-версия письма
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Не удалось отправить email' };
  }
});