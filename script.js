const countryInput = document.getElementById("countryInput");
const countryList = document.getElementById("countryList");
const cityInput = document.getElementById("cityInput");
const cityList = document.getElementById("cityList");
const daysInput = document.getElementById("daysInput");
const budgetInput = document.getElementById("budgetInput");
const tripCards = document.querySelectorAll(".trip-card");
const planBtn = document.getElementById("planBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const clearBtn = document.getElementById("clearBtn");
const resultContainer = document.getElementById("resultContainer");
const messageBox = document.getElementById("messageBox");

let selectedTripType = "";
let countriesData = [];
let currentCities = [];

daysInput.addEventListener("input", () => {
  daysInput.value = daysInput.value.replace(/[^\d]/g, "");
  hideMessage();
});

budgetInput.addEventListener("input", () => {
  budgetInput.value = budgetInput.value.replace(/[^\d]/g, "");
  hideMessage();
});

const cityExtras = {
  Paris: {
    description: "Paris is known for art, architecture, elegant streets, cafés, and iconic landmarks.",
    vibe: "Romantic & Cultural",
    advice: "Use metro and walk more for the best city experience.",
    budgetLevel: "high",
    attractions: [
      { name: "Eiffel Tower", details: "A must-visit landmark with beautiful city views." },
      { name: "Louvre Museum", details: "A famous art museum with iconic collections." },
      { name: "Seine River Walk", details: "A calm walk with lovely Paris views." }
    ],
    restaurants: [
      { name: "Café de Flore", details: "Historic café perfect for coffee and light meals." },
      { name: "Le Relais", details: "A popular restaurant for a classic Paris dining experience." },
      { name: "Breizh Café", details: "Well-known for delicious crêpes and casual dining." }
    ],
    hotels: [
      { name: "Pullman Paris", details: "Elegant stay near major attractions." },
      { name: "Novotel Paris Centre", details: "Comfortable hotel with good city access." },
      { name: "Hôtel Malte", details: "Stylish option in a central location." }
    ]
  },
  Tokyo: {
    description: "Tokyo combines modern city life, culture, technology, shopping, and amazing food.",
    vibe: "Modern & Lively",
    advice: "Public transport is the easiest and smartest way to move around.",
    budgetLevel: "high",
    attractions: [
      { name: "Tokyo Tower", details: "A classic landmark with city skyline views." },
      { name: "Shibuya Crossing", details: "One of the most iconic city spots in Tokyo." },
      { name: "Senso-ji Temple", details: "A cultural place with a traditional atmosphere." }
    ],
    restaurants: [
      { name: "Ichiran Ramen", details: "Very popular for ramen lovers." },
      { name: "Afuri", details: "Stylish ramen place with light flavorful bowls." },
      { name: "Sushi Dai", details: "Known for fresh sushi and classic Japanese dining." }
    ],
    hotels: [
      { name: "Hotel Gracery", details: "Famous city hotel in a lively district." },
      { name: "Tokyo Station Hotel", details: "Refined stay with classic charm." },
      { name: "Shinjuku Granbell", details: "Modern hotel great for city travelers." }
    ]
  },
  Rome: {
    description: "Rome is full of history, architecture, warm streets, and unforgettable food.",
    vibe: "Historic & Charming",
    advice: "Start your sightseeing early to avoid crowds at major attractions.",
    budgetLevel: "medium",
    attractions: [
      { name: "Colosseum", details: "One of Rome’s most famous historic sites." },
      { name: "Trevi Fountain", details: "Beautiful fountain and a classic city stop." },
      { name: "Roman Forum", details: "Ancient ruins full of history and character." }
    ],
    restaurants: [
      { name: "Roscioli", details: "Known for pasta and Italian specialties." },
      { name: "Giolitti", details: "Classic stop for gelato and desserts." },
      { name: "Cantina e Cucina", details: "Popular place for pizza and pasta." }
    ],
    hotels: [
      { name: "Hotel Artemide", details: "Elegant hotel in central Rome." },
      { name: "iQ Hotel Roma", details: "Modern and practical for travelers." },
      { name: "UNAHOTELS Decò", details: "Comfortable stay with good access." }
    ]
  },
  Riyadh: {
    description: "Riyadh offers modern city life, entertainment, shopping, and cultural places.",
    vibe: "Modern & Dynamic",
    advice: "Evening time is ideal for many outdoor places and city activities.",
    budgetLevel: "medium",
    attractions: [
      { name: "Kingdom Centre", details: "A famous city landmark with skyline views." },
      { name: "Diriyah", details: "Historic area that reflects Saudi heritage." },
      { name: "Boulevard Riyadh City", details: "A lively destination for entertainment." }
    ],
    restaurants: [
      { name: "Najd Village", details: "Popular for traditional Saudi food." },
      { name: "The Globe", details: "Stylish dining in an elegant setting." },
      { name: "Urth Caffé", details: "Casual and trendy café experience." }
    ],
    hotels: [
      { name: "Four Seasons Riyadh", details: "Luxury stay with a premium location." },
      { name: "Fairmont Riyadh", details: "Polished hotel for comfort and business." },
      { name: "Narcissus Riyadh", details: "A well-known luxury city stay." }
    ]
  },
  Jeddah: {
    description: "Jeddah is perfect for sea views, relaxed outings, shopping, and heritage areas.",
    vibe: "Relaxed & Coastal",
    advice: "The waterfront is best enjoyed near sunset.",
    budgetLevel: "medium",
    attractions: [
      { name: "Jeddah Waterfront", details: "Great place for sea views and family time." },
      { name: "Al-Balad", details: "Historic district with cultural charm." },
      { name: "Red Sea Mall", details: "A modern shopping and entertainment spot." }
    ],
    restaurants: [
      { name: "Toki", details: "Premium dining experience in Jeddah." },
      { name: "Niyyali", details: "Popular for regional dishes." },
      { name: "Section-B", details: "Trendy casual modern dining." }
    ],
    hotels: [
      { name: "Rosewood Jeddah", details: "Sea-view luxury stay." },
      { name: "Ritz-Carlton Jeddah", details: "Elegant hotel with premium comfort." },
      { name: "InterContinental", details: "Classic hotel for leisure and business." }
    ]
  },
  Dubai: {
    description: "Dubai is known for luxury, skyscrapers, shopping, and premium city experiences.",
    vibe: "Luxury & Modern",
    advice: "Plan indoor and outdoor activities depending on weather and time of day.",
    budgetLevel: "high",
    attractions: [
      { name: "Burj Khalifa", details: "Dubai’s most iconic global landmark." },
      { name: "Dubai Mall", details: "Huge shopping and entertainment destination." },
      { name: "Dubai Marina", details: "Stylish waterfront area for walking and dining." }
    ],
    restaurants: [
      { name: "Zuma Dubai", details: "High-end modern dining." },
      { name: "Operation Falafel", details: "Casual and loved regional street food." },
      { name: "Al Fanar", details: "Known for Emirati-style dining." }
    ],
    hotels: [
      { name: "Atlantis The Palm", details: "World-famous resort stay." },
      { name: "Armani Hotel Dubai", details: "Luxury experience inside Burj Khalifa." },
      { name: "JW Marriott Marquis", details: "Famous high-rise luxury hotel." }
    ]
  },
  "Abu Dhabi": {
    description: "Abu Dhabi offers elegant spaces, cultural sites, and calm polished city travel.",
    vibe: "Elegant & Calm",
    advice: "Mix cultural places with relaxing seaside activities for a balanced trip.",
    budgetLevel: "high",
    attractions: [
      { name: "Sheikh Zayed Grand Mosque", details: "A beautiful and iconic cultural landmark." },
      { name: "Louvre Abu Dhabi", details: "Modern museum blending art and design." },
      { name: "Corniche Beach", details: "Relaxing area for walking and seaside views." }
    ],
    restaurants: [
      { name: "Coya Abu Dhabi", details: "Modern upscale dining." },
      { name: "Mosaic", details: "Known for flavorful regional food." },
      { name: "Jones the Grocer", details: "Casual café and dining place." }
    ],
    hotels: [
      { name: "Emirates Palace", details: "Iconic luxury stay." },
      { name: "The St. Regis", details: "Premium elegant hotel." },
      { name: "Jumeirah Saadiyat", details: "Stylish coastal resort." }
    ]
  }
};

async function loadCountries() {
  countryInput.value = "";
  countryList.innerHTML = "";

  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,region,timezones");
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();

    countriesData = data
      .filter(country => country.name && country.name.common)
      .sort((a, b) => a.name.common.localeCompare(b.name.common));

    countriesData.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name.common;
      countryList.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    showMessage("Could not load countries from API.", "error");
  }
}

