import React from 'react'

export function Modal({ closeModal }) {
    return (
        <div>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <div className='edit-modal-header'>Edit details</div>
                    <div className='edit-modal-body'>
                        <button className='edit-modal-picture'></button>
                        <input className='playlist-name' type="text" name="" id="" />
                        <input className='playlist-description' type="text" name="" id="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
