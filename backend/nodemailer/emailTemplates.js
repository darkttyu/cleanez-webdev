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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
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
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
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
      <li><strong>Earnings:</strong> <span style="font-weight: bold; color: #4CAF50;">₱ {earnings}.00</span></li>
      <li><strong>Assigned Team:</strong> <span style="font-weight: bold; color: #4CAF50;">{workerList}</span></li>
    </ul>
    <p style="text-align: justify;">Please ensure you arrive at the scheduled location on time and prepared to deliver the high-quality service CleanEZ is known for. If you encounter any issues or have questions regarding this booking, please contact us immediately at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Visit your dashboard at <a href="https://cleanez.net" style="color: #4CAF50;">cleanez.net</a> to view or manage your bookings.</p>
    <p>Thank you for being a valuable part of the CleanEZ team. Let’s make this a great experience for our client!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ACCEPT_APPLICANT_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulations! You’re Accepted</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">CONGRATULATIONS, WELCOME TO THE TEAM!</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">We’re thrilled to inform you that your application to join CleanEZ has been accepted! Welcome to our team of dedicated professionals who are committed to delivering exceptional cleaning services and making a positive impact in our clients’ lives.</p>
    <p style="font-weight: bold;">What’s next?</p>
    <ol>
      <li><strong>Account Setup:</strong> Use your initial CleanEZ login credentials provided below to access the worker portal.</li>
      <li><strong>Orientation:</strong> Familiarize yourself with our guidelines and best practices, available in the portal.</li>
      <li><strong>Start Accepting Jobs:</strong> Browse available tasks and choose those that fit your schedule and expertise.</li>
    </ol>
    <p>If you have any questions or require assistance, feel free to reach out to us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>We’re excited to have you on board and can’t wait to see the amazing work you’ll do. Welcome to the CleanEZ family!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const REJECT_APPLICANT_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Application</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">THANK YOU FOR YOUR APPLICATION</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName}!</span></p>
    <p style="text-align: justify;">Thank you for applying to join CleanEZ. We truly appreciate the time and effort you took to submit your application and express your interest in being a part of our team.</p>
    <p style="text-align: justify;">After careful consideration and review of all applications, we regret to inform you that we have decided to move forward with other candidates for this opportunity.</p>
    <p style="text-align: justify;">This decision was not an easy one, as we were impressed by your background and achievements. While this particular role may not be the right fit, we encourage you to keep an eye on our careers page for future opportunities that may align with your skills and aspirations.</p>
    <p style="text-align: justify;">If you have any questions or would like feedback on your application, feel free to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>. We’d be happy to assist you further.</p>
    <p style="text-align: justify;">Thank you again for considering CleanEZ. We wish you all the best in your job search and future endeavors.</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WORKER_PAID_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Payment Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">APPOINTMENT PAID</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{workerFirstName} {workerLastName}!</span></p>
    <p style="text-align: justify;">We’re pleased to inform you that the payment for an upcoming appointment assigned to you has been successfully processed. Below are the details of the appointment:</p>
    <ul>
      <li><strong>Client Name:</strong> <span style="font-weight: bold; color: #4CAF50;">{custFName} {custLName}</span></li>
      <li><strong>Service:</strong> <span style="font-weight: bold; color: #4CAF50;">{serviceName}</span></li>
      <li><strong>Appointment Date:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentDate}</span></li>
      <li><strong>Location:</strong> <span style="font-weight: bold; color: #4CAF50;">{block} {barangay} {municipal} {province}</span></li>
      <li><strong>Total Amount Paid:</strong> <span style="font-weight: bold; color: #4CAF50;">Php. {serviceCost}</span></li>
    </ul>
    <p style="text-align: justify;">Please make sure to review the appointment details thoroughly and arrive at the client’s location on time. If there are any special instructions or requirements provided by the client, they will be visible in your worker portal.</p>
    <p style="text-align: justify;">For any questions or concerns, feel free to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Thank you for your dedication and commitment to providing top-notch service. Let’s make this appointment a success!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const APPLICANT_CONFIRMATION_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - CleanEZ</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">YOUR APPLICATION HAS BEEN RECEIVED!</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName} {lastName}!</span></p>
    <p style="text-align: justify;">Thank you for applying to become a CleanEZ worker! We have successfully received your application and our team is currently reviewing it thoroughly. We appreciate your interest in joining our platform and look forward to assessing your qualifications.</p>
    
    <p style="font-weight: bold;">What happens next?</p>
    <ul>
      <li><strong>Application Review:</strong> Our team will carefully evaluate your application details.</li>
      <li><strong>Final Decision:</strong> Once your application has been reviewed, we will notify you of the outcome.</li>
    </ul>

    <p style="text-align: justify;">Please allow some time for our team to process your application. If you have any questions in the meantime, feel free to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>

    <p>We appreciate your patience and will be in touch with you soon!</p>

    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>

  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>

  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`;

export const USER_APTCANCELLATION_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Cancellation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="https://drive.google.com/uc?id=19glRWOZo-_BIDAAgFyZ1YeDHoiJy9mhr" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">APPOINTMENT CANCELLATION CONFIRMATION</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{customerFirstName} {customerLastName}!</span></p>
    <p style="text-align: justify;">We have successfully processed your request to cancel your appointment. Below are the details of your canceled booking:</p>
    <ul>
      <li><strong>Service:</strong> <span style="font-weight: bold; color: #4CAF50;">{serviceName}</span></li>
      <li><strong>Appointment Date:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentDate}</span></li>
      <li><strong>Time:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentTime}</span></li>
      <li><strong>Location:</strong> <span style="font-weight: bold; color: #4CAF50;">{block} {barangay} {municipal} {province} </span></li>
    </ul>
    <p style="text-align: justify;">If this cancellation was made in error or if you wish to reschedule, please contact us at your earliest convenience.</p>
    <p>If you have any questions or need further assistance, feel free to reach out to us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Thank you for using CleanEZ. We hope to assist you again in the future!</p>
    <p>Best regards,<br><span style="font-weight: bold; color: #4CAF50;">CleanEZ Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 10px;">
    <img src="https://drive.google.com/uc?id=1xotvLl_V7k0oQi6B5b9RFE8g4_PIhExX" alt="Footer Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WORKER_APTCANCELLATION_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Cancellation Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center;">
    <img src="header.png" alt="Header Image" style="max-width: 100%; height: auto;">
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <span style="font-size: large; font-weight: bold; color: #20063B;">APPOINTMENT CANCELLATION</span>
    </div>
    <p>Hello, <span style="font-weight: bold; color: #4CAF50;">{firstName} {lastName}!</span></p>
    <p style="text-align: justify;">We regret to inform you that a user has canceled their scheduled appointment. Please find the details of the canceled appointment below:</p>
    <ul>
      <li><strong>Service:</strong> <span style="font-weight: bold; color: #4CAF50;">{serviceName}</span></li>
      <li><strong>Appointment Date:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentDate}</span></li>
      <li><strong>Time:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentTime}</span></li>
      <li><strong>Location:</strong> <span style="font-weight: bold; color: #4CAF50;">{appointmentAddress}</span></li>
      <li><strong>User:</strong> <span style="font-weight: bold; color: #4CAF50;">{customerFirstName} {customerLastName}</span></li>
    </ul>
    <p style="text-align: justify;">We apologize for any inconvenience this may cause. The appointment has been removed from your schedule. If you have any questions or concerns regarding this cancellation, please feel free to reach out to us.</p>
    <p>If you'd like to view your updated schedule or explore other available appointments, you can log in to your worker portal:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="https://cleanez.vercel.app/home" style="display: inline-block; background-color: #20c25b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Return to Home</a>
    </div>
    <p>If you have any questions or require assistance, don’t hesitate to contact us at <a href="mailto:info.cleanez24@gmail.com" style="color: #4CAF50;">info.cleanez24@gmail.com</a>.</p>
    <p>Thank you for your understanding and for being a valued part of the CleanEZ team!</p>
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