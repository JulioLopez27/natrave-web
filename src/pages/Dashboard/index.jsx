import { useEffect, useState } from 'react'
import { useLocalStorage, useAsyncFn } from 'react-use'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { format, formatISO } from 'date-fns'
import { Icon, Card, DateSelect, Text } from '~/components'

export const Dashboard = () => {
    const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [auth] = useLocalStorage('auth', {})

    const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`
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


    
    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            <header className="bg-red-500 text-white ">
                <div className="container max-w-3xl  flex justify-between p-4">

                    <img src="/assets/logo/logo-fundo-vermelho.svg" className="w-28 md:w-40" />
                    <a href={`/${auth?.user?.username}`}>
                        <Icon name="profile" className="w-7" />
                    </a>

                </div>
            </header>

            <main className='space-y-6'>
                <section id="header" className=" bg-red-500 text-white p-4">

                    <div className="container max-w-3xl space-y-2 ">
                        <span>Olá {auth?.user?.username}</span>
                        <h3 className='text-2xl font-bold'>Qual é o seu palpite?</h3>
                    </div>
                </section>


                <section id="content" className='container max-w-3xl p-4 space-y-4'>

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