/* eslint-disable no-console */
'use strict';

const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const params = new URL(req.url, 'http://localhost');
    const parts = params.pathname.split('/').filter(Boolean);
    const query = {};

    for (const part of params.search.slice(1).split('&')) {
      query[part.split('=')[0]] = part.split('=')[1];
    }

    res.setHeader('Content-Type', 'application/json');

    res.write(
      JSON.stringify({
        parts,
        query,
      }),
    );
    res.end();
  });

  return server;
}

module.exports = {
  createServer,
};
