import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function App() {
  const [specText, setSpecText] = useState("");
  const [faqText, setFaqText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateFaq = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate-faq", {
        text: specText,
      });
      setFaqText(response.data.faq);
    } catch (error) {
      console.error("Error generating FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyFaq = () => {
    navigator.clipboard.writeText(faqText);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FAQ Generator
        </Typography>
        <TextField
          label="Service Specifications"
          multiline
          rows={6}
          fullWidth
          value={specText}
          onChange={(e) => setSpecText(e.target.value)}
        />
        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateFaq}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            {isLoading ? "Generating FAQ..." : "Generate FAQ"}
          </Button>
        </Box>
        <TextField
          label="Generated FAQ"
          multiline
          rows={6}
          fullWidth
          value={faqText}
          InputProps={{
            readOnly: true,
          }}
        />
        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopyFaq}
            disabled={!faqText}
          >
            Copy FAQ
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
