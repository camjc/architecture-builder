import ArchitectureData from "../types/ArchitectureData";
import compact from "lodash/fp/compact";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import omitBy from "lodash/fp/omitBy";
import isEmpty from "lodash/fp/isEmpty";
import SoftwareApplication from "../types/SoftwareApplication";
import { Duration } from "luxon";

const objectsToNames = (
  SoftwareApplication: SoftwareApplication,
  key: string
): string => compact(map("name", get(key, SoftwareApplication))).join(", ");

const mapGraphQlForConsumption = (graphQlData: ArchitectureData) => ({
  edges: map(
    sendAction => ({
      minutesBetweenData: Duration.fromISO(sendAction.duration).as("minutes"),
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
      descriptionItems:
        omitBy(isEmpty, {
          featureList: objectsToNames(softwareApplication, "featureList"),
          description: softwareApplication.description,
          identifier: softwareApplication.identifier,
          author: get("author.name", softwareApplication),
          programmingLanguages: objectsToNames(
            softwareApplication,
            "programmingLanguages"
          ),
          operatingSystems: objectsToNames(
            softwareApplication,
            "operatingSystems"
          ),
          availableOnDevice: get("availableOnDevice.name", softwareApplication)
        })
    }),
    graphQlData.allSoftwareApplications
  )
});

export default mapGraphQlForConsumption;
