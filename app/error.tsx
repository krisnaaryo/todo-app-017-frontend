'use client';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="p-4">
            <h2 className="text-red-500 mb-2">Terjadi Kesalahan!</h2>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Coba Lagi
            </button>
        </div>
    );
}