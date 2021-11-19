
const editButton = document.querySelector('.profile__edit-button_type_open');
const popup = document.querySelector('.popup');
const popupCloseIkon = document.querySelector('.popup__close-ikon');

function open() {
   popup.classList.add('popup_type_open');
   nameInput.value = profileName.textContent;
   workInput.value = profileWork.textContent;
}

function cloce() {
   popup.classList.remove('popup_type_open');
}

editButton.addEventListener('click', open);
popupCloseIkon.addEventListener('click', cloce);



const form = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

function formSubmitHandler (evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileWork.textContent = workInput.value;
   cloce()
}

form.addEventListener('submit', formSubmitHandler);