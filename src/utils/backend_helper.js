// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
import { getCache, setCache, clearOldCache } from '../helpers/indexedDBHelper';
import * as url from "./url_helper";

const DELAY = 300;
const CACHE_TIME = 7 * 24 * 60 * 60 * 1000;
let status = "31st December";


const cacheFetch = async (url) => {
    const cached = await getCache(url);
    if (cached) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(cached);
        }, DELAY);
      });
    }

    return fetch(url)
    .then((r) => r.json())
    .then(async (json) => {
      if (!json.error) {
        await setCache(url, json);
        return json;
      } else {
        throw new Error('Error fetching data');
      }
    });
};

const getRequestConfig = (username, year, project) => {
  return {
    leend: `${parseInt(year) - 1}-12-31T23:59:59.000Z`,
    lestart: `${parseInt(year) + 1}-01-01T00:00:00.000Z`,
    maxage: CACHE_TIME,
    smaxage: CACHE_TIME,
    lelimit: 500,
    origin: "*",
    action: "query",
    format: "json",
    formatversion: 2,
    list: "logevents",
    letype: "thanks",
    ...(project ? { letitle: `User:${username}` } : { leuser: username }),
  };
};

const getApiUrl = (project) => `https://${project}/w/api.php`;

const continueFetch = async (url, params, list) => {
  const q = new URLSearchParams(params).toString();
  let result = [];
  const r = await cacheFetch(`${url}?${q}`);
    result = result.concat((r.query[list] || []).filter((r) => r));
    const c = result[result.length - 1];
    if (c) {
      const d = toDate(c.timestamp);
      const day = d.getDate();
      const suffix = getDateSuffix(day);
      status = `${day}${suffix} ${toReadableMonth(c.timestamp)}`;
    }
    if (r.continue) {
      Object.keys(r.continue).forEach((key) => {
        params[key] = r.continue[key];
      });
      const nextResult = await continueFetch(url, params, list);
    result = result.concat(nextResult).filter((r) => r);
  }
  return result;
};

const toDate = (timestamp) => {
  return new Date(timestamp);
};

const getDateSuffix = (day) => {
  if (day === 1) {
    return "st";
  } else if (day === 2) {
    return "nd";
  } else if (day === 3) {
    return "rd";
  } else {
    return "th";
  }
};

const toReadableMonth = (timestamp) => {
  const date = toDate(timestamp);
  const m = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m]}`;
};

const thanksSummary = async (username, year, project) => {
  try {
    const response = await continueFetch(
      getApiUrl(project),
      getRequestConfig(username, year, project),
      "logevents"
    );
    return {
      topThanksFrom: topArticles(response, "user"),
      thankedCount: response.length,
    };
  } catch (error) {
    console.error("Error fetching thanks summary:", error);
    return null;
  }
};


const topArticles = (articles, field = "title") => {
  const titles = {};
  articles.forEach((t) => {
    if (titles[t[field]] === undefined) {
      titles[t[field]] = 0;
    }
    titles[t[field]]++;
  });
  return Object.keys(titles)
    .map((title) => ({ [field]: title, count: titles[title] }))
    .sort((a, b) => (a.count > b.count ? -1 : 1));
};


const addThumbs = (titles) => {
  return Promise.all(
    titles.map((t) =>
      fetch(`${url.PAGE_SUMMARY}${encodeURIComponent(t)}`)
        .then((r) => r.json())
        .then((p) => p.thumbnail)
    )
  );
};

const summarize = (contribs) => {
  const articles = contribs.filter((c) => c && c.ns === 0);
  const top = topArticles(articles);
  const dayofweek = contribs
    .filter((c) => c)
    .map((c) => {
      const t = new Date(c.timestamp);
      return {
        day: t.getDay(),
      };
    });
  const totalBytes = contribs.reduce((a, c) => {
    let s = c.sizediff || 0;
    if (s < 0) {
      s = -s;
    }
    return a + s;
  }, 0);
  const top5 = top.slice(0, 5);
  return addThumbs(top5.map((t) => t.title)).then((thumbs) => {
    return {
      thumbs,
      totalBytes,
      paragraphs: parseInt(totalBytes / 1000, 10),
      dayofweek: topArticles(dayofweek, "day"),
      top5,
      articlesNumber: top.length,
      totalEdits: contribs.length,
      articleEdits: articles.length,
      talkEdits: contribs.filter((c) => c && c.ns % 2 !== 0).length,
    };
  });
};

const yir = async (username, year, project) => {
  if (
    !project.match(
      /[^\.]*\.(wikivoyage|wikinews|wikiversity|wikibooks|wikiquote|wiktionary|wikifunctions|wikisource|wikipedia|mediawiki|wikidata|wikimedia)\.org/
    ) ||
    !username.match(/^[^:]*$/)
  ) {
    return Promise.reject();
  }
  const cacheKey = `${username}:${year}:${project}`;
  const cachedSummary = await getCache(cacheKey);
  if (cachedSummary) {
    return Promise.resolve(cachedSummary);
  }

  const [thanks, summary] = await Promise.all([
    thanksSummary(username, year, project),
    continueFetch(
      getApiUrl(project),
      {
        ucend: `${parseInt(year) - 1}-12-31T23:59:59.000Z`,
        ucstart: `${parseInt(year) + 1}-01-01T00:00:00.000Z`,
        uclimit: 500,
        origin: "*",
        action: "query",
        format: "json",
        formatversion: 2,
        list: "usercontribs",
        formatversion: 2,
        ucuser: username,
        ucprop: "title|timestamp|sizediff",
      },
      "usercontribs"
    ).then((r) => summarize(r)),
  ]);

  const summaryData = { thanks, thanked, summary };
  await setCache(cacheKey, summaryData);
  return summaryData;
};

yir.getStatus = () => status;
export default yir;
