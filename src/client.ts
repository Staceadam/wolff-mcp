import { experimental_createMCPClient } from 'ai'
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio'

export async function initializeMCPClients() {
    let clientOne
    let clientTwo
    let clientThree

    const transportOne = new Experimental_StdioMCPTransport({
        command: 'npx',
        args: [
            '-y',
            '@modelcontextprotocol/server-filesystem',
            '~'
        ],
    })

    const transportTwo = new Experimental_StdioMCPTransport({
        command: 'docker',
        args: ['run', '-i', '--rm', 'mcp/time']
    })

    const transportThree = new Experimental_StdioMCPTransport({
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-puppeteer'],
        env: {
            PUPPETEER_LAUNCH_OPTIONS: '{ "headless": true }',
            ALLOW_DANGEROUS: 'true'
        }
    })

    try {
        // Initialize MCP clients with their respective transports
        clientOne = await experimental_createMCPClient({
            transport: transportOne
        })

        clientTwo = await experimental_createMCPClient({
            transport: transportTwo
        })

        clientThree = await experimental_createMCPClient({
            transport: transportThree
        })

        const toolSetOne = await clientOne.tools()
        const toolSetTwo = await clientTwo.tools()
        const toolSetThree = await clientThree.tools()

        const tools = {
            ...toolSetOne,
            ...toolSetTwo,
            ...toolSetThree,
        }

        return { clientOne, clientTwo, clientThree, tools }
    } catch (error) {
        throw error
    }
}

