
import { addDays, subDays,format,formatISO } from 'date-fns'
import {Icon} from '~/components/Icon'

export const DateSelect = ({currentDate, onChange}) => {
   
    const date= new Date(currentDate)

    const prevDay = () => {
        const nextDate = subDays(date, 1)
        onChange(formatISO(nextDate))
    }
    const nextDay = () => {
        const nextDate = addDays(date, 1)
        onChange(formatISO(nextDate))
    }

    return (
        <div className='p-4 flex space-x-4 items-center justify-center'>

            <Icon name="miniarrowLeft" className='w-6 text-red-500' onClick={prevDay} />

            <span className='font-bold'>{format(date,"MMMM d", )}</span>

            <Icon name="miniarrowRight" className='w-6 text-red-500' onClick={nextDay} />
        </div>)
}
