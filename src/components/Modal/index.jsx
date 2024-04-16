

import PropTypes from 'prop-types'

export const CustomModal = ({ isOpen, message, messageType, onClose }) => {

    if (!isOpen) {
        return null;
    }


    const messageStyles = {
        error: 'text-red-600',
        approval: 'text-green-600',
        // Agrega más estilos aquí según sea necesario
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <p className={messageStyles[messageType]}>{message}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className={`mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium 
            text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm 
            ${messageType === 'error'
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
                            onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

CustomModal.propTypes = {
    isOpen: PropTypes.bool,
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
    onClose: PropTypes.func
}
