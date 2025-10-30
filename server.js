const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: "*", // Sabhi websites se allow karo
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// ✅ DUMMY DATA - Real jaisa dikhe par fake
const dummyLawyers = [
    {
        _id: "65a1b2c3d4e5f67890123451",
        name: "Advocate Raj Kumar",
        email: "raj@demo.com",
        phone: "9876543210",
        experience: 5,
        fees: 1500,
        specializations: ["Family Law", "Property Disputes"],
        district: "Jaipur",
        rating: 4.5,
        bio: "Experienced in family and property matters.",
        profilePhoto: ""
    },
    {
        _id: "65a1b2c3d4e5f67890123452", 
        name: "Advocate Priya Sharma",
        email: "priya@demo.com",
        phone: "9876543211",
        experience: 8,
        fees: 2000,
        specializations: ["Criminal Law", "Civil Cases"],
        district: "Udaipur",
        rating: 4.7,
        bio: "Specialized in criminal and civil litigation.",
        profilePhoto: ""
    },
    {
        _id: "65a1b2c3d4e5f67890123453",
        name: "Advocate Amit Singh",
        email: "amit@demo.com",
        phone: "9876543212",
        experience: 12,
        fees: 3000,
        specializations: ["Corporate Law", "Contracts"],
        district: "Jodhpur",
        rating: 4.9,
        bio: "Corporate lawyer with 12+ years experience.",
        profilePhoto: ""
    }
];

// ✅ HEALTH CHECK
app.get('/', (req, res) => {
    res.json({ 
        message: '🚀 RajLegal Demo Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// ✅ GET ALL LAWYERS
app.get('/api/lawyers', (req, res) => {
    console.log('📊 Sending demo lawyers:', dummyLawyers.length);
    res.json({ 
        success: true, 
        lawyers: dummyLawyers 
    });
});

// ✅ GET SINGLE LAWYER
app.get('/api/lawyers/:id', (req, res) => {
    const lawyerId = req.params.id;
    console.log('🔍 Finding lawyer:', lawyerId);
    
    const lawyer = dummyLawyers.find(l => l._id === lawyerId);
    if (lawyer) {
        res.json({ success: true, lawyer });
    } else {
        res.status(404).json({ success: false, error: "Lawyer not found" });
    }
});

// ✅ CREATE BOOKING (FAKE - Database mein save nahi hoga)
app.post('/api/bookings', (req, res) => {
    const bookingData = req.body;
    console.log('📝 Demo booking received:', bookingData);
    
    // Fake booking response
    const fakeBooking = {
        _id: Date.now().toString(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date(),
        bookingId: 'DEMO-' + Date.now()
    };
    
    console.log('✅ Demo booking created:', fakeBooking._id);
    res.json({ 
        success: true, 
        message: "Demo booking created successfully!",
        booking: fakeBooking
    });
});

// ✅ START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Demo Backend running on http://localhost:${PORT}`);
    console.log(`📊 Demo Lawyers: ${dummyLawyers.length}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/`);

});
