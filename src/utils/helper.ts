export const generateFlightNumber = () => {
    const code = 'FE'
    const randomNumber = Math.floor(10 + Math.random() * 99)
    const timestamps = Date.now().toString().slice(-2)
    return`${code}${randomNumber}${timestamps}`
}