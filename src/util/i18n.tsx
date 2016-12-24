
import {init, TranslationFunction} from 'i18next';

export const initialize = (language: string) => {

  return new Promise<TranslationFunction>((resolve, reject) => {
    init({
      lng: language,
      resources: {
        en: {
          translation: {
            hello: 'Hello',
            unknown_error: 'An unknown error has occured',
            login_page: {
              error: {
                invalid_credentials: 'The username or password is incorrect',
                unknown_error: 'An unknown error has occured'
              }
            }
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
