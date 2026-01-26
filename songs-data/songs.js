// songs.js - Clean version using the helper function
const FIREBASE_BUCKET = "chillaxkaraoke-3d1cb.firebasestorage.app";

function getFirebaseUrl(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}
const songs = [





{ 
        id: 150,
        title: "Ennai Thalatum Sangeetham",
        artist: "Unnai Ninaithu",
        music: " S A Rajkumar", 
        image: "images/UnnaiNinaithu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennai-Thalatum-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennai-Thalatum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennai-Thalatum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennai-Thalatum-Song.mp3")
        },  
        lyrics: "lyrics/Ennai-Thalatum.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    },		
{ 
        id: 149,
        title: "Irupathu Kodi",
        artist: "Thullatha Manamum Thullum",
        music: " S A Rajkumar", 
        image: "images/ThullathaManamumThullum.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Irupathu-Kodi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Irupathu-Kodi-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Irupathu-Kodi-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Irupathu-Kodi-Song.mp3")
        },  
        lyrics: "lyrics/Irupathu-Kodi.txt",
        availableTypes: ["male", "song", "podcast"],
    },	
{ 
        id: 148,
        title: "Aagaya Suriyanai",
        artist: "Samurai",
        music: "Harris Jayaraj", 
        image: "images/Samurai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Aagaya-Suriyanai-Male.mp3"),
            female: getFirebaseUrl("songs/female/Aagaya-Suriyanai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Aagaya-Suriyanai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Aagaya-Suriyanai-Song.mp3")
        },  
        lyrics: "lyrics/Aagaya-Suriyanai.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },	
{ 
        id: 147,
        title: "Ramanin Mohanam",
        artist: "Netrikan",
        music: "Ilaiyarajaa", 
        image: "images/Netrikan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ramanin-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ramanin-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ramanin-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ramanin-Song.mp3")
        },  
        lyrics: "lyrics/Ramanin.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },	
{ 
        id: 146,
        title: "Mel Isaiye En Idhayathin",
        artist: "Mr Romeo",
        music: "A R Rahman", 
        image: "images/Romio.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Mel-Isaiye-Male.mp3"),
            female: getFirebaseUrl("songs/female/Mel-Isaiye-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Mel-Isaiye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Mel-Isaiye-Song.mp3")
        },  
        lyrics: "lyrics/Mel-Isaiye.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },	
{ 
        id: 145,
        title: "Anbe Anbe Ellam Anbe",
        artist: "Idhu Kathirvelan Kadhal",
        music: "Harris Jayaraj", 
        image: "images/Idhu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Anbe-Anbe-Male.mp3"),
            female: getFirebaseUrl("songs/female/Anbe-Anbe-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Anbe-Anbe-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Anbe-Anbe-Song.mp3")
        },  
        lyrics: "lyrics/Anbe-Anbe.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },	
{ 
        id: 144,
        title: "Enna Solla Pogirai",
        artist: "Kandukonden Kandukonden",
        music: "A R Rahman", 
        image: "images/Kandukonden.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Enna-Solla-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Enna-Solla-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Enna-Solla-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Enna-Solla-Song.mp3")
        },  
        lyrics: "lyrics/Enna-Solla.txt",
        availableTypes: ["male", "song", "podcast"],
    },	
{ 
        id: 143,
        title: "Ninaithu Ninaithu",
        artist: "7G Rainbow Colony",
        music: "Yuvan Shankar Raja", 
        image: "images/7g.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ninaithu-Ninaithu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ninaithu-Ninaithu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ninaithu-Ninaithu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ninaithu-Ninaithu-SongM.mp3")
        },  
        lyrics: "lyrics/Ninaithu-Ninaithu.txt",
        availableTypes: ["male", "female", "song", "podcast"],
    },	
{ 
        id: 142,
        title: "Enai Kaanavillaiye",
        artist: "Kadhal Desam",
        music: "A R Rahman", 
        image: "images/Kadhal-Desam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Enai-Kaanavillaiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Enai-Kaanavillaiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Enai-Kaanavillaiye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Enai-Kaanavillaiye-Song.mp3")
        },  
        lyrics: "lyrics/Enai-Kaanavillaiye.txt",
        availableTypes: ["male", "song", "podcast"],
    },
{ 
        id: 141,
        title: "Nilaave Vaa",
        artist: "Mouna Ragam",
        music: "Ilaiyaraaja", 
        image: "images/Mouna-Ragam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Nilaave-Vaa-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nilaave-Vaa-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Nilaave-Vaa-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nilaave-Vaa-Song.mp3")
        },  
        lyrics: "lyrics/Nilaave-Vaa.txt",
        availableTypes: ["male", "song", "podcast"],
    },
{ 
        id: 140,
        title: "Devathaiyai Kanden",
        artist: "Kadhalil Vizhunthen",
        music: "Yuvan Shankar Raja", 
        image: "images/KadhalilVizhunthen.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Devathayai-Kanden-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Devathayai-Kanden-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Devathayai-Kanden-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Devathayai-Kanden-Song.mp3")
        },  
        lyrics: "lyrics/Devathaiyai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 

{ 
        id: 139,
        title: "Vinmeen Vithaiyil",
        artist: "Thegidi",
        music: "Nivas K Prasanna", 
        image: "images/Thegidi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Vinmeen-Vithaiyil-Male.mp3"),
            female: getFirebaseUrl("songs/female/Vinmeen-Vithaiyil-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Vinmeen-Vithaiyil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vinmeen-Vithaiyil-Song.mp3")
        },  
        lyrics: "lyrics/Vinmeen-Vithaiyil.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 

