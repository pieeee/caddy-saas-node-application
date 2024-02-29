/**
 * Express application for the Caddy SaaS Node Application.
 * @module index
 */

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route handler for the root URL.
 * @name GET /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("/", (_, res) => {
  res.send("Hello World");
});

/**
 * Array of whitelisted domains.
 * @type {string[]}
 */
const whitelistedDomains = [
  "user-1.snapfreak.com",
  "user-2.snapfreak.com",
  "user-3.snapfreak.com",
  "snapfreak.com",
];

/**
 * Handles TLS (Transport Layer Security) check for a given domain.
 * This endpoint checks if the provided domain is whitelisted for TLS connections.
 * It is accessed via a GET request and expects a domain name as a query parameter.
 *
 * @route GET /tls-check
 * @param {Object} req - The request object from Express.js.
 * @param {Object} req.query - The query string object.
 * @param {string} req.query.domain - The domain name to check for TLS whitelisting.
 * @param {Object} res - The response object from Express.js.
 * @returns {Object} The response object with a status code and a JSON body.
 *          If the domain query parameter is missing, it returns a 400 status code with an error message.
 *          If the domain is found in the whitelist, it returns a 200 status code with a success message.
 *          If the domain is not in the whitelist, it returns a 403 status code with an error message.
 */
app.get("/tls-check", (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).json({
      error: "Domain is required",
    });
  }

  if (whitelistedDomains.includes(domain)) {
    return res.status(200).json({
      message: "Domain is whitelisted",
    });
  }

  return res.status(403).json({
    error: "Domain is not whitelisted",
  });
});

/**
 * Start the server and listen on port 8080.
 * @name listen
 * @function
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to execute when the server starts listening.
 */
app.listen(8080, () => {
  console.log("Server is running on port :8080\nhttp://localhost:8080/");
});
