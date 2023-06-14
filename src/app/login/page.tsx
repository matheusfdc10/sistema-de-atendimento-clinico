import AuthForm from "@/components/forms/AuthForm";

export default function Login() {
  return (
    <div
        className="
          flex
          min-h-full
          flex-col
          justify-center
          py-12
          px-4
          lg:px-8
          bg-neutral-100
        "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2
              className="
                  mt-6
                  text-center
                  text-3xl
                  font-bold
                  tracking-tight
                  text-gray-900
              "
            >
              Entrar
            </h2>
        </div>
        <AuthForm />
      </div>
  )
}
