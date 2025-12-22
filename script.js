// ==================== COMPLETE FIXED SCRIPT.JS ====================

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

// State variables
let isPlaying = false;
let currentSongIndex = 0;
let isDarkMode = false;
let isMobileSearchOpen = false;
let updateInterval;
let currentLyrics = "";
let swiper = null;
let currentFilterType = "male";
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
        default: return "fas fa-music";
    }
}

// Get display artist name based on type
function getArtistForType(song, type) {
    const baseArtist = song.artist.replace(/\((Male|Female|Duet|Original|Song|Podcast)\)/gi, '').trim();
    
    switch(type) {
        case "male": return `${baseArtist} (Male)`;
        case "female": return `${baseArtist} (Female)`;
        case "duet": return `${baseArtist} (Duet)`;
        case "song": return `${baseArtist} (Original)`;
        case "podcast": return `${baseArtist} (Podcast)`;
        case "favourite": return `${baseArtist} (Favourite)`;
        default: return baseArtist;
    }
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
    return songs.filter(song => song.availableTypes.includes(type));
}

// Count songs by type
function countSongsByType(type) {
    if (type === "favourite") {
        return favoriteSongs.length;
    }
    return songs.filter(song => song.availableTypes.includes(type)).length;
}

// Get display name for type
function getTypeDisplayName(type) {
    const names = {
        "male": "Solo Male",
        "female": "Solo Female", 
        "duet": "Duet",
        "song": "Original Song",
        "favourite": "Favourites",
        "podcast": "Lyrics",
        "developed": "Developed by Venkattaraman"
    };
    return names[type] || type;
}

