const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const wordElement = document.getElementById('word');
const pronunciationElement = document.getElementById('pronunciation');
const definitionElement = document.getElementById('definition');
const exampleElement = document.getElementById('example');
const synonymsElement = document.getElementById('synonyms');
const antonymsElement = document.getElementById('antonyms');
const audioElement = document.getElementById('audio');
const refreshButton = document.getElementById('refresh-button');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// List of random words to fetch
const words = ['serendipity', 'ephemeral', 'quixotic', 'luminous', 'resilience', 'eloquent', 'magnanimous', 'cogent'];

// Fetch word details from the Free Dictionary API
async function fetchWordDetails(word) {
  try {
    const response = await fetch(`${API_URL}${word}`);
    if (!response.ok) {
      throw new Error('Failed to fetch word');
    }
    const data = await response.json();
    displayWord(data[0]);
  } catch (error) {
    console.error('Error fetching word:', error);
    wordElement.textContent = 'Word not found. Please try another word.';
    pronunciationElement.textContent = 'Pronunciation: N/A';
    definitionElement.textContent = 'Definition: N/A';
    exampleElement.textContent = 'Example: N/A';
    synonymsElement.textContent = 'Synonyms: N/A';
    antonymsElement.textContent = 'Antonyms: N/A';
    audioElement.style.display = 'none';
  }
}

// Display the word and its details
function displayWord(data) {
  const word = data.word;
  const pronunciation = data.phonetic || 'N/A';
  const definition = data.meanings?.[0]?.definitions?.[0]?.definition || 'N/A';
  const example = data.meanings?.[0]?.definitions?.[0]?.example || 'N/A';
  const synonyms = data.meanings?.[0]?.synonyms?.join(', ') || 'N/A';
  const antonyms = data.meanings?.[0]?.antonyms?.join(', ') || 'N/A';
  const audioURL = data.phonetics?.find(phonetic => phonetic.audio)?.audio || '';

  wordElement.textContent = word;
  pronunciationElement.textContent = `Pronunciation: ${pronunciation}`;
  definitionElement.textContent = `Definition: ${definition}`;
  exampleElement.textContent = `Example: ${example}`;
  synonymsElement.textContent = `Synonyms: ${synonyms}`;
  antonymsElement.textContent = `Antonyms: ${antonyms}`;

  if (audioURL) {
    audioElement.style.display = 'block';
    audioElement.src = audioURL;
  } else {
    audioElement.style.display = 'none';
  }
}

// Fetch a random word from the list
function fetchRandomWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  fetchWordDetails(randomWord);
}

// Fetch a new word when the search button is clicked
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchWordDetails(searchTerm);
  } else {
    alert('Please enter a word to search.');
  }
});

// Fetch a new random word when the button is clicked
refreshButton.addEventListener('click', fetchRandomWord);

// Fetch the word of the day when the page loads
document.addEventListener('DOMContentLoaded', fetchRandomWord);
