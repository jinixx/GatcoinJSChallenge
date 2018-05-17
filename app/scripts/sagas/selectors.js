import { createSelector } from 'reselect';

export const getPopularData = (state) => state.popularVideos.entries.data;

export const getSeries = createSelector(
  [getPopularData],
  (entries) => {
    const filtered = entries.filter(entry => entry.programType === 'series' && entry.releaseYear >= 2010);
    filtered.sort((a, b) => {
      const word1 = a.title.toLocaleLowerCase();
      const word2 = b.title.toLocaleLowerCase();
      return word1 > word2 ? 1 : word1 < word2 ? -1 : 0;
    });
    return filtered;
  }
);

export const getMovie = createSelector(
  [getPopularData],
  (entries) => {
    const filtered = entries.filter(entry => entry.programType === 'movie' && entry.releaseYear >= 2010);
    filtered.sort((a, b) => {
      const word1 = a.title.toLocaleLowerCase();
      const word2 = b.title.toLocaleLowerCase();
      return word1 > word2 ? 1 : word1 < word2 ? -1 : 0;
    });
    return filtered;
  }
);
