import React, { useState } from "react";
import MainPageModal from "./MainPageModal";
import {Modal} from '../../../../ModalContext/Modal'

function SpecificPageModel({modelInfo}){
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <img className="picImg" src={modelInfo.img_src} alt="Broken Img URL" onClick={() => setShowModal(true)}/>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <MainPageModal closeModal={() => setShowModal(false) } modalInfo={modelInfo}/>
                </Modal>
            )}
        </div>
    )
}


export default SpecificPageModel;
