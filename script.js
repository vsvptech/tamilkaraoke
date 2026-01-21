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

// Music Director elements
let musicDirectorModal = document.getElementById('musicDirectorModal');
let closeMusicDirector = document.getElementById('closeMusicDirector');
let musicDirectorList = document.getElementById('musicDirectorList');

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

// Music Director variables
let currentMusicDirector = null;
let musicDirectorSongs = [];

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

// Search state
let currentSearchTerm = "";
let isSearchActive = false; // Track if search is active
let searchResults = []; // Store search results separately

// Store original filtered songs before search
let originalFilteredSongsBeforeSearch = [];

// Background audio keep-alive
let backgroundKeepAliveInterval = null;
let wakeLock = null;
let audioResumeAttempts = 0;
const MAX_RESUME_ATTEMPTS = 10;

// Music directors list
const musicDirectors = [
    "A R Rahman",
    "Anirudh Ravichander",
    "Bharani",
    "Deva",
    "D Imman",
    "G V Prakash Kumar",
    "Gangai Amaran",
    "Harris Jayaraj",
    "Hiphop Tamizha",
    "Ilaiyaraaja",
    "James Vasanthan",
    "Jassie Gift",
    "Krishna Kumar",
    "M S Viswanathan",
    "Nivas K Prasanna",
    "R P Patnaik",
    "S A Rajkumar",
    "Shyam",
    "T Rajendar",
    "Vijay Antony",
    "Yuvan Shankar Raja"
];

// ==================== NETWORK ERROR MODAL ====================

// Create network error modal
function createNetworkErrorModal() {
    const networkErrorModalHTML = `
        <div class="network-error-modal" id="networkErrorModal">
            <div class="network-error-container">
                <div class="network-error-icon">
                    <img src="images/nowifi.png" alt="No Internet" width="64" height="64" />
                </div>
                <h2 class="network-error-title">No Internet Connection</h2>
                <p class="network-error-message">Please check your internet connection</p>
                <button class="network-error-btn" id="retryNetworkBtn">
                    <i class="fas fa-rotate-right"></i> Try Again
                </button>
                <p class="network-error-note">
                    You need an active internet connection to load songs and lyrics
                </p>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', networkErrorModalHTML);
}

// Show network error modal
function showNetworkErrorModal() {
    const networkErrorModal = document.getElementById('networkErrorModal');
    if (networkErrorModal) {
        networkErrorModal.classList.add('active');
    }
}

// Hide network error modal
function hideNetworkErrorModal() {
    const networkErrorModal = document.getElementById('networkErrorModal');
    if (networkErrorModal) {
        networkErrorModal.classList.remove('active');
    }
}

// Setup network retry button
function setupNetworkRetryButton() {
    const retryNetworkBtn = document.getElementById('retryNetworkBtn');
    if (retryNetworkBtn) {
        retryNetworkBtn.addEventListener('click', () => {
            if (navigator.onLine) {
                hideNetworkErrorModal();
                showNotification("Internet connection restored", 2000);
                
                // Reload the current song if needed
                if (songs[currentSongIndex]) {
                    const song = songs[currentSongIndex];
                    if (song.currentType) {
                        loadSong(currentSongIndex, isAutoPlayEnabled && isPlaying);
                    }
                }
            } else {
                showNotification("Still no internet connection", 2000);
            }
        });
    }
}

// ==================== MUSIC DIRECTOR MODAL ====================

// Create music director modal if not exists
function createMusicDirectorModal() {
    const musicDirectorModalHTML = `
        <div class="music-director-modal" id="musicDirectorModal">
            <div class="music-director-container">
                <div class="music-director-header">
                    <i class="fas fa-drum music-director-icon"></i>
                    <h3 class="music-director-title">Music Directors</h3>
                    <button class="close-music-director" id="closeMusicDirector">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="music-director-list" id="musicDirectorList">
                    <!-- Music directors will be populated here -->
                </div>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', musicDirectorModalHTML);
    
    // Re-assign elements
    musicDirectorModal = document.getElementById('musicDirectorModal');
    closeMusicDirector = document.getElementById('closeMusicDirector');
    musicDirectorList = document.getElementById('musicDirectorList');
}

// Open music director modal
function openMusicDirectorModal() {
    if (!musicDirectorModal) {
        createMusicDirectorModal();
        setupMusicDirectorEvents();
    }
    musicDirectorModal.classList.add('active');
    renderMusicDirectorList();
}

// Close music director modal
function closeMusicDirectorModal() {
    if (musicDirectorModal) {
        musicDirectorModal.classList.remove('active');
    }
}

// Render music director list
function renderMusicDirectorList() {
    if (!musicDirectorList) return;
    
    musicDirectorList.innerHTML = '';
    
    musicDirectors.forEach(director => {
        const directorItem = document.createElement('div');
        directorItem.className = `music-director-item ${currentMusicDirector === director ? 'active' : ''}`;
        directorItem.dataset.director = director;
        
        directorItem.innerHTML = `
            <div class="music-director-bullet"></div>
            <div class="music-director-name">${director}</div>
        `;
        
        directorItem.addEventListener('click', () => {
            markUserInteraction();
            selectMusicDirector(director);
        });
        
        musicDirectorList.appendChild(directorItem);
    });
}

// Select music director
function selectMusicDirector(director) {
    currentMusicDirector = director;
    musicDirectorSongs = songs.filter(song => 
        song.music && song.music.toLowerCase() === director.toLowerCase()
    );
    
    // Apply music director filter
    applyMusicDirectorFilter();
    
    // Close modal
    closeMusicDirectorModal();
    
    // Show notification
    showNotification(`${director} songs loaded`, 2000);
}

// Apply music director filter
function applyMusicDirectorFilter() {
    if (!currentMusicDirector) return;
    
    // Filter songs by music director
    filteredSongs = musicDirectorSongs;
    
    // Apply search filter if there's a search term
    if (currentSearchTerm) {
        const searchLower = currentSearchTerm.toLowerCase();
        filteredSongs = filteredSongs.filter(song => 
            song.title.toLowerCase().includes(searchLower) ||
            song.artist.toLowerCase().includes(searchLower)
        );
    }
    
    // Update player title
    if (playerTitle) {
        playerTitle.textContent = currentMusicDirector;
    }
    
    // Update active filter button (none should be active for music director mode)
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Re-render UI
    setTimeout(() => {
        renderSongList();
        renderCarousel();
        
        if (swiper) {
            swiper.destroy(true, true);
            initSwiper();
        }
        
        // Activate first song if available
        if (filteredSongs.length > 0) {
            const firstSong = filteredSongs[0];
            const originalIndex = songs.findIndex(s => s.id === firstSong.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        } else {
            // No songs for this director
            pauseAudio();
            
            songTitleDisplay.textContent = "No songs available";
            songArtistDisplay.textContent = "";
            mobileSongTitle.textContent = "No songs available";
            mobileSongArtist.textContent = "";
            lyricsPlayerTitle.textContent = "No songs available";
            
            // Update lyrics header
            lyricsSongTitle.textContent = "No songs available";
            lyricsSongArtist.textContent = "";
        }
        
        // Ensure single active song
        ensureSingleActiveSong();
        
    }, 50);
}

// Clear music director filter
function clearMusicDirectorFilter() {
    currentMusicDirector = null;
    musicDirectorSongs = [];
    
    // Revert to current filter type
    applyFilter(currentFilterType);
}

// ==================== ENHANCED BACKGROUND AUDIO FOR SLEEP MODE ====================

// Enhanced background audio features to prevent stopping in sleep mode
function initBackgroundAudio() {
    console.log("=== INITIALIZING ENHANCED BACKGROUND AUDIO ===");
    
    // Setup wake lock
    setupWakeLock();
    
    // Setup audio context keep-alive
    setupAudioContextKeepAlive();
    
    // Setup periodic keep-alive (every 20 seconds to prevent 60-second timeout)
    setupPeriodicKeepAlive();
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle beforeunload
    window.addEventListener('beforeunload', savePlaybackState);
    
    // Try to restore playback state
    restorePlaybackState();
    
    // Setup silent audio for Android
    setupSilentAudio();
    
    // Add pagehide/pagefreeze events for mobile
    window.addEventListener('pagehide', () => {
        console.log("Page hiding - ensuring audio continues");
        if (isPlaying && !audioPlayer.paused) {
            audioPlayer.play().catch(e => {
                console.log("Pagehide play attempt failed:", e);
            });
        }
    });
}

// Setup wake lock to prevent device sleep
async function setupWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('✅ Wake Lock is active');
            
            wakeLock.addEventListener('release', () => {
                console.log('⚠️ Wake Lock was released');
                // Try to re-acquire if we're still playing
                if (isPlaying) {
                    setTimeout(setupWakeLock, 1000);
                }
            });
        } catch (err) {
            console.error(`❌ Failed to acquire wake lock: ${err.message}`);
        }
    }
}

