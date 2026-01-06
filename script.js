// ==================== COMPLETE SCRIPT.JS ====================

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const lyricsBtn = document.getElementById('lyricsBtn');
const lyricsModal = document.getElementById('lyricsModal');
const closeLyrics = document.getElementById('closeLyrics');
const mobileSearchToggle = document.getElementById('mobileSearchToggle');
const mobileSearchContainer = document.getElementById('mobileSearchContainer');
const songListContainer = document.getElementById('songListContainer');
const carouselContainer = document.getElementById('carouselContainer');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const audioLoading = document.getElementById('audioLoading');
const songTitleDisplay = document.getElementById('songTitleDisplay');
const songArtistDisplay = document.getElementById('songArtistDisplay');
const lyricsPlayerTitle = document.getElementById('lyricsPlayerTitle');
const lyricsText = document.getElementById('lyricsText');

// NEW: Lyrics header elements
const lyricsSongTitle = document.getElementById('lyricsSongTitle');
const lyricsSongArtist = document.getElementById('lyricsSongArtist');

// Audio player element
const audioPlayer = document.getElementById('audioPlayer');

// Mobile player elements
const mobileSongTitle = document.getElementById('mobileSongTitle');
const mobileSongArtist = document.getElementById('mobileSongArtist');
const mobilePlayBtn = document.getElementById('mobilePlayBtn');
const mobilePrevBtn = document.getElementById('mobilePrevBtn');
const mobileNextBtn = document.getElementById('mobileNextBtn');
const mobilePlayIcon = mobilePlayBtn.querySelector('i');

// Mobile progress elements
const mobileCurrentTime = document.getElementById('mobileCurrentTime');
const mobileTotalTime = document.getElementById('mobileTotalTime');
const mobileProgressBar = document.getElementById('mobileProgressBar');
const mobileProgress = document.getElementById('mobileProgress');
const mobileProgressContainer = document.querySelector('.mobile-progress-container');

// Lyrics player elements
const lyricsCurrentTime = document.getElementById('lyricsCurrentTime');
const lyricsTotalTime = document.getElementById('lyricsTotalTime');
const lyricsProgressBar = document.getElementById('lyricsProgressBar');
const lyricsProgress = document.getElementById('lyricsProgress');
const lyricsPlayBtn = document.getElementById('lyricsPlayBtn');
const lyricsPrevBtn = document.getElementById('lyricsPrevBtn');
const lyricsNextBtn = document.getElementById('lyricsNextBtn');
const lyricsPlayIcon = lyricsPlayBtn.querySelector('i');

// Search elements
const searchInput = document.querySelector('.search-input');
const mobileSearchInput = document.querySelector('.mobile-search-input');
const searchClear = document.getElementById('searchClear');
const mobileSearchClear = document.getElementById('mobileSearchClear');

// Menu elements
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');

// Auto Play Toggle Button
const autoPlayToggleBtn = document.getElementById('autoPlayToggleBtn');

// Progress container element for scroll detection
const progressContainer = document.querySelector('.progress-container');

// Player Header Title
const playerTitle = document.querySelector('.player-title');

// State variables
let isPlaying = false;
let currentSongIndex = 0;
let isDarkMode = false;
let isMobileSearchOpen = false;
let updateInterval;
let currentLyrics = "";
let swiper = null;
let currentFilterType = "list"; // Start with "list" active
let filteredSongs = [];
let isAutoPlayEnabled = true;

// Store the LAST CLICKED song ID
let lastClickedSongId = null;
let lastClickedTrackId = null;

// User interaction tracking
let hasUserInteracted = false;

// Track audio loading state
let isAudioLoading = false;

// Favorite songs storage
let favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];

// Flag to prevent UI flickering
let isUIBusy = false;
let uiUpdateTimeout = null;

// Track last active song across filter changes
let lastActiveSongId = null;
let lastActiveSongType = null;

// Song list visibility state
let isSongListVisible = true;

// ==================== ANDROID BACKGROUND AUDIO FIXES ====================

// Background audio wake lock
let wakeLock = null;
let isWakeLockSupported = 'wakeLock' in navigator;

// Track if we're in background
let isInBackground = false;

// Background check interval
let backgroundCheckInterval = null;

// Silent audio for keeping audio context alive
let silentAudio = null;

// ==================== HELPER FUNCTIONS ====================

// Get icon based on song type
function getSongTypeIcon(type) {
    switch(type) {
        case "male": return "fas fa-mars";
        case "female": return "fas fa-venus";
        case "duet": return "fas fa-venus-mars";
        case "song": return "fas fa-music";
        case "podcast": return "fas fa-podcast";
        case "favourite": return "fas fa-heart";
        case "list": return "fas fa-list";
        default: return "fas fa-music";
    }
}

// Get display title based on type - FIXED VERSION
function getTitleForType(song, type) {
    if (!song || !song.title) return "Unknown Song";
    
    const baseTitle = song.title.trim();
    
    // Only add version suffix for audio types
    if (type === "male") {
        return `${baseTitle} (Male)`;
    } else if (type === "female") {
        return `${baseTitle} (Female)`;
    } else if (type === "duet") {
        return `${baseTitle} (Duet)`;
    } else if (type === "song") {
        return `${baseTitle} (Original)`;
    } 
    
    // For list, favourite, podcast - return plain title
    return baseTitle;
}

// Get display artist name based on type - FIXED VERSION
function getArtistForType(song, type) {
    if (!song || !song.artist) return "Unknown Artist";
    
    // Return clean artist name without version suffix
    const artist = song.artist.trim();
    
    // Remove any version suffixes from artist name
    return artist
        .replace(/\(Male\)/gi, '')
        .replace(/\(Female\)/gi, '')
        .replace(/\(Duet\)/gi, '')
        .replace(/\(Original\)/gi, '')
        .replace(/\(Song\)/gi, '')
        .replace(/\(Podcast\)/gi, '')
        .trim();
}

// Get audio file path for specific type
function getAudioForType(song, type) {
    if (song.audio && song.audio[type]) {
        return song.audio[type];
    }
    return null;
}

// Filter songs - show songs that have the requested type
function filterSongsByType(type) {
    if (type === "favourite") {
        return songs.filter(song => favoriteSongs.includes(song.id));
    }
    if (type === "list") {
        // For "list" type, show all songs
        return songs;
    }
    return songs.filter(song => song.availableTypes.includes(type));
}

// Count songs by type
function countSongsByType(type) {
    if (type === "favourite") {
        return favoriteSongs.length;
    }
    if (type === "list") {
        return songs.length;
    }
    return songs.filter(song => song.availableTypes.includes(type)).length;
}

// Get display name for type
function getTypeDisplayName(type) {
    const names = {
        "list": "Song List",
        "male": "Solo Male",
        "female": "Solo Female", 
        "duet": "Duet",
        "song": "Original Song",
        "favourite": "Favourites",
        "podcast": "Lyrics",
        "about": "About",
        "developed": "Developed by Chillax Technologies"
    };
    return names[type] || type;
}

