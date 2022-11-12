import { useAsyncFn } from 'react-use'
import axios from 'axios'
import { Icon } from '~/components'
import { useEffect } from 'react'


export const Users = () => {

    const [users, fetchUsers] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/users'
        })
        return res.data
    })

    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <>
            <header className="bg-red-500 text-white ">

                <div className="container max-w-3xl  flex justify-between  p-4">

                    <a href='./'>
                        <div className=' container p-4'>
                            <Icon name="arrowLeft" className='w-8 ' />
                        </div>
                    </a>

                    <a href="./"><img src="/assets/logo/logo-fundo-vermelho.svg" className="  w-28 h-20 md:w-40 " /></a>

                    <a href="./login"><div className=" cursor-pointer text-xl font-semibold  p-4 ">
                        Login
                    </div>
                    </a>
                </div>
            </header>


            <div className=" container mx-auto px-3 flex flex-col items-center min-h-screen my-2">

                {!users.loading && users.value?.map(users => (
                    <a href={`/${users.username}`} className="cursor-pointer max-w-2xl w-full">

                        <div className='flex items-center  p-4 my-2 justify-around bg-red-500 border-2 rounded-lg  border-red-700  hover:bg-red-700 hover:border-red-500 '>

                            <Icon name="profile" className=" flex-1 min-w-[40px] max-w-[90px] text-white " />

                            <div className='flex gap-3 flex-col items-center  text-xl text-slate-100 font-bold text'>
                                <span>{users.name}</span>
                                <span>@{users.username}</span>

                            </div>
                        </div>
                    </a>

                ))
                }

            </div>

        </>
    )
}