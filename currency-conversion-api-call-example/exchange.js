document.addEventListener('DOMContentLoaded', function () {
    const amount = document.getElementById('amount');
    const currency = document.getElementById('currency');
    const convert = document.getElementById('convert');
    const result = document.getElementById('result');

    const apiKey = API_KEY;

    convert.addEventListener('click', () => {
        const amountTotal = parseFloat(amount.value);
        const currencyTotal = currency.value;

        if (isNaN(amountTotal)) {
            result.innerHTML = 'Please enter a valid amount.';
            return;
        }

        const url = `https://api.api-ninjas.com/v1/convertcurrency?want=${currencyTotal}&have=USD&amount=${amountTotal}`;

        fetch(url, {
            headers: {
                'X-API-KEY': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.new_amount) {
                const resultPrice = data.new_amount;
                result.innerHTML = `${amountTotal} USD = ${resultPrice.toFixed(2)} ${currencyTotal}`;
            } else {
                result.innerHTML = 'Failed to get exchange rate.';
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            result.innerHTML = 'An error occurred please try again later.';
        });
    });
});
