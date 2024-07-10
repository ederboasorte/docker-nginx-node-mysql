const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});


const sql = `INSERT INTO people(name) values('Eder Vilela Brandao')`
connection.query(sql)


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado como id ' + connection.threadId);
});






app.get('/', (req, res) => {
  connection.query('SELECT * FROM people', (error, results, fields) => {
    if (error) {
      console.error('Erro ao realizar a consulta: ' + error.stack);
      res.status(500).send('Erro ao realizar a consulta');
      return;
    }
     //Envia os resultados como resposta
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      //<pre>${JSON.stringify(results, null, 2)}</pre>
    `);
  });
});





app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

