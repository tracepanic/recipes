'use client';
import { useState, useEffect } from 'react';

export default function DBStatus() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        fetch('/api/mongodb/check-status')
            .then((res) => res.json())
            .then((data: { isConnected: boolean }) => setIsConnected(data.isConnected))
            .catch((err) => {
                console.error('Error fetching connection status:', err);
                setIsConnected(false);
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>MongoDB Connection Status</h1>
            {isConnected === null ? (
                <h2>Checking connection...</h2>
            ) : isConnected ? (
                <h2 style={{ color: 'green' }}>
                    Successfully connected to MongoDB!
                </h2>
            ) : (
                <h2 style={{ color: 'red' }}>Failed to connect to MongoDB.</h2>
            )}
        </div>
    );
}
