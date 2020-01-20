const {config} = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envfound = config();

if (!envfound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

if (process.env.NODE_ENV === "development") {
    process.env.url = "localhost";
} else {
    process.env.url = "https://apiurl.com/";
}