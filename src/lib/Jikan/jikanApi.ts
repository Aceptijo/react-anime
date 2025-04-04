import axios from 'axios';

export const searchAnime = async (title: string) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime', {
      params: { q: title, limit: 1 },
    });
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching anime from Jikan API:', error);
    return null;
  }
};
