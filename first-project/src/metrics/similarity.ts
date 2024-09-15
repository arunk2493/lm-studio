import similarity from 'string-similarity';


export class ResponseSimilarity{

    evaluateRelevancy(generatedAnswer: string, expectedAnswer: string): string {
        // Calculate similarity score between the generated answer and expected answer
        const similarityScore = similarity.compareTwoStrings(generatedAnswer, expectedAnswer);
    
        // Define a threshold for relevancy
        const relevancyThreshold = 0.7; // This means 70% similarity is considered relevant
    
        console.log(`Generated Answer: ${generatedAnswer}`);
        console.log(`Expected Answer: ${expectedAnswer}`);
        console.log(`Similarity Score: ${similarityScore}`);
    
        if (similarityScore >= relevancyThreshold) {
            return 'Relevant';
        } else {
            return 'Not Relevant';
        }
    }
}