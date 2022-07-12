
export default function ExchangeRate({ exchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency }) {
    const exchangeRounded = (Number(exchangeRate).toFixed(2))

    return (
        <div className="exchange">
            <h3>Exchange Rate</h3>
            <h1>{exchangeRounded}</h1>
            <p>{chosenPrimaryCurrency} to {chosenSecondaryCurrency}</p>
        </div>
    )
}