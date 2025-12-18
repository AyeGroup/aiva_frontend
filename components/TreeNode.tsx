"use client";
import { TreeMinus, TreePlus } from "@/public/icons/dashboard";
import { TreeNodeType } from "@/types/common";
import { useEffect, useRef, useState } from "react";

type Props = {
  node: TreeNodeType;
  checkedMap: Record<string, boolean>;
  onToggle: (id: string, checked: boolean) => void;
};

export default function TreeNode({ node, checkedMap, onToggle }: Props) {
  const [open, setOpen] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const isChecked = !!checkedMap[node.id];
  const hasChildren = node.children.length > 0;

  // حالت نیمه انتخاب (indeterminate)
  useEffect(() => {
    if (!checkboxRef.current || !hasChildren) return;

    const checkedChildren = node.children.filter(
      (c) => checkedMap[c.id]
    ).length;

    checkboxRef.current.indeterminate =
      checkedChildren > 0 && checkedChildren < node.children.length;
  }, [checkedMap, node.children, hasChildren]);

  // اعمال انتخاب به صورت بازگشتی
  const handleRecursiveToggle = (node: TreeNodeType, checked: boolean) => {
    onToggle(node.id, checked);
    node.children.forEach((child) => handleRecursiveToggle(child, checked));
  };

  const handleChange = (checked: boolean) => {
    handleRecursiveToggle(node, checked);
  };

  return (
    <li className="select-none">
      <div className="flex items-center gap-2 py-1">
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="w-5 text-center">
            {open ? (
              <div className="w-5 h-5 text-primary">
                <TreeMinus />
              </div>
            ) : (
              <div className="w-5 h-5 text-secondary">
                <TreePlus />
              </div>
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}

        <input
          ref={checkboxRef}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
        />

        {node.url ? (
          <a
            href={node.url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex flex-col"
          >
            <span className="text-gray-800 ml-2 font-medium">{node.title}</span>
            <span className="text-gray-500 text-sm">{decodeURI(node.url)}</span>
          </a>
        ) : (
          <span className="font-medium">{node.title}</span>
        )}
      </div>

      {open && hasChildren && (
        <ul className="pr-6">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              checkedMap={checkedMap}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
