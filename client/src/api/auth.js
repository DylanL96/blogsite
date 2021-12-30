import axios from 'axios';

//HTTP Post Requests
export const signup = async (data) => {
  const config = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

  const response = await axios.post('/signup', data, config);
  // console.log(response)

  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post('/signin', data, config);

  return response;
}
