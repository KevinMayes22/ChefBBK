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

    msg = await callAnthropic(`I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`);
    return msg;
}

