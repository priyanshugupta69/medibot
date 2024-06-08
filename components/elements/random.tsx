const suggestion = [
    "Symptoms of a stroke",
    'What cures insomnia quickly?',
    "how to deal with vitiligo",
    "How do I treat nausea?",
    "How do I treat migraines?",
    "How do I treat arthritis?",
    "What can treat eczema?",
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