// Update sidebar with song counts
function updateSidebarWithCounts() {
    const menu = document.querySelector('.menu');
    if (!menu) return;
    
    menu.innerHTML = '';
    
    const menuItems = [
        { type: "male", icon: "fa-mars" },
        { type: "female", icon: "fa-venus" },
        { type: "duet", icon: "fa-venus-mars" },
        { type: "song", icon: "fa-music" },
        { type: "podcast", icon: "fa-podcast" },
        { type: "favourite", icon: "fa-heart" },
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
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        if (btn.dataset.type === activeType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.menu li[data-type]').forEach(item => {
        if (item.dataset.type === activeType) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Check if type is audio type
function isAudioType(type) {
    return type !== "podcast" && type !== "favourite";
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
                if (btnType === versionType) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } else {
            item.classList.remove('active');
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
            // Update active state in songs array
            songs.forEach((song, index) => {
                song.active = (song.id === songId);
                if (song.active) {
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
            
            // Update song info display
            const song = songs.find(s => s.id === songId);
            if (song) {
                const artistName = getArtistForType(song, versionType);
                
                songTitleDisplay.textContent = song.title;
                songArtistDisplay.textContent = artistName;
                mobileSongTitle.textContent = song.title;
                mobileSongArtist.textContent = artistName;
                lyricsPlayerTitle.textContent = `${song.title} - ${artistName}`;
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

// Check scroll position and show/hide mobile progress - FIXED
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

// Initialize the app
function init() {
    console.log("=== INITIALIZING APP ===");
    
    favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    
    currentFilterType = "male";
    filteredSongs = filterSongsByType(currentFilterType);
    updateActiveFilterButton(currentFilterType);
    
    songs.forEach(song => {
        if (!song.currentType) {
            for (const type of song.availableTypes) {
                if (type !== "podcast" && getAudioForType(song, type)) {
                    song.currentType = type;
                    break;
                }
            }
            if (!song.currentType) {
                song.currentType = "male";
            }
        }
    });
    
    // Ensure we have a single active song
    ensureSingleActiveSong();
    
    renderSongList();
    renderCarousel();
    initSwiper();
    
    if (filteredSongs.length > 0) {
        const firstSong = filteredSongs[0];
        const originalIndex = songs.findIndex(s => s.id === firstSong.id);
        if (originalIndex >= 0) {
            currentSongIndex = originalIndex;
            songs[originalIndex].active = true;
            lastClickedSongId = firstSong.id;
            lastClickedTrackId = firstSong.trackId;
            lastActiveSongId = firstSong.id;
            lastActiveSongType = firstSong.currentType || currentFilterType;
            
            // Update UI for the active song
            updateSelectedSongUI(firstSong.id, firstSong.currentType || currentFilterType);
            loadSong(originalIndex, false);
        }
    }
    
    setupEventListeners();
    setupAudioEvents();
    setupSidebarMenu();
    setupAutoPlayToggle();
    
    // Add scroll listener for progress visibility - THROTTLED
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
    
    // Initial check
    setTimeout(() => {
        checkScrollForProgress();
    }, 500);
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
    
    filteredSongs.forEach((song, index) => {
        const slide = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        slide.className = `swiper-slide ${isActive ? 'active' : ''}`;
        slide.dataset.index = index;
        slide.dataset.id = song.id;
        
        const currentType = song.currentType || currentFilterType;
        
        slide.innerHTML = `
            <div class="carousel-slide">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='images/defaultphoto.jpg'">
                <div class="carousel-info">
                    <h4 class="carousel-title">${song.title}</h4>
                    <p class="carousel-artist">${getArtistForType(song, currentType)}</p>
                </div>
            </div>
        `;
        
        slide.addEventListener('click', () => {
            markUserInteraction();
            
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

// Render song list
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
    
    const fragment = document.createDocumentFragment();
    
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        songItem.className = `song-item ${isActive ? 'active' : ''}`;
        songItem.dataset.id = song.id;
        songItem.dataset.index = index;
        songItem.dataset.trackId = song.trackId;
        
        const currentType = song.currentType || currentFilterType;
        const iconClass = getSongTypeIcon(currentType);
        const isFavorite = favoriteSongs.includes(song.id);
        
        let versionSelector = '';
        
        song.availableTypes.forEach(type => {
            const isCurrent = (type === currentType);
            const audioPath = getAudioForType(song, type);
            
            if (type === "podcast") {
                versionSelector += `
                    <button class="version-btn lyrics-btn ${isCurrent ? 'active' : ''}" 
                            data-id="${song.id}" 
                            data-track-id="${song.trackId}"
                            data-type="${type}"
                            title="Show Lyrics">
                        <i class="fas fa-podcast"></i>
                    </button>
                `;
            } else if (audioPath) {
                const btnTitle = type === "song" ? "Original" : 
                                type === "male" ? "Male" :
                                type === "female" ? "Female" : 
                                "Duet";
                
                versionSelector += `
                    <button class="version-btn audio-btn ${isCurrent ? 'active' : ''}" 
                            data-id="${song.id}" 
                            data-track-id="${song.trackId}"
                            data-type="${type}"
                            title="${btnTitle} Version">
                        <i class="${getSongTypeIcon(type)}"></i>
                    </button>
                `;
            }
        });
        
        versionSelector += `
            <button class="version-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                    data-id="${song.id}" 
                    data-track-id="${song.trackId}"
                    data-type="favourite"
                    title="${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}">
                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
            </button>
        `;
        
        songItem.innerHTML = `
            <div class="song-item-art">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='images/defaultphoto.jpg'">
            </div>
            <div class="song-item-info">
                <h4 class="song-item-title">${song.title}</h4>
                <p class="song-item-artist">${getArtistForType(song, currentType)}</p>
                <div class="version-selector">
                    ${versionSelector}
                </div>
            </div>
            <div class="song-item-type">
                <i class="${iconClass}"></i>
            </div>
        `;
        
        const favoriteBtn = songItem.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', (e) => {
                markUserInteraction();
                e.stopPropagation();
                const songId = parseInt(e.currentTarget.dataset.id);
                toggleFavorite(songId);
            });
        }
        
        // FIXED: Version button click handler
        songItem.querySelectorAll('.version-btn.audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                markUserInteraction();
                e.stopPropagation();
                const songId = parseInt(btn.dataset.id);
                const trackId = parseInt(btn.dataset.trackId);
                const versionType = btn.dataset.type;
                
                const songIndex = songs.findIndex(s => s.id === songId);
                if (songIndex < 0) return;
                
                lastClickedSongId = songId;
                lastClickedTrackId = trackId;
                lastActiveSongId = songId;
                lastActiveSongType = versionType;
                
                // Update the current type for this specific song only
                songs[songIndex].currentType = versionType;
                
                // Update UI for this specific song
                updateSelectedSongUI(songId, versionType);
                
                // Load the song with the selected version
                loadSong(songIndex, isAutoPlayEnabled);
                
                // Update global filter if different
                if (versionType !== currentFilterType) {
                    currentFilterType = versionType;
                    filteredSongs = filterSongsByType(versionType);
                    
                    setTimeout(() => {
                        updateActiveFilterButton(versionType);
                        updateSidebarWithCounts();
                        
                        // Re-render
                        renderSongList();
                        renderCarousel();
                        
                        if (swiper) {
                            swiper.destroy(true, true);
                            initSwiper();
                        }
                        
                        // Re-activate the current song
                        updateSelectedSongUI(songId, versionType);
                    }, 50);
                }
            });
        });
        
        songItem.querySelectorAll('.version-btn.lyrics-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        markUserInteraction();
        e.stopPropagation();
        const songId = parseInt(btn.dataset.id);
        const trackId = parseInt(btn.dataset.trackId);
        const versionType = btn.dataset.type;
        
        const songIndex = songs.findIndex(s => s.id === songId);
        if (songIndex >= 0) {
            const song = songs[songIndex];
            
            lastClickedSongId = songId;
            lastClickedTrackId = trackId;
            lastActiveSongId = songId;
            lastActiveSongType = song.currentType;
            
            // FIX: Only update UI and load lyrics WITHOUT restarting the audio
            // if it's the same song that's currently playing
            if (currentSongIndex === songIndex) {
                // Same song - just update UI and open lyrics modal
                updateSelectedSongUI(songId, song.currentType);
                
                // Update progress display in lyrics modal to match current playback
                if (isPlaying) {
                    // Sync lyrics progress with current playback
                    lyricsCurrentTime.textContent = formatTime(audioPlayer.currentTime);
                    lyricsTotalTime.textContent = formatTime(audioPlayer.duration);
                    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                    lyricsProgress.style.width = `${progressPercent}%`;
                }
            } else {
                // Different song - load it normally
                setActiveSong(songIndex);
            }
            
            await loadLyrics(song.lyrics, song, song.currentType);
            lyricsPlayerTitle.textContent = `${song.title} - ${getArtistForType(song, song.currentType)}`;
            lyricsModal.classList.add('active');
        }
    });
});
        
        songItem.addEventListener('click', (e) => {
            if (e.target.closest('.version-btn')) {
                return;
            }
            
            markUserInteraction();
            
            lastClickedSongId = song.id;
            lastClickedTrackId = song.trackId;
            lastActiveSongId = song.id;
            lastActiveSongType = song.currentType || currentFilterType;
            
            const originalIndex = songs.findIndex(s => s.id === song.id);
            if (originalIndex >= 0) {
                setActiveSong(originalIndex);
            }
        });
        
        fragment.appendChild(songItem);
    });
    
    songListContainer.appendChild(fragment);
}

// Load a song - FIXED AUDIO PLAYBACK
function loadSong(index, autoPlay = true) {
    if (isAudioLoading) {
        return;
    }
    
    audioLoading.classList.add('active');
    isAudioLoading = true;
    
    currentSongIndex = index;
    const song = songs[index];
    const currentType = song.currentType || currentFilterType;
    
    lastClickedSongId = song.id;
    lastClickedTrackId = song.trackId;
    lastActiveSongId = song.id;
    lastActiveSongType = currentType;
    
    // Set this song as active
    songs.forEach((s, i) => {
        s.active = (i === index);
    });
    
    setCorrectActiveState(song.id, currentType);
    
    const artistName = getArtistForType(song, currentType);
    songTitleDisplay.textContent = song.title;
    songArtistDisplay.textContent = artistName;
    mobileSongTitle.textContent = song.title;
    mobileSongArtist.textContent = artistName;
    lyricsPlayerTitle.textContent = `${song.title} - ${artistName}`;
    
    if (swiper) {
        const slideIndex = filteredSongs.findIndex(s => s.id === song.id);
        if (slideIndex >= 0) {
            setTimeout(() => {
                swiper.slideToLoop(slideIndex);
            }, 10);
        }
    }
    
    loadLyrics(song.lyrics, song, currentType);
    
    if (isAudioType(currentType)) {
        const audioPath = getAudioForType(song, currentType);
        
        if (audioPath) {
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
                
                showNotification(`${versionName} version loaded`, 2000);
                
                // Auto play if enabled
                const shouldAutoPlay = autoPlay && isAutoPlayEnabled;
                if (shouldAutoPlay) {
                    // Small delay to ensure audio is ready
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
                console.error("Audio loading error:", e);
                
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
                    }
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
    const currentType = song.currentType || currentFilterType;
    
    // Update last clicked IDs
    lastClickedSongId = songs[index].id;
    lastClickedTrackId = songs[index].trackId;
    lastActiveSongId = songs[index].id;
    lastActiveSongType = currentType;
    
    // Update active state
    songs.forEach((s, i) => {
        s.active = (i === index);
    });
    
    // Update UI
    updateSelectedSongUI(song.id, currentType);
    
    // Load the song with auto-play
    loadSong(index, isAutoPlayEnabled);
}

// Update song UI
function updateSongUI(song, type) {
    const artistName = getArtistForType(song, type);
    
    songTitleDisplay.textContent = song.title;
    songArtistDisplay.textContent = artistName;
    mobileSongTitle.textContent = song.title;
    mobileSongArtist.textContent = artistName;
    lyricsPlayerTitle.textContent = `${song.title} - ${artistName}`;
    
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
            
            const artistElement = slide.querySelector('.carousel-artist');
            if (artistElement) {
                artistElement.textContent = artistName;
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

// Load lyrics from file
async function loadLyrics(lyricsFile, song, currentType) {
    try {
        lyricsText.textContent = "Loading lyrics...";
        
        if (!lyricsFile || lyricsFile.trim() === '') {
            lyricsText.textContent = `${song.title}\n${getArtistForType(song, currentType)}\n\nNo lyrics available.`;
            return;
        }
        
        const response = await fetch(lyricsFile);
        if (response.ok) {
            const lyricsContent = await response.text();
            let lyricsWithSeparator = lyricsContent.trim();
            if (lyricsWithSeparator) {
                lyricsWithSeparator += '\n\n---';
            }
            lyricsText.textContent = lyricsWithSeparator;
        } else {
            lyricsText.textContent = `${song.title}\n${getArtistForType(song, currentType)}\n\nLyrics file not found.`;
        }
    } catch (error) {
        lyricsText.textContent = `${song.title}\n${getArtistForType(song, currentType)}\n\nError loading lyrics.`;
    }
}

// Apply filter
function applyFilter(type) {
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
    }
    
    if (type === "podcast") {
        currentFilterType = "male";
        filteredSongs = songs.filter(song => song.availableTypes.includes("podcast"));
    } else if (type === "favourite") {
        currentFilterType = "favourite";
        filteredSongs = filterSongsByType("favourite");
        
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const songId = parseInt(btn.dataset.id);
            if (favoriteSongs.includes(songId)) {
                const icon = btn.querySelector('i');
                icon.className = 'fas fa-heart';
                btn.classList.add('active');
            }
        });
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
                    <p>No ${type} songs available</p>
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
        return;
    }
    
    // Set current type for all songs in filtered list
    if (type !== "podcast" && type !== "favourite") {
        filteredSongs.forEach(song => {
            song.currentType = type;
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
                
                // Update the song's current type to match the filter
                if (type !== "podcast" && type !== "favourite") {
                    songs[originalIndex].currentType = type;
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
                
                // Load and play the song
                loadSong(originalIndex, isAutoPlayEnabled);
                
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

// Play audio - FIXED PLAYBACK
function playAudio() {
    if (!audioPlayer.src || audioPlayer.src === "") {
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (audioPlayer.error) {
        showNotification("Audio error - trying to reload...", 2000);
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (audioPlayer.readyState < 2) {
        audioLoading.classList.add('active');
        audioLoading.textContent = "Loading audio...";
        
        const onCanPlay = () => {
            audioPlayer.removeEventListener('canplay', onCanPlay);
            audioLoading.classList.remove('active');
            audioLoading.textContent = "";
            attemptPlay();
        };
        
        audioPlayer.addEventListener('canplay', onCanPlay);
        
        setTimeout(() => {
            audioPlayer.removeEventListener('canplay', onCanPlay);
            if (audioPlayer.readyState < 2) {
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
        
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isPlaying = true;
                    updatePlayButtons();
                    startProgressUpdate();
                    showNotification("Now playing", 1500);
                    
                    // Check progress visibility
                    checkScrollForProgress();
                })
                .catch(error => {
                    console.error("Playback error:", error);
                    if (error.name === 'NotAllowedError') {
                        showNotification("Click play button again to start", 3000);
                        isPlaying = false;
                        updatePlayButtons();
                        
                        // Try again with user interaction
                        document.addEventListener('click', function retryPlay() {
                            document.removeEventListener('click', retryPlay);
                            if (!isPlaying) {
                                playAudio();
                            }
                        }, { once: true });
                    } else if (error.name === 'AbortError') {
                        // Ignore abort errors
                    } else {
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
        if (audioPlayer.readyState < 2) {
            audioLoading.classList.add('active');
            audioLoading.textContent = "Preparing audio...";
            
            const checkReady = () => {
                if (audioPlayer.readyState >= 2) {
                    audioLoading.classList.remove('active');
                    audioLoading.textContent = "";
                    playAudio();
                } else {
                    setTimeout(checkReady, 100);
                }
            };
            
            setTimeout(checkReady, 100);
        } else {
            playAudio();
        }
    }
}

// Update play button icons
function updatePlayButtons() {
    if (isPlaying) {
        mobilePlayIcon.className = 'fas fa-pause';
        lyricsPlayIcon.className = 'fas fa-pause';
    } else {
        mobilePlayIcon.className = 'fas fa-play';
        lyricsPlayIcon.className = 'fas fa-play';
    }
}

// Start updating progress
function startProgressUpdate() {
    stopProgressUpdate();
    updateProgress(); // Update immediately
    updateInterval = setInterval(updateProgress, 1000);
}

// Stop updating progress
function stopProgressUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

// Update progress display - FIXED TO UPDATE ALL PROGRESS BARS
function updateProgress() {
    if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        // Update all time displays
        currentTimeEl.textContent = formatTime(currentTime);
        lyricsCurrentTime.textContent = formatTime(currentTime);
        mobileCurrentTime.textContent = formatTime(currentTime);
        
        totalTimeEl.textContent = formatTime(duration);
        lyricsTotalTime.textContent = formatTime(duration);
        mobileTotalTime.textContent = formatTime(duration);
        
        const progressPercent = (currentTime / duration) * 100;
        
        // Update all progress bars
        progress.style.width = `${progressPercent}%`;
        lyricsProgress.style.width = `${progressPercent}%`;
        mobileProgress.style.width = `${progressPercent}%`;
        
        requestAnimationFrame(() => {
            progress.style.transform = `translateZ(0)`;
            lyricsProgress.style.transform = `translateZ(0)`;
            mobileProgress.style.transform = `translateZ(0)`;
        });
    } else {
        // If no duration yet, show 0:00
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

// Set up audio event listeners - FIXED
function setupAudioEvents() {
    audioPlayer.addEventListener('loadedmetadata', () => {
        // Update duration displays when metadata is loaded
        if (!isNaN(audioPlayer.duration)) {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
            lyricsTotalTime.textContent = formatTime(audioPlayer.duration);
            mobileTotalTime.textContent = formatTime(audioPlayer.duration);
        }
    });
    
    audioPlayer.addEventListener('playing', () => {
        audioLoading.classList.remove('active');
        audioLoading.textContent = "";
    });
    
    audioPlayer.addEventListener('pause', () => {
        // Nothing needed
    });
    
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtons();
        stopProgressUpdate();
        
        // Auto play next song only if auto play is enabled
        if (isAutoPlayEnabled) {
            setTimeout(() => {
                playNextSong();
            }, 1000);
        }
    });
    
    audioPlayer.addEventListener('timeupdate', () => {
        // Update progress during playback
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
        
        audioLoading.textContent = errorMsg;
        isPlaying = false;
        updatePlayButtons();
        
        setTimeout(() => {
            audioLoading.classList.remove('active');
            audioLoading.textContent = "";
        }, 3000);
        
        showNotification(errorMsg, 3000);
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Tab is hidden
        } else {
            // Tab is visible again - resume playback if it was playing
            if (isPlaying && audioPlayer.paused) {
                // Small delay to ensure tab is fully active
                setTimeout(() => {
                    playAudio();
                }, 300);
            }
        }
    });
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

// Setup sidebar menu
function setupSidebarMenu() {
    document.querySelectorAll('.menu li[data-type]').forEach(item => {
        item.addEventListener('click', async () => {
            markUserInteraction();
            const type = item.dataset.type;
            
            if (type === "podcast") {
                const currentSong = songs[currentSongIndex];
                await loadLyrics(currentSong.lyrics, currentSong, currentSong.currentType);
                lyricsModal.classList.add('active');
            } else if (type === "developed") {
                showNotification("Designed & Developed by Venkattaraman", 3000);
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
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    });

    mobileSearchToggle.addEventListener('click', () => {
        markUserInteraction();
        isMobileSearchOpen = !isMobileSearchOpen;
        mobileSearchContainer.classList.toggle('active', isMobileSearchOpen);
        
        if (isMobileSearchOpen) {
            setTimeout(() => {
                mobileSearchContainer.querySelector('.mobile-search-input').focus();
            }, 100);
        }
    });

    lyricsBtn.addEventListener('click', async () => {
        markUserInteraction();
        const currentSong = songs[currentSongIndex];
        await loadLyrics(currentSong.lyrics, currentSong, currentSong.currentType);
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
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);

