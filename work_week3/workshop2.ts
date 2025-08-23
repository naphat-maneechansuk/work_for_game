import 'dotenv/config'
import Fastify,{type FastifyRequest} from 'fastify'
import { appendFile } from 'fs';
const app = Fastify({
    logger: true
})

const post = process.env.PORT || 3000;

app.get('/title', async (request, reply) => {
    console.log('GET request received');
    return "Hello get fastify!";
});

app.get('/title/:id', async (req:FastifyRequest<{Params : {id : string}}>, res) => {
    console.log('GET request received');
    const { id } = req.params;
    console.log(`ID: ${id}`);
    return `Hello get fastify! Your ID is ${id}`;
});

app.post('/title', async (req, res) => {
    console.log('POST request received');
    const body = req.body;
    console.log(`Body: ${JSON.stringify(body)}`);
    return "Hello post fastify!";
});

app.put('/title/:id', async (req:FastifyRequest<{Params : {id : string}}>, res) => {
    console.log('PUT request received');
    const { id } = req.params;
    const body = req.body;
    console.log(`ID: ${id}`);
    console.log(`Body: ${JSON.stringify(body)}`);
    return `Hello put fastify! Your ID is ${id}`;
});

app.delete('/title/:id', async (req:FastifyRequest<{Params : {id : string}}>, res) => {
    console.log('DELETE request received');
    const { id } = req.params;
    console.log(`ID: ${id}`);
    return `Hello delete fastify! Your ID is ${id}`;
});

try{
    await app.listen({port:Number(post)})
    console.log(`Server listening on port ${post}`)
}catch (error) {
    app.log.error(error)
    process.exit(1)
}
