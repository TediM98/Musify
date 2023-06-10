import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStation } from '../store/station.actions';
import { svgService } from '../services/svg.service';
import {uploadService} from '../services/upload.service'

export function Modal({ closeModal, saveModalData }) {
    const currStation = useSelector((storeState) => storeState.stationModule.currStation);
    const [inputValue, setInputValue] = useState(currStation.name);
    const [descValue, setDescValue] = useState(currStation.description)
    const [uploadedImageUrl, setUploadedImageUrl] = useState(currStation.createdBy.imgUrl);

 

    function handleChange(ev){
        setInputValue(ev.target.value);
    }


    function handleChangeDesc(ev){
        setDescValue(ev.target.value);
        
    }

    function closeOnSave(ev){
        ev.preventDefault(ev)
        saveModalData(inputValue,descValue)
        
    }
    async function onUploadImgClick(ev){
        try {
          const imgUrl = await uploadService.uploadImg(ev);
          console.log('imgurl in the onclick',imgUrl)
          setUploadedImageUrl(imgUrl);
        } catch (err) {
          console.error('Failed to upload image', err);
        }
      };

 

    return (
        <div>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <div className='edit-modal-header'>
                        <div>Edit details</div>
                        <div className='edit-modal-closeBtn-container'>
                            <button className='edit-modal-closeBtn' onClick={closeModal}>{svgService.exitIcon}</button>
                        </div>
                    </div>
                    <form onSubmit={closeOnSave}>
                        <div className='edit-modal-body'>
                            <div className='edit-modal-picture'>
                              
                                
                                <input onClick={onUploadImgClick} type="file" name="" id="" />
                                <img className='edit-modal-picture-img' src={uploadedImageUrl} alt="" />

                               
                               </div>
                            <input className='playlist-name' type="text" onChange={handleChange} value={inputValue} name="text" id="" />
                            <textarea className="playlist-description" onChange={handleChangeDesc} value={descValue} placeholder='Add an optional description'></textarea>
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
