// index.js
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/perguntar", async (req, res) => {
  const pergunta = req.query.q;
  const key = "AIzaSyC5grR_O4ioCyjAsZHPrxOlteFdNA9m4sU"; // <--- Coloque aqui sua chave

  try {
    const resposta = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        contents: [{ parts: [{ text: pergunta }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const texto = resposta.data.candidates[0].content.parts[0].text;
    res.json({ resposta: texto });
  } catch (e) {
    res.json({ resposta: "❌ Erro ao buscar resposta da IA." });
  }
});

app.listen(3000, () => console.log("Servidor Gemini Proxy online"));