// Setup audio context keep-alive
function setupAudioContextKeepAlive() {
    // Create and keep an AudioContext alive
    if (!window.audioContext) {
        try {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('✅ AudioContext created for background audio');
            
            // Create a silent oscillator to keep context alive
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Set gain to 0 (silent)
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            
            // Start oscillator (silent but keeps context alive)
            oscillator.start();
            
            window.silentOscillator = oscillator;
            window.silentGainNode = gainNode;
            
        } catch (e) {
            console.log("⚠️ Could not create AudioContext:", e);
        }
    }
}

// Setup periodic keep-alive checks (every 20 seconds)
function setupPeriodicKeepAlive() {
    // Clear any existing interval
    if (backgroundKeepAliveInterval) {
        clearInterval(backgroundKeepAliveInterval);
    }
    
    // Check every 20 seconds (less than 60 seconds)
    backgroundKeepAliveInterval = setInterval(() => {
        if (document.hidden && isPlaying) {
            console.log("🔄 20-second background check - Audio should be playing");
            
            // Strategy 1: Check if audio is paused but should be playing
            if (audioPlayer.paused) {
                console.log("⚠️ Audio paused in background, attempting resume...");
                resumeAudioInBackground();
            }
            
            // Strategy 2: Small time adjustment to keep audio alive
            if (!audioPlayer.paused && audioPlayer.currentTime > 0) {
                // Slight time adjustment to prevent Android from stopping audio
                const currentTime = audioPlayer.currentTime;
                audioPlayer.currentTime = currentTime - 0.001;
                setTimeout(() => {
                    audioPlayer.currentTime = currentTime;
                }, 10);
            }
            
            // Strategy 3: Ensure wake lock is active
            if (isPlaying && !wakeLock && 'wakeLock' in navigator) {
                setupWakeLock();
            }
            
            // Strategy 4: Play silent audio if available
            if (window.silentAudio && window.silentAudio.paused) {
                window.silentAudio.play().catch(e => {
                    console.log("Silent audio play in background failed:", e);
                });
            }
            
            // Strategy 5: Ensure audio context is running
            if (window.audioContext && window.audioContext.state === 'suspended') {
                window.audioContext.resume().catch(e => {
                    console.log("Failed to resume audio context:", e);
                });
            }
        }
    }, 20000); // Check every 20 seconds (well under 60 seconds)
}

// Setup silent audio for Android background
function setupSilentAudio() {
    // Create a silent audio element for Android background
    if (!window.silentAudio) {
        const silentAudio = document.createElement('audio');
        silentAudio.id = 'silent-background-audio';
        silentAudio.loop = true;
        silentAudio.volume = 0.0001; // Almost silent
        silentAudio.muted = true;
        
        // Create a silent audio source (1 second of silence)
        const silentSource = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
        silentAudio.src = silentSource;
        
        document.body.appendChild(silentAudio);
        window.silentAudio = silentAudio;
        
        console.log('✅ Silent background audio setup complete');
    }
}

// Handle page visibility changes
function handleVisibilityChange() {
    if (document.hidden) {
        console.log("📱 Page went to background - APPLYING SLEEP MODE PROTECTION");
        
        // Page is hidden - apply enhanced keep-alive
        if (isPlaying) {
            // Start silent audio playback for Android IMMEDIATELY
            if (window.silentAudio) {
                window.silentAudio.play().catch(e => {
                    console.log("Silent audio play error:", e);
                });
            }
            
            // Ensure audio context is running
            if (window.audioContext && window.audioContext.state === 'suspended') {
                window.audioContext.resume();
            }
            
            // Double-check audio is playing after 100ms
            setTimeout(() => {
                if (audioPlayer.paused) {
                    console.log("Audio paused when entering background, resuming...");
                    resumeAudioInBackground();
                }
            }, 100);
            
            // Additional safety check after 500ms
            setTimeout(() => {
                if (isPlaying && audioPlayer.paused) {
                    console.log("Second check - audio still paused, forcing...");
                    forceAudioPlayback();
                }
            }, 500);
        }
        
    } else {
        console.log("📱 Page became visible");
        
        // Stop silent audio when page is visible
        if (window.silentAudio) {
            window.silentAudio.pause();
        }
        
        // Page is visible - resume if needed
        if (isPlaying && audioPlayer.paused) {
            setTimeout(() => {
                audioPlayer.play().catch(e => {
                    console.log("Failed to resume after visibility:", e);
                });
            }, 100);
        }
    }
}

// Enhanced resume audio in background with multiple strategies
function resumeAudioInBackground() {
    if (!isPlaying || !document.hidden) return;
    
    audioResumeAttempts++;
    
    if (audioResumeAttempts > MAX_RESUME_ATTEMPTS) {
        console.log("❌ Max resume attempts reached, stopping");
        audioResumeAttempts = 0;
        return;
    }
    
    console.log(`🔄 Attempting to resume audio (attempt ${audioResumeAttempts})`);
    
    // Strategy 1: Direct resume
    audioPlayer.play().then(() => {
        console.log("✅ Audio resumed successfully");
        audioResumeAttempts = 0;
        
        // Restart progress update
        if (isPlaying) {
            startProgressUpdate();
        }
    }).catch(error => {
        console.log(`❌ Direct resume failed (${error.name}):`, error.message);
        
        // Strategy 2: Small seek and retry
        const currentTime = audioPlayer.currentTime;
        audioPlayer.currentTime = Math.max(0, currentTime - 0.01);
        
        setTimeout(() => {
            audioPlayer.play().then(() => {
                console.log("✅ Audio resumed after seek");
                audioResumeAttempts = 0;
            }).catch(error2 => {
                console.log(`❌ Second resume attempt failed (${error2.name})`);
                
                // Strategy 3: Force audio playback
                forceAudioPlayback();
            });
        }, 100);
    });
}

