/**
 * RatScale Background Service Worker
 * Handles extension icon clicks and window management
 */

// Track active application window
let activeRatScaleWindow = null;

// Check if window exists and is still open
async function windowExists(windowId) {
  if (!windowId) return false;
  
  try {
    const window = await chrome.windows.get(windowId);
    return Boolean(window);
  } catch (error) {
    console.log('Window check error:', error.message);
    return false;
  }
}

// Create a new application window
function createAppWindow() {
  console.log('Creating new RatScale application window');
  
  // Modern dimensions for the application window
  const windowWidth = 720;
  const windowHeight = 820;
  
  return new Promise((resolve) => {
    chrome.windows.create({
      url: chrome.runtime.getURL('minimal_full_page.html'),
      type: 'popup',
      width: windowWidth,
      height: windowHeight
    }, (newWindow) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to create window:', chrome.runtime.lastError);
        resolve(null);
        return;
      }
      
      activeRatScaleWindow = newWindow.id;
      console.log(`Created RatScale window with ID: ${activeRatScaleWindow}`);
      
      // Store window ID in local storage
      chrome.storage.local.set({
        activeWindowId: activeRatScaleWindow,
        lastOpenTime: Date.now()
      });
      
      resolve(newWindow);
    });
  });
}

// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  console.log('Extension icon clicked!');
  
  // Check if we already have a window open
  if (activeRatScaleWindow) {
    chrome.windows.get(activeRatScaleWindow, {}, (window) => {
      if (chrome.runtime.lastError) {
        console.log('Saved window no longer exists, creating new one');
        activeRatScaleWindow = null;
        createAppWindow();
        return;
      }
      
      // Window exists, focus it
      chrome.windows.update(activeRatScaleWindow, { 
        focused: true 
      }, () => {
        if (chrome.runtime.lastError) {
          console.log('Error focusing window, creating new one');
          createAppWindow();
        }
      });
    });
    return;
  }
  
  // Check storage for window ID
  chrome.storage.local.get(['activeWindowId'], (data) => {
    if (data.activeWindowId) {
      chrome.windows.get(data.activeWindowId, {}, (window) => {
        if (chrome.runtime.lastError) {
          // Stored window doesn't exist anymore, create new one
          createAppWindow();
          return;
        }
        
        // Window exists, save ID and focus it
        activeRatScaleWindow = data.activeWindowId;
        chrome.windows.update(activeRatScaleWindow, { 
          focused: true 
        }, () => {
          if (chrome.runtime.lastError) {
            createAppWindow();
          }
        });
      });
    } else {
      // No window ID in storage, create new one
      createAppWindow();
    }
  });
});

// Keep track of window removal
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === activeRatScaleWindow) {
    console.log(`RatScale window ${windowId} was closed`);
    activeRatScaleWindow = null;
    chrome.storage.local.remove('activeWindowId');
  }
});

// Handle initialization message from app window
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'init_window') {
    // Store the window ID when the app initializes
    if (sender.tab && sender.tab.windowId) {
      activeRatScaleWindow = sender.tab.windowId;
      console.log(`Registered app window ID: ${activeRatScaleWindow}`);
      
      // Store in local storage
      chrome.storage.local.set({
        activeWindowId: activeRatScaleWindow,
        lastOpenTime: Date.now()
      });
      
      sendResponse({ success: true, windowId: activeRatScaleWindow });
    }
    return true;
  }
  
  if (message.action === 'open_app') {
    console.log('Received request to open app window');
    createAppWindow().then((window) => {
      sendResponse({ 
        success: Boolean(window), 
        windowId: window ? window.id : null 
      });
    });
    return true;
  }
  
  return false;
});

// Initialize on installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log(`RatScale installed: ${details.reason}`);
  
  // Set default settings
  chrome.storage.local.set({
    isProcessing: false,
    progress: 0,
    lastUsed: null,
    theme: 'default',
    installTime: Date.now()
  });
  
  // Open welcome page on fresh install
  if (details.reason === 'install') {
    const url = chrome.runtime.getURL('minimal_full_page.html?welcome=true');
    chrome.tabs.create({ url });
  }
}); 