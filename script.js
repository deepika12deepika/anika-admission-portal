function portalData() {
    return {
        // --- Core Page State ---
        page: 'home',
        
        // --- API URL ---
        apiUrl: 'http://localhost:5001/api',

        // --- Initialization ---
        async init() {
            try {
                const response = await fetch(`${this.apiUrl}/data`);
                const data = await response.json();
                this.notices = data.notices || [];
                this.registrations = data.registrations || [];
                this.payments = data.payments || [];
                this.departments = data.departments || [];
                this.applications = data.applications || [];
                this.contacts = data.contacts || [];
                this.users = data.users || [];
            } catch (err) {
                console.error("Failed to load data from server:", err);
            }
        },

        async syncData() {
            try {
                await fetch(`${this.apiUrl}/sync`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        notices: this.notices,
                        registrations: this.registrations,
                        payments: this.payments,
                        departments: this.departments,
                        applications: this.applications,
                        contacts: this.contacts,
                        users: this.users
                    })
                });
            } catch (err) {
                console.error("Failed to sync data to server:", err);
            }
        },
        
        // --- Academic Vault & Modal Logic (Merged) ---
        showVaultModal: false,
        selectedResource: null,
        academicResources: [
            {
                title: "Neural Networks 101",
                author: "Dr. Alan Turing",
                icon: "fas fa-brain",
                status: "AVAILABLE",
                available: true
            },
            {
                title: "Design Systems 2.0",
                author: "Sarah Drasner",
                icon: "fas fa-palette",
                status: "WAITLISTED",
                available: false
            },
            {
                title: "Modern Algorithms",
                author: "C. Leiserson",
                icon: "fas fa-code",
                status: "AVAILABLE",
                available: true
            },
            {
                title: "Business Ethics",
                author: "Max Weber",
                icon: "fas fa-briefcase",
                status: "AVAILABLE",
                available: true
            },
            {
                title: "Quantum Computing",
                author: "Dr. Richard Feynman",
                icon: "fas fa-atom",
                status: "AVAILABLE",
                available: true
            },
            {
                title: "Financial Literacy",
                author: "Warren Buffett",
                icon: "fas fa-chart-pie",
                status: "WAITLISTED",
                available: false
            }
        ],
        
        // --- Payment Portal Logic ---
        payStep: 'form', 
        payData: { id: '', amount: '' }, 
        
        // --- Application & Admission Logic ---
        searchID: '',
        searchResult: null,
        formData: { first: '', last: '', email: '', program: 'B.Tech Computer Science' },
        
        // --- Event Registration Data ---
        showRegModal: false,
        regStep: 1,
        selectedEvent: '',
        regName: '',

        // --- Curriculum Modal Data ---
        showCurriculumModal: false,
        selectedDept: null,

        // --- Success Modal State ---
        showSuccessModal: false,

        // --- Login & Role Logic ---
        userRole: null, 
        loginType: 'admin', 
        loginData: { username: '', password: '' },
        isRegistering: false,
        registerData: { username: '', password: '', confirmPassword: '' },
        adminTab: 'applications', 

        // --- State Arrays ---
        notices: [],
        registrations: [],
        payments: [],
        departments: [],
        applications: [],
        contacts: [],
        users: [],

        newNotice: { title: '', content: '', tag: 'Notice' },

        // --- Dashboard UI Data ---
        skills: [
            { name: 'Data Structures', percent: 85 },
            { name: 'UI/UX Design', percent: 92 },
            { name: 'Full Stack Dev', percent: 78 },
            { name: 'Cloud Computing', percent: 65 }
        ],

        upcomingEvents: [
            { month: 'MAR', date: '15', title: 'Tech-Anika Hackathon', location: 'Lab 04 • 09:00 AM' },
            { month: 'APR', date: '02', title: "Cultural Fest 'AURA'", location: 'Auditorium • 05:00 PM' },
            { month: 'APR', date: '20', title: 'Sports Meet 2026', location: 'Main Ground • 08:00 AM' }
        ],

        badges: [
            { name: 'Hackathon Winner', icon: 'fas fa-trophy', color: 'bg-amber-400' },
            { name: 'Fast Learner', icon: 'fas fa-bolt', color: 'bg-blue-500' },
            { name: 'Full Attendance', icon: 'fas fa-calendar-check', color: 'bg-emerald-500' },
            { name: 'Tech Master', icon: 'fas fa-cpu', color: 'bg-purple-500' }
        ],

        showCalendarModal: false,
        academicCalendar: [
            { month: 'APR', day: '12', title: 'Mid-Term Exams Begin', detail: 'Complete curriculum review required.' },
            { month: 'MAY', day: '05', title: 'Project Proposal Deadline', detail: 'Submit final drafts for review.' }
        ],

        fullCalendarData: [
            { date: 'April 12, 2026', event: 'Mid-Term Examinations Begin', type: 'Exam' },
            { date: 'April 20, 2026', event: 'Annual Sports Meet', type: 'Academic' },
            { date: 'May 01, 2026', event: 'Labor Day (Holiday)', type: 'Holiday' },
            { date: 'May 05, 2026', event: 'Final Project Submission', type: 'Exam' },
            { date: 'June 15, 2026', event: 'Summer Vacation Starts', type: 'Holiday' },
            { date: 'July 01, 2026', event: 'New Semester Registration', type: 'Academic' }
        ],

        // --- Contact Helper ---
        async sendContactMessage() {
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const msg = document.getElementById('contactMessage').value.trim();

            if (name === "" || email === "" || msg === "") {
                alert("Please fill in all details before sending.");
                return;
            }

            const contactMsg = {
                id: Date.now(),
                name: name,
                email: email,
                message: msg,
                date: new Date().toISOString()
            };
            
            this.contacts.push(contactMsg);
            await this.syncData();
            
            this.showSuccessModal = true;

            document.getElementById('contactName').value = "";
            document.getElementById('contactEmail').value = "";
            document.getElementById('contactMessage').value = "";
        },

        // --- Functions ---
        openRegistration() {
            this.showRegModal = true;
            this.regStep = 1;
        },
        nextRegStep(eventTitle) {
            this.selectedEvent = eventTitle;
            this.regStep = 2;
        },
        async completeRegistration() {
            if(!this.regName) {
                alert("Please enter your name");
                return;
            }
            this.registrations.push({
                id: Date.now(),
                name: this.regName,
                event: this.selectedEvent,
                date: new Date().toISOString().split('T')[0]
            });
            await this.syncData();
            this.regStep = 3;
            this.regName = '';
        },

        openCurriculum(dept) {
            this.selectedDept = dept;
            this.showCurriculumModal = true;
        },
        closeCurriculum() {
            this.showCurriculumModal = false;
            this.selectedDept = null;
        },
        
        startPaymentFlow() {
            if(!this.payData.id || !this.payData.amount) {
                alert("Please enter both ID and Amount");
                return;
            }
            this.payStep = 'scanner'; 
            setTimeout(async () => {
                this.payments.push({
                    id: 'TXN' + Math.floor(Math.random() * 100000),
                    student: 'Student (' + this.payData.id + ')',
                    amount: parseInt(this.payData.amount),
                    type: 'Online Payment',
                    status: 'PAID'
                });
                await this.syncData();
                this.payStep = 'success'; 
            }, 3000);
        },

        async submitForm() {
            const newId = 'SIT-' + Math.floor(1000 + Math.random() * 9000);
            this.applications.push({ id: newId, ...this.formData, status: 'Pending' });
            await this.syncData();
            alert('SUCCESS! ID: ' + newId);
            this.searchID = newId;
            this.page = 'status';
            this.checkStatus();
        },

        checkStatus() {
            this.searchResult = this.applications.find(a => a.id === this.searchID.toUpperCase());
            if (!this.searchResult) alert('Invalid ID.');
        },

        handleLogin() {
            const user = this.users.find(u => u.username === this.loginData.username && u.password === this.loginData.password && u.role === this.loginType);
            if (user) {
                this.userRole = user.role;
                this.page = user.role;
                this.loginData = { username: '', password: '' };
            } else {
                alert("Invalid credentials for " + this.loginType);
            }
        },

        async handleRegister() {
            if (!this.registerData.username || !this.registerData.password) {
                alert("Fill all fields");
                return;
            }
            this.users.push({
                username: this.registerData.username,
                password: this.registerData.password,
                role: this.loginType
            });
            await this.syncData();
            alert("Registration successful!");
            this.isRegistering = false;
        },

        logout() {
            this.userRole = null;
            this.page = 'home';
        },

        async postNotice() {
            if(!this.newNotice.title || !this.newNotice.content) return;
            this.notices.unshift({
                id: Date.now(),
                ...this.newNotice,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            });
            await this.syncData();
            this.newNotice = { title: '', content: '', tag: 'Notice' };
            alert("Notice posted successfully!");
        },

        downloadDocument(name) {
            alert("GENERATING DOCUMENT: " + name);
        },
        viewCalendar() {
            alert("OPENING ACADEMIC CALENDAR...");
        },
        openInternalPortal(portalName) {
            alert("REDIRECTING TO INTERNAL: " + portalName.toUpperCase());
        },
        applyForLeave() {
            alert("LEAVE APPLICATION PORTAL OPENED.");
        }
    }
}

// Alpine Initialize
document.addEventListener('alpine:init', () => {
    Alpine.data('portalData', portalData);
});