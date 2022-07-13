
export default function ExchangeRate({ exchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency, result, amount, conversionVisibility }) {
    const exchangeRounded = (Number(exchangeRate).toFixed(2))

    return (
        <div className="exchange">
            <h3>Exchange Rate</h3>
            <p>{exchangeRounded}</p>
            <h1
                className={conversionVisibility}
            >
                {amount} {chosenPrimaryCurrency} = {result} {chosenSecondaryCurrency}</h1>
        </div>
    )
}