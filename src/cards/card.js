// @todo: Функция создания карточки
export function createCard(data, { template, titleSelecor, imageSelector }) {
  const card = template.cloneNode(true);
  card.querySelector(titleSelecor).innerText = data.name;
  const cardImage = card.querySelector(imageSelector);

  cardImage.src = data.link;
  cardImage.alt = data.name;

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
