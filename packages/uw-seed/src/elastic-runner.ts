import EsClient from "./elastic"

class Runner {
  public static async main() {
    await EsClient.bulkInsert()
  }
}

Runner.main()
