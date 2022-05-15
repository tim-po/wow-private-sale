import React from 'react';

const LocaleContext = React.createContext({ localized: (strings: any)=>{return ''}, setLocale: (newLocale: string)=>{}, locale: 'en' });

export default LocaleContext;
