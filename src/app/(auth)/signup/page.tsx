import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <section className="relative hidden bg-red-900 lg:block p-8">
        <header className="h-full flex flex-col justify-between text-white">
          <h2 className="text-3xl">
            Facilite a gestão do seu negócio com{" "}
            <span className="underline">Ordine</span>
          </h2>
          <span>Powered by Brasilis Club</span>
        </header>
      </section>
      <section className="flex flex-col gap-4 p-6 md:p-10 items-center justify-center">
        <SignupForm />
      </section>
    </div>
  );
}
