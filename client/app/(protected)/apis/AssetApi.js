import axios from "axios";

const serverBaseUrl = process.env.SERVER_URL || "https://stockfeeler.online:443";

class AssetApi {
    constructor() {}

    static async getInfo(ticker, token) {
        
        const assetResponse = await axios.get(serverBaseUrl + `/assets/${ticker}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const asset = assetResponse.data.asset;

        return asset;
    }
}

export default AssetApi;
