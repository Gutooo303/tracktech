import "dotenv/config";
import Fastify from "fastify";
import detect from "./routes/detect";

const app = Fastify();

app.register(detect);

const PORT = Number(process.env.PORT);

app.get("/", async (request, reply) => {
    reply.send({ message: "Welcome to the Tracktech API! Use /detect?url=yourwebsite.com to detect technologies." });
});

app.listen({ port: PORT }).then(() => {
    console.log(`Server is running on port ${PORT}`);
});