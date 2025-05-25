function showError(input, errorMessage, config) {
  const errorElement = document.querySelector(`[name='${input.name}-error']`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideError(input, config) {
  const errorElement = document.querySelector(`[name='${input.name}-error']`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(input, config) {
  const isValid = input.validity.valid;

  if (!isValid) {
    const errorMessage = input.validationMessage;
    showError(input, errorMessage, config);
  } else {
    hideError(input, config);
  }
  return isValid;
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const isValid = checkInputValidity(input, config);
      button.disabled = !isValid;
    });
  });
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector('button[type=submit]');
  button.disabled = false;
  inputs.forEach((input) => {
    hideError(input, config);
  });
}
