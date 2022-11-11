import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'


export function Home() {
  const [auth] = useLocalStorage('auth', {})

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
  }


  return (
    <div className="h-screen bg-red-700 p-4 space-y-6 text-white flex flex-col items-center">

      <header className="container flex justify-center max-w-5xl p-4">
        <img src="/assets/logo/logo-fundo-vinho.svg" className="w-40" />
      </header>

      <div className="container max-w-5xl flex-1 p-4 flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6 ">

        <div className="md:flex-1 flex justify-center">
          <img src="/assets/imagem/img.png" className="w-60 md:w-full md:max-w-md" />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-2xl text-center font-bold md:text-3xl md:text-left">Dê o seu palpite na Copa do Mundo do Catar 2022! </h1>

          <a href="/signup" className="text-center text-red-700 bg-white hover:bg-red-300 hover:text-white text-xl px-8 py-4 rounded-xl ">
            Criar minha conta
          </a>

          <a href="/login" className="text-center text-white border border-white hover:bg-red-300 text-xl px-8 py-4 rounded-xl ">
            Fazer login
          </a>

          <a href="/users" className="text-center text-white border border-white hover:bg-red-300 text-xl px-8 py-4 rounded-xl ">
            Usuarios
          </a>
        </div>
      </div>
    </div>

  )
}