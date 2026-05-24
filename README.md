# Tracktech API

Tracktech is a simple Node.js API for detecting technologies used by a website. It is built with Fastify and uses Axios and Cheerio to inspect a target URL and return a structured report.

## Technologies Used

- Node.js
- Fastify
- TypeScript
- dotenv
- axios
- cheerio

## Project Structure

```

tracktech/
├── node_modules/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── detect.ts
│   └── services/
│       └── detect.tech.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

```

## Installation

Clone the repository:

```bash
git clone https://github.com/Gutooo303/tracktech.git
cd tracktech
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Rename `.env.example` to `.env` and set the port if needed:

```env
PORT=3000
```

## Running the Project

Build the TypeScript project:

```bash
npm run build
```

Start the application:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

## API Endpoints

### Root

`GET /`

#### Example response

```json
{
  "message": "Welcome to the Tracktech API! Use /detect?url=yourwebsite.com to detect technologies."
}
```

### Detect technologies

`GET /detect?url=<website-url>`

#### Example request

```bash
GET /detect?url=https://example.com
```

#### Example response

```json
{
  "url": "https://example.com",
  "technologies": [
    "Next.js",
    "React",
    "Cloudflare"
  ],
  "server": "cloudflare",
  "poweredBy": null,
  "contentType": "text/html; charset=UTF-8",
  "security": {
    "hsts": true,
    "csp": true,
    "xFrameOptions": true,
    "xssProtection": false,
    "noSniff": true
  },
  "seo": {
    "title": "Example Domain",
    "description": null
  },
  "pwa": {
    "manifest": false,
    "serviceWorker": false,
    "appleApp": false
  },
  "cookies": {
    "hasCookies": false,
    "secureCookies": false,
    "httpOnlyCookies": false
  },
  "features": {
    "websocket": false,
    "graphql": false,
    "firebase": false,
    "stripe": false,
    "googleFonts": false
  }
}
```

## Notes

- The API fetches the target site, inspects HTTP headers and HTML content, and returns a detection summary.
- The default port is defined in `.env`.

## Author

Developed by Gutooo303.