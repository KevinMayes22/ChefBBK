import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. It's important ingredients measurements are metric and not imperial. Format your response in markdown to make it easier to render to a web page
`
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
    return msg.content[0].text
}

