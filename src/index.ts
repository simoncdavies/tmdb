import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const port: number = 3000;
const app = express();
app.use(cors());

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get("/", (req, res) => {
    res.send("TMDB");
});

const apiURL = 'https://api.themoviedb.org/3';
const apiOptions = {
    method: 'GET',
    url: '',
    headers: {
        accept: 'application/json',
        Authorization: process.env.TMDB_BEARER_TOKEN
    }
};
const apiLanguage = 'en-GB';

// API requests
app.get('/api/config', (req, res) => {
    apiOptions.url = `${apiURL}/configuration`;
    axios.request(apiOptions).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});

// trending/movie/day?language=en-GB
// /trending/tv/day?language=en-GB
app.get('/api/trending/:type', (req, res) => {
    const type = req.params.type;
    apiOptions.url = `${apiURL}/trending/${type}/day?language=${apiLanguage}`;
    axios.request(apiOptions).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});

// /movie/11?language=en-GB
// /movie/11?language=en-GB&append_to_response=credits,images&include_image_language=en
// /tv/236235?language=en-GB
// /tv/236235?language=en-GB&append_to_response=credits,images&include_image_language=en
app.get('/api/details/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    apiOptions.url = `${apiURL}/${type}/${id}?language=${apiLanguage}&append_to_response=credits`;
    axios.request(apiOptions).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});

// /search/multi?query=simpsons&include_adult=false&language=en-GB&page=1
app.get('/api/search/:query/:page?', (req, res) => {
    console.log()
    const query = req.params.query;
    const page = req.params.page ? req.params.page : '1';
    apiOptions.url = `${apiURL}/search/multi?query=${query}&include_adult=false&language=${apiLanguage}&page=${page}`;
    axios.request(apiOptions).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});

module.exports = app;
