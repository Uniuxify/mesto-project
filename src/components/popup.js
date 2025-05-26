import {enableValidation, toggleButtonState, hideInputError} from './validation.js'
import {createAndAddCard}from './cards.js'
import { updateUserProfile, updateUserAva } from './user.js';

const CARD_POPUP = document.querySelector(".popup_type_new-card");
const PROFILE_POPUP = document.querySelector(".popup_type_edit");
const AVA_POPUP = document.querySelector(".popup_type_ava");

const POPUS = document.querySelectorAll(".popup");
POPUS.forEach((popup) => {
    popup.querySelector(".popup__close").addEventListener("click", (event) => {
        closePopup(event.target.closest(".popup"));
    });
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            closePopup(event.target.closest(".popup"));
        }
    });

    popup.classList.add('popup_is-animated');
});

function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

function onEditProfile(event) {
    const nameInput = PROFILE_POPUP.querySelector(".popup__input_type_name");
    const descriptionInput = PROFILE_POPUP.querySelector(".popup__input_type_description");

    nameInput.value = PROFILE.querySelector(".profile__title").textContent;
    descriptionInput.value = PROFILE.querySelector(".profile__description").textContent;

    openModal(PROFILE_POPUP);
}

function onEditAva(event) {
    const linkInput = AVA_POPUP.querySelector(".popup__input_type_url");

    linkInput.value = PROFILE.querySelector(".profile__image").textContent;

    openModal(AVA_POPUP);
}

// function onSubmitEditProfileForm(event) {
//     event.preventDefault();

//     const nameInputValue = PROFILE_POPUP.querySelector(".popup__input_type_name").value;
//     const descriptionInputValue = PROFILE_POPUP.querySelector(".popup__input_type_description").value;

//     updateUserProfile(nameInputValue, descriptionInputValue, null)
//     closePopup(PROFILE_POPUP);
// }

// function onSubmitAvaForm(event) {
//     event.preventDefault();
    
//     const linkInput = AVA_POPUP.querySelector(".popup__input_type_url").value;

//     updateUserAva(linkInput);
//     closePopup(AVA_POPUP);
// }

function onSubmitEditProfileForm(event) {
    event.preventDefault();
    const button = PROFILE_POPUP.querySelector('.popup__button');
    const originalText = button.textContent;
    
    button.textContent = 'Сохранение...';
    button.disabled = true;

    const nameInputValue = PROFILE_POPUP.querySelector(".popup__input_type_name").value;
    const descriptionInputValue = PROFILE_POPUP.querySelector(".popup__input_type_description").value;

    updateUserProfile(nameInputValue, descriptionInputValue, null)
        .then(() => {
            closePopup(PROFILE_POPUP);
        })
        .catch(err => {
            console.error('Ошибка при сохранении:', err);
        })
        .finally(() => {
            button.textContent = originalText;
            button.disabled = false;
        });
}

// Обновленная функция для отправки формы аватара
function onSubmitAvaForm(event) {
    event.preventDefault();
    const button = AVA_POPUP.querySelector('.popup__button');
    const originalText = button.textContent;
    
    button.textContent = 'Сохранение...';
    button.disabled = true;

    const linkInput = AVA_POPUP.querySelector(".popup__input_type_url").value;

    updateUserAva(linkInput)
        .then(() => {
            closePopup(AVA_POPUP);
        })
        .catch(err => {
            console.error('Ошибка при сохранении:', err);
        })
        .finally(() => {
            button.textContent = originalText;
            button.disabled = false;
        });
}


// function onSubmitNewCardForm(event) {
//     event.preventDefault();
//     const nameInput = CARD_POPUP.querySelector(".popup__input_type_card-name").value;
//     const linkInput = CARD_POPUP.querySelector(".popup__input_type_url").value;
//     createAndAddCard(nameInput, linkInput);
//     closePopup(CARD_POPUP);
// }

function onSubmitNewCardForm(event) {
    event.preventDefault();
    const button = CARD_POPUP.querySelector('.popup__button');
    const originalText = button.textContent;
    
    button.textContent = 'Сохранение...';
    button.disabled = true;

    const nameInput = CARD_POPUP.querySelector(".popup__input_type_card-name").value;
    const linkInput = CARD_POPUP.querySelector(".popup__input_type_url").value;

    createAndAddCard(nameInput, linkInput)
        .then(() => {
            closePopup(CARD_POPUP);
        })
        .catch(err => {
            console.error('Ошибка при сохранении:', err);
        })
        .finally(() => {
            button.textContent = originalText;
            button.disabled = false;
        });
}

const PROFILE = document.querySelector(".profile");
PROFILE_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitEditProfileForm); 

PROFILE.querySelector(".profile__edit-button").addEventListener(
    "click",
    onEditProfile
);

AVA_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitAvaForm);
PROFILE.querySelector(".profile__image-container").addEventListener(
    "click",
    onEditAva
);

function onNewCard(event) {
    
    CARD_POPUP.querySelector(".popup__input_type_card-name").value = '';
    CARD_POPUP.querySelector(".popup__input_type_url").value = '';

    openModal(CARD_POPUP);
}


PROFILE.querySelector(".profile__add-button").addEventListener(
    "click",
    onNewCard
);

CARD_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitNewCardForm); 

function openModal(popup) {
    const formElement = popup.querySelector('.popup__form')
    if (formElement) {
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        const buttonElement = formElement.querySelector('.popup__button');

        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    }
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeByEsc);
}

export {openModal}