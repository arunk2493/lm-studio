export class EvaluationMetrics{
    evaluateAccuracy(expected: string[], actual: string): number {
        const matches = expected.filter(exp => actual.includes(exp)).length;
        return (matches / expected.length) * 100;
      }

    f1Score(precision: number, recall: number): number {
        if (precision + recall === 0) return 0;
        return 2 * (precision * recall) / (precision + recall);
    }


    precisionRecall(expected: string[], actual: string[]): { precision: number, recall: number } {
        const relevant = new Set(expected);
        const retrieved = new Set(actual);
        
        const truePositives = Array.from(retrieved).filter(item => relevant.has(item)).length;
        const falsePositives = Array.from(retrieved).length - truePositives;
        const falseNegatives = Array.from(relevant).length - truePositives;
        
        const precision = truePositives / (truePositives + falsePositives);
        const recall = truePositives / (truePositives + falseNegatives);
        
        return { precision, recall };
    }
    
}