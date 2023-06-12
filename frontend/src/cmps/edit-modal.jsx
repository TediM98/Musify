import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateStation } from '../store/station.actions'
import { svgService } from '../services/svg.service'
import { uploadService } from '../services/upload.service'

export function Modal({ closeModal, saveModalData }) {
    const currStation = useSelector((storeState) => storeState.stationModule.currStation)
    const [inputValue, setInputValue] = useState(currStation.name)
    const [descValue, setDescValue] = useState(currStation.description)

    console.log('currstation prnt', currStation)

    function handleChange(ev) {
        setInputValue(ev.target.value)
    }


    function handleChangeDesc(ev) {
        setDescValue(ev.target.value)
    }

    function closeOnSave(ev) {
        ev.preventDefault(ev)
        //set curr station?
        saveModalData(inputValue, descValue)
    }


    async function onUploadImgClick(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev);
            console.log('imgurl in the onclick', imgUrl)
            const updatedValues = { ...currStation.createdBy, imgUrl: imgUrl.url }
            console.log(updatedValues, 'updatedValues');
            const updatedStation = { ...currStation, createdBy: updatedValues }
            await updateStation(updatedStation)

        } catch (err) {
            console.error('Failed to upload image', err)
        }
    }



    return (
        <div>
            <div className="backdrop" onClick={closeModal}></div>
            <div className="edit-modal">
                <div className="edit-modal-content">
                    <div className='edit-modal-header'>
                        <div>Edit details</div>
                        <div className='edit-modal-closeBtn-container'>
                            <button className='edit-modal-closeBtn' onClick={closeModal}>{svgService.exitEditIcon}</button>
                        </div>
                    </div>
                    <form onSubmit={closeOnSave}>
                        <div className='edit-modal-body'>
                            <div className='edit-modal-picture'>

                                <label className='file-upload-label' htmlFor="file-upload">
                                    <input onChange={onUploadImgClick} type="file" accept="image/*" name="" id="file-upload" />
                                    <img className='edit-modal-picture-img' src={currStation.createdBy.imgUrl} alt="" />
                                </label>


                            </div>
                            <input className='playlist-name' type="text" onChange={handleChange} value={inputValue} name="text" id="" />
                            <textarea className="playlist-description" onChange={handleChangeDesc} value={descValue} placeholder='Add an optional description'></textarea>
                            <div className='edit-modal-genres-container'>
                                <div className='edit-modal-genres'>
                                    <select className='genre-select' name="" id="">
                                        <option value="happy">happy</option>
                                        <option value="relaxing">relaxing</option>
                                    </select>
                                </div>
                            </div>
                            <div className='edit-modal-saveBtn-container'>
                                <button className='edit-modal-saveBtn' type='submit'>Save</button>
                            </div >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
