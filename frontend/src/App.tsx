import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { styled } from "@mui/system";

const Title = styled("h1")({
  fontSize: "2rem",
  fontWeight: "bold",
  background: "linear-gradient(135deg, #FF8E53 30%, #FE6B8B 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const GradientButton = styled(Button)({
  background: "linear-gradient(135deg, #FF8E53 30%, #FE6B8B 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
});

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
        <Title>FAQ Generator</Title>
        <TextField
          label="Service Specifications"
          multiline
          rows={6}
          fullWidth
          value={specText}
          onChange={(e) => setSpecText(e.target.value)}
        />
        <Box sx={{ my: 2 }}>
          <GradientButton
            variant="contained"
            color="primary"
            onClick={handleGenerateFaq}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            {isLoading ? "Generating FAQ..." : "Generate FAQ"}
          </GradientButton>
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
          <GradientButton
            variant="contained"
            color="primary"
            onClick={handleCopyFaq}
            disabled={!faqText}
          >
            Copy FAQ
          </GradientButton>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
