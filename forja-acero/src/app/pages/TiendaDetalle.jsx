// src/app/pages/TiendaDetalle.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

// Mismo estilo de monedas que usas en otras pantallas
const coinStyle = (type) => {
  const base = {
    borderRadius: "999px",
    border: "none",
    padding: "0.3rem 0.6rem",
    fontWeight: "600",
    display: "inline-block",
    fontSize: "0.8rem",
  };

  switch (type) {
    case "PP":
      return { ...base, backgroundColor: "#e5e4e2", color: "#000" };
    case "GP":
      return { ...base, backgroundColor: "#ffcf40", color: "#000" };
    case "EP":
      return { ...base, backgroundColor: "#1f3b73", color: "#fff" };
    case "SP":
      return { ...base, backgroundColor: "#c0c0c0", color: "#000" };
    case "CP":
      return { ...base, backgroundColor: "#b87333", color: "#000" };
    default:
      return base;
  }
};

export default function TiendaDetalle() {
  const { id } = useParams(); // shopId
  const navigate = useNavigate();
  const { user } = useAuth();

  const esDM = user?.role === "DM" || user?.role === "ADMIN";
  const esPlayer = user?.role === "PLAYER";

  const [shop, setShop] = useState(null);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Datos del personaje actual (PLAYER)
  const [myCharacter, setMyCharacter] = useState(null);
  const [loadingCharacter, setLoadingCharacter] = useState(false);

  // Tabs agregar objetos
  const [activeTab, setActiveTab] = useState("equipment"); // equipment | magic | system
  const [search, setSearch] = useState("");

  const [equipmentList, setEquipmentList] = useState([]);
  const [magicList, setMagicList] = useState([]);
  const [systemItems, setSystemItems] = useState([]);

  const [loadingEquipment, setLoadingEquipment] = useState(false);
  const [loadingMagic, setLoadingMagic] = useState(false);
  const [loadingSystemItems, setLoadingSystemItems] = useState(false);

  const [savingItem, setSavingItem] = useState(false);

  // Crear ítem custom
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customRarity, setCustomRarity] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [savingCustom, setSavingCustom] = useState(false);

  const volver = () => {
    if (shop?.campaignId) {
      navigate(`/campanas/${shop.campaignId}`);
    } else {
      navigate("/campanas");
    }
  };

  const cargarShop = async () => {
    setLoading(true);
    setError("");
    setInfo("");

    try {
      const res = await apiClient.get(`/api/v1/shops/${id}`);
      setShop(res.data);

      const resItems = await apiClient.get(`/api/v1/shops/${id}/items`);
      setShopItems(resItems.data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la tienda.");
    } finally {
      setLoading(false);
    }
  };

  const cargarMiPersonaje = async () => {
    if (!esPlayer) return;
    setLoadingCharacter(true);
    try {
      const res = await apiClient.get("/api/characters/me");
      setMyCharacter(res.data);
    } catch (err) {
      console.error(err);
      // Si es 404 simplemente no tiene personaje
      setMyCharacter(null);
    } finally {
      setLoadingCharacter(false);
    }
  };

  const cargarEquipment = async () => {
    if (!esDM) return;
    setLoadingEquipment(true);
    try {
      const res = await apiClient.get("/api/v1/dnd/equipment");
      const data = res.data;
      setEquipmentList(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEquipment(false);
    }
  };

  const cargarMagic = async () => {
    if (!esDM) return;
    setLoadingMagic(true);
    try {
      const res = await apiClient.get("/api/v1/dnd/magic-items");
      const data = res.data;
      setMagicList(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMagic(false);
    }
  };

  const cargarSystemItems = async () => {
    if (!esDM) return;
    setLoadingSystemItems(true);
    try {
      const res = await apiClient.get("/api/v1/items");
      setSystemItems(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSystemItems(false);
    }
  };

  useEffect(() => {
    cargarShop();
  }, [id]);

  useEffect(() => {
    if (esPlayer) {
      cargarMiPersonaje();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esPlayer]);

  useEffect(() => {
    if (!esDM) return;

    if (activeTab === "equipment" && equipmentList.length === 0) {
      cargarEquipment();
    } else if (activeTab === "magic" && magicList.length === 0) {
      cargarMagic();
    } else if (activeTab === "system" && systemItems.length === 0) {
      cargarSystemItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const filtrarPorNombre = (lista, nameKey = "name") => {
    if (!search.trim()) return lista;
    const q = search.toLowerCase();
    return lista.filter((item) =>
      String(item[nameKey] || "")
        .toLowerCase()
        .includes(q)
    );
  };

  const pedirStockYPrecio = () => {
    const stockStr = window.prompt("Stock inicial para este objeto:", "1");
    if (stockStr === null) return null;
    const stock = parseInt(stockStr, 10);
    if (Number.isNaN(stock) || stock < 0) {
      alert("Stock inválido.");
      return null;
    }

    const priceStr = window.prompt(
      "Precio en oro (deja vacío para usar el precio base del ítem):",
      ""
    );
    let priceOverrideGold = null;
    if (priceStr !== null && priceStr.trim() !== "") {
      const n = parseInt(priceStr, 10);
      if (Number.isNaN(n) || n < 0) {
        alert("Precio inválido.");
        return null;
      }
      priceOverrideGold = n;
    }

    return { stock, priceOverrideGold };
  };

  // Prompt genérico para comprar/vender
  const pedirCantidad = (accion, max = null) => {
    let mensaje = `¿Cuántas unidades quieres ${accion}?`;
    if (max != null) {
      mensaje += ` (máx: ${max})`;
    }
    const str = window.prompt(mensaje, "1");
    if (str === null) return null;
    const qty = parseInt(str, 10);
    if (Number.isNaN(qty) || qty <= 0) {
      alert("Cantidad inválida.");
      return null;
    }
    if (max != null && qty > max) {
      alert(`No puedes ${accion} más de las que tienes (${max}).`);
      return null;
    }
    return qty;
  };

  // =========================
  // DM: agregar ítems a la tienda
  // =========================
  const handleAddEquipment = async (index, name) => {
    if (!esDM) return;
    const params = pedirStockYPrecio();
    if (!params) return;

    try {
      setSavingItem(true);
      setError("");
      setInfo("");

      const resImport = await apiClient.post(
        `/api/v1/items/import/equipment/${index}`
      );
      const item = resImport.data;

      await apiClient.post(`/api/v1/shops/${id}/items`, {
        itemId: item.id,
        stock: params.stock,
        priceOverrideGold: params.priceOverrideGold,
      });

      setInfo(`Se agregó "${name}" a la tienda.`);
      await cargarShop();
    } catch (err) {
      console.error(err);
      setError("No se pudo agregar el objeto a la tienda.");
    } finally {
      setSavingItem(false);
    }
  };

  const handleAddMagic = async (index, name) => {
    if (!esDM) return;
    const params = pedirStockYPrecio();
    if (!params) return;

    try {
      setSavingItem(true);
      setError("");
      setInfo("");

      const resImport = await apiClient.post(
        `/api/v1/items/import/magic-items/${index}`
      );
      const item = resImport.data;

      await apiClient.post(`/api/v1/shops/${id}/items`, {
        itemId: item.id,
        stock: params.stock,
        priceOverrideGold: params.priceOverrideGold,
      });

      setInfo(`Se agregó el ítem mágico "${name}" a la tienda.`);
      await cargarShop();
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo agregar el ítem mágico. Revisa que el endpoint de import exista."
      );
    } finally {
      setSavingItem(false);
    }
  };

  const handleAddSystemItem = async (item) => {
    if (!esDM) return;
    const params = pedirStockYPrecio();
    if (!params) return;

    try {
      setSavingItem(true);
      setError("");
      setInfo("");

      await apiClient.post(`/api/v1/shops/${id}/items`, {
        itemId: item.id,
        stock: params.stock,
        priceOverrideGold: params.priceOverrideGold,
      });

      setInfo(`Se agregó "${item.name}" a la tienda.`);
      await cargarShop();
    } catch (err) {
      console.error(err);
      setError("No se pudo agregar el ítem a la tienda.");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteShopItem = async (shopItemId) => {
    if (!esDM) return;
    const confirmar = window.confirm(
      "¿Seguro que quieres quitar este objeto de la tienda?"
    );
    if (!confirmar) return;

    try {
      setError("");
      setInfo("");
      await apiClient.delete(`/api/v1/shop-items/${shopItemId}`);
      setInfo("Objeto eliminado de la tienda.");
      await cargarShop();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el objeto de la tienda.");
    }
  };

  const handleQuickEditShopItem = async (shopItem) => {
    if (!esDM) return;

    const stockStr = window.prompt(
      `Nuevo stock para "${shopItem.name}"`,
      String(shopItem.stock ?? 0)
    );
    if (stockStr === null) return;
    const stock = parseInt(stockStr, 10);
    if (Number.isNaN(stock) || stock < 0) {
      alert("Stock inválido.");
      return;
    }

    const priceStr = window.prompt(
      "Nuevo precio override en oro (deja vacío para mantener el actual):",
      shopItem.priceOverrideGold != null
        ? String(shopItem.priceOverrideGold)
        : ""
    );
    let priceOverrideGold =
      shopItem.priceOverrideGold != null ? shopItem.priceOverrideGold : null;
    if (priceStr !== null && priceStr.trim() !== "") {
      const n = parseInt(priceStr, 10);
      if (Number.isNaN(n) || n < 0) {
        alert("Precio inválido.");
        return;
      }
      priceOverrideGold = n;
    }

    try {
      setError("");
      setInfo("");
      await apiClient.put(`/api/v1/shop-items/${shopItem.id}`, {
        itemId: shopItem.itemId,
        stock,
        priceOverrideGold,
      });
      setInfo("Objeto actualizado.");
      await cargarShop();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el objeto.");
    }
  };

  // =========================
  // PLAYER: comprar / vender
  // =========================
  const handleBuy = async (shopItem) => {
    if (!esPlayer) return;
    if (!myCharacter) {
      setError(
        "No tienes un personaje asignado. Pídele al DM que te asigne uno en la campaña."
      );
      return;
    }

    const maxByStock = shopItem.stock ?? 0;
    if (maxByStock <= 0) {
      alert("No hay stock disponible para este ítem.");
      return;
    }

    const qty = pedirCantidad("comprar", maxByStock);
    if (qty == null) return;

    try {
      setError("");
      setInfo("");

      await apiClient.post(`/api/v1/shop-items/${shopItem.id}/buy`, null, {
        params: {
          characterId: myCharacter.id,
          quantity: qty,
        },
      });

      setInfo(
        `Has comprado ${qty} x "${shopItem.name}". Se descontó el oro de tu personaje.`
      );
      await cargarShop();
      await cargarMiPersonaje();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "No se pudo completar la compra. Revisa tu dinero o el stock."
      );
    }
  };

  const handleSell = async (shopItem) => {
    if (!esPlayer) return;
    if (!myCharacter) {
      setError(
        "No tienes un personaje asignado. Pídele al DM que te asigne uno en la campaña."
      );
      return;
    }

    const invItem =
      myCharacter.inventory?.find((i) => i.itemId === shopItem.itemId) || null;

    if (!invItem || !invItem.quantity || invItem.quantity <= 0) {
      alert("Tu personaje no tiene este ítem en el inventario.");
      return;
    }

    const qty = pedirCantidad("vender", invItem.quantity);
    if (qty == null) return;

    try {
      setError("");
      setInfo("");

      await apiClient.post(`/api/v1/shop-items/${shopItem.id}/sell`, null, {
        params: {
          characterId: myCharacter.id,
          quantity: qty,
        },
      });

      setInfo(
        `Has vendido ${qty} x "${shopItem.name}". Tu personaje recibió oro.`
      );
      await cargarShop();
      await cargarMiPersonaje();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "No se pudo completar la venta. Revisa tu inventario."
      );
    }
  };

  // =========================
  // CREAR ÍTEM CUSTOM (DM)
  // =========================
  const handleCreateCustomItem = async (e) => {
    e.preventDefault();
    if (!esDM) return;

    setError("");
    setInfo("");

    if (!customName.trim()) {
      setError("El nombre del ítem es obligatorio.");
      return;
    }

    let price = 0;
    if (customPrice.trim() !== "") {
      const n = parseInt(customPrice, 10);
      if (Number.isNaN(n) || n < 0) {
        setError("El precio debe ser un número mayor o igual a 0.");
        return;
      }
      price = n;
    }

    try {
      setSavingCustom(true);

      await apiClient.post("/api/v1/items", {
        name: customName.trim(),
        category: customCategory.trim() || null,
        rarity: customRarity.trim() || null,
        basePriceGold: price,
        description: customDescription.trim() || null,
        imageUrl: customImageUrl.trim() || null,
      });

      setInfo(
        "Ítem creado correctamente. Ahora puedes agregarlo desde 'Ítems del sistema'."
      );

      // Limpiar form
      setCustomName("");
      setCustomCategory("");
      setCustomRarity("");
      setCustomPrice("");
      setCustomDescription("");
      setCustomImageUrl("");

      // Recargar ítems del sistema y cambiar de tab
      setActiveTab("system");
      await cargarSystemItems();
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el ítem.");
    } finally {
      setSavingCustom(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-light" onClick={volver}>
          Volver
        </button>
        <h1 className="h4 mb-0 text-center flex-grow-1">
          {shop ? shop.name : "Tienda"}
        </h1>
        <div style={{ width: "80px" }} />
      </div>

      {(error || info) && (
        <div className="mb-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {info && (
            <div className="alert alert-success" role="alert">
              {info}
            </div>
          )}
        </div>
      )}

      {loading && <p>Cargando tienda...</p>}

      {!loading && shop && (
        <>
          {/* Info tienda */}
          <div className="card bg-dark text-light border-light mb-4">
            <div className="card-body">
              <h5 className="card-title mb-1">{shop.name}</h5>
              {shop.description && (
                <p className="mb-1 small text-muted">{shop.description}</p>
              )}
              {shop.campaignName && (
                <p className="mb-0 small">
                  Campaña:{" "}
                  <strong>
                    {shop.campaignName}
                    {shop.dmUsername && ` (DM: ${shop.dmUsername})`}
                  </strong>
                </p>
              )}
            </div>
          </div>

          {/* Info del personaje del PLAYER */}
          {esPlayer && (
            <div className="card bg-dark text-light border-light mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">
                    Tu personaje en esta campaña
                  </h5>
                </div>
                {loadingCharacter ? (
                  <p className="text-muted small">Cargando personaje...</p>
                ) : !myCharacter ? (
                  <p className="text-muted small">
                    No se encontró personaje asignado. Pídele al DM que te
                    asigne uno en la campaña para poder comprar/vender aquí.
                  </p>
                ) : (
                  <>
                    <p className="mb-1 small">
                      <strong>{myCharacter.name}</strong> — Nivel{" "}
                      {myCharacter.level} {myCharacter.dndClass}
                    </p>
                    <p className="mb-2 small text-muted">
                      Campaña: {myCharacter.campaignName || "—"}
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <span style={coinStyle("PP")}>
                        PP: {myCharacter.pp ?? 0}
                      </span>
                      <span style={coinStyle("GP")}>
                        GP: {myCharacter.gp ?? 0}
                      </span>
                      <span style={coinStyle("EP")}>
                        EP: {myCharacter.ep ?? 0}
                      </span>
                      <span style={coinStyle("SP")}>
                        SP: {myCharacter.sp ?? 0}
                      </span>
                      <span style={coinStyle("CP")}>
                        CP: {myCharacter.cp ?? 0}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Inventario actual */}
          <div className="card bg-dark text-light border-light mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Inventario de la tienda</h5>
              </div>

              {shopItems.length === 0 ? (
                <p className="text-muted small">
                  Esta tienda aún no tiene objetos.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-striped table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Objeto</th>
                        <th>Categoría</th>
                        <th>Fuente</th>
                        <th>Rareza</th>
                        <th className="text-end">Precio (gp)</th>
                        <th className="text-end">Stock</th>
                        {(esDM || esPlayer) && (
                          <th style={{ width: "200px" }}>Acciones</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {shopItems.map((si) => {
                        const price =
                          si.priceOverrideGold != null
                            ? si.priceOverrideGold
                            : si.finalPriceGold ?? si.basePriceGold ?? 0;
                        return (
                          <tr key={si.id}>
                            <td>{si.name}</td>
                            <td>{si.category || "-"}</td>
                            <td>{si.source || "-"}</td>
                            <td>{si.rarity || "-"}</td>
                            <td className="text-end">{price}</td>
                            <td className="text-end">{si.stock ?? 0}</td>
                            {(esDM || esPlayer) && (
                              <td>
                                <div className="d-flex gap-2 justify-content-end flex-wrap">
                                  {esDM && (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-light"
                                        onClick={() =>
                                          handleQuickEditShopItem(si)
                                        }
                                      >
                                        Editar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          handleDeleteShopItem(si.id)
                                        }
                                      >
                                        Quitar
                                      </button>
                                    </>
                                  )}
                                  {esPlayer && (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-add"
                                        onClick={() => handleBuy(si)}
                                        disabled={!myCharacter}
                                      >
                                        Comprar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-warning"
                                        onClick={() => handleSell(si)}
                                        disabled={!myCharacter}
                                      >
                                        Vender
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Agregar objetos (solo DM) */}
          {esDM && (
            <div className="card bg-dark text-light border-light">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
                  <h5 className="card-title mb-2 mb-md-0">
                    Agregar objetos a esta tienda
                  </h5>
                  <div className="input-group input-group-sm w-auto">
                    <span className="input-group-text">Buscar</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tabs */}
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={
                        "nav-link " +
                        (activeTab === "equipment" ? "active" : "")
                      }
                      type="button"
                      onClick={() => setActiveTab("equipment")}
                    >
                      Equipo oficial
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={
                        "nav-link " + (activeTab === "magic" ? "active" : "")
                      }
                      type="button"
                      onClick={() => setActiveTab("magic")}
                    >
                      Ítems mágicos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={
                        "nav-link " + (activeTab === "system" ? "active" : "")
                      }
                      type="button"
                      onClick={() => setActiveTab("system")}
                    >
                      Ítems del sistema
                    </button>
                  </li>
                </ul>

                {/* TAB: equipment */}
                {activeTab === "equipment" && (
                  <div>
                    {loadingEquipment ? (
                      <p className="text-muted small">Cargando equipo...</p>
                    ) : filtrarPorNombre(equipmentList).length === 0 ? (
                      <p className="text-muted small">
                        No hay equipo que coincida con la búsqueda.
                      </p>
                    ) : (
                      <div className="list-group list-group-flush">
                        {filtrarPorNombre(equipmentList).map((eq) => (
                          <div
                            key={eq.index}
                            className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{eq.name}</strong>
                              <span className="small text-muted d-block">
                                {eq.index}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-add"
                              disabled={savingItem}
                              onClick={() =>
                                handleAddEquipment(eq.index, eq.name)
                              }
                            >
                              Agregar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: magic */}
                {activeTab === "magic" && (
                  <div>
                    {loadingMagic ? (
                      <p className="text-muted small">
                        Cargando ítems mágicos...
                      </p>
                    ) : filtrarPorNombre(magicList).length === 0 ? (
                      <p className="text-muted small">
                        No hay ítems mágicos que coincidan con la búsqueda.
                      </p>
                    ) : (
                      <div className="list-group list-group-flush">
                        {filtrarPorNombre(magicList).map((mi) => (
                          <div
                            key={mi.index}
                            className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{mi.name}</strong>
                              <span className="small text-muted d-block">
                                {mi.index}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-add"
                              disabled={savingItem}
                              onClick={() => handleAddMagic(mi.index, mi.name)}
                            >
                              Agregar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: system */}
                {activeTab === "system" && (
                  <div>
                    {loadingSystemItems ? (
                      <p className="text-muted small">
                        Cargando ítems del sistema...
                      </p>
                    ) : filtrarPorNombre(systemItems).length === 0 ? (
                      <p className="text-muted small">
                        No hay ítems que coincidan con la búsqueda.
                      </p>
                    ) : (
                      <div className="list-group list-group-flush">
                        {filtrarPorNombre(systemItems).map((it) => (
                          <div
                            key={it.id}
                            className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <strong>{it.name}</strong>
                              <span className="small text-muted d-block">
                                {it.category} {it.rarity && `· ${it.rarity}`}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-add"
                              disabled={savingItem}
                              onClick={() => handleAddSystemItem(it)}
                            >
                              Agregar
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="small text-muted mt-2">
                      Aquí aparecen tanto ítems oficiales ya importados como
                      ítems custom creados por ti.
                    </p>
                  </div>
                )}

                {/* CREAR ÍTEM CUSTOM */}
                <hr className="my-4" />
                <h6 className="mb-2">Crear ítem personalizado</h6>
                <p className="small text-muted">
                  Este ítem quedará guardado en el sistema (solo para tu cuenta
                  DM) y luego podrás agregarlo a cualquier tienda desde la
                  pestaña
                  <strong> "Ítems del sistema"</strong>.
                </p>

                <form onSubmit={handleCreateCustomItem} className="mt-3">
                  <div className="row g-3">
                    <div className="col-12 col-md-4">
                      <label className="form-label small">Nombre *</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                      />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label small">Categoría</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Arma, Poción, etc."
                      />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label small">Rareza</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={customRarity}
                        onChange={(e) => setCustomRarity(e.target.value)}
                        placeholder="Común, Rara..."
                      />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label small">
                        Precio (oro, opcional)
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="form-control form-control-sm"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-6 col-md-8">
                      <label className="form-label small">URL de imagen</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small">Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows={3}
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        placeholder="Efectos, sabor, lore..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-add btn-sm mt-3"
                    disabled={savingCustom}
                  >
                    {savingCustom ? "Creando ítem..." : "Crear ítem"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {!loading && !shop && !error && (
        <p className="text-muted">No se encontró la tienda.</p>
      )}
    </div>
  );
}
