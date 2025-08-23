import 'dotenv/config'
import Fastify,{type FastifyRequest} from 'fastify'
import { appendFile } from 'fs';
const app = Fastify({
    logger: true
})

const post = process.env.PORT || 3000;

app.get('/', async (request, reply) => {
    console.log('GET request received');
    return "Hello World!";
});

app.get('/:id', async (req:FastifyRequest<{Params : {id : string}}>, res) => {
    console.log('GET request received');
    const { id } = req.params;
    console.log(`ID: ${id}`);
    return `Hello World! Your ID is ${id}`;
});

app.post('/', async (req, res) => {
    console.log('POST request received');
    const body = req.body;
    console.log(`Body: ${JSON.stringify(body)}`);
    return "Hello World!";
});

try{
    await app.listen({port:Number(post)})
    console.log(`Server listening on port ${post}`)
}catch (error) {
    app.log.error(error)
    process.exit(1)
}
