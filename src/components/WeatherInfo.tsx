import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { WeatherData } from '../types';

interface Props {
  weatherData: WeatherData;
}

const WeatherInfo: React.FC<Props> = ({ weatherData }) => {
  return (
    <Box mt={4}>
      <Text>
        Location: {weatherData.location}
      </Text>
      <Text>
        Temperature: {weatherData.temperature}
      </Text>
      <Text>
        Forecast: {weatherData.forecast}
      </Text>
    </Box>
  );
};

export default WeatherInfo;
