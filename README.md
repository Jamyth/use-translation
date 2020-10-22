# React -- use-translation

A Language Translation for [React](https://reactjs.com).

Feature Includes:

- A Simple but Powerful Translate what just a single function call
- Support [TypeScript](https://www.typescriptlang.org/) with complete definition file
- Easy to write your own Translations for multi-languages
- Easy to attach to any React Components
- Support Font toggling

# Installation and Usage

The easiest way to use use-translation

```
npm install --save use-translation
// or
yarn add use-translation
```

#### Create your Translation File

```
const TRANSLATION = {
  // language,
  en: {
    //key: value
    hello_world: 'Hello World'
  },
  zh: {
    hello_world: '你好, 世界'
  }
}
```

Then use it in your app:

#### Add Your Font File

We only accept className as value;

```
const FONT = {
  // key: className
  en: 'roboto',
  zh: 'sans-serif'
}
```

### Add Your Font Class in CSS / SASS / LESS / more

```
.roboto {
  font-family: roboto, sans-serif !important;
}

.sans-serif {
  font-family: sans-serif !important;
}
```

#### At your root component:

```
import React from 'react';
import { TranslationProvider, useTranslate } from 'use-translation';

import TRANSLATION from 'translation/file';

import FONTS from 'translation/font';
import './path/to/font/css/file.scss/.less/.css';

export const MyApp = () => {
  return (
    <TranslationProvider fonts={FONTS} translation={TRANSLATION}>
      <App />
    </TranslationProvider>
  )
}

const App = () => {
  const { changeLanguage, translate, language } = useTranslate();

  const handleClick = () => {
    if(language === 'zh') {
      setLanguage('en');
      return;
    }

    setLanguage('zh');
    return;
  }

  return (
    <>
      <h1>
        Current Language: {language}
      </h1>

      <button onClick={handleClick}>Toggle Language</button>

      <h2>My First Translation</h2>
      <p>{translate('hello_world')}</p>
    </>
  )
}

```

# Props

TranslationProvider:

- `translation` - Object that contains translation of different language
- `initialLanguage` - String that will be set when the Provider mount

# Methods

- `useTranslate()` - returns current language, set language function and translate function
- `changeLanguage()` - accepts string as parameter and change the current language
- `translate()` - accepts string as key to look for value in `translation` props passed to `TranslationProvider` Component

# License

MIT licensed. Copyright (c) Jamyth Luk 2020.
