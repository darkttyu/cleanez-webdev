export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
        <span style="font-size: large; font-weight: bold; color: #20063B;">VERIFY YOUR EMAIL 📩</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.
    <br>This code will expire in 1 day for security reasons.
    <br>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">PASSWORD RESET SUCCESS</span>
  </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        ✓
      </div>
    </div>
    <p style="text-align: justify;">If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">RESET PASSWORD</span>
  </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,5);">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOMING_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">WELCOME TO CLEAN<span style="font-weight: bold; color: #4CAF50;">EZ</span></span>
  </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;"> Welcome to CleanEZ! We’re thrilled to have you join us as we simplify the way you book cleaning services.</p>
    <p style="text-align: justify;">CleanEZ is your one-stop platform to connect with professional, reliable cleaning providers. Whether it’s a home, office, or special event, we’ve made it easier than ever to find and book the perfect cleaning service that fits your needs.</p>
    <p style="font-weight: bold;">What makes CleanEZ the smart choice?</p>
    <ul>
      <li style="font-weight: bold;">Wide Network of Providers: <span style="font-weight: 100;">Access a variety of cleaning professionals ready to help.</span></li>
      <li style="font-weight: bold;">Convenient Booking: <span style="font-weight: 100;">Easily browse, compare, and schedule services all in one place.</span></li>
      <li style="font-weight: bold;">Quality Assurance: <span style="font-weight: 100;">We only partner with trusted, high-quality providers.</span></li>
      <li style="font-weight: bold;">Flexibility and Choice: <span style="font-weight: 100;">Select the service type, date, and time that works for you.</span></li>
    </ul>
    <p style="font-weight: bold;">Ready to book your first clean?</p>
    <p>Visit our website <i>cleanez.net</i> or contact us at info.cleanez24@gmail.com to schedule a service.</p>
    <p>We’re here to make your life easier – one clean space at a time! If you have any questions or need assistance, feel free to reach out.</p>
    <p>Thank you for choosing CleanEZ. We look forward to sparkling up your space! ✨</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ADMIN_WELCOMING_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">WELCOME TO CLEAN<span style="font-weight: bold; color: #4CAF50;">EZ</span></span>
  </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;"> Welcome to CleanEZ! We’re thrilled to have you join us as we simplify the way you book cleaning services.</p>
    <p style="text-align: justify;">CleanEZ is your one-stop platform to connect with professional, reliable cleaning providers. Whether it’s a home, office, or special event, we’ve made it easier than ever to find and book the perfect cleaning service that fits your needs.</p>
    <p style="font-weight: bold;">What makes CleanEZ the smart choice?</p>
    <ul>
      <li style="font-weight: bold;">Wide Network of Providers: <span style="font-weight: 100;">Access a variety of cleaning professionals ready to help.</span></li>
      <li style="font-weight: bold;">Convenient Booking: <span style="font-weight: 100;">Easily browse, compare, and schedule services all in one place.</span></li>
      <li style="font-weight: bold;">Quality Assurance: <span style="font-weight: 100;">We only partner with trusted, high-quality providers.</span></li>
      <li style="font-weight: bold;">Flexibility and Choice: <span style="font-weight: 100;">Select the service type, date, and time that works for you.</span></li>
    </ul>
    <p>Ready to book your first clean? <span style="font-weight: bold;"> Here’s your Login Details:</span></p>
    <ul>
        <li><strong>Email or Phone Number:</strong> <span style="font-weight: bold; color: #4CAF50;">{email} / {phoneNumber} </span></li>
        <li><strong>Password:</strong> <span style="font-weight: bold; color: #4CAF50;">{generatedPassword}</span></li>
    </ul>
    <p style="text-align: justify;">For security purposes, we recommend logging in immediately and updating your password.</p>
    <p>Visit our website <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> or contact us at info.cleanez24@gmail.com to schedule a service.</p>
    <p>We’re here to make your life easier – one clean space at a time! If you have any questions or need assistance, feel free to reach out.</p>
    <p>Thank you for choosing CleanEZ. We look forward to sparkling up your space! ✨</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const DELETE_ACCOUNT = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deletion Notice</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">ACCOUNT DELETED</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">This email is to notify you that your CleanEZ account has been successfully deleted. We're sorry to see you go, but we respect your decision to leave.</p>
    <p style="text-align: justify;">If you did not request this deletion or believe this was done in error, please contact us immediately at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>. Your security is our top priority, and we’ll do our best to assist you.</p>
    <p style="font-weight: bold;">What this means:</p>
    <ul>
      <li style="font-weight: bold;">Account Data: <span style="font-weight: 100;">All your personal data and booking history associated with CleanEZ have been permanently removed from our system.</span></li>
      <li style="font-weight: bold;">Services Access: <span style="font-weight: 100;">You will no longer have access to our platform or services under this account.</span></li>
    </ul>
    <p style="text-align: justify;">If you ever wish to return, we’d be delighted to welcome you back! You can always create a new account by visiting our website.</p>
    <p>Visit us at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> for more information about our services or future updates.</p>
    <p>Thank you for your time with CleanEZ. We wish you the best in all your endeavors!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=10nC-2cAghfi4tevlOxj-N2qg1_IwY5oP" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;