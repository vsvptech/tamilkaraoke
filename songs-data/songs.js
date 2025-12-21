// songs.js - Clean version using the helper function
const FIREBASE_BUCKET = "chillaxkaraoke-3d1cb.firebasestorage.app";

function getFirebaseUrl(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}

const songs = [



{ 
        id: 16,
        title: "Kavidhaye Theriyuma",
        artist: "Jayam",
        image: getFirebaseUrl("images/Jayam.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Kavithayae-Theriyuma-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kavithayae-Theriyuma-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kavidhaye-Theriyuma-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Kavithayae-Theriyuma-Song.mp3")
        },  
        lyrics: "lyrics/Kavidhaye-Theriyma.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 16,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 15,
        title: "Unna Nenachen",
        artist: "Apoorva Sagodharargal",
        image: getFirebaseUrl("images/ApoorvaSagodharargal.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Unna-Nenachen-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Unna-Nenachen-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Unna-Nenachen-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Unna-Nenachen-Song.mp3")
        },  
        lyrics: "lyrics/Unna-Nenachen.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 15,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 14,
        title: "Idhayam Oru Kovil",
        artist: "Idhaya Kovil",
        image: getFirebaseUrl("images/IdhayaKovil.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Idhayam-Oru-Kovil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Idhayam-Oru-Kovil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Idhayam-Oru-Kovil-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Idhayam-Oru-Kovil-Song.mp3")
        },  
        lyrics: "lyrics/Idhayam-Oru-Kovil.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 14,
        active: false,
        currentType: "male"
    }, 
 { 
        id: 13,
        title: "Elangaathu Veesudhey",
        artist: "Unnai Thedi Varuven",
        image: getFirebaseUrl("images/Pithamagan.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Elangaathu-Veesudhey-Male.mp3"),
            female: getFirebaseUrl("songs/female/Elangaathu-Veesudhey-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Elangaathu-Veesudhey-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Elangaathu-Veesudhey-Song.mp3")
        },  
        lyrics: "lyrics/Elangaathu-Veesudhey.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 13,
        active: false,
        currentType: "male"
    }, 
{
        id: 12,
        title: "En Anbe Anbe En Manam",
        artist: "Unnai Thedi Varuven",
        image: getFirebaseUrl("images/UnnaiThediVaruven.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/En-Anbe-Anbe-Male.mp3"),
            female: getFirebaseUrl("songs/female/En-Anbe-Anbe-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/En-Anbe-Anbe-Duet.mp3"),
            song: getFirebaseUrl("songs/song/En-Anbe-Anbe-Song.mp3")
        },  
        lyrics: "lyrics/EnAnbeAnbe.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 12,
        active: false,
        currentType: "male"
       },
{
        id: 11,
        title: "Enna Thaan Sugamo",
        artist: "Mappillai",
        image: getFirebaseUrl("images/Mappillai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennathaan-Sugamo-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennathaan-Sugamo-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennathaan-Sugamo-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Ennathaan-Sugamo-Song.mp3")
        },  
        lyrics: "lyrics/EnnaThanSugamo.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 11,
        active: false,
        currentType: "male"
    }, 
      {
               id: 10,
        title: "Maalayil Yaro",
        artist: "Chatriyan",
        image: getFirebaseUrl("images/Chatriyan.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Maalayil-Yaro-male.mp3"),
            female: getFirebaseUrl("songs/female/Maalayil-Yaaro-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Maalayil-Yaro-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Maalayil-Yaro-Song.mp3")
        },  
        lyrics: "lyrics/Maalayil-Yaro.txt",
        availableTypes: ["female", "song", "podcast"],
        trackId: 10,
        active: false,
        currentType: "female"
    }, 	
      {
        id: 9,
        title: "Kadhal Oviyam",
        artist: "Alaigal Oivathillai",
        image: getFirebaseUrl("images/AlaigalOivathillai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Kadhal-Oviyam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Kadhal-Oviyam-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kadhal-Oviyam-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kadhal-Oviyam-Song.mp3")
        },  
        lyrics: "lyrics/Kadhal-Oviyam.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 9,
        active: false,
        currentType: "male"
    },
      {
        id: 8,
        title: "Malare Mounama",
        artist: "Karna",
        image: getFirebaseUrl("images/Karna.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Malare-Mounama-Male.mp3"),
            female: getFirebaseUrl("songs/female/Malare-Mounama-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Malare-Mounama-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Malare-Mounama-Song.mp3")
        },  
        lyrics: "lyrics/Malare-Mounama.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 8,
        active: false,
        currentType: "male"
    },
      {
        id: 7,
        title: "Valli Valli Ena Vanthan",
        artist: "Deiva Vaakku",
        image: getFirebaseUrl("images/DeivaVaakku.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Valli-Valli-Ena-Vanthan-Male.mp3"),
            female: getFirebaseUrl("songs/female/Valli-Valli-Ena-Vanthan-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Valli-Valli-Ena-Vanthan-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Valli-Valli-Ena-Vanthan-Song.mp3")
        },  
        lyrics: "lyrics/Valli-Valli-Ena-Vanthan.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 7,
        active: false,
        currentType: "male"
    }, 
      {
        id: 6,
        title: "Nethu Oruthara Oruthara",
        artist: "Puthu Pattu",
        image: getFirebaseUrl("images/PuthuPattu.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Nethu-Oruthara-Oruthara-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nethu-Oruthara-Oruthara-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Nethu-Oruthara-Oruthara-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Nethu-Oruthara-Oruthara-Song.mp3")
        },  
        lyrics: "lyrics/Nethu-Oruthara-Oruthara.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 6,
        active: false,
        currentType: "male"
    }, 
      {
        id: 5,
        title: "Innum Ennai Enna",
        artist: "Singaravelan",
        image: getFirebaseUrl("images/Singaravelan.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Innum-Ennai-Enna-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Innum-Ennai-Enna-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Innum-Ennai-Enna-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Innum-Ennai-Enna-Song.mp3")
        },  
        lyrics: "lyrics/Innum-Ennai-Enna.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 5,
        active: false,
        currentType: "male"
    }, 
      {
        id: 4,
        title: "Aagaya Gangai",
        artist: "Dharma Yuddham",
        image: getFirebaseUrl("images/DharmaYuddham.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Aagaya-Gangai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Aagaya-Gangai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Aagaya-Gangai-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Aagaya-Gangai-Song.mp3")
        },  
        lyrics: "lyrics/Aagaya-Gangai.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 4,
        active: false,
        currentType: "male"
    }, 
     {
        id: 3,
        title: "Engengo Sellum",
        artist: "Pattakkathi Bhairavan",
        image: getFirebaseUrl("images/PattakkathiBhairavan.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Engengo-Sellum-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Engengo-Sellum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Engengo-Sellum-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Engengo-Sellum-Song.mp3")
        },  
        lyrics: "lyrics/Engengo-Sellum.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 3,
        active: false,
        currentType: "male"
    },
    {
        id: 2,
        title: "Oru Kadhal Enbathu",
        artist: "Chinna Thambi Periya Thambi",
        image: getFirebaseUrl("images/ChinnaThambi.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Kadhal-Enbathu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oru-Kadhal-Enbathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oru-Kadhal-Enbathu-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Kadhal-Enbathu-Song.mp3")
        },  
        lyrics: "lyrics/OruKadhalEnbathu.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 2,
        active: false,
        currentType: "male"
    },
    {
        id: 1,
        title: "Guruvayurappa",
        artist: "Puthu Puthu Arthangal",
        image: getFirebaseUrl("images/PuthuPuthuArthangal.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Guruvayurappa-Guruvayurappa-Male.mp3"),
            female: getFirebaseUrl("songs/female/Guruvayurappa-Guruvayurappa-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Guruvayurappa-Guruvayurappa-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Guruvayurappa-Guruvayurappa-Song.mp3")
        },  
        lyrics: "lyrics/Guruvayurappa.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 1,
        active: true,
        currentType: "male"
    },
	
];
