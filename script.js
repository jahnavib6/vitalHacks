// Disorders and their symptoms data
const disordersData = {
    'Arthritis': ['joint_stiffness', 'joint_swelling', 'joint_pain', 'oesteoarthritis', 'painful_walking', 'stiff_neck', 'fatigue', 'malaise', 'flare', 'deformity', 'bony_outgrowth_in_fingers', 'bony_outgrowth_in_toes', 'muscle_weakness'],
    'Gout': ['joint_stiffness', 'joint_swelling', 'redness_in_big_toe', 'pain_in_ankles', 'pain_in_knees'],
    'Myopathy': ['muscle_weakness', 'muscle_cramps', 'muscle_stiffness', 'muscle_spasms', 'fatigue_with_exertion', 'lack_of_energy'],
    'Polymyositis': ['muscle_weakness', 'difficulty_swallowing', 'muscle_pain', 'muscle_tenderness', 'fatigue'],
    'Dermatomyositis': ['muscle_weakness', 'swelling_around_eye', 'rash', 'fatigue', 'weight_loss'],
    'Rhabdomyolysis': ['muscle_pain', 'muscle_weakness', 'dark_urine', 'nausea', 'irregular_heartbeat'],
    'Myasthenia Gravis': ['muscle_weakness', 'drooping_eyelids', 'difficulty_swallowing', 'breathlessness', 'weakness'],
    'Toxic Myopathy': ['muscle_pain', 'muscle_tenderness', 'weakness', 'fatigue', 'dark_urine'],
    'Fibromyalgia': ['muscle_pain', 'muscle_tenderness', 'fatigue', 'headache', 'depression', 'anxiety'],
    'Compartment Syndrome': ['severe_pain_in_muscle_compartment', 'swelling', 'tightness', 'numbness_in_specific_compartment', 'decreased_movement', 'loss_of_circulation'],
    'Tendinitis': ['inflammation_of_tendons', 'pain_and_stiffness_during_movement', 'swelling_in_shoulders', 'swelling_in_elbows', 'swelling_in_knees', 'swelling_in_heels'],
    'Bursitis': ['inflammation_of_bursae', 'swelling', 'restricted_movement', 'joint_pain', 'joint_swelling', 'muscle_tenderness'],
    'Chronic Fatigue Syndrome': ['muscle_fatigue', 'difficulty_concentrating', 'joint_pain', 'muscle_pain', 'extreme_exhaustion'],
    'Pyomyocitis': ['fever', 'chills', 'muscle_pain', 'swelling', 'redness'],
    'Lactic Acidosis': ['muscle_pain', 'muscle_cramps', 'rapid_breathing', 'nausea', 'weakness'],
    'Lupus': ['butterfly_shaped_rash_on_face', 'red_bumps', 'sensitivity_to_sunlight', 'hair_loss', 'joint_pain', 'joint_stiffness', 'joint_swelling', 'fatigue'],
    "Sjogren's Syndrome": ['dry_eyes', 'dry_mouth', 'dry_skin', 'fatigue', 'joint_pain', 'joint_stiffness', 'muscle_weakness', 'difficulty_swallowing', 'difficulty_talking', 'difficulty_concentrating', 'taste_loss', 'tooth_decay'],
    'Neuropathic Arthropathy': ['joint_pain', 'joint_swelling', 'joint_redness', 'deformity_of_joints', 'weight_fluctuation', 'loss_of_sensation', 'diabetes'],
    'Ehlers-Danlos': ['loose_joints', 'stretchy_skin', 'fragile_skin', 'skin_bruises', 'chronic_pain', 'fatigue', 'cognitive_impairment', 'headache', 'gastrointestinal_issues'],
    'Osteoporosis': ['back_pain', 'loss_of_height_over_time', 'stooped_posture', 'brittle_or_fragile_bones', 'weak_grip_strength', 'increased_frequency_of_fractures'],
    'Osteoarthritis': ['joint_pain', 'joint_stiffness', 'joint_tenderness', 'loss_of_flexibility', 'bone_spurs', 'joint_swelling', 'joints_pop_or_crackle_often'],
    'Rickets': ['delayed_growth_and_motor_skills', 'spine_pain', 'pelvis_pain', 'leg_pain', 'muscle_weakness', 'bowed_legs', 'thickened_wrists_and_ankles', 'breastbone_projection'],
    'Osteosarcoma': ['bone_pain', 'swelling_and_tenderness_near_affected_area', 'weakened_bones', 'broken_bones', 'exhaustion', 'severe_or_extreme_weight_loss_over_a_short_period_of_time']
};

