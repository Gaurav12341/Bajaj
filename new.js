const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

// GET endpoint 
app.get('/api/bfhl', (req, res) => {
    res.json({ operation_code: '1' });
});

// POST endpoint
app.post('/challenge/bfhl', (req, res) => {
    try {
        const data = req.body;
        const status = 'Success';
        const userId = data.user_id || null;
        const collegeEmail = data.college_email || null;
        const collegeRollNumber = data.college_roll_number || null;
        const numbers = data.numbers || [];
        const alphabets = data.alphabets || [];

        let highestAlphabet = '0';
        for(let i=0;i<alphabets.length;i++){
            if(alphabets[i]>highestAlphabet)
                highestAlphabet=alphabets[i];
        }

        const responseData = {
            // maindata: data,
            status,
            User_Id: userId,
            College_email: collegeEmail,
            College_Roll_Number: collegeRollNumber,
            numbers,
            alphabets,
            Highest_alphabet: highestAlphabet,
        };

        res.json(responseData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
