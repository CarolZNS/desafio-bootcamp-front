import axios from "axios";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";

function App() {
  const [times, setTimes] = useState();
  const [nome, setNome] = useState("");

  const refresh = () => {
    axios
      .get("https://desafio-bootcamp-develop.up.railway.app/api/times")
      .then((response) => {
        setTimes(response.data);
      });
  };
  useEffect(refresh, []);

  if (!times) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      nome: nome,
    };
    await axios
      .post("https://desafio-bootcamp-develop.up.railway.app/api/jogador", body)
      .then(console.log);
    refresh();
    setNome("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete("https://desafio-bootcamp-develop.up.railway.app/api/jogador/all")
      .then(console.log);
    refresh();
  };
  const listaDeTimes = (
    <>
      {Object.entries(times).map(([team, players]) => (
        <Box sx={{ typography: "body1" }} key={team}>
          {team}:{" "}
          {players.map((player, index) => (
            <span key={index}>
              {player}
              {index !== players.length - 1 ? ", " : ""}
            </span>
          ))}
        </Box>
      ))}
    </>
  );

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Times de Futebol
      </Typography>
      <Card
        variant="outlined"
        sx={{ p: 2, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              label="Nome"
            />
          </form>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "center", mx: 2, p:1.5 }}
          >
            Adicionar Jogador
          </Button>
        </Box>
        <Card sx={{ p: 2 , mb: 2}}>{listaDeTimes}</Card>
        <Button onClick={handleDelete} variant="contained" color="error">
          DELETAR TUDO
        </Button>
      </Card>
    </Container>
  );
}

export default App;
