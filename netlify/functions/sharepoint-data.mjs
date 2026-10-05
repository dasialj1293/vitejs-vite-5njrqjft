export default async () => {
    return new Response(
      JSON.stringify({
        status: "working"
      }),
      {
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  };