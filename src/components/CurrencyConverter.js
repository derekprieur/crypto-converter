import { useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from "axios"

export default function CurrencyConverter() {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('USD')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('USD')
    const [conversionVisibility, setConversionVisibility] = useState('convert')

    function convert() {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setExchangeRate(response.data['Realtime Currency Exchange Rate']["5. Exchange Rate"])
            setResult((response.data['Realtime Currency Exchange Rate']["5. Exchange Rate"] * amount).toFixed(2))
            setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
            setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
        }).catch(function (error) {
            console.error(error);
        });
        setConversionVisibility('show')
    }

    return (
        <div className="converter">
            <h2>Crypto Converter Dashboard</h2>
            <div className="dashboard">
                <div className="input">
                    <table>
                        <tbody>
                            <tr>
                                <td
                                    className="input1">
                                    <input
                                        className="input1"
                                        type="number"
                                        name="currency-amount-1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)} />
                                </td>
                                <td>
                                    <select
                                        value={chosenPrimaryCurrency}
                                        name="currency-option-1"
                                        className="currency-options"
                                        onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                    >
                                        {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                    </select>
                                </td>
                                <td>
                                    <div>to</div>
                                </td>
                                <td>
                                    <select
                                        value={chosenSecondaryCurrency}
                                        name="currency-option-2"
                                        className="currency-options"
                                        onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                    >
                                        {currencies.map(currency => (<option>{currency}</option>))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="convert-btn" onClick={convert}>Convert</button>
                </div>

                <ExchangeRate
                    exchangeRate={exchangeRate}
                    chosenPrimaryCurrency={primaryCurrencyExchanged}
                    chosenSecondaryCurrency={secondaryCurrencyExchanged}
                    result={result}
                    amount={amount}
                    conversionVisibility={conversionVisibility}
                />
            </div>
        </div>
    )
}