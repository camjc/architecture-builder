import ArchitectureData from "../../types/ArchitectureData";
import compact from "lodash/fp/compact";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import SoftwareApplication from "../../types/SoftwareApplication";
import { Duration } from "luxon";

const objectsToNames = (
  SoftwareApplication: SoftwareApplication,
  key: string
): string | undefined => map("name", get(key, SoftwareApplication)).join(", ");

const mapGraphQlForConsumption = (graphQlData: ArchitectureData) => ({
  edges: map(
    sendAction => ({
      minutesBetweenData: Duration.fromISO(sendAction.duration).as('minutes'),
      from: sendAction.fromLocation._id,
      to: sendAction.toLocation._id
    }),
    graphQlData.allSendActions
  ),
  nodes: map(
    (softwareApplication: SoftwareApplication) => ({
      id: softwareApplication.id,
      name: softwareApplication.name,
      url: softwareApplication.url,
      description: compact([
        objectsToNames(softwareApplication, "features"),
        softwareApplication.name,
        // objectsToNames(SoftwareApplication, "programmingLanguages"),
        objectsToNames(softwareApplication, "operatingSystem"),
        objectsToNames(softwareApplication, "availableOnDevice")
      ]).join("|")
    }),
    graphQlData.allSoftwareApplications
  )
});

export default mapGraphQlForConsumption;