// Update sidebar with song counts
function updateSidebarWithCounts() {
    const menu = document.querySelector('.menu');
    if (!menu) return;
    
    menu.innerHTML = '';
    
    const menuItems = [
        { type: "list", icon: "fa-list" },
        { type: "male", icon: "fa-mars" },
        { type: "female", icon: "fa-venus" },
        { type: "duet", icon: "fa-venus-mars" },
        { type: "song", icon: "fa-music" },
        { type: "podcast", icon: "fa-podcast" },
        { type: "favourite", icon: "fa-heart" },
        { type: "about", icon: "fa-info-circle" },
        { type: "developed", icon: "fa-code" }
    ];
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.dataset.type = item.type;
        
        if (item.type === currentFilterType) {
            li.classList.add('active');
        }
        
        if (item.type === "developed") {
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${getTypeDisplayName(item.type)}</span>
            `;
        } else if (item.type === "about") {
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${getTypeDisplayName(item.type)}</span>
            `;
        } else {
            const count = countSongsByType(item.type);
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${getTypeDisplayName(item.type)} (${count})</span>
            `;
        }
        
        menu.appendChild(li);
    });
    
    setupSidebarMenu();
}

// Update active filter button
function updateActiveFilterButton(activeType) {
    // Update control buttons in player header
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        if (btn.dataset.type === activeType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update menu items in sidebar
    document.querySelectorAll('.menu li[data-type]').forEach(item => {
        if (item.dataset.type === activeType) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update player title based on active type
    if (playerTitle) {
        playerTitle.textContent = getTypeDisplayName(activeType);
    }
}

// Check if type is audio type
function isAudioType(type) {
    return type !== "podcast" && type !== "favourite" && type !== "list" && type !== "about";
}

// Mark user interaction
function markUserInteraction() {
    if (!hasUserInteracted) {
        hasUserInteracted = true;
    }
}

// Toggle sidebar and update menu button icon
function toggleSidebar() {
    const isActive = sidebar.classList.toggle('active');
    
    if (isActive) {
        menuBtn.className = 'fas fa-times menu-btn';
        updateSidebarWithCounts();
    } else {
        menuBtn.className = 'fas fa-bars menu-btn';
    }
}

// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
}

// Setup Auto Play Toggle Button
function setupAutoPlayToggle() {
    // Load saved preference
    const savedAutoPlay = localStorage.getItem('autoPlayEnabled');
    if (savedAutoPlay !== null) {
        isAutoPlayEnabled = savedAutoPlay === 'true';
        updateAutoPlayToggleUI();
    }
    
    // Add click event to toggle button
    if (autoPlayToggleBtn) {
        autoPlayToggleBtn.addEventListener('click', () => {
            markUserInteraction();
            isAutoPlayEnabled = !isAutoPlayEnabled;
            localStorage.setItem('autoPlayEnabled', isAutoPlayEnabled);
            updateAutoPlayToggleUI();
            
            const status = isAutoPlayEnabled ? 'ON' : 'OFF';
            showNotification(`Auto Play ${status}`, 2000);
        });
    }
}

// Update Auto Play toggle button UI
function updateAutoPlayToggleUI() {
    if (autoPlayToggleBtn) {
        if (isAutoPlayEnabled) {
            autoPlayToggleBtn.classList.add('active');
            autoPlayToggleBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
            autoPlayToggleBtn.title = 'Auto Play: ON';
        } else {
            autoPlayToggleBtn.classList.remove('active');
            autoPlayToggleBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
            autoPlayToggleBtn.title = 'Auto Play: OFF';
        }
    }
}

// Toggle favorite status for a song
function toggleFavorite(songId) {
    const index = favoriteSongs.indexOf(songId);
    
    if (index === -1) {
        favoriteSongs.push(songId);
        showNotification("Added to favorites", 2000);
    } else {
        favoriteSongs.splice(index, 1);
        showNotification("Removed from favorites", 2000);
    }
    
    saveFavorites();
    
    if (currentFilterType === "favourite") {
        applyFilter("favourite");
    }
    
    updateFavoriteButtonUI(songId);
    updateSidebarWithCounts();
    
    return index === -1;
}

// Update favorite button UI
function updateFavoriteButtonUI(songId) {
    const isFavorite = favoriteSongs.includes(songId);
    
    const favoriteMenu = document.querySelector('.menu li[data-type="favourite"]');
    if (favoriteMenu) {
        const icon = favoriteMenu.querySelector('i');
        icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    }
    
    const favoriteControl = document.querySelector('.control-btn[data-type="favourite"]');
    if (favoriteControl) {
        const icon = favoriteControl.querySelector('i');
        icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    }
    
    const songItem = document.querySelector(`.song-item[data-id="${songId}"]`);
    if (songItem) {
        const favoriteBtn = songItem.querySelector('.favorite-btn');
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
            favoriteBtn.classList.toggle('active', isFavorite);
        }
    }
}

// Show/hide search clear buttons based on input content
function updateSearchClearButtons() {
    if (searchInput && searchClear) {
        if (searchInput.value.trim().length > 0) {
            searchClear.classList.add('show');
        } else {
            searchClear.classList.remove('show');
        }
    }
    
    if (mobileSearchInput && mobileSearchClear) {
        if (mobileSearchInput.value.trim().length > 0) {
            mobileSearchClear.classList.add('show');
        } else {
            mobileSearchClear.classList.remove('show');
        }
    }
}

// Reset all active states
function resetAllActiveStates() {
    songs.forEach(song => {
        song.active = false;
    });
    
    document.querySelectorAll('.song-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.classList.remove('active');
    });
}

// Set correct active state for song and carousel
function setCorrectActiveState(songId, versionType) {
    document.querySelectorAll('.song-item').forEach(item => {
        const itemSongId = parseInt(item.dataset.id);
        if (itemSongId === songId) {
            item.classList.add('active');
            
            // Also update the active state of version buttons
            item.querySelectorAll('.version-btn').forEach(btn => {
                const btnType = btn.dataset.type;
                const btnSongId = parseInt(btn.dataset.id);
                
                // Only update buttons for this specific song
                if (btnSongId === songId) {
                    if (btnType === versionType) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                }
            });
            
        } else {
            item.classList.remove('active');
            
            // Deactivate all version buttons for inactive songs
            item.querySelectorAll('.version-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remove rotation from inactive songs
            const songItemArt = item.querySelector('.song-item-art');
            if (songItemArt) {
                songItemArt.classList.remove('playing', 'paused');
                songItemArt.classList.remove('selected'); // Remove selected class too
            }
        }
    });
    
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        const slideSongId = parseInt(slide.dataset.id);
        if (slideSongId === songId) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update rotation after setting active state
    updateSongArtRotation();
}

// Update UI for selected song - UPDATED: Title with version, artist without
function updateSelectedSongUI(songId, versionType) {
    if (isUIBusy) return;
    
    isUIBusy = true;
    
    if (uiUpdateTimeout) {
        clearTimeout(uiUpdateTimeout);
        uiUpdateTimeout = null;
    }
    
    requestAnimationFrame(() => {
        try {
            // Deactivate ALL songs first
            songs.forEach(song => {
                song.active = false;
            });
            
            // Then activate only the selected song
            songs.forEach((song, index) => {
                if (song.id === songId) {
                    song.active = true;
                    currentSongIndex = index;
                    song.currentType = versionType;
                    lastActiveSongId = songId;
                    lastActiveSongType = versionType;
                }
            });
            
            // Update UI with correct active state
            setCorrectActiveState(songId, versionType);
            
            // Update swiper to show correct slide
            if (swiper) {
                const slideIndex = filteredSongs.findIndex(s => s.id === songId);
                if (slideIndex >= 0) {
                    setTimeout(() => {
                        swiper.slideToLoop(slideIndex);
                    }, 10);
                }
            }
            
            // Update song info display - UPDATED: Title with version, artist clean
            const song = songs.find(s => s.id === songId);
            if (song) {
                const displayTitle = getTitleForType(song, versionType);
                const cleanArtist = getArtistForType(song, versionType);
                
                // Update all displays
                songTitleDisplay.textContent = displayTitle;
                songArtistDisplay.textContent = cleanArtist;
                mobileSongTitle.textContent = displayTitle;
                mobileSongArtist.textContent = cleanArtist;
                lyricsPlayerTitle.textContent = `${displayTitle} - ${cleanArtist}`;
                
                // NEW: Update lyrics header
                lyricsSongTitle.textContent = displayTitle;
                lyricsSongArtist.textContent = cleanArtist;
            }
            
        } catch (error) {
            console.error("Error in updateSelectedSongUI:", error);
        } finally {
            uiUpdateTimeout = setTimeout(() => {
                isUIBusy = false;
            }, 50);
        }
    });
}

// Ensure consistent active state across all songs
function ensureSingleActiveSong() {
    let activeCount = 0;
    let activeSongId = null;
    
    songs.forEach(song => {
        if (song.active) {
            activeCount++;
            activeSongId = song.id;
        }
    });
    
    // If more than one song is active or no song is active, fix it
    if (activeCount !== 1) {
        // Clear all active states
        songs.forEach(song => {
            song.active = false;
        });
        
        // If we have a last clicked song, make it active
        if (lastClickedSongId) {
            const songIndex = songs.findIndex(s => s.id === lastClickedSongId);
            if (songIndex >= 0) {
                songs[songIndex].active = true;
                currentSongIndex = songIndex;
            }
        }
        // Otherwise, make the current song index active
        else if (currentSongIndex >= 0 && currentSongIndex < songs.length) {
            songs[currentSongIndex].active = true;
        }
    }
}

// Check scroll position and show/hide mobile progress
function checkScrollForProgress() {
    if (!progressContainer || !mobileProgressContainer) return;
    
    const rect = progressContainer.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    
    // Show mobile progress when main progress is out of view
    if (!isVisible) {
        mobileProgressContainer.classList.add('show');
    } else {
        mobileProgressContainer.classList.remove('show');
    }
}

// ==================== NETWORK FUNCTIONS ====================

// Network status variables
let isOnline = navigator.onLine;
let networkNotificationShown = false;

// Check network status
function checkNetworkStatus() {
    isOnline = navigator.onLine;
    
    if (!isOnline && !networkNotificationShown) {
        showNetworkNotification("No internet connection. Please check your network.", "error", 0);
        networkNotificationShown = true;
    } else if (isOnline && networkNotificationShown) {
        hideNetworkNotification();
        networkNotificationShown = false;
        showNotification("Network connection restored", 2000);
    }
}

// Show network notification
function showNetworkNotification(message, type = "error", duration = 0) {
    // Remove any existing network notification
    hideNetworkNotification();
    
    const notification = document.createElement('div');
    notification.id = 'network-notification';
    notification.className = `network-notification ${type}`;
    notification.innerHTML = `
        <div class="network-notification-content">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            ${duration === 0 ? '<button id="closeNetworkNotification" class="network-notification-close"><i class="fas fa-times"></i></button>' : ''}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    if (duration === 0) {
        const closeBtn = document.getElementById('closeNetworkNotification');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideNetworkNotification);
        }
    }
    
    // Auto-hide if duration is set
    if (duration > 0) {
        setTimeout(() => {
            hideNetworkNotification();
        }, duration);
    }
}

// Hide network notification
function hideNetworkNotification() {
    const existing = document.getElementById('network-notification');
    if (existing) {
        existing.classList.add('hiding');
        setTimeout(() => {
            if (existing.parentNode) {
                existing.parentNode.removeChild(existing);
            }
        }, 300);
    }
}

// ==================== ANDROID BACKGROUND AUDIO FUNCTIONS ====================

// Initialize background audio features for Android
function initBackgroundAudio() {
    console.log("Initializing background audio for Android...");
    
    // Check if wake lock is supported
    isWakeLockSupported = 'wakeLock' in navigator;
    console.log("Wake Lock API supported:", isWakeLockSupported);
    
    if (isWakeLockSupported) {
        // Add visibility change listener for wake lock
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Request wake lock when audio starts playing
        audioPlayer.addEventListener('play', () => {
            console.log("Audio play event - requesting wake lock");
            if (document.hidden) {
                requestWakeLock();
            }
        });
        
        // Release wake lock when audio stops
        audioPlayer.addEventListener('pause', () => {
            console.log("Audio pause event - releasing wake lock");
            releaseWakeLock();
            stopBackgroundCheck();
        });
        
        audioPlayer.addEventListener('ended', () => {
            console.log("Audio ended event - releasing wake lock");
            releaseWakeLock();
            stopBackgroundCheck();
        });
        
        // Start background check when playing
        audioPlayer.addEventListener('playing', () => {
            console.log("Audio playing - starting background check");
            startBackgroundCheck();
        });
    }
    
    // Setup silent audio for keeping audio context alive
    setupSilentAudio();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', handlePageVisibility);
    
    // Handle beforeunload to clean up
    window.addEventListener('beforeunload', () => {
        releaseWakeLock();
        stopBackgroundCheck();
        stopSilentAudio();
    });
    
    // Setup media session for Android lock screen controls
    if ('mediaSession' in navigator) {
        setupMediaSession();
    }
}

// Setup silent audio to keep audio context alive
function setupSilentAudio() {
    try {
        silentAudio = document.createElement('audio');
        silentAudio.loop = true;
        silentAudio.volume = 0.001; // Almost silent
        silentAudio.muted = true; // Muted by default
        
        // Create a Blob with silent audio (1 second of silence in MP3 format)
        // This is a base64 encoded silent MP3
        const silentMP3 = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
        
        silentAudio.src = silentMP3;
        document.body.appendChild(silentAudio);
        
        console.log("Silent audio setup complete");
        
    } catch (error) {
        console.error("Failed to setup silent audio:", error);
    }
}

