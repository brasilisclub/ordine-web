import Header from "@/components/app/header";
import OrdineForm from "@/components/forms/ordine-form";

import { RouteProps } from "@/types/route";

export default function OrdinesRegister() {
  const page: RouteProps = { label: "Cadastro" };
  const links: RouteProps[] = [{ label: "Comandas", href: "/ordines" }];
  return (
    <main className="flex flex-col gap-4 h-full w-full">
      <Header page={page} links={links} />
      <section
        className="flex flex-col gap-3 max-w-xl w-full mx-auto"
        aria-labelledby="page-title"
      >
        <header className="flex items-center justify-between w-full mt-4 mb-12">
          <h1 className="text-4xl flex items-end" id="page-title">
            Cadastrar Comanda
          </h1>
        </header>
        <OrdineForm />
      </section>
    </main>
  );
}
