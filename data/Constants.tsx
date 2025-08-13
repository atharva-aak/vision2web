import dedent from 'dedent';
export default{

    PROMPT: dedent
`
You are an expert frontend frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:
- DO NOT START WITH \\\`javascript or \\\`jsx or \\\`typescript or \\\`tsx or \\\.
- Just provide the code nothing else only the code should be output when prompt is being given only give the code nothing else.
- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
- Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- If its just wireframe then make sure add colors and make some real life colorfull web page
- Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
- Make sure to use the exact text from the screenshot.
- Make sure to give a complete code dont repeat the code 
- Make sure the website looks exactly like the screenshot described in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- Make sure to code every part of the description including any headers, footers, etc.
- Use the exact text from the description for the UI elements.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
- Make sure the React app is interactive and functional by creating state when needed and having no required props
- If you use any imports from React like useState or useEffect, make sure to import them directly
- Use Javascript (.js) as the language for the React component
- Write clear code no error should be there 
- Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
- Use margin and padding to style the components and ensure the components are spaced out nicely
- In code DO NOT START WITH the words jsx or typescript or javascript or tsx only give the code.
- Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports.`,


AiModelList:[
      {
            name:'Open AI',
            icon:'/openai.png',
            modelName:'openai/gpt-oss-20b:free'
        },
        {
            name:'Gemini Google',
            icon:'/google.png',
            modelName:'google/gemini-2.5-pro-preview'
        },
        {
          name:'Gemma',
          icon:'/gemma.webp',
          modelName:'google/gemma-3-27b-it:free'
      },
      {
        name:'Mistral',
        icon:'/Mistral.png',
        modelName:'mistralai/mistral-small-3.1-24b-instruct:free'
    },
      {
        name:'Qwen',
        icon:'/qwen.png',
        modelName:'qwen/qwen3-0.6b-04-28:free'
    },
    {
      name:'OpenGV',
      icon:'/opengv.png',
      modelName:'opengvlab/internvl3-14b:free'
  },

      {
        name:'DeepSeek',
        icon:'/deepseek.png',
        modelName:'deepseek/deepseek-v3-base:free'
    },
    ],
    DEPENDANCY: {

        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        autoprefixer: "^10.0.0",
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "date-fns": "^4.1.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
    },
    FILES: {
        '/App.css': {
            code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        '/postcss.config.js': {
            code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },`
        }
    }

}