// Pripojenie k Supabase
const supabaseUrl = 'https://ryuwqjgtdcggsmvgaxmx.supabase.co'; // tvoj Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5dXdxamd0ZGNnZ3NtdmdheG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDkxOTgsImV4cCI6MjA1NTM4NTE5OH0.dpT2HKNsnDVeQPLhBeRjoJpNgLCzjNgvdFs8ab48JEQ'; // tvoj API kľúč
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Získanie formulára a zoznamu videí
const addLinkForm = document.getElementById('addLinkForm');
const videoList = document.getElementById('videoList');

// Načítanie videí zo Supabase
async function loadVideos() {
    const { data: videos, error } = await supabase
        .from('youtube_links')
        .select('*');

    if (error) {
        console.error('Chyba pri načítaní videí:', error);
        return;
    }

    videoList.innerHTML = '';  // Vyčisti zoznam pred pridaním
    videos.forEach((video) => {
        const listItem = document.createElement('li');
        listItem.textContent = video.link;
        videoList.appendChild(listItem);
    });
}

// Pridanie odkazu na YouTube do databázy
addLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const youtubeLink = document.getElementById('youtubeLink').value;

    if (youtubeLink) {
        const { data, error } = await supabase
            .from('youtube_links')
            .insert([
                { link: youtubeLink }
            ]);

        if (error) {
            console.error('Chyba pri pridaní videa:', error);
            return;
        }

        // Vyčistenie formulára po pridaní
        document.getElementById('youtubeLink').value = '';
        loadVideos(); // Načítaj videá znova
    }
});

// Načítanie videí pri načítaní stránky
loadVideos();
