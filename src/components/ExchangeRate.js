
export default function ExchangeRate({ exchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency, result, amount }) {
    const exchangeRounded = (Number(exchangeRate).toFixed(2))

    return (
        <div className="exchange">
            <h3>Exchange Rate</h3>
            <p>{exchangeRounded}</p>
            <h1>{amount} {chosenPrimaryCurrency} = {result} {chosenSecondaryCurrency}</h1>
        </div>
    )
}