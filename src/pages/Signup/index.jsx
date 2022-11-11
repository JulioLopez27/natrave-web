import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { Icon, Input, errorEmail, errorUsername,fails } from '~/components'



const validationSchema = yup.object().shape({
    name: yup.string().required('Preencha o seu nome'),
    username: yup.string().required('Preencha o seu nome de usuario'),
    email: yup.string().email('Informe um email válido').required('Informe seu e-mail'),
    password: yup.string().required('Digite uma senha').min(6, 'At least 6 charater').trim(),
})

export const Signup = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    const formik = useFormik({

        onSubmit: async (values) => {
            try {
                const res = await axios({
                    method: 'post',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/signup',
                    data: values
                })
                setAuth(res.data)
            } catch (error) {
                if (error.response.status === 303) {
                    errorUsername()
                }else if(error.response.status === 302){
                    errorEmail()
                }else{
                    fails()
                }
            }
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        }, validationSchema

    })


    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />
    }

    return (
        <div>
            <header className="p-4 border-b-2 border-red-300">
                <div className="container max-w-2xl flex justify-center">
                    <img src="/assets/logo/logo-fundo-branco.svg" className="w-32 md:w-40" />
                </div>
            </header>

            <main className="container max-w-2xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon name="back" className="h-6" />
                    </a>
                    <h2 className="text-xl font-bold">Crie sua conta</h2>
                </div>

                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
                        autoComplete="off"
                        type="text"
                        name="name"
                        label="Seu nome"
                        placeholder="Digite seu nome"
                        error={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Input
                        autoComplete="off"
                        type="text"
                        name="username"
                        label="Seu nome de usuário"
                        placeholder="Digite um nome de usuário"
                        error={formik.touched.username && formik.errors.username}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        autoComplete="off"
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        error={formik.touched.password && formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button type='submit' className="block w-full text-center text-white bg-red-500  px-6 py-3 rounded-xl disabled:opacity-50"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        {formik.isSubmitting ? 'Criando usuario...' : 'Criar minha conta'}
                    </button>

                </form>

            </main>

        </div>
    )
}