import logo from "../..//assets/vectors/Logo.svg";

import { MyLinks } from "./my-links";
import { NewLink } from "./new-link";

// Interactive
// Conect to back end

const links = [
    {
        id: 1,
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    },
    {
        id: 2,
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    },
    {
        id: 3,
        original: "https://www.exemplo.com.br",
        shortened: "brev.ly/123456",
        count: 10,
    }
]

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