// Force audio playback with reload
function forceAudioPlayback() {
    if (!isPlaying || !audioPlayer.src) return;
    
    console.log("🔄 Force audio playback attempt");
    
    // Strategy 1: Direct play
    audioPlayer.play().then(() => {
        console.log("✅ Force playback succeeded");
    }).catch(error => {
        console.log("❌ Direct force failed:", error);
        
        // Strategy 2: Reload audio
        const currentSrc = audioPlayer.src;
        const currentTime = audioPlayer.currentTime;
        
        audioPlayer.src = '';
        setTimeout(() => {
            audioPlayer.src = currentSrc;
            audioPlayer.currentTime = currentTime;
            audioPlayer.load();
            
            setTimeout(() => {
                audioPlayer.play().then(() => {
                    console.log("✅ Force playback after reload succeeded");
                }).catch(error2 => {
                    console.log("❌ Force playback after reload failed:", error2);
                });
            }, 500);
        }, 100);
    });
}

// Save playback state
function savePlaybackState() {
    if (isPlaying) {
        localStorage.setItem('backgroundPlayback', JSON.stringify({
            songIndex: currentSongIndex,
            currentTime: audioPlayer.currentTime,
            timestamp: Date.now(),
            isPlaying: true,
            songId: songs[currentSongIndex]?.id
        }));
        console.log("💾 Saved playback state");
    } else {
        localStorage.removeItem('backgroundPlayback');
    }
}

// Restore playback state
function restorePlaybackState() {
    try {
        const savedState = localStorage.getItem('backgroundPlayback');
        if (savedState) {
            const state = JSON.parse(savedState);
            const timeDiff = Date.now() - state.timestamp;
            
            // Only restore if within 10 minutes
            if (timeDiff < 10 * 60 * 1000) {
                console.log("🔄 Restoring playback state from", Math.round(timeDiff / 1000), "seconds ago");
                
                setTimeout(() => {
                    if (state.songIndex >= 0 && state.songIndex < songs.length) {
                        // Only restore if it's the same song
                        const song = songs[state.songIndex];
                        if (song && song.id === state.songId) {
                            setActiveSong(state.songIndex);
                            audioPlayer.currentTime = state.currentTime;
                            
                            if (state.isPlaying && isAutoPlayEnabled) {
                                setTimeout(() => {
                                    playAudio();
                                }, 1000);
                            }
                        }
                    }
                }, 1000);
            } else {
                localStorage.removeItem('backgroundPlayback');
            }
        }
    } catch (e) {
        console.log("Error restoring playback state:", e);
        localStorage.removeItem('backgroundPlayback');
    }
}

// Release wake lock when pausing
function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log('✅ Wake Lock released');
    }
}

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
        case "music": return "fas fa-drum";
        default: return "fas fa-music";
    }
}

// Get display title based on type - UPDATED FOR SMALL FONT SUFFIX
function getTitleForType(song, type, context = "default") {
    if (!song || !song.title) return "Unknown Song";
    
    const baseTitle = song.title.trim();
    
    // For carousel context, show plain title without version suffix
    if (context === "carousel") {
        return baseTitle;
    }
    
    // Only add version suffix for audio types in other contexts
    if (type === "male") {
        return `${baseTitle} <span class="version-suffix">(Male)</span>`;
    } else if (type === "female") {
        return `${baseTitle} <span class="version-suffix">(Female)</span>`;
    } else if (type === "duet") {
        return `${baseTitle} <span class="version-suffix">(Duet)</span>`;
    } else if (type === "song") {
        return `${baseTitle} <span class="version-suffix">(Original)</span>`;
    } 
    
    // For list, favourite, podcast, music - return plain title
    return baseTitle;
}

// Get display artist name based on type
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
        return songs;
    }
    if (type === "music") {
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
    if (type === "music") {
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
        "music": "Music Directors",
        "about": "About",
        "developed": "Developed by Chillax Technologies"
    };
    return names[type] || type;
}

