let chat_channel = null;
const pusher = new Pusher('7766683cddcebf443da1', { cluster: 'eu' });
let usr_email = '';
let cookies = document.cookie.split(';');
let chatId = 1;

cookies.forEach(c => {
    let pair = c.split("="); // Makes the pair being [0]=cookiename && [1]=value
    if (pair[0].trim() == 'usremail'){
      usr_email = decodeURIComponent(pair[1]);
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
  const res = await fetch('../backend/get-messages.php', {
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
    let data = await fetch('../backend/send-message.php', {
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

loadMessages(chatId);
chatConnect(chatId);