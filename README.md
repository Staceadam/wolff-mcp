# Wolff MCP

A Model Context Protocol (MCP) server manager that helps you configure and manage multiple MCP servers for your AI applications.

## Overview

This project provides a centralized way to manage and configure multiple MCP servers. It allows you to easily add, remove, and configure different MCP servers through environment variables.

### Currently Configured MCP Servers

This project is currently configured with the following MCP servers:

1. **File System Server** (`@modelcontextprotocol/server-filesystem`)
   - Provides access to the local file system
   - Configured to access the home directory (`~`)

2. **Time Server** (`mcp/time`)
   - Provides time-related functionality
   - Runs in a Docker container

3. **Puppeteer Server** (`@modelcontextprotocol/server-puppeteer`)
   - Provides web automation capabilities
   - Configured to run in headless mode

## Getting Started

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Environment Configuration

The project uses environment variables to configure the Ollama connection. Create a `.env` file in the root directory with the following:

```env
OLLAMA_BASE_URL=http://localhost:11434
```

## Adding More MCP Servers

You can find a comprehensive list of available MCP servers in the [Model Context Protocol Servers repository](https://github.com/modelcontextprotocol/servers). Some popular servers include:

- GitHub Integration
- File System Access
- Weather Information
- Web Search
- Database Access
- And many more!


## Development

To start the development server:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

## API Examples

Here are some examples of how to interact with the MCP servers using curl:

### Chat Endpoint Example

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "create a file called test.txt"}'
```
