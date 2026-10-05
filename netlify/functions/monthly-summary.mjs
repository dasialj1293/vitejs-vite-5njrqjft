function isFirstBusinessDay() {
    const today = new Date();

    let firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    while (
        firstDay.getDay() === 0 ||
        firstDay.getDay() === 6
    ) {
        firstDay.setDate(
            firstDay.getDate() + 1
        );
    }

    return (
        today.toDateString() ===
        firstDay.toDateString()
    );
}

export default async () => {
    if (!isFirstBusinessDay()) {
        return new Response(
            JSON.stringify({
                message:
                "Not the first business day."
            })
        );
    }

    return new Response(
        JSON.stringify({
            message:
                "Generate monthly summary now."
        })
    );
};