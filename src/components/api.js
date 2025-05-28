import { tokenAPI, cohortId } from "../constants";

// logic

function handleResponse(response) {
  if (response.status !== 200) {
    return Promise.reject(new Error(`Ошибка: ${response.statusText}`));
  }
  return response.json();
}

// card.js

export const deleteCardServer = (id) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: tokenAPI,
    },
  }).then(handleResponse);
};

export const deleteCardLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: tokenAPI,
    },
  }).then(handleResponse);
};

export const addCardLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: tokenAPI,
    },
  }).then(handleResponse);
};

// index.js

export const fetchProfileApi = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "GET",
    headers: {
      Authorization: tokenAPI,
    },
  }).then(handleResponse);
};

export const fetchCards = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "GET",
    headers: {
      Authorization: tokenAPI,
    },
  }).then(handleResponse);
};

export const editAvatarApi = (avatarInput, avatarImg) => {
  if (!avatarInput.value) {
    return Promise.reject(new Error("URL аватара не может быть пустым."));
  }

  avatarImg.style.backgroundImage = `url(${avatarImg.value})`;

  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: tokenAPI,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  }).then(handleResponse)
    .catch(error => {
      console.error("Ошибка при редактировании аватара:", error);
    });
};

export const editProfileApi = (profileJobValue, profileNameValue) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: tokenAPI,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileNameValue,
      about: profileJobValue,
    }),
  }).then(handleResponse);
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
  }).then(handleResponse);
};
