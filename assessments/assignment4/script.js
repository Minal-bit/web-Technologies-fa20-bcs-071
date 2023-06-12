// Get DOM elements
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Add event listener to send button
sendButton.addEventListener("click", sendMessage);

// Handle user message
function sendMessage() {
  const message = messageInput.value;
  appendMessage("User", message);
  messageInput.value = "";

  // Call API or perform processing here to generate response
  const response = generateResponse(message);

  // Simulate delay to mimic server processing time
  setTimeout(() => {
    appendMessage("ChatGPT", response);
  }, 500);
}

// Append message to chat container
function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatMessages.appendChild(messageElement);
}

// Generate a response (replace this with your own logic or API call)
function generateResponse(message) {
  // Replace with your own logic or API call
  return "This is a sample response.";
}