async function loadCitiesByCountry(countryName) {
  cityInput.value = "";
  cityList.innerHTML = "";
  currentCities = [];

  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ country: countryName })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      showMessage("No cities found for this country.", "info");
      return;
    }

    currentCities = result.data.slice().sort((a, b) => a.localeCompare(b));

    currentCities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      cityList.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    showMessage("Could not load cities for this country.", "error");
  }
}

countryInput.addEventListener("change", async () => {
  hideMessage();
  const selectedCountry = countryInput.value.trim();

  if (!selectedCountry) {
    cityInput.value = "";
    cityList.innerHTML = "";
    return;
  }

  await loadCitiesByCountry(selectedCountry);
});

tripCards.forEach(card => {
  card.addEventListener("click", () => {
    tripCards.forEach(item => item.classList.remove("active"));
    card.classList.add("active");
    selectedTripType = card.getAttribute("data-trip");
    hideMessage();
  });
});

cityInput.addEventListener("input", hideMessage);

function showMessage(message, type) {
  messageBox.textContent = message;
  messageBox.className = "message-box";
  messageBox.classList.add(type);
}

function hideMessage() {
  messageBox.textContent = "";
  messageBox.className = "message-box";
}

function getCountryByName(name) {
  return countriesData.find(country => country.name.common.toLowerCase() === name.toLowerCase());
}

