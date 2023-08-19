import axios from "axios";

const SERVER_BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class AssetApi {
    constructor() {}

    static async getInfo(ticker, token) {
        
        const assetResponse = await axios.get(SERVER_BASE_URL + `/assets/${ticker}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const asset = assetResponse.data.asset;

        return asset;
    }
}

export default AssetApi;
