// ==================== SIMPLIFIED WORKING SCRIPT.JS ====================

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

// State variables
let isPlaying = false;
let currentSongIndex = 0;
let isDarkMode = false;
let isMobileSearchOpen = false;
let updateInterval;
let swiper = null;
let currentFilterType = "male";
let filteredSongs = [];
let isAutoPlayEnabled = true;
let isAudioLoading = false;
let favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];

// ==================== SIMPLIFIED HELPER FUNCTIONS ====================

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

// SIMPLE: Get audio path
function getAudioForType(song, type) {
    if (!song.audio) return null;
    
    // If audio is a string, use it
    if (typeof song.audio === 'string') {
        return song.audio;
    }
    
    // If audio is an object
    if (typeof song.audio === 'object') {
        // Try the specific type first
        if (song.audio[type]) {
            return song.audio[type];
        }
        
        // Try default
        if (song.audio.default) {
            return song.audio.default;
        }
        
        // Try any audio type
        const types = ["male", "female", "duet", "song"];
        for (const t of types) {
            if (song.audio[t]) {
                return song.audio[t];
            }
        }
    }
    
    return null;
}

// SIMPLE: Filter songs
function filterSongsByType(type) {
    if (type === "favourite") {
        return songs.filter(song => favoriteSongs.includes(song.id));
    }
    
    if (type === "podcast") {
        return songs.filter(song => song.availableTypes.includes("podcast"));
    }
    
    // For audio types: song must have type AND audio
    return songs.filter(song => {
        return song.availableTypes.includes(type) && getAudioForType(song, type) !== null;
    });
}

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

// ==================== CORE FUNCTIONS ====================

function init() {
    console.log("Initializing app...");
    
    favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    
    currentFilterType = "male";
    filteredSongs = filterSongsByType(currentFilterType);
    
    // Initialize song types
    songs.forEach(song => {
        if (!song.currentType) {
            song.currentType = song.availableTypes[0] || "male";
        }
    });
    
    // Set first song as active if available
    if (songs.length > 0) {
        currentSongIndex = 0;
        songs[0].active = true;
    }
    
    renderSongList();
    renderCarousel();
    initSwiper();
    
    if (filteredSongs.length > 0) {
        const firstSong = filteredSongs[0];
        const songIndex = songs.findIndex(s => s.id === firstSong.id);
        if (songIndex >= 0) {
            currentSongIndex = songIndex;
            updateSelectedSongUI(firstSong.id, firstSong.currentType || currentFilterType);
        }
    }
    
    setupEventListeners();
    setupAudioEvents();
    updateSidebarWithCounts();
    
    // Load saved auto-play preference
    const savedAutoPlay = localStorage.getItem('autoPlayEnabled');
    if (savedAutoPlay !== null) {
        isAutoPlayEnabled = savedAutoPlay === 'true';
        updateAutoPlayToggleUI();
    }
}

function initSwiper() {
    if (carouselContainer.children.length === 0) return;
    
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
                if (realIndex < filteredSongs.length && realIndex >= 0) {
                    const song = filteredSongs[realIndex];
                    const songIndex = songs.findIndex(s => s.id === song.id);
                    if (songIndex >= 0 && songIndex !== currentSongIndex) {
                        setActiveSong(songIndex);
                    }
                }
            }
        }
    });
}

function renderCarousel() {
    carouselContainer.innerHTML = '';
    
    filteredSongs.forEach((song, index) => {
        const slide = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        slide.className = `swiper-slide ${isActive ? 'active' : ''}`;
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
            const songIndex = songs.findIndex(s => s.id === song.id);
            if (songIndex >= 0) {
                setActiveSong(songIndex);
            }
        });
        
        carouselContainer.appendChild(slide);
    });
}