// Start silent audio playback
function startSilentAudio() {
    if (!silentAudio) return;
    
    try {
        silentAudio.muted = false;
        silentAudio.play().then(() => {
            console.log("Silent audio started");
        }).catch(e => {
            console.log("Could not start silent audio:", e);
        });
    } catch (error) {
        console.error("Error starting silent audio:", error);
    }
}

// Stop silent audio
function stopSilentAudio() {
    if (!silentAudio) return;
    
    try {
        silentAudio.pause();
        silentAudio.currentTime = 0;
        silentAudio.muted = true;
        console.log("Silent audio stopped");
    } catch (error) {
        console.error("Error stopping silent audio:", error);
    }
}

// Handle page visibility changes
function handlePageVisibility() {
    if (document.hidden) {
        console.log("Page went to background/sleep mode");
        isInBackground = true;
        
        // Start silent audio to keep audio context alive
        if (isPlaying) {
            startSilentAudio();
        }
        
        // Start aggressive background checks
        if (isPlaying) {
            startBackgroundCheck();
        }
        
    } else {
        console.log("Page came to foreground");
        isInBackground = false;
        
        // Stop silent audio when in foreground
        stopSilentAudio();
        
        // Reduce background check frequency
        if (isPlaying) {
            adjustBackgroundCheckFrequency();
        }
    }
}

// Start background audio check
function startBackgroundCheck() {
    // Clear any existing interval
    stopBackgroundCheck();
    
    if (!isPlaying) return;
    
    console.log("Starting background audio check for Android sleep mode");
    
    // Set up periodic check to keep audio alive
    backgroundCheckInterval = setInterval(() => {
        if (isInBackground && isPlaying) {
            checkAndResumeAudio();
        }
    }, 10000); // Check every 10 seconds when in background/sleep
}

// Adjust background check frequency based on visibility
function adjustBackgroundCheckFrequency() {
    if (!backgroundCheckInterval) return;
    
    clearInterval(backgroundCheckInterval);
    
    if (isPlaying) {
        backgroundCheckInterval = setInterval(() => {
            checkAndResumeAudio();
        }, 30000); // Check every 30 seconds when in foreground
    }
}

// Stop background check
function stopBackgroundCheck() {
    if (backgroundCheckInterval) {
        clearInterval(backgroundCheckInterval);
        backgroundCheckInterval = null;
        console.log("Background check stopped");
    }
}

// Check and resume audio if needed
function checkAndResumeAudio() {
    if (!isPlaying) return;
    
    console.log("Background check: Checking audio status...");
    
    // Check if audio is paused but should be playing
    if (audioPlayer.paused) {
        console.log("Audio paused in background/sleep mode, attempting to resume...");
        
        // Start silent audio first to wake up audio context
        startSilentAudio();
        
        // Try to resume main audio playback
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Audio successfully resumed in background");
            }).catch(error => {
                console.error("Failed to resume audio in background:", error);
                
                // If wake lock issue, try to reacquire
                if (error.name === 'NotAllowedError' && isWakeLockSupported && document.hidden) {
                    console.log("Trying to reacquire wake lock...");
                    requestWakeLock().then(() => {
                        // Try playing again after getting wake lock
                        setTimeout(() => {
                            audioPlayer.play().catch(e => {
                                console.error("Still can't resume audio:", e);
                            });
                        }, 500);
                    });
                }
            });
        }
    }
    
    // Re-acquire wake lock if lost
    if (isWakeLockSupported && document.hidden && isPlaying && wakeLock === null) {
        console.log("Wake lock lost, reacquiring...");
        requestWakeLock();
    }
    
    // Update progress even in background
    updateProgress();
}

// Setup media session for Android lock screen controls
function setupMediaSession() {
    if (!('mediaSession' in navigator)) return;
    
    console.log("Setting up Android media session");
    
    navigator.mediaSession.setActionHandler('play', () => {
        console.log("Media session: Play button pressed");
        if (!isPlaying) {
            playAudio();
        }
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
        console.log("Media session: Pause button pressed");
        if (isPlaying) {
            pauseAudio();
        }
    });
    
    navigator.mediaSession.setActionHandler('previoustrack', () => {
        console.log("Media session: Previous button pressed");
        playPrevSong();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', () => {
        console.log("Media session: Next button pressed");
        playNextSong();
    });
    
    // Update media session metadata when song changes
    audioPlayer.addEventListener('play', () => {
        const song = songs[currentSongIndex];
        if (song && 'mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: getTitleForType(song, song.currentType),
                artist: getArtistForType(song, song.currentType),
                album: "Music Player",
                artwork: [
                    { src: song.image, sizes: '96x96', type: 'image/jpeg' },
                    { src: song.image, sizes: '128x128', type: 'image/jpeg' },
                    { src: song.image, sizes: '192x192', type: 'image/jpeg' },
                    { src: song.image, sizes: '256x256', type: 'image/jpeg' },
                    { src: song.image, sizes: '384x384', type: 'image/jpeg' },
                    { src: song.image, sizes: '512x512', type: 'image/jpeg' }
                ]
            });
        }
    });
}

// Request wake lock to keep audio playing in background
async function requestWakeLock() {
    if (!isWakeLockSupported) {
        console.log("Wake Lock API not supported");
        return null;
    }
    
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log("✅ Wake Lock acquired successfully");
        
        // Handle wake lock release
        wakeLock.addEventListener('release', () => {
            console.log("⚠️ Wake Lock was released by system");
            wakeLock = null;
            
            // Try to reacquire if still playing in background
            if (isPlaying && document.hidden) {
                console.log("🔄 Wake lock released while playing, reacquiring...");
                setTimeout(() => {
                    requestWakeLock();
                }, 1000);
            }
        });
        
        return wakeLock;
        
    } catch (err) {
        console.error(`❌ Failed to acquire Wake Lock: ${err.name}, ${err.message}`);
        
        // Try again in 2 seconds if failed
        if (isPlaying && document.hidden) {
            setTimeout(() => {
                console.log("🔄 Retrying wake lock acquisition...");
                requestWakeLock();
            }, 2000);
        }
        
        return null;
    }
}

// Release wake lock
async function releaseWakeLock() {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
            wakeLock = null;
            console.log("✅ Wake Lock released manually");
        } catch (err) {
            console.error("❌ Error releasing wake lock:", err);
        }
    }
}

// Handle visibility change for wake lock
function handleVisibilityChange() {
    if (document.hidden && isPlaying && isWakeLockSupported) {
        // Screen locked or device in sleep mode - request wake lock
        console.log("📱 Screen locked/device sleeping, requesting wake lock...");
        requestWakeLock();
        
        // Also start background checks
        startBackgroundCheck();
        
    } else if (!document.hidden && wakeLock !== null) {
        // Screen unlocked or device awake - release wake lock
        console.log("📱 Screen unlocked, releasing wake lock...");
        releaseWakeLock();
        
        // Adjust background check frequency
        adjustBackgroundCheckFrequency();
    }
}

// ==================== ABOUT MODAL FUNCTIONS ====================

