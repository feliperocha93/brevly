import logo from "../..//assets/vectors/Logo.svg";

import { MyLinks } from "./my-links";
import { NewLink } from "./new-link";

// Interactive: Estou validando o input, preciso instalar o zod e confirmar se vou seguir a estratégia q est[a l[a]]
// Conect to back end

const links = [
    {
        id: "mocked-uuid-1",
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    },
    {
        id: "mocked-uuid-2",
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    },
    {
        id: "mocked-uuid-3",
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    }
];

export default function Home() {
    return (
        <div className="flex flex-col gap-3 items-center md:items-start max-w-5xl mx-auto py-8 md:py-24 px-3">
            <img
                src={logo}
                alt="Brevly Logo"
                width={96}
                height={24}
                className="mb-4"
            />

            <div className="flex flex-col md:flex-row gap-5 w-full">
                <NewLink />
                <MyLinks links={links} />
            </div>
        </div>
    )
}
