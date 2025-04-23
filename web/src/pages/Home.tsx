export default function Home() {
    return (
        <main className='h-dvh flex flex-col items-center justify-center p-10'>
            <h1 className="text-3xl font-bold underline">Welcome to the Home Page!</h1>
            <p className="mt-4">This is the main page of our application.</p>
            <a href="/about" className="mt-2 text-blue-500 hover:underline">Learn more about us</a>
        </main>
    )
}
