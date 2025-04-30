import React, { useState } from "react";
const checkboxData = [
  {
    id: 1,
    name: "Option 1",
    children: [
      { id: 4, name: "Sub-option 1.1" },
      { id: 5, name: "Sub-option 1.2" },
    ],
  },
  {
    id: 2,
    name: "Option 2",
    children: [
      { id: 6, name: "Sub-option 2.1" },
      { id: 7, name: "Sub-option 2.2" },
    ],
  },
  {
    id: 3,
    name: "Option 3",
    children: [
      { id: 8, name: "Sub-option 3.1" },
      { id: 9, name: "Sub-option 3.2" },
    ],
  },
  {
    id: 10,
    name: "Option 4",
    children: [
      { id: 11, name: "Sub-option 4.1" },
      { id: 12, name: "Sub-option 4.2" },
    ],
  },
  { id: 13, name: "Option 5" },
  {
    id: 14,
    name: "Option 6",
    children: [
      {
        id: 15,
        name: "Sub-option 6.1",
        children: [
          { id: 16, name: "Sub-option 6.1.1" },
          { id: 17, name: "Sub-option 6.1.2" },
        ],
      },
    ],
  },
];

const CheckBoxes = ({ data, checked, setChecked }) => {
  const onChangeHandle = (isChecked, node) => {
    setChecked((prevState) => {
      const newCheckedState = { ...prevState, [node.id]: isChecked };
      const updateChildren = (node) => {
        if (node.children) {
          node.children.forEach((child) => {
            newCheckedState[child.id] = isChecked;
            child.children && updateChildren(child);
          });
        }
      };
      updateChildren(node);

      const verifyAllChildrenChecked = (node) => {
        if (!node.children) return newCheckedState[node.id] || false;
        const allChildrenChecked = node.children.every((child) =>
          verifyAllChildrenChecked(child)
        );
        newCheckedState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };

      checkboxData.forEach((node) => verifyAllChildrenChecked(node));

      return newCheckedState;
    });
  };

  return (
    <div>
      {data.map((node) => (
        <div className="checkboxGroup" key={node.id}>
          <div className="checkboxItem">
            <input
              type="checkbox"
              id={`option-${node.id}`}
              checked={checked[node.id] || false}
              onChange={(e) => onChangeHandle(e.target.checked, node)}
            />
            <label htmlFor={`option-${node.id}`}>{node.name}</label>
          </div>
          {node.children && (
            <CheckBoxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [checked, setChecked] = useState({}); // Example initial state with Option 1 checked
  console.log("Checked state:", checked);
  return (
    <div className="container">
      <h1>CHECKBOXES</h1>
      <CheckBoxes
        data={checkboxData}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};
export default App;
