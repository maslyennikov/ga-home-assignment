class GameService {
  private static instance?: GameService;

  static getInstance(): GameService {
    if (!this.instance) {
      this.instance = new GameService();
    }

    return this.instance;
  }

  public getGames() {
    const fetchGames = async () => {
      const response = await fetch("/api/games");
      return await response.json();
    };

    return fetchGames().catch(console.warn);
  }

  public getRates() {}
}

export default GameService;