{ 
        id: 138,
        title: "Kannathil Kannam Vaikka",
        artist: "Watchman Vadivel",
        music: "Deva", 
        image: "images/Watchman.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kannathil-Kannam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kannathil-Kannam-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kannathil-Kannam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kannathil-Kannam-Song.mp3")
        },  
        lyrics: "lyrics/Kannathil-Kannam.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 	
{ 
        id: 137,
        title: "Ennai Thottu Allikonda",
        artist: "Unnai Ninachen Paattu Padichen",
        music: "Ilaiyaraaja",
        image: "images/UnnaiNenachen.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennai-Thottu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennai-Thottu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennai-Thottu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennai-Thottu-Song.mp3")
        },  
        lyrics: "lyrics/Ennai-Thottu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 136,
        title: "Thenmadurai Vaigai Nathi",
        artist: "Dharmathin Thalaivan",
        music: "Ilaiyaraaja",
        image: "images/Dharmathin.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thenmadurai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thenmadurai-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thenmadurai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thenmadurai-Song.mp3")
        },  
        lyrics: "lyrics/Thenmadurai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 135,
        title: "Enaku Piditha Paadal",
        artist: "Julie Ganapathi",
        music: "Ilaiyaraaja",
        image: "images/Julie.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Enaku-Piditha-Paadal-Male.mp3"),
            female: getFirebaseUrl("songs/female/Enaku-Piditha-Paadal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Enaku-Piditha-Paadal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Enaku-Piditha-Paadal-Song.mp3")
        },  
        lyrics: "lyrics/Enaku-Piditha-Paadal.txt",
        availableTypes: ["female", "song", "podcast"],
    }, 
{ 
        id: 134,
        title: "Per Vachalum",
        artist: "Michael Madana Kama Rajan",
        music: "Ilaiyaraaja",
        image: "images/Michel.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Per-Vachalum-Male.mp3"),
            female: getFirebaseUrl("songs/female/Per-Vachalum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Per-Vachalum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Per-Vechalum-Song.mp3")
        },  
        lyrics: "lyrics/Per-Vechalum.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 133,
        title: "Sorgame Endralum",
        artist: "Oru Vittu Oru Vanthu",
        music: "Ilaiyaraaja",
        image: "images/Oruvittu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sorgame-Male.mp3"),
            female: getFirebaseUrl("songs/female/Sorgame-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Sorgame-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sorgame-Song.mp3")
        },  
        lyrics: "lyrics/Sorgame.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 132,
        title: "Valaiyosai",
        artist: "Sathya",
        music: "Ilaiyaraaja",
        image: "images/Sathya.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Valaiyosai-Male.mp3"),
            female: getFirebaseUrl("songs/female/Valaiyosai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Valaiyosai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Valaiyosai-Song.mp3")
        },  
        lyrics: "lyrics/Valaiyosai.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 131,
        title: "Kalyana Maalai",
        artist: "Puthu Puthu Arthangal",
        music: "Ilaiyaraaja",
        image: "images/PuthuPuthuArthangal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kalyana-Maalai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kalyana-Maalai-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kalyana-Maalai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kalyana-Maalai-Song.mp3")
        },  
        lyrics: "lyrics/Kalyana-Maalai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 130,
        title: "Oru Maina Maina",
        artist: "Uzhaippali",
        music: "Ilaiyaraaja",
        image: "images/Uzhaippali.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Maina-Male.mp3"),
            female: getFirebaseUrl("songs/female/Oru-Maina-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oru-Maina-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Maina-Song.mp3")
        },  
        lyrics: "lyrics/Oru-Maina.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 129,
        title: "Andhiyile Vaanam",
        artist: "Chinnavar",
        music: "Ilaiyaraaja",
        image: "images/Chinnavar.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Andhiyile-Vaanam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Andhiyile-Vaanam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Andhiyile-Vaanam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Andhiyile-Vaanam-Song.mp3")
        },  
        lyrics: "lyrics/Andhiyile-Vaanam.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 128,
        title: "Adi Vaanmathi",
        artist: "Siva",
        music: "Ilaiyaraaja",
        image: "images/Siva.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Adi-Vaanmathi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Adi-Vaanmathi-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Adi-Vaanmathi-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Adi-Vaanmathi-Song.mp3")
        },  
        lyrics: "lyrics/Adi-Vaanmathi.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 127,
        title: "Abc Nee Vasi",
        artist: "Oru Kaidhiyin Diary",
        music: "Ilaiyaraaja",
        image: "images/OruKaidhiyinDiary.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Abc-Nee-Vasi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Abc-Nee-Vasi-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Abc-Nee-Vasi-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Abc-Nee-Vasi-Song.mp3")
        },  
        lyrics: "lyrics/Abc-Nee-Vasi.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 126,
        title: "Aasai Aasai",
        artist: "Dhool",
        music: "Vidyasagar",
        image: "images/Dhool.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Aasai-Aasai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Aasai-Aasai-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Aasai-Aasai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Aasai-Aasai-Song.mp3")
        },  
        lyrics: "lyrics/Aasai-Aasai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 125,
        title: "Dailamo Dailamo",
        artist: "Dishyum",
        music: "Vijay Antony",
        image: "images/Dishyum.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Dailamo-Dailamo-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Dailamo-Dailamo-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Dailamo-Dailamo-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Dailamo-Dailamo-Song.mp3")
        },  
        lyrics: "lyrics/Dailamo-Dailamo.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 124,
        title: "Chocolate Chocolate Polave",
        artist: "Unnai Ninaithu",
        music: "Sirpy",
        image: "images/UnnaiNinaithu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Chocolate-Chocolate-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Chocolate-Chocolate-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Chocolate-Chocolate-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Chocolate-Chocolate-Song.mp3")
        },  
        lyrics: "lyrics/Chocolate-Chocolate.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 123,
        title: "Azhagiya Theeye",
        artist: "Minnale",
        music: "Harris Jayaraj",
        image: "images/Minnale.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Azhagiya-Theeye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Azhagiya-Theeye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Azhagiya-Theeye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Azhagiya-Theeye-Song.mp3")
        },  
        lyrics: "lyrics/Azhagiya-Theeye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 122,
        title: "Anjukajam Kanchi Pattu",
        artist: "RasaMagan",
        music: "Ilaiyaraaja",
        image: "images/RasaMagan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Anjukajam-Kanchi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Anjukajam-Kanchi-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Anjukajam-Kanchi-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Anjukajam-Kanchi-Song.mp3")
        },  
        lyrics: "lyrics/Anjukajam-Kanchi.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 121,
        title: "Endhan Paadalgalil",
        artist: "Uravai Katha Kili",
        music: "T Rajendar",
        image: "images/UravaiKathaKili.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Endhan-Paadalgalil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Endhan-Paadalgalil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Endhan-Paadalgalil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Endhan-Paadalgalil-Song.mp3")
        },  
        lyrics: "lyrics/Endhan-Paadalgalil.txt",
        availableTypes: ["male", "song", "podcast"],
    },     
{ 
        id: 120,
        title: "Kalyana Thean Nila",
        artist: "Mounam Sammadham",
        music: "Ilaiyaraaja",
        image: "images/MounamSammadham.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kalyana-Thean-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kalyana-Thean-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kalyana-Thean-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kalyana-Thean-Song.mp3")
        },  
        lyrics: "lyrics/Kalyana-Thean.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 119,
        title: "Maasi Masam",
        artist: "Dharmadurai",
        music: "Ilaiyaraaja",
        image: "images/Dharmadurai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Maasi-Masam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Maasi-Masam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Maasi-Masam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Maasi-Masam-Song.mp3")
        },  
        lyrics: "lyrics/Maasi-Masam.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 118,
        title: "Konji Pesida Venam",
        artist: "Sethupathi",
        music: "Nivas K Prasanna",
        image: "images/Sethupathi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Konji-Pesida-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Konji-Pesida-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Konji-Pesida-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Konji-Pesida-Song.mp3")
        },  
        lyrics: "lyrics/Konji-Pesida.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 117,
        title: "Kanne En Kanmaniye",
        artist: "Kavithai Paadum Alaigal",
        music: "Ilaiyaraaja",
        image: "images/KavithaiPaadumAlaigal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kanne-EnKanmaniye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kanne-EnKanmaniye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kanne-EnKanmaniye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kanne-EnKanmaniye-Song.mp3")
        },  
        lyrics: "lyrics/Kanne-EnKanmaniye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 116,
        title: "Kanna Unnai Thedugiren",
        artist: "Unakkave Vazhkiren",
        music: "Ilaiyaraaja",
        image: "images/UnakkaveVazhkiren.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/KannaUnnai-Thedugiren-Male.mp3"),
            //female: getFirebaseUrl("songs/female/KannaUnnai-Thedugiren-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/KannaUnnai-Thedugiren-Duet.mp3"),
            song: getFirebaseUrl("songs/song/KannaUnnai-Thedugiren-Song.mp3")
        },  
        lyrics: "lyrics/KannaUnnai-Thedugiren.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 115,
        title: "Kannamma KadhalEnnum",
        artist: "Vanna Vanna Pookkal",
        music: "Ilaiyaraaja",
        image: "images/VannaVannaPookkal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kannamma-KadhalEnnum-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kannamma-KadhalEnnum-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kannamma-KadhalEnnum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kannamma-KadhalEnnum-Song.mp3")
        },  
        lyrics: "lyrics/Kannamma-KadhalEnnum.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 114,
        title: "Nagumo",
        artist: "Arunachalam",
        music: "Ilaiyaraaja",
        image: "images/Arunachalam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Nagumo-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nagumo-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Nagumo-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nagumo-Song.mp3")
        },  
        lyrics: "lyrics/Nagumo.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 113,
        title: "Mutham Podhaathey",
        artist: "Enakkul Oruvan",
        music: "Ilaiyaraaja",
        image: "images/EnakkulOruvan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Mutham-Podhaathey-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Mutham-Podhaathey-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Mutham-Podhaathey-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Mutham-Podhaathey-Song.mp3")
        },  
        lyrics: "lyrics/Mutham-Podhaathey.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 112,
        title: "Muthal Kanave",
        artist: "Majnu",
        music: "Harris Jayaraj",
        image: "images/Majnu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/MuthalKanave-Male.mp3"),
            //female: getFirebaseUrl("songs/female/MuthalKanave-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/MuthalKanave-Duet.mp3"),
            song: getFirebaseUrl("songs/song/MuthalKanave-Song.mp3")
        },  
        lyrics: "lyrics/MuthalKanave.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 111,
        title: "Mottu Ondru Malarnthida",
        artist: "Kushi",
        music: "Deva",
        image: "images/Kushi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Mottu-Ondru-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Mottu-Ondru-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Mottu-Ondru-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Mottu-Ondru-Song.mp3")
        },  
        lyrics: "lyrics/Mottu-Ondru.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 110,
        title: "Minsaram EnMeethu",
        artist: "Run",
        music: "Vidyasagar",
        image: "images/Run.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Minsaram-EnMeethu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Minsaram-EnMeethu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Minsaram-EnMeethu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Minsaram-EnMeethu-Song.mp3")
        },  
        lyrics: "lyrics/Minsaram-EnMeethu.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 109,
        title: "Oodha Oodha Oodha Poo",
        artist: "Minsara Kanna",
        music: "Deva",
        image: "images/MinsaraKanna.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oodha-Oodha-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oodha-Oodha-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oodha-Oodha-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oodha-Oodha-Song.mp3")
        },  
        lyrics: "lyrics/Oodha-Oodha.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 108,
        title: "Oh Vasantha Raja",
        artist: "Neengal Kettavai",
        music: "Ilaiyaraaja",
        image: "images/NeengalKettavai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oh-Vasantha-Raja-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oh-Vasantha-Raja-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oh-Vasantha-Raja-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oh-Vasantha-Raja-Song.mp3")
        },  
        lyrics: "lyrics/Oh-Vasantha-Raja.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 107,
        title: "Pacha Mala Poovu",
        artist: "Kizhkku Vasal",
        music: "Ilaiyaraaja",
        image: "images/KizhkkuVasal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Pacha-Mala-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Pacha-Mala-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Pacha-Mala-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Pacha-Mala-Song.mp3")
        },  
        lyrics: "lyrics/Pacha-Mala.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 106,
        title: "Paattu Thalaivan",
        artist: "IdhayaKovil",
        music: "Ilaiyaraaja",
        image: "images/IdhayaKovil.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Paattu-Thalaivan-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Paattu-Thalaivan-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Paattu-Thalaivan-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Paattu-Thalaivan-Song.mp3")
        },  
        lyrics: "lyrics/Paattu-Thalaivan.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 105,
        title: "Ottrai Kannala",
        artist: "Vel",
        music: "Yuvan Shankar Raja",
        image: "images/Vel.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ottrai-Kannala-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ottrai-Kannala-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ottrai-Kannala-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ottrai-Kannala-Song.mp3")
        },  
        lyrics: "lyrics/Ottrai-Kannala.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 104,
        title: "Sangeetha Vaanil",
        artist: "Chinna Poove Mella Pesu",
        music: "S A Rajkumar",
        image: "images/ChinnaPooveMellaPesu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sangeetha-Vaanil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sangeetha-Vaanil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sangeetha-Vaanil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sangeetha-Vaanil-Song.mp3")
        },  
        lyrics: "lyrics/Sangeetha-Vaanil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 103,
        title: "Poongkaatrilae",
        artist: "Uyire",
        music: "A R Rahman",
        image: "images/Uyire.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Poongkaatrilae-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Poongkaatrilae-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Poongkaatrilae-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Poongkaatrilae-Song.mp3")
        },  
        lyrics: "lyrics/Poongkaatrilae.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 102,
        title: "Poongathave Thazhthiravai",
        artist: "Nizhalgal",
        music: "Ilaiyaraaja",
        image: "images/Nizhalgal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Poongathave-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Poongathave-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Poongathave-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Poongathave-Song.mp3")
        },  
        lyrics: "lyrics/Poongathave.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 101,
        title: "Pathukulle Number Onnu",
        artist: "Vasool Raja MBBS",
        music: "Bharadwaj",
        image: "images/VasoolRaja.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Pathukulle-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Pathukulle-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Pathukulle-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Pathukulle-Song.mp3")
        },  
        lyrics: "lyrics/Pathukulle.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 100,
        title: "Suttrum Vizhi Sudare",
        artist: "Ghajini",
        music: "Harris Jayaraj",
        image: "images/Ghajini.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Suttum-Vizhi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Suttrum-VizhiSudare-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Suttrum-VizhiSudare-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Suttrum-VizhiSudare-Song.mp3")
        },  
        lyrics: "lyrics/Suttrum-VizhiSudare.txt",
        availableTypes: ["male", "song", "podcast"],
    },     
{ 
        id: 99,
        title: "Sithagathi Pookale",
        artist: "Rajakumaran",
        music: "Ilaiyaraaja",
        image: "images/Rajakumaran.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sithagathi-Pookale-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sithagathi-Pookale-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sithagathi-Pookale-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sithagathi-Pookale-Song.mp3")
        },  
        lyrics: "lyrics/Sithagathi-Pookale.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 98,
        title: "Sirikkadhey",
        artist: "Remo",
        music: "Anirudh Ravichander",
        image: "images/Remo.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sirikkadhey-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sirikkadhey-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sirikkadhey-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sirikkadhey-Song.mp3")
        },  
        lyrics: "lyrics/Sirikkadhey.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 97,
        title: "Sempoove Poove",
        artist: "Siraichalai",
        music: "Ilaiyaraaja",
        image: "images/Siraichalai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sempoove-Poove-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sempoove-Poove-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sempoove-Poove-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sempoove-Poove-Song.mp3")
        },  
        lyrics: "lyrics/Sempoove-Poove.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 96,
        title: "Santhana Kaatre",
        artist: "Thanikattu Raja",
        music: "Ilaiyaraaja",
        image: "images/ThanikattuRaja.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Santhana-Kaatre-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Santhana-Kaatre-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Santhana-Kaatre-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Santhana-Kaatre-Song.mp3")
        },  
        lyrics: "lyrics/Santhana-Kaatre.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 95,
        title: "Thanga Nilavukku",
        artist: "Rickshaw Mama",
        music: "Ilaiyaraaja",
        image: "images/RickshawMama.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thanga-Nilavukku-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thanga-Nilavukku-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thanga-Nilavukku-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thanga-Nilavukku-Song.mp3")
        },  
        lyrics: "lyrics/Thanga-Nilavukku.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 94,
        title: "Thalattuthe Vaanam",
        artist: "Kadal Meengal",
        music: "Ilaiyaraaja",
        image: "images/KadalMeengal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thalattuthe-Vaanam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thalattuthe-Vaanam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thalattuthe-Vaanam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thalattuthe-Vaanam-Song.mp3")
        },  
        lyrics: "lyrics/Thalattuthe-Vaanam.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 93,
        title: "Yaradhu Yaradhu",
        artist: "Kaavalan",
        music: "Vidyasagar",
        image: "images/Kaavalan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Yaradhu-Yaradhu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Yaradhu-Yaradhu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Yaradhu-Yaradhu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Yaradhu-Yaradhu-Song.mp3")
        },  
        lyrics: "lyrics/Yaradhu-Yaradhu.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 92,
        title: "Vaa Ponmayile",
        artist: "Poonthalir",
        music: "Ilaiyaraaja",
        image: "images/Poonthalir.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Vaa-Ponmayile-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Vaa-Ponmayile-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Vaa-Ponmayile-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vaa-Ponmayile-Song.mp3")
        },  
        lyrics: "lyrics/Vaa-Ponmayile.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 91,
        title: "Kalakalakum Mani Osai",
        artist: "Eeramana Rojave",
        music: "Ilaiyaraaja",
        image: "images/EeramanaRojave.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kalakalakum-Mani-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kalakalakum-Mani-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kalakalakum-Mani-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kalakalakum-Mani-Song.mp3")
        },  
        lyrics: "lyrics/Kalakalakum-Mani.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 90,
        title: "Oru KolaKili",
        artist: "Uzhaippali",
        music: "Ilaiyaraaja",
        image: "images/Uzhaippali.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oru-KolaKili-Male.mp3"),
            female: getFirebaseUrl("songs/female/Oru-KolaKili-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oru-KolaKili-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-KolaKili-Song.mp3")
        },  
        lyrics: "lyrics/Oru-KolaKili.txt",
        availableTypes: ["male", "song", "podcast"],
    },     
{ 
        id: 89,
        title: "Oh PonManguil",
        artist: "Manasukkul Mathappu",
        music: "S A Rajkumar",
        image: "images/ManasukkulMathappu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oh-PonManguil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oh-PonManguil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oh-PonManguil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oh-PonManguil-Song.mp3")
        },  
        lyrics: "lyrics/Oh-PonManguil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 88,
        title: "Kaadhal Kaditham Theettavae",
        artist: "Jodi",
        music: "A R Rahman",
        image: "images/Jodi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kadhal-Kaditham-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kadhal-Kaditham-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kadhal-Kaditham-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kadhal-Kaditham-Song.mp3")
        },  
        lyrics: "lyrics/Kaadhal-Kaditham.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
{ 
        id: 87,
        title: "Kaatre En Vaasal",
        artist: "Rhythm",
        music: "A R Rahman",
        image: "images/Rhythm.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kaatre-En-Vaasal-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kaatre-En-Vaasal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kaatre-En-Vaasal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kaatre-En-Vaasal-Song.mp3")
        },  
        lyrics: "lyrics/Kaatre-En-Vaasal.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
{ 
        id: 86,
        title: "Un Mela Aasadhaan",
        artist: "Aayirathil Oruvan",
        music: "G V Prakash Kumar",
        image: "images/AayirathilOruvan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Un-Mela-Aasadhaan-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Un-Mela-Aasadhaan-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Un-Mela-Aasadhaan-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Un-Mela-Aasadhaan-Song.mp3")
        },  
        lyrics: "lyrics/Un-Mela-Aasadhaan.txt",
        availableTypes: ["duet", "song", "podcast"],
    },  
{ 
        id: 85,
        title: "Latcham Calorie",
        artist: "Yaan",
        music: "Harris Jayaraj",
        image: "images/Yaan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Latcham-Calorie-Male.mp3"),
            female: getFirebaseUrl("songs/female/Latcham-Calorie-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Latcham-Calorie-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Latcham-Calorie-Song.mp3")
        },  
        lyrics: "lyrics/Latcham-Calorie.txt",
        availableTypes: ["female", "duet", "song", "podcast"],
    },  
{ 
        id: 84,
        title: "Kangal Irandal",
        artist: "Subramaniyapuram",
        music: "James Vasanthan",
        image: "images/Subramaniyapuram.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/KangalIrandal-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kangal-Irandal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kangal-Irandal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kangal-Irandal-Song.mp3")
        },  
        lyrics: "lyrics/Kangal-Irandal.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 83,
        title: "Unnaale Unnaale",
        artist: "Unnale Unnale",
        music: "Harris Jayaraj",
        image: "images/Unnaale-Unnaale.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Unnaale-Unnaale-Male.mp3"),
            female: getFirebaseUrl("songs/female/Unnaale-Unnaale-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Unnaale-Unnaale-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Unnaale-Unnaale-Song.mp3")
        },  
        lyrics: "lyrics/Unnaale-Unnaale.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },      
{ 
        id: 82,
        title: "Loosu Penne",
        artist: "Vallavan",
        music: "Yuvan Shankar Raja",
        image: "images/Vallavan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Loosu-Penne-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Loosu-Penne-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Loosu-Penne-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Loosu-Penne-Song.mp3")
        },  
        lyrics: "lyrics/Loosu-Penne.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 81,
        title: "Thaniye Thananthaniye",
        artist: "Rhythm",
        music: "A R Rahman",
        image: "images/Rhythm.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thaniye-Thananthaniye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thaniye-Thananthaniye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thaniye-Thananthaniye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thaniye-Thananthaniye-Song.mp3")
        },  
        lyrics: "lyrics/Thaniye-Thananthaniye.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 80,
        title: "June Ponaal",
        artist: "Unnale Unnale",
        music: "Harris Jayaraj",
        image: "images/Unnaale-Unnaale.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/June-Ponaal-Male.mp3"),
            //female: getFirebaseUrl("songs/female/June-Ponaal-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/June-Ponaal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/June-Ponaal-Song.mp3")
        },  
        lyrics: "lyrics/June-Ponaal.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 79,
        title: "Po Nee Po",
        artist: "Moonu",
        music: "Anirudh Ravichander",
        image: "images/Moonu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Po-Nee-Po-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Po-Nee-Po-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Po-Nee-Po-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Po-Nee-Po-Song.mp3")
        },  
        lyrics: "lyrics/Po-Nee-Po.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 78,
        title: "Maalai Mangum Neram",
        artist: "Rowthiram",
        music: "Prakash Nikki",
        image: "images/Rowthiram.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Maalai-Mangum-Neram-Male.mp3"),
            female: getFirebaseUrl("songs/female/Maalai-Mangum-Neram-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Maalai-Mangum-Neram-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Maalai-Mangum-Neram-Song.mp3")
        },  
        lyrics: "lyrics/Maalai-Mangum.txt",
        availableTypes: ["female", "song", "podcast"],
    },  
{ 
        id: 77,
        title: "Yaaro Ivan",
        artist: "Udhayam NH4",
        music: "G V Prakash Kumar",
        image: "images/Udhayam.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Yaaro-Ivan-Male.mp3"),
            female: getFirebaseUrl("songs/female/Yaaro-Ivan-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Yaaro-Ivan-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Yaaro-Ivan-Song.mp3")
        },  
        lyrics: "lyrics/Yaaro-Ivan.txt",
        availableTypes: ["female", "duet", "song", "podcast"],
    },  
{ 
        id: 76,
        title: "Kadhal Vaithu",
        artist: "Deepavali",
        music: "Yuvan Shankar Raja",
        image: "images/Deepavali.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kadhal-Vaithu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kadhal-Vaithu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kadhal-Vaithu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kadhal-Vaithu-Song.mp3")
        },  
        lyrics: "lyrics/Kadhal-Vaithu.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 75,
        title: "En Kadhal Solla",
        artist: "Paiyaa",
        music: "Yuvan Shankar Raja",
        image: "images/Paiyaa.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/En-Kadhal-Solla-Male.mp3"),
            //female: getFirebaseUrl("songs/female/En-Kadhal-Solla-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/En-Kadhal-Solla-Duet.mp3"),
            song: getFirebaseUrl("songs/song/En-Kadhal-Solla-Song.mp3")
        },  
        lyrics: "lyrics/En-Kadhal-Solla.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 74,
        title: "Irumbile Oru Idhaiyam",
        artist: "Endhiran",
        music: "A R Rahman",
        image: "images/Endhiran.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Irumbile-Oru-Idhaiyam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Irumbile-Oru-Idhaiyam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Irumbile-Oru-Idhaiyam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Irumbile-Oru-Idhaiyam-Song.mp3")
        },  
        lyrics: "lyrics/Irumbile-Oru-Idhaiyam.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 73,
        title: "Kalasala Kalasala",
        artist: "Minnale",
        music: "A R Rahman",
        image: "images/Osthe.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kalasala-Kalasala-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kalasala-Kalasala-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kalasala-Kalasala-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kalasala-Kalasala-Song.mp3")
        },  
        lyrics: "lyrics/Kalasala-Kalasala.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    },  
{ 
        id: 72,
        title: "Siragugal Vanthathu",
        artist: "Sarvam",
        music: "Yuvan Shankar Raja",
        image: "images/Sarvam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Siragugal-Vanthathu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Siragugal-Vanthathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Siragugal-Vanthathu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Siragugal-Vanthathu-Song.mp3")
        },  
        lyrics: "lyrics/Siragugal-Vanthathu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },      
{ 
        id: 71,
        title: "Ayayayo Aananthamey",
        artist: "Kumki",
        music: "D Imman",
        image: "images/Kumki.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ayayayo-Aananthamey-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ayayayo-Aananthamey-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ayayayo-Aananthamey-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ayayayo-Aananthamey-Song.mp3")
        },  
        lyrics: "lyrics/Ayayayo-Aananthamey.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 70,
        title: "Naan Pogiren Mele Mele",
        artist: "Naanayam",
        music: "James Vasanthan",
        image: "images/Naanayam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Naan-Pogiren-Male.mp3"),
            female: getFirebaseUrl("songs/female/Naan-Pogiren-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Naan-Pogiren-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Naan-Pogiren-Song.mp3")
        },  
        lyrics: "lyrics/Naan-Pogiren.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 69,
        title: "Velicha Poove Vaa",
        artist: "Ethir Neechal",
        music: "Anirudh Ravichander",
        image: "images/EthirNeechal.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Velicha-Poove-Vaa-Male.mp3"),
            female: getFirebaseUrl("songs/female/Velicha-Poove-Vaa-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Velicha-Poove-Vaa-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Velicha-Poove-Vaa-Song.mp3")
        },  
        lyrics: "lyrics/Velicha-Poove-Vaa.txt",
        availableTypes: ["female", "duet", "song", "podcast"],
    },  
{ 
        id: 68,
        title: "Saayndhu Saayndhu",
        artist: "Neethaane En Ponvasantham",
        music: "Ilaiyaraaja",
        image: "images/Neethaane.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Saayndhu-Saayndhu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Saayndhu-Saayndhu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Saayndhu-Saayndhu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Saayndhu-Saayndhu-Song.mp3")
        },  
        lyrics: "lyrics/Saayndhu-Saayndhu.txt",
        availableTypes: ["female", "duet", "song", "podcast"],
    },  
{ 
        id: 67,
        title: "Partha Muthal Naale",
        artist: "Vettaiyadu Vilaiyadu",
        music: "Harris Jayaraj",
        image: "images/VettaiyaduVilaiyadu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Partha-Muthal-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Partha-Muthal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Partha-Muthal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Partha-Muthal-Song.mp3")
        },  
        lyrics: "lyrics/Partha-Muthal.txt",
        availableTypes: ["duet", "song", "podcast"],
    },  
{ 
        id: 66,
        title: "Hasili Fisiliye",
        artist: "Aadhavan",
        music: "Harris Jayaraj",
        image: "images/Aadhavan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Hasili-Fisiliye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Hasili-Fisiliye-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Hasili-Fisiliye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Hasili-Fisiliye-Song.mp3")
        },  
        lyrics: "lyrics/Hasili-Fisiliye.txt",
        availableTypes: ["duet", "song", "podcast"],
    },  
{ 
        id: 65,
        title: "Iragai Pole",
        artist: "Naan Mahaan Alla",
        music: "Yuvan Shankar Raja",
        image: "images/NaanMahanAlla.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Iragai-Pole-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Iragai-Pole-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Iragai-Pole-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Iragai-Pole-Song.mp3")
        },  
        lyrics: "lyrics/Iragai-Pole.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 64,
        title: "Sahana Saaral",
        artist: "Sivaji",
        music: "A R Rahman",
        image: "images/Sivaji.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sahana-Saaral-Male.mp3"),
            female: getFirebaseUrl("songs/female/Sahana-Saaral-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Sahana-Saaral-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sahana-Saaral-Song.mp3")
        },  
        lyrics: "lyrics/Sahana-Saaral.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 63,
        title: "Kaatrukulle Vaasam Pola",
        artist: "Sarvam",
        music: "Yuvan Shankar Raja",
        image: "images/Sarvam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kaatrukulle-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kaatrukulle-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Kaatrukulle-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kaatrukulle-Song.mp3")
        },  
        lyrics: "lyrics/Kaatrukulle.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 62,
        title: "Pachchai Nirame",
        artist: "Alaipayuthe",
        music: "A R Rahman",
        image: "images/Alaipayuthe.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Pachchai-Nirame-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Pachchai-Nirame-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Pachchai-Nirame-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Pachchai-Nirame-Song.mp3")
        },  
        lyrics: "lyrics/Pachchai-Nirame.txt",
        availableTypes: ["male", "song", "podcast"],
    },  
{ 
        id: 61,
        title: "Vaarayo Vaarayo Monolisa",
        artist: "Aadhavan",
        music: "Harris Jayaraj",
        image: "images/Aadhavan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Vaarayo-Vaarayo-Male.mp3"),
            female: getFirebaseUrl("songs/female/Vaarayo-Vaarayo-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Vaarayo-Vaarayo-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vaarayo-Vaarayo-Song.mp3")
        },  
        lyrics: "lyrics/Vaarayo-Vaarayo.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 60,
        title: "Akkam Pakkam Yarumilla",
        artist: "Kireedam",
        music: "G V Prakash Kumar",
        image: "images/Kireedam.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Akkam-Pakkam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Akkam-Pakkam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Akkam-Pakkam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Akkam-Pakkam-Song.mp3")
        },  
        lyrics: "lyrics/Akkam-Pakkam.txt",
        availableTypes: ["female", "song", "podcast"],
    },  
{ 
        id: 59,
        title: "Vizhi Moodi Yosithaal",
        artist: "Ayan",
        music: "Harris Jayaraj",
        image: "images/Ayan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Vizhi-Moodi-Yosithaal-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Vizhi-Moodi-Yosithaal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Vizhi-Moodi-Yosithaal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vizhi-Moodi-Yosithaal-Song.mp3")
        },  
        lyrics: "lyrics/Vizhi-Moodi-Yosithaal.txt",
        availableTypes: ["duet", "song", "podcast"],
    },
{ 
        id: 58,
        title: "Vaseegara",
        artist: "Minnale",
        music: "A R Rahman",
        image: "images/Minnale.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Vaseegara-Male.mp3"),
            female: getFirebaseUrl("songs/female/Vaseegara-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Vaseegara-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vaseegara-Song.mp3")
        },  
        lyrics: "lyrics/Vaseegara.txt",
        availableTypes: ["female", "song", "podcast"],
    },    
{ 
        id: 57,
        title: "Hosanna",
        artist: "Vinnaithaandi Varuvaaya",
        music: "A R Rahman",
        image: "images/VinnaithaandiVaruvaaya.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Hosanna-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Hosanna-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Hosanna-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Hosanna-Song.mp3")
        },  
        lyrics: "lyrics/Hosanna.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 56,
        title: "Thuli Thuli Mazhaiyaai",
        artist: "Paiyaa",
        music: "Yuvan Shankar Raja",
        image: "images/Paiyaa.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thuli-Thuli-Mazhaiyaai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thuli-Thuli-Mazhaiyaai-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thuli-Thuli-Mazhaiyaai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thuli-Thuli-Mazhaiyaai-Song.mp3")
        },  
        lyrics: "lyrics/Thuli-Thuli-Mazhaiyaai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 55,
        title: "Ennamo Yeadho",
        artist: "Ko",
        music: "Harris Jayaraj",
        image: "images/Ko.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennamo-Yeadho-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennamo-Yeadho-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ennamo-Yeadho-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennamo-Yeadho-Song.mp3")
        },  
        lyrics: "lyrics/Ennamo-Yeadho.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 54,
        title: "Manjal Veiyil",
        artist: "Vettaiyadu Vilaiyadu",
        music: "Harris Jayaraj",
        image: "images/VettaiyaduVilaiyadu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Manjal-Veiyil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Manjal-Veiyil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manjal-Veiyil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Manjal-Veiyil-Song.mp3")
        },  
        lyrics: "lyrics/Manjal-Veiyil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 53,
        title: "Engeyo Paartha Mayakkam",
        artist: "Yaaradi Nee Mohini",
        music: "Yuvan Shankar Raja",
        image: "images/YaaradiNeeMohini.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Engeyo-Paartha-Mayakkam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Engeyo-Paartha-Mayakkam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Engeyo-Paartha-Mayakkam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Engeyo-Paartha-Mayakkam-Song.mp3")
        },  
        lyrics: "lyrics/Engeyo-Paartha-Mayakkam.txt",
        availableTypes: ["male", "song", "podcast"],
    },     
{ 
        id: 52,
        title: "Venmegam Pennaga",
        artist: "Yaaradi Nee Mohini",
        music: "Yuvan Shankar Raja",
        image: "images/YaaradiNeeMohini.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Venmegam-Pennaga-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Venmegam-Pennaga-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Venmegam-Pennaga-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Venmegam-Pennaga-Song.mp3")
        },  
        lyrics: "lyrics/Venmegam-Pennaga.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 51,
        title: "Idhu Varai Illadha",
        artist: "Goa",
        music: "Yuvan Shankar Raja",
        image: "images/Goa.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Idhu-Varai-Illadha-Male.mp3"),
            female: getFirebaseUrl("songs/female/Idhu-Varai-Illadha-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Idhu-Varai-Illadha-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Idhu-Varai-Illadha-Song.mp3")
        },  
        lyrics: "lyrics/Idhu-Varai-Illadha.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 50,
        title: "Munbe Vaa",
        artist: "Vaaranam Aayiram",
        music: "Harris Jayaraj",
        image: "images/VaaranamAayiram.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Munbe-Vaa-Male.mp3"),
            female: getFirebaseUrl("songs/female/Munbe-Vaa-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Munbe-Vaa-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Munbe-Vaa-Song.mp3")
        },  
        lyrics: "lyrics/Munbe-Vaa.txt",
        availableTypes: ["female", "song", "podcast"],
    },     
{ 
        id: 49,
        title: "Nee Paartha Vizhigal",
        artist: "Moonu",
        music: "Anirudh Ravichander",
        image: "images/Moonu.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Nee-Paartha-Vizhigal-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nee-Paartha-Vizhigal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Nee-Paartha-Vizhigal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nee-Paartha-Vizhigal-Song.mp3")
        },  
        lyrics: "lyrics/Nee-Paartha-Vizhigal.txt",
        availableTypes: ["duet", "song", "podcast"],
    }, 
{ 
        id: 48,
        title: "Azhagiye Marry Me",
        artist: "Kaatru Veliyidai",
        music: "A R Rahman",
        image: "images/KaatruVeliyidai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Azhagiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Azhagiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Azhagiye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Azhagiye-Song.mp3")
        },  
        lyrics: "lyrics/Azhagiye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 47,
        title: "Mudhal Mazhai",
        artist: "Bheema",
        music: "Harris Jayaraj",
        image: "images/Bheema.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Mudhal-Mazhai-Male.mp3"),
            female: getFirebaseUrl("songs/female/Mudhal-Mazhai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Mudhal-Mazhai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Mudhal-Mazhai-Song.mp3")
        },  
        lyrics: "lyrics/Mudhal-Mazhai.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 46,
        title: "Thean Thean Thean",
        artist: "Kuruvi",
        music: "Vidyasagar",
        image: "images/Kuruvi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thean-Thean-Thean-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thean-Thean-Thean-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thean-Thean-Thean-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thean-Thean-Thean-Song.mp3")
        },  
        lyrics: "lyrics/Thean-Thean-Thean.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 45,
        title: "Anal Mele Panithuli",
        artist: "Vaaranam Aayiram",
        music: "Harris Jayaraj",
        image: "images/VaaranamAayiram.jpg",
        audio: {
           //male: getFirebaseUrl("songs/male/Anal-Mele-Male.mp3"),
            female: getFirebaseUrl("songs/female/Anal-Mele-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Anal-Mele-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Anal-Mele-Song.mp3")
        },  
        lyrics: "lyrics/Anal-Mele.txt",
        availableTypes: ["female", "song", "podcast"],
    },
{ 
        id: 44,
        title: "Naani Koni",
        artist: "Maatraan",
        music: "Harris Jayaraj",
        image: "images/Maatran.jpg",
        audio: {
           //male: getFirebaseUrl("songs/male/Naani-Koni-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Naani-Koni-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Naani-Koni-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Naani-Koni-Song.mp3")
        },  
        lyrics: "lyrics/Naani-Koni.txt",
        availableTypes: ["duet", "song", "podcast"],
    },
{ 
        id: 43,
        title: "Amali Thumali",
        artist: "Ko",
        music: "Harris Jayaraj",
        image: "images/Ko.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Amali-Thumali-Male.mp3"),
            female: getFirebaseUrl("songs/female/Amali-Thumali-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Amali-Thumali-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Amali-Thumali-Song.mp3")
        },  
        lyrics: "lyrics/Amali-Thumali.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
{ 
        id: 42,
        title: "Andha Arabi Kadaloram",
        artist: "Bombay",
        music: "A R Rahman",
        image: "images/Bombay.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Andha-Arabi-Kadaloram-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Andha-Arabi-Kadaloram-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Andha-Arabi-Kadaloram-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Andha-Arabi-Kadaloram-Song.mp3")
        },  
        lyrics: "lyrics/Andha-Arabi-Kadaloram.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 41,
        title: "Oru Maalai Iravinil",
        artist: "Ghajini",
        music: "Harris Jayaraj",
        image: "images/Ghajini.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Maalai-Iravinil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oru-Maalai-Iravinil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oru-Maalai-Iravinil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Maalai-Iravinil-Song.mp3")
        },  
        lyrics: "lyrics/Oru-Maalai-Iravinil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 40,
        title: "Uyirin Uyire",
        artist: "Kakka Kakka",
        music: "Harris Jayaraj",
        image: "images/KakkaKakka.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Uyirin-Uyire-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Uyirin-Uyire-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Uyirin-Uyire-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Uyirin-Uyire-Song.mp3")
        },  
        lyrics: "lyrics/Uyirin-Uyire.txt",
        availableTypes: ["duet", "song", "podcast"],
    }, 
{ 
        id: 39,
        title: "Pathinettu Vayathu",
        artist: "Suriyan",
        music: "Deva",
        image: "images/Suriyan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Pathinettu-Vayathu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Pathinettu-Vayathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Pathinettu-Vayathu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Pathinettu-Vayathu-Song.mp3")
        },  
        lyrics: "lyrics/Pathinettu-Vayathu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 38,
        title: "Engey Enn Jeevane",
        artist: "Uyarndha Ullam",
        music: "Ilaiyaraaja",
        image: "images/UyarndhaUllam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Engey-Enn-Jeevane-Male.mp3"),
            female: getFirebaseUrl("songs/female/Engey-Enn-Jeevane-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Engey-Enn-Jeevane-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Engey-Enn-Jeevane-Song.mp3")
        },  
        lyrics: "lyrics/Engey-Enn-Jeevane.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 37,
        title: "Dheivam Thantha Veedu",
        artist: "Aval Oru Thodar Kathai",
        music: "M S Viswanathan",
        image: "images/AvalOruThodarKathai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Deivam-Thantha-Veedu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Dheivam-Thantha-Veedu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Dheivam-Thantha-Veedu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Dheivam-Thantha-Veedu-Song.mp3")
        },  
        lyrics: "lyrics/Dheivam-Thantha-Veedu.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 36,
        title: "Un Uthadora Sivape",
        artist: "Panchalankurichi",
        music: "Deva",
        image: "images/Panchalankurichi.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Un-Uthadora-Sivape-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Un-Uthadora-Sivape-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Un-Uthadora-Sivape-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Un-Uthadora-Sivape-Song.mp3")
        },  
        lyrics: "lyrics/Un-Uthadora-Sivape.txt",
        availableTypes: ["duet", "song", "podcast"],
    }, 
{ 
        id: 35,
        title: "Vaayamoodi Summa Iru Da",
        artist: "Mugamoodi",
        music: "Krishna Kumar",
        image: "images/Mugamoodi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Vaayamoodi-Summa-Iru-Da-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Vaayamoodi-Summa-Iru-Da-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Vaayamoodi-Summa-Iru-Da-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Vaayamoodi-Summa-Iru-Da-Song.mp3")
        },  
        lyrics: "lyrics/Vaayamoodi-Summa-Iru-Da.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 34,
        title: "Oliyile Therivadhu",
        artist: "Azhagi",
        music: "Ilaiyaraaja",
        image: "images/Azhagi.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Oliyile-Therivadhu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oliyile-Therivadhu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oliyile-Therivadhu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oliyile-Therivadhu-Song.mp3")
        },  
        lyrics: "lyrics/Oliyile-Therivadhu.txt",
        availableTypes: ["duet", "song", "podcast"],
    }, 
{ 
        id: 33,
        title: "Nenjinile Nenjinile",
        artist: "Uyire",
        music: "A R Rahman",
        image: "images/Uyire.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Nenjinile-Nenjinile-Male.mp3"),
            female: getFirebaseUrl("songs/female/Nenjinile-Nenjinile-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Nenjinile-Nenjinile-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nenjinile-Nenjinile-Song.mp3")
        },  
        lyrics: "lyrics/Nenjinile-Nenjinile.txt",
        availableTypes: ["female", "song", "podcast"],
    }, 
{ 
        id: 32,
        title: "Lajjavathiye",
        artist: "4Students",
        music: "Jassie Gift",
        image: "images/4Students.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Lajjavathiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Lajjavathiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Lajjavathiye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Lajjavathiye-Song.mp3")
        },  
        lyrics: "lyrics/Lajjavathiye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 31,
        title: "Manmadhane Nee",
        artist: "Manmadhan",
        music: "Yuvan Shankar Raja",
        image: "images/Manmadhan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Manmadhane-Nee-Male.mp3"),
            female: getFirebaseUrl("songs/female/Manmadhane-Nee-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manmadhane-Nee-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Manmadhane-Nee-Song.mp3")
        },  
        lyrics: "lyrics/Manmadhane-Nee.txt",
        availableTypes: ["female", "song", "podcast"],
    },
{ 
        id: 30,
        title: "Manasellam Mazhaiye",
        artist: "Saguni",
        music: "G V Prakash Kumar",
        image: "images/Saguni.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Manasellam-Mazhaiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Manasellam-Mazhaiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manasellam-Mazhaiye-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Manasellam-Mazhaiye-Song.mp3")
        },  
        lyrics: "lyrics/Manasellam-Mazhaiye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 29,
        title: "Thendral Thaan Thingal Thaan",
        artist: "PuthuPuthu Arthangal",
        music: "Ilaiyaraaja",
        image: "images/PuthuPuthuArthangal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thendral-Thaan-Thingal-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thendral-Thaan-Thingal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thendral-Thaan-Thingal-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thendral-Thaan-Thingal-Song.mp3")
        },  
        lyrics: "lyrics/Thendral-Thaan-Thingal.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 28,
        title: "Paada Vandhadhor Gaanam",
        artist: "Ilamai Kaalangal",
        music: "Ilaiyaraaja",
        image: "images/IlamaiKaalangal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Paada-Vandhadhor-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Paada-Vandhadhor-Gaanam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Paada-Vandhadhor-Gaanam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Paada-Vandhadhor-Gaanam-Song.mp3")
        },  
        lyrics: "lyrics/Paada-Vandhadhor-Gaanam.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 27,
        title: "Pesa Koodathu",
        artist: "Adutha Varisu",
        music: "Ilaiyaraaja",
        image: "images/AduthaVarisu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Pesa-Koodathu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Pesa-Koodathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Pesa-Koodathu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Pesa-Koodathu-Song.mp3")
        },  
        lyrics: "lyrics/Pesa-Koodathu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 26,
        title: "Mazhai Tharumo En Megam",
        artist: "Manidharil Ithanai Nirangala",
        music: "Shyam",
        image: "images/ManidharilIthanaiNirangala.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Mazhai-Tharumo-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Mazhai-Tharumo-En-Megam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Mazhai-Tharumo-En-Megam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Mazhai-Tharumo-En-Megam-Song.mp3")
        },  
        lyrics: "lyrics/Mazhai-Tharumo-En-Megam.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 25,
        title: "Oru Pattam Poochi",
        artist: "Kadhalukku Mariyadhai",
        music: "Ilaiyaraaja",
        image: "images/KadhalukkuMariyadhai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Pattam-Poochi-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oru-Pattam-Poochi-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oru-Pattam-Poochi-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Pattam-Poochi-Song.mp3")
        },  
        lyrics: "lyrics/Oru-Pattam-Poochi.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 24,
        title: "Ennavale Ennavale Engirunthai",
        artist: "Ninaithen Vanthai",
        music: "Deva",
        image: "images/NinaithenVanthai.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Ennavale-Ennavale-Engirunthai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennavale-Ennavale-Engirunthai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennavale-Ennavale-Engirunthai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennavale-Ennavale-Engirunthai-Song.mp3")
        },  
        lyrics: "lyrics/Ennavale-Ennavale-Engirunthai.txt",
        availableTypes: ["duet", "song", "podcast"],

    }, 
{ 
        id: 23,
        title: "Enna Solli Paaduvatho",
        artist: "En Mana Vaanil",
        music: "Ilaiyaraaja",
        image: "images/EnManaVaanil.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Enna-Solli-Paaduvatho-Male.mp3"),
            female: getFirebaseUrl("songs/female/Enna-Solli-Paaduvatho-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Enna-Solli-Paaduvatho-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Enna-Solli-Paaduvatho-Song.mp3")
        },  
        lyrics: "lyrics/Enna-Solli-Paaduvatho.txt",
        availableTypes: ["male", "female", "song", "podcast"],
    }, 
{ 
        id: 22,
        title: "Ennulle Ennulle",
        artist: "Valli",
        music: "Ilaiyaraaja",
        image: "images/Valli.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Ennulle-Ennulle-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennulle-Ennulle-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ennulle-Ennulle-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennulle-Ennulle-Song.mp3")
        },  
        lyrics: "lyrics/Ennulle-Ennulle.txt",
        availableTypes: ["female", "song", "podcast"],
    }, 
{ 
        id: 21,
        title: "Ennai Konjam Maatri",
        artist: "Kakka Kakka",
        music: "Harris Jayaraj",
        image: "images/KakkaKakka.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennai-Konjam-Maatri-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennai-Konjam-Maatri-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennai-Konjam-Maatri-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennai-Konjam-Maatri-Song.mp3")
        },  
        lyrics: "lyrics/Ennai-Konjam-Maatri.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },  
{ 
        id: 20,
        title: "Thodu Thodu Enave",
        artist: "Thullatha Manamum Thullum",
        music: "S A Rajkumar",
        image: "images/ThullathaManamumThullum.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thodu-Thodu-Enave-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thodu-Thodu-Enave-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thodu-Thodu-Enave-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thodu-Thodu-Enave-Song.mp3")
        },  
        lyrics: "lyrics/Thodu-Thodu-Enave.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },     
{ 
        id: 19,
        title: "Sangeetha Megham",
        artist: "Udhaya Geetham",
        music: "Ilaiyaraaja",
        image: "images/UdhayaGeetham.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Sangeetha-Megham-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sangeetha-Megham-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sangeetha-Megham-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Sangeetha-Megham-Song.mp3")
        },  
        lyrics: "lyrics/Sangeetha-Megham.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 18,
        title: "Thuli Thuliyai Kottum",
        artist: "Paarvai Ondre Pothume",
        music: "Bharani",
        image: "images/PaarvaiOndrePothume.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Thuli-Thuliyai-Kottum-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thuli-Thuliyai-Kottum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thuli-Thuliyai-Kottum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Thuli-Thuliyai-Kottum-Song.mp3")
        },  
        lyrics: "lyrics/Thuli-Thuliyai-Kottum.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 17,
        title: "Ennamma Kannu Sowkiyama",
        artist: "Mr Bharath",
        music: "Ilaiyaraaja",
        image: "images/MrBharath.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennamma-Kannu-Sowkiyama-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennamma-Kannu-Sawkiyama-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennamma-Kannu-Sawkiyama-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennamma-Kannu-Sawkiyama-Song.mp3")
        },  
        lyrics: "lyrics/Ennamma-Kannu-Sowkiyama.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    }, 
{ 
        id: 16,
        title: "Kavidhaye Theriyuma",
        artist: "Jayam",
        music: "R P Patnaik",
        image: "images/Jayam.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kavithayae-Theriyuma-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kavithayae-Theriyuma-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kavidhaye-Theriyuma-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Kavithayae-Theriyuma-Song.mp3")
        },  
        lyrics: "lyrics/Kavidhaye-Theriyma.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    }, 
{ 
        id: 15,
        title: "Unna Nenachen",
        artist: "Apoorva Sagodharargal",
        music: "Ilaiyaraaja",
        image: "images/ApoorvaSagodharargal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Unna-Nenachen-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Unna-Nenachen-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Unna-Nenachen-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Unna-Nenachen-Song.mp3")
        },  
        lyrics: "lyrics/Unna-Nenachen.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 14,
        title: "Idhayam Oru Kovil",
        artist: "Idhaya Kovil",
        music: "Ilaiyaraaja",
        image: "images/IdhayaKovil.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Idhayam-Oru-Kovil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Idhayam-Oru-Kovil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Idhayam-Oru-Kovil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Idhayam-Oru-Kovil-Song.mp3")
        },  
        lyrics: "lyrics/Idhayam-Oru-Kovil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
 { 
        id: 13,
        title: "Elangaathu Veesudhey",
        artist: "Pithamagan",
        music: "Ilaiyaraaja",
        image: "images/Pithamagan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Elangaathu-Veesudhey-Male.mp3"),
            female: getFirebaseUrl("songs/female/Elangaathu-Veesudhey-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Elangaathu-Veesudhey-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Elangaathu-Veesudhey-Song.mp3")
        },  
        lyrics: "lyrics/Elangaathu-Veesudhey.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
        {
        id: 12,
        title: "En Anbe Anbe En Manam",
        artist: "Unnai Thedi Varuven",
        music: "Ilaiyaraaja",
        image: "images/UnnaiThediVaruven.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/En-Anbe-Anbe-Male.mp3"),
            female: getFirebaseUrl("songs/female/En-Anbe-Anbe-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/En-Anbe-Anbe-Duet.mp3"),
            song: getFirebaseUrl("songs/song/En-Anbe-Anbe-Song.mp3")
        },  
        lyrics: "lyrics/EnAnbeAnbe.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
        {
        id: 11,
        title: "Enna Thaan Sugamo",
        artist: "Mappillai",
        music: "Ilaiyaraaja",
        image: "images/Mappillai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Ennathaan-Sugamo-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennathaan-Sugamo-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennathaan-Sugamo-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennathaan-Sugamo-Song.mp3")
        },  
        lyrics: "lyrics/EnnaThanSugamo.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
      {
        id: 10,
        title: "Maalayil Yaro",
        artist: "Chatriyan",
        music: "Ilaiyaraaja",
        image: "images/Chatriyan.jpg",
        audio: {
            //male: getFirebaseUrl("songs/male/Maalayil-Yaro-male.mp3"),
            female: getFirebaseUrl("songs/female/Maalayil-Yaaro-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Maalayil-Yaro-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Maalayil-Yaro-Song.mp3")
        },  
        lyrics: "lyrics/Maalayil-Yaro.txt",
        availableTypes: ["female", "song", "podcast"],
    }, 	
      {
        id: 9,
        title: "Kadhal Oviyam",
        artist: "Alaigal Oivathillai",
        music: "Ilaiyaraaja",
        image: "images/AlaigalOivathillai.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Kadhal-Oviyam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kadhal-Oviyam-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kadhal-Oviyam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kadhal-Oviyam-Song.mp3")
        },  
        lyrics: "lyrics/Kadhal-Oviyam.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
      {
        id: 8,
        title: "Malare Mounama",
        artist: "Karna",
        music: "Vidyasagar",
        image: "images/Karna.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Malare-Mounama-Male.mp3"),
            female: getFirebaseUrl("songs/female/Malare-Mounama-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Malare-Mounama-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Malare-Mounama-Song.mp3")
        },  
        lyrics: "lyrics/Malare-Mounama.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
      {
        id: 7,
        title: "Valli Valli Ena Vanthan",
        artist: "Deiva Vaakku",
        music: "Ilaiyaraaja",
        image: "images/DeivaVaakku.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Valli-Valli-Ena-Vanthan-Male.mp3"),
            female: getFirebaseUrl("songs/female/Valli-Valli-Ena-Vanthan-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Valli-Valli-Ena-Vanthan-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Valli-Valli-Ena-Vanthan-Song.mp3")
        },  
        lyrics: "lyrics/Valli-Valli-Ena-Vanthan.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
      {
        id: 6,
        title: "Nethu Oruthara Oruthara",
        artist: "Puthu Pattu",
        music: "Ilaiyaraaja",
        image: "images/PuthuPattu.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Nethu-Oruthara-Oruthara-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nethu-Oruthara-Oruthara-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Nethu-Oruthara-Oruthara-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nethu-Oruthara-Oruthara-Song.mp3")
        },  
        lyrics: "lyrics/Nethu-Oruthara-Oruthara.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    }, 
      {
        id: 5,
        title: "Innum Ennai Enna",
        artist: "Singaravelan",
        music: "Ilaiyaraaja",
        image: "images/Singaravelan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Innum-Ennai-Enna-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Innum-Ennai-Enna-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Innum-Ennai-Enna-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Innum-Ennai-Enna-Song.mp3")
        },  
        lyrics: "lyrics/Innum-Ennai-Enna.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    }, 
      {
        id: 4,
        title: "Aagaya Gangai",
        music: "Ilaiyaraaja",
        artist: "Dharma Yuddham",
        image: "images/DharmaYuddham.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Aagaya-Gangai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Aagaya-Gangai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Aagaya-Gangai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Aagaya-Gangai-Song.mp3")
        },  
        lyrics: "lyrics/Aagaya-Gangai.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    }, 
     {
        id: 3,
        title: "Engengo Sellum",
        artist: "Pattakkathi Bhairavan",
        music: "Ilaiyaraaja",
        image: "images/PattakkathiBhairavan.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Engengo-Sellum-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Engengo-Sellum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Engengo-Sellum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Engengo-Sellum-Song.mp3")
        },  
        lyrics: "lyrics/Engengo-Sellum.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    },
    {
        id: 2,
        title: "Oru Kadhal Enbathu",
        artist: "Chinna Thambi Periya Thambi",
        music: "Gangai Amaran",
        image: "images/ChinnaThambi.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Kadhal-Enbathu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oru-Kadhal-Enbathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oru-Kadhal-Enbathu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Kadhal-Enbathu-Song.mp3")
        },  
        lyrics: "lyrics/OruKadhalEnbathu.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
    },
    {
        id: 1,
        title: "Guruvayurappa",
        artist: "Puthu Puthu Arthangal",
        music: "Ilaiyaraaja",
        image: "images/PuthuPuthuArthangal.jpg",
        audio: {
            male: getFirebaseUrl("songs/male/Guruvayurappa-Guruvayurappa-Male.mp3"),
            female: getFirebaseUrl("songs/female/Guruvayurappa-Guruvayurappa-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Guruvayurappa-Guruvayurappa-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Guruvayurappa-Guruvayurappa-Song.mp3")
        },  
        lyrics: "lyrics/Guruvayurappa.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
	
];

songs.forEach(song => {
    song.currentType = "male"; // Default type, will be updated by script.js
    song.active = false; // Will be set by script.js based on current selection
});