// Create About modal
function createAboutModal() {
    const aboutModalHTML = `
        <div class="about-modal" id="aboutModal">
            <div class="about-container">
                <div class="about-header">
                    <h2 class="about-title">About Chillax Tamil Karaoke</h2>
                    <button class="close-about" id="closeAbout">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="about-content">
                    <h3>Welcome to Chillax Tamil Karaoke!</h3>
                    <p>Your ultimate companion for Tamil karaoke and music enjoyment. Sing along with your favorite Tamil songs with high-quality karaoke tracks.</p>
                    
                    <h3>Features:</h3>
                    <ul>
                        <li>🎵 Extensive collection of Tamil karaoke songs</li>
                        <li>🎤 Multiple versions: Male, Female, Duet, Original</li>
                        <li>📱 Mobile-friendly responsive design</li>
                        <li>🌙 Dark/Light mode support</li>
                        <li>❤️ Add songs to favorites</li>
                        <li>📖 Lyrics display with sync</li>
                        <li>🔍 Easy search functionality</li>
                        <li>🎧 Background audio support</li>
                    </ul>
                    
                    <h3>How to Use:</h3>
                    <p>1. Browse songs by category or use search</p>
                    <p>2. Select a song to start playing</p>
                    <p>3. Switch between different versions</p>
                    <p>4. View lyrics in sync with music</p>
                    <p>5. Add your favorite songs to Favorites</p>
                    
                    <h3>Tips:</h3>
                    <p>• Use headphones for better karaoke experience</p>
                    <p>• Enable Auto Play for continuous playback</p>
                    <p>• Use Dark mode in low-light conditions</p>
                    
                    <div class="app-version">
                        <p>Version 2.0.0</p>
                        <p>© 2024 Chillax Technologies. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', aboutModalHTML);
}

// ==================== SEARCH BOX HANDLING ====================

// Close mobile search when clicking outside
function closeMobileSearchOnOutsideClick(e) {
    // Don't close on scroll events (touchmove, wheel, etc.)
    if (e.type === 'touchmove' || e.type === 'wheel' || e.type === 'scroll') {
        return;
    }
    
    // If search is open and user clicks outside the search container
    if (isMobileSearchOpen && 
        !mobileSearchContainer.contains(e.target) && 
        !mobileSearchToggle.contains(e.target)) {
        
        // Check if the click is on a song item or version button
        const clickedSongItem = e.target.closest('.song-item');
        const clickedVersionBtn = e.target.closest('.version-btn');
        
        // If clicking on a song or version button, close search
        if (clickedSongItem || clickedVersionBtn) {
            closeMobileSearch();
        }
        // If clicking elsewhere (not on song list), close search
        else if (!songListContainer.contains(e.target)) {
            closeMobileSearch();
        }
    }
}

// Close mobile search when a song is selected
function closeMobileSearchOnSongSelect() {
    if (isMobileSearchOpen) {
        closeMobileSearch();
    }
}

// Open mobile search
function openMobileSearch() {
    isMobileSearchOpen = true;
    mobileSearchContainer.classList.add('active');
    
    // Focus on input
    setTimeout(() => {
        mobileSearchInput.focus();
    }, 100);
    
    // Add click listener to document to close when clicking outside
    document.addEventListener('click', closeMobileSearchOnOutsideClick);
    document.addEventListener('touchstart', closeMobileSearchOnOutsideClick);
}

// Close mobile search
function closeMobileSearch() {
    isMobileSearchOpen = false;
    mobileSearchContainer.classList.remove('active');
    
    // Clear search if needed
    mobileSearchInput.value = '';
    handleSearch({ target: mobileSearchInput });
    
    // Remove click listeners
    document.removeEventListener('click', closeMobileSearchOnOutsideClick);
    document.removeEventListener('touchstart', closeMobileSearchOnOutsideClick);
}

// Toggle mobile search
function toggleMobileSearch() {
    markUserInteraction();
    
    if (isMobileSearchOpen) {
        closeMobileSearch();
    } else {
        openMobileSearch();
    }
}

// ==================== INITIALIZE APP ====================

// Initialize the app
function init() {
    console.log("=== INITIALIZING APP FOR ANDROID BACKGROUND AUDIO ===");
    
    favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    
    // Initialize network monitoring
    checkNetworkStatus();
    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);
    
    // Initialize background audio features FIRST
    initBackgroundAudio();
    
    // Create About modal
    createAboutModal();
    
    // Start with "list" filter active
    currentFilterType = "list";
    filteredSongs = filterSongsByType(currentFilterType);
    updateActiveFilterButton(currentFilterType);
    
    // Initialize song properties dynamically
    songs.forEach(song => {
        // Set currentType to first available audio type (not podcast)
        if (!song.currentType) {
            const audioTypes = song.availableTypes.filter(type => 
                type !== "podcast" && getAudioForType(song, type)
            );
            song.currentType = audioTypes.length > 0 ? audioTypes[0] : "male";
        }
        
        // Initialize active state - ALL FALSE at start
        song.active = false;
    });
    
    // DON'T ensure single active song - let there be NO active song at start
    // ensureSingleActiveSong();
    
    renderSongList();
    renderCarousel();
    initSwiper();
    
    // DON'T select any song initially
    // if (filteredSongs.length > 0) {
    //     const firstSong = filteredSongs[0];
    //     const originalIndex = songs.findIndex(s => s.id === firstSong.id);
    //     if (originalIndex >= 0) {
    //         currentSongIndex = originalIndex;
    //         songs[originalIndex].active = true;
    //         lastClickedSongId = firstSong.id;
    //         lastActiveSongId = firstSong.id;
    //         lastActiveSongType = songs[originalIndex].currentType;
            
    //         // Update UI for the active song
    //         updateSelectedSongUI(firstSong.id, songs[originalIndex].currentType);
    //         loadSong(originalIndex, false);
    //     }
    // }
    
    setupEventListeners();
    setupAudioEvents();
    setupSidebarMenu();
    setupAutoPlayToggle();
    
    // ADD THIS: Specific handler for list button to ensure correct notification
    const listButton = document.querySelector('[data-type="list"]');
    if (listButton) {
        // Remove any existing click listeners to avoid duplicates
        const newListButton = listButton.cloneNode(true);
        listButton.parentNode.replaceChild(newListButton, listButton);
        
        // Add the correct event listener
        newListButton.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation(); // Prevent event bubbling
            console.log("List button specifically clicked - Song List Loaded");
            applyFilter("list");
        });
        
        // Also add to type-filter-btn class if it has it
        const typeFilterListButtons = document.querySelectorAll('.type-filter-btn[data-type="list"]');
        typeFilterListButtons.forEach(btn => {
            if (btn !== newListButton) {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', (e) => {
                    markUserInteraction();
                    e.stopPropagation();
                    console.log("Type filter list button clicked - Song List Loaded");
                    applyFilter("list");
                });
            }
        });
    }
    
    // Add scroll listener for progress visibility
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            checkScrollForProgress();
        }, 100);
    }, { passive: true });
    
    if (favoriteSongs.length > 0) {
        const firstFavoriteId = favoriteSongs[0];
        updateFavoriteButtonUI(firstFavoriteId);
    }
    
    updateSearchClearButtons();
    updateSidebarWithCounts();
    
    // Show initial notification
    showNotification("Song List Loaded", 2000);
    
    // Set default display text since no song is selected
    songTitleDisplay.textContent = "Select a song";
    songArtistDisplay.textContent = "";
    mobileSongTitle.textContent = "Select a song";
    mobileSongArtist.textContent = "";
    lyricsPlayerTitle.textContent = "Select a song";
    
    // NEW: Set default lyrics header
    lyricsSongTitle.textContent = "Select a song";
    lyricsSongArtist.textContent = "";
    
    // Initial check
    setTimeout(() => {
        checkScrollForProgress();
    }, 500);
    
    // Setup About modal event listeners
    const aboutModal = document.getElementById('aboutModal');
    const closeAbout = document.getElementById('closeAbout');
    
    if (closeAbout) {
        closeAbout.addEventListener('click', () => {
            aboutModal.classList.remove('active');
        });
    }
    
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
            }
        });
    }
}

// Initialize Swiper carousel
function initSwiper() {
    swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                const realIndex = this.realIndex;
                if (realIndex < filteredSongs.length) {
                    const song = filteredSongs[realIndex];
                    const originalIndex = songs.findIndex(s => s.id === song.id);
                    if (originalIndex >= 0 && originalIndex !== currentSongIndex) {
                        setActiveSong(originalIndex);
                    }
                }
            }
        }
    });
}

// Render carousel - UPDATED: Title with version, artist clean
function renderCarousel() {
    carouselContainer.innerHTML = '';
    
    filteredSongs.forEach((song, index) => {
        const slide = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        slide.className = `swiper-slide ${isActive ? 'active' : ''}`;
        slide.dataset.index = index;
        slide.dataset.id = song.id;
        
        const currentType = song.currentType || currentFilterType;
        
        // UPDATED: Use versioned title for carousel
        const displayTitle = getTitleForType(song, currentType);
        const cleanArtist = getArtistForType(song, currentType);
        
        slide.innerHTML = `
            <div class="carousel-slide">
                <img src="${song.image}" alt="${displayTitle}" onerror="this.src='images/defaultphoto.jpg'">
                <div class="carousel-info">
                    <h4 class="carousel-title">${displayTitle}</h4>
                    <p class="carousel-artist">${cleanArtist}</p>
                </div>
            </div>
        `;
        
        slide.addEventListener('click', () => {
            markUserInteraction();
            
            // Close mobile search when a song is selected
            closeMobileSearchOnSongSelect();
            
            lastClickedSongId = song.id;
            lastClickedTrackId = song.trackId;
            lastActiveSongId = song.id;
            lastActiveSongType = currentType;
            
            const originalIndex = songs.findIndex(s => s.id === song.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        });
        
        carouselContainer.appendChild(slide);
    });
}

// Render song list - UPDATED: Title with version, artist clean
function renderSongList() {
    songListContainer.innerHTML = '';
    
    if (filteredSongs.length === 0 && currentFilterType === "favourite") {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-heart" style="font-size: 48px; margin-bottom: 10px; color: #ff4757;"></i>
                <p>No favorite songs yet</p>
                <p style="font-size: 14px; margin-top: 10px;">Click the heart icon to add songs to favorites</p>
            </div>
        `;
        return;
    }
    
    if (filteredSongs.length === 0) {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="${getSongTypeIcon(currentFilterType)}" style="font-size: 48px; margin-bottom: 10px;"></i>
                <p>No ${getTypeDisplayName(currentFilterType)} songs available</p>
                <p style="font-size: 14px; margin-top: 10px;">Try another version type</p>
            </div>
        `;
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        songItem.className = `song-item ${isActive ? 'active' : ''}`;
        songItem.dataset.id = song.id;
        songItem.dataset.index = index;
        
        // Get the current type for this song
        const currentType = song.currentType || song.availableTypes[0];
        const iconClass = getSongTypeIcon(currentType);
        const isFavorite = favoriteSongs.includes(song.id);
        
        let versionSelector = '';
        
        // Determine which types to show
        let typesToShow = [];
        
        if (currentFilterType === "list") {
            // In list mode: show ALL available types INCLUDING podcast
            typesToShow = song.availableTypes.filter(t => getAudioForType(song, t) || t === "podcast");
        } else if (currentFilterType === "favourite") {
            // In favourite mode: show ALL available types for favorited songs
            typesToShow = song.availableTypes.filter(t => getAudioForType(song, t) || t === "podcast");
        } else {
            // In other filter modes (male, female, duet, song): 
            // Show ALL audio types that the song has, plus podcast if available
            const audioTypes = song.availableTypes.filter(t => getAudioForType(song, t));
            const hasPodcast = song.availableTypes.includes("podcast") && song.lyrics && song.lyrics.trim() !== '';
            
            typesToShow = [...audioTypes];
            if (hasPodcast) {
                typesToShow.push("podcast");
            }
        }
        
        typesToShow.forEach(type => {
            // Check if this button should be active
            const isCurrent = (song.active && type === song.currentType && type !== "podcast");
            const audioPath = getAudioForType(song, type);
            
            if (type === "podcast") {
                // Show lyrics button if song has lyrics
                if (song.lyrics && song.lyrics.trim() !== '') {
                    versionSelector += `
                        <button class="version-btn lyrics-btn" 
                                data-id="${song.id}" 
                                data-type="${type}"
                                title="Show Lyrics">
                            <i class="fas fa-podcast"></i>
                        </button>
                    `;
                }
            } else if (audioPath) {
                const btnTitle = type === "song" ? "Original" : 
                                type === "male" ? "Male" :
                                type === "female" ? "Female" : 
                                "Duet";
                
                versionSelector += `
                    <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                            data-id="${song.id}" 
                            data-type="${type}"
                            title="${btnTitle} Version">
                        <i class="${getSongTypeIcon(type)}"></i>
                    </button>
                `;
            }
        });
        
        // Show favorite button in version-selector ONLY for NON-list modes
        if (currentFilterType !== "list") {
            versionSelector += `
                <button class="version-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="favourite"
                        title="${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}">
                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
            `;
        }
        
        // UPDATED: Determine which title and artist to show
        let displayTitle = '';
        let artistName = '';
        
        if (currentFilterType === "list") {
            // In list mode: Show plain title and clean artist name
            displayTitle = song.title;
            artistName = getArtistForType(song, currentType);
        } else {
            // In other modes: Show versioned title and clean artist name
            displayTitle = getTitleForType(song, currentType);
            artistName = getArtistForType(song, currentType);
        }
        
        // Determine which icon to show in .song-item-type
        let typeIconHtml = '';
        if (currentFilterType === "list") {
            // In list mode: show heart icon
            typeIconHtml = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart" 
                               data-id="${song.id}"
                               title="${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}"></i>`;
        } else {
            // In other modes: show the normal version icon
            typeIconHtml = `<i class="${iconClass}"></i>`;
        }
        
        songItem.innerHTML = `
            <div class="song-item-art">
                <img src="${song.image}" alt="${displayTitle}" onerror="this.src='images/defaultphoto.jpg'">
            </div>
            <div class="song-item-info">
                <h4 class="song-item-title">${displayTitle}</h4>
                <p class="song-item-artist">${artistName}</p>
                <div class="version-selector">
                    ${versionSelector}
                </div>
            </div>
            <div class="song-item-type">
                ${typeIconHtml}
            </div>
        `;
        
        // Handle favorite button in version-selector (for non-list modes only)
        if (currentFilterType !== "list") {
            const favoriteBtn = songItem.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', (e) => {
                    markUserInteraction();
                    e.stopPropagation();
                    const songId = parseInt(e.currentTarget.dataset.id);
                    toggleFavorite(songId);
                });
            }
        }
        
        // Handle heart icon in .song-item-type (for list mode)
        if (currentFilterType === "list") {
            const heartIcon = songItem.querySelector('.song-item-type i');
            if (heartIcon) {
                heartIcon.addEventListener('click', (e) => {
                    markUserInteraction();
                    e.stopPropagation();
                    const songId = parseInt(e.currentTarget.dataset.id);
                    const wasAdded = toggleFavorite(songId);
                    
                    // Update the icon immediately
                    if (wasAdded) {
                        e.currentTarget.className = 'fas fa-heart';
                        e.currentTarget.title = 'Remove from Favorites';
                    } else {
                        e.currentTarget.className = 'far fa-heart';
                        e.currentTarget.title = 'Add to Favorites';
                    }
                });
            }
        }
        
        // Version button click handler - UPDATED for lyrics modal
        songItem.querySelectorAll('.version-btn.audio-btn, .version-btn.lyrics-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                markUserInteraction();
                e.stopPropagation();
                
                // Close mobile search when a version is selected
                closeMobileSearchOnSongSelect();
                
                const songId = parseInt(btn.dataset.id);
                const versionType = btn.dataset.type;
                
                const songIndex = songs.findIndex(s => s.id === songId);
                if (songIndex < 0) return;
                
                lastClickedSongId = songId;
                lastActiveSongId = songId;
                lastActiveSongType = versionType;
                
                // If it's a lyrics button, open lyrics modal
                if (versionType === "podcast") {
                    const song = songs[songIndex];
                    // UPDATED: Pass title and artist to loadLyrics
                    const displayTitle = getTitleForType(song, song.currentType);
                    const cleanArtist = getArtistForType(song, song.currentType);
                    loadLyrics(song.lyrics, displayTitle, cleanArtist);
                    lyricsModal.classList.add('active');
                    
                    // DON'T activate the song or change its currentType
                    return;
                }
                
                // For audio versions only:
                songs.forEach(s => {
                    s.active = false;
                });
                
                songs[songIndex].active = true;
                songs[songIndex].currentType = versionType;
                
                updateSelectedSongUI(songId, versionType);
                loadSong(songIndex, isAutoPlayEnabled);
                
                if (currentFilterType !== "list" && currentFilterType !== "favourite" && versionType !== currentFilterType) {
                    currentFilterType = versionType;
                    filteredSongs = filterSongsByType(versionType);
                    
                    setTimeout(() => {
                        updateActiveFilterButton(versionType);
                        updateSidebarWithCounts();
                        
                        renderSongList();
                        renderCarousel();
                        
                        if (swiper) {
                            swiper.destroy(true, true);
                            initSwiper();
                        }
                        
                        updateSelectedSongUI(songId, versionType);
                    }, 50);
                }
            });
        });
        
        songItem.addEventListener('click', (e) => {
            // Don't trigger if clicking on version buttons
            if (e.target.closest('.version-btn')) {
                return;
            }
            
            // Don't trigger if clicking on heart icon in list mode
            if (currentFilterType === "list" && e.target.closest('.song-item-type i')) {
                return;
            }
            
            markUserInteraction();
            
            // Close mobile search when a song is selected
            closeMobileSearchOnSongSelect();
            
            lastClickedSongId = song.id;
            lastActiveSongId = song.id;
            lastActiveSongType = song.currentType || song.availableTypes[0];
            
            const originalIndex = songs.findIndex(s => s.id === song.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        });
        
        fragment.appendChild(songItem);
    });
    
    songListContainer.appendChild(fragment);
}

