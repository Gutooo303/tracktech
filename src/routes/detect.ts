import fastify, { FastifyInstance } from "fastify";
import { detect as detectTech } from "../services/detect.tech";

export default async function detect(fastify: FastifyInstance) {
    fastify.get("/detect", async (request, reply) => {
        const { url } = request.query as { url: string };

        if (!url) {
            return reply.status(400).send({ error: "URL is required" });
        }

        const technologies = await detectTech(url);
        return reply.send({ url, technologies });
    });
}