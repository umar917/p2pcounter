let deals = [];
let nextId = 1;

function renderDeals(filterType = "") {
    const tbody = document.getElementById('dealsTable');
    tbody.innerHTML = '';

    deals
        .filter(deal => !filterType || deal.type === filterType)
        .forEach(deal => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td data-label="ID">${deal.id}</td>
            <td data-label="Тип">${deal.type === 'buy' ? 'Покупка' : 'Продажа'}</td>
            <td data-label="Сумма">${deal.amount}</td>
            <td data-label="Валюта">${deal.currency}</td>
            <td data-label="Цена">${deal.price}</td>
            <td data-label="Примечание">${deal.note}</td>
            <td data-label="Дата">${deal.date}</td>
            <td data-label="Действия">
              <button onclick="deleteDeal(${deal.id})">Удалить</button>
            </td>
          `;
            tbody.appendChild(row);
        });
}

function deleteDeal(id) {
    deals = deals.filter(deal => deal.id !== id);
    renderDeals(document.getElementById('typeFilter').value);
}

function addRandomDeal() {
    const types = ['buy', 'sell'];
    const newDeal = {
        id: nextId++,
        type: types[Math.floor(Math.random() * 2)],
        amount: (Math.random() * 10000).toFixed(0),
        currency: 'USDT',
        price: (Math.random() * 100).toFixed(2),
        note: 'Тестовая сделка',
        date: new Date().toLocaleString()
    };
    deals.push(newDeal);
    renderDeals(document.getElementById('typeFilter').value);
}

document.getElementById('addDeal').addEventListener('click', addRandomDeal);
document.getElementById('applyFilter').addEventListener('click', () => {
    const filterType = document.getElementById('typeFilter').value;
    renderDeals(filterType);
});
document.getElementById('resetFilter').addEventListener('click', () => {
    document.getElementById('typeFilter').value = '';
    renderDeals();
});

renderDeals();


const tg = window.Telegram.WebApp;
tg.expand(); // растянуть на весь экран

const user = tg.initDataUnsafe?.user;

if (user) {
    console.log("Пользователь:", user);
    document.querySelector('h1').innerText += ` — ${user.first_name}`;
}
