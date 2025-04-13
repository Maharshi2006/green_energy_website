// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Navigation
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Modal handling
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    signupModal.classList.remove('hidden');
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
    if (e.target === signupModal) {
        signupModal.classList.add('hidden');
    }
});

// Requirements form handling
const requirementsForm = document.getElementById('requirementsForm');
if (requirementsForm) {
    requirementsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(requirementsForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show success message
        alert('Thank you for submitting your requirements! Our vendors will contact you soon.');
        requirementsForm.reset();
    });
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Chatbot state
let chatbotMode = null; // 'info' or 'requirements'
let requirementsData = {};
let currentQuestion = 0;

// Requirements questions sequence
const requirementsQuestions = [
    { key: 'name', question: 'Please enter your full name:' },
    { key: 'phone', question: 'Please enter your phone number:' },
    { key: 'email', question: 'Please enter your email address:' },
    { key: 'location', question: 'Please enter your location:' },
    { key: 'serviceType', question: 'What type of service are you looking for? (solar/wind/hybrid/maintenance/consultation)' },
    { key: 'propertyType', question: 'What is your property type? (residential/commercial/industrial/agricultural)' },
    { key: 'monthlyBill', question: 'What is your current monthly energy bill (in ₹)?' }
];

// Information responses
const infoResponses = {
    'solar': 'Solar energy is a renewable energy source that converts sunlight into electricity using photovoltaic cells. It\'s becoming increasingly affordable and efficient.',
    'wind': 'Wind energy is captured through wind turbines that convert kinetic energy into electrical power. It\'s one of the fastest-growing renewable energy sources.',
    'cost': 'The cost of renewable energy has decreased significantly in recent years. Solar panel installation typically ranges from ₹35,000 to ₹2,00,000 for residential systems in India.',
    'benefits': 'Green energy benefits include reduced carbon emissions, lower electricity bills, energy independence, and potential tax incentives.',
    'default': 'I\'m here to help you learn about green energy solutions. Feel free to ask about solar, wind, costs, or benefits!'
};

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
    if (!chatbotWindow.classList.contains('hidden') && !chatbotMode) {
        addBotMessage('Welcome! How can I help you today?');
        addBotMessage('1. Get information about green energy');
        addBotMessage('2. Submit your requirements');
        addBotMessage('Please type 1 or 2 to proceed.');
    }
});

// Handle chat input
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const userMessage = chatInput.value.trim();
        addUserMessage(userMessage);
        
        if (!chatbotMode) {
            // Initial mode selection
            handleModeSelection(userMessage);
        } else if (chatbotMode === 'info') {
            // Information mode
            const response = getInfoResponse(userMessage.toLowerCase());
            setTimeout(() => addBotMessage(response), 500);
        } else if (chatbotMode === 'requirements') {
            // Requirements mode
            handleRequirementsInput(userMessage);
        }
        
        chatInput.value = '';
    }
});

function handleModeSelection(input) {
    if (input === '1') {
        chatbotMode = 'info';
        addBotMessage('Great! What would you like to know about green energy? You can ask about solar, wind, costs, or benefits.');
    } else if (input === '2') {
        chatbotMode = 'requirements';
        addBotMessage('I\'ll help you submit your requirements. Let\'s get started!');
        askNextRequirement();
    } else {
        addBotMessage('Please type 1 for information or 2 for requirements.');
    }
}

function handleRequirementsInput(input) {
    requirementsData[requirementsQuestions[currentQuestion].key] = input;
    currentQuestion++;

    if (currentQuestion < requirementsQuestions.length) {
        askNextRequirement();
    } else {
        // Requirements gathering complete
        addBotMessage('Thank you for providing your requirements! Our team will contact you soon.');
        addBotMessage('Would you like to get information about green energy while you wait? (Type yes/no)');
        currentQuestion = 0;
        chatbotMode = 'info';
        
        // Save requirements data
        console.log('Requirements collected:', requirementsData);
        requirementsData = {};
    }
}

function askNextRequirement() {
    addBotMessage(requirementsQuestions[currentQuestion].question);
}

function getInfoResponse(input) {
    for (const [keyword, response] of Object.entries(infoResponses)) {
        if (input.includes(keyword)) {
            return response;
        }
    }
    return infoResponses.default;
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Vendors data
const vendors = [
    {
        name: 'Tata Power Solar',
        description: 'Leading solar manufacturer and EPC solutions provider',
        rating: 4.8,
        location: 'Mumbai, Maharashtra',
        contact: '+91-22-6665-8282',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Suzlon Energy',
        description: 'Pioneer in wind energy solutions and turbine manufacturing',
        rating: 4.6,
        location: 'Pune, Maharashtra',
        contact: '+91-20-6702-2000',
        image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'ReNew Power',
        description: 'India\'s leading renewable energy company',
        rating: 4.9,
        location: 'Gurugram, Haryana',
        contact: '+91-124-489-6670',
        image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Adani Green Energy',
        description: 'Major developer of solar and wind projects',
        rating: 4.7,
        location: 'Ahmedabad, Gujarat',
        contact: '+91-79-2555-5555',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'NTPC Renewable Energy',
        description: 'Government-owned renewable energy developer',
        rating: 4.5,
        location: 'New Delhi, Delhi',
        contact: '+91-11-2436-7072',
        image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Azure Power',
        description: 'Leading independent solar power producer',
        rating: 4.6,
        location: 'New Delhi, Delhi',
        contact: '+91-11-4940-9800',
        image: 'https://images.unsplash.com/photo-1542336291-d85a3648dae8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

// Populate vendors section
const vendorsContainer = document.querySelector('#vendors .grid');
vendors.forEach(vendor => {
    const vendorCard = document.createElement('div');
    vendorCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
    vendorCard.setAttribute('data-aos', 'fade-up');
    
    vendorCard.innerHTML = `
        <img src="${vendor.image}" alt="${vendor.name}" class="w-full h-48 object-cover">
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">${vendor.name}</h3>
            <p class="text-gray-600 mb-4">${vendor.description}</p>
            <div class="flex items-center mb-3">
                <div class="flex text-yellow-400">
                    ${'★'.repeat(Math.floor(vendor.rating))}${vendor.rating % 1 ? '½' : ''}
                </div>
                <span class="ml-2 text-gray-600">${vendor.rating}/5</span>
            </div>
            <div class="text-gray-600">
                <p><i class="fas fa-map-marker-alt mr-2"></i>${vendor.location}</p>
                <p><i class="fas fa-phone mr-2"></i>${vendor.contact}</p>
            </div>
        </div>
    `;
    
    vendorsContainer.appendChild(vendorCard);
});