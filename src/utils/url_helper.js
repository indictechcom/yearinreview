import { WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE } from "../helpers/consts";

export const PAGE_SUMMARY =
  "https://en.wikipedia.org/api/rest_v1/page/summary/";

export const isLanguageSupportedProject = (project) => {
  return WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE.some(
    (p) => p.value === project
  );
};
