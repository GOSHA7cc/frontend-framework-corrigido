import React, { useContext, useState } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

function SignIn() {
    const { googleLoginHandler } = useContext(authContext)

    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar a senha
    const [
        createUserWithEmailAndPassword,
        userRegister,
        loadingRegister,
        errorRegister,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    if (loading || loadingRegister) {
        return (
            <div className="spinner-container flex justify-center items-center h-screen">
                <div className="loading-spinner">
                </div>
            </div>
        )
    }
    if (user || userRegister) {
        return (
            <div>
                <p>Usuário registrado: {user.user.email}</p>
            </div>
        );
    }

    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold text-white">Bem-vindo ao Nosso Site</h1>
                    <p className="text-lg text-gray-600">Faça login ou registre-se para acessar os recursos exclusivos.</p>
                </div>

                <form className="border border-gray-700 rounded-lg p-6 bg-gray-900">
                    {showLogin && (
                        <div className="Login flex flex-col gap-4 justify-between">
                            <input
                                placeholder="Digite seu Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-2 text-black" // Cor do texto ajustada para branco
                            />
                            <div className="relative border border-gray-300 rounded-lg">
                                <input
                                    placeholder="Digite sua Senha"
                                    type={showPassword ? "text" : "password"} // Mostra/oculta a senha
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-2 text-black" // Cor do texto ajustada para branco
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)} // Alternar a visibilidade da senha
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white w-28 py-2 px-4 rounded-lg' onClick={() => toast.error(error?.code) && signInWithEmailAndPassword(email, password)}>
                                Entrar
                            </button>
                            <button onClick={() => { setShowRegister(true), setShowLogin(false) }} className="text-blue-500 flex justify-end">Não possui uma conta? Crie agora!</button>
                        </div>
                    )}

                    {showRegister && (
                        <div className="Register flex flex-col gap-4 justify-between">
                            <input
                                placeholder="Digite seu Email"
                                type="email"
                                value={emailRegister}
                                onChange={(e) => setEmailRegister(e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg p-2 text-white" // Cor do texto ajustada para branco
                            />
                            <div className="relative border border-gray-300 rounded-lg">
                                <input
                                    placeholder="Digite sua Senha"
                                    type={showPassword ? "text" : "password"} // Mostra/oculta a senha
                                    value={passwordRegister}
                                    onChange={(e) => setPasswordRegister(e.target.value)}
                                    required
                                    className="w-full p-2 text-white" // Cor do texto ajustada para branco
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)} // Alternar a visibilidade da senha
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white w-28 py-2 px-4 rounded-lg' onClick={() => toast.error(errorRegister?.code) && createUserWithEmailAndPassword(emailRegister, passwordRegister)}>
                                Registrar
                            </button>
                            <button onClick={() => { setShowLogin(true), setShowRegister(false) }} className="text-blue-500 flex justify-end">Possui uma conta? Entre com ela!</button>
                        </div>
                    )}

                    <div className="Google-Login">
                        <button
                            onClick={googleLoginHandler}
                            className="flex items-center gap-2 p-3 font-medium text-gray-900 bg-gray-800 rounded-lg">
                            <FcGoogle className="text-3xl" /> Entre com sua conta Google
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignIn;
