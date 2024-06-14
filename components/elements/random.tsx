const suggestion = [
    "20-year-old man comes to the emergency department because of shortness of breath and cough for two weeks' duration. Past medical history includes recurrent respiratory infections and cystic fibrosis. Physical examination reveals decreased lung sounds in the right lower lung field. A chest radiograph is obtained and reveals a right lower lobe consolidation. A sputum sample reveals oxidase-positive, gram-negative rods. Which of the following skin conditions is this patient at risk for developing?",
    "Polypharmacy is a major cause of morbidity and mortality in elderly patients. Warfarin is notorious for interactions with many commonly prescribed medications, including those used to treat lung disease (i.e., most of the quinolones and macrolides). A good rule of thumb is to assume warfarin will interact with a medication and check before prescribing it. Fluconazole, amiodarone, metronidazole, erythromycin, and trimethoprim/sulfamethoxazole are among the most common culprits of warfarin toxicity. Frequent monitoring of the PT/INR and appropriate dose adjustments should be done to avoid it.",
    "63 y/o male with 5 days of worsening cough productive of yellow sputum, SOB, and wheezing, as well as temp to 100.4 at home. Hx COPD on daily LABA and inhaled steroid, former smoker, not on home oxygen. Last visit with me 2 mo ago for routine follow up - stable at that time. Most recent PFTs showed FEV1 55% of predicted. He has been hospitalized 2 times in the past 2 years for COPD exacerbation. No known sick contacts, had a negative covid PCR test yesterday. Has been using albuterol rescue inhaler 3-4 times daily for the last 2 days, what should be the treatment option",
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