function renderSongList() {
    songListContainer.innerHTML = '';
    
    if (filteredSongs.length === 0) {
        songListContainer.innerHTML = `
            <div class="no-songs-message" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="${getSongTypeIcon(currentFilterType)}" style="font-size: 48px; margin-bottom: 10px;"></i>
                <p>No ${currentFilterType} songs available</p>
            </div>
        `;
        return;
    }
    
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement('div');
        const isActive = songs.find(s => s.id === song.id)?.active || false;
        songItem.className = `song-item ${isActive ? 'active' : ''}`;
        songItem.dataset.id = song.id;
        
        const currentType = song.currentType || currentFilterType;
        const iconClass = getSongTypeIcon(currentType);
        const isFavorite = favoriteSongs.includes(song.id);
        
        let versionSelector = '';
        
        // Audio version buttons
        const audioTypes = ["male", "female", "duet", "song"];
        audioTypes.forEach(type => {
            if (song.availableTypes.includes(type)) {
                const audioPath = getAudioForType(song, type);
                const isCurrent = (type === currentType);
                const hasAudio = audioPath !== null;
                
                const btnTitle = type === "song" ? "Original" : 
                                type === "male" ? "Male" :
                                type === "female" ? "Female" : 
                                "Duet";
                
                versionSelector += `
                    <button class="version-btn audio-btn ${isCurrent ? 'active' : ''} ${!hasAudio ? 'disabled' : ''}" 
                            data-type="${type}"
                            title="${btnTitle} Version"
                            ${!hasAudio ? 'disabled' : ''}>
                        <i class="${getSongTypeIcon(type)}"></i>
                    </button>
                `;
            }
        });
        
        // Favorite button
        versionSelector += `
            <button class="version-btn favorite-btn ${isFavorite ? 'active' : ''}" 
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
        
        // Favorite button click
        const favoriteBtn = songItem.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const songId = song.id;
            const index = favoriteSongs.indexOf(songId);
            
            if (index === -1) {
                favoriteSongs.push(songId);
                favoriteBtn.classList.add('active');
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
                showNotification("Added to favorites", 2000);
            } else {
                favoriteSongs.splice(index, 1);
                favoriteBtn.classList.remove('active');
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                showNotification("Removed from favorites", 2000);
            }
            
            localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
            
            if (currentFilterType === "favourite") {
                applyFilter("favourite");
            }
        });
        
        // Version button clicks
        songItem.querySelectorAll('.version-btn.audio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (btn.disabled) {
        showNotification("This version is not available", 2000);
        return;
    }

    const versionType = btn.dataset.type;
    const songIndex = songs.findIndex(s => s.id === song.id);

    if (songIndex >= 0) {
        songs[songIndex].currentType = versionType;

        // ✅ THIS FIXES CAROUSEL + IMAGE + SWIPER
        setActiveSong(songIndex);
    }
});

        });
        
        // Song item click
        songItem.addEventListener('click', () => {
            const songIndex = songs.findIndex(s => s.id === song.id);
            if (songIndex >= 0) {
                setActiveSong(songIndex);
            }
        });
        
        songListContainer.appendChild(songItem);
    });
}

function updateSelectedSongUI(songId, versionType) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;
    
    // Update active states
    songs.forEach(s => {
        s.active = (s.id === songId);
    });
    
    // Update UI
    const artistName = getArtistForType(song, versionType);
    songTitleDisplay.textContent = song.title;
    songArtistDisplay.textContent = artistName;
    mobileSongTitle.textContent = song.title;
    mobileSongArtist.textContent = artistName;
    lyricsPlayerTitle.textContent = `${song.title} - ${artistName}`;
    
    // Update song items
    document.querySelectorAll('.song-item').forEach(item => {
        if (parseInt(item.dataset.id) === songId) {
            item.classList.add('active');
            
            // Update version buttons
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
    
    // Update carousel
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        if (parseInt(slide.dataset.id) === songId) {
            slide.classList.add('active');
            const artistElement = slide.querySelector('.carousel-artist');
            if (artistElement) {
                artistElement.textContent = artistName;
            }
        } else {
            slide.classList.remove('active');
        }
    });
}

function loadSong(index, autoPlay = true) {
    if (isAudioLoading) return;
    
    audioLoading.classList.add('active');
    isAudioLoading = true;
    
    currentSongIndex = index;
    const song = songs[index];
    const currentType = song.currentType || currentFilterType;
    
    console.log(`Loading: ${song.title} (${currentType})`);
    
    // Update UI
    updateSelectedSongUI(song.id, currentType);
    
    // Load lyrics
    loadLyrics(song.lyrics, song, currentType);
    
    // Load audio if it's an audio type
    if (["male", "female", "duet", "song"].includes(currentType)) {
        const audioPath = getAudioForType(song, currentType);
        
        if (audioPath) {
            console.log(`Audio path: ${audioPath}`);
            
            // Stop current audio
            audioPlayer.pause();
            isPlaying = false;
            updatePlayButtons();
            
            // Reset progress
            progress.style.width = "0%";
            lyricsProgress.style.width = "0%";
            mobileProgress.style.width = "0%";
            currentTimeEl.textContent = "0:00";
            lyricsCurrentTime.textContent = "0:00";
            mobileCurrentTime.textContent = "0:00";
            
            // Set new audio source
            audioPlayer.src = audioPath;
            
            // Load audio
            audioPlayer.load();
            
            // When audio is ready
            audioPlayer.oncanplay = () => {
                audioLoading.classList.remove('active');
                isAudioLoading = false;
                
                // Auto play if enabled
                if (autoPlay && isAutoPlayEnabled) {
                    setTimeout(() => {
                        playAudio();
                    }, 300);
                }
            };
            
            // Handle errors
            audioPlayer.onerror = () => {
                audioLoading.classList.remove('active');
                isAudioLoading = false;
                showNotification(`Error loading ${currentType} version`, 3000);
            };
            
        } else {
            audioLoading.classList.remove('active');
            isAudioLoading = false;
            showNotification(`${currentType} version not available`, 2000);
        }
    } else {
        audioLoading.classList.remove('active');
        isAudioLoading = false;
    }
}

function setActiveSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentSongIndex = index;
    const song = songs[index];
    
    // Update swiper if needed
    if (swiper && filteredSongs.length > 0) {
        const slideIndex = filteredSongs.findIndex(s => s.id === song.id);
        if (slideIndex >= 0) {
            swiper.slideToLoop(slideIndex, 0, false);
        }
    }
    
    loadSong(index, isAutoPlayEnabled);
}

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
            lyricsText.textContent = lyricsContent.trim() + '\n\n---';
        } else {
            lyricsText.textContent = `${song.title}\n${getArtistForType(song, currentType)}\n\nLyrics file not found.`;
        }
    } catch (error) {
        lyricsText.textContent = `${song.title}\n${getArtistForType(song, currentType)}\n\nError loading lyrics.`;
    }
}

function applyFilter(type) {
    console.log(`Applying filter: ${type}`);
    
    if (type === "podcast") {
        currentFilterType = "male";
        filteredSongs = songs.filter(song => song.availableTypes.includes("podcast"));
    } else if (type === "favourite") {
        currentFilterType = "favourite";
        filteredSongs = filterSongsByType("favourite");
    } else {
        currentFilterType = type;
        filteredSongs = filterSongsByType(type);
    }
    
    // Update UI
    updateActiveFilterButton(type);
    renderSongList();
    renderCarousel();
    
    if (swiper) {
        swiper.destroy(true, true);
        initSwiper();
    }
    
    // Activate first song if available
    if (filteredSongs.length > 0) {
        const firstSong = filteredSongs[0];
        const songIndex = songs.findIndex(s => s.id === firstSong.id);
        if (songIndex >= 0) {
            setActiveSong(songIndex);
        }
    } else {
        // Clear player if no songs
        songTitleDisplay.textContent = "Select a song";
        songArtistDisplay.textContent = "";
        mobileSongTitle.textContent = "Select a song";
        mobileSongArtist.textContent = "";
        pauseAudio();
    }
    
    updateSidebarWithCounts();
    showNotification(`${getTypeDisplayName(type)} loaded`, 2000);
}

function updateActiveFilterButton(activeType) {
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === activeType);
    });
    
    document.querySelectorAll('.menu li[data-type]').forEach(item => {
        item.classList.toggle('active', item.dataset.type === activeType);
    });
}

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
        li.classList.toggle('active', item.type === currentFilterType);
        
        if (item.type === "developed") {
            li.innerHTML = `<i class="fas ${item.icon}"></i><span>${getTypeDisplayName(item.type)}</span>`;
        } else {
            const count = filterSongsByType(item.type).length;
            li.innerHTML = `<i class="fas ${item.icon}"></i><span>${getTypeDisplayName(item.type)} (${count})</span>`;
        }
        
        li.addEventListener('click', () => {
            if (item.type === "developed") {
                showNotification("Designed & Developed by Venkattaraman", 3000);
                toggleSidebar();
                return;
            }
            
            if (item.type === "podcast") {
                const currentSong = songs[currentSongIndex];
                loadLyrics(currentSong.lyrics, currentSong, currentSong.currentType);
                lyricsModal.classList.add('active');
                toggleSidebar();
                return;
            }
            
            applyFilter(item.type);
            toggleSidebar();
        });
        
        menu.appendChild(li);
    });
}

// ==================== AUDIO CONTROLS ====================

function playAudio() {
    if (!audioPlayer.src) {
        loadSong(currentSongIndex, true);
        return;
    }
    
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                isPlaying = true;
                updatePlayButtons();
                startProgressUpdate();
            })
            .catch(error => {
                console.error("Playback error:", error);
                showNotification("Click play button again to start", 3000);
            });
    }
}

function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButtons();
    stopProgressUpdate();
}

function togglePlayPause() {
    if (!audioPlayer.src) {
        loadSong(currentSongIndex, true);
        return;
    }
    
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function updatePlayButtons() {
    if (isPlaying) {
        mobilePlayIcon.className = 'fas fa-pause';
        lyricsPlayIcon.className = 'fas fa-pause';
    } else {
        mobilePlayIcon.className = 'fas fa-play';
        lyricsPlayIcon.className = 'fas fa-play';
    }
}

function startProgressUpdate() {
    stopProgressUpdate();
    updateProgress();
    updateInterval = setInterval(updateProgress, 1000);
}

function stopProgressUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

function updateProgress() {
    if (audioPlayer.duration > 0) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        // Update times
        currentTimeEl.textContent = formatTime(currentTime);
        lyricsCurrentTime.textContent = formatTime(currentTime);
        mobileCurrentTime.textContent = formatTime(currentTime);
        
        totalTimeEl.textContent = formatTime(duration);
        lyricsTotalTime.textContent = formatTime(duration);
        mobileTotalTime.textContent = formatTime(duration);
        
        // Update progress bars
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        lyricsProgress.style.width = `${progressPercent}%`;
        mobileProgress.style.width = `${progressPercent}%`;
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function playNextSong() {
    if (filteredSongs.length === 0) return;
    
    const currentFilteredIndex = filteredSongs.findIndex(s => s.id === songs[currentSongIndex].id);
    if (currentFilteredIndex >= 0) {
        const nextIndex = (currentFilteredIndex + 1) % filteredSongs.length;
        const nextSong = filteredSongs[nextIndex];
        const songIndex = songs.findIndex(s => s.id === nextSong.id);
        
        if (songIndex >= 0) {
            setActiveSong(songIndex);
            
            if (swiper) {
                swiper.slideToLoop(nextIndex);
            }
        }
    }
}

function playPrevSong() {
    if (filteredSongs.length === 0) return;
    
    const currentFilteredIndex = filteredSongs.findIndex(s => s.id === songs[currentSongIndex].id);
    if (currentFilteredIndex >= 0) {
        const prevIndex = (currentFilteredIndex - 1 + filteredSongs.length) % filteredSongs.length;
        const prevSong = filteredSongs[prevIndex];
        const songIndex = songs.findIndex(s => s.id === prevSong.id);
        
        if (songIndex >= 0) {
            setActiveSong(songIndex);
            
            if (swiper) {
                swiper.slideToLoop(prevIndex);
            }
        }
    }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
        
        const icon = themeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Mobile search toggle
    mobileSearchToggle.addEventListener('click', () => {
        isMobileSearchOpen = !isMobileSearchOpen;
        mobileSearchContainer.classList.toggle('active', isMobileSearchOpen);
        
        if (isMobileSearchOpen) {
            setTimeout(() => mobileSearchInput.focus(), 100);
        }
    });
    
    // Lyrics modal
    lyricsBtn.addEventListener('click', () => {
        const currentSong = songs[currentSongIndex];
        loadLyrics(currentSong.lyrics, currentSong, currentSong.currentType);
        lyricsModal.classList.add('active');
    });
    
    closeLyrics.addEventListener('click', () => {
        lyricsModal.classList.remove('active');
    });
    
    // Progress bars
    [progressBar, lyricsProgressBar, mobileProgressBar].forEach(bar => {
        bar.addEventListener('click', (e) => {
            if (audioPlayer.duration > 0) {
                const rect = bar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audioPlayer.currentTime = percent * audioPlayer.duration;
                updateProgress();
            }
        });
    });
    
    // Playback controls
    mobilePlayBtn.addEventListener('click', togglePlayPause);
    mobilePrevBtn.addEventListener('click', playPrevSong);
    mobileNextBtn.addEventListener('click', playNextSong);
    
    lyricsPlayBtn.addEventListener('click', togglePlayPause);
    lyricsPrevBtn.addEventListener('click', playPrevSong);
    lyricsNextBtn.addEventListener('click', playNextSong);
    
    // Filter buttons
    document.querySelectorAll('.control-btn[data-type], .type-filter-btn[data-type]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type;
            applyFilter(type);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', handleSearch);
    }
    
    // Search clear buttons
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            handleSearch({ target: searchInput });
            searchClear.classList.remove('show');
        });
    }
    
    if (mobileSearchClear) {
        mobileSearchClear.addEventListener('click', () => {
            mobileSearchInput.value = '';
            handleSearch({ target: mobileSearchInput });
            mobileSearchClear.classList.remove('show');
        });
    }
    
    // Menu
    menuBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuBtn) {
            toggleSidebar();
        }
    });
    
    // Auto-play toggle
    if (autoPlayToggleBtn) {
        autoPlayToggleBtn.addEventListener('click', () => {
            isAutoPlayEnabled = !isAutoPlayEnabled;
            localStorage.setItem('autoPlayEnabled', isAutoPlayEnabled);
            updateAutoPlayToggleUI();
            
            const status = isAutoPlayEnabled ? 'ON' : 'OFF';
            showNotification(`Auto Play ${status}`, 2000);
        });
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const songItems = document.querySelectorAll('.song-item');
    
    let hasVisibleItems = false;
    
    songItems.forEach(item => {
        const title = item.querySelector('.song-item-title').textContent.toLowerCase();
        const artist = item.querySelector('.song-item-artist').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            item.style.display = 'flex';
            hasVisibleItems = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update search clear button
    const clearBtn = e.target === searchInput ? searchClear : mobileSearchClear;
    if (clearBtn) {
        if (searchTerm.length > 0) {
            clearBtn.classList.add('show');
        } else {
            clearBtn.classList.remove('show');
        }
    }
}

function setupAudioEvents() {
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButtons();
        stopProgressUpdate();
        
        if (isAutoPlayEnabled) {
            setTimeout(playNextSong, 1000);
        }
    });
    
    audioPlayer.addEventListener('error', () => {
        showNotification("Error playing audio", 3000);
        isPlaying = false;
        updatePlayButtons();
        isAudioLoading = false;
        audioLoading.classList.remove('active');
    });
}

function updateAutoPlayToggleUI() {
    if (autoPlayToggleBtn) {
        autoPlayToggleBtn.classList.toggle('active', isAutoPlayEnabled);
        autoPlayToggleBtn.title = `Auto Play: ${isAutoPlayEnabled ? 'ON' : 'OFF'}`;
    }
}

function toggleSidebar() {
    const isActive = sidebar.classList.toggle('active');
    menuBtn.className = isActive ? 'fas fa-times menu-btn' : 'fas fa-bars menu-btn';
    
    if (isActive) {
        updateSidebarWithCounts();
    }
}

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
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
