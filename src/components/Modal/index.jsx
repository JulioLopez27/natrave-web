

import swal from '@sweetalert/with-react'



export const errorLogin = () => {
    return (
        swal({
            icon: "error",
            buttons:{
                cancel:"close"
            },
            content:(
                <div >
                   <h1 className='text-xl'>This email is already in use.</h1>
                </div>
            )
        })
    )
}


