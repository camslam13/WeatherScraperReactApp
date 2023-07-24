from flask import Flask, request, jsonify, make_response
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def scrape_weather_data(latitude, longitude):
    try:
        url = f'https://forecast.weather.gov/MapClick.php?lat={latitude}&lon={longitude}'
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx and 5xx status codes
        soup = BeautifulSoup(response.content, 'html.parser')

        temperature = soup.select_one('.myforecast-current-lrg').get_text()
        forecast = soup.select_one('.myforecast-current').get_text()

        return temperature, forecast
    except requests.exceptions.RequestException as e:
        # Handle request-related errors
        return None, str(e)
    except Exception as e:
        # Handle other unexpected errors
        return None, "An error occurred while scraping weather data."

@app.route("/api/WeatherInfo", methods=["GET"])
def get_weather_data():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    if not latitude or not longitude:
        return make_response(jsonify({'error': 'Latitude and longitude parameters are missing.'}), 400)

    # Scrape the weather data
    temperature, forecast = scrape_weather_data(latitude, longitude)

    if temperature is None or forecast is None:
        return make_response(jsonify({'error': 'Failed to retrieve weather data.'}), 500)

    # Create a dictionary to hold the weather data
    weather_data = {
        "latitude": latitude,
        "longitude": longitude,
        "temperature": temperature,
        "forecast": forecast
    }

    # Create a response and add CORS headers
    response = jsonify(weather_data)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

if __name__ == "__main__":
    app.run()


