// @todo: Функция создания карточки
import { openPopup } from "../popup/modal";

const popupTypeImage = ".popup_type_image";

export function createCard(
  data,
  {
    template,
    titleSelecor,
    imageSelector,
    cardDeleteButtonSelector,
    cardLikeButtonSelector,
    cardLikeButtonIsActive,
    onDeleteCard,
    onLikeCard,
    onClickImageCard,
  },
) {
  const card = template.cloneNode(true);
  card.querySelector(titleSelecor).innerText = data.name;
  const cardImage = card.querySelector(imageSelector);

  const imageCard = ".card__image";
  const cardImages = document.querySelectorAll(imageCard);
  const popupImage = document.querySelector(popupTypeImage);

  cardImages.forEach((element) => {
    element.addEventListener("click", openPopup(popupImage));
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;

  card.querySelector(cardDeleteButtonSelector).addEventListener("click", () => {
    onDeleteCard(card);
  });
  card.querySelector(cardLikeButtonSelector).addEventListener("click", () => {
    onLikeCard(
      card.querySelector(cardLikeButtonSelector),
      cardLikeButtonIsActive,
    );
  });

  card
    .querySelector(imageSelector)
    .addEventListener("click", onClickImageCard(data));

  return card;
}

// @todo: Функция удаления карточки
export function deleteCard(element) {
  if (element && typeof element.remove === "function") {
    element.remove();
  }
}

export function likeCard(element, activeClass = "card__like-button_is-active") {
  if (element.classList.contains(activeClass)) {
    element.classList.remove(activeClass);
  } else {
    element.classList.add(activeClass);
  }
}
