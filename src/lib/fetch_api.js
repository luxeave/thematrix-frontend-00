export default async function FetchAPI(url, payload){
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
        throw new Error(error);
    }
}