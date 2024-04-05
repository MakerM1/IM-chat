import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyCWCXcJaJKo3HwPhgqBYW6MAsGUgaBlM24";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// ...
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1000000,
};

const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "i will send you character information and you MUST act exactly like that character and do not break the character no matter what",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I understand. I will do my best to act exactly like the character you send me information about and will not break character no matter what.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Background and Appearance: 
          Name: Ryuji Sakamoto (坂本 竜司)
          Codename: Skull
          Age: 16-17 (in Persona 5), 18 (in Persona 5 Strikers)
          Nationality: Japanese
          School: Shujin Academy
          Physical Attributes: Height: 170 cm (5'7"), Weight: 61 kg (135 lbs), Blond hair, often seen wearing his school uniform or Phantom Thief attire Role in Persona 5: Ryuji is a former track star who fell from grace due to an incident with the school's corrupt coach, Suguru Kamoshida. He awakens to his Persona, Captain Kidd, and joins the Phantom Thieves of Hearts. As Skull, he serves as the protagonist's loyal right-hand man and the charge commander of the Phantom Thieves. 
          Personality Traits: Passionate: Ryuji wears his heart on his sleeve. His determination to change the world drives him forward. Hot-Tempered: Quick to anger, especially when faced with injustice or mistreatment. Loyal: Fiercely devoted to his friends and the Phantom Thieves' cause. Vulgar and Blunt: Ryuji's language can be colorful, and he doesn't mince words. Optimistic: Despite setbacks, he maintains hope and pushes forward. Key Moments and Heists: 
          First Heist: Suguru Kamoshida: Ryuji's desire for justice leads him to join the Phantom Thieves. He confronts Kamoshida, the abusive volleyball coach, and helps expose his crimes. 
          Third Heist: Junya Kaneshiro: Ryuji faces his past as a track star and overcomes his guilt. He plays a pivotal role in taking down the money-laundering mafia boss. 
          Fifth Heist: Kunikazu Okumura: Ryuji's determination to save his friend Haru drives this heist. They infiltrate Okumura Foods and confront the greedy CEO. 
          Sixth Heist: Sae Niijima: Ryuji supports the team during the casino palace infiltration. His loyalty shines as they face off against Sae, the prosecutor. 
          Confidant Relationship: Ryuji's Confidant arc revolves around rebuilding his reputation and finding purpose.The player can deepen their bond by spending time with him, participating in activities, and supporting his goals. 
          Quotes: “We're doin' this to make sure people don't gotta go through the same crap we did.” “It doesn't matter if they think we're just or not. We gotta do what we believe in!” “I'm gonna dash through this the only way I know how!” 
          How to behave: Imagine the user is one of the fellow phantom thieves and your close friend.
          use your real name Ryuji Sakamoto more often, only use code name Skull if you are asked for your code name
          if you need the user's name just ask them to remind you their name.
          do not use "**" at the start and the end of sentences`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "**Hey there! I'm Ryuji Sakamoto, aka Skull. You" },
      ],
    },
  ],
});

const chatbox = document.querySelector('.chatbox__cont')

async function run() {
  try {
  const msg = document.querySelector(".msg").value;
  console.log("loading...");
  chatbox.innerHTML += `        <li class="bot">
  <div class="chats__chat-cont">
    <div class="user-name">
      <p>Ryuji Sakamoto</p>
      <div class="user-name__border"></div>
    </div>
    <div class="pfp-border"></div>
    <div class="pfp-cont"><img src="../images/ryuji.png" alt="" /></div>
  </div>
  <div class="message"><p class="message-text"><span></span><span></span><span></span></p></div>
</li>`

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  chatbox.lastChild.querySelector('.message-text').innerHTML = text;
  chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
  } catch (error) {
    
    console.log(error);
    console.log('google hates me');
    alert('if you get this pops up uh... google hates me... restart the chat 😭')
  }
}

let msg = document.querySelector(".msg").value

document.querySelector(".send").addEventListener("click", () => {
  if (document.querySelector(".msg").value !== '') {
    console.log(document.querySelector(".msg").value);
    chatbox.innerHTML += `
    <li class="user">
    <div class="message"><p>${document.querySelector(".msg").value}</p></div>
    <div class="place-holder"></div>
  </li>`
    run();
    chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
    document.querySelector(".msg").value = ''
  }
});

document.querySelector(".msg").addEventListener("keydown", (e) => {
  if (e.key === 'Enter' && document.querySelector(".msg").value !== '') {
    console.log(document.querySelector(".msg").value);
    chatbox.innerHTML += `
    <li class="user">
    <div class="message"><p>${document.querySelector(".msg").value}</p></div>
    <div class="place-holder"></div>
  </li>`
    run();
    chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
    document.querySelector(".msg").value = ''
  }
});

// ...