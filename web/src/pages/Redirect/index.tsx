import logoIcon from "../../assets/vectors/Logo_Icon.svg";
import { useParams } from "react-router-dom";

export default function Redirect() {
    const { path } = useParams<{ path: string }>();

    const originalUrl = "https://www.google.com.br/";

    return (
        <div className="flex flex-col justify-center px-3 max-w-xl mx-auto my-auto h-screen">
            <div className="flex flex-col gap-6 items-center justify-center bg-white rounded-lg w-full py-12 md:py-16 px-5">
                <img
                    src={logoIcon}
                    alt="Brevly Logo"
                    width={48}
                    height={48}
                />

                <h2 className="text-xl font-bold text-gray-600">Redirecionando...</h2>

                <p className="text-md text-gray-500 text-center">
                    O link será aberto automaticamente em alguns instantes.
                    <span className="block mt-1">
                        Não foi redirecionado?
                        <a className="text-blue-base underline ml-1" href={originalUrl}>Acesse aqui</a>
                    </span>
                </p>
            </div>
        </div >
    )
}
