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

export const ACTIVATE_USER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activation Notice</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">ACCOUNT ACTIVATION NOTICE</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We are excited to inform you that your CleanEZ account is now set to active status! You can now fully access our platform and enjoy all the services we offer.</p>
    <p style="text-align: justify;">As an active user, you’ll be able to explore our wide network of cleaning professionals, schedule services at your convenience, and enjoy the seamless experience CleanEZ provides.</p>
    <p style="font-weight: bold;">What’s next?</p>
    <ul>
      <li style="font-weight: bold;">Full Access: <span style="font-weight: 100;">You can now login to your account and use all available features.</span></li>
      <li style="font-weight: bold;">Service Bookings: <span style="font-weight: 100;">Browse and book cleaning services that fit your needs.</span></li>
      <li style="font-weight: bold;">Profile Management: <span style="font-weight: 100;">Update your account details and preferences to enhance your experience.</span></li>
    </ul>
    <p style="text-align: justify;">We’re thrilled to have you as an active member of the CleanEZ community. If you have any questions or need assistance, please don’t hesitate to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Visit us at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> to get started and make the most of your active account.</p>
    <p>Thank you for choosing CleanEZ. We look forward to serving you!</p>
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

export const DEACTIVATE_USER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Inactivity Notice</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">ACCOUNT INACTIVITY NOTICE</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We are writing to inform you that your CleanEZ account is scheduled to be set to inactive status in 7 days due to prolonged inactivity. While your account will remain secure, you will lose access to our services until reactivation.</p>
    <p style="text-align: justify;">If you wish to keep your account active, please log in to your CleanEZ account or contact us before the scheduled inactivity date. This will ensure uninterrupted access to our platform and services.</p>
    <p style="font-weight: bold;">What happens when your account becomes inactive?</p>
    <ul>
      <li style="font-weight: bold;">Limited Access: <span style="font-weight: 100;">You will not be able to book services or access your account features.</span></li>
      <li style="font-weight: bold;">Data Retention: <span style="font-weight: 100;">Your account data will remain stored securely, and you can reactivate at any time.</span></li>
    </ul>
    <p style="text-align: justify;">To reactivate your account, simply log in or contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>. We’re here to assist you with any concerns or questions.</p>
    <p>Visit us at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> for more information about our services and updates.</p>
    <p>Thank you for choosing CleanEZ. We hope to continue serving you in the future!</p>
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

export const WELCOME_WORKER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CleanEZ</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="header.png" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">WELCOME TO CLEAN<span style="font-weight: bold; color: #4CAF50;">EZ</span></span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">Welcome to CleanEZ! We’re thrilled to have you onboard as part of our dedicated team of professional cleaners. Together, we’re making spaces shine and providing exceptional service to our valued clients.</p>
    <p style="font-weight: bold;">Why CleanEZ is the right platform for you:</p>
    <ul>
      <li style="font-weight: bold;">Flexible Opportunities: <span style="font-weight: 100;">Choose schedules and jobs that suit your availability.</span></li>
      <li style="font-weight: bold;">Supportive Team: <span style="font-weight: 100;">We’re here to assist you every step of the way.</span></li>
      <li style="font-weight: bold;">Competitive Pay: <span style="font-weight: 100;">Earn fair compensation for your hard work.</span></li>
      <li style="font-weight: bold;">Reliable Platform: <span style="font-weight: 100;">Our system ensures secure and seamless connections with clients.</span></li>
    </ul>
    <p>Here’s your login information to access the worker portal:</p>
    <ul>
        <li><strong>Email:</strong> <span style="font-weight: bold; color: #4CAF50;">{workerEmail}</span></li>
        <li><strong>Password:</strong> <span style="font-weight: bold; color: #4CAF50;">{workerPassword}</span></li>
    </ul>
    <p style="text-align: justify;">We recommend logging in immediately and updating your password for security purposes. Through the portal, you can manage your tasks, track earnings, and stay updated on upcoming opportunities.</p>
    <p>Visit our website <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> or contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a> for any questions or assistance.</p>
    <p>Thank you for joining CleanEZ. Together, we’ll create spotless spaces and happy clients!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="footer.png" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ACTIVATE_WORKER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activation Notice</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">WORKER ACCOUNT ACTIVATION NOTICE</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We are excited to inform you that your CleanEZ worker account has been successfully activated! You are now fully equipped to access the platform and start connecting with clients.</p>
    <p style="text-align: justify;">As an active worker, you can now explore job opportunities, manage your profile, and utilize all the tools and features available to streamline your workflow and provide top-notch cleaning services.</p>
    <p style="font-weight: bold;">What’s next?</p>
    <ul>
      <li style="font-weight: bold;">Job Opportunities: <span style="font-weight: 100;">Browse and accept job postings that match your skills and availability.</span></li>
      <li style="font-weight: bold;">Profile Visibility: <span style="font-weight: 100;">Your profile is now visible to clients, increasing your chances of getting hired.</span></li>
    </ul>
    <p style="text-align: justify;">If you have any questions or need assistance, please don’t hesitate to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>. We’re here to support you every step of the way.</p>
    <p>Visit us at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> to get started and take full advantage of your active account.</p>
    <p>Thank you for being a part of the CleanEZ team. We look forward to seeing your success on our platform!</p>
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