function getBudgetState(userBudget, level) {
  if (level === "high") {
    if (userBudget >= 9000) return { label: "Strong budget match", className: "budget-good" };
    if (userBudget >= 5000) return { label: "Possible with planning", className: "budget-medium" };
    return { label: "Expensive for your budget", className: "budget-bad" };
  }

  if (level === "medium") {
    if (userBudget >= 5000) return { label: "Good budget fit", className: "budget-good" };
    if (userBudget >= 2500) return { label: "Moderate budget fit", className: "budget-medium" };
    return { label: "Budget may be tight", className: "budget-bad" };
  }

  return { label: "Flexible budget", className: "budget-good" };
}

function createList(items, icon) {
  return items.map(item => `
    <div class="list-item">
      <div class="list-icon">${icon}</div>
      <div>
        <h4>${item.name}</h4>
        <p>${item.details}</p>
      </div>
    </div>
  `).join("");
}

function getFallbackExtras(countryName, cityName) {
  return {
    description: `${cityName} in ${countryName} is a popular destination with useful places to explore and enjoy.`,
    vibe: selectedTripType ? `${selectedTripType} Experience` : "Balanced Travel",
    advice: "Check transport, popular attractions, and hotel location before finalizing your plan.",
    budgetLevel: "medium",
    attractions: [
      { name: `${cityName} City Center`, details: "A good place to start exploring the city." },
      { name: `${cityName} Main Landmark`, details: "One of the popular highlights for visitors." },
      { name: `${cityName} Local District`, details: "Great for walking and discovering the atmosphere." }
    ],
    restaurants: [
      { name: "Local Restaurant", details: "A good option to try food in the area." },
      { name: "City Café", details: "Relaxed place for coffee and light meals." },
      { name: "Popular Dining Spot", details: "A known place visited by travelers." }
    ],
    hotels: [
      { name: "City Hotel", details: "Comfortable stay in a practical location." },
      { name: "Central Stay", details: "Useful option close to important areas." },
      { name: "Business Hotel", details: "Suitable for short and organized stays." }
    ]
  };
}