// Load a song - FIXED VERSION
function loadSong(index, autoPlay = true) {
    if (isAudioLoading) {
        return;
    }
    
    // Check network before loading
    if (!isOnline) {
        showNetworkNotification("No internet connection. Cannot load song.", "error", 3000);
        return;
    }
    
    audioLoading.classList.add('active');
    isAudioLoading = true;
    
    currentSongIndex = index;
    const song = songs[index];
    const currentType = song.currentType || song.availableTypes[0];
    
    lastClickedSongId = song.id;
    lastActiveSongId = song.id;
    lastActiveSongType = currentType;
    
    // Set this song as active
    songs.forEach((s, i) => {
        s.active = (i === index);
    });
    
    setCorrectActiveState(song.id, currentType);
    
    // UPDATED: Get versioned title and clean artist
    const displayTitle = getTitleForType(song, currentType);
    const cleanArtist = getArtistForType(song, currentType);
    
    // Update all displays
    songTitleDisplay.textContent = displayTitle;
    songArtistDisplay.textContent = cleanArtist;
    mobileSongTitle.textContent = displayTitle;
    mobileSongArtist.textContent = cleanArtist;
    lyricsPlayerTitle.textContent = `${displayTitle} - ${cleanArtist}`;
    
    // NEW: Update lyrics header
    lyricsSongTitle.textContent = displayTitle;
    lyricsSongArtist.textContent = cleanArtist;
    
    if (swiper) {
        const slideIndex = filteredSongs.findIndex(s => s.id === song.id);
        if (slideIndex >= 0) {
            setTimeout(() => {
                swiper.slideToLoop(slideIndex);
            }, 10);
        }
    }
    
    // UPDATED: Pass title and artist to loadLyrics (without showing them in text)
    loadLyrics(song.lyrics, displayTitle, cleanArtist);
    
    if (isAudioType(currentType)) {
        const audioPath = getAudioForType(song, currentType);
        
        if (audioPath) {
            console.log("Loading audio from:", audioPath);
            
            // Stop current audio
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            isPlaying = false;
            updatePlayButtons();
            
            // Reset progress
            progress.style.width = "0%";
            lyricsProgress.style.width = "0%";
            mobileProgress.style.width = "0%";
            currentTimeEl.textContent = "0:00";
            lyricsCurrentTime.textContent = "0:00";
            mobileCurrentTime.textContent = "0:00";
            
            // Clear any existing event listeners
            audioPlayer.oncanplay = null;
            audioPlayer.oncanplaythrough = null;
            audioPlayer.onerror = null;
            audioPlayer.onloadeddata = null;
            audioPlayer.onloadedmetadata = null;
            
            // Set up new audio source
            audioPlayer.src = audioPath;
            
            // Load the audio
            const playAudioAfterLoad = () => {
                console.log("Audio loaded successfully, readyState:", audioPlayer.readyState);
                audioLoading.classList.remove('active');
                audioLoading.textContent = "";
                isAudioLoading = false;
                
                let versionName = "";
                if (currentType === "male") versionName = "Male";
                else if (currentType === "female") versionName = "Female";
                else if (currentType === "duet") versionName = "Duet";
                else if (currentType === "song") versionName = "Original";
                else if (currentType === "favourite") versionName = "Favourite";
                else versionName = currentType.charAt(0).toUpperCase() + currentType.slice(1);
                
                // Don't show version loaded notification when in list mode
                if (currentFilterType !== "list") {
                    showNotification(`${versionName} version loaded`, 2000);
                }
                
                // Auto play if enabled
                const shouldAutoPlay = autoPlay && isAutoPlayEnabled;
                if (shouldAutoPlay) {
                    console.log("Auto-playing audio...");
                    setTimeout(() => {
                        playAudio();
                    }, 300);
                }
            };
            
            // Handle successful load
            audioPlayer.onloadeddata = playAudioAfterLoad;
            audioPlayer.oncanplay = playAudioAfterLoad;
            
            // Handle errors
            audioPlayer.onerror = (e) => {
                console.error("Audio loading error:", e, audioPlayer.error);
                
                let versionName = "";
                if (currentType === "male") versionName = "Male";
                else if (currentType === "female") versionName = "Female";
                else if (currentType === "duet") versionName = "Duet";
                else if (currentType === "song") versionName = "Original";
                else if (currentType === "favourite") versionName = "Favourite";
                else versionName = currentType.charAt(0).toUpperCase() + currentType.slice(1);
                
                let errorMessage = `Cannot load ${versionName} version`;
                
                if (audioPlayer.error) {
                    switch(audioPlayer.error.code) {
                        case 1:
                            errorMessage = "Audio aborted (user cancelled)";
                            break;
                        case 2:
                            errorMessage = `Network error loading ${versionName} version`;
                            break;
                        case 3:
                            errorMessage = `Decoding error in ${versionName} audio`;
                            break;
                        case 4:
                            errorMessage = `${versionName} version not supported`;
                            break;
                        default:
                            errorMessage = `Error code ${audioPlayer.error.code}: ${audioPlayer.error.message}`;
                    }
                }
                
                // Check if it's a network error
                if (errorMessage.includes("Network") || errorMessage.includes("network")) {
                    showNetworkNotification("Network error. Check your connection.", "error", 3000);
                }
                
                audioLoading.textContent = errorMessage;
                audioPlayer.src = "";
                isPlaying = false;
                updatePlayButtons();
                isAudioLoading = false;
                
                setTimeout(() => {
                    audioLoading.classList.remove('active');
                    audioLoading.textContent = "";
                }, 3000);
                
                showNotification(errorMessage, 3000);
            };
            
            // Load the audio
            audioPlayer.load();
            
        } else {
            // No audio available
            let versionName = "";
            if (currentType === "male") versionName = "Male";
            else if (currentType === "female") versionName = "Female";
            else if (currentType === "duet") versionName = "Duet";
            else if (currentType === "song") versionName = "Original";
            else if (currentType === "favourite") versionName = "Favourite";
            else versionName = currentType.charAt(0).toUpperCase() + currentType.slice(1);
            
            audioLoading.textContent = `${versionName} version not available`;
            audioPlayer.src = "";
            isPlaying = false;
            updatePlayButtons();
            isAudioLoading = false;
            
            setTimeout(() => {
                audioLoading.classList.remove('active');
                audioLoading.textContent = "";
            }, 2000);
            
            showNotification(`${versionName} version not available`, 2000);
        }
    } else {
        // Non-audio type (lyrics, favorites)
        let loadingText = "";
        if (currentType === "favourite") {
            loadingText = "Favorite song";
            showNotification("Favourite version loaded", 2000);
        } else {
            loadingText = "Showing lyrics only";
        }
        
        audioLoading.textContent = loadingText;
        audioPlayer.src = "";
        isPlaying = false;
        updatePlayButtons();
        isAudioLoading = false;
        
        setTimeout(() => {
            audioLoading.classList.remove('active');
            audioLoading.textContent = "";
        }, 1000);
    }
}

