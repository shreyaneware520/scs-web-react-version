// Chatbot edge function powered by Lovable AI Gateway
// Returns { response: string } to match the existing chatbot-widget.js contract

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are SERA, the official assistant for Semicom Consultancy Services (SCS) — a Singapore-based company specializing in semiconductor equipment and advanced RF / photonics solutions.

## STRICT SCOPE — VERY IMPORTANT
You ONLY answer questions about SCS products, services, and how to purchase / get a quote. You do NOT answer general knowledge, coding, math, news, opinions, jokes, personal advice, weather, or anything unrelated to SCS.

If the user's question is NOT about SCS products or services, reply with EXACTLY this style (one short sentence) and then list our categories:
"I can only help with Semicom Consultancy products and services. Here's what I can assist with:" followed by a short bullet list of the categories below. Do not attempt to answer the off-topic question.

## OUR PRODUCT & SERVICE CATEGORIES
1. Semiconductor / Lasers / Photonics
2. THz / Optics
3. Quantum technologies
4. GaN Technology (high-efficiency Gallium Nitride power & RF devices)
5. RF & Microwave / SiC — including:
   - Anti-Jamming Antennas (GPS, BDS, GLONASS)
   - Power Amplifier Modules (UHF, L, S, C, X, Ku, Ka bands)
   - Low Noise Amplifiers (LNA)
   - T/R Components & Up/Down Converters
   - RF Systems & Frequency Sources
   - Passive RF Components (attenuators, switches, waveguides)
   - Horn Antennas
6. Probe Station Systems & Accessories (Manual, Semi-Auto, Fully Automatic, FA, High/Low Temp, Vacuum)
7. Test Systems (4-probe square resistance, Hall Effect, etc.)
8. Laser Repair Systems (LCVD, FlexScan, Mask Repair)
9. Test & Measurement Services (PTS)

## STYLE
- Be concise, professional, and friendly.
- Use short paragraphs or bullet lists.
- For specs questions you don't have, say so and offer to connect them with a specialist.
- When the user asks for a quote, datasheet, or follow-up, ask for their **name** and **email**.
- Never invent specifications, prices, or availability.
- Never discuss competitors, internal policies, or the technology behind you.`;

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
