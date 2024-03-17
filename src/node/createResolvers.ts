export default function ({ createResolvers }) {
  createResolvers({
    Legislator: {
      cosponsored_bills: {
        type: ["Bill"],
        resolve: async (leg, args, context, info) => {
          const { entries: bills } = await context.nodeModel.findAll({
            query: {
              filter: { co_sponsors: { elemMatch: { id: { eq: leg.id } } } },
            },
            type: "Bill",
          });
          return bills;
        },
      },
      committees: {
        type: ["LegislatorCommittee"],
        resolve: async (leg, args, context, info) => {
          const comWhereHouseChair = await context.nodeModel.runQuery({
            query: {
              filter: { house_chair: { id: { eq: leg.id } } },
            },
            type: "Committee",
          });

          const comWhereSenateChair = await context.nodeModel.runQuery({
            query: {
              filter: { senate_chair: { id: { eq: leg.id } } },
            },
            type: "Committee",
          });

          const comWhereHouseViceChair = await context.nodeModel.runQuery({
            query: {
              filter: { house_vice_chair: { id: { eq: leg.id } } },
            },
            type: "Committee",
          });

          const comWhereSenateViceChair = await context.nodeModel.runQuery({
            query: {
              filter: { senate_vice_chair: { id: { eq: leg.id } } },
            },
            type: "Committee",
          });

          const comWhereHouseMember = await context.nodeModel.runQuery({
            query: {
              filter: { house_members: { elemMatch: { id: { eq: leg.id } } } },
            },
            type: "Committee",
          });

          const comWhereSenateMember = await context.nodeModel.runQuery({
            query: {
              filter: { senate_members: { elemMatch: { id: { eq: leg.id } } } },
            },
            type: "Committee",
          });

          return [
            ...[...comWhereHouseChair, ...comWhereSenateChair].map((committee) => ({
              committee: committee.id,
              role: "Chair" as const,
            })),
            ...[...comWhereHouseViceChair, ...comWhereSenateViceChair].map((committee) => ({
              committee: committee.id,
              role: "Vice-chair" as const,
            })),
            ...[...comWhereHouseMember, ...comWhereSenateMember].map((committee) => ({
              committee: committee.id,
              role: "Member" as const,
            })),
          ];
        },
      },
    },
    Issue: {
      bills: {
        type: ["Bill"],
        resolve: async (issue, args, context, info) => {
          const { entries: bills } = await context.nodeModel.findAll({
            query: {
              filter: { issue: { id: { eq: issue.id } } },
            },
            type: "Bill",
          });
          return bills;
        },
      },
    },
    TeamMember: {
      body: {
        type: "String",
        resolve: async (member, args, context, info) => {
          const mdx = await context.nodeModel.getNodeById({
            id: member.parent,
            type: "Mdx",
          });
          const mdxType = info.schema.getType("Mdx");
          const resolver = mdxType.getFields()["body"].resolve;
          const body = await resolver(mdx, args, context, {
            fieldName: "body",
          });
          return body;
        },
      },
    },
  });
}
