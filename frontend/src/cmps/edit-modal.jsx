import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStation } from '../store/station.actions';
import { svgService } from '../services/svg.service';


export function Modal({ closeModal, saveModalData }) {
    const currStation = useSelector((storeState) => storeState.stationModule.currStation);
    const [inputValue, setInputValue] = useState(currStation.name);
    const dispatch = useDispatch()
 

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    function closeOnSave(ev) {
        ev.preventDefault(ev)
        saveModalData(inputValue)
        
    }


 

    return (
        <div>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <div className='edit-modal-header'>
                        <div>Edit details</div>
                        <div className='edit-modal-closeBtn-container'>
                            <button className='edit-modal-closeBtn' onClick={closeModal}>{svgService.editModalCloseIcon}</button>
                        </div>
                    </div>
                    <form onSubmit={closeOnSave}>
                        <div className='edit-modal-body'>
                            <button className='edit-modal-picture'>{svgService.editModalplaylistIcon}</button>
                            <input className='playlist-name' type="text" onChange={handleChange} value={inputValue} name="text" id="" />
                            <textarea className="playlist-description" placeholder='Add an optional description'></textarea>
                            <div className='edit-modal-disclaimer'>
                                By proceeding, you agree to give Musify access to the image you choose to upload. Please make sure you have the right to upload the image.
                            </div>
                            <div className='edit-modal-saveBtn-container'>
                                <button className='edit-modal-saveBtn' type='submit'>SAVE</button>
                            </div >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