// Update sidebar with song counts - MODIFIED for small font counts
function updateSidebarWithCounts() {
    const menu = document.querySelector('.menu');
    if (!menu) return;
    
    menu.innerHTML = '';
    
    const menuItems = [
        { type: "music", icon: "fa-drum" },
        { type: "list", icon: "fa-list" },
        { type: "male", icon: "fa-mars" },
        { type: "female", icon: "fa-venus" },
        { type: "duet", icon: "fa-venus-mars" },
        { type: "song", icon: "fa-music" },
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
        } else if (item.type === "music") {
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${getTypeDisplayName(item.type)}</span>
            `;
        } else {
            const count = countSongsByType(item.type);
            li.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>
                    ${getTypeDisplayName(item.type)} 
                    <span class="song-count">(${count})</span>
                </span>
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
        if (currentMusicDirector) {
            playerTitle.textContent = currentMusicDirector;
        } else {
            playerTitle.textContent = getTypeDisplayName(activeType);
        }
    }
}

// Check if type is audio type
function isAudioType(type) {
    return type !== "podcast" && type !== "favourite" && type !== "list" && type !== "about" && type !== "music";
}

// Mark user interaction
function markUserInteraction() {
    if (!hasUserInteracted) {
        hasUserInteracted = true;
        console.log("User interaction marked");
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

// Set correct active state
function setCorrectActiveState(songId, versionType) {
    console.log("Setting active state for:", songId, "type:", versionType, "Search mode:", isSearchActive);
    
    // First, update the songs array
    songs.forEach(song => {
        song.active = (song.id === songId);
        if (song.id === songId) {
            song.currentType = versionType;
        }
    });
    
    // Update ALL song items in DOM
    document.querySelectorAll('.song-item').forEach(item => {
        const itemSongId = parseInt(item.dataset.id);
        
        if (itemSongId === songId) {
            // This is the ACTIVE song
            item.classList.add('active');
            
            // Update all version buttons for this song
            item.querySelectorAll('.version-btn').forEach(btn => {
                const btnType = btn.dataset.type;
                const btnSongId = parseInt(btn.dataset.id);
                
                if (btnSongId === songId) {
                    if (btnType === versionType) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                }
            });
            
            // Update rotation for this active song
            const songItemArt = item.querySelector('.song-item-art');
            if (songItemArt) {
                if (isPlaying && versionType !== "podcast") {
                    songItemArt.classList.add('rotating');
                    songItemArt.classList.remove('selected');
                } else {
                    songItemArt.classList.add('selected');
                    songItemArt.classList.remove('rotating');
                }
            }
            
        } else {
            // This is NOT the active song
            item.classList.remove('active');
            
            // Deactivate all version buttons for inactive songs
            item.querySelectorAll('.version-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remove rotation from inactive songs
            const songItemArt = item.querySelector('.song-item-art');
            if (songItemArt) {
                songItemArt.classList.remove('rotating', 'selected');
            }
        }
    });
    
    // Update swiper slides
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        const slideSongId = parseInt(slide.dataset.id);
        if (slideSongId === songId) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Update UI for selected song
function updateSelectedSongUI(songId, versionType) {
    if (isUIBusy) return;
    
    isUIBusy = true;
    
    if (uiUpdateTimeout) {
        clearTimeout(uiUpdateTimeout);
        uiUpdateTimeout = null;
    }
    
    requestAnimationFrame(() => {
        try {
            // Update last active song info
            lastActiveSongId = songId;
            lastActiveSongType = versionType;
            
            // Update UI with correct active state
            setCorrectActiveState(songId, versionType);
            
            // Update swiper to show correct slide
            if (swiper) {
                let slideIndex = -1;
                if (isSearchActive && searchResults.length > 0) {
                    slideIndex = searchResults.findIndex(s => s.id === songId);
                } else {
                    slideIndex = filteredSongs.findIndex(s => s.id === songId);
                }
                
                if (slideIndex >= 0) {
                    setTimeout(() => {
                        swiper.slideToLoop(slideIndex);
                    }, 10);
                }
            }
            
            // Update song info display
            const song = songs.find(s => s.id === songId);
            if (song) {
                const displayTitle = getTitleForType(song, versionType);
                const cleanArtist = getArtistForType(song, versionType);
                
                // Update all displays with innerHTML for version suffixes
                songTitleDisplay.innerHTML = displayTitle;
                songArtistDisplay.textContent = cleanArtist;
                mobileSongTitle.innerHTML = displayTitle;
                mobileSongArtist.textContent = cleanArtist;
                lyricsPlayerTitle.innerHTML = `${displayTitle} - ${cleanArtist}`;
                
                // Update lyrics header - CRITICAL FIX
                lyricsSongTitle.innerHTML = displayTitle;
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
    const wasOnline = isOnline;
    isOnline = navigator.onLine;
    
    if (!isOnline && !networkNotificationShown) {
        showNetworkErrorModal();
        networkNotificationShown = true;
    } else if (isOnline && networkNotificationShown) {
        hideNetworkErrorModal();
        networkNotificationShown = false;
        showNotification("Network connection restored", 2000);
    }
    
    // If network came back online, reload current song
    if (isOnline && !wasOnline && songs[currentSongIndex]) {
        const song = songs[currentSongIndex];
        if (song.currentType) {
            setTimeout(() => {
                loadSong(currentSongIndex, isAutoPlayEnabled && isPlaying);
            }, 1000);
        }
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

// FIX 1: Close mobile search when selecting a song
function closeMobileSearchOnOutsideClick(e) {
    // Don't close on scroll events (touchmove, wheel, etc.)
    if (e.type === 'touchmove' || e.type === 'wheel' || e.type === 'scroll') {
        return;
    }
    
    // If search is open
    if (isMobileSearchOpen) {
        // Check if click is on search toggle button (don't close)
        if (mobileSearchToggle.contains(e.target)) {
            return;
        }
        
        // Check if click is inside search container (don't close)
        if (mobileSearchContainer.contains(e.target)) {
            return;
        }
        
        // Check if click is on a song item or version button (CLOSE SEARCH - FIX 1)
        const clickedSongItem = e.target.closest('.song-item');
        const clickedVersionBtn = e.target.closest('.version-btn');
        
        // If clicking on a song or version button, CLOSE the search
        if (clickedSongItem || clickedVersionBtn) {
            closeMobileSearch();
            return;
        }
        
        // If clicking elsewhere (not on song list), close search
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
        updateSearchClearButtons(); // Update clear button visibility
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
    console.log("=== INITIALIZING APP WITH ENHANCED BACKGROUND AUDIO ===");
    
    favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    
    // Create network error modal first
    createNetworkErrorModal();
    setupNetworkRetryButton();
    
    // Check network status on load
    if (!navigator.onLine) {
        setTimeout(() => {
            showNetworkErrorModal();
        }, 1000);
    }
    
    // Initialize network monitoring
    checkNetworkStatus();
    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);
    
    // Initialize enhanced background audio features
    initBackgroundAudio();
    
    // Create About modal
    createAboutModal();
    
    // Create Music Director modal if not in HTML
    if (!musicDirectorModal) {
        createMusicDirectorModal();
    }
    
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
        
        // Ensure music property exists (for backward compatibility)
        if (!song.music) {
            song.music = "Unknown";
        }
    });
    
    renderSongList();
    renderCarousel();
    initSwiper();
    
    setupEventListeners();
    setupAudioEvents();
    setupSidebarMenu();
    setupAutoPlayToggle();
    setupMusicDirectorEvents();
    
    // Specific handler for list button to ensure correct notification
    const listButton = document.querySelector('[data-type="list"]');
    if (listButton) {
        const newListButton = listButton.cloneNode(true);
        listButton.parentNode.replaceChild(newListButton, listButton);
        
        // Add the correct event listener
        newListButton.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
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
    
    // Set default lyrics header
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
    
    // Setup Music Director event listeners
    setupMusicDirectorEvents();
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

// Render carousel
function renderCarousel() {
    carouselContainer.innerHTML = '';
    
    // Apply search filter if active
    let songsToRender = filteredSongs;
    if (isSearchActive && currentSearchTerm && searchResults.length > 0) {
        // If we have search results, use them
        songsToRender = searchResults;
    } else if (isSearchActive && currentSearchTerm) {
        // Otherwise filter the current filteredSongs
        const searchLower = currentSearchTerm.toLowerCase();
        songsToRender = songsToRender.filter(song => 
            song.title.toLowerCase().includes(searchLower) ||
            song.artist.toLowerCase().includes(searchLower)
        );
    }
    
    songsToRender.forEach((song, index) => {
        const slide = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        slide.className = `swiper-slide ${isActive ? 'active' : ''}`;
        slide.dataset.index = index;
        slide.dataset.id = song.id;
        
        const currentType = song.currentType || currentFilterType;
        
        // Use plain title for carousel (no version suffix)
        const displayTitle = getTitleForType(song, currentType, "carousel");
        const cleanArtist = getArtistForType(song, currentType);
        
        slide.innerHTML = `
            <div class="carousel-slide">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='images/defaultphoto.jpg'">
                <div class="carousel-info">
                    <h4 class="carousel-title">${displayTitle}</h4>
                    <p class="carousel-artist">${cleanArtist}</p>
                </div>
            </div>
        `;
        
        slide.addEventListener('click', () => {
            markUserInteraction();
            
            // FIX 1: Close mobile search when a song is selected
            if (isMobileSearchOpen) {
                closeMobileSearch();
            }
            
            lastClickedSongId = song.id;
            lastClickedTrackId = song.trackId;
            lastActiveSongId = song.id;
            lastActiveSongType = currentType;
            
            // FIX: Find the correct index in the ORIGINAL songs array
            const originalIndex = songs.findIndex(s => s.id === song.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        });
        
        carouselContainer.appendChild(slide);
    });
}

// Create Song Item
function createSongItem(song, index) {
    const isActive = songs.find(s => s.id === song.id)?.active || false;
    const currentType = song.currentType || song.availableTypes[0];
    const isFavorite = favoriteSongs.includes(song.id);
    
    const songItem = document.createElement('div');
    songItem.className = `song-item ${isActive ? 'active' : ''}`;
    songItem.dataset.id = song.id;
    songItem.dataset.index = index;
    
    let versionSelector = '';
    
    // Define the EXACT ORDER of buttons you want
    const buttonOrder = ["male", "female", "duet", "song", "podcast", "music-director-tag", "favourite"];
    
    // Check which buttons should actually be shown
    const hasMale = song.availableTypes.includes("male") && getAudioForType(song, "male");
    const hasFemale = song.availableTypes.includes("female") && getAudioForType(song, "female");
    const hasDuet = song.availableTypes.includes("duet") && getAudioForType(song, "duet");
    const hasSong = song.availableTypes.includes("song") && getAudioForType(song, "song");
    const hasPodcast = song.availableTypes.includes("podcast") && song.lyrics && song.lyrics.trim() !== '';
    const hasMusicDirector = song.music && song.music !== "Unknown";
    
    // Build buttons in the exact order you specified
    buttonOrder.forEach(type => {
        if (type === "male" && hasMale) {
            const isCurrent = (isActive && currentType === "male");
            versionSelector += `
                <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="male"
                        title="Male Version">
                    <i class="fas fa-mars"></i>
                </button>
            `;
        }
        else if (type === "female" && hasFemale) {
            const isCurrent = (isActive && currentType === "female");
            versionSelector += `
                <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="female"
                        title="Female Version">
                    <i class="fas fa-venus"></i>
                </button>
            `;
        }
        else if (type === "duet" && hasDuet) {
            const isCurrent = (isActive && currentType === "duet");
            versionSelector += `
                <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="duet"
                        title="Duet Version">
                    <i class="fas fa-venus-mars"></i>
                </button>
            `;
        }
        else if (type === "song" && hasSong) {
            const isCurrent = (isActive && currentType === "song");
            versionSelector += `
                <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="song"
                        title="Original Version">
                    <i class="fas fa-music"></i>
                </button>
            `;
        }
        else if (type === "podcast" && hasPodcast) {
            versionSelector += `
                <button class="version-btn lyrics-btn" 
                        data-id="${song.id}" 
                        data-type="podcast"
                        title="Show Lyrics">
                    <i class="fas fa-podcast"></i>
                </button>
            `;
        }
        else if (type === "music-director-tag" && hasMusicDirector) {
            versionSelector += `
                <span class="music-director-tag">${song.music}</span>
            `;
        }
        else if (type === "favourite") {
            // Show favorite button in ALL modes including search
            versionSelector += `
                <button class="version-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-id="${song.id}" 
                        data-type="favourite"
                        title="${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}">
                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                </button>
            `;
        }
    });
    
    // Determine which title and artist to show
    let displayTitle = '';
    let artistName = '';
    
    if (currentFilterType === "list" || currentMusicDirector || isSearchActive) {
        // In list mode, music director mode, or search mode: Show plain title and clean artist name
        displayTitle = song.title;
        artistName = getArtistForType(song, currentType);
    } else {
        // In other modes: Show versioned title with HTML and clean artist name
        displayTitle = getTitleForType(song, currentType);
        artistName = getArtistForType(song, currentType);
    }
    
    // ALWAYS show heart icon in song-item-type
    let typeIconHtml = `<i class="${isFavorite ? 'fas' : 'far'} fa-heart" 
                           data-id="${song.id}"
                           title="${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}"></i>`;
    
    songItem.innerHTML = `
        <div class="song-item-art">
            <img src="${song.image}" alt="${song.title}" onerror="this.src='images/defaultphoto.jpg'">
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
    
    // Handle favorite button
    const favoriteBtn = songItem.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
            const songId = parseInt(e.currentTarget.dataset.id);
            toggleFavorite(songId);
        });
    }
    
    // Handle heart icon in .song-item-type
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
    
    // FIX 1: Version button click handler
    songItem.querySelectorAll('.version-btn.audio-btn, .version-btn.lyrics-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
            
            // FIX 1: ALWAYS close mobile search when a version is selected
            if (isMobileSearchOpen) {
                closeMobileSearch();
            }
            
            const songId = parseInt(btn.dataset.id);
            const versionType = btn.dataset.type;
            
            // FIX: Find the correct index in the ORIGINAL songs array
            const songIndex = songs.findIndex(s => s.id === songId);
            if (songIndex < 0) return;
            
            lastClickedSongId = songId;
            lastActiveSongId = songId;
            lastActiveSongType = versionType;
            
            // If it's a lyrics button, open lyrics modal
            if (versionType === "podcast") {
                const song = songs[songIndex];
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
            currentSongIndex = songIndex; // FIX: Ensure currentSongIndex is updated
            
            // FIX: Update UI with correct active state BEFORE loading song
            setCorrectActiveState(songId, versionType);
            
            // FIX: Use the original songIndex
            loadSong(songIndex, isAutoPlayEnabled);
            
            // FIX: DON'T change filter type when in search mode
            if (!isSearchActive && currentFilterType !== "list" && currentFilterType !== "favourite" && versionType !== currentFilterType) {
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
                    
                    setCorrectActiveState(songId, versionType);
                }, 50);
            } else if (isSearchActive) {
                // When in search mode, just re-render the search results to show updated active state
                setTimeout(() => {
                    // FIX: Force update of active state in search results
                    setCorrectActiveState(songId, versionType);
                    updateSongArtRotation();
                    
                    // FIX 1: In mobile, keep showing search results after clicking version button
                    // Re-render search results to maintain the search view
                    renderSearchResults(searchResults);
                }, 50);
            }
        });
    });
    
    // FIX 1: Song item click handler
    songItem.addEventListener('click', (e) => {
        // Don't trigger if clicking on version buttons
        if (e.target.closest('.version-btn')) {
            return;
        }
        
        // Don't trigger if clicking on heart icon
        if (e.target.closest('.song-item-type i')) {
            return;
        }
        
        markUserInteraction();
        
        // FIX 1: ALWAYS close mobile search when a song is selected
        if (isMobileSearchOpen) {
            closeMobileSearch();
        }
        
        lastClickedSongId = song.id;
        lastActiveSongId = song.id;
        lastActiveSongType = song.currentType || song.availableTypes[0];
        
        // FIX: Find the correct index in the ORIGINAL songs array
        const originalIndex = songs.findIndex(s => s.id === song.id);
        if (originalIndex >= 0) {
            setActiveSong(originalIndex);
            
            // If in search mode, update the search results
            if (isSearchActive) {
                setTimeout(() => {
                    // FIX: Force update of active state in search results
                    setCorrectActiveState(song.id, song.currentType || song.availableTypes[0]);
                    updateSongArtRotation();
                    
                    // FIX 1: In mobile, keep showing search results after clicking song
                    // Re-render search results to maintain the search view
                    renderSearchResults(searchResults);
                }, 50);
            }
        }
    });
    
    return songItem;
}

