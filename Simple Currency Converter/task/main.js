const input = require('sync-input');

const currencyRates = {
    'USD': 1.0,
    'JPY': 113.5,
    'EUR': 0.89,
    'RUB': 74.36,
    'GBP': 0.75,
};

function convertCurrency() {
    console.log(`What do you want to convert?`);
    const currencyFrom = getValidatedUserInput(`From: `);
    if (!currencyFrom) {
        convertCurrency()
        return;
    }

    const currencyTo = getValidatedUserInput(`To: `);
    if (!currencyTo) {
        convertCurrency()
        return;
    }

    const amount = getValidatedAmount(`Amount: `);
    if (!amount) {
        convertCurrency();
        return;
    }

    console.log(
        `Result: ${amount} ${currencyFrom} equals ${converter(currencyFrom, currencyTo, amount)} ${currencyTo}`
    );
}

function getValidatedUserInput(prompt) {
    const value = input(prompt).toUpperCase();
    return isValidCurrency(value) ? value : null;
}

function isValidCurrency(currency) {
    if (!currencyRates.hasOwnProperty(currency)) {
        console.log(`Unknown currency`);
        return false;
    }
    return true;
}

function getValidatedAmount(prompt) {
    const amount = parseFloat(input(prompt));

    if (amount < 0) {
        console.log(`The amount cannot be less than 1`);
        return false;
    }
    if (Number.isNaN(amount)) {
        console.log(`The amount has to be a number`);
        return false;
    }
    return amount;
}

function converter(currencyFrom, currencyTo, amount) {
    return ((currencyRates[currencyTo] / currencyRates[currencyFrom]) * amount).toFixed(4);
}


function startCovertCurrency() {
    console.log("Welcome to Currency Converter!");

    for (const currency in currencyRates) {
        console.log(`1 USD equals ${currencyRates[currency]} ${currency}`);
    }
    while (true) {
        console.log(`What do you want to do?`);
        console.log(`1-Convert currencies 2-Exit program`);
        let choice = getValidateChoice();
        switch (choice) {
            case 1:
                convertCurrency();
                break;
            case 2:
                console.log(`Have a nice day!`);
                return;
            default:
        }
    }
}

function getValidateChoice() {
    const choice = parseInt(input());
    const choiceList = [1, 2];
    if (!choiceList.includes(choice)) {
        console.log(`Unknown input`);
    } else {
        return choice;
    }
}

startCovertCurrency();