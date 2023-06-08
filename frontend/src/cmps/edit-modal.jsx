import React from 'react'
import { svgService } from '../services/svg.service'

export function Modal({ closeModal }) {

    

    return (
        <div>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <div className='edit-modal-header'>
                        <div>Edit details</div> 
                        <div className='edit-modal-closeBtn-container'><button className='edit-modal-closeBtn' onClick={closeModal}>{svgService.editModalCloseIcon}</button></div>
                    </div>
                    <div className='edit-modal-body'>
                        <button className='edit-modal-picture'>{svgService.editModalplaylistIcon}</button>
                        <input className='playlist-name' type="text" name="" id="" />
                        {/* <input className='playlist-description' placeholder='Add an optional description' type="text" name="" id="" /> */}
                        <textarea
              className="playlist-description"
            //   value='description'
              placeholder='Add an optional description'
            //   onChange={handleDescriptionChange}
            ></textarea>
                        <div className='edit-modal-disclaimer'>
                        By proceeding, you agree to give Musify access to the image you choose to upload. Please make sure you have the right to upload the image.
                        </div>
                        <div className='edit-modal-saveBtn-container'>
                            <button className='edit-modal-saveBtn'>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
