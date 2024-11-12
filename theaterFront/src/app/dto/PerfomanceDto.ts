export interface PerformanceDTO {
    performance_title: string; // Naslov predstave
    performance_description: string; // Opis predstave
    performance_date: Date; // Datum predstave
    hallId: number; // ID sale u kojoj se predstava održava
    revenue?: number; // Prihodi od predstave (ako je relevantno)
    created_at?: Date; // Datum kreiranja (ako je relevantno)
    updated_at?: Date | undefined; // Datum poslednje izmene (ako je relevantno)
    poster_image?: string; // Poster predstave (može biti byte[] ili string URL)
    director?: string; // Ime reditelja
    adaptation?: string; // Adaptacija predstave
    dramaturg?: string; // Dramaturg predstave
    scenographer?: string; // Scenograf predstave
    costumeDesigner?: string; // Kostimograf predstave
    music?: string; // Muzika predstave
    stageSpeech?: string; // Govor na sceni
    stageManager?: string; // Scenski menadžer
    actors?: number[]; // Imena glumaca (može biti lista ili string)
}