// Set active song
function setActiveSong(index) {
    if (index < 0 || index >= songs.length) {
        return;
    }
    
    currentSongIndex = index;
    const song = songs[index];
    const currentType = song.currentType || song.availableTypes[0];
    
    // Update last clicked IDs
    lastClickedSongId = songs[index].id;
    lastClickedTrackId = songs[index].trackId;
    lastActiveSongId = songs[index].id;
    lastActiveSongType = currentType;
    
    // First, deactivate ALL other songs
    songs.forEach((s, i) => {
        s.active = (i === index);
    });
    
    // Update UI
    updateSelectedSongUI(song.id, currentType);
    
    // Load the song with auto-play
    loadSong(index, isAutoPlayEnabled);
}

// Update song UI - UPDATED: Title with version, artist clean
function updateSongUI(song, type) {
    const displayTitle = getTitleForType(song, type);
    const cleanArtist = getArtistForType(song, type);
    
    // Update all displays
    songTitleDisplay.textContent = displayTitle;
    songArtistDisplay.textContent = cleanArtist;
    mobileSongTitle.textContent = displayTitle;
    mobileSongArtist.textContent = cleanArtist;
    lyricsPlayerTitle.textContent = `${displayTitle} - ${cleanArtist}`;
    
    // NEW: Update lyrics header
    lyricsSongTitle.textContent = displayTitle;
    lyricsSongArtist.textContent = cleanArtist;
    
    document.querySelectorAll('.song-item').forEach(item => {
        const songId = parseInt(item.dataset.id);
        if (songId === song.id) {
            if (!item.classList.contains('active')) {
                item.classList.add('active');
            }
            
            item.querySelectorAll('.version-btn').forEach(btn => {
                const btnType = btn.dataset.type;
                if (btnType === type) {
                    if (!btn.classList.contains('active')) {
                        btn.classList.add('active');
                    }
                } else {
                    btn.classList.remove('active');
                }
            });
            
            const favoriteBtn = item.querySelector('.favorite-btn');
            if (favoriteBtn) {
                const isFavorite = favoriteSongs.includes(songId);
                const icon = favoriteBtn.querySelector('i');
                icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
                favoriteBtn.classList.toggle('active', isFavorite);
            }
        } else {
            item.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        const slideSongId = parseInt(slide.dataset.id);
        if (slideSongId === song.id) {
            if (!slide.classList.contains('active')) {
                slide.classList.add('active');
            }
            
            // Update carousel title and artist
            const titleElement = slide.querySelector('.carousel-title');
            const artistElement = slide.querySelector('.carousel-artist');
            if (titleElement) {
                titleElement.textContent = displayTitle;
            }
            if (artistElement) {
                artistElement.textContent = cleanArtist;
            }
        } else {
            slide.classList.remove('active');
        }
    });
    
    currentTimeEl.textContent = "0:00";
    lyricsCurrentTime.textContent = "0:00";
    mobileCurrentTime.textContent = "0:00";
    totalTimeEl.textContent = "0:00";
    lyricsTotalTime.textContent = "0:00";
    mobileTotalTime.textContent = "0:00";
    progress.style.width = "0%";
    lyricsProgress.style.width = "0%";
    mobileProgress.style.width = "0%";
}

// Load lyrics from file - UPDATED: Show title and artist ONLY in header, not in text
async function loadLyrics(lyricsFile, songTitle, songArtist) {
    try {
        // Set title and artist in lyrics header
        lyricsSongTitle.textContent = songTitle;
        lyricsSongArtist.textContent = songArtist;
        
        // Set loading text for lyrics content
        lyricsText.textContent = "Loading lyrics...";
        
        if (!lyricsFile || lyricsFile.trim() === '') {
            lyricsText.textContent = "No lyrics available for this song.";
            return;
        }
    
        // Check network before loading lyrics
        if (!isOnline) {
            showNetworkNotification("No internet connection. Cannot load lyrics.", "error", 3000);
            lyricsText.textContent = "No internet connection. Cannot load lyrics.";
            return;
        }
        
        const response = await fetch(lyricsFile);
        if (response.ok) {
            const lyricsContent = await response.text();
            // Only show the lyrics text, NOT the title and artist (they're in the header)
            lyricsText.textContent = lyricsContent.trim();
        } else {
            lyricsText.textContent = "Lyrics file not found.";
        }
    } catch (error) {
        // Check if it's a network error
        if (error.message.includes("network") || error.message.includes("Network")) {
            showNetworkNotification("Network error loading lyrics.", "error", 3000);
        }
        lyricsText.textContent = "Error loading lyrics.";
    }
}

// Apply filter
function applyFilter(type) {
    console.log("=== APPLY FILTER CALLED ===");
    console.log("Filter type:", type);
    
    // Check network if loading audio files
    if (type !== "list" && type !== "favourite" && type !== "about" && !isOnline) {
        showNetworkNotification("No internet connection. Cannot load songs.", "error", 3000);
        return;
    }
    
    // Show appropriate notification based on filter type
    if (type === "male") {
        showNotification("Male version loaded", 2000);
    } else if (type === "female") {
        showNotification("Female version loaded", 2000);
    } else if (type === "duet") {
        showNotification("Duet version loaded", 2000);
    } else if (type === "song") {
        showNotification("Original version loaded", 2000);
    } else if (type === "favourite") {
        showNotification("Favourite version loaded", 2000);
    } else if (type === "podcast") {
        showNotification("Showing lyrics", 2000);
    } else if (type === "list") {
        showNotification("Song List Loaded", 2000);
    }
    
    if (type === "podcast") {
        currentFilterType = "list";
        filteredSongs = songs.filter(song => song.availableTypes.includes("podcast"));
    } else if (type === "favourite") {
        currentFilterType = "favourite";
        filteredSongs = filterSongsByType("favourite");
    } else if (type === "about") {
        // These are handled separately in sidebar menu
        return;
    } else {
        currentFilterType = type;
        filteredSongs = filterSongsByType(type);
    }
    
    updateActiveFilterButton(type);
    
    if (filteredSongs.length === 0) {
        let message = "";
        if (type === "favourite") {
            message = `
                <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-heart" style="font-size: 48px; margin-bottom: 10px; color: #ff4757;"></i>
                    <p>No favorite songs yet</p>
                    <p style="font-size: 14px; margin-top: 10px;">Click the heart icon to add songs to favorites</p>
                </div>
            `;
        } else {
            message = `
                <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="${getSongTypeIcon(type)}" style="font-size: 48px; margin-bottom: 10px;"></i>
                    <p>No ${getTypeDisplayName(type)} songs available</p>
                    <p style="font-size: 14px; margin-top: 10px;">Try another version type</p>
                </div>
            `;
        }
        
        songListContainer.innerHTML = message;
        
        carouselContainer.innerHTML = '';
        pauseAudio();
        
        songTitleDisplay.textContent = "Select a song";
        songArtistDisplay.textContent = "";
        mobileSongTitle.textContent = "Select a song";
        mobileSongArtist.textContent = "";
        lyricsPlayerTitle.textContent = "Select a song";
        
        // NEW: Update lyrics header
        lyricsSongTitle.textContent = "Select a song";
        lyricsSongArtist.textContent = "";
        
        return;
    }
    
    // Set current type for all songs in filtered list
    if (type !== "podcast" && type !== "favourite" && type !== "list") {
        filteredSongs.forEach(song => {
            // Only set currentType if the song has this audio type
            if (song.availableTypes.includes(type) && getAudioForType(song, type)) {
                song.currentType = type;
            }
        });
    }
    
    // Re-render the UI
    setTimeout(() => {
        renderSongList();
        renderCarousel();
        
        if (swiper) {
            swiper.destroy(true, true);
            initSwiper();
        }
        
        // Find which song should be active
        let songToActivate = null;
        
        // Priority 1: Check if last active song exists in the new filtered list
        if (lastActiveSongId) {
            const lastSong = filteredSongs.find(song => song.id === lastActiveSongId);
            if (lastSong) {
                songToActivate = lastSong;
            }
        }
        
        // Priority 2: Check if last clicked song exists in the new filtered list
        if (!songToActivate && lastClickedSongId) {
            const lastSong = filteredSongs.find(song => song.id === lastClickedSongId);
            if (lastSong) {
                songToActivate = lastSong;
            }
        }
        
        // Priority 3: Check if current song exists in the new filtered list
        if (!songToActivate && songs[currentSongIndex]) {
            const currentSong = songs[currentSongIndex];
            const existsInFiltered = filteredSongs.find(song => song.id === currentSong.id);
            if (existsInFiltered) {
                songToActivate = existsInFiltered;
            }
        }
        
        // Priority 4: Use the first song in the filtered list
        if (!songToActivate && filteredSongs.length > 0) {
            songToActivate = filteredSongs[0];
        }
        
        // Activate the found song
        if (songToActivate) {
            const originalIndex = songs.findIndex(s => s.id === songToActivate.id);
            if (originalIndex >= 0) {
                currentSongIndex = originalIndex;
                
                // Update the song's current type to match the filter (only if it has this type)
                if (type !== "podcast" && type !== "favourite" && type !== "list") {
                    if (songs[originalIndex].availableTypes.includes(type) && 
                        getAudioForType(songs[originalIndex], type)) {
                        songs[originalIndex].currentType = type;
                    }
                }
                
                // Set active state in songs array
                songs.forEach(song => {
                    song.active = (song.id === songToActivate.id);
                });
                
                // Update last active song info
                lastActiveSongId = songToActivate.id;
                lastActiveSongType = songs[originalIndex].currentType || type;
                
                // Update UI for the active song
                updateSelectedSongUI(songToActivate.id, songs[originalIndex].currentType || type);
                
                // When switching to "list" mode, don't auto-play the song
                if (type === "list") {
                    console.log("List mode - skipping audio load");
                    
                    const song = songs[originalIndex];
                    const displayTitle = getTitleForType(song, songs[originalIndex].currentType);
                    const cleanArtist = getArtistForType(song, songs[originalIndex].currentType);
                    
                    // Update all displays
                    songTitleDisplay.textContent = displayTitle;
                    songArtistDisplay.textContent = cleanArtist;
                    mobileSongTitle.textContent = displayTitle;
                    mobileSongArtist.textContent = cleanArtist;
                    lyricsPlayerTitle.textContent = `${displayTitle} - ${cleanArtist}`;
                    
                    // NEW: Update lyrics header
                    lyricsSongTitle.textContent = displayTitle;
                    lyricsSongArtist.textContent = cleanArtist;
                    
                    loadLyrics(song.lyrics, displayTitle, cleanArtist);
                } else {
                    loadSong(originalIndex, isAutoPlayEnabled);
                }
                
                // Update swiper to show correct slide
                if (swiper) {
                    const filteredIndex = filteredSongs.findIndex(s => s.id === songToActivate.id);
                    if (filteredIndex >= 0) {
                        setTimeout(() => {
                            swiper.slideToLoop(filteredIndex);
                        }, 100);
                    }
                }
            }
        }
        
        // Ensure single active song
        ensureSingleActiveSong();
        
    }, 50);
    
    updateSidebarWithCounts();
}

// Play audio - FIXED VERSION
function playAudio() {
    if (!audioPlayer.src || audioPlayer.src === "") {
        console.log("No audio source, loading song...");
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (audioPlayer.error) {
        console.log("Audio player error, reloading song...");
        showNotification("Audio error - trying to reload...", 2000);
        loadSong(currentSongIndex, true);
        return;
    }
    
    // Check if audio is ready to play
    if (audioPlayer.readyState < 2) {
        console.log("Audio not ready yet (readyState:", audioPlayer.readyState, "), waiting...");
        audioLoading.classList.add('active');
        audioLoading.textContent = "Loading audio...";
        
        // Use a simpler approach
        const checkAndPlay = () => {
            if (audioPlayer.readyState >= 2) {
                console.log("Audio ready, attempting to play...");
                audioLoading.classList.remove('active');
                audioLoading.textContent = "";
                attemptPlay();
            } else {
                console.log("Still loading, waiting 100ms...");
                setTimeout(checkAndPlay, 100);
            }
        };
        
        checkAndPlay();
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (!isPlaying && audioPlayer.readyState < 2) {
                audioLoading.textContent = "Audio taking too long to load";
                setTimeout(() => {
                    audioLoading.classList.remove('active');
                    audioLoading.textContent = "";
                }, 2000);
                showNotification("Audio failed to load. Try another version.", 3000);
            }
        }, 10000);
        
        return;
    }
    
    attemptPlay();
    
    function attemptPlay() {
        hasUserInteracted = true;
        
        console.log("Attempting to play audio...");
        
        // IMPORTANT: Use a simpler promise handling
        audioPlayer.play()
            .then(() => {
                console.log("✅ Audio playback started successfully");
                isPlaying = true;
                updatePlayButtons();
                startProgressUpdate();
                showNotification("Now playing", 1500);
                
                checkScrollForProgress();
                
                // Request wake lock for background play
                if (document.hidden && isWakeLockSupported) {
                    requestWakeLock();
                }
                
                // Start background checks
                startBackgroundCheck();
            })
            .catch(error => {
                console.error("❌ Playback error:", error);
                
                if (error.name === 'NotAllowedError') {
                    showNotification("Click play button again to start", 3000);
                    isPlaying = false;
                    updatePlayButtons();
                    
                    // Add a click handler to retry
                    const retryHandler = () => {
                        document.removeEventListener('click', retryHandler);
                        if (!isPlaying) {
                            playAudio();
                        }
                    };
                    document.addEventListener('click', retryHandler, { once: true });
                    
                } else if (error.name === 'AbortError') {
                    // Ignore abort errors
                    console.log("Audio playback was aborted");
                } else {
                    console.error("Other playback error:", error);
                    showNotification(`Playback error: ${error.message}`, 3000);
                    isPlaying = false;
                    updatePlayButtons();
                }
            });
    }
}

