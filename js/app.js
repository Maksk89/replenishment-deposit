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
    const percent = calculatePercent(period);

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
    amountErrorEl.textContent = '';
    periodErrorEl.textContent = '';

    const amount = Number(amountInputEl.value);
    if (Number.isNaN(amount)) {
        amountErrorEl.textContent = `Неверное значение. Введите число, например: 15000`;
        return;
    }
    if (amount < minAmount) {
        amountErrorEl.textContent = `Неверное значение. Минимальная сумма: ${minAmount} ₽`;
        return;
    }
    if (amount > maxAmount) {
        amountErrorEl.textContent = `Неверное значение. Максимальная сумма: ${maxAmount} ₽`;
        return;
    }
    const period = Number(periodInputEl.value);
    if (Number.isNaN(period)) {
        periodErrorEl.textContent = `Неверное значение. Введите число месяцев, например: 3`;
        return;
    }
    if (period < minPeriod) {
        periodErrorEl.textContent = `Неверное значение. Минимальный период: ${minPeriod} месяца`;
        return;
    }
    if (period > maxPeriod) {
        periodErrorEl.textContent = `Неверное значение. Максимальный период: ${maxPeriod} месяцев`;
        return;
    }

    const result = calculateInterest(amount, period);
    totalEl.textContent = `${Number(result.totalSum).toFixed(0)} `;
    profitEl.textContent =`${Number(result.profit).toFixed(0)} `;
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
const amountErrorEl = document.getElementById('amount-error');
const periodErrorEl = document.getElementById('period-error');

