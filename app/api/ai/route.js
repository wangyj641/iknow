import axios from "axios";

export async function POST(req) {
  console.log("---------- 1 ------------");

  if (!process.env.GITHUB_TOKEN) {
    console.log("No token");
    return new Response(
      JSON.stringify({ error: "Missing GITHUB_TOKEN on server" }),
      { status: 500 }
    );
  }

  try {
    const { messages, model = "gpt-4o-mini" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages 必须是数组" }), {
        status: 400,
      });
    }

    console.log("---------- 2 ------------");
    const resp = await axios.post(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        model,
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    console.log("---------- 3 ------------");
    console.log(resp.data);

    return new Response(JSON.stringify(resp.data), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.response?.data || e.message }),
      {
        status: e.response?.status || 500,
      }
    );
  }
}
