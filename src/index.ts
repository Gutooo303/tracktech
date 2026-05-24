import "dotenv/config";
import Fastify from "fastify";
import detect from "./routes/detect";
import cors from "@fastify/cors";

const app = Fastify();

app.register(detect);

app.register(cors, {
    origin: "*",
    methods: ["GET"]
});

const PORT = Number(process.env.PORT);

app.get("/", async (request, reply) => {
    reply.send({ message: "Welcome to the Tracktech API! Use /detect?url=yourwebsite.com to detect technologies." });
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
    console.log(`Server is running on port ${PORT}`);
});