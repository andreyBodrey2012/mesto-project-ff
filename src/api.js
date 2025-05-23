import { tokenAPI, cohortId } from "./constants";

// card.js

export const deleteCardServer = (element, id) => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: tokenAPI,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Карточка успешно удалена.");
        element.remove();
      } else {
        console.error("Ошибка при удалении карточки:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
};

export const delereCardLike = (
  element,
  activeClass = "card__like-button_is-active",
  id,
  card,
) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: tokenAPI,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Лайк удалён.");
        const countLikes = card.likes;
        const likesContainer = document.querySelector(".likes__count");
        if (likesContainer != null) {
          likesContainer.textContent = countLikes.length;
        }
        element.classList.remove(activeClass);
      } else {
        console.error("Ошибка при удалении лайка.");
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
};

export const addCardLike = (
  element,
  activeClass = "card__like-button_is-active",
  id,
  card,
) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: tokenAPI,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Лайк поставлен.");
        const countLikes = card.likes;
        const likesContainer = document.querySelector(".likes__count");
        if (likesContainer != null) {
          likesContainer.textContent = countLikes.length;
        }
        element.classList.add(activeClass);
      } else {
        console.error("Ошибка при установке лайка.");
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });
};

// index.js

export const fetchProfileApi = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "GET",
    headers: {
      Authorization: tokenAPI,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось получить информацию о пользователе");
      }
      return response.json();
    })
    .then((user) => {
      const userInfo = {
        name: user.name,
        description: user.about,
        avatar: user.avatar,
        id: user._id,
      };
      return userInfo;
    });
};

export const fetchCards = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "GET",
    headers: {
      Authorization: tokenAPI,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Не удалось получить карточки");
      }
      return response.json();
    })
    .then((data) => {
      const cards = data.map((card) => ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        ownerId: card.owner._id,
        id: card._id,
      }));
      return cards;
    });
};

export const editAvatarApi = (avatarInput, avatarImg) => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: tokenAPI,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarInput.value,
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных");
      }
      return response.json();
    })
    .then((data) => {
      avatarImg.style.backgroundImage = `url(${data.avatar})`
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export const editProfileApi = (profileJobValue, profileNameValue, profileTitle, profileDescription) => {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: tokenAPI,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileNameValue,
      about: profileJobValue,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при обновлении данных");
      }
      return response.json();
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export const serverAddCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenAPI, // Замените на ваш токен
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при добавлении карточки: " + response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
