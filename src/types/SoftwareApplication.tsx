import Feature from "./Feature";
import ProgrammingLanguage from "./ProgrammingLanguage";
import OperatingSystem from "./OperatingSystem";
// import Device from "./Device";

interface SoftwareApplication {
  id: string,
  name: string;
  url: string | undefined;
  features: Feature[] | undefined;
  operatingSystem: OperatingSystem[] | undefined
  // availableOnDevice: Device[] | undefined;
  // programmingLanguages: ProgrammingLanguage[] | undefined;
}

export default SoftwareApplication;
