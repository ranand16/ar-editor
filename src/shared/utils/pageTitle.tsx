import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface PageTitleprops {
  title: string;
}

const PageTitle: FunctionComponent<PageTitleprops> = ({
  title,
}: PageTitleprops) => (
  <Helmet>
    <title>AR Editor {title ? `- ${title}` : ``}</title>
  </Helmet>
);

export { PageTitle };
