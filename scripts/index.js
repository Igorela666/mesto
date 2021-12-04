const initialCards = [
   {
     title: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     title: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     title: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     title: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     title: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     title: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ]; 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditCloseIkon = document.querySelector('.popup__cloce-icon_place_popupEdit');
const popupAddCloseIkon = document.querySelector('.popup__cloce-icon_place_popupAdd');
const popupImageCloseIkon = document.querySelector('.popup__cloce-icon_place_popupImage');

const formEdit = document.querySelector('.popup__container_place_popupEdit');
const formAdd = document.querySelector('.popup__container_place_popupAdd');

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const mestoImput = document.querySelector('.popup__input_type_mesto');
const imageImput = document.querySelector('.popup__input_type_image');

const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup_image');

const placeContainer = document.querySelector('.place'); // контейнер для карточек
const template = document.querySelector('.template').content; // карточка


function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const imputText = mestoImput.value;
  const imputImage = imageImput.value;
  const cardEl = getItem({title: imputText, link: imputImage});

  placeContainer.prepend(cardEl);
  closePopup(popupAdd);
}

function hendleDelete (event) {
  const targetEl = event.target;
  const card = targetEl.closest('.card');

  card.remove();
}

function openPopup(item) {
  item.classList.add('popup_open');
}

function closePopup(item) {
  item.classList.remove('popup_open');
}

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileWork.textContent = workInput.value;
  closePopup(popupEdit);
}

function render () {
  const html = initialCards.map(getItem);
  placeContainer.append(...html);
}

function likeActive (event) {
  event.target.classList.toggle('card__like-button_active');
}

function getItem (item) {
  const newTemplate = template.querySelector('.card').cloneNode(true);
  const signature = newTemplate.querySelector('.card__signature');
  const image = newTemplate.querySelector('.card__img');
  signature.textContent = item.title;
  image.src = item.link;
  image.alt = item.title;

  const deleteIkon = newTemplate.querySelector('.card__delete-ikon');
  deleteIkon.addEventListener('click', hendleDelete);

  const likeEl = newTemplate.querySelector('.card__like-button');
  likeEl.addEventListener('click', likeActive);

  image.addEventListener('click', () => {
    const popupImagePicture = document.querySelector('.popup__image-picture');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    popupImageCaption.textContent = signature.textContent;
    popupImagePicture.src = item.link;
    popupImagePicture.alt = signature.textContent;

    openPopup(popupImage);
  });
  
  return newTemplate;
}

popupImageCloseIkon.addEventListener('click', () => closePopup(popupImage));
popupAddCloseIkon.addEventListener('click', () => closePopup(popupAdd));
popupEditCloseIkon.addEventListener('click', () => {
   nameInput.value = profileName.textContent;
   workInput.value = profileWork.textContent;
  closePopup(popupEdit);
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
  imageImput.value = '';
  mestoImput.value = '';
});

formEdit.addEventListener('submit', formSubmitHandlerEdit);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
editButton.addEventListener('click', () => openPopup(popupEdit));

render();
