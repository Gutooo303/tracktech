import axios from "axios";

export async function detect(url: string) {

    const response = await axios.get(url, {
        timeout: 10000,
        maxRedirects: 5,
        headers: {
            "User-Agent": "TrackTech/1.0"
        }
    });

    const html = String(response.data).toLowerCase();

    const headers = response.headers;

    const technologies = new Set<string>();

    const server = String(headers["server"] || "").toLowerCase();

    const poweredBy = String(
        headers["x-powered-by"] || ""
    ).toLowerCase();

    const cookies = String(
        headers["set-cookie"] || ""
    ).toLowerCase();

    // Frontend

    if (
        html.includes("__next") ||
        html.includes("/_next/")
    ) {
        technologies.add("Next.js");
    }

    if (html.includes("react")) {
        technologies.add("React");
    }

    if (
        html.includes("_nuxt") ||
        html.includes("vue")
    ) {
        technologies.add("Vue.js");
    }

    if (html.includes("ng-version")) {
        technologies.add("Angular");
    }

    if (html.includes("svelte")) {
        technologies.add("Svelte");
    }

    if (html.includes("astro")) {
        technologies.add("Astro");
    }

    // CSS

    if (html.includes("tailwind")) {
        technologies.add("Tailwind CSS");
    }

    if (html.includes("bootstrap")) {
        technologies.add("Bootstrap");
    }

    if (html.includes("bulma")) {
        technologies.add("Bulma");
    }

    // CMS

    if (
        html.includes("wordpress") ||
        html.includes("wp-content")
    ) {
        technologies.add("WordPress");
    }

    if (html.includes("shopify")) {
        technologies.add("Shopify");
    }

    if (html.includes("drupal")) {
        technologies.add("Drupal");
    }

    // Analytics

    if (html.includes("googletagmanager")) {
        technologies.add("Google Tag Manager");
    }

    if (
        html.includes("google-analytics") ||
        html.includes("gtag")
    ) {
        technologies.add("Google Analytics");
    }

    if (html.includes("hotjar")) {
        technologies.add("Hotjar");
    }

    if (html.includes("clarity.ms")) {
        technologies.add("Microsoft Clarity");
    }

    // Hosting / Server

    if (server.includes("cloudflare")) {
        technologies.add("Cloudflare");
    }

    if (server.includes("vercel")) {
        technologies.add("Vercel");
    }

    if (server.includes("netlify")) {
        technologies.add("Netlify");
    }

    if (server.includes("nginx")) {
        technologies.add("Nginx");
    }

    if (server.includes("apache")) {
        technologies.add("Apache");
    }

    // Backend

    if (poweredBy.includes("express")) {
        technologies.add("Express");
    }

    if (poweredBy.includes("php")) {
        technologies.add("PHP");
    }

    if (poweredBy.includes("laravel")) {
        technologies.add("Laravel");
    }

    if (poweredBy.includes("asp.net")) {
        technologies.add("ASP.NET");
    }

    // Segurança

    const security = {
        hsts: Boolean(
            headers["strict-transport-security"]
        ),

        csp: Boolean(
            headers["content-security-policy"]
        ),

        xFrameOptions: Boolean(
            headers["x-frame-options"]
        ),

        xssProtection: Boolean(
            headers["x-xss-protection"]
        ),

        noSniff: Boolean(
            headers["x-content-type-options"]
        )
    };

    // SEO

    const seo = {
        title:
            html.match(/<title>(.*?)<\/title>/)?.[1] || null,

        description:
            html.match(
                /<meta\s+name="description"\s+content="(.*?)"/
            )?.[1] || null
    };

    // PWA

    const pwa = {
        manifest: html.includes("manifest.json"),

        serviceWorker:
            html.includes("serviceworker"),

        appleWebApp:
            html.includes(
                "apple-mobile-web-app-capable"
            )
    };

    // Cookies

    const cookieInfo = {
        hasCookies: cookies.length > 0,

        secureCookies:
            cookies.includes("secure"),

        httpOnlyCookies:
            cookies.includes("httponly")
    };

    // Recursos extras

    const features = {
        websocket:
            html.includes("websocket") ||
            html.includes("socket.io"),

        graphql:
            html.includes("graphql"),

        firebase:
            html.includes("firebase"),

        stripe:
            html.includes("stripe"),

        googleFonts:
            html.includes("fonts.googleapis")
    };

    return {

        date: new Date().toLocaleString(),

        status: response.status,

        technologies: Array.from(technologies),

        server: headers["server"] || null,

        poweredBy:
            headers["x-powered-by"] || null,

        contentType:
            headers["content-type"] || null,

        security,

        seo,

        pwa,

        cookies: cookieInfo,

        features
    };
}