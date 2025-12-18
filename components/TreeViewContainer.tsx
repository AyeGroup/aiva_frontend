"use client";
import { useState } from "react";
import TreeNode from "./TreeNode";
import { TreeNodeType } from "@/types/common";

  type Props = {
    data: TreeNodeType[];
    checkedMap: Record<string, boolean>;
    onToggle: (id: string, checked: boolean) => void;
  };


  export default function TreeViewContainer({
    data,
    checkedMap,
    onToggle,
  }: Props) {
  // const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // const handleToggle = (id: string, checked: boolean) => {
  //   setCheckedMap((prev) => ({
  //     ...prev,
  //     [id]: checked,
  //   }));
  // };



    return (
      <div className="rounded-lg p-3">
        <ul>
          {data.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              checkedMap={checkedMap}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    );
  }

 
