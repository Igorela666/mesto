
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseIkon = document.querySelector('.popup__close-ikon');
const form = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');
const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');


function openPopup() {
   popup.classList.add('popup_open');
   nameInput.value = profileName.textContent;
   workInput.value = profileWork.textContent;
}


function closePopup() {
   popup.classList.remove('popup_open');
}


function formSubmitHandler (evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileWork.textContent = workInput.value;
   closePopup()
}

form.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
popupCloseIkon.addEventListener('click', closePopup);
