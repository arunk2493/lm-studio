
import { queryModel } from '../src/utils/modelInterfaceHelper';
import { EvaluationMetrics } from '../src/metrics/accuracy';
import { ResponseSimilarity } from '../src/metrics/similarity'
import { DetectLanguage } from '../src/metrics/languageDetect'
import { ResponseEvaluator } from '../src/metrics/faithfulness'
import  modelData  from '../src/utils/model.json'


describe('LM Studio Model Tests', () => {
    const accuracy = new EvaluationMetrics();
    const similarity = new ResponseSimilarity();
    const detect_Language = new DetectLanguage();

    const requestBody = {
        "model": "gemma-2-2b-it-q4_k_m",
        "messages": [ 
          { "role": "user", "content": "Capital of India" }
        ], 
        "temperature": 0.7, 
        "max_tokens": -1,
        "stream": false
      };

      const requestBody_1 = {
        "model": "q4_0-gguf-mamba-gpt-3b_v4",
        "messages": [ 
          { "role": "user", "content": "Kia sonet HTK variant details" }
        ], 
        "temperature": 0.7, 
        "max_tokens": -1,
        "stream": false
      };

      const requestBody_lang = {
        "model": "gemma-2-2b-it-q4_k_m",
        "messages": [ 
          { "role": "user", "content": "Quelle est la capitale de la France ?" }
        ], 
        "temperature": 0.7, 
        "max_tokens": -1,
        "stream": false
      };
  
    xit('should return a valid response for a simple prompt', async () => {
      const response = await queryModel(requestBody);
      const a = JSON.stringify(response.choices[0].message.content)
      console.log(a)
      expect(a).toContain("New Delhi")
      const b = accuracy.evaluateAccuracy(["New Delhi"], a)
      console.log(b)
    });

    xit('Verify the string similarity of the model response', async () => {
        const response = await queryModel(requestBody);
        const a = JSON.stringify(response.choices[0].message.content)
        const b = "Capital of India is New Delhi";
        const c = similarity.evaluateRelevancy(a,b)
        console.log(c)
      });

      xit('Verify the Language Detect of response', async () => {
        const response = await queryModel(requestBody_lang);
        const a = JSON.stringify(response.choices[0].message.content)
        console.log(a)
        expect(a).toContain("Paris")
        const b = detect_Language.detectLanguage(a)
        console.log(b)
    });
    
    xit('Verify the response faithfulness', async () => {
        const response = await queryModel(requestBody_1);
        const a = JSON.stringify(response.choices[0].message.content)
        const expectedKeywords = ['Kia Sonet','SUV','February 2021']
        const faithfulness = new ResponseEvaluator(expectedKeywords)
        const b = faithfulness.evaluate(a)
        console.log(a)
        console.log(b)  
    });

    it('Verify the Language with dynamic request', async () => {
        modelData.model = "gemma-2-2b-it-q4_k_m"
        modelData.messages[0].role = "user"
        modelData.messages[0].content = "What is the capital of India?"
        console.log(modelData)
        const response = await queryModel(modelData);
        const a = JSON.stringify(response.choices[0].message.content)
        console.log(a)
        expect(a).toContain("New Delhi")
        const b = detect_Language.detectLanguage(a)
        console.log(b) 
    });
});

