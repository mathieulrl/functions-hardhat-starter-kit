const prompt = args[0]

if (!secrets.openaiKey) {
  throw Error("Need to set OPENAI_KEY environment variable")
}

const openAIRequest = Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/completions",
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.openaiKey}`,
  },
  data: { model: "text-davinci-003", prompt: prompt, temperature: 0, max_tokens: 30 },
})

const [openAiResponse] = await Promise.all([openAIRequest])
console.log("raw response", openAiResponse)

const result = openAiResponse.data.choices[0].text
return Functions.encodeString(result)
