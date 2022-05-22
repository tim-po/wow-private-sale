/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React from "react";

import StandardAppContainer from "./Standard/StandardAppContainer";

export const App = () => {
  return (
      <StandardAppContainer forcedLocale={'ru'}>
          Put your content here
          {/* TODO: add your application content here*/}
      </StandardAppContainer>
  );
};
