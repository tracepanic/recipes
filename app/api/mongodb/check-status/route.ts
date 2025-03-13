import clientPromise from '@/lib/mongodb';

export async function GET(): Promise<Response> {
    try {
        const client = await clientPromise;
        const db = client.db();
        await db.command({ ping: 1 });

        return new Response(JSON.stringify({ isConnected: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return new Response(JSON.stringify({ isConnected: false }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
