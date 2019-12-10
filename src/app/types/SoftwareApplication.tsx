import Feature from "./Feature";
import ProgrammingLanguage from "./ProgrammingLanguage";
import OperatingSystem from "./OperatingSystem";
import Device from "./Device";

interface SoftwareApplication {
  id: string,
  name: string;
  alternateName: string;
  description: string;
  identifier: string;
  author: {name: string};
  url: string | undefined;
  featureList: Feature[] | undefined;
  operatingSystems: OperatingSystem[] | undefined
  availableOnDevice: Device[] | undefined;
  programmingLanguages: ProgrammingLanguage[] | undefined;
}

export default SoftwareApplication;
