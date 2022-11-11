
import swal from '@sweetalert/with-react'
import style from './style.css'

// Login
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
            timer: 1500,
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
            timer: 1500,
        })
    )
}

// --------------------------------------------------------------------------------------

// SignUp

export const errorUsername= () => {
    return(
        swal({
            icon: "error",
            content: (
                <div >
                    <h1 className='text-xl'>Try another username.</h1>
                </div>
            ),
            buttons: false,
            timer: 1500,
        })
    )
}

export const errorEmail = () => {
    return(
        swal({
            icon: "error",
            content: (
                <div >
                    <h1 className='text-xl'>Email already in use.</h1>
                </div>
            ),
            buttons: false,
            timer: 1500,
        })
    )
}


export const fails = () => {
    return(
            swal({
                content: (
                    <div >
                        <h1 className='text-xl'>🚀Houston, we got a problem here🚀</h1>
                        
                    </div>
                ),
                buttons: false,
                timer: 3500,
            })
    )
}