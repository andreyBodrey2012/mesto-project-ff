import { initCards } from "./cards/card";
import { initPopup } from "./popup/modal";
import "./css/index.css";

export let defautParams = {
  profileAddButtonSelector: ".profile__add-button",
  popupTypeNewCardSelector: ".popup_type_new-card",
  profileEditButtonSelector: ".profile__edit-button",
  popupTypeEditSelector: ".popup_type_edit",
  popupCloseSelector: ".popup__close",
  popupIsOpenedSelector: ".popup_is-opened",
  popupFormEditProfileSelector: ".popup__form[name='edit-profile']",
  popupFormNewPlaceSelector: ".popup__form[name='new-place']",
  popupInputTypeNameSelector: ".popup__input_type_name",
  popupInputTypeDescriptionSelector: ".popup__input_type_description",
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  popupInputTypeCardNameSelector: ".popup__input_type_card-name",
  popupInputTypeUrlSelector: ".popup__input_type_url",
  popupSelector: ".popup",
  popupOpened: "popup_is-opened",
  popupIsAnimatedSelector: "popup_is-animated",
  cardImageSelector: ".card__image",
  popupTypeImageSelector: ".popup_type_image",
  cardTemplateSelector: "#card-template",
  placesListSelector: ".places__list",
  cardSelector: ".card",
  cardTitleSelector: ".card__title",
  cardDeleteButtonSelector: ".card__delete-button",
  cardLikeButtonSelector: ".card__like-button",
  popupImageSelector: ".popup__image",
  popupCaptionSelector: ".popup__caption",
  cardLikeButtonIsActiveSelector: "card__like-button_is-active",
}

document.querySelector(".footer__copyright").innerText =
  `© ${new Date().getFullYear()} Mesto Russia`;

// @todo: Вывести карточки на страницу
initCards();

// @todo: Функция открытия модального окна
initPopup();