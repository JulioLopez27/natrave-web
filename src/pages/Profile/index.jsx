import { useEffect, useState } from 'react'
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { format, formatISO } from 'date-fns'
import { Icon, Card, DateSelect, Text } from '~/components'


export const Profile = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth, setAuth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${params.username}`
        })
        const hunches = res.data.hunches.reduce((acc, hunch) => {
            acc[hunch.gameId] = hunch
            return acc
        }, {})

        return {
            ...res.data,
            hunches
        }
    })


    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })
        return res.data
    })


    const logout = () => {
        setAuth({})
        navigate('/')
    }
    const login = () => { navigate('/') }


    const isLoading = games.loading || loading
    const hasErrors = games.error || error
    const isDone = !isLoading && !hasErrors

    useEffect(() => {
        fetchHunches()
    }, [])


    useEffect(() => {
        fetchGames({ gameTime: currentDate })
    }, [currentDate])


    
    const arrEmpty = (arr) => !Array.isArray(arr) || arr.length === 0
    const haveGames = (param) => {
        if (!arrEmpty(param.value)) {
            const ret = param.value?.map(game => (
                <Card
                    key={game.id}
                    gameId={game.id}
                    homeTeam={game.homeTeam}
                    awayTeam={game.awayTeam}
                    gameTime={format(new Date(game.gameTime), 'H:mm')}
                    homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore}
                    awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore}
                />
            ))
            return ret
        } else { return <Text text={"no matches for the day"} /> }
    }

    return (
        <>
            <header className="bg-red-500 text-white ">
                <div className="container max-w-3xl  flex justify-between p-4">

                    <img src="/assets/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40" />
                    {auth?.user?.id && (<div onClick={logout} className="p-2 cursor-pointer text-xl font-semibold">
                        Sair
                    </div>) || (<div onClick={login} className="p-2 cursor-pointer text-xl font-bold ">
                        Login
                    </div>)}

                </div>
            </header>

            <main className='space-y-6'>
                <section id="header" className=" bg-red-500 text-white p-4">

                    <div className="container max-w-3xl space-y-2 ">

                        {auth?.user?.id && (<a href='/dashboard'>
                            <Icon name="arrowLeft" className='w-8  ' />
                        </a>)}

                        <h3 className='text-xl font-bold'>{user?.name}</h3>
                    </div>
                </section>


                <section id="content" className='container max-w-3xl p-4 space-y-4'>
                    <h2 className='text-xl text-red-500 font-bold'>Seus palpites</h2>

                    <DateSelect currentDate={currentDate} onChange={setDate} />

                    <div className='space-y-4'>
                        {isLoading && <Text text={'Loading...'} />}
                        {hasErrors && <Text text={'Ops! Something went wrong :('} />}
                        {isDone && haveGames(games)}
                    </div>
                </section>
            </main>

        </>
    )
}
