import Anthropic from "@anthropic-ai/sdk"


const callAnthropic = async (prompt) => {
    const res = await fetch('/api/anthropic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await res.json();
    return data;
  };

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    let msg;
    try {
      msg = await callAnthropic(`I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`);
      console.log('Claude replied:', msg)
      return msg.content[0].text
    } catch (err) {
      console.error('Error calling Anthropic:', err);
      msg = { content: [{ text: "Sorry, I couldn't generate a recipe right now." }] };
    }
    return msg.content[0].text
}

