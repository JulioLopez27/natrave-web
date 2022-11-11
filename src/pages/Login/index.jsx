import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'
import { Icon, Input, errorEmailLogin,errorPassLogin } from '~/components'





const validationSchema = yup.object().shape({
    email: yup.string().email("Escreva um email valido").required("Preencha o seu e-mail"),
    password: yup.string().required("Digite sua senha ").min(6, 'At least 6 charater').trim()
})

export const Login = () => {

    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {
            try {
                const res = await axios({
                    method: 'get',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/login',
                    auth: {
                        username: values.email,
                        password: values.password
                    }
                })
                setAuth(res.data)
            } catch (error) {
                if (error.response.status === 404) {
                    errorEmailLogin()
                }else if(error.response.status === 406){
                    errorPassLogin()
                }
            }

        },

        initialValues: {
            email: '',
            password: ''
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
                    <h2 className="text-xl font-bold">Entre na sua conta</h2>
                </div>

                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                    <Input
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
                        {formik.isSubmitting ? 'Loading...' : 'Entrar'}
                    </button>

                </form>

            </main>

        </div>
    )
}