// Automatically open the main application window when popup is loaded
// No need for user interaction with an "Open Tool" button

// Function to show status messages
function showStatus(message) {
  const statusElement = document.getElementById('statusMessage');
  if (statusElement) {
    statusElement.textContent = message;
  }
}

// Function to directly open the full page application
function openFullPageApp() {
  console.log('Auto-opening the main application...');
  
  // Try first method - direct window creation
  chrome.windows.create({
    url: chrome.runtime.getURL('minimal_full_page.html'),
    type: 'popup',
    width: 650,
    height: 800
  }, (newWindow) => {
    // Check for errors
    if (chrome.runtime.lastError) {
      console.error('Error creating window with direct method:', chrome.runtime.lastError);
      
      // Try second method - ask background script to open it
      chrome.runtime.sendMessage({ action: 'openApp' }, (response) => {
        if (chrome.runtime.lastError || !response || !response.success) {
          console.error('Error with background method:', chrome.runtime.lastError);
          showStatus('Failed to open. Try reloading the extension.');
        } else {
          // Success - background will handle it
          window.close();
        }
      });
    } else {
      // If window created successfully, close this popup
      console.log('Created window with ID:', newWindow.id);
      window.close();
    }
  });
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup DOM loaded, auto-opening main window');
  
  // Automatically open the app without user interaction
  openFullPageApp();
  
  // Set up click handler for the entire popup as a fallback
  document.body.addEventListener('click', (e) => {
    if (!e.target.matches('a')) { // Don't intercept link clicks
      openFullPageApp();
    }
  });
}); 