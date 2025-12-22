// songs.js - Clean version using the helper function
const FIREBASE_BUCKET = "chillaxkaraoke-3d1cb.firebasestorage.app";

function getFirebaseUrl(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}

const songs = [




{ 
        id: 41,
        title: "Uyirin Uyire",
        artist: "Kakka Kakka",
        image: getFirebaseUrl("images/KakkaKakka.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Uyirin-Uyire-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Uyirin-Uyire-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Uyirin-Uyire-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Uyirin-Uyire-Song.mp3")
        },  
        lyrics: "lyrics/Uyirin-Uyire.txt",
        availableTypes: ["duet", "song", "podcast"],
        trackId: 41,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 40,
        title: "Pathinettu-Vayathu",
        artist: "Suriyan",
        image: getFirebaseUrl("images/Suriyan.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Pathinettu-Vayathu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Pathinettu-Vayathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Pathinettu-Vayathu-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Pathinettu-Vayathu-Song.mp3")
        },  
        lyrics: "lyrics/Pathinettu-Vayathu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 40,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 38,
        title: "Engey Enn Jeevane",
        artist: "Uyarndha Ullam",
        image: getFirebaseUrl("images/UyarndhaUllam.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Engey-Enn-Jeevane-Male.mp3"),
            female: getFirebaseUrl("songs/female/Engey-Enn-Jeevane-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Engey-Enn-Jeevane-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Engey-Enn-Jeevane-Song.mp3")
        },  
        lyrics: "lyrics/Engey-Enn-Jeevane.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 38,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 37,
        title: "Dheivam Thantha Veedu",
        artist: "Aval Oru Thodar Kathai",
        image: getFirebaseUrl("images/AvalOruThodarKathai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Dheivam-Thantha-Veedu-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Dheivam-Thantha-Veedu-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Dheivam-Thantha-Veedu-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Dheivam-Thantha-Veedu-Song.mp3")
        },  
        lyrics: "lyrics/Dheivam-Thantha-Veedu.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 37,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 36,
        title: "Un Uthadora Sivape",
        artist: "Panchalankurichi",
        image: getFirebaseUrl("images/Panchalankurichi.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Un-Uthadora-Sivape-Male.mp3"),
            female: getFirebaseUrl("songs/female/Un-Uthadora-Sivape-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Un-Uthadora-Sivape-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Un-Uthadora-Sivape-Song.mp3")
        },  
        lyrics: "lyrics/Un-Uthadora-Sivape.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 36,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 35,
        title: "Oru Maalai Iravinil",
        artist: "Ghajini",
        image: getFirebaseUrl("images/Ghajini.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Maalai-Iravinil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Oru-Maalai-Iravinil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Oru-Maalai-Iravinil-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Maalai-Iravinil-Song.mp3")
        },  
        lyrics: "lyrics/Oru-Maalai-Iravinil.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 35,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 35,
        title: "Vaayamoodi Summa Iru Da",
        artist: "Mugamoodi",
        image: getFirebaseUrl("images/Mugamoodi.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Vaayamoodi-Summa-Iru-Da-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Vaayamoodi-Summa-Iru-Da-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Vaayamoodi-Summa-Iru-Da-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Vaayamoodi-Summa-Iru-Da-Song.mp3")
        },  
        lyrics: "lyrics/Vaayamoodi-Summa-Iru-Da.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 35,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 34,
        title: "Oliyile Therivadhu",
        artist: "Azhagi",
        image: getFirebaseUrl("images/Azhagi.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Oliyile-Therivadhu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Oliyile-Therivadhu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oliyile-Therivadhu-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Oliyile-Therivadhu-Song.mp3")
        },  
        lyrics: "lyrics/Oliyile-Therivadhu.txt",
        availableTypes: ["male", "female", "song", "podcast"],
        trackId: 34,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 33,
        title: "Nenjinile Nenjinile",
        artist: "Uyire",
        image: getFirebaseUrl("images/Uyire.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Nenjinile-Nenjinile-Male.mp3"),
            female: getFirebaseUrl("songs/female/Nenjinile-Nenjinile-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Nenjinile-Nenjinile-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Nenjinile-Nenjinile-Song.mp3")
        },  
        lyrics: "lyrics/Nenjinile-Nenjinile.txt",
        availableTypes: ["female", "song", "podcast"],
        trackId: 33,
        active: false,
        currentType: "female"
    }, 
{ 
        id: 32,
        title: "Lajjavathiye",
        artist: "4Students",
        image: getFirebaseUrl("images/4Students.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Lajjavathiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Lajjavathiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Lajjavathiye-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Lajjavathiye-Song.mp3")
        },  
        lyrics: "lyrics/Lajjavathiye.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 32,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 31,
        title: "Manmadhane-Nee",
        artist: "Manmadhan",
        image: getFirebaseUrl("images/Manmadhan.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Manmadhane-Nee-Male.mp3"),
            female: getFirebaseUrl("songs/female/Manmadhane-Nee-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manmadhane-Nee-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Manmadhane-Nee-Song.mp3")
        },  
        lyrics: "lyrics/Manmadhane-Nee.txt",
        availableTypes: ["female", "song", "podcast"],
        trackId: 31,
        active: false,
        currentType: "female"
    },
{ 
        id: 30,
        title: "Manasellam Mazhaiye",
        artist: "Saguni",
        image: getFirebaseUrl("images/Saguni.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Manasellam-Mazhaiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Manasellam-Mazhaiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manasellam-Mazhaiye-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Manasellam-Mazhaiye-Song.mp3")
        },  
        lyrics: "lyrics/Manasellam-Mazhaiye-Thingal.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 30,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 29,
        title: "Thendral Thaan Thingal Thaan",
        artist: "PuthuPuthu Arthangal",
        image: getFirebaseUrl("images/PuthuPuthuArthangal.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Thendral-Thaan-Thingal-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thendral-Thaan-Thingal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thendral-Thaan-Thingal-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Thendral-Thaan-Thingal-Song.mp3")
        },  
        lyrics: "lyrics/Thendral-Thaan-Thingal.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 29,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 28,
        title: "Paada Vandhadhor Gaanam",
        artist: "Ilamai Kaalangal",
        image: getFirebaseUrl("images/IlamaiKaalangal.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Paada-Vandhadhor-Gaanam-Male.mp3"),
            female: getFirebaseUrl("songs/female/Paada-Vandhadhor-Gaanam-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Paada-Vandhadhor-Gaanam-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Paada-Vandhadhor-Gaanam-Song.mp3")
        },  
        lyrics: "lyrics/Paada-Vandhadhor-Gaanam.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 28,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 27,
        title: "Pesa Koodathu",
        artist: "Adutha Varisu",
        image: getFirebaseUrl("images/AduthaVarisu.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Pesa-Koodathu-Male.mp3"),
            female: getFirebaseUrl("songs/female/Pesa-Koodathu-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Pesa-Koodathu-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Pesa-Koodathu-Song.mp3")
        },  
        lyrics: "lyrics/Pesa-Koodathu.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 27,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 26,
        title: "Mazhai Tharumo En Megam",
        artist: "Manidharil Ithanai Nirangala",
        image: getFirebaseUrl("images/ManidharilIthanaiNirangala.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Mazhai-Tharumo-En-Megam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Mazhai-Tharumo-En-Megam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Mazhai-Tharumo-En-Megam-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Mazhai-Tharumo-En-Megam-Song.mp3")
        },  
        lyrics: "lyrics/Mazhai-Tharumo-En-Megam.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 26,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 25,
        title: "Oru Pattam Poochi",
        artist: "Kadhalukku Mariyadhai",
        image: getFirebaseUrl("images/KadhalukkuMariyadhai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Oru-Pattam-Poochi-Male.mp3"),
            female: getFirebaseUrl("songs/female/Oru-Pattam-Poochi-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Oru-Pattam-Poochi-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Oru-Pattam-Poochi-Song.mp3")
        },  
        lyrics: "lyrics/Oru-Pattam-Poochi.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 25,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 24,
        title: "Ennavale Ennavale Engirunthai",
        artist: "Ninaithen Vanthai",
        image: getFirebaseUrl("images/NinaithenVanthai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennavale-Ennavale-Engirunthai-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennavale-Ennavale-Engirunthai-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennavale-Ennavale-Engirunthai-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennavale-Ennavale-Engirunthai-Song.mp3")
        },  
        lyrics: "lyrics/Ennavale-Ennavale-Engirunthai.txt",
        availableTypes: ["male", "female", "duet","song", "podcast"],
        trackId: 24,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 23,
        title: "Enna Solli Paaduvatho",
        artist: "En Mana Vaanil",
        image: getFirebaseUrl("images/EnManaVaanil.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Enna-Solli-Paaduvatho-Male.mp3"),
            female: getFirebaseUrl("songs/female/Enna-Solli-Paaduvatho-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Enna-Solli-Paaduvatho-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Enna-Solli-Paaduvatho-Song.mp3")
        },  
        lyrics: "lyrics/Enna-Solli-Paaduvatho.txt",
        availableTypes: ["male", "female", "song", "podcast"],
        trackId: 23,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 22,
        title: "Ennulle Ennulle",
        artist: "Valli",
        image: getFirebaseUrl("images/Valli.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Ennulle-Ennulle-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennulle-Ennulle-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ennulle-Ennulle-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennulle-Ennulle-Song.mp3")
        },  
        lyrics: "lyrics/Ennulle-Ennulle.txt",
        availableTypes: ["female", "song", "podcast"],
        trackId: 22,
        active: false,
        currentType: "female"
    }, 
{ 
        id: 21,
        title: "Ennai Konjam Maatri",
        artist: "Kakka Kakka",
        image: getFirebaseUrl("images/KakkaKakka.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennai-Konjam-Maatri-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennai-Konjam-Maatri-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennai-Konjam-Maatri-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennai-Konjam-Maatri-Song.mp3")
        },  
        lyrics: "lyrics/Ennai-Konjam-Maatri.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 21,
        active: false,
        currentType: "male"
    },  
{ 
        id: 20,
        title: "Ennulle Ennulle",
        artist: "Valli",
        image: getFirebaseUrl("images/Valli.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Ennulle-Ennulle-Male.mp3"),
            female: getFirebaseUrl("songs/female/Ennulle-Ennulle-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ennulle-Ennulle-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennulle-Ennulle-Song.mp3")
        },  
        lyrics: "lyrics/Ennulle-Ennulle.txt",
        availableTypes: ["female", "song", "podcast"],
        trackId: 20,
        active: false,
        currentType: "male"
    },     
{ 
        id: 19,
        title: "Sangeetha Megham",
        artist: "Udhaya Geetham",
        image: getFirebaseUrl("images/UdhayaGeetham.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Sangeetha-Megham-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Sangeetha-Megham-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Sangeetha-Megham-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Sangeetha-Megham-Song.mp3")
        },  
        lyrics: "lyrics/Sangeetha-Megham.txt",
        availableTypes: ["male", "song", "podcast"],
        trackId: 19,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 18,
        title: "Thuli-Thuliyai-Kottum",
        artist: "Paarvai Ondre Pothume",
        image: getFirebaseUrl("images/PaarvaiOndrePothume.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Thuli-Thuliyai-Kottum-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thuli-Thuliyai-Kottum-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thuli-Thuliyai-Kottum-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Thuli-Thuliyai-Kottum-Song.mp3")
        },  
        lyrics: "lyrics/Thuli-Thuliyai-Kottum.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
        trackId: 18,
        active: false,
        currentType: "male"
    }, 
{ 
        id: 17,
        title: "Ennamma Kannu Sowkiyama",
        artist: "Mr Bharath",
        image: getFirebaseUrl("images/MrBharath.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennamma-Kannu-Sawkiyama-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennamma-Kannu-Sawkiyama-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Ennamma-Kannu-Sawkiyama-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennamma-Kannu-Sawkiyama-Song.mp3")
        },  
        lyrics: "lyrics/Ennamma-Kannu-Sowkiyama.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
        trackId: 17,
        active: false,
        currentType: "male"
    }, 
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