// Pause audio
function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButtons();
    stopProgressUpdate();
    
    // Release wake lock when pausing
    releaseWakeLock();
    
    // Stop background checks
    stopBackgroundCheck();
    
    // Stop silent audio
    stopSilentAudio();
}

// Toggle play/pause
function togglePlayPause() {
    markUserInteraction();
    
    if (!audioPlayer.src || audioPlayer.src === "") {
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (audioPlayer.error) {
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Update play button icons and rotation
function updatePlayButtons() {
    if (isPlaying) {
        mobilePlayIcon.className = 'fas fa-pause';
        lyricsPlayIcon.className = 'fas fa-pause';
    } else {
        mobilePlayIcon.className = 'fas fa-play';
        lyricsPlayIcon.className = 'fas fa-play';
    }
    
    // Update rotation animation for active song in song list
    updateSongArtRotation();
}

// Start updating progress
function startProgressUpdate() {
    stopProgressUpdate();
    updateProgress();
    updateInterval = setInterval(updateProgress, 1000);
}

// Stop updating progress
function stopProgressUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

// Update progress display
function updateProgress() {
    if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        currentTimeEl.textContent = formatTime(currentTime);
        lyricsCurrentTime.textContent = formatTime(currentTime);
        mobileCurrentTime.textContent = formatTime(currentTime);
        
        totalTimeEl.textContent = formatTime(duration);
        lyricsTotalTime.textContent = formatTime(duration);
        mobileTotalTime.textContent = formatTime(duration);
        
        const progressPercent = (currentTime / duration) * 100;
        
        progress.style.width = `${progressPercent}%`;
        lyricsProgress.style.width = `${progressPercent}%`;
        mobileProgress.style.width = `${progressPercent}%`;
        
        requestAnimationFrame(() => {
            progress.style.transform = `translateZ(0)`;
            lyricsProgress.style.transform = `translateZ(0)`;
            mobileProgress.style.transform = `translateZ(0)`;
        });
    } else {
        if (audioPlayer.readyState >= 1) {
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            lyricsCurrentTime.textContent = formatTime(audioPlayer.currentTime);
            mobileCurrentTime.textContent = formatTime(audioPlayer.currentTime);
        }
    }
}

// Format time as mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play next song
function playNextSong() {
    if (filteredSongs.length > 0) {
        const currentFilteredIndex = filteredSongs.findIndex(s => s.id === songs[currentSongIndex].id);
        if (currentFilteredIndex >= 0) {
            const nextFilteredIndex = (currentFilteredIndex + 1) % filteredSongs.length;
            const nextSong = filteredSongs[nextFilteredIndex];
            const originalIndex = songs.findIndex(s => s.id === nextSong.id);
            setActiveSong(originalIndex);
            
            if (swiper) {
                swiper.slideToLoop(nextFilteredIndex);
            }
        }
    }
}

// Play previous song
function playPrevSong() {
    if (filteredSongs.length > 0) {
        const currentFilteredIndex = filteredSongs.findIndex(s => s.id === songs[currentSongIndex].id);
        if (currentFilteredIndex >= 0) {
            const prevFilteredIndex = (currentFilteredIndex - 1 + filteredSongs.length) % filteredSongs.length;
            const prevSong = filteredSongs[prevFilteredIndex];
            const originalIndex = songs.findIndex(s => s.id === prevSong.id);
            setActiveSong(originalIndex);
            
            if (swiper) {
                swiper.slideToLoop(prevFilteredIndex);
            }
        }
    }
}

// Show temporary notification
function showNotification(message, duration = 3000) {
    const existing = document.getElementById('audio-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'audio-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-color);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        border-left: 4px solid var(--primary-color);
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Set up audio event listeners
function setupAudioEvents() {
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (!isNaN(audioPlayer.duration)) {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
            lyricsTotalTime.textContent = formatTime(audioPlayer.duration);
            mobileTotalTime.textContent = formatTime(audioPlayer.duration);
        }
    });
    
    audioPlayer.addEventListener('playing', () => {
        audioLoading.classList.remove('active');
        audioLoading.textContent = "";
        isPlaying = true;
        updateSongArtRotation();
        
        console.log("✅ Audio started playing");
        
        // Request wake lock if in background
        if (document.hidden && isWakeLockSupported) {
            requestWakeLock();
        }
        
        // Start background check
        startBackgroundCheck();
        
        // Start silent audio to keep context alive
        if (document.hidden) {
            startSilentAudio();
        }
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updateSongArtRotation();
        
        console.log("⏸️ Audio paused");
        
        // Release wake lock
        releaseWakeLock();
        
        // Stop background checks
        stopBackgroundCheck();
        
        // Stop silent audio
        stopSilentAudio();
    });
    
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtons();
        stopProgressUpdate();
        
        console.log("⏹️ Audio ended");
        
        // Release wake lock
        releaseWakeLock();
        
        // Stop background checks
        stopBackgroundCheck();
        
        // Stop silent audio
        stopSilentAudio();
        
        if (isAutoPlayEnabled) {
            setTimeout(() => {
                playNextSong();
            }, 1000);
        }
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        if (isPlaying) {
            updateProgress();
        }
    });
    
    audioPlayer.addEventListener('error', (e) => {
        const currentSong = songs[currentSongIndex];
        const currentType = currentSong.currentType || currentFilterType;
        
        let versionName = "";
        if (currentType === "male") versionName = "Male";
        else if (currentType === "female") versionName = "Female";
        else if (currentType === "duet") versionName = "Duet";
        else if (currentType === "song") versionName = "Original";
        else if (currentType === "favourite") versionName = "Favourite";
        else versionName = currentType.charAt(0).toUpperCase() + currentType.slice(1);
        
        let errorMsg = `Error loading ${versionName} version`;
        if (audioPlayer.error) {
            switch(audioPlayer.error.code) {
                case 1: errorMsg = "Audio aborted"; break;
                case 2: errorMsg = "Network error"; break;
                case 3: errorMsg = "Decoding error"; break;
                case 4: errorMsg = "Format not supported"; break;
            }
        }
        
        if (errorMsg.includes("Network")) {
            showNetworkNotification("Network error. Check your connection.", "error", 3000);
        }
        
        audioLoading.textContent = errorMsg;
        isPlaying = false;
        updatePlayButtons();
        
        // Release wake lock on error
        releaseWakeLock();
        stopBackgroundCheck();
        stopSilentAudio();
        
        setTimeout(() => {
            audioLoading.classList.remove('active');
            audioLoading.textContent = "";
        }, 3000);
        
        showNotification(errorMsg, 3000);
    });
    
    // Handle page visibility changes for background audio
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log("📱 Page hidden - ensuring audio continues in sleep mode");
            
            // Start silent audio to keep context alive
            if (isPlaying) {
                startSilentAudio();
            }
            
            // Start aggressive background checks
            if (isPlaying) {
                startBackgroundCheck();
            }
            
            // Try to keep audio playing if it paused
            if (isPlaying && audioPlayer.paused) {
                setTimeout(() => {
                    if (isPlaying && audioPlayer.paused) {
                        console.log("🔊 Audio paused when page hidden, resuming...");
                        audioPlayer.play().catch(e => {
                            console.log("Failed to resume audio in sleep mode:", e);
                        });
                    }
                }, 100);
            }
            
        } else {
            console.log("📱 Page visible again");
            
            // Stop silent audio
            stopSilentAudio();
            
            // Adjust background check frequency
            if (isPlaying) {
                adjustBackgroundCheckFrequency();
            }
            
            // Resume audio if it got paused in background
            if (isPlaying && audioPlayer.paused) {
                setTimeout(() => {
                    playAudio();
                }, 300);
            }
        }
        
        // Handle wake lock
        handleVisibilityChange();
    });
    
    // Handle page becoming active again (for some Android devices)
    document.addEventListener('resume', () => {
        console.log("📱 App resumed from sleep mode");
        if (isPlaying && audioPlayer.paused) {
            setTimeout(() => {
                playAudio();
            }, 300);
        }
    }, false);
    
    // Save playback state before page unload
    window.addEventListener('beforeunload', () => {
        if (isPlaying) {
            localStorage.setItem('wasPlaying', 'true');
            localStorage.setItem('currentSongIndex', currentSongIndex.toString());
            localStorage.setItem('currentTime', audioPlayer.currentTime.toString());
            console.log("💾 Saved playback state before unload");
        } else {
            localStorage.removeItem('wasPlaying');
        }
    });
    
    // Restore playback state on load
    const wasPlaying = localStorage.getItem('wasPlaying');
    if (wasPlaying === 'true') {
        const savedIndex = parseInt(localStorage.getItem('currentSongIndex') || '0');
        const savedTime = parseFloat(localStorage.getItem('currentTime') || '0');
        
        if (savedIndex >= 0 && savedIndex < songs.length) {
            setTimeout(() => {
                setActiveSong(savedIndex);
                audioPlayer.currentTime = savedTime;
                if (isAutoPlayEnabled) {
                    playAudio();
                }
                console.log("🔄 Restored playback from sleep mode");
            }, 1000);
        }
    }
}