function buildItinerary(city, days, tripType) {
  const plans = {
    Paris: [
      ["Eiffel Tower & morning photos", "Louvre Museum & lunch nearby", "Seine River walk and dinner"],
      ["Montmartre & Sacré-Cœur", "Shopping and café break", "Relaxed evening in the city"],
      ["Notre-Dame area", "Tuileries Garden", "Sunset by the river"],
      ["Local breakfast and side streets", "Museum or gallery visit", "Elegant dinner spot"],
      ["Free morning", "Shopping and souvenirs", "Final evening walk"]
    ],
    Tokyo: [
      ["Senso-ji Temple", "Asakusa lunch", "Tokyo Skytree area"],
      ["Shibuya Crossing", "Shopping in Shibuya", "Dinner and city lights"],
      ["Tokyo Tower", "Café and rest", "Night district exploration"],
      ["Local breakfast", "Museum or culture spot", "Relaxing dinner"],
      ["Free day plan", "Gift shopping", "Final city walk"]
    ],
    Rome: [
      ["Colosseum visit", "Roman Forum", "Italian dinner"],
      ["Trevi Fountain", "City walk and lunch", "Piazza evening"],
      ["Historic church visit", "Gelato stop", "Relaxed night walk"],
      ["Local breakfast", "Shopping streets", "Classic Roman meal"],
      ["Free morning", "Souvenirs", "Final evening in Rome"]
    ],
    Riyadh: [
      ["Kingdom Centre", "Lunch in a modern district", "Boulevard evening"],
      ["Diriyah visit", "Traditional meal", "Relaxed city outing"],
      ["Museum or culture stop", "Coffee break", "Evening gathering place"],
      ["Shopping mall", "Lunch", "Night city view"],
      ["Free time", "Souvenirs", "Final dinner"]
    ],
    Jeddah: [
      ["Jeddah Waterfront", "Sea-view lunch", "Sunset walk"],
      ["Al-Balad", "Heritage café", "Relaxed evening"],
      ["Mall or shopping stop", "Lunch", "Corniche outing"],
      ["Beachside breakfast", "Free time", "Dinner by the sea"],
      ["Souvenir shopping", "Lunch", "Final seaside walk"]
    ],
    Dubai: [
      ["Burj Khalifa", "Dubai Mall lunch", "Dubai Fountain evening"],
      ["Dubai Marina", "Boat or waterfront lunch", "Dinner in Marina"],
      ["Museum of the Future or city spot", "Café break", "Evening skyline view"],
      ["Shopping day", "Lunch", "Business dinner or elegant meeting"],
      ["Free time", "Souvenirs", "Final city experience"]
    ],
    "Abu Dhabi": [
      ["Grand Mosque", "Lunch nearby", "Corniche evening"],
      ["Louvre Abu Dhabi", "Café and museum break", "Seaside dinner"],
      ["Beach morning", "Relaxed afternoon", "Elegant evening"],
      ["Shopping and gifts", "Lunch", "Quiet city outing"],
      ["Free plan", "Last lunch", "Final walk"]
    ]
  };

  const basePlan = plans[city] || [
    ["Morning activity", "Afternoon activity", "Evening activity"],
    ["Local sightseeing", "Lunch and city walk", "Relaxed evening"],
    ["Popular area visit", "Free time", "Dinner and rest"]
  ];

  const totalDays = Math.max(Number(days), 1);
  let html = "";

  for (let i = 0; i < totalDays; i++) {
    const current = basePlan[i % basePlan.length];

    html += `
      <div class="itinerary-day">
        <h4>Day ${i + 1} · ${tripType}</h4>
        <div class="day-slot">
          <span>Morning</span>
          <p>${current[0]}</p>
        </div>
        <div class="day-slot">
          <span>Afternoon</span>
          <p>${current[1]}</p>
        </div>
        <div class="day-slot">
          <span>Evening</span>
          <p>${current[2]}</p>
        </div>
      </div>
    `;
  }

  return html;
}

