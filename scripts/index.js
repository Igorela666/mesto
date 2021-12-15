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

const body = document.querySelector('.page');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup')

const popupOverLays = document.querySelectorAll('.popup__overlay')
const closeButtons = document.querySelectorAll('.popup__cloce-icon');

const formEdit = document.querySelector('.popup__container_place_popupEdit');
const formAdd = document.querySelector('.popup__container_place_popupAdd');

const nameInput = document.querySelector('.popup__input_type_name');
const workInput = document.querySelector('.popup__input_type_work');

const profileName = document.querySelector('.profile__name');
const profileWork = document.querySelector('.profile__work');

const mestoImput = document.querySelector('.popup__input_type_mesto');
const imageImput = document.querySelector('.popup__input_type_image');

const popupAdd = document.querySelector('.popup_add');
const popupButtonAdd = popupAdd.querySelector('.popup__button')
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup_image');

const placeContainer = document.querySelector('.place'); // контейнер для карточек
const template = document.querySelector('.template').content; // карточка

const popupImagePicture = document.querySelector('.popup__image-picture');
const popupImageCaption = document.querySelector('.popup__image-caption');



function hanldleAddFormSubmit (evt) {
  evt.preventDefault();
  const imputText = mestoImput.value;
  const imputImage = imageImput.value;
  const cardEl = getItem({title: imputText, link: imputImage});

  placeContainer.prepend(cardEl);

  imageImput.value = '';
  mestoImput.value = ''; 

  popupButtonAdd.classList.add('popup__button_disabled');
  popupButtonAdd.disabled = true;

  closePopup(popupAdd);
}

function hendleDelete (event) {
  const targetEl = event.target;
  const card = targetEl.closest('.card');

  card.remove();
}

function openPopup(item) {
  item.classList.add('popup_open');

  document.addEventListener('keydown', closeByEscape);
}

function closePopup(item) {
  item.classList.remove('popup_open');

  document.removeEventListener('keydown', closeByEscape);
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

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(popup)
    };
    if (evt.target.classList.contains('popup__cloce-icon')) {
      closePopup(popup)
    }
  })
})


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');

    closePopup(openedPopup);
  }
}


formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', hanldleAddFormSubmit);

addButton.addEventListener("click", () => openPopup(popupAdd));
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  workInput.value = profileWork.textContent;

  openPopup(popupEdit)
});

render();
