const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const { postgraphile } = require('postgraphile');
require('dotenv').config()
// import { createServer } from 'http';
// import postgraphile from 'postgraphile';

const app = express();
const port = 1738;
app.use(postgraphile(process.env.connectionString))
app.use(json());
app.use(cors());

// createServer(postgraphile());

app.listen(port, console.log('Graphql project listening on port, ', port))