import express from 'express';

const router = express.Router();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * GET /api/weather?city=SaoPaulo
 * GET /api/weather?lat=-23.5505&lon=-46.6333
 */
router.get('/', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        error: 'Parâmetros inválidos. Use ?city=NomeDaCidade ou ?lat=X&lon=Y',
      });
    }

    // Construir URL da API
    let url = `${OPENWEATHER_BASE_URL}?appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

    if (city) {
      url += `&q=${encodeURIComponent(city)}`;
    } else {
      url += `&lat=${lat}&lon=${lon}`;
    }

    // Fazer request para OpenWeatherMap
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        error: error.message || 'Falha ao buscar dados do clima',
      });
    }

    const data = await response.json();

    // Retornar dados formatados
    res.json({
      name: data.name,
      sys: {
        country: data.sys.country,
      },
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      },
      weather: data.weather.map((w) => ({
        main: w.main,
        description: w.description,
        icon: w.icon,
      })),
    });
  } catch (error) {
    console.error('[Weather] Erro:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

export default router;
