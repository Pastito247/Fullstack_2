import { useState, useEffect } from "react";

export default function Inventory({ character, updateCharacter }) {
  // --- INVENTARIO ---
  const [items, setItems] = useState(character.inventory || []);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "Otro",
    quantity: 1,
    weight: 0,
    equipped: false,
    description: "",
  });

  // --- MONEDAS ---
  const [coins, setCoins] = useState(
    character.coins || { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 }
  );

  // --- Actualiza LocalStorage ---
  useEffect(() => {
    updateCharacter({ ...character, inventory: items, coins });
  }, [items, coins]);

  // --- Funciones de inventario ---
  function addItem() {
    if (!newItem.name.trim()) return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({
      name: "",
      type: "Otro",
      quantity: 1,
      weight: 0,
      equipped: false,
      description: "",
    });
  }

  function deleteItem(id) {
    setItems(items.filter((i) => i.id !== id));
  }

  function toggleEquip(id) {
    setItems(
      items.map((i) => (i.id === id ? { ...i, equipped: !i.equipped } : i))
    );
  }

  const totalWeight = items.reduce((sum, i) => sum + i.weight * i.quantity, 0);

  // --- Funciones de monedas ---
  function handleCoinChange(type, value) {
    setCoins({ ...coins, [type]: parseInt(value) || 0 });
  }

  function getTotalGoldValue() {
    const { pp, gp, ep, sp, cp } = coins;
    // Conversiones estándar D&D 5e
    return pp * 10 + gp + ep * 0.5 + sp * 0.1 + cp * 0.01;
  }

  // --- Render ---
  return (
    <div className="card bg-dark border-secondary p-3 shadow-lg mt-4">
      <h4 className="text-warning text-center mb-3">🎒 Inventario</h4>

      {/* Añadir nuevo objeto */}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Nombre"
            className="form-control bg-dark text-light border-secondary"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select bg-dark text-light border-secondary"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          >
            <option>Arma</option>
            <option>Armadura</option>
            <option>Poción</option>
            <option>Objeto mágico</option>
            <option>Otro</option>
          </select>
        </div>
        <div className="col-md-1">
          <input
            type="number"
            min="1"
            className="form-control bg-dark text-light border-secondary"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                quantity: parseInt(e.target.value) || 1,
              })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            step="0.1"
            min="0"
            placeholder="Peso"
            className="form-control bg-dark text-light border-secondary"
            value={newItem.weight}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                weight: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Descripción"
            className="form-control bg-dark text-light border-secondary"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-outline-warning w-100" onClick={addItem}>
            ➕
          </button>
        </div>
      </div>

      {/* Tabla de objetos */}
      <table className="table table-dark table-striped align-middle text-center">
        <thead>
          <tr>
            <th>Objeto</th>
            <th>Tipo</th>
            <th>Cant.</th>
            <th>Peso</th>
            <th>Equipado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-secondary">
                (Inventario vacío)
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
                <td>{item.weight}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.equipped}
                    onChange={() => toggleEquip(item.id)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Peso total */}
      <div className="text-end text-light mt-2">
        <strong>Peso total:</strong> {totalWeight.toFixed(1)} lb
      </div>

      {/* --- MONEDAS --- */}
      <hr className="border-secondary my-3" />
      <h5 className="text-warning text-center">🪙 Monedas</h5>

      <div className="row text-center">
        {["pp", "gp", "ep", "sp", "cp"].map((type) => (
          <div className="col" key={type}>
            <label className="text-warning text-uppercase fw-bold">{type}</label>
            <input
              type="number"
              className="form-control bg-dark text-light border-secondary text-center"
              min="0"
              value={coins[type]}
              onChange={(e) => handleCoinChange(type, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="text-end text-light mt-3">
        <strong>Total equivalente:</strong> {getTotalGoldValue().toFixed(2)} GP 💰
      </div>
    </div>
  );
}