// Handle search function
function handleSearch(e) {
    markUserInteraction();
    const searchTerm = e.target.value.toLowerCase();
    const songItems = document.querySelectorAll('.song-item');
    
    songItems.forEach(item => {
        const title = item.querySelector('.song-item-title').textContent.toLowerCase();
        const artist = item.querySelector('.song-item-artist').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    updateSearchClearButtons();
}

// Setup sidebar menu - UPDATED without Request Song
function setupSidebarMenu() {
    document.querySelectorAll('.menu li[data-type]').forEach(item => {
        item.addEventListener('click', async () => {
            markUserInteraction();
            const type = item.dataset.type;
            
            if (type === "podcast") {
                const currentSong = songs[currentSongIndex];
                const displayTitle = getTitleForType(currentSong, currentSong.currentType);
                const cleanArtist = getArtistForType(currentSong, currentSong.currentType);
                await loadLyrics(currentSong.lyrics, displayTitle, cleanArtist);
                lyricsModal.classList.add('active');
            } else if (type === "about") {
                // Show About modal
                const aboutModal = document.getElementById('aboutModal');
                if (aboutModal) {
                    aboutModal.classList.add('active');
                }
                toggleSidebar();
                return;
            } else if (type === "developed") {
                showNotification("Designed & Developed by Chillax Technologies", 3000);
                toggleSidebar();
                return;
            } else {
                applyFilter(type);
            }
            
            toggleSidebar();
        });
    });
}

// Set up event listeners
function setupEventListeners() {
    themeToggle.addEventListener('click', () => {
        markUserInteraction();
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        
        const icon = themeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Use the toggle function for mobile search
    mobileSearchToggle.addEventListener('click', toggleMobileSearch);

    lyricsBtn.addEventListener('click', async () => {
        markUserInteraction();
        const currentSong = songs[currentSongIndex];
        const displayTitle = getTitleForType(currentSong, currentSong.currentType);
        const cleanArtist = getArtistForType(currentSong, currentSong.currentType);
        await loadLyrics(currentSong.lyrics, displayTitle, cleanArtist);
        lyricsModal.classList.add('active');
    });

    closeLyrics.addEventListener('click', () => {
        lyricsModal.classList.remove('active');
    });

    // Progress bar click events
    progressBar.addEventListener('click', (e) => {
        markUserInteraction();
        if (!isNaN(audioPlayer.duration)) {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
            updateProgress();
        }
    });

    lyricsProgressBar.addEventListener('click', (e) => {
        markUserInteraction();
        if (!isNaN(audioPlayer.duration)) {
            const rect = lyricsProgressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
            updateProgress();
        }
    });

    mobileProgressBar.addEventListener('click', (e) => {
        markUserInteraction();
        if (!isNaN(audioPlayer.duration)) {
            const rect = mobileProgressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
            updateProgress();
        }
    });

    // Playback control buttons
    mobilePlayBtn.addEventListener('click', togglePlayPause);
    mobilePrevBtn.addEventListener('click', playPrevSong);
    mobileNextBtn.addEventListener('click', playNextSong);

    lyricsPlayBtn.addEventListener('click', togglePlayPause);
    lyricsPrevBtn.addEventListener('click', playPrevSong);
    lyricsNextBtn.addEventListener('click', playNextSong);

    // Filter buttons
    document.querySelectorAll('.control-btn[data-type]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            markUserInteraction();
            const type = e.currentTarget.dataset.type;
            applyFilter(type);
        });
    });

    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            markUserInteraction();
            const type = e.currentTarget.dataset.type;
            applyFilter(type);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e);
        });
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            handleSearch(e);
        });
        
        // Close search when pressing Escape key
        mobileSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileSearch();
            }
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            handleSearch({ target: searchInput });
            updateSearchClearButtons();
        });
    }
    
    if (mobileSearchClear) {
        mobileSearchClear.addEventListener('click', () => {
            mobileSearchInput.value = '';
            mobileSearchInput.focus();
            handleSearch({ target: mobileSearchInput });
            updateSearchClearButtons();
        });
    }
    
    // Menu functionality
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            markUserInteraction();
            toggleSidebar();
        });
    }
    
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuBtn) {
            toggleSidebar();
        }
    });
    
    document.addEventListener('click', markUserInteraction);
    
    // Add touch support for lyrics modal
    let touchStartY = 0;
    const lyricsHeader = document.querySelector('.lyrics-header');
    const lyricsSwipeIndicator = document.querySelector('.lyrics-swipe-indicator');
    
    [lyricsHeader, lyricsSwipeIndicator].forEach(element => {
        if (element) {
            element.addEventListener('touchstart', (e) => {
                markUserInteraction();
                touchStartY = e.touches[0].clientY;
            });
            
            element.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const diff = currentY - touchStartY;
                
                if (diff > 50) {
                    lyricsModal.classList.remove('active');
                }
            });
        }
    });
    
    lyricsModal.addEventListener('touchstart', (e) => {
        if (e.target === lyricsModal) {
            markUserInteraction();
            touchStartY = e.touches[0].clientY;
        }
    });
    
    lyricsModal.addEventListener('touchmove', (e) => {
        if (e.target === lyricsModal) {
            const currentY = e.touches[0].clientY;
            const diff = currentY - touchStartY;
            
            if (diff > 50) {
                lyricsModal.classList.remove('active');
            }
        }
    });
    
    // Prevent touch/scroll from closing search
    songListContainer.addEventListener('touchstart', (e) => {
        // Mark that touch started in song list
        e.stopPropagation();
    }, { passive: true });
    
    songListContainer.addEventListener('touchmove', (e) => {
        // Prevent scroll from triggering close
        e.stopPropagation();
    }, { passive: true });
}

// Update rotation animation for song art
function updateSongArtRotation() {
    document.querySelectorAll('.song-item-art').forEach(art => {
        // First remove all rotation classes
        art.classList.remove('rotating', 'selected');
        
        const songItem = art.closest('.song-item');
        if (songItem) {
            const songId = parseInt(songItem.dataset.id);
            const isActiveSong = songs.find(s => s.id === songId)?.active || false;
            
            // If this is the active song (selected in the list)
            if (isActiveSong) {
                if (isPlaying) {
                    // If audio is playing, add rotating class
                    art.classList.add('rotating');
                } else {
                    // If audio is paused/stopped, add selected class (non-animated rotation)
                    art.classList.add('selected');
                }
            }
        }
    });
}

// Update play button icons and rotation
function updatePlayButtons() {
    if (isPlaying) {
        mobilePlayIcon.className = 'fas fa-pause';
        lyricsPlayIcon.className = 'fas fa-pause';
    } else {
        mobilePlayIcon.className = 'fas fa-play';
        lyricsPlayIcon.className = 'fas fa-play';
    }
    
    // Also update rotation animation
    updateSongArtRotation();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
