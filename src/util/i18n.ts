
import {init, TranslationFunction} from 'i18next';

export {TranslationFunction};

export let translationFunction: TranslationFunction = null;

export const initializeTranslationData = async (language: string) => {

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
            },
            web_socket_connection: {
              error: 'An error occured connecting to the server',
              slow: 'The connection to the server is slow',
              reconnecting: 'Reconnecting to the server',
              disconnected: 'Cannot connect to the server',
              connected: 'Connected to the server'
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
        translationFunction = t;
        resolve(t);
      }

    });
  });

};
