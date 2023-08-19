class ForexClass {
    constructor() {
        this.validPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "AUD/USD", "USD/CAD", "USD/CHF", "EUR/GBP"];
    }

    async getData(pairStr) {
        if(this.validPairs.indexOf(pairStr) === -1) throw new Error("Not a valid pair.");

        const [from, to] = pairStr.split("/");

        try {
            const res = await axios.get(
                `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${process.env.ALPHA_VANTAGE_API}`
            );
            console.log(res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

const ForexPairs = new ForexClass();

export default ForexPairs;