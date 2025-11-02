import React, { useState } from "react";


function ShoppingListDetailPage({ list, items: initialItems, members, currentUserId }) {
  const [items, setItems] = useState(initialItems);
  const [newItemName, setNewItemName] = useState("");
  const [showResolved, setShowResolved] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [memberList, setMemberList] = useState(members);
  const [newMemberName, setNewMemberName] = useState("");

    function handleToggleItem(itemId) {
        const updated = items.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );
        setItems(updated);
    }

    function handleTitleSave() {
        setIsEditingTitle(false);
    }

  
  function handleDeleteItem(itemId) {
    const updated = items.filter((item) => item.id !== itemId);
    setItems(updated);
  }

  function handleAddItem() {
  if (!newItemName.trim()) return;

  const newItem = {
    id: `item-${Date.now()}`,
    name: newItemName,
    isCompleted: false,
  };

  setItems([...items, newItem]);
  setNewItemName(""); 
}

function handleAddMember() {
  if (!newMemberName.trim()) return;

  const newMember = {
    id: `user-${Date.now()}`,
    name: newMemberName,
  };

  setMemberList([...memberList, newMember]);
  setNewMemberName("");
}

function handleRemoveMember(memberId) {
  setMemberList(memberList.filter((m) => m.id !== memberId));
}

function handleLeaveList() {
  setMemberList(memberList.filter((m) => m.id !== currentUserId));
}


  return (
        <div className="container">
    <div>
      {list.ownerId === currentUserId ? (
    <div>
        {isEditingTitle ? (
    <div>
        <input
          type="text"
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />
        <button onClick={handleTitleSave} style={{ marginLeft: "5px" }}>Save</button>
      </div>
    ) : (
      <div>
        <h2>{listTitle}</h2>
        <button onClick={() => setIsEditingTitle(true)}>✏️ Edit Title</button>
      </div>
    )}
  </div>
) : (
  <h2>{listTitle}</h2>
)}
{list.ownerId === currentUserId && (
  <div>
    <input
      type="text"
      value={newMemberName}
      onChange={(e) => setNewMemberName(e.target.value)}
      placeholder="New member name"
    />
    <button onClick={handleAddMember} style={{ marginLeft: "5px" }}>Add Member</button>
  </div>
)}

      <p>Owner: {list.ownerId === currentUserId ? "You" : list.ownerId}</p>

      <h3>Members:</h3>
        <ul className="member-list">
        {memberList.map((m) => (
            <li key={m.id}>
            {m.name}
            {m.id === currentUserId && " (you)"}
            {" "}
            {m.id === currentUserId && list.ownerId !== currentUserId && (
                <button onClick={handleLeaveList}>🚪 Leave</button>
            )}
            {list.ownerId === currentUserId && m.id !== currentUserId && (
                <button onClick={() => handleRemoveMember(m.id)}>🗑 Remove</button>
            )}
            </li>
        ))}
      </ul>

      <h3>Add new item:</h3>
        <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter item name"
        />
        <button onClick={handleAddItem} style={{ marginLeft: "10px" }}>Add</button>
      <h3>Items:</h3>
        <label style={{ display: "block", margin: "10px 0" }}>
            <input
                type="checkbox"
                checked={showResolved}
                onChange={() => setShowResolved(!showResolved)}
            />
                Show resolved items
        </label>
      <ul className="item-list">
        {items
            .filter((item) => showResolved || !item.isCompleted)
            .map((item) => (
        <li key={item.id}>
        <label>
            <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleToggleItem(item.id)}
            />
        {item.name}
        <button onClick={() => handleDeleteItem(item.id)} style={{ marginLeft: "10px" }}>
          ❌
        </button>
      </label>
    </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default ShoppingListDetailPage;