// Render song list
function renderSongList() {
    songListContainer.innerHTML = '';
    
    // Apply search filter if active - use searchResults if available
    let songsToRender = filteredSongs;
    if (isSearchActive && currentSearchTerm && searchResults.length > 0) {
        // If we have search results, use them
        songsToRender = searchResults;
    } else if (isSearchActive && currentSearchTerm) {
        // Otherwise filter the current filteredSongs
        const searchLower = currentSearchTerm.toLowerCase();
        songsToRender = songsToRender.filter(song => 
            song.title.toLowerCase().includes(searchLower) ||
            song.artist.toLowerCase().includes(searchLower)
        );
    }
    
    if (songsToRender.length === 0 && currentFilterType === "favourite") {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-heart" style="font-size: 48px; margin-bottom: 10px; color: #ff4757;"></i>
                <p>No favorite songs yet</p>
                <p style="font-size: 14px; margin-top: 10px;">Click the heart icon to add songs to favorites</p>
            </div>
        `;
        return;
    }
    
    if (songsToRender.length === 0 && currentMusicDirector) {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-drum" style="font-size: 48px; margin-bottom: 10px; color: var(--primary-color);"></i>
                <p>No songs by ${currentMusicDirector}</p>
                <p style="font-size: 14px; margin-top: 10px;">Try another music director</p>
            </div>
        `;
        return;
    }
    
    if (songsToRender.length === 0) {
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
    
    songsToRender.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        fragment.appendChild(songItem);
    });
    
    songListContainer.appendChild(fragment);
    
    // FIX: Force update of active state after rendering
    if (lastActiveSongId) {
        const song = songs.find(s => s.id === lastActiveSongId);
        if (song && song.active) {
            setTimeout(() => {
                setCorrectActiveState(song.id, song.currentType);
                updateSongArtRotation();
            }, 100);
        }
    }
}

