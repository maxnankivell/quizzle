import { Box, Button } from "@mui/material";

function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, p: 3 }}>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          // TODO: Add navigation to view quizzes
        }}
      >
        View Quizzes
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          // TODO: Add navigation to create quiz
        }}
      >
        Create Quiz
      </Button>
    </Box>
  );
}

export default Home;
