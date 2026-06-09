let chat_channel = null;
let usr_email = localStorage.getItem('usremail');
const pusher = new Pusher('7766683cddcebf443da1', { cluster: 'eu' });
let chatId = null;

console.log("Email: ", usr_email);

fetch("backend/get-chats.php", {
  method: "POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ user_email: usr_email })
})
.then(response => response.json())
.then(data => {
  console.log(data);  
  const chat_area = document.querySelector('.chat-area');
  const ul = document.createElement('ul');
  ul.classList.add('contact-list');
  let li_list = [];
  for(chat of data.chats){
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
    li.appendChild(name_span);
    li.appendChild(email_span);
    ul.appendChild(li);
    li.addEventListener('click', () => {
      chat_area.innerHTML = "";
      chatId = li.getAttribute('chat_id');
      chatConnect(chatId);
      loadMessages(chatId);
      document.querySelector('.write-box').classList.remove('hide');
      const chat_title = document.querySelector('.chat-title');
      document.querySelector('.title-text').textContent = li.getAttribute('user_name');

      const back_button = document.createElement('button');
      back_button.classList.add('back-button');
      back_button.textContent = '<';

      back_button.addEventListener('click', () => {
        chat_area.innerHTML = "";
        chat_area.append(ul);
        const sep = document.createElement('div');
        sep.classList.add('separator');
        chat_area.append(sep);
        document.querySelector('.write-box').classList.toggle('hide');
        chat_title.removeChild(back_button);
        document.querySelector('.title-text').textContent = 'Chats';
      });

      chat_title.append(back_button);

    });
    chat_area.append(ul);
    const sep = document.createElement('div');
    sep.classList.add('separator');
    chat_area.append(sep);
  }

});


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
    headers: {'Content-Type': 'application/json'},
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