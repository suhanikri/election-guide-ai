# Election Guide AI 🗳️

A smart, dynamic conversational assistant designed to demystify the voting process. Built with a minimalist, high-signal interface to ensure critical civic information is accessible to everyone.

## 1. Chosen Vertical
**Election Process Education**

## 2. Approach and Logic
Static FAQ pages and heavy PDF guidelines often overwhelm young or first-time voters. Our approach is conversational and agentic. By integrating a stateful AI assistant, users can ask highly specific, localized questions and receive direct, jargon-free answers. The logic relies on maintaining conversation history (memory) so the assistant can make logical decisions based on the context of previous messages, simulating a real conversation with a civic expert.

## 3. How the Solution Works
1. **Contextual Memory:** The frontend captures user input and appends it to a running array, which is sent via the `fetch` API to Google's Gemini 1.5 Flash model.
2. **Intent Parsing & Dynamic UI:** If a user asks for physical locations (e.g., "Where do I vote in Delhi?"), the AI generates a specific regex tag. The JavaScript intercepts this tag before rendering the text and dynamically injects a localized Google Map directly into the chat stream.
3. **Real-time Accessibility:** The UI implements the Google Website Translator API, allowing users to instantly convert the entire interface and the AI's responses into their native language without page reloads.

## 4. Google Services Integration
* **Gemini API:** Powers the core conversational intelligence and contextual memory.
* **Google Maps Embed API:** Dynamically visualizes polling booth queries based on AI-extracted location data.
* **Google Cloud Translation:** Ensures inclusive and usable design for non-English speakers.

## 5. Assumptions Made
* Assumed the primary target audience is Indian voters, aligning the AI's system prompt with Election Commission of India guidelines.
* Assumed users have basic internet connectivity capable of loading iframe elements for maps.
* Assumed the app will be run in an environment where API keys can be securely managed (keys are handled via variables in the JS script for the prototype).