function validateInputs() {
  const selectedCountry = countryInput.value.trim();
  const selectedCity = cityInput.value.trim();
  const daysValue = daysInput.value.trim();
  const budgetValue = budgetInput.value.trim();

  if (selectedCountry === "") {
    showMessage("Please select a country first.", "error");
    return false;
  }

  if (!getCountryByName(selectedCountry)) {
    showMessage("Please choose a valid country from the list.", "error");
    return false;
  }

  if (selectedCity === "") {
    showMessage("Please select a city first.", "error");
    return false;
  }

  if (currentCities.length && !currentCities.includes(selectedCity)) {
    showMessage("Please choose a valid city from the list.", "error");
    return false;
  }

  if (daysValue === "") {
    showMessage("Please enter number of days.", "error");
    return false;
  }

  if (isNaN(daysValue) || Number(daysValue) <= 0) {
    showMessage("Days must be a valid number greater than 0.", "error");
    return false;
  }

  if (budgetValue === "") {
    showMessage("Please enter your budget.", "error");
    return false;
  }

  if (isNaN(budgetValue) || Number(budgetValue) <= 0) {
    showMessage("Budget must be a valid number greater than 0.", "error");
    return false;
  }

  if (selectedTripType === "") {
    showMessage("Please choose a trip type.", "error");
    return false;
  }

  return true;
}

function renderResult() {
  const selectedCountry = countryInput.value.trim();
  const selectedCity = cityInput.value.trim();
  const days = Number(daysInput.value.trim());
  const budget = Number(budgetInput.value.trim());

  const country = getCountryByName(selectedCountry);
  const extras = cityExtras[selectedCity] || getFallbackExtras(selectedCountry, selectedCity);
  const budgetState = getBudgetState(budget, extras.budgetLevel);

  const capital = country?.capital?.[0] || "Not available";
  const region = country?.region || "Not available";
  const timezone = country?.timezones?.[0] || "Not available";
  const flag = country?.flags?.png || "";
  const languageText = country?.languages ? Object.values(country.languages).join(", ") : "Not available";

  let currencyName = "Not available";
  let currencyCompare = "Comparison not available";

  if (country?.currencies) {
    const firstCurrency = Object.entries(country.currencies)[0];
    if (firstCurrency) {
      const [code, details] = firstCurrency;
      currencyName = `${details.name} (${code})`;
      currencyCompare = code === "SAR" ? "Your local currency" : `${code} compared with SAR`;
    }
  }

  resultContainer.innerHTML = `
    <div class="result-grid">
      <section class="destination-card">
        <div class="destination-head">
          <div class="destination-flag">
            ${flag ? `<img src="${flag}" alt="${selectedCountry} flag">` : "🏳️"}
          </div>
          <div>
            <h3>${selectedCity}, ${selectedCountry}</h3>
            <p class="country-note">${extras.description}</p>
          </div>
        </div>

        <div class="overview-grid">
          <div class="info-box">
            <span>Capital</span>
            <strong>${capital}</strong>
          </div>
          <div class="info-box">
            <span>Currency</span>
            <strong>${currencyName}</strong>
            <small>${currencyCompare}</small>
          </div>
          <div class="info-box">
            <span>Languages</span>
            <strong>${languageText}</strong>
          </div>
          <div class="info-box">
            <span>Timezone</span>
            <strong>${timezone}</strong>
          </div>
        </div>
      </section>

      <section class="feature-row">
        <div class="feature-box">
          <h4>Budget Status</h4>
          <p class="${budgetState.className}"><strong>${budgetState.label}</strong></p>
          <p>Your entered budget: ${budget} SAR</p>
        </div>

        <div class="feature-box">
          <h4>Travel Vibe</h4>
          <p><strong>${extras.vibe}</strong></p>
          <p>Trip type selected: ${selectedTripType}</p>
        </div>

        <div class="feature-box">
          <h4>Quick Advice</h4>
          <p><strong>${extras.advice}</strong></p>
          <p>Region: ${region}</p>
        </div>
      </section>

      <section class="section-columns">
        <div class="section-card">
          <h3>Top Attractions</h3>
          <div class="list-grid">
            ${createList(extras.attractions, "📍")}
          </div>
        </div>

        <div class="section-card">
          <h3>Restaurants</h3>
          <div class="list-grid">
            ${createList(extras.restaurants, "🍽️")}
          </div>
        </div>

        <div class="section-card">
          <h3>Hotels</h3>
          <div class="list-grid">
            ${createList(extras.hotels, "🏨")}
          </div>
        </div>
      </section>

      <section class="itinerary-wrapper">
        <h3>Suggested Itinerary (${days} Days)</h3>
        <div class="itinerary-grid">
          ${buildItinerary(selectedCity, days, selectedTripType)}
        </div>
      </section>
    </div>
  `;
}

