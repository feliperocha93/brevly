import { Button } from "../components/ui/button";
import { IconButton } from "../components/ui/icon-button";
import { Input } from "../components/ui/input";

import logo from "../assets/vectors/Logo.svg";

import IconCopy from "../assets/icons/Copy.svg";
import IconDonwload from "../assets/icons/DownloadSimple.svg";
import IconLink from "../assets/icons/Link.svg";
import IconTrash from "../assets/icons/Trash.svg";

// Componentizar
// Desktop
// Interactive
// Conect to back end

const links = []

export default function Home() {
    return (
        <div className="flex flex-col gap-3 items-center bg-gray-200 py-8 px-3">
            <img
                src={logo}
                alt="Brevly Logo"
                width={96}
                height={24}
                className="mb-4"
            />

            <div className="flex flex-col gap-5 bg-white p-6 w-full rounded-lg">
                <h2 className="text-lg font-bold text-gray-600">Novo Link</h2>

                <div className="flex flex-col gap-4">
                    <Input label="Link Original" placeholder="www.exemplo.com.br" />
                    <Input label="Link Encurtado" placeholder="brev.ly/" />
                </div>

                <Button>Salvar Link</Button>
            </div>

            <div className="flex flex-col gap-4 bg- p-6 w-full rounded-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-600">Meus Links</h2>
                    <Button variant="secondary">
                        <img src={IconDonwload} alt="Download CSV" className="w-4 h-4" />
                        <span>Baixar CSV</span>
                    </Button>
                </div>

                <div className="flex flex-col">
                    {links.map((link) => (
                        <div key={link.id} className="flex justify-between border-t border-t-gray-200 py-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-md font-semibold text-blue-base">{link.shortened}</span>
                                <span className="text-sm text-gray-500 max-w-[160px] truncate">{link.original}</span>
                            </div>

                            <div className="flex gap-1 items-center justify-between">
                                <span className="text-sm text-gray-500 mr-3">{link.count} acessos</span>
                                <IconButton icon={IconCopy} />
                                <IconButton icon={IconTrash} />
                            </div>
                        </div>
                    ))}

                    {/* Placeholder for no links */}
                    {links.length === 0 && (
                        <div className="flex flex-col gap-3 items-center justify-center border-t border-t-gray-200 pt-8 pb-4">
                            <img src={IconLink} alt="No links" className="w-6 h-6 text-gray-400" />
                            <span className="text-sm uppercase text-gray-500">Ainda não existem links cadastrados</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
