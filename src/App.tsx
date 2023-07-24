import { ChakraProvider, Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import LocationInput from './components/LocationInput';
import WeatherInfo from './components/WeatherInfo'; // Assuming you have a WeatherInfo component to display the weather

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string>('');

  const handleLocationSubmit = async (latitude: number, longitude: number) => {
    try {
      setError('');
      const response = await axios.get(`http://localhost:5000/api/WeatherInfo?latitude=${latitude}&longitude=${longitude}`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather information.');
      
    }
  };

  return (
    <ChakraProvider>
      <Box bg="gray.100" minHeight="100vh" py={8}>
        <Box maxW="md" mx="auto" p={4} bg="white" boxShadow="md" borderRadius="lg">
          <Heading as="h1" size="lg" textAlign="center">
            Weather App
          </Heading>
          <LocationInput onLocationSubmit={handleLocationSubmit} />
          {error && <Text color="red.500">{error}</Text>}
          {weatherData && <WeatherInfo weatherData={weatherData} />}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;



