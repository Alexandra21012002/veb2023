import './src/index.less';

class Card {
    constructor(id, name, url, desc, code, provider) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = desc;
        this.code = code;
        this.provider = provider;
    }
}

const generateId = () => Math.random().toString(16).slice(2);

const setupData = [
    new Card(generateId(), "Миньоны", "https://catherineasquithgallery.com/uploads/posts/2021-03/1614552729_83-p-kartinki-na-belom-fone-prikolnie-98.jpg", "Сочные ребятки", 1, "Мультик"),
    new Card(generateId(), "The gitara", "https://acousticguitar.com/wp-content/uploads/2020/09/guild-guitar-giveaway-free-guitar.jpg", "Можно побрынчать", 2, "Друг по общаге"),
    new Card(generateId(), "Четырка", "https://hdpic.club/uploads/posts/2021-10/1635238783_23-hdpic-club-p-chetirka-mashina-28.jpg", "Четырка с развалом", 3, "Кто-то"),
    new Card(generateId(), "Бананчик", "https://i.pinimg.com/originals/6a/bf/a9/6abfa90bd5ff616b000dfe8a8a3ceb55.jpg", "добрый малый", 4, "Губернский рынок")
];

function fetchAll() { // получаем все данные
    fetchProfile();
    fetchCards();
}

const fetchProfile = async () => {
    try {
        const user = await fetch('http://localhost:3000/creatorInfo').then(response => response.json());
        document.getElementById('header__text').textContent = `${user.name} ${user.group}`;
    } catch (err) {
        alert(`Ошибка в запросе автора: ${err}`);
    }
};

const drawCard = (card, i) => {
    const cardContainer = document.createElement("div");
    cardContainer.id = `card${i}`;
    cardContainer.classList.add("list-block__card");
    document.querySelector(".list-block__list").appendChild(cardContainer);

    const divCardTop = document.createElement("div");
    divCardTop.id = `cardTop${i}`;
    divCardTop.setAttribute('class', "list-block__card-top");
    document.getElementById(`card${i}`).appendChild(divCardTop);

    const divCardRed = document.createElement("a");
    divCardRed.id = `cardRed${i}`;
    divCardRed.setAttribute('class', "list-block__card-red");
    divCardRed.addEventListener('click', pullForm);
    divCardRed.editId = card.id;
    divCardRed.textContent = 'Edit';
    document.getElementById(`cardTop${i}`).appendChild(divCardRed);

    const divCardCode = document.createElement("div");
    divCardCode.id = `cardId${i}`;
    divCardCode.setAttribute('class', "list-block__card-id");
    divCardCode.textContent = `Код: ${card.code}`;
    document.getElementById(`cardTop${i}`).appendChild(divCardCode);

    const divCardDel = document.createElement("a");
    divCardCode.id = `cardDel${i}`;
    divCardDel.setAttribute('class', "list-block__card-red");
    divCardDel.textContent = `X`;
    divCardDel.addEventListener('click', deleteCard);
    divCardDel.delId = card.id;
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
};

const fetchCards = async () => {
    try {
        const cards = await fetch('http://localhost:3000/items').then(response => response.json());
        document.querySelectorAll('.skeleton').forEach(skeleton => skeleton.classList.add('invisible'));

        cards.forEach((card, i) => drawCard(card, i));
    } catch (err) {
        alert(`Ошибка получения карточек с сервера: ${err}`);
    }
};

const setupCards = async () => {
    document.querySelectorAll('.list-block__card').forEach(card => card.classList.add('invisible'));
    document.querySelectorAll('.skeleton').forEach(skeleton => skeleton.classList.remove('invisible'));

    try {
        for (let j = 0; j < setupData.length; ++j) {
            await fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(setupData[j])
            });
        }
    } catch {
        alert("Ошибка, карточки не сетапятся");
    }

    fetchCards();
};

function validateData(data) {
    return (data.name && data.code && data.provider)
}
function serializeForm(formNode, obj) {
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
                card.code = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}

async function pushCard(event) {
    try {
        let card = serializeForm(applicantForm, new Card());
        if (validateData(card)) {
            document.getElementById('loader').classList.remove('invisible');
            setupButton.setAttribute('disabled', '');
            submitButton.setAttribute('disabled', '');
            card.id = generateId();
            await fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            }).then(() => {
                document.getElementById('loader').classList.add('invisible');
                setupButton.removeAttribute('disabled', '');
                submitButton.removeAttribute('disabled', '');
                drawCard(card);
                location.reload();
            });
        } else {
            alert("Введите необходимые поля");
        };

    } catch (err) {
        alert(err);
    }
}

async function deleteCard(event) {
    try {
        await fetch(`http://localhost:3000/items/${event.target.delId}`, {
            method: 'DELETE'
        }).then(() => location.reload())
    } catch (err) {
        alert(err);
    }

}

async function pullForm(event) {
    try {
        let card = await fetch(`http://localhost:3000/items/${event.target.editId}`).then((res) => res.json());
        document.getElementsByName('name')[0].value = card.name;
        document.getElementsByName('url')[0].value = card.url;
        document.getElementsByName('description')[0].value = card.description;
        document.getElementsByName('code')[0].value = card.code;
        document.getElementsByName('provider')[0].value = card.provider;
        document.getElementById('submit-button').classList.add('invisible');
        document.getElementById('edit-button').classList.remove('invisible');
        document.getElementById('edit-button').editId = card.id;
    } catch (err) {
        alert(err);
    }

}

async function editCard(event) {
    let card = serializeForm(applicantForm, new Card());
    try {
        await fetch(`http://localhost:3000/items/${event.target.editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        }).then(() => {
            document.getElementById('submit-button').classList.remove('invisible');
            document.getElementById('edit-button').classList.add('invisible');
            location.reload();
        })
    } catch (err) {
        alert(err);
    }

}

const applicantForm = document.getElementById('card-form');
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', pushCard);
editButton.addEventListener('click', editCard);

fetchAll();
