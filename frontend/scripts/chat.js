let chat_channel = null;
let usr_email = localStorage.getItem('usremail');
const pusher = new Pusher('7766683cddcebf443da1', { cluster: 'eu' });
let chatId = null;

let chats = [];
let chatsUl = null; // will hold the main chats list element

console.log("Email: ", usr_email);

function renderChatList(chatArray) {
  const chat_area = document.querySelector('.chat-area');
  chat_area.innerHTML = "";

  chats = Array.isArray(chatArray) ? chatArray : [chatArray, ];
  chatsUl = document.createElement('ul');
  chatsUl.classList.add('contact-list');

  for (const chat of chats) {
    const li = document.createElement('li');

    const email_span = document.createElement('span');
    email_span.textContent = chat['user_email'];
    email_span.classList.add('email-span');

    const name_span = document.createElement('span');
    name_span.textContent = chat['user_name'];
    name_span.classList.add('name-span');

    li.classList.add('chat-contact');
    li.setAttribute('chat_id', chat['chat_id']);
    li.setAttribute('user_name', chat['user_name']);
    li.setAttribute('user_email', chat['user_email']);
    li.appendChild(name_span);
    li.appendChild(email_span);
    chatsUl.appendChild(li);

    const sep = document.createElement('div');
    sep.classList.add('separator');
    chatsUl.appendChild(sep);

    li.addEventListener('click', () => {
      chat_area.innerHTML = "";
      chatId = li.getAttribute('chat_id');
      chatConnect(chatId);
      loadMessages(chatId);
      document.querySelector('.write-box').classList.remove('hide');
      document.querySelector('.new-chat').classList.remove('show');
      const chat_title = document.querySelector('.chat-title');
      document.querySelector('.title-text').textContent = li.getAttribute('user_name');

      const back_button = document.createElement('button');
      back_button.classList.add('back-button');
      back_button.textContent = '<';

      back_button.addEventListener('click', () => {
        chat_area.innerHTML = "";
        chat_area.append(chatsUl);
        const sep = document.createElement('div');
        document.querySelector('.new-chat').classList.add('show');
        sep.classList.add('separator');
        chat_area.append(sep);
        document.querySelector('.write-box').classList.toggle('hide');
        chat_title.removeChild(back_button);
        document.querySelector('.title-text').textContent = 'Chats';
      });

      chat_title.append(back_button);
    });
  }

  chat_area.append(chatsUl);
}
console.log("fetching get-chats", usr_email);
fetch("backend/get-chats.php", {
  method: "POST",
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  body: JSON.stringify({ user_email: usr_email })
})
.then(response => response.json())
.then(data => renderChatList(data.chats));


function restoreChatListHeader() {
  const chat_title = document.querySelector('.chat-title');
  chat_title.innerHTML = "";

  const title_text = document.createElement('h1');
  title_text.classList.add('title-text');
  title_text.textContent = 'Chats';
  chat_title.append(title_text);
  chat_title.append(new_chat_btn);
  new_chat_btn.classList.add('show');
  chat_title.classList.remove('search');
  document.querySelector('.write-box').classList.add('hide');
}

function chatConnect(chatId) {
    // If we are bound to a chat, finish that connection
    if (chat_channel) {
        pusher.unsubscribe(chat_channel.name);
    }

    // Connect to the new chat, through it's ID
    chat_channel = pusher.subscribe(`chat-${chatId}`);

    // Listen for the event 'new-message'
    chat_channel.bind('new-message', function(data) {
        renderMessage({
          sent: (usr_email == data.user_email),
          text: data.text,
          send_date: data.sent_date
        }); // Rendering the message in the page
    });
}

function renderMessage(data){
  const chat_area = document.querySelector('.chat-area');
  const message_div = document.createElement('div');
  message_div.classList.add('message');

  const send_date_span = document.createElement('span');

  if (data.sent){
    message_div.classList.add('sent');
    send_date_span.classList.add('date-sent');
  } else {
    message_div.classList.add('recieved');
    send_date_span.classList.add('date');
  }
  const message_text = document.createElement('span');
  message_text.classList.add('message-text');

  message_text.textContent = data.text;

  send_date_span.textContent = data.send_date;

  message_div.appendChild(message_text);
  chat_area.appendChild(message_div);
  chat_area.appendChild(send_date_span);

  chat_area.scrollTop = chat_area.scrollHeight; // Automatic scroll when message appears

}

