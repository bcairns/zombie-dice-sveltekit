// Store all connections in a set-map
const clients = new Map();

/** @type {import('./$types').RequestHandler} */
export const GET = ({ params }) => {
	let controller;

	return new Response(
		new ReadableStream({
			start: (_) => {
				controller = _;
				clients.set(params['id'], controller);
			},
			cancel: () => {
				clients.delete(params['id']);
			}
		}),
		{
			headers: {
				'Content-Type': 'text/event-stream',
				Connection: 'keep-alive',
				'Cache-Control': 'no-cache'
			}
		}
	);
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, params }) => {
	const encoder = new TextEncoder();
	const message = await request.text();
	for (const [id, connection] of clients) {
		if (id === params['id']) {
			continue;
		}

		// First format the message correctly with 'data: ' as prefix and 2 new lines as suffix
		// Then encode the message to a Uint8Array to be sent to the client
		connection.enqueue(encoder.encode(`data: ${params['id']}: ${message}\n\n`));
	}

	return new Response(null, { status: 204 });
};
