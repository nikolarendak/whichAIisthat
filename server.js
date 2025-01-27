document.getElementById('earlyAccessForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = 'Submitting...';

  const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value
  };

  try {
      const response = await fetch('https://gpt5hub.onrender.com/submit-form', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Log the response headers and status
      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers));
      
      // Get the raw text response first
      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      // Try to parse it as JSON if it's not empty
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('Parsed Data:', data);

      messageDiv.textContent = data.message || 'Form submitted successfully!';
      document.getElementById('earlyAccessForm').reset();
  } catch (error) {
      console.error('Error details:', error);
      messageDiv.textContent = `Submission failed: ${error.message}`;
  }
});