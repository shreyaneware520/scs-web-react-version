// Chatbot edge function powered by Lovable AI Gateway
// Returns { response: string } to match the existing chatbot-widget.js contract

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are SERA, a friendly and knowledgeable assistant for Semicom Solutions (SCS), a Singapore-based company specializing in semiconductor equipment, RF & Microwave devices, GaN technology, probe stations, lasers/photonics, and quantum solutions.

Your job:
- Answer questions about our products: Probe Stations, RF & Microwave amplifiers, Anti-Jamming Antennas, Horn Antennas, LNAs, GaN devices, Lasers, Photodetectors, Test Systems and related accessories.
- Help users find the right product category and ask for their contact details (name + email) when they want a quote or technical follow-up.
- Be concise, helpful, and professional. Use short paragraphs or bullet points.
- If a question is outside our scope, politely redirect to relevant SCS offerings or suggest contacting the team.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const message: string = (body?.message ?? "").toString().trim();
    const userData = body?.userData ?? {};

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Missing 'message' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userContext =
      userData?.name || userData?.email
        ? `\n\n[User context — name: ${userData?.name || "unknown"}, email: ${userData?.email || "unknown"}]`
        : "";

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + userContext },
          { role: "user", content: message },
        ],
      }),
    });

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ response: "I'm getting a lot of requests right now — please try again in a moment." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ response: "AI credits are exhausted. Please contact the site owner." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, t);
      return new Response(
        JSON.stringify({ response: "Sorry, I'm having trouble answering right now." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await aiResp.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.toString() ??
      "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ response: reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ response: "Sorry, something went wrong. Please try again." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
