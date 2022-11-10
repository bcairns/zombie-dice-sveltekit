import type {RequestHandler} from '@sveltejs/kit';

const response204 = new Response(null, { status: 204 }); // 204 = request ok, no content to return
const clients = new Set<ReadableStreamDefaultController>();

export const GET:RequestHandler = ({ params }) => {

	console.log('lobby event server, new connection (GET)');

	let controller:ReadableStreamDefaultController;

	const stream = new ReadableStream({
		start: (_) => {
			console.log('stream start');
			controller = _;
			clients.add(controller);
		},
		cancel: () => {
			clients.delete(controller);
			console.log('server closed event stream, remaining:', clients.size);
		}
	});

	console.log('enqueing welcome message', clients.size);
	for (const connection of clients) {
		connection.enqueue(`data: {"playerCount": ${clients.size}}\n\n`);
	}

	return new Response(
		stream,
		{
			headers: {
				'Content-Type': 'text/event-stream',
				Connection: 'keep-alive',
				'Cache-Control': 'no-cache'
			}
		}
	);
};

export const POST:RequestHandler = async ({ request, params }) => {
	console.log('Lobby Event server received POST');
	const message = await request.text();
	for (const connection of clients) {
		// First format the message correctly with 'data: ' as prefix and 2 new lines as suffix
		// Then encode the message to a Uint8Array to be sent to the client
		connection.enqueue(`data: ${params['id']}: ${message}\n\n`);
	}

	return response204;
};
