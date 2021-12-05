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

const popupEditCloseButton = document.querySelector('.popup__cloce-icon_place_popupEdit');
const popupAddCloseButton = document.querySelector('.popup__cloce-icon_place_popupAdd');
const popupImageCloseButton = document.querySelector('.popup__cloce-icon_place_popupImage');

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

const popupImagePicture = document.querySelector('.popup__image-picture');
const popupImageCaption = document.querySelector('.popup__image-caption');

const placeContainer = document.querySelector('.place'); // контейнер для карточек
const template = document.querySelector('.template').content; // карточка


function hanldleAddFormSubmit (evt) {
  evt.preventDefault();
  const imputText = mestoImput.value;
  const imputImage = imageImput.value;
  const cardEl = getItem({title: imputText, link: imputImage});

  placeContainer.prepend(cardEl);

  imageImput.value = '';
  mestoImput.value = '';

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

function handleEditFormSubmit (evt) {
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
    popupImageCaption.textContent = signature.textContent;
    popupImagePicture.src = item.link;
    popupImagePicture.alt = signature.textContent;

    openPopup(popupImage);
  });
  
  return newTemplate;
}

popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', hanldleAddFormSubmit);
addButton.addEventListener("click", () => openPopup(popupAdd));
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;

  openPopup(popupEdit);
});

render();
