import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export function NewLink() {
    return (
        <div className="bg-white rounded-lg w-full flex flex-col gap-5 md:gap-6 p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-600">Novo Link</h2>

            <div className="flex flex-col gap-4">
                <Input label="Link Original" placeholder="www.exemplo.com.br" />
                <Input label="Link Encurtado" placeholder="brev.ly/" />
            </div>

            <Button>Salvar Link</Button>
        </div>
    )
}
