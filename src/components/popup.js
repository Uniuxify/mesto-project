import {enableValidation, toggleButtonState, hideInputError} from './validation.js'
import {createCard, prependCard, appendCard}from './cards.js'

const CARD_POPUP = document.querySelector(".popup_type_new-card");
const PROFILE_POPUP = document.querySelector(".popup_type_edit");

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

function onSubmitEditProfileForm(event) {
    event.preventDefault();

    const nameInputValue = PROFILE_POPUP.querySelector(".popup__input_type_name").value;
    const descriptionInputValue = PROFILE_POPUP.querySelector(".popup__input_type_description").value;

    PROFILE.querySelector(".profile__title").textContent = nameInputValue;
    PROFILE.querySelector(".profile__description").textContent = descriptionInputValue;

    closePopup(PROFILE_POPUP);
}

const PROFILE = document.querySelector(".profile");
PROFILE_POPUP.querySelector('.popup__form').addEventListener('submit', onSubmitEditProfileForm); 

PROFILE.querySelector(".profile__edit-button").addEventListener(
    "click",
    onEditProfile
);

function onNewCard(event) {
    
    CARD_POPUP.querySelector(".popup__input_type_card-name").value = '';
    CARD_POPUP.querySelector(".popup__input_type_url").value = '';

    openModal(CARD_POPUP);
}

function onSubmitNewCardForm(event) {
    event.preventDefault();
    const nameInput = CARD_POPUP.querySelector(".popup__input_type_card-name").value;
    const linkInput = CARD_POPUP.querySelector(".popup__input_type_url").value;
    
    const newCard = createCard(nameInput, linkInput);
    prependCard(newCard);
    closePopup(CARD_POPUP);
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