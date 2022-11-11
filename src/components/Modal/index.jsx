
import swal from '@sweetalert/with-react'
import style from './style.css'


export const errorEmailLogin = () => {
    return (

        swal({
            icon: "error",
            content: (
                <div >
                    <h1 className='text-xl'>Email not found.</h1>
                </div>
            ),
            buttons: false,
            timer: 2000,
            closeOnClickOutside: false,
        })
    )
}


export const errorPassLogin = () => {
    return (
        swal({
            icon: "error",
            content: (
                <div >
                    <h1 className='text-xl'>Incorrect password.</h1>
                </div>
            ),
            buttons: false,
            timer: 2000,
            closeOnClickOutside: false,
        })
    )
}


