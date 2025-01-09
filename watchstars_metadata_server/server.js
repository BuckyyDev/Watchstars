import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Movie folder path (You can make this editable in your app settings later)
const moviesFolderPath = './movies';

// Helper function to get all movie files from the movies folder
const getMovieFiles = () => {
  return fs.readdirSync(moviesFolderPath).filter(file => file.endsWith('.mp4') || file.endsWith('.mkv') || file.endsWith('.avi')); // Add any other formats if needed
};

const cleanTitle = (filename) => {
  // Remove the file extension
  const withoutExtension = path.basename(filename, path.extname(filename));

  // Remove release year
  const withoutYear = withoutExtension.replace(/\b\d{4}\b/, '');

  // Remove common resolution tags, codecs, and other metadata
  const withoutMetadata = withoutYear.replace(
    /\b(1080p|720p|480p|BluRay|x264|x265|10bit|TrueHD|7\.1|Atmos|UnKn0wn|HDR|HEVC|WEB-DL|WEBRip|BRRip|DVDRip|H\.?264|H\.?265|AAC|DTS|HD|Remux|Rip)\b/gi,
    ''
  );

  // Replace dots with spaces
  const cleaned = withoutMetadata.replace(/\./g, ' ').trim();

  // Remove extra spaces
  return cleaned.replace(/\s+/g, ' ').trim();
};

// API endpoint to get metadata for all movies
app.get('/fetch-movies', async (req, res) => {
  console.log(`[INFO] Fetching metadata for all movies in the folder`);

  const movieFiles = getMovieFiles(); // Get all movie files

  const movieMetadataPromises = movieFiles.map(async (file) => {
    const title = cleanTitle(file); // Clean the title
    console.log(`[INFO] Fetching metadata for movie file: "${file}" (Cleaned Title: "${title}")`);
    const metadata = await fetchMovieMetadata(title);
    return metadata;
  });

  try {
    const allMoviesMetadata = await Promise.all(movieMetadataPromises);
    res.json(allMoviesMetadata);
  } catch (error) {
    console.error('Error fetching movie metadata:', error);
    res.status(500).json({ error: 'Failed to fetch movie metadata.' });
  }
  });

// API endpoint to get metadata for a single movie (by title)
app.get('/fetch-metadata', async (req, res) => {
  const { title } = req.query; // Extract title from query parameter

  if (!title) {
    console.warn(`[WARN] Missing title in query: ${JSON.stringify(req.query)}`);
    return res.status(400).json({ error: 'Title is required.' });
  }

  console.log(`[INFO] Fetching metadata for movie: "${title}"`);

  try {
    const metadata = await fetchMovieMetadata(title);
    if (metadata) {
      console.log(`[INFO] Metadata found for movie: "${title}"`);
      res.json(metadata);
    } else {
      console.warn(`[WARN] Movie not found: "${title}"`);
      res.status(404).json({ error: 'Movie not found.' });
    }
  } catch (error) {
    console.error('Error fetching movie metadata:', error);
    res.status(500).json({ error: 'Failed to fetch movie metadata.' });
  }
});

// Fetch metadata for a single movie (using TMDB API)
const fetchMovieMetadata = async (title) => {
  const apiKey = process.env.TMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=${apiKey}`);

  if (!response.ok) {
    console.error(`TMDb API Error: ${response.status} ${response.statusText}`);
    throw new Error('Failed to fetch movie metadata');
  }

  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const movie = data.results[0];
    return {
      title: movie.title,
      poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
      overview: movie.overview,
    };
  } else {
    console.warn(`Movie not found: ${title}`);
    return null;
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
