import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password, username } = req.body;

        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                email,
                password,
                username,
            });

            const { token } = response.data;
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    } else {
        res.status(405).json({ msg: "Method not allowed" });
    }
}
