declare module 'cld3' {
    export class CompactLanguageDetector {
        detect(text: string): { language: string; probability: number };
    }
}
