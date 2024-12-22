import { getData } from "./getData";
const axios = require("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getData", () => {
  let response: any;
  beforeAll(() => {
    response = {
      data: [
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        },
        {
          "userId": 1,
          "id": 3,
          "title": "fugiat veniam minus",
          "completed": false
        },
      ]
    }
  })
  test('axios.get call', async () => {
    mockedAxios.get.mockReturnValue(response)
    const data = await getData();
    expect(mockedAxios.get).toBeCalledTimes(1)
    expect(data.slice(0, 3)).toBe([
      "delectus aut autem", 
      "quis ut nam facilis et officia qui", 
      "fugiat veniam minus"
    ])
  })
})