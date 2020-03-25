# covid19-mohfw

Free, public API for COVID-19 cases in India, updated directly from MOHFW website. The API has a single endpoint i.e.,
[https://covid19-mohfw.herokuapp.com/](https://covid19-mohfw.herokuapp.com/) which gives state-wise details about
coronavirus cases in India, scraped from the **homepage** of
[Ministry of Health & Family Welfare](https://www.mohfw.gov.in/).

The API is built on [Node.js](https://nodejs.org/en/) using [Koa](https://github.com/koajs/koa),
[axios](https://github.com/axios/axios), [cheerio](https://github.com/cheeriojs/cheerio) and
[LevelDB](https://github.com/Level/level). The API database is updated automatically every 15 minutes.

## Running Locally

To run the API server locally, I assume you have [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/)
installed on your machine. Then you can clone this project and execute below command in project directory:

```shell script
yarn && npm start
```

The API will then be accessible on port `3000` e.g., [http://localhost:3000](http://localhost:3000).

---

Created by [Vaibhav Pandey](https://vaibhavpandey.com/). I hope everybody is safe staying home and we end this deadly
outbreak together by co-operating our government in following issued guidelines.
