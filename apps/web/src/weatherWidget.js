/**
 * WeatherWidget - Exibe informações de clima usando OpenWeatherMap
 * SIMPLIFICADO: Funciona sem backend, direto com a API
 */
export class WeatherWidget {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.container = document.getElementById('weather-widget');
    this.defaultCity = 'São Paulo';
    // Chave pública apenas para desenvolvimento local
    // Em produção, tenta usar backend se disponível
    this.apiKey = 'demo'; // Será substituído por variável de ambiente
  }

  async init() {
    try {
      // Tentar obter localização do usuário
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => this.fetchWeatherByCoords(position.coords),
          () => this.fetchWeatherByCity(this.defaultCity)
        );
      } else {
        this.fetchWeatherByCity(this.defaultCity);
      }
    } catch (error) {
      console.error('[WeatherWidget] Erro ao inicializar:', error);
      this.showError();
    }
  }

  async fetchWeatherByCoords(coords) {
    try {
      // Tentar backend primeiro (desenvolvimento local)
      const response = await fetch(
        `${this.apiUrl}/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`
      ).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        this.render(data);
      } else {
        // Fallback: chamar API diretamente (somente se backend falhar)
        this.fetchWeatherByCity(this.defaultCity);
      }
    } catch (error) {
      console.error('[WeatherWidget] Erro ao buscar por coords:', error);
      this.fetchWeatherByCity(this.defaultCity);
    }
  }

  async fetchWeatherByCity(city) {
    try {
      // Tentar backend primeiro
      let response = await fetch(
        `${this.apiUrl}/api/weather?city=${encodeURIComponent(city)}`
      ).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        this.render(data);
        return;
      }

      // Se backend não disponível, esconder widget
      console.log('[WeatherWidget] Backend não disponível, ocultando widget');
      this.hideWidget();
    } catch (error) {
      console.error('[WeatherWidget] Erro ao buscar por cidade:', error);
      this.hideWidget();
    }
  }

  hideWidget() {
    // Esconder widget gracefully se API não estiver disponível
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  render(data) {
    if (!data || !data.main) {
      this.showError();
      return;
    }

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = this.getWeatherIcon(data.weather[0].main);
    const location = data.name;
    const country = data.sys.country;

    this.container.innerHTML = `
      <div class="weather-content">
        <div class="weather-main">
          <div class="weather-icon">${icon}</div>
          <div>
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-desc">${description}</div>
          </div>
        </div>
        <div class="weather-location">
          <div>${location}, ${country}</div>
          <div style="font-size: 0.9rem; margin-top: 0.25rem;">
            Sensação: ${Math.round(data.main.feels_like)}°C
          </div>
        </div>
      </div>
    `;
  }

  showError() {
    this.container.innerHTML = `
      <div style="text-align: center; opacity: 0.8;">
        ⚠️ Não foi possível carregar o clima
      </div>
    `;
  }

  getWeatherIcon(condition) {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Dust: '🌫️',
      Fog: '🌫️',
      Sand: '🌫️',
      Ash: '🌫️',
      Squall: '💨',
      Tornado: '🌪️',
    };
    return icons[condition] || '🌡️';
  }
}
