export class ResponseEvaluator {
    private expectedKeywords: string[];

    constructor(expectedKeywords: string[]) {
        this.expectedKeywords = expectedKeywords;
    }

    // Function to evaluate the faithfulness of the response
    evaluate(response: string): boolean {
        const responseLower = response.toLowerCase();

        // Check if all expected keywords are present in the response
        return this.expectedKeywords.every(keyword => 
            responseLower.includes(keyword.toLowerCase())
        );
    }
}