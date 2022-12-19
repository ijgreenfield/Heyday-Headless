export async function getReviews(
    productID: string
    ) {
    const APP_KEY = process.env.YOTPO_APP_KEY;
    const res = await fetch(`https://api-cdn.yotpo.com/v1/widget/${APP_KEY}/products/${productID}/reviews.json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return res.json();
}
