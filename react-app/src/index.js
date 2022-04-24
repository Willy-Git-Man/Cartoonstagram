import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./ModalContext/Modal";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faSquarePlus, faTrashCan, faPenToSquare, faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {faArrowRightFromBracket, faXmark, faHouse, faHeart, faImage, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
library.add(fab, faSquarePlus, faArrowRightFromBracket, faXmark, faHouse, faInstagram, faGithub, faLinkedin, faTrashCan, faPenToSquare, faHeart, farHeart, faImage, faCircleCheck)

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
