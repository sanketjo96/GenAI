export const getWeatherInfoByCity = async (city) => {
    try {
        const res = await fetch(`https://wttr.in/${city}?format=%C+%t`);
        if (!res.ok) {
            throw new Error("HTTP Error")
        }

        const data = await res.text();
        return data;
    } catch (e) {
        console.error(e)
    }
}