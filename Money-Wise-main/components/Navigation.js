'use client'
import { ImStatsBars } from "react-icons/im"
import { useContext } from "react"
import { authContext } from "@/lib/store/auth-context"

function Nav() {

  const { user, loading, logout } = useContext(authContext)

  return (
    <header className="container max-w-2xl px-4 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* Informação do usuario */}
        {user && !loading && (
          <div className="flex items-center gap-2">
            {/* Foto do perfil */}
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">

              {user.photoURL && (
                <img
                  className="object-cover w-full h-full"
                  src={user.photoURL}
                  alt={user.displayName} referrerPolicy="no-referrer" />
              )}

              {!user.photoURL &&(
              <img
                className="object-cover w-full h-full"
                alt="panda"
                src="https://www.fatosdesconhecidos.com.br/wp-content/uploads/2020/01/images-600x377.png" />
              )}
            </div>

            {/* Nome do usuario */}
            {user.displayName && (
              <h1>Olá, {user.displayName}</h1>
            )}

            {!user.displayName && (
            <p>Olá, Usuário</p>
            )}
          </div>
        )}

        {/* Lado direito da nav */}
        {user && !loading && (

          <nav className="flex items-center gap-4">
            <div>
            <a href="#stats">
              <ImStatsBars className="text-2xl" />
            </a>
            </div>

            <div>
              <button onClick={logout} className="btn btn-danger">Sair</button>
            </div>

          </nav>
        )}
      </div>
    </header>
  )
}

export default Nav