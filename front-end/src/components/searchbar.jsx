import { useEffect, useMemo, useState } from 'react';

const CITY_SUGGESTIONS = [
  'Kolkata',
  'Mumbai',
  'Delhi,India',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'London',
  'Tokyo',
  'Singapore',
  'Dubai',
  'New York',
  'Paris',
  'Sydney',
  'Toronto',
  'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
];

const SearchBar = ({ onSearch, currentCity = '' }) => {
  const [city, setCity] = useState(currentCity);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setCity(currentCity || '');
  }, [currentCity]);

  const suggestions = useMemo(() => {
    const query = city.trim().toLowerCase();
    if (!query) return [];

    return CITY_SUGGESTIONS.filter((place) => place.toLowerCase().startsWith(query)).slice(0, 6);
  }, [city]);

  const showSuggestions = isFocused && city.trim().length > 0 && suggestions.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setIsFocused(false);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-field-wrap">
        <div className="search-input-row">
          <button type="submit" className="search-button" aria-label="Search city">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
              <path d="M16.2 16.2L21 21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input
            type="text"
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
            placeholder="Search a city"
            autoComplete="off"
          />
        </div>
        {showSuggestions && (
          <div className="search-suggestions" role="listbox" aria-label="City suggestions">
            {suggestions.map((place) => (
              <button
                key={place}
                type="button"
                className="search-suggestion"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setCity(place);
                  onSearch(place);
                  setIsFocused(false);
                }}
              >
                {place}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
