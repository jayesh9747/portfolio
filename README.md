# Jayesh Portfolio

Static HTML portfolio with a Netlify serverless contact form.

## Deploy on Netlify

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site > Import an existing project**.
3. Select this GitHub repository.
4. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
5. Add these environment variables in **Site configuration > Environment variables**:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_FROM=
SMTP_PASS=your-gmail-app-password
```

The contact form posts to `/.netlify/functions/send-contact`. The SMTP password must stay in Netlify environment variables, not in `index.html`.
