import Icon404 from "../../assets/404.svg"

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center px-3 max-w-xl mx-auto my-auto h-screen">
            <div className="flex flex-col gap-6 items-center justify-center bg-white rounded-lg w-full py-12 md:py-16 px-5 md:px-12">
                <img
                    src={Icon404}
                    alt="404"
                    width={164}
                    height={72}
                />

                <h2 className="text-xl font-bold text-gray-600">Link não encontrado</h2>

                <p className="text-md text-gray-500 text-center">
                    O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em
                    <a className="text-blue-base underline ml-1" href="/">brevly-self.vercel.app</a>
                </p>
            </div>
        </div >
    )
}
