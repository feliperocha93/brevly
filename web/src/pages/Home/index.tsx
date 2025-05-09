import logo from "@/assets/Logo.svg";

import { useGetLinks } from "@/hooks/useGetLinks";
import { MyLinks } from "./my-links";
import { NewLink } from "./new-link";

export default function Home() {
    const { data, isLoading } = useGetLinks();
    const links = data || []

    return (
        <div className="flex flex-col gap-3 items-center md:items-start max-w-5xl mx-auto py-8 md:py-24 px-3">
            <img
                src={logo}
                alt="Brevly Logo"
                width={96}
                height={24}
                className="mb-4"
            />

            <div className="flex flex-col md:flex-row gap-5 w-full items-start">
                <NewLink />
                <MyLinks links={links} isLoadingLinks={isLoading} />
            </div>
        </div>
    )
}
