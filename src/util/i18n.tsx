
import {init, TranslationFunction} from 'i18next';
import {Promise} from 'ts-promise';

export const initialize = (language: string) => {

  return new Promise<TranslationFunction>((resolve, reject) => {
    init({
      lng: language,
      resources: {
        en: {
          translation: {
            hello: 'Hello'
          }
        },
        'en-CA': {
          translation: {
            colour: 'Colour'
          }
        },
        'en-US': {
          translation: {
            colour: 'Color'
          }
        }
      }
    } as any,
    (err: any, t: TranslationFunction) => {

      if (err) {
        reject(err);
      }
      else {
        resolve(t);
      }

    });
  });

};
