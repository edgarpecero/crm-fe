'use-client';

import { PropsWithChildren } from "react";

const ClientLayout = (props: PropsWithChildren) => {
  return (
    <div>
      <h1>Client Layout</h1>
      {props.children}  
    </div>
  );
}