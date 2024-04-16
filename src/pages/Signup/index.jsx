import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import { useState } from 'react'
import { Icon, Input, CustomModal } from '~/components'



const validationSchema = yup.object().shape({
    name: yup.string().required('Fill with your name'),
    username: yup.string().required('Fill with your username'),
    email: yup.string().email('Write a valid email').required('Fill your email'),
    password: yup.string().required('Write a password').min(6, 'At least 6 charater').trim(),
})

export const Signup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false) // Agrega este estado
    const [message, setMessage] = useState('') // Agrega este estado para manejar el mensaje de error  
    const [messageType, setMessageType] = useState('')


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
                if (error.response.status === 302) {
                    setIsModalOpen(true);
                    setMessage("The email you provide is already in use.");
                    setMessageType("error");
                    return;
                } 
                 if (error.response.status === 303) {
                    setIsModalOpen(true);
                    setMessage("The username you provide is already in use.");
                    setMessageType("error");
                    return;
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

    const handleCloseModal = () => {
        setIsModalOpen(false); // Función para cerrar el modal
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
                <section>
                    <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                        <Input
                            autoComplete="off"
                            type="text"
                            name="name"
                            label="Your name"
                            placeholder="Write your name"
                            error={formik.touched.name && formik.errors.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Input
                            autoComplete="off"
                            type="text"
                            name="username"
                            label="Your username"
                            placeholder="Write a username"
                            error={formik.touched.username && formik.errors.username}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <Input
                            autoComplete="off"
                            type="text"
                            name="email"
                            label="Your e-mail"
                            placeholder="Write your e-mail"
                            error={formik.touched.email && formik.errors.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Your password"
                            placeholder="Write your password"
                            error={formik.touched.password && formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <button type='submit' className="block w-full text-center text-white bg-red-500  px-6 py-3 rounded-xl disabled:opacity-50"
                            disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Criando usuario...' : 'Sign-up'}
                        </button>

                    </form>
                </section>
                <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} message={message} messageType={messageType}>
                    <h2 className="text-2xl">{messageType === 'error' ? 'Opss..' : 'Success'}</h2>
                    {messageType === 'error' && <p>{message}</p>}
                </CustomModal>
            </main>

        </div>
    )
}