async function loadMessages(chatId) {
  const res = await fetch('backend/get-messages.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({
      chat_id: chatId,
      user_email: usr_email
    })
  });

  const messages = await res.json();

  const chatarea = document.querySelector(".chat-area");
  chatarea.innerHTML = ''; // Clean whatever might've been there

  if (messages['text'] != ''){
    messages.forEach(m => {
      renderMessage(m);
    });
  }
}

const send_btn = document.querySelector('.send-message');

send_btn.addEventListener('click', async () => {
  let text = document.querySelector('#message-input').value;

  if(text.trim().length){
    let data = await fetch('backend/send-message.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        chat_id: chatId,
        text: text.trim(),
        user_email: usr_email
      })
    });
    document.querySelector('#message-input').value = '';
    data = await data.json();
    console.log(data);
  }

});





/*
  NEW CHAT LOGIC
*/
const new_chat_btn = document.querySelector('.new-chat');
new_chat_btn.addEventListener('click', () => {
  const chat_area = document.querySelector('.chat-area');
  chat_area.innerHTML = "";
  const chat_title = document.querySelector('.chat-title');
  const title_text = chat_title.querySelector('.title-text');
  const search_bar = document.createElement('input');
  search_bar.type = 'text';
  search_bar.placeholder = 'Search for email';

  chat_title.innerHTML = "";
  chat_title.classList.add('search');
  const bar = document.createElement('div');
  bar.classList.add('bar');
  bar.append(search_bar);
  chat_title.append(bar);
  new_chat_btn.classList.remove('show');

  const back_button = document.createElement('button');
  back_button.classList.add('back-button');
  back_button.textContent = '<';

  back_button.addEventListener('click', () => {
    chat_area.innerHTML = "";
    chat_area.append(chatsUl);
    const sep = document.createElement('div');
    sep.classList.add('separator');
    chat_area.append(sep);
    chat_title.removeChild(back_button);
    chat_title.removeChild(bar);
    title_text.textContent = "Chats";
    chat_title.append(title_text);
    new_chat_btn.classList.add('show');
    chat_title.append(new_chat_btn);
    chat_title.classList.remove('search');
  });

  chat_title.append(back_button);

  search_bar.addEventListener('keydown', (e) => {
    // Only run the code if the user specifically pressed the Enter key
    if (e.key !== 'Enter') return;

    const email = search_bar.value.trim();

    if (!email.length) return;

    // Clear previous search results so they don't stack up
    const searchUl = document.createElement('ul');
    searchUl.classList.add('contact-list');

    fetch('backend/search-users.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        search_text: email
      })
    })
    .then(res => res.json())
    .then(data => {
      if (!data){
        chat_area.append("No users found that match");
        return;
      }
      for (let usr of data){
        const contact = document.createElement('div');
        const li = document.createElement('li');
    
        const email_span = document.createElement('span');
        email_span.textContent = usr['email'];
        email_span.classList.add('email-span');
        
        const name_span = document.createElement('span');
        name_span.textContent = usr['full_name'];
        name_span.classList.add('name-span');

        const sep = document.createElement('div');
        sep.classList.add('separator');

        li.classList.add('chat-contact');
        li.setAttribute('user_email', usr['email']);
        li.appendChild(name_span);
        li.appendChild(email_span);
        searchUl.appendChild(li);
        searchUl.appendChild(sep);
        chat_area.append(searchUl);

        li.addEventListener('click', () => {
          fetch('backend/add-chat.php', {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
              emails: [
                li.getAttribute('user_email'),
                localStorage.getItem('usremail')
              ]
            })
          })
          .then(res => {
            if (!res.ok) {
              return res.text().then(text => {
                throw new Error(`add-chat failed ${res.status}: ${text}`);
              });
            }
            return res.json();
          })
          .then(() => {
            console.log("fetching get-chats", usr_email);
            return fetch('backend/get-chats.php', {
              method: "POST",
              headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
              body: JSON.stringify({ user_email: usr_email })
            });
          })
          .then(res => res.json())
          .then(data => {
            renderChatList(data.chats);
            restoreChatListHeader();
          })
          .catch(console.error);
        });
      }
    });
  });

});