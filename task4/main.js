// import './normalize.css';
import './index.less';

class Card { // класс карточки
    constructor(name, url, desc, id, provider) {
        this.name = name;
        this.url = url;
        this.description = desc;
        this.id = id;
        this.provider = provider;
    }
}

function renderCards() { // функция отрисовки карточек из локалСторейдж
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let i = 0;
    for (let card of (cards ? cards : [])) {
        const divCard = document.createElement("div");
        divCard.id = `card${i}`;
        divCard.setAttribute('class', "list-block__card");
        document.getElementsByClassName("list-block__list")[0].appendChild(divCard);

        const divCardTop = document.createElement("div");
        divCardTop.id = `cardTop${i}`;
        divCardTop.setAttribute('class', "list-block__card-top");
        document.getElementById(`card${i}`).appendChild(divCardTop);

        const divCardRed = document.createElement("a");
        divCardRed.id = `cardRed${i}`;
        divCardRed.setAttribute('class', "list-block__card-red");
        divCardRed.addEventListener('click', pullForm);
        divCardRed.pos = i;
        divCardRed.textContent = 'Edit';
        document.getElementById(`cardTop${i}`).appendChild(divCardRed);

        const divCardId = document.createElement("div");
        divCardId.id = `cardId${i}`;
        divCardId.setAttribute('class', "list-block__card-id");
        divCardId.textContent = `Id: ${card.id}`;
        document.getElementById(`cardTop${i}`).appendChild(divCardId);

        const divCardDel = document.createElement("a");
        divCardId.id = `cardDel${i}`;
        divCardDel.setAttribute('class', "list-block__card-red");
        divCardDel.textContent = `X`;
        divCardDel.addEventListener('click', deleteCard);
        divCardDel.pos = i;
        document.getElementById(`cardTop${i}`).appendChild(divCardDel);


        const divCardMain = document.createElement("div");
        divCardMain.id = `cardMain${i}`;
        divCardMain.setAttribute('class', "list-block__card-main");
        document.getElementById(`card${i}`).appendChild(divCardMain);

        const divCardImg = document.createElement("img");
        divCardImg.id = `cardImg${i}`;
        divCardImg.setAttribute('class', "list-block__card-img");
        divCardImg.src = `${card.url}`;
        document.getElementById(`cardMain${i}`).appendChild(divCardImg);

        const divCardText = document.createElement("div");
        divCardText.id = `cardText${i}`;
        divCardText.setAttribute('class', "list-block__card-text");
        document.getElementById(`cardMain${i}`).appendChild(divCardText);

        const divCardName = document.createElement("div");
        divCardName.id = `cardName${i}`;
        divCardName.setAttribute('class', "list-block__card-name");
        divCardName.textContent = `${card.name}`;
        document.getElementById(`cardText${i}`).appendChild(divCardName);

        const divCardProvider = document.createElement("div");
        divCardProvider.id = `cardProvider${i}`;
        divCardProvider.setAttribute('class', "list-block__card-provider");
        divCardProvider.textContent = `${card.provider}`;
        document.getElementById(`cardText${i}`).appendChild(divCardProvider);

        const divCardDescription = document.createElement("div");
        divCardDescription.id = `cardDescription${i}`;
        divCardDescription.setAttribute('class', "list-block__card-description");
        divCardDescription.textContent = `${card.description}`;
        document.getElementById(`card${i}`).appendChild(divCardDescription);

        ++i;
    }
}

function setupCards() { // функция которая создаёт начальные данные и список карточек
    let minions = new Card("Миньоны", "https://catherineasquithgallery.com/uploads/posts/2021-03/1614552729_83-p-kartinki-na-belom-fone-prikolnie-98.jpg", "Сочные ребятки", 1, "Мультик");
    let gitar = new Card("The gitara", "https://acousticguitar.com/wp-content/uploads/2020/09/guild-guitar-giveaway-free-guitar.jpg", "Можно побрынчать", 2, "Друг по общаге");
    let car = new Card("Четырка", "https://hdpic.club/uploads/posts/2021-10/1635238783_23-hdpic-club-p-chetirka-mashina-28.jpg", "Четырка с развалом", 3, "Кто-то");
    let banana = new Card("Бананчик", "https://i.pinimg.com/originals/6a/bf/a9/6abfa90bd5ff616b000dfe8a8a3ceb55.jpg", "добрый малый", 4, "Губернский рынок");
    let array = [minions, gitar, car, banana];
    try {
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(array));
        location.reload();
    } catch {
        alert("карточки не сетапятся");
    }
}

function serializeForm(formNode, obj) { // собираем данные из формы
    const data = Array.from((new FormData(formNode)).entries());
    let card = obj;
    for (let i = 0; i < data.length; ++i) {
        let [key, value] = data[i];
        switch (true) {
            case key == 'name':
                card.name = value;
                break;
            case key == 'url':
                card.url = value;
                break;
            case key == 'description':
                card.description = value;
                break;
            case key == 'code':
                card.id = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}

function pushCard(event) { // функция добавления карточки
    let card = serializeForm(applicantForm, new Card());
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(card);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}

function deleteCard(event) { // функция удаления карточки
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.pos, 1);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function pullForm(event) { // при редактировании заполняем форму
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(event.target.pos);
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('code')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');
    document.getElementById('edit-button').pos = event.target.pos;
}

function editCard(event) { //редактируем данные
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = serializeForm(applicantForm, cards.at(event.target.pos));
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');

}

const applicantForm = document.getElementById('card-form')
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', pushCard);
editButton.addEventListener('click', editCard);
window.onload = renderCards; // при перезагрузке страницы рендерим карточки