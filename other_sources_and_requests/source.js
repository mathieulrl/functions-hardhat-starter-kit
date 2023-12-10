const prompt = args[0]

if (!secrets.apiKey) {
  throw Error("Need to set OPENAI_KEY environment variable")
}


// example request:
// curl https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_API_KEY" -d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}

// example response:
// {"id":"cmpl-6jFdLbY08kJobPRfCZL4SVzQ6eidJ","object":"text_completion","created":1676242875,"model":"text-davinci-003","choices":[{"text":"\n\nThis is indeed a test","index":0,"logprobs":null,"finish_reason":"length"}],"usage":{"prompt_tokens":5,"completion_tokens":7,"total_tokens":12}}
const openAIRequest = Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/completions",
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.apiKey}`,
  },
  data: { model: "text-davinci-001", prompt: prompt, temperature: 1, max_tokens: 15 },
})

const [openAiResponse] = await Promise.all([openAIRequest])

if (openAiResponse.error) {
  throw new Error(openAiResponse.error);
}

const response = openAiResponse.data.choices[0].text;


return Functions.encodeString(response);