// Load a song
function loadSong(index, autoPlay = true) {
    if (isAudioLoading) {
        return;
    }
    
    console.log("loadSong called, index:", index, "Search active:", isSearchActive);
    
    // Check network before loading
    if (!isOnline) {
        showNetworkErrorModal();
        return;
    }
    
    audioLoading.classList.add('active');
    isAudioLoading = true;
    
    // FIX: Ensure currentSongIndex is updated
    currentSongIndex = index;
    const song = songs[index];
    
    // FIX: If song doesn't have currentType, set it
    if (!song.currentType) {
        const audioTypes = song.availableTypes.filter(type => 
            type !== "podcast" && getAudioForType(song, type)
        );
        song.currentType = audioTypes.length > 0 ? audioTypes[0] : "male";
    }
    
    const currentType = song.currentType;
    
    lastClickedSongId = song.id;
    lastActiveSongId = song.id;
    lastActiveSongType = currentType;
    
    // Set this song as active in the songs array
    songs.forEach((s, i) => {
        s.active = (i === index);
    });
    
    // FIX: Ensure correct active state is set - THIS IS CRITICAL
    setCorrectActiveState(song.id, currentType);
    
    // Get versioned title and clean artist
    const displayTitle = getTitleForType(song, currentType);
    const cleanArtist = getArtistForType(song, currentType);
    
    // Update all displays with innerHTML for version suffixes
    songTitleDisplay.innerHTML = displayTitle;
    songArtistDisplay.textContent = cleanArtist;
    mobileSongTitle.innerHTML = displayTitle;
    mobileSongArtist.textContent = cleanArtist;
    lyricsPlayerTitle.innerHTML = `${displayTitle} - ${cleanArtist}`;
    
    // Update lyrics header - IMPORTANT FOR LYRIC BUTTON
    lyricsSongTitle.innerHTML = displayTitle;
    lyricsSongArtist.textContent = cleanArtist;
    
    // Update lyrics for current song - FIX FOR LYRIC BUTTON ISSUE
    loadLyrics(song.lyrics, displayTitle, cleanArtist);
    
    if (swiper) {
        // Find the slide index in the current view (could be filtered or search results)
        let slideIndex = 0;
        if (isSearchActive) {
            slideIndex = searchResults.findIndex(s => s.id === song.id);
        } else {
            slideIndex = filteredSongs.findIndex(s => s.id === song.id);
        }
        
        if (slideIndex >= 0) {
            setTimeout(() => {
                swiper.slideToLoop(slideIndex);
            }, 10);
        }
    }
    
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
                
                // Don't show version loaded notification when in list mode or music director mode
                if (currentFilterType !== "list" && !currentMusicDirector) {
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
                    showNetworkErrorModal();
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
        console.error("Invalid index in setActiveSong:", index);
        return;
    }
    
    console.log("setActiveSong called with index:", index, "Song:", songs[index].title, "Search active:", isSearchActive);
    
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
    
    // Update UI with correct active state - IMPORTANT: Do this BEFORE loadSong
    setCorrectActiveState(song.id, currentType);
    
    // FIX: Ensure the song has the correct currentType
    if (song.currentType !== currentType) {
        song.currentType = currentType;
    }
    
    // Load the song with auto-play
    loadSong(index, isAutoPlayEnabled);
    
    // FIX: Update search results UI if in search mode
    if (isSearchActive && searchResults.length > 0) {
        console.log("Search is active, updating UI for search results");
        
        // Update the search results immediately
        setTimeout(() => {
            // FIX: Re-render search results with correct active state
            renderSearchResults(searchResults);
            updateSongArtRotation(); // Force update rotation
            
            // Also update carousel if in search mode
            if (swiper) {
                const searchResultIndex = searchResults.findIndex(s => s.id === song.id);
                if (searchResultIndex >= 0) {
                    setTimeout(() => {
                        swiper.slideToLoop(searchResultIndex);
                    }, 100);
                }
            }
        }, 100);
    }
}

// Load lyrics from file
async function loadLyrics(lyricsFile, songTitle, songArtist) {
    try {
        // Set title and artist in lyrics header
        if (lyricsSongTitle) {
            lyricsSongTitle.innerHTML = songTitle;
        }
        if (lyricsSongArtist) {
            lyricsSongArtist.textContent = songArtist;
        }
        
        // Set loading text for lyrics content
        if (lyricsText) {
            lyricsText.textContent = "Loading lyrics...";
        }
        
        if (!lyricsFile || lyricsFile.trim() === '') {
            if (lyricsText) {
                lyricsText.textContent = "No lyrics available for this song.";
            }
            return;
        }
    
        // Check network before loading lyrics
        if (!isOnline) {
            showNetworkErrorModal();
            if (lyricsText) {
                lyricsText.textContent = "No internet connection. Cannot load lyrics.";
            }
            return;
        }
        
        const response = await fetch(lyricsFile);
        if (response.ok) {
            const lyricsContent = await response.text();
            // Only show the lyrics text, NOT the title and artist (they're in the header)
            if (lyricsText) {
                lyricsText.textContent = lyricsContent.trim();
            }
        } else {
            if (lyricsText) {
                lyricsText.textContent = "Lyrics file not found.";
            }
        }
    } catch (error) {
        console.error("Error loading lyrics:", error);
        // Check if it's a network error
        if (error.message.includes("network") || error.message.includes("Network")) {
            showNetworkErrorModal();
        }
        if (lyricsText) {
            lyricsText.textContent = "Error loading lyrics.";
        }
    }
}

