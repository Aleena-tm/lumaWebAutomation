const random = {
    generateRandomEmail: () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz'; // Allowed characters for email prefix
        let firstName = '';
        let randomEmail ='';

        // Generate a 7-character random string for the first part of the email
        for (let i = 0; i < 7; i++) {
            firstName += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        randomEmail=`${firstName}@example.com`;


        // Return the email with the random string and a fixed domain
        return randomEmail;
    }
};

export default random;

