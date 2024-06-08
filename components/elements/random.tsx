const suggestion = [
    "What are the symptoms of a stroke",
    'Treatment for cancer',
    "What is advised for a patient with vitiligo",
    "How do I treat ulcers?",
    "What to do in pregnancy",
    "Treatment for simple cold",
    "Treatment of Headache",
    "Treatment for pain in eyes",
];

export function getRandomElements(count: any) {
    let result = [];
    let indices = new Set();

    while (indices.size < count) {
        let randomIndex = Math.floor(Math.random() * suggestion.length);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            result.push(suggestion[randomIndex]);
        }
    }
    return result;
}
