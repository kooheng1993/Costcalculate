let customRates = {};

function updateRateAndDefaultRate() {
    const currency = document.getElementById('currency').value;
    const defaultRate = getDefaultRate(currency);
    
    if (defaultRate === null) {
        alert('Please Select Currency！');
        return;
    }
    
    document.getElementById('rate').innerText = defaultRate;
}

function updateCustomRate() {
    const currency = document.getElementById('currency').value;
    const customRate = parseFloat(document.getElementById('customRate').value);
    
    if (isNaN(customRate) || customRate <= 0) {
        alert('Please Fill Amount！');
        return;
    }
    
    customRates[currency] = customRate;
    document.getElementById('rate').innerText = customRate.toFixed(2);
    alert(`Custom Rate is Updated：${currency} -> ${customRate}`);
}

function resetCustomRate() {
    const currency = document.getElementById('currency').value;
    
    if (customRates[currency] === undefined) {
        alert('Please Select Currency！');
        return;
    }
    
    delete customRates[currency];
    const defaultRate = getDefaultRate(currency);
    document.getElementById('rate').innerText = defaultRate;
    alert(`Currecy Rate Have Restore To Default：${currency} -> ${defaultRate}`);
}

function getDefaultRate(currency) {
    const defaultRates = {
        'MYR': 1.00,
        'SGD': 3.40,
        'AUD': 2.90,
        'HKD': 0.60,
        'CND': 3.45,
        'USD': 4.80
    };
    return defaultRates[currency] || null;
}

function calculateCost() {
    const free = parseInt(document.getElementById('free').value);
    const percentage = parseFloat(document.getElementById('percentage').value) / 100;

    if (isNaN(free) || isNaN(percentage) || percentage < 0 || percentage > 1) {
        alert('Please Fill Number！');
        return;
    }

    const currency = document.getElementById('currency').value;
    const rate = customRates[currency] || getDefaultRate(currency);

    if (rate === null) {
        alert('Please Choose Currency！');
        return;
    }

    const cost = free * percentage * rate;

    document.getElementById('cost').innerText = cost.toFixed(2);
}

function calculateTargetPoints() {
    const maxWithdrawAmount = parseFloat(document.getElementById('maxWithdrawAmount').value);
    const selectedCurrency = document.getElementById('selectedCurrency').value;

    if (isNaN(maxWithdrawAmount) || maxWithdrawAmount < 0) {
        alert('Please Fill MaxWithdraw Amount！');
        return;
    }

    const rate_selectedCurrency = customRates[selectedCurrency] || getDefaultRate(selectedCurrency);
    const currency_moduleOne = document.getElementById('currency').value;
    const rate_moduleOne = customRates[currency_moduleOne] || getDefaultRate(currency_moduleOne);
    const percentage_moduleTwo = parseFloat(document.getElementById('percentage').value) / 100;
    const free = parseInt(document.getElementById('free').value);

    if (isNaN(percentage_moduleTwo) || percentage_moduleTwo < 0 || percentage_moduleTwo > 1 || isNaN(free)) {
        alert('Please Fill Percentage And Free Credit Amount！');
        return;
    }

    const cost_free = free * percentage_moduleTwo ;
    const targetPoints = ((maxWithdrawAmount * (rate_selectedCurrency / rate_moduleOne)) + cost_free) / percentage_moduleTwo  ;
    document.getElementById('targetPoints').innerText = targetPoints.toFixed(2);
    document.getElementById('maxWithdraw').innerText = (maxWithdrawAmount + ' ' + selectedCurrency); // 显示最大提现金额和货币
}
