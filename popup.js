document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const nameInput = document.getElementById('name-input');
  const urlInput = document.getElementById('url-input');
  const addButton = document.getElementById('add-button');
  const urlList = document.getElementById('url-list');
  const toggleFormButton = document.getElementById('toggle-form-button');
  const urlForm = document.getElementById('url-form');
  
  // Drag variables
  let draggedItem = null;
  let draggedIndex = null;
  
  // Load saved URLs
  loadUrls();
  
  // Toggle form visibility
  toggleFormButton.addEventListener('click', function() {
    urlForm.classList.toggle('active');
    const icon = toggleFormButton.querySelector('i');
    if (urlForm.classList.contains('active')) {
      icon.className = 'fas fa-minus';
    } else {
      icon.className = 'fas fa-plus';
    }
  });
  
  // Add URL button click event
  addButton.addEventListener('click', function() {
    addUrl();
  });
  
  // Add URL on Enter key press
  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addUrl();
  });
  
  urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addUrl();
  });
  
  // Function to add a new URL
  function addUrl() {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name === '' || url === '') {
      alert('Please enter both name and URL');
      return;
    }
    
    // Validate URL format
    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    // Get existing URLs
    chrome.storage.sync.get(['urls'], function(result) {
      const urls = result.urls || [];
      
      // Add new URL
      urls.push({ name, url });
      
      // Save updated URLs
      chrome.storage.sync.set({ urls }, function() {
        // Clear input fields
        nameInput.value = '';
        urlInput.value = '';
        
        // Collapse the form after adding
        urlForm.classList.remove('active');
        const icon = toggleFormButton.querySelector('i');
        icon.className = 'fas fa-plus';
        
        // Refresh the URL list
        loadUrls();
      });
    });
  }
  
  // Function to load saved URLs
  function loadUrls() {
    chrome.storage.sync.get(['urls'], function(result) {
      const urls = result.urls || [];
      
      // Clear the URL list
      urlList.innerHTML = '';
      
      // Add each URL as a button
      urls.forEach(function(item, index) {
        const urlItem = document.createElement('div');
        urlItem.className = 'url-item';
        urlItem.draggable = true;
        urlItem.dataset.index = index;
        
        // Add drag event listeners
        urlItem.addEventListener('dragstart', handleDragStart);
        urlItem.addEventListener('dragover', handleDragOver);
        urlItem.addEventListener('dragenter', handleDragEnter);
        urlItem.addEventListener('dragleave', handleDragLeave);
        urlItem.addEventListener('drop', handleDrop);
        urlItem.addEventListener('dragend', handleDragEnd);
        
        const urlButton = document.createElement('button');
        urlButton.className = 'url-button';
        urlButton.textContent = item.name;
        urlButton.addEventListener('click', function() {
          chrome.tabs.create({ url: item.url });
        });
        
        const actionDiv = document.createElement('div');
        actionDiv.className = 'action-icons';
        
        const editButton = document.createElement('button');
        editButton.className = 'icon-button edit-icon';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', function() {
          editUrl(urlItem, item, index);
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'icon-button delete-icon';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function() {
          deleteUrl(index);
        });
        
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);
        
        urlItem.appendChild(urlButton);
        urlItem.appendChild(actionDiv);
        
        urlList.appendChild(urlItem);
      });
    });
  }
  
  // Function to edit a URL
  function editUrl(urlItem, item, index) {
    // Create edit form
    const editForm = document.createElement('div');
    editForm.className = 'edit-mode';
    
    const editNameInput = document.createElement('input');
    editNameInput.type = 'text';
    editNameInput.value = item.name;
    
    const editUrlInput = document.createElement('input');
    editUrlInput.type = 'url';
    editUrlInput.value = item.url;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'edit-actions';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    saveButton.textContent = 'Save';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'delete-button';
    cancelButton.textContent = 'Cancel';
    
    // Save button event
    saveButton.addEventListener('click', function() {
      const newName = editNameInput.value.trim();
      const newUrl = editUrlInput.value.trim();
      
      if (newName === '' || newUrl === '') {
        alert('Please enter both name and URL');
        return;
      }
      
      // Validate URL format
      if (!isValidUrl(newUrl)) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
      }
      
      // Update URL in storage
      chrome.storage.sync.get(['urls'], function(result) {
        const urls = result.urls || [];
        urls[index] = { name: newName, url: newUrl };
        
        chrome.storage.sync.set({ urls }, function() {
          loadUrls();
        });
      });
    });
    
    // Cancel button event
    cancelButton.addEventListener('click', function() {
      loadUrls();
    });
    
    buttonsDiv.appendChild(saveButton);
    buttonsDiv.appendChild(cancelButton);
    
    editForm.appendChild(editNameInput);
    editForm.appendChild(editUrlInput);
    editForm.appendChild(buttonsDiv);
    
    // Replace URL item with edit form
    urlItem.parentNode.replaceChild(editForm, urlItem);
    
    // Focus on name input
    editNameInput.focus();
  }
  
  // Function to delete a URL
  function deleteUrl(index) {
    if (confirm('Are you sure you want to delete this URL?')) {
      chrome.storage.sync.get(['urls'], function(result) {
        const urls = result.urls || [];
        
        // Remove URL at the specified index
        urls.splice(index, 1);
        
        // Save updated URLs
        chrome.storage.sync.set({ urls }, function() {
          loadUrls();
        });
      });
    }
  }
  
  // Drag and drop handlers
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    
    draggedItem = this;
    draggedIndex = parseInt(this.dataset.index);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }
  
  function handleDragEnter(e) {
    this.classList.add('over');
  }
  
  function handleDragLeave(e) {
    this.classList.remove('over');
  }
  
  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    if (draggedItem !== this) {
      const targetIndex = parseInt(this.dataset.index);
      
      chrome.storage.sync.get(['urls'], function(result) {
        const urls = result.urls || [];
        
        // Move the item in the array
        const [movedItem] = urls.splice(draggedIndex, 1);
        urls.splice(targetIndex, 0, movedItem);
        
        // Save the updated order
        chrome.storage.sync.set({ urls }, function() {
          loadUrls();
        });
      });
    }
    
    return false;
  }
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
    
    const items = document.querySelectorAll('.url-item');
    items.forEach(function(item) {
      item.classList.remove('over');
    });
  }
  
  // Function to validate URL format
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
});