planBtn.addEventListener("click", () => {
  if (!validateInputs()) return;
  hideMessage();
  renderResult();
  showMessage("Trip plan generated successfully!", "success");
});

surpriseBtn.addEventListener("click", async () => {
  if (!countriesData.length) {
    showMessage("Countries are still loading. Please wait.", "info");
    return;
  }

  const preferredCountries = ["France", "Japan", "Italy", "Saudi Arabia", "United Arab Emirates"];
  const tripTypes = ["Relax", "Adventure", "Family", "Business"];
  const randomCountry = preferredCountries[Math.floor(Math.random() * preferredCountries.length)];
  const randomTrip = tripTypes[Math.floor(Math.random() * tripTypes.length)];
  const randomDays = Math.floor(Math.random() * 8) + 1;
  const randomBudget = Math.floor(Math.random() * 9000) + 2000;

  countryInput.value = randomCountry;
  await loadCitiesByCountry(randomCountry);

  const preferredCities = {
    France: "Paris",
    Japan: "Tokyo",
    Italy: "Rome",
    "Saudi Arabia": "Riyadh",
    "United Arab Emirates": "Dubai"
  };

  const chosenCity =
    currentCities.includes(preferredCities[randomCountry])
      ? preferredCities[randomCountry]
      : currentCities[0] || "";

  cityInput.value = chosenCity;
  daysInput.value = randomDays;
  budgetInput.value = randomBudget;

  tripCards.forEach(card => {
    card.classList.remove("active");
    if (card.getAttribute("data-trip") === randomTrip) {
      card.classList.add("active");
    }
  });

  selectedTripType = randomTrip;

  if (chosenCity) {
    hideMessage();
    renderResult();
    showMessage("A surprise trip has been generated for you!", "info");
  } else {
    showMessage("Could not generate a surprise city for this country.", "error");
  }
});

clearBtn.addEventListener("click", () => {
  countryInput.value = "";
  cityInput.value = "";
  cityList.innerHTML = "";
  daysInput.value = "";
  budgetInput.value = "";
  selectedTripType = "";
  currentCities = [];

  tripCards.forEach(card => card.classList.remove("active"));

  resultContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">🌍</div>
      <h3>No trip planned yet</h3>
      <p>
        Select a country, then a city, set your budget, choose trip type and number of days, then click <strong>Plan My Trip</strong>.
      </p>
    </div>
  `;

  hideMessage();
});

loadCountries();