// songs.js - Clean version using the helper function
const FIREBASE_BUCKET = "chillaxkaraoke-3d1cb.firebasestorage.app";

function getFirebaseUrl(path) {
    return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
}
const songs = [

{ 
        id: 57,
        title: "Hosanna",
        artist: "Vinnaithaandi Varuvaaya",
        image: getFirebaseUrl("images/VinnaithaandiVaruvaaya.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Hosanna-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Hosanna-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Hosanna-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Hosanna-Song.mp3")
        },  
        lyrics: "lyrics/Hosanna.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 56,
        title: "Thuli Thuli Mazhaiyaai",
        artist: "Paiyaa",
        image: getFirebaseUrl("images/Paiyaa.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Thuli-Thuli-Mazhaiyaai-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Thuli-Thuli-Mazhaiyaai-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Thuli-Thuli-Mazhaiyaai-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Thuli-Thuli-Mazhaiyaai-Song.mp3")
        },  
        lyrics: "lyrics/Thuli-Thuli-Mazhaiyaai.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 55,
        title: "Ennamo Yeadho",
        artist: "Ko",
        image: getFirebaseUrl("images/Ko.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennamo-Yeadho-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Ennamo-Yeadho-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Ennamo-Yeadho-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Ennamo-Yeadho-Song.mp3")
        },  
        lyrics: "lyrics/Ennamo-Yeadho.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 54,
        title: "Manjal Veiyil",
        artist: "Vettaiyadu Vilaiyadu",
        image: getFirebaseUrl("images/VettaiyaduVilaiyadu.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Manjal-Veiyil-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Manjal-Veiyil-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Manjal-Veiyil-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Manjal-Veiyil-Song.mp3")
        },  
        lyrics: "lyrics/Manjal-Veiyil.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 53,
        title: "Engeyo Paartha Mayakkam",
        artist: "Yaaradi Nee Mohini",
        image: getFirebaseUrl("images/YaaradiNeeMohini.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Engeyo-Paartha-Mayakkam-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Engeyo-Paartha-Mayakkam-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Engeyo-Paartha-Mayakkam-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Engeyo-Paartha-Mayakkam-Song.mp3")
        },  
        lyrics: "lyrics/Engeyo-Paartha-Mayakkam.txt",
        availableTypes: ["male", "song", "podcast"],
    },     
{ 
        id: 52,
        title: "Venmegam Pennaga",
        artist: "Yaaradi Nee Mohini",
        image: getFirebaseUrl("images/YaaradiNeeMohini.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Venmegam-Pennaga-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Venmegam-Pennaga-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Venmegam-Pennaga-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Venmegam-Pennaga-Song.mp3")
        },  
        lyrics: "lyrics/Venmegam-Pennaga.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 51,
        title: "Idhu Varai Illadha",
        artist: "Goa",
        image: getFirebaseUrl("images/Goa.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Idhu-Varai-Illadha-Male.mp3"),
            female: getFirebaseUrl("songs/female/Idhu-Varai-Illadha-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Idhu-Varai-Illadha-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Idhu-Varai-Illadha-Song.mp3")
        },  
        lyrics: "lyrics/Idhu-Varai-Illadha.txt",
        availableTypes: ["male", "female", "dute", "song", "podcast"],
    }, 
{ 
        id: 50,
        title: "Munbe Vaa",
        artist: "Vaaranam Aayiram",
        image: getFirebaseUrl("images/VaaranamAayiram.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Munbe-Vaa-Male.mp3"),
            female: getFirebaseUrl("songs/female/Munbe-Va-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Munbe-Vaa-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Munbe-Vaa-Song.mp3")
        },  
        lyrics: "lyrics/Lajjavathiye.txt",
        availableTypes: ["female", "song", "podcast"],
    },     
{ 
        id: 49,
        title: "Nee Paartha Vizhigal",
        artist: "Moonu",
        image: getFirebaseUrl("images/Moonu.jpg"),
        audio: {
            //male: getFirebaseUrl("songs/male/Nee-Paartha-Vizhigal-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Nee-Paartha-Vizhigal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Nee-Paartha-Vizhigal-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Nee-Paartha-Vizhigal-Song.mp3")
        },  
        lyrics: "lyrics/Nee-Paartha-Vizhigal.txt",
        availableTypes: ["dute", "song", "podcast"],
    }, 
{ 
        id: 48,
        title: "Azhagiye Marry Me",
        artist: "Kaatru Veliyidai",
        image: getFirebaseUrl("images/KaatruVeliyidai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Azhagiye-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Azhagiye-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Azhagiye-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Azhagiye-Song.mp3")
        },  
        lyrics: "lyrics/Azhagiye.txt",
        availableTypes: ["male", "song", "podcast"],
    }, 
{ 
        id: 47,
        title: "Mudhal Mazhai",
        artist: "Bheema",
        image: getFirebaseUrl("images/Bheema.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Mudhal-Mazhai-Male.mp3"),
            female: getFirebaseUrl("songs/Mudhal-Mazhai-Vizhigal-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Mudhal-Mazhai-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Mudhal-Mazhai-Song.mp3")
        },  
        lyrics: "lyrics/Mudhal-Mazhai.txt",
        availableTypes: ["male", "female", "dute", "song", "podcast"],
    }, 
{ 
        id: 46,
        title: "Thean Thean Thean",
        artist: "Kuruvi",
        image: getFirebaseUrl("images/Kuruvi.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Thean-Thean-Thean-Male.mp3"),
            female: getFirebaseUrl("songs/female/Thean-Thean-Thean-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Thean-Thean-Thean-Dute.mp3"),
            song: getFirebaseUrl("songs/song/Thean-Thean-Thean-Song.mp3")
        },  
        lyrics: "lyrics/Thean-Thean-Thean.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    }, 
{ 
        id: 45,
        title: "Anal Mele Panithuli",
        artist: "Vaaranam Aayiram",
        image: getFirebaseUrl("images/Vaaranam-Aayiram.jpg"),
        audio: {
           //male: getFirebaseUrl("songs/male/Anal-Mele-Male.mp3"),
            female: getFirebaseUrl("songs/female/Anal-Mele-Kadaloram-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Anal-Mele-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Anal-Mele-Song.mp3")
        },  
        lyrics: "lyrics/Anal-Mele.txt",
        availableTypes: ["female", "song", "podcast"],
    },
{ 
        id: 44,
        title: "Naani Koni",
        artist: "Maattrraan",
        image: getFirebaseUrl("images/Maattrraan.jpg"),
        audio: {
           //male: getFirebaseUrl("songs/male/Naani-Koni-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Naani-Koni-Kadaloram-Female.mp3"),
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
        image: getFirebaseUrl("images/Ko.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Amali-Thumali-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Amali-Thumali-Kadaloram-Female.mp3"),
            //duet: getFirebaseUrl("songs/duet/Amali-Thumali-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Amali-Thumali-Song.mp3")
        },  
        lyrics: "lyrics/Amali-Thumali.txt",
        availableTypes: ["male", "female", "duet", "song", "podcast"],
    },
{ 
        id: 42,
        title: "Andha Arabi Kadaloram",
        artist: "Bombay",
        image: getFirebaseUrl("images/Bombay.jpg"),
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
        image: getFirebaseUrl("images/Ghajini.jpg"),
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
        image: getFirebaseUrl("images/KakkaKakka.jpg"),
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
        title: "Pathinettu-Vayathu",
        artist: "Suriyan",
        image: getFirebaseUrl("images/Suriyan.jpg"),
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
        image: getFirebaseUrl("images/UyarndhaUllam.jpg"),
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
        image: getFirebaseUrl("images/AvalOruThodarKathai.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Dheivam-Thantha-Veedu-Male.mp3"),
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
        image: getFirebaseUrl("images/Panchalankurichi.jpg"),
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
        image: getFirebaseUrl("images/Mugamoodi.jpg"),
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
        image: getFirebaseUrl("images/Azhagi.jpg"),
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
        image: getFirebaseUrl("images/Uyire.jpg"),
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
        image: getFirebaseUrl("images/4Students.jpg"),
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
        title: "Manmadhane-Nee",
        artist: "Manmadhan",
        image: getFirebaseUrl("images/Manmadhan.jpg"),
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
        image: getFirebaseUrl("images/Saguni.jpg"),
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
        image: getFirebaseUrl("images/PuthuPuthuArthangal.jpg"),
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
        image: getFirebaseUrl("images/IlamaiKaalangal.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Paada-Vandhadhor-Gaanam-Male.mp3"),
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
        image: getFirebaseUrl("images/AduthaVarisu.jpg"),
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
        image: getFirebaseUrl("images/ManidharilIthanaiNirangala.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Mazhai-Tharumo-En-Megam-Male.mp3"),
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
        image: getFirebaseUrl("images/KadhalukkuMariyadhai.jpg"),
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
        image: getFirebaseUrl("images/NinaithenVanthai.jpg"),
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
        image: getFirebaseUrl("images/EnManaVaanil.jpg"),
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
        image: getFirebaseUrl("images/Valli.jpg"),
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
        image: getFirebaseUrl("images/KakkaKakka.jpg"),
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
        image: getFirebaseUrl("images/ThullathaManamumThullum.jpg"),
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
        image: getFirebaseUrl("images/UdhayaGeetham.jpg"),
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
        title: "Thuli-Thuliyai-Kottum",
        artist: "Paarvai Ondre Pothume",
        image: getFirebaseUrl("images/PaarvaiOndrePothume.jpg"),
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
        image: getFirebaseUrl("images/MrBharath.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Ennamma-Kannu-Sawkiyama-Male.mp3"),
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
        image: getFirebaseUrl("images/Jayam.jpg"),
        audio: {
            male: getFirebaseUrl("songs/male/Kavithayae-Theriyuma-Male.mp3"),
            //female: getFirebaseUrl("songs/female/Kavithayae-Theriyuma-Female.mp3"),
            duet: getFirebaseUrl("songs/duet/Kavidhaye-Theriyuma-Duet.mp3"),
            song: getFirebaseUrl("songs/song/Kavithayae-Theriyuma-Song.mp3")
        },  
        lyrics: "lyrics/Kavidhaye-Theriyma.txt",
        availableTypes: ["male", "duet", "song", "podcast"],
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
    },
	
];

songs.forEach(song => {
    song.currentType = "male"; // Default type, will be updated by script.js
    song.active = false; // Will be set by script.js based on current selection
});
