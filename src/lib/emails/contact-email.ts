export const EmailTemplate = ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 10px;
          }
          .header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            background-color: #333;
            color: white;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: normal;
          }
          .content {
            padding: 20px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: 600;
            color: #666;
            margin-bottom: 4px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #333;
            font-size: 14px;
            line-height: 1.4;
          }
          .message {
            white-space: pre-wrap;
            word-break: break-word;
          }
          .divider {
            height: 1px;
            background-color: #eee;
            margin: 20px 0;
          }
          .footer {
            padding: 15px 20px;
            background-color: #f9f9f9;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="divider"></div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message">${message}</div>
            </div>
          </div>
          <div class="footer">
            Sent from website contact form
          </div>
        </div>
      </body>
    </html>
  `;
};
