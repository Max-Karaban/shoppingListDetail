import React from "react";
import ShoppingListDetailPage from "./pages/ShoppingListDetailPage";
import shoppingListData from "./data/shoppingListData";

function App() {
  const currentUserId = "user-1"; // Ты — владелец

  return (
    <div>
      <ShoppingListDetailPage
        list={shoppingListData}
        items={shoppingListData.items}
        members={shoppingListData.members}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default App;
