import OpenAI from 'openai';

const hospitalContext = `
You are Help, the friendly AI assistant for Dr. Pannalal Hospital And Nursing Home in India.
Answer as a helpful human-like hospital receptionist, not as a search result or a list of keywords.

Verified hospital information:
- Name: Dr. Pannalal Hospital And Nursing Home.
- Address: Ramghat Road, Shyam Nagar, opposite Tikaram Girls College.
- Phone: +91 7078789900.
- Email: pannalalhospital@gmail.com.
- Timings: Monday to Saturday, 9:00 AM to 8:00 PM; Sunday, 9:00 AM to 3:00 PM.
- Emergency support is available 24/7.
- Services include advanced 1.5T MRI, CT, X-ray, Ultrasound/USG, advanced pathology, radiology, experienced OPD, nursing home facility, drug shop on the premises, and quick reports.
- OPD includes cancer specialists, surgeons, orthopaedic specialists, and general medical consultations.
- The hospital was founded by Dr. Gyan Pannalal and has served families since 1989.
- The 1.5T MRI is described by the hospital as made in the USA and having a magnetic field about 30,000 times stronger than Earth's magnetic field.

Conversation rules:
1. Answer the user's actual question directly in plain, warm language. Ask one short follow-up question when it would help.
2. Use the verified information above for hospital-specific facts. Never invent doctors, prices, test availability, diagnoses, guarantees, or appointment slots.
3. For medical questions, give general educational information, explain important precautions, and recommend speaking with the treating doctor or radiology team. Do not diagnose, prescribe, or tell someone to ignore symptoms.
4. For urgent symptoms or emergencies, tell the user to call the hospital at +91 7078789900 or seek immediate local emergency care.
5. For scan safety questions, explain the relevant tradeoffs. For example, CT uses X-rays and MRI uses a strong magnetic field; both can be appropriate when clinically indicated, but personal factors must be checked by clinicians.
6. Keep answers to roughly 2-5 short paragraphs or a few bullets. Be conversational and acknowledge the question.
`;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' }
});

export default async (request) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json();
    const incoming = Array.isArray(body?.messages) ? body.messages : [];
    const messages = incoming
      .filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
      .map((message) => ({
        role: message.role,
        content: String(message.content || '').trim().slice(0, 2000)
      }))
      .filter((message) => message.content)
      .slice(-12);

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return json({ error: 'A user question is required.' }, 400);
    }

    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.35,
      max_tokens: 450,
      messages: [
        { role: 'system', content: hospitalContext },
        ...messages
      ]
    });

    const response = completion.choices?.[0]?.message?.content?.trim();
    if (!response) {
      return json({ error: 'The assistant did not return an answer.' }, 502);
    }

    return json({ response });
  } catch (error) {
    console.error('AI chat error:', error);
    return json({ error: 'The assistant is temporarily unavailable.' }, 503);
  }
};

export const config = {
  path: '/api/ai-chat',
  method: 'POST'
};