// Apply filter
function applyFilter(type) {
    // Clear music director filter when switching to other filters
    if (type !== "music" && currentMusicDirector) {
        currentMusicDirector = null;
        musicDirectorSongs = [];
    }
    
    // Only clear search when changing filter type if NOT in search mode
    if (type !== currentFilterType && (!isSearchActive || currentSearchTerm.trim() === "")) {
        isSearchActive = false;
        currentSearchTerm = "";
        searchResults = [];
        originalFilteredSongsBeforeSearch = [];
        if (searchInput) searchInput.value = "";
        if (mobileSearchInput) mobileSearchInput.value = "";
        updateSearchClearButtons();
    }
    
    // Check network if loading audio files
    if (type !== "list" && type !== "favourite" && type !== "about" && type !== "music" && !isOnline) {
        showNetworkErrorModal();
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
    } else if (type === "music") {
        // Open music director modal - no notification here
        openMusicDirectorModal();
        return;
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
    } else if (type === "music") {
        // Handled above
        return;
    } else {
        currentFilterType = type;
        filteredSongs = filterSongsByType(type);
    }
    
    // If in search mode, update search results for the new filter
    if (isSearchActive && currentSearchTerm) {
        setTimeout(() => {
            updateSearchResultsAfterFilter();
        }, 50);
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
        
        // Update lyrics header
        lyricsSongTitle.textContent = "Select a song";
        lyricsSongArtist.textContent = "";
        
        return;
    }
    
    // Set current type for all songs in filtered list
    if (type !== "podcast" && type !== "favourite" && type !== "list" && type !== "music") {
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
                if (type !== "podcast" && type !== "favourite" && type !== "list" && type !== "music") {
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
                    songTitleDisplay.innerHTML = displayTitle;
                    songArtistDisplay.textContent = cleanArtist;
                    mobileSongTitle.innerHTML = displayTitle;
                    mobileSongArtist.textContent = cleanArtist;
                    lyricsPlayerTitle.innerHTML = `${displayTitle} - ${cleanArtist}`;
                    
                    // Update lyrics header
                    lyricsSongTitle.innerHTML = displayTitle;
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

// Play audio
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
        markUserInteraction();
        
        console.log("Attempting to play audio...");
        
        // IMPORTANT: For iOS and some Android devices, ensure user interaction
        if (!hasUserInteracted) {
            // Create a fake user interaction
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(clickEvent);
            hasUserInteracted = true;
        }
        
        // Set volume to ensure audio plays
        audioPlayer.volume = 1.0;
        
        // Use a Promise to handle playback
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("✅ Audio playback started successfully");
                    isPlaying = true;
                    updatePlayButtons();
                    startProgressUpdate();
                    showNotification("Now playing", 1500);
                    
                    checkScrollForProgress();
                    
                    // Request wake lock for background playback
                    if ('wakeLock' in navigator && isPlaying) {
                        navigator.wakeLock.request('screen').then(wl => {
                            wakeLock = wl;
                            console.log("✅ Wake lock acquired for background playback");
                            
                            // Re-acquire if released
                            wl.addEventListener('release', () => {
                                console.log("⚠️ Wake lock released, re-acquiring...");
                                if (isPlaying) {
                                    setTimeout(setupWakeLock, 1000);
                                }
                            });
                        }).catch(err => {
                            console.log("⚠️ Wake lock error:", err);
                        });
                    }
                    
                    // Start silent audio for Android background
                    if (window.silentAudio) {
                        window.silentAudio.play().catch(e => {
                            console.log("Silent audio play error:", e);
                        });
                    }
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
}

// Pause audio
function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButtons();
    stopProgressUpdate();
    
    // Release wake lock when paused
    releaseWakeLock();
    
    // Stop silent audio
    if (window.silentAudio) {
        window.silentAudio.pause();
    }
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
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updateSongArtRotation();
        
        console.log("⏸️ Audio paused");
    });
    
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtons();
        stopProgressUpdate();
        
        console.log("⏹️ Audio ended");
        
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
            showNetworkErrorModal();
        }
        
        audioLoading.textContent = errorMsg;
        isPlaying = false;
        updatePlayButtons();
        
        setTimeout(() => {
            audioLoading.classList.remove('active');
            audioLoading.textContent = "";
        }, 3000);
        
        showNotification(errorMsg, 3000);
    });
    
    // Enhanced page visibility handling for sleep mode
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log("📱 Page hidden - applying sleep mode protection");
            
            // Save playback state
            savePlaybackState();
            
        } else {
            // When page becomes visible again, ensure audio is playing if it should be
            if (isPlaying && audioPlayer.paused) {
                setTimeout(() => {
                    audioPlayer.play().catch(e => {
                        console.log("Failed to resume after visibility change:", e);
                    });
                }, 100);
            }
        }
    });
    
    // Handle audio suspend events (Android sleep mode)
    audioPlayer.addEventListener('suspend', () => {
        console.log("Audio suspended by system");
    });
    
    // iOS specific handling
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        // iOS requires user gesture for audio to play in background
        document.addEventListener('touchstart', () => {
            // This helps iOS recognize user interaction
            markUserInteraction();
        }, { once: true });
    }
}

// Handle search function
function handleSearch(e) {
    markUserInteraction();
    const searchTerm = e.target.value.toLowerCase();
    currentSearchTerm = searchTerm;
    
    // Update search active state
    isSearchActive = searchTerm.length > 0;
    
    console.log("Search term:", searchTerm, "Search active:", isSearchActive);
    
    // Save original filtered songs before search
    if (isSearchActive && originalFilteredSongsBeforeSearch.length === 0) {
        originalFilteredSongsBeforeSearch = [...filteredSongs];
    }
    
    // If there's a search term, apply search filter
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        // Filter ALL SONGS for search, not just current filteredSongs
        searchResults = songs.filter(song => 
            song.title.toLowerCase().includes(searchLower) ||
            (song.artist && song.artist.toLowerCase().includes(searchLower))
        );
        
        console.log("Search results found:", searchResults.length);
        
        // Show search results in song list
        renderSearchResults(searchResults);
        
        // Update carousel with search results
        if (searchResults.length > 0) {
            renderCarouselForSearch(searchResults);
        } else {
            carouselContainer.innerHTML = `
                <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 10px;"></i>
                    <p>No songs found for "${searchTerm}"</p>
                </div>
            `;
        }
        
        // Update notification
        if (searchResults.length > 0) {
            showNotification(`Found ${searchResults.length} songs`, 2000);
        }
    } else {
        // Clear search - restore original filter
        isSearchActive = false;
        searchResults = [];
        originalFilteredSongsBeforeSearch = [];
        
        console.log("Search cleared, restoring original filter");
        
        // Restore original filtered songs
        renderSongList();
        renderCarousel();
        if (swiper) {
            swiper.destroy(true, true);
            initSwiper();
        }
    }
    
    // Update clear button visibility
    updateSearchClearButtons();
    
    // Force update of active state after search
    if (lastActiveSongId) {
        const song = songs.find(s => s.id === lastActiveSongId);
        if (song) {
            setTimeout(() => {
                setCorrectActiveState(song.id, song.currentType);
                updateSongArtRotation();
            }, 100);
        }
    }
}

