import { Icon } from '~/components'


export const Users = () => {

    return (
        <>
            <header className="bg-red-500 text-white ">

                <div className="container max-w-3xl  flex justify-between  p-4">
                   
                    <a href='./'>
                        <div className=' container p-4'>
                        <Icon name="arrowLeft" className='w-8 hover:text-zinc-900' />
                        </div>
                    </a>
                
                    <a href="./"><img src="/assets/logo/logo-fundo-vermelho.svg" className="  w-28 h-20 md:w-40 " /></a>
                    
                    <a href="./login"><div className=" cursor-pointer text-xl font-semibold hover:text-zinc-900 p-4 ">
                        Login
                    </div>
                    </a>
                </div>
            </header>



            <main className='space-y-6'>


            </main>
        </>
    )
}