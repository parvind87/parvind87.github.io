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
const words =[
  "abject",
  "aberration",
  "abjure",
  "abnegation",
  "abrogate",
  "abscond",
  "abstruse",
  "accede",
  "accost",
  "accretion",
  "acumen",
  "adamant",
  "admonish",
  "adumbrate",
  "adverse",
  "advocate",
  "affluent",
  "aggrandize",
  "alacrity",
  "alias",
  "ambivalent",
  "amenable",
  "amorphous",
  "anachronistic",
  "anathema",
  "annex",
  "antediluvian",
  "antiseptic",
  "apathetic",
  "antithesis",
  "apocryphal",
  "approbation",
  "arbitrary",
  "arboreal",
  "arcane",
  "archetypal",
  "arrogate",
  "ascetic",
  "aspersion",
  "assiduous",
  "atrophy",
  "bane",
  "bashful",
  "beguile",
  "bereft",
  "blandishment",
  "bilk",
  "bombastic",
  "cajole",
  "callous",
  "calumny",
  "camaraderie",
  "candor",
  "capitulate",
  "carouse",
  "carp",
  "caucus",
  "cavort",
  "circumlocution",
  "circumscribe",
  "circumvent",
  "clamor",
  "cleave",
  "cobbler",
  "cogent",
  "cognizant",
  "commensurate",
  "complement",
  "compunction",
  "concomitant",
  "conduit",
  "conflagration",
  "connive",
  "consign",
  "constituent",
  "construe",
  "contusion",
  "contrite",
  "contentious",
  "contravene",
  "convivial",
  "corpulence",
  "covet",
  "cupidity",
  "dearth",
  "debacle",
  "debauch",
  "debunk",
  "defunct",
  "demagogue",
  "denigrate",
  "derivative",
  "despot",
  "diaphanous",
  "didactic",
  "dirge",
  "disaffected",
  "discomfit",
  "disparate",
  "dispel",
  "disrepute",
  "divisive",
  "dogmatic",
  "dour",
  "duplicity",
  "duress",
  "eclectic",
  "edict",
  "ebullient",
  "egregious",
  "elegy",
  "elicit",
  "embezzlement",
  "emend",
  "emollient",
  "empirical",
  "emulate",
  "enervate",
  "enfranchise",
  "engender",
  "ephemeral",
  "epistolary",
  "equanimity",
  "equivocal",
  "espouse",
  "evanescent",
  "evince",
  "exacerbate",
  "exhort",
  "execrable",
  "exigent",
  "expedient",
  "expiate",
  "expunge",
  "extraneous",
  "extol",
  "extant",
  "expurgate",
  "fallacious",
  "fatuous",
  "fetter",
  "flagrant",
  "foil",
  "forbearance",
  "fortuitous",
  "fractious",
  "garrulous",
  "gourmand",
  "grandiloquent",
  "gratuitous",
  "hapless",
  "hegemony",
  "iconoclast",
  "idiosyncratic",
  "impecunious",
  "impetuous",
  "impinge",
  "impute",
  "inane",
  "inchoate",
  "incontrovertible",
  "incumbent",
  "inexorable",
  "inimical",
  "injunction",
  "inoculate",
  "insidious",
  "instigate",
  "insurgent",
  "interlocutor",
  "intimation",
  "inure",
  "invective",
  "intransigent",
  "inveterate",
  "irreverence",
  "knell",
  "laconic",
  "largesse",
  "legerdemain",
  "libertarian",
  "licentious",
  "linchpin",
  "litigant",
  "maelstrom",
  "maudlin",
  "maverick",
  "mawkish",
  "maxim",
  "mendacious",
  "modicum",
  "morass",
  "mores",
  "munificent",
  "multifarious",
  "nadir",
  "negligent",
  "neophyte",
  "noisome",
  "noxious",
  "obdurate",
  "obfuscate",
  "obstreperous",
  "officious",
  "onerous",
  "ostensible",
  "ostracism",
  "palliate",
  "panacea",
  "paradigm",
  "pariah",
  "partisan",
  "paucity",
  "pejorative",
  "pellucid",
  "penchant",
  "penurious",
  "pert",
  "pernicious",
  "pertinacious",
  "phlegmatic",
  "philanthropic",
  "pithy",
  "platitude",
  "plaudit",
  "plenitude",
  "plethora",
  "portent",
  "potentate",
  "preclude",
  "predilection",
  "preponderance",
  "presage",
  "probity",
  "proclivity",
  "profligate",
  "promulgate",
  "proscribe",
  "protean",
  "prurient",
  "puerile",
  "pugnacious",
  "pulchritude",
  "punctilious",
  "quaint",
  "quixotic",
  "quandary",
  "recalcitrant",
  "redoubtable",
  "relegate",
  "remiss",
  "reprieve",
  "reprobate",
  "rescind",
  "requisition",
  "rife",
  "sanctimonious",
  "sanguine",
  "scurrilous",
  "semaphore",
  "serendipity",
  "sobriety",
  "solicitous",
  "solipsism",
  "spurious",
  "staid",
  "stolid",
  "subjugate",
  "surfeit",
  "surreptitious",
  "swarthy",
  "tangential",
  "tome",
  "toady",
  "torpid",
  "travesty",
  "trenchant",
  "trite",
  "truculent",
  "turpitude",
  "ubiquitous",
  "umbrage",
  "upbraid",
  "utilitarian",
  "veracity",
  "vestige",
  "vicissitude",
  "vilify",
  "virtuoso",
  "vitriolic",
  "vituperate",
  "vociferous",
  "wanton",
  "winsome",
  "yoke",
  "zephyr",
  "wily",
  "tirade"
];
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
