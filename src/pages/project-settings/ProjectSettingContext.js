import { createContext } from "react";

export const ProjectSettingContext = createContext();

const ProejctSettingProvider = ({ children }) => {
  const value = {};

  return (
    <ProjectSettingContext.Provider value={value}>
      {children}
    </ProjectSettingContext.Provider>
  );
};

export default ProejctSettingProvider;
