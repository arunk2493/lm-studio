
import { queryModel } from '../src/utils/modelInterfaceHelper';
import { Accuracy } from '../src/metrics/accuracy';
describe('LM Studio Model Tests', () => {

    const accuracy = new Accuracy();
    const requestBody = {
        "model": "gemma-2-2b-it-q4_k_m",
        "messages": [ 
          { "role": "user", "content": "Capital of India" }
        ], 
        "temperature": 0.7, 
        "max_tokens": -1,
        "stream": false
      };
  
    it('should return a valid response for a simple prompt', async () => {
      const response = await queryModel(requestBody);
      const a = JSON.stringify(response.choices[0].message.content)
      console.log(a)
      expect(a).toContain("New Delhi")
      const b = accuracy.evaluateAccuracy(["New Delhi"], a)
      console.log(b)
    });

    it('should return a valid response for a simple prompt with invalid response', async () => {
        const response = await queryModel(requestBody);
        const a = JSON.stringify(response.choices[0].message.content)
        console.log(a)
        expect(a).toContain("Paris")
      });

});

