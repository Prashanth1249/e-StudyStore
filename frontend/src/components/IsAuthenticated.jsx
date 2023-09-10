import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:9002/checkAuthentication');
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    checkUserAuthentication();

    const interval = setInterval(() => {
      checkUserAuthentication();
    }, 5000); // Check authentication every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
        djfkldafjdkjfdjfdjfjdjdajjdfjjdfjdjfjdfjdj
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>User not authenticated.</p>
      )}
    </div>
  );
};

export default WeatherComponent;