export const DEACTIVATE_WORKER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Inactivity Notice</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">WORKER ACCOUNT INACTIVITY NOTICE</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We are writing to inform you that your CleanEZ worker account is scheduled to be set to inactive status in 7 days due to prolonged inactivity. While your account will remain secure, you will lose access to job opportunities and other platform features until reactivation.</p>
    <p style="text-align: justify;">If you wish to keep your account active, please log in to your CleanEZ account or contact us before the scheduled inactivity date. This will ensure uninterrupted access to job listings and other resources.</p>
    <p style="font-weight: bold;">What happens when your account becomes inactive?</p>
    <ul>
      <li style="font-weight: bold;">Job Access: <span style="font-weight: 100;">You will not be able to accept or view new job postings.</span></li>
      <li style="font-weight: bold;">Profile Visibility: <span style="font-weight: 100;">Your profile will no longer be visible to clients on the platform.</span></li>
      <li style="font-weight: bold;">Data Retention: <span style="font-weight: 100;">Your account data will remain stored securely, and you can reactivate at any time.</span></li>
    </ul>
    <p style="text-align: justify;">To reactivate your account, simply log in or contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>. We’re here to assist you with any concerns or questions.</p>
    <p>Visit us at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> for more information about our platform and updates.</p>
    <p>Thank you for being a part of the CleanEZ team. We hope to continue supporting you in your professional journey!</p>
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

export const SEND_USER_BOOKING_CONFIRMATION = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">BOOKING CONFIRMED</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{clientName}!</span></p>
    <p style="text-align: justify;">Thank you for choosing CleanEZ! We’re excited to inform you that your booking has been successfully confirmed.</p>
    <p style="font-weight: bold;">Booking Details:</p>
    <ul>
      <li><strong>Name:</strong> <span style="font-weight: bold; color: #4CAF50;">{customerFirstName} {customerLastName}</span></li>
      <li><strong>Address:</strong> <span style="font-weight: bold; color: #4CAF50;">{block} Brgy. {barangay} {municipal}, {province}</span></li>
      <li><strong>Service:</strong> <span style="font-weight: bold; color: #4CAF50;">{serviceType}</span></li>
      <li><strong>Size of Area:</strong> <span style="font-weight: bold; color: #4CAF50;">{sizeOfArea}</span></li>
      <li><strong>Date:</strong> <span style="font-weight: bold; color: #4CAF50;">{bookingDate}</span></li>
      <li><strong>Time:</strong> <span style="font-weight: bold; color: #4CAF50;">{bookingTime}</span></li>
      <li><strong>Total Cost:</strong> <span style="font-weight: bold; color: #4CAF50;">₱ {serviceCost}.00</span></li>
    </ul>
    <p style="text-align: justify;">Our professional cleaning team is ready to provide you with excellent service. Please ensure someone is available at the location during the scheduled time to grant access and address any specific requirements you might have.</p>
    <p>If you have any questions, need to make changes, or wish to cancel your booking, please contact us as soon as possible at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Visit our website <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> for more information or to manage your bookings.</p>
    <p>We look forward to serving you and ensuring your space sparkles! ✨</p>
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

export const SEND_WORKER_BOOKING_CONFIRMATION =  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Assigned</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=10jcHRjfgSTgPj2wi9efaef84W4uvZkBY" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">NEW BOOKING ASSIGNED</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{workerFirstName}!</span></p>
    <p style="text-align: justify;">We’re excited to let you know that you have been assigned a new booking! Below are the details:</p>
    <p style="font-weight: bold;">Booking Details:</p>
    <ul>
      <li><strong>Client Name:</strong> <span style="font-weight: bold; color: #4CAF50;">{custFName} {custLName}</span></li>
      <li><strong>Address:</strong> <span style="font-weight: bold; color: #4CAF50;">{block} Brgy. {barangay} {municipal} {province}</span></li>
      <li><strong>Service:</strong> <span style="font-weight: bold; color: #4CAF50;">{serviceType}</span></li>
      <li><strong>Size of Area:</strong> <span style="font-weight: bold; color: #4CAF50;">{sizeOfArea}</span></li>
      <li><strong>Date:</strong> <span style="font-weight: bold; color: #4CAF50;">{bookingDate}</span></li>
      <li><strong>Time:</strong> <span style="font-weight: bold; color: #4CAF50;">{bookingTime}</span></li>
      <li><strong>Assigned Team:</strong> <span style="font-weight: bold; color: #4CAF50;">{workerList}</span></li>
    </ul>
    <p style="text-align: justify;">Please ensure you arrive at the scheduled location on time and prepared to deliver the high-quality service CleanEZ is known for. If you encounter any issues or have questions regarding this booking, please contact us immediately at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Visit your dashboard at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> to view or manage your bookings.</p>
    <p>Thank you for being a valuable part of the CleanEZ team. Let’s make this a great experience for our client!</p>
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