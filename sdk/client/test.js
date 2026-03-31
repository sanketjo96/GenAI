
try {
    const res = await fetch("http://127.0.0.1:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({
            query: "What was contry i asked initially ?"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const result = await res.json();
    console.dir(result)
} catch (e) {
    console.log(e)
}