// @todo: Функция создания карточки
import { closePopup, openPopup } from "../popup/modal";
import { cohortId, tokenAPI } from "../constants";
import { deleteCardServer, delereCardLike, addCardLike } from "../api";

const popupTypeImage = ".popup_type_image";

let openPopupDeleteFn;
let openPopupDeleteCallbackSucces;

const openPopupDelete = (callbackSucces = () => {}) => {
  if (!openPopupDeleteFn) {
    document
      .querySelector('[name="deleteCard"]')
      .addEventListener("click", () => {
        openPopupDeleteCallbackSucces();
        closePopup(document.querySelector(".popup_type_delete"));
      });
    openPopupDeleteFn = true;
  }

  openPopupDeleteCallbackSucces = callbackSucces;

  return openPopup(document.querySelector(".popup_type_delete"))();
};

export function createCard(
  data,
  {
    template,
    titleSelecor,
    imageSelector,
    cardDeleteButtonSelector,
    cardLikeButtonSelector,
    cardLikeButtonIsActive,
    cardButtonDeleteDisplayNone,
    cardLikesCount,
    isOwner,
    ownerId,
    onDeleteCard,
    onLikeCard,
    onClickImageCard,
  },
) {
  const card = template.cloneNode(true);
  card.querySelector(titleSelecor).innerText = data.name;
  const cardImage = card.querySelector(imageSelector);

  const imageCard = ".card__image";

  cardImage.src = data.link;
  cardImage.alt = data.name;
  if (data.isOwner) {
    card
      .querySelector(cardDeleteButtonSelector)
      .addEventListener("click", () => {
        openPopupDelete(() => {
          onDeleteCard(card, data.id);
        });
      });
  } else {
    card
      .querySelector(cardDeleteButtonSelector)
      .classList.add(cardButtonDeleteDisplayNone);
  }

  card.querySelector(cardLikeButtonSelector).addEventListener("click", () => {
    onLikeCard(
      card.querySelector(cardLikeButtonSelector),
      cardLikeButtonIsActive,
      data.id,
      data,
    );
  });

  cardImage.addEventListener("click", onClickImageCard(data));

  return card;
}

// @todo: Функция удаления карточки
export function deleteCard(element, id) {
  if (element && typeof element.remove === "function") {
    deleteCardServer(element, id);
  }
}

export function likeCard(
  element,
  activeClass = "card__like-button_is-active",
  id,
  card,
) {
  if (element.classList.contains(activeClass)) {
    delereCardLike(
      element,
      (activeClass = "card__like-button_is-active"),
      id,
      card,
    );
  } else {
    addCardLike(
      element,
      (activeClass = "card__like-button_is-active"),
      id,
      card,
    );
  }
}