// Render search results
function renderSearchResults(searchResults) {
    songListContainer.innerHTML = '';
    
    if (searchResults.length === 0) {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 10px;"></i>
                <p>No songs found for "${currentSearchTerm}"</p>
            </div>
        `;
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    searchResults.forEach((song, index) => {
        const songItem = createSongItem(song, index);
        fragment.appendChild(songItem);
    });
    
    songListContainer.appendChild(fragment);
    
    // FIX: Force update of active state after rendering search results
    if (lastActiveSongId) {
        const activeSong = songs.find(s => s.id === lastActiveSongId);
        if (activeSong && activeSong.active) {
            setTimeout(() => {
                setCorrectActiveState(activeSong.id, activeSong.currentType);
                updateSongArtRotation();
            }, 100);
        }
    }
}

// Render carousel for search results
function renderCarouselForSearch(songsToShow) {
    carouselContainer.innerHTML = '';
    
    songsToShow.forEach((song, index) => {
        const slide = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        slide.className = `swiper-slide ${isActive ? 'active' : ''}`;
        slide.dataset.index = index;
        slide.dataset.id = song.id;
        
        const currentType = song.currentType || currentFilterType;
        const displayTitle = getTitleForType(song, currentType, "carousel");
        const cleanArtist = getArtistForType(song, currentType);
        
        slide.innerHTML = `
            <div class="carousel-slide">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='images/defaultphoto.jpg'">
                <div class="carousel-info">
                    <h4 class="carousel-title">${displayTitle}</h4>
                    <p class="carousel-artist">${cleanArtist}</p>
                </div>
            </div>
        `;
        
        slide.addEventListener('click', () => {
            markUserInteraction();
            
            // FIX 1: Close mobile search when a song is selected
            if (isMobileSearchOpen) {
                closeMobileSearch();
            }
            
            lastClickedSongId = song.id;
            lastClickedTrackId = song.trackId;
            lastActiveSongId = song.id;
            lastActiveSongType = currentType;
            
            // FIX: Find the correct index in the ORIGINAL songs array
            const originalIndex = songs.findIndex(s => s.id === song.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        });
        
        carouselContainer.appendChild(slide);
    });
    
    // Reinitialize swiper with search results
    if (swiper) {
        swiper.destroy(true, true);
        initSwiper();
    }
}

// Update search results after filter change
function updateSearchResultsAfterFilter() {
    if (isSearchActive && currentSearchTerm) {
        const searchLower = currentSearchTerm.toLowerCase();
        // Re-filter the current filteredSongs
        searchResults = filteredSongs.filter(song => 
            song.title.toLowerCase().includes(searchLower) ||
            song.artist.toLowerCase().includes(searchLower)
        );
        
        // Re-render with updated search results
        renderSearchResults(searchResults);
        
        if (searchResults.length > 0) {
            renderCarouselForSearch(searchResults);
        }
    }
}

// Setup sidebar menu
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
                // Clear search when changing filter via sidebar
                isSearchActive = false;
                currentSearchTerm = "";
                searchResults = [];
                originalFilteredSongsBeforeSearch = [];
                if (searchInput) searchInput.value = "";
                if (mobileSearchInput) mobileSearchInput.value = "";
                updateSearchClearButtons();
                
                applyFilter(type);
            }
            
            toggleSidebar();
        });
    });
}

// Setup music director events
function setupMusicDirectorEvents() {
    // Add click event to sidebar music item
    const sidebarMusicItem = document.querySelector('.menu li[data-type="music"]');
    if (sidebarMusicItem) {
        sidebarMusicItem.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
            openMusicDirectorModal();
            toggleSidebar();
        });
    }
    
    // Add click event to player controls music button
    const playerMusicButton = document.querySelector('.control-btn[data-type="music"]');
    if (playerMusicButton) {
        playerMusicButton.addEventListener('click', (e) => {
            markUserInteraction();
            e.stopPropagation();
            openMusicDirectorModal();
        });
    }
    
    // Close music director modal
    if (closeMusicDirector) {
        closeMusicDirector.addEventListener('click', closeMusicDirectorModal);
    }
    
    // Close modal when clicking outside
    if (musicDirectorModal) {
        musicDirectorModal.addEventListener('click', (e) => {
            if (e.target === musicDirectorModal) {
                closeMusicDirectorModal();
            }
        });
    }
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

    // FIX 2: Lyrics button handler - DON'T stop audio when closing
    lyricsBtn.addEventListener('click', async () => {
        markUserInteraction();
        
        console.log("Lyrics button clicked. CurrentSongIndex:", currentSongIndex, 
                    "LastActiveSongId:", lastActiveSongId, "isSearchActive:", isSearchActive);
        
        // ALWAYS use lastActiveSongId if available (this is the key fix)
        let targetSongId = lastActiveSongId;
        
        // If no last active, fall back to current song index
        if (!targetSongId && currentSongIndex >= 0 && currentSongIndex < songs.length) {
            targetSongId = songs[currentSongIndex].id;
        }
        
        if (targetSongId) {
            const songIndex = songs.findIndex(s => s.id === targetSongId);
            if (songIndex >= 0) {
                const currentSong = songs[songIndex];
                const displayTitle = getTitleForType(currentSong, currentSong.currentType);
                const cleanArtist = getArtistForType(currentSong, currentSong.currentType);
                
                // Load lyrics for the correct song
                await loadLyrics(currentSong.lyrics, displayTitle, cleanArtist);
                
                // Update lyrics modal header with current song info
                if (lyricsSongTitle) {
                    lyricsSongTitle.innerHTML = displayTitle;
                }
                if (lyricsSongArtist) {
                    lyricsSongArtist.textContent = cleanArtist;
                }
                
                // Update lyrics player title
                if (lyricsPlayerTitle) {
                    lyricsPlayerTitle.innerHTML = `${displayTitle} - ${cleanArtist}`;
                }
                
                // Show the modal
                lyricsModal.classList.add('active');
                
                console.log("Showing lyrics for:", displayTitle, cleanArtist);
            } else {
                showNotification("Song not found", 2000);
            }
        } else {
            showNotification("Please select a song first", 2000);
        }
    });

    // FIX 2: Close lyrics button - DON'T stop audio
    closeLyrics.addEventListener('click', () => {
        // Simply close the modal without pausing audio
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
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            markUserInteraction();
            const type = e.currentTarget.dataset.type;
            
            // DON'T clear search if we're currently in search mode
            // Only clear if NOT in search mode
            if (!isSearchActive || currentSearchTerm.trim() === "") {
                isSearchActive = false;
                currentSearchTerm = "";
                searchResults = [];
                originalFilteredSongsBeforeSearch = [];
                if (searchInput) searchInput.value = "";
                if (mobileSearchInput) mobileSearchInput.value = "";
                updateSearchClearButtons();
            }
            
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
            isSearchActive = false;
            currentSearchTerm = "";
            searchResults = [];
            originalFilteredSongsBeforeSearch = [];
            handleSearch({ target: searchInput });
            updateSearchClearButtons();
        });
    }
    
    if (mobileSearchClear) {
        mobileSearchClear.addEventListener('click', () => {
            mobileSearchInput.value = '';
            mobileSearchInput.focus();
            isSearchActive = false;
            currentSearchTerm = "";
            searchResults = [];
            originalFilteredSongsBeforeSearch = [];
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
                    // FIX 2: Don't pause audio when closing via swipe
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
                // FIX 2: Don't pause audio when closing via swipe
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
    document.querySelectorAll('.song-item').forEach(songItem => {
        const songId = parseInt(songItem.dataset.id);
        const songArt = songItem.querySelector('.song-item-art');
        
        if (!songArt) return;
        
        // Find the song in the songs array
        const song = songs.find(s => s.id === songId);
        
        if (song && song.active) {
            // This song is active
            if (isPlaying && song.currentType !== "podcast") {
                songArt.classList.add('rotating');
                songArt.classList.remove('selected');
            } else {
                songArt.classList.add('selected');
                songArt.classList.remove('rotating');
            }
        } else {
            // This song is not active
            songArt.classList.remove('rotating', 'selected');
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
