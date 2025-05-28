// @todo: Функция создания карточки
import { deleteCardServer, deleteCardLike, addCardLike } from "./api";

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
    cardLikesCountSelector,
    onDeleteCard,
    onLikeCard,
    onClickImageCard,
    onPopupDelete,
  },
) {
  const card = template.cloneNode(true);
  card.querySelector(titleSelecor).innerText = data.name;
  const cardImage = card.querySelector(imageSelector);

  const countLikes = data.likes.length || 0;
  const likesContainer = card.querySelector(cardLikesCountSelector); 

  if (data.likes.find(({ _id }) => _id === data.myId)) {
    card
      .querySelector(cardLikeButtonSelector)
      .classList.add(cardLikeButtonIsActive);
  }

  if (likesContainer !== null) {
    likesContainer.textContent = countLikes;
  }

  cardImage.src = data.link;
  cardImage.alt = data.name;
  if (data.isOwner) {
    card
      .querySelector(cardDeleteButtonSelector)
      .addEventListener("click", () => {
        onPopupDelete(() => {
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
  console.log("Удаление карточки с id:", id);
  if (element && typeof element.remove === "function") {
    deleteCardServer(id)
      .then(() => {
        console.log("Карточка успешно удалена на сервере");
        element.remove();
      })
      .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
      });
  } else {
    console.warn("Элемент для удаления не найден или не валиден:", element);
  }
}

export function likeCard(
  element,
  activeClass = "card__like-button_is-active",
  id,
  card,
) {
  if (element.classList.contains(activeClass)) {
    deleteCardLike(id)
      .then((res) => {
        element.classList.remove(activeClass);
        updateLikesCount(element, res.likes.length);
      })
      .catch((error) => {
        console.error("Ошибка при удалении лайка карточки:", error);
      });
  } else {
    addCardLike(id)
      .then((res) => {
        element.classList.add(activeClass);
        updateLikesCount(element, res.likes.length);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении лайка карточки:", error);
      });
  }
}

function updateLikesCount(element, count) {
  const likesContainer = element.parentNode.querySelector(".likes__count");
  if (likesContainer) {
    likesContainer.textContent = count;
  }
}
