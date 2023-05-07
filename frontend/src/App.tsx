import { Container, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");

  const handleButtonClick = () => {
    console.log(inputText);
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
      </Box>
    </Container>
  );
}

export default App;
