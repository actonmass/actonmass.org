import {
  bills,
  billEvents,
  blog,
  issues,
  committees,
  districts,
  legislators,
  otherData,
  pages,
} from "./collections";

export default {
  backend: {
    name: "git-gateway",
    branch: "next",
    // publish_mode: editorial_workflow // Deactivate on next since we are still collection data and don't want to go through a PR for each change
  },
  local_backend: true,
  media_folder: "static/img",
  collections: [
    blog,
    pages,
    issues,
    legislators,
    districts,
    committees,
    bills,
    billEvents,
    otherData,
  ],
};
