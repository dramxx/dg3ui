import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TreeView } from './TreeView';
import { treeData } from "./TreeViewMock";


storiesOf("TreeView", module)
  .add("TreeView", () => <TreeView data={treeData} />);