// Get all unique symptoms
function getAllSymptoms() {
    const allSymptoms = new Set();
    Object.values(disordersData).forEach(symptoms => {
        symptoms.forEach(symptom => allSymptoms.add(symptom));
    });
    return Array.from(allSymptoms);
}

// Format symptom text for display
function formatSymptomText(symptom) {
    return symptom.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Create question HTML
function createQuestionHTML(symptom, index, total) {
    return `
        <div class="question-card">
            <h4 class="mb-3">Question ${index + 1} of ${total}</h4>
            <p class="mb-3">Do you experience ${formatSymptomText(symptom)}?</p>
            <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btn-option" data-symptom="${symptom}" data-value="yes">Yes</button>
                <button class="btn btn-outline-secondary btn-option" data-symptom="${symptom}" data-value="no">No</button>
            </div>
        </div>
    `;
}

// Update progress bar
function updateProgress(current, total) {
    const percentage = (current / total) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

// Analyze symptoms and return possible disorders
function analyzeSymptoms(presentSymptoms) {
    const results = {};
    
    Object.entries(disordersData).forEach(([disorder, symptoms]) => {
        if (!symptoms.length) return;
        
        const matchingSymptoms = presentSymptoms.filter(symptom => 
            symptoms.includes(symptom)
        ).length;
        
        const matchPercentage = (matchingSymptoms / symptoms.length) * 100;
        
        if (matchPercentage > 0) {
            results[disorder] = matchPercentage;
        }
    });
    
    return Object.entries(results)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
}

// Display results
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    Object.entries(results).forEach(([disorder, percentage]) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">${disorder}</h5>
                <span class="result-percentage">${percentage.toFixed(1)}% match</span>
            </div>
        `;
        resultsContainer.appendChild(resultCard);
    });
}

// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const questionSection = document.getElementById('question-section');
    const resultsSection = document.getElementById('results-section');
    const questionContainer = document.getElementById('question-container');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    let currentQuestion = 0;
    let symptoms = [];
    let presentSymptoms = [];
    
    // Start diagnosis
    startBtn.addEventListener('click', () => {
        welcomeSection.classList.add('d-none');
        questionSection.classList.remove('d-none');
        symptoms = getAllSymptoms();
        showQuestion();
    });
    
    // Restart diagnosis
    restartBtn.addEventListener('click', () => {
        resultsSection.classList.add('d-none');
        welcomeSection.classList.remove('d-none');
        currentQuestion = 0;
        presentSymptoms = [];
        updateProgress(0, symptoms.length);
    });
    
    // Show current question
    function showQuestion() {
        if (currentQuestion >= symptoms.length) {
            showResults();
            return;
        }
        
        questionContainer.innerHTML = createQuestionHTML(
            symptoms[currentQuestion],
            currentQuestion,
            symptoms.length
        );
        
        updateProgress(currentQuestion, symptoms.length);
        
        // Add event listeners to answer buttons
        document.querySelectorAll('.btn-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const symptom = e.target.dataset.symptom;
                const value = e.target.dataset.value;
                
                if (value === 'yes') {
                    presentSymptoms.push(symptom);
                }
                
                currentQuestion++;
                showQuestion();
            });
        });
    }
    
    // Show results
    function showResults() {
        questionSection.classList.add('d-none');
        resultsSection.classList.remove('d-none');
        
        const results = analyzeSymptoms(presentSymptoms);
        displayResults(results);
    }
}); 