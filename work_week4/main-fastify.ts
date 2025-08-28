import "dotenv/config";
import fastify, {type FastifyRequest} from "fastify";

const app = fastify({
    logger: true
});

const post = process.env.PORT || 3000;

app.get("/", async (request, reply) => {
    console.log("GET request received");
    return "Hello World!";
});

app.get("/:id", async (req:FastifyRequest<{ Params: { id: string; } }>, res) => {
    console.log("GET request received");
    const { id } = req.params;
    return `Hello World! ${id}`;
});

app.post("/", async (req, res) => {
    console.log("POST request received");
    return `Hello POST!`;
});

try{
    await app.listen({ port: Number(post) });
    console.log(`Server is running on port ${post}`);
}catch(error){
    app.log.error(error);
    process.exit(1);
}