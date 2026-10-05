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
    return new Response(
      JSON.stringify({
        success: true,
        message: "Monthly summary function works!",
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    };