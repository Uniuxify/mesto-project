import {openModal} from './popup.js'

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];


const IMAGE_POPUP = document.querySelector(".popup_type_image");

function createCard(title, imgLink, img_popup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardDeleteButotn = card.querySelector(".card__delete-button");

  cardImage.setAttribute("src", imgLink);
  cardTitle.textContent = title;

  cardLikeButton.addEventListener("click", function (event) {
      event.target.classList.toggle("card__like-button_is-active");
  });

  cardDeleteButotn.addEventListener("click", function (event) {
      const card = event.target.closest(".card");
      card.remove();
  });

  cardImage.addEventListener("click", function (event) {
    img_popup.querySelector(".popup__image").setAttribute("src", imgLink);
      openModal(img_popup);
  });
  return card;
}

function prependCard(card) {
  const cardList = document.querySelector(".places__list");
  cardList.prepend(card);
}

function appendCard(card) {
  const cardList = document.querySelector(".places__list");
  cardList.append(card);
}

initialCards.forEach((card) => {
  appendCard(createCard(card.name, card.link, IMAGE_POPUP));
});


export {createCard, prependCard, appendCard}