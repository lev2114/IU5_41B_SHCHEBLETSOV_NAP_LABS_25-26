class ArtworkUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getArtworks() {
        return `${this.baseUrl}/artworks`;
    }

    getArtworkById(id) {
        return `${this.baseUrl}/artworks/${id}`;
    }

    createArtwork() {
        return `${this.baseUrl}/artworks`;
    }

    updateArtworkById(id) {
        return `${this.baseUrl}/artworks/${id}`;
    }

    removeArtworkById(id) {
        return `${this.baseUrl}/artworks/${id}`;
    }

    getArtworksByTitle(title) {
        return `${this.baseUrl}/artworks?title=${title}`
    }
}

export const artworkUrls = new ArtworkUrls();
