export default function NotFound() {
    return (
        <main className='h-dvh flex flex-col items-center justify-center p-10'>
            <h1 className="text-3xl font-bold underline">404 Not Found</h1>
            <p className="mt-4">The page you are looking for does not exist.</p>
            <a href="/" className="mt-2 text-blue-500 hover:underline">Go to Home</a>
        </main>
    )
}
