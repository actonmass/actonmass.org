import {
  billEvents,
  bills,
  blog,
  committees,
  districts,
  issues,
  legislators,
  news,
  otherData,
  pages,
  teamMembers,
} from "./collections";

export default {
  backend: {
    name: "git-gateway",
    branch: "nkleinmann-campaign-page", // TODO: Switch back to main once the branch is ready to merge
    // branch: "main",
    // publish_mode: editorial_workflow // Deactivate on next since we are still collection data and don't want to go through a PR for each change
  },
  local_backend: true,
  media_folder: "/static/img",
  public_folder: "/img",
  collections: [
    blog,
    pages,
    issues,
    legislators,
    districts,
    committees,
    bills,
    billEvents,
    teamMembers,
    news,
    otherData,
  ],
};
