export class Accuracy{
    evaluateAccuracy(expected: string[], actual: string): number {
        const matches = expected.filter(exp => actual.includes(exp)).length;
        return (matches / expected.length) * 100;
      }
}