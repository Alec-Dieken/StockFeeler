import { useSession } from "next-auth/react";
import SFHeader from "../components/SFHeader";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import authHandler from "../utils/auth/authHandler";

function FAQ() {
    const { data, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <SFHeader loggedIn={status === "authenticated"} />
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0", maxWidth: "1000px" }}>
                    <Typography variant="h3">FAQ</Typography>
                    <Box>
                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography variant="h5">What is StockFeeler?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    StockFeeler is an engaging and user-friendly web application designed for trading enthusiasts at all levels. It's a platform
                                    where you can hone your trading skills, delve into both technical and fundamental trading strategies, and challenge yourself
                                    by competing against others.
                                    <br />
                                    <br />
                                    StockFeeler is built using a robust blend of technologies, including MongoDB, Express, Next.js, and Node. This combination
                                    ensures the app is efficient, reliable, and able to deliver a smooth user experience.
                                    <br />
                                    <br />
                                    Moreover, we use the Polygon.io API to provide live chart data. This ensures our users have access to the most up-to-date
                                    and accurate market information. With StockFeeler, trading practice becomes an interactive, competitive, and informative
                                    experience.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">How does StockFeeler work?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Every day, users are provided with 50 new stock-related queries, challenging them to predict stock price movements. Users
                                    make predictions based on available data and their own analysis. Over time, their predictions and performances are tracked,
                                    offering insights into their decision-making process and accuracy.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">Is StockFeeler free to use?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Yes! At the moment, StockFeeler is completely free to use.</Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">Is the chart data real-time?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Due to API limitations, there is a 15-minute delay on stock information. However, this only affects checking a user's
                                    prediction against the final result for a stock after the market closes - which is provided 15 minutes after market close.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">What do you plan on adding in the future?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    We are continuously looking to improve StockFeeler. Plans for the future include integrating more global stock
                                    exchanges/crypto/forex, adding a community feature where users can discuss and share insights, and implementing different
                                    types of training/prediction methods for users to improve their predictions.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">Who can I contact with any questions, comments, or concerns?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    We're always here to help! For any queries, please reach out to our support team at
                                    alec@alecdieken.com. We aim to respond within 24 hours.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{backgroundColor: "#161c2b", backgroundImage: "none"}}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography variant="h5">How do I delete my account?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    If you wish to delete your account, head to the 'Account' page and find the 'Delete Account' button underneath your account information. Please
                                    note that this action is irreversible, and all your data will be permanently removed. If you have concerns or issues, we
                                    recommend contacting us first.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Container>
            </>
        );
    }

    return null;
}

export default authHandler(FAQ);
