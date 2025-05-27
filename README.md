# IMDb Scraper Dashboard

A full-stack web application that scrapes IMDb movie details based on a given URL, stores the results in MongoDB, and provides an admin dashboard for viewing and managing the data.

## Features

`.`Admin Login Page (dummy password-based authentication)

`.`Movie Scraper (via IMDb URL)

`.`Scraped Data Table with pagination/sorting

`.`Cloud-Ready (supports Firebase, MongoDB Atlas, or Supabase)

`.`RESTful API with Express.js

## Tech Stack

| Frontend                    | Backend              | Database      | Deployment                |
| --------------------------- | -------------------- | ------------- | ------------------------- |
| Vue 3 + Vite + Tailwind CSS | Express.js (Node.js) | MongoDB Atlas | Vercel / Render / Railway |

# Data Source

The data is scraped from IMDb — the Internet Movie Database — which contains structured information on movies, ratings, genres, and summaries. The scraper targets a specific movie's detail page using its URL (e.g., https://www.imdb.com/title/tt1375666/).
