const LanguageDetect = require('languagedetect');

export class DetectLanguage {
    detectLanguage(text: string): string {
        try {
            const detector = new LanguageDetect();
            const result = detector.detect(text); // Detect the top 1 language
            const language = result[0] ? result[0][0] : 'Unknown Language';
            return `Detected language: ${language}`;
        } catch (error) {
            console.error('Error detecting language:', error);
            return 'Language could not be identified';
        }
    }
}
