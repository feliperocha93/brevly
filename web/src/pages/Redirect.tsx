export default function Redirect() {
    return (
        <main className='h-dvh flex flex-col items-center justify-center p-10'>
            <h1 className="text-3xl font-bold underline">Redirecting...</h1>
            <p className="mt-4">If you are not redirected automatically, please click the link below:</p>
            <a href="https://example.com" className="mt-2 text-blue-500 hover:underline">Go to Example</a>
        </main>
    )
}
