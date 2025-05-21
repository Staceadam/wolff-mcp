import 'dotenv/config'
import express, { Request, Response } from 'express'
import { streamText } from 'ai'
import { createOllama } from 'ollama-ai-provider'
import { initializeMCPClients } from './client.js'

const app = express()
app.use(express.json())

const ollama = createOllama({
    baseURL: process.env.OLLAMA_BASE_URL
})

// Initialize MCP clients once when the server starts
let mcpTools: any

async function initializeServer() {
    try {
        const clients = await initializeMCPClients()
        mcpTools = clients.tools
        console.log('MCP clients initialized successfully')
    } catch (error) {
        console.error('Failed to initialize MCP clients:', error)
        process.exit(1)
    }
}

// Chat endpoint
app.post('/chat', (req: Request, res: Response): void => {
    try {
        const { message } = req.body

        if (!message) {
            res.status(400).json({ error: 'Message is required' })
            return
        }

        const result = streamText({
            maxSteps: 2,
            model: ollama('qwen3:14b', { simulateStreaming: true }),
            tools: mcpTools,
            system: 'You are a helpful assistant that uses the tools provided to you to answer the user\'s questions and perform tasks.',
            prompt: message,
        })

        result.pipeDataStreamToResponse(res)
    } catch (error) {
        console.error('Error processing chat request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

const PORT = process.env.PORT || 3000

// Initialize the server and start listening
initializeServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}) 