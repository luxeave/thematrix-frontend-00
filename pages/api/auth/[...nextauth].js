import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function fetchLogin(url, payload){
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await res.json();
    } catch (error) {
        throw new Error(error.message)
    }
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, _) {
                try {
                    const payload = {
                        "username": credentials.email,
                        "password": credentials.password
                    };
                    
                    const result = await fetchLogin(process.env.LOGIN_URL, payload);
                    
                    if (result.error || result.statusCode!=200) {
                        throw new Error(result.message)
                    }

                    return {
                        email: credentials.email
                    }
                } catch (error) {
                    throw new Error(error.message)
                }
            }   
        })
    ]
});