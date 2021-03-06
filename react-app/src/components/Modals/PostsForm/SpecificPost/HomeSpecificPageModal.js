import React, { useEffect, useState } from "react";
import MainPageModal from "./MainPageModal";
import { Modal } from '../../../../ModalContext/Modal'
import { useDispatch } from "react-redux";
import {getUsers} from '../../../../store/session'


function HomeSpecificPageModel({ modelInfo }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, modelInfo.id])

    return (
        <div className="imageHolder">

            <img className='homeFeedImage' src={modelInfo.img_src} alt="Broken Img URL" onClick={() => setShowModal(true)}/>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <MainPageModal closeModal={() => setShowModal(false) } modalInfo={modelInfo}/>
                </Modal>
            )}
        </div>
    )
}


export default HomeSpecificPageModel;
