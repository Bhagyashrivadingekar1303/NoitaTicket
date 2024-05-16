import React from 'react';

const ModalComponent = ({ show, handleClose, title, children }) => {
    const modalClass = show ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';

    return (
        <div className={`${modalClass} bg-black bg-opacity-50`}>
            <div className="bg-white rounded-lg w-1/2">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default ModalComponent;

