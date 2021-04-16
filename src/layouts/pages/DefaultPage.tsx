import React from "react";
import { PageProps } from "gatsby";

import { BreadCrum } from "../../components";
import BaseLayout from "../BaseLayout";

import "./default.scss";

export default function DefaultPage({ pageContext }: PageProps<{}, { content: string }>) {
  return (
    <BaseLayout>
      <main className="default-page cbox light-blue">
        <div className="w1400">
          <BreadCrum title="" links={[]} />
        </div>
        <div className="w1200 cbox">
          <div
            className="w1000 content"
            dangerouslySetInnerHTML={{ __html: pageContext.content }}
          />
        </div>
      </main>
    </BaseLayout>
  );
}
