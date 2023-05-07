import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [faqText, setFaqText] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.post("http://localhost:8000/generate-faq", {
        text: inputText,
      });
      setFaqText(response.data.faq);
    } catch (error) {
      console.error("Error while generating FAQ:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <TextField
          fullWidth
          multiline
          rows={10}
          label="新機能の仕様を入力"
          variant="outlined"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            FAQを作成
          </Button>
        </Box>
        {faqText && (
          <Box my={2}>
            <Typography variant="h6">FAQ:</Typography>
            <Typography>{faqText}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
