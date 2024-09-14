import axios from 'axios';

// Define the function to query the model
export async function queryModel(requestBody: any): Promise<any> {
  try {
    const response = await axios.post('http://localhost:1234/v1/chat/completions',requestBody, {
        headers: {
          'Content-Type': 'application/json', // Ensure the server expects JSON
        },
      });
    return response.data;
  } catch (error) {
    // Simplified error handling
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error:', message);
    throw new Error('Error querying the model: ' + message);
  }
}