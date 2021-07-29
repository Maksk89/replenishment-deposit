'use strict';

function calculatePercent(month) {
    if (month < 6){
        return 2;
    }
    if (month < 9){
        return 2.2;
    }
    if (month < 12){
        return 2.3;
    }
    if (month < 18){
        return 2.6;
    }
    return 2.7;
}

function calculateInterest(amount, period) {
    const percent = calculatePercent(period)

    const countMonth = 1; //количество месяцев начисления процентов по привлеченному вкладу
    const numberPeriods = period;//— число периодов начисления процентов.
    const totalMonthsYear = 12;//— количество месяцев в календарном году
    const profit = amount * (Math.pow((1 + percent * countMonth / totalMonthsYear / 100), numberPeriods) - 1); //расчет суммы процентов (дохода)
    const totalSum = amount + profit;
    return {
        totalSum,
        profit,
        percent,
    };

}

function handleSubmit(evt) {
    evt.preventDefault(); //отменяем поведение по умолчанию

    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';

    const amount = Number(amountInputEl.value);
    if (Number.isNaN(amount)) {
        //TODO: show errors
        return;
    }
    if (amount < minAmount) {
        //TODO: show errors
        return;
    }
    if (amount > maxAmount) {
        //TODO: show errors
        return;
    }
    const period = Number(periodInputEl.value);
    if (Number.isNaN(period)) {
        //TODO: show errors
        return;
    }
    if (period < minPeriod) {
        //TODO: show errors
        return;
    }
    if (period > maxPeriod) {
        //TODO: show errors
        return;
    }

    const result = calculateInterest(amount, period);
    totalEl.textContent =  `${Number(result.totalSum).toFixed(0)} `;
    profitEl.textContent = `${Number(result.profit).toFixed(0)} `;
    percentEl.textContent = `${result.percent} `;
}

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit', handleSubmit);

const minAmount = 15000;
const maxAmount = 50000000;
const minPeriod = 3;
const maxPeriod = 18;
const amountInputEl = document.getElementById('amount-input');
const periodInputEl = document.getElementById('period-input');
const totalEl = document.getElementById('total');
const profitEl = document.getElementById('profit');
const percentEl = document.getElementById('percent');

