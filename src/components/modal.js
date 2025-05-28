import { clearValidation } from "./validation";
import { validationConfig } from "../constants"

const defaultClassOpened = "popup_is-opened";
const defautPopupSelector = ".popup";
const defautPopupIsOpenedSelector = ".popup_is-opened";

export function closePopup(element, classOpened = defaultClassOpened) {
  element.classList.remove(classOpened);
  element.removeEventListener("click", handlerClosePopup);
  document.removeEventListener("keydown", handlerKeyClosePopup);
}

export function handlerClosePopup(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target.closest(defautPopupSelector));
  }
}

function handlerKeyClosePopup(evt) {
  if (evt.code == "Escape") {
    closePopup(document.querySelector(defautPopupIsOpenedSelector));
  }
}

export function openPopup(element, classOpened = defaultClassOpened) {
  if (element.querySelector(".popup__form") !== null) {
    clearValidation(element, validationConfig);
  }

  return () => {
    element.classList.add(classOpened);
    element.addEventListener("click", handlerClosePopup);
    document.addEventListener("keydown", handlerKeyClosePopup);
  };